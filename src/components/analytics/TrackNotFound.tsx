'use client';

import { useEffect } from 'react';
import { track } from './AnalyticsClicks';

// Pushes page_not_found once when the 404 page renders: the missing path and the referrer's host only.
export default function TrackNotFound() {
  useEffect(() => {
    let referrerHost = '';
    try {
      referrerHost = document.referrer ? new URL(document.referrer).host : '';
    } catch {}
    track('page_not_found', { page_path: window.location.pathname, page_referrer: referrerHost });
  }, []);

  return null;
}
