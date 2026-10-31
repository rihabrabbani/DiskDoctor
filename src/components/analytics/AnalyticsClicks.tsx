'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  }
}

// Pushes to the dataLayer only; GTM decides which GA4/Ads tags fire, so events are not double-sent via gtag.
function track(event: string, params?: Record<string, unknown>) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}

export default function AnalyticsClicks() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const link = target?.closest('a');
      if (!link) return;
      const href = link.getAttribute('href') || '';
      const linkLocation = window.location.pathname;
      if (href.startsWith('tel:')) {
        track('phone_click', { link_location: linkLocation });
      } else if (href.startsWith('mailto:')) {
        track('email_click', { link_location: linkLocation });
      }
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return null;
}
