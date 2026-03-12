'use client';

import { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    hbspt?: {
      forms: {
        create: (config: {
          region: string;
          portalId: string;
          formId: string;
          target: string;
        }) => void;
      };
    };
  }
}

const SCRIPT_ID = 'hubspot-forms-v2-script';

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

        // Prevent duplicate embeds (React StrictMode/dev effects + client transitions).
        if (
          hasMountedFormRef.current ||
          target.dataset.hubspotMounted === 'true' ||
          target.querySelector('form, iframe, .hs-form, .hsfc-Form')
        ) {
          return;
        }

        hasMountedFormRef.current = true;
        target.dataset.hubspotMounted = 'true';

        // Prevent duplicate embeds during Fast Refresh.
        target.innerHTML = '';

        window.hbspt.forms.create({
          region: 'na2',
          portalId: '245521023',
          formId: 'a6b03a7f-4f8f-402a-93f0-d755bee55cdc',
          target: '#hubspot-contact-form',
        });

        // HubSpot injects form markup asynchronously; style after mount and on any later mutations.
        observer = new MutationObserver(() => applyDarkModeStyles(target));
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
    return (
      <div className="text-center p-6 rounded-xl bg-[var(--color-surface-200)] border border-[var(--color-border)]">
        <p className="text-[var(--color-text-primary)] font-medium mb-2">Form failed to load.</p>
        <p className="text-[var(--color-text-secondary)] mb-4">Please call us now for immediate help.</p>
        <a
          href="tel:+14109377332"
          className="inline-block px-5 py-2.5 bg-[var(--color-primary)] text-white rounded-lg font-medium hover:bg-[var(--color-primary-hover)] transition-colors"
        >
          Call +1 (410) 937-7332
        </a>
      </div>
    );
  }

  return <div id="hubspot-contact-form" className="min-h-[520px]" />;
}
