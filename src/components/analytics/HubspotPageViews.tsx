'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

declare global {
  interface Window {
    _hsq?: unknown[];
  }
}

// HubSpot's tracking code (loaded by GTM) only records the first page of a visit. Next.js navigates
// client-side after that, so send HubSpot a page view on every route change except the first load.
export default function HubspotPageViews() {
  const pathname = usePathname();
  const isFirstLoad = useRef(true);

  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }
    window._hsq = window._hsq || [];
    window._hsq.push(['setPath', window.location.pathname + window.location.search]);
    window._hsq.push(['trackPageView']);
  }, [pathname]);

  return null;
}
