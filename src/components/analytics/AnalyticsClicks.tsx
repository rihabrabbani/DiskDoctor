'use client';

import { useEffect } from 'react';
import { COLUMBIA_MAPS_URL, TYSONS_MAPS_URL } from '@/lib/site';

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  }
}

// Pushes to the dataLayer only; GTM decides which GA4/Ads tags fire, so events are not double-sent via gtag.
// GTM triggers listen for these exact event names and params (tel_click, mailto_click, cta_click,
// directions_click, phone_copy, page_not_found) — don't rename them. Never push form values or emails.
export function track(event: string, params?: Record<string, unknown>) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}

// The main line and the Tysons office line; copying either one fires phone_copy.
const PHONE_COPY_DIGITS = ['4109377332', '5712028529'];

// Google Business Profile place IDs, so a maps link can be attributed to an office.
const cidOf = (url: string) => url.match(/cid=(\d+)/)?.[1];
const OFFICE_BY_CID: Record<string, string> = {
  [cidOf(COLUMBIA_MAPS_URL) ?? '']: 'columbia',
  [cidOf(TYSONS_MAPS_URL) ?? '']: 'tysons',
};

const CTA_PATHS = ['/contact', '/mail-in-data-recovery'];
const CTA_TEXT = /get a free evaluation|free evaluation|free quote|book an appointment|ship your drive/i;

// Where on the page the click happened: the nearest data-track-position on the element or an
// ancestor (header, hero, cta_band, location_card, footer, sticky_mobile, form_intro), else body.
function positionOf(el: Element) {
  return el.closest('[data-track-position]')?.getAttribute('data-track-position') || 'body';
}

function isMapsUrl(url: URL) {
  return (
    url.hostname === 'maps.google.com' ||
    url.hostname === 'maps.app.goo.gl' ||
    (url.hostname.endsWith('google.com') && url.pathname.startsWith('/maps'))
  );
}

export default function AnalyticsClicks() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const el = target?.closest('a, button');
      if (!el) return;
      const href = el.getAttribute('href') || '';
      const linkLocation = window.location.pathname;
      const linkPosition = positionOf(el);

      if (href.startsWith('tel:')) {
        track('tel_click', {
          event_category: 'lead',
          method: 'phone',
          phone: href,
          link_location: linkLocation,
          link_position: linkPosition,
        });
        return;
      }
      if (href.startsWith('mailto:')) {
        track('mailto_click', {
          event_category: 'lead',
          method: 'email',
          link_location: linkLocation,
          link_position: linkPosition,
        });
        return;
      }

      const url = href ? new URL(href, window.location.href) : null;

      if (url && isMapsUrl(url)) {
        // "Read our Google reviews" links also point at the maps listing; they aren't directions.
        if (el.getAttribute('data-map-link') === 'reviews') return;
        const office =
          el.getAttribute('data-office') || OFFICE_BY_CID[url.searchParams.get('cid') || ''] || 'unknown';
        track('directions_click', { office, link_position: linkPosition, link_location: linkLocation });
        return;
      }

      const text = (el as HTMLElement).innerText.replace(/\s+/g, ' ').trim();
      const sameSite = url ? url.origin === window.location.origin : false;
      // Text alone only counts on short button labels, not FAQ toggles ("Is the evaluation free?").
      const looksLikeCtaLabel =
        text.length <= 40 && !text.endsWith('?') && !el.hasAttribute('aria-expanded') && CTA_TEXT.test(text);
      const isCta =
        (sameSite && (CTA_PATHS.includes(url!.pathname) || /form|evaluation/i.test(url!.hash))) ||
        looksLikeCtaLabel;
      if (isCta) {
        track('cta_click', {
          cta_text: text.slice(0, 60),
          cta_url: url ? (sameSite ? url.pathname + url.hash : url.href) : '',
          link_position: linkPosition,
          link_location: linkLocation,
        });
      }
    };

    // Someone copying a phone number to dial it elsewhere: count it like a call intent.
    const onCopy = () => {
      const selection = window.getSelection();
      const copied = selection?.toString().replace(/\D/g, '') || '';
      if (PHONE_COPY_DIGITS.some((digits) => copied.includes(digits))) {
        const node = selection?.anchorNode;
        const el = node instanceof Element ? node : node?.parentElement;
        track('phone_copy', {
          link_position: el ? positionOf(el) : 'body',
          link_location: window.location.pathname,
        });
      }
    };

    document.addEventListener('click', onClick);
    document.addEventListener('copy', onCopy);
    return () => {
      document.removeEventListener('click', onClick);
      document.removeEventListener('copy', onCopy);
    };
  }, []);

  return null;
}
