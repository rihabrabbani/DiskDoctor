'use client';

import { useEffect, useRef, useState } from 'react';
import FormFallback from './FormFallback';
import {
  EMAIL,
  HUBSPOT_FORM_ID,
  HUBSPOT_PORTAL_ID,
  HUBSPOT_REGION,
  PHONE_DISPLAY,
  PHONE_TEL,
  SITE_URL,
} from '@/lib/site';
import { fallbackFields } from '@/lib/leadSource';

// HubSpot's v4 embed (new-editor form), which renders each `.hs-form-frame` as an iframe. The legacy
// v2.js / hbspt.forms.create path is gone: it only handed the form over to this embed anyway.
const SCRIPT_ID = 'hubspot-forms-v4-script';
const SCRIPT_SRC = `https://js-${HUBSPOT_REGION}.hsforms.net/forms/embed/${HUBSPOT_PORTAL_ID}.js`;

// Lead conversions (GA4 generate_lead + Google Ads) fire from GTM on the /thank-you page view,
// so they are not sent from here as well.
const THANK_YOU_URL = `${SITE_URL}/thank-you`;

// GTM fills the dd_ fields on the form's on-ready event and then sets window.__ddHsFill. Give it this
// long; if the flag is still unset (GTM blocked), fill them from the site's own first-touch data.
const GTM_FILL_WAIT_MS = 1500;

type HsForm = { getFormId?: () => string; setFieldValue: (name: string, value: string) => void };
declare global {
  interface Window {
    __ddHsFill?: unknown;
    HubSpotFormsV4?: { getFormFromEvent: (event: Event) => HsForm | undefined };
  }
}

// Brief 9 Nov, item 5 (deploy B): the embed script (~1 MB of HubSpot JS, a main cause of blocking time)
// loads only when needed: when the form comes within ~600 px of the viewport, or on the visitor's first
// scroll, tap, click or keypress, whichever comes first. `eager` (on /contact, where the form is the
// page) loads it at once, as before. The lead-source fallback and GTM's fill both listen for on-ready,
// so they work however late the form loads.
const FIRST_INTERACTION = ['scroll', 'pointerdown', 'touchstart', 'keydown'] as const;

export default function HubspotContactForm({ eager = false }: { eager?: boolean }) {
  const [failed, setFailed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // The v4 embed has no redirect option for this form and only fires this DOM event on success.
  // Redirect from here, as a full page load so GTM sees the /thank-you page view.
  useEffect(() => {
    const onSubmissionSuccess = (event: Event) => {
      const formId = (event as CustomEvent<{ formId?: string }>).detail?.formId;
      if (formId && formId !== HUBSPOT_FORM_ID) return;
      window.location.assign(THANK_YOU_URL);
    };
    window.addEventListener('hs-form-event:on-submission:success', onSubmissionSuccess);
    return () => window.removeEventListener('hs-form-event:on-submission:success', onSubmissionSuccess);
  }, []);

  // Lead-source fallback (dev brief 9 Nov, item 1). Listens for on-ready, so it also works when the
  // embed script loads late. dd_ga_client_id is never filled here.
  useEffect(() => {
    const timers: number[] = [];
    const onReady = (event: Event) => {
      const form = window.HubSpotFormsV4?.getFormFromEvent(event);
      if (!form) return;
      const formId = form.getFormId?.() ?? (event as CustomEvent<{ formId?: string }>).detail?.formId;
      if (formId && formId !== HUBSPOT_FORM_ID) return;
      timers.push(
        window.setTimeout(() => {
          if (window.__ddHsFill) return;
          for (const [name, value] of Object.entries(fallbackFields())) {
            try {
              form.setFieldValue(`0-1/${name}`, value);
            } catch {
              // A field missing from the form must not stop the others.
            }
          }
        }, GTM_FILL_WAIT_MS),
      );
    };
    window.addEventListener('hs-form-event:on-ready', onReady);
    return () => {
      window.removeEventListener('hs-form-event:on-ready', onReady);
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, []);

  // The embed renders `.hs-form-frame` elements found on load, then watches for new ones, but it only
  // searches 5 levels into each added node. A client-side navigation adds the whole page at once, with
  // the form deeper than that, so the frame element is appended on its own after mount.
  useEffect(() => {
    const frame = document.createElement('div');
    frame.className = 'hs-form-frame';
    frame.dataset.region = HUBSPOT_REGION;
    frame.dataset.formId = HUBSPOT_FORM_ID;
    frame.dataset.portalId = HUBSPOT_PORTAL_ID;
    containerRef.current?.appendChild(frame);
    return () => frame.remove();
  }, []);

  useEffect(() => {
    if (document.getElementById(SCRIPT_ID)) return;
    const load = () => {
      if (document.getElementById(SCRIPT_ID)) return;
      const script = document.createElement('script');
      script.id = SCRIPT_ID;
      script.src = SCRIPT_SRC;
      script.defer = true;
      script.onerror = () => {
        console.error('Failed to load HubSpot forms script');
        script.remove();
        setFailed(true);
      };
      document.body.appendChild(script);
    };
    const container = containerRef.current;
    if (eager || !container || !('IntersectionObserver' in window)) {
      load();
      return;
    }
    // `observer` is assigned below; cleanup only runs later (from an event or the observer callback).
    const cleanup = () => {
      observer.disconnect();
      FIRST_INTERACTION.forEach((type) => window.removeEventListener(type, onInteraction));
    };
    const trigger = () => {
      cleanup();
      load();
    };
    function onInteraction() {
      trigger();
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) trigger();
      },
      { rootMargin: '600px 0px' },
    );
    observer.observe(container);
    FIRST_INTERACTION.forEach((type) => window.addEventListener(type, onInteraction, { passive: true, once: true }));
    return cleanup;
  }, [eager]);

  if (failed) {
    return <FormFallback />;
  }

  return (
    <div>
      {/* The form is an iframe with HubSpot's dark label colours, which can't be restyled from here.
          A fixed light panel keeps it readable in dark mode too (deliberately not a theme var). */}
      <div ref={containerRef} className="min-h-[520px] rounded-xl bg-white p-4 sm:p-6 [color-scheme:light]" />
      <noscript>
        <p>
          JavaScript is required for the form. Call{' '}
          <a href={PHONE_TEL}>{PHONE_DISPLAY}</a> or email{' '}
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a> for a free evaluation.
        </p>
      </noscript>
    </div>
  );
}
