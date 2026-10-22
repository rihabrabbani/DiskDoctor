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
} from '@/lib/site';

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
    hbspt?: {
      forms: {
        create: (config: Record<string, unknown>) => void;
      };
    };
  }
}

const SCRIPT_ID = 'hubspot-forms-v2-script';

function trackFormSubmit() {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: 'hubspot_form_submit', event_category: 'lead', method: 'hubspot' });
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'generate_lead', { method: 'hubspot' });
    window.gtag('event', 'hubspot_form_submit', { method: 'hubspot' });
    window.gtag('event', 'conversion', {
      send_to: 'AW-16976188859/siYRCM7CyqMdELur8J4_',
      value: 1.0,
      currency: 'USD',
    });
    window.gtag('event', 'conversion', {
      send_to: 'AW-7835970649/qGxRCNnYvZgdELjaqsw9',
      value: 1.0,
      currency: 'USD',
    });
  }
}

function forceUsPhoneCountry(root: HTMLElement) {
  const countrySelects = root.querySelectorAll<HTMLSelectElement>('select');
  countrySelects.forEach((select) => {
    const name = (select.name || select.id || '').toLowerCase();
    if (name.includes('country') || name.includes('phone_ext')) {
      const us = Array.from(select.options).find((opt) =>
        /united states|^us$|^usa$|\+1/.test(opt.text.toLowerCase() + opt.value.toLowerCase())
      );
      if (us) {
        select.value = us.value;
        select.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }
  });

  const flag = root.querySelector<HTMLElement>('.iti__selected-flag, .hs-selected-flag');
  if (flag && !/us|united states/i.test(flag.getAttribute('title') || flag.getAttribute('aria-label') || '')) {
    flag.click();
    const usItem = root.querySelector<HTMLElement>('[data-country-code="us"], li[data-country-code="us"]');
    usItem?.click();
  }
}

export default function HubspotContactForm() {
  const [failed, setFailed] = useState(false);
  const hasMountedFormRef = useRef(false);

  useEffect(() => {
    let observer: MutationObserver | null = null;
    let existingScriptLoadHandler: (() => void) | null = null;

    const applyDarkModeStyles = (rootEl: HTMLElement) => {
      const isDark = document.documentElement.classList.contains('dark');
      if (!isDark) return;

      const textSelectors = [
        'label',
        'legend',
        '.hs-richtext',
        '.hs-error-msg',
        '.hs-form-field > span',
        'p',
      ];

      rootEl.querySelectorAll<HTMLElement>(textSelectors.join(',')).forEach((el) => {
        el.style.setProperty('color', 'var(--color-text-primary)', 'important');
      });

      rootEl.querySelectorAll<HTMLElement>('input, textarea, select').forEach((el) => {
        el.style.setProperty('color', 'var(--color-text-primary)', 'important');
        el.style.setProperty('background-color', 'var(--color-surface-200)', 'important');
        el.style.setProperty('border-color', 'var(--color-border)', 'important');
      });
    };

    const mountForm = () => {
      try {
        const target = document.getElementById('hubspot-contact-form');
        if (!target || !window.hbspt?.forms?.create) return;

        if (
          hasMountedFormRef.current ||
          target.dataset.hubspotMounted === 'true' ||
          target.querySelector('form, iframe, .hs-form, .hsfc-Form')
        ) {
          return;
        }

        hasMountedFormRef.current = true;
        target.dataset.hubspotMounted = 'true';
        target.innerHTML = '';

        window.hbspt.forms.create({
          region: HUBSPOT_REGION,
          portalId: HUBSPOT_PORTAL_ID,
          formId: HUBSPOT_FORM_ID,
          target: '#hubspot-contact-form',
          locale: 'en',
          onFormReady: ($form: HTMLElement) => {
            const root = document.getElementById('hubspot-contact-form');
            if (root) {
              forceUsPhoneCountry(root);
              setTimeout(() => forceUsPhoneCountry(root), 400);
            }
            if ($form) forceUsPhoneCountry($form);
          },
          onFormSubmitted: () => {
            trackFormSubmit();
          },
        });

        observer = new MutationObserver(() => {
          applyDarkModeStyles(target);
          forceUsPhoneCountry(target);
        });
        observer.observe(target, { childList: true, subtree: true });
        setTimeout(() => applyDarkModeStyles(target), 300);
        setTimeout(() => applyDarkModeStyles(target), 1200);
      } catch (error) {
        console.error('HubSpot form mount failed:', error);
        setFailed(true);
      }
    };

    const existingScript = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;

    if (existingScript) {
      if (window.hbspt?.forms?.create) {
        mountForm();
      } else {
        existingScriptLoadHandler = () => mountForm();
        existingScript.addEventListener('load', existingScriptLoadHandler, { once: true });
      }
      return () => {
        if (observer) observer.disconnect();
        if (existingScriptLoadHandler) {
          existingScript.removeEventListener('load', existingScriptLoadHandler);
        }
      };
    }

    const script = document.createElement('script');
    script.id = SCRIPT_ID;
    script.src = 'https://js-na2.hsforms.net/forms/embed/v2.js';
    script.async = true;
    script.onload = mountForm;
    script.onerror = () => {
      console.error('Failed to load HubSpot forms script');
      setFailed(true);
    };
    document.body.appendChild(script);

    return () => {
      if (observer) observer.disconnect();
    };
  }, []);

  if (failed) {
    return <FormFallback />;
  }

  return (
    <div>
      <div id="hubspot-contact-form" className="min-h-[520px]" />
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
