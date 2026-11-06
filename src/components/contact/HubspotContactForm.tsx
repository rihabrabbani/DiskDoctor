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

// HubSpot's v4 embed (new-editor form), which renders each `.hs-form-frame` as an iframe. The legacy
// v2.js / hbspt.forms.create path is gone: it only handed the form over to this embed anyway.
const SCRIPT_ID = 'hubspot-forms-v4-script';
const SCRIPT_SRC = `https://js-${HUBSPOT_REGION}.hsforms.net/forms/embed/${HUBSPOT_PORTAL_ID}.js`;

// Lead conversions (GA4 generate_lead + Google Ads) fire from GTM on the /thank-you page view,
// so they are not sent from here as well.
const THANK_YOU_URL = `${SITE_URL}/thank-you`;

export default function HubspotContactForm() {
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

  // The embed pulls about 1 MB of HubSpot JS, so it loads only when the form is near the viewport.
  // Most service pages have the form at the bottom; on /contact it is on screen and loads at once.
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
    if (!container || !('IntersectionObserver' in window)) {
      load();
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        load();
      },
      { rootMargin: '800px 0px' },
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

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
