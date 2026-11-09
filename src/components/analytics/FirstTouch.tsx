'use client';

import { useEffect } from 'react';
import { saveFirstTouch } from '@/lib/leadSource';

// Saves this session's first touch (UTMs, click IDs, landing path, referrer host) in sessionStorage
// `dd_fb`, once. Read by HubspotContactForm when GTM is blocked. Site code on purpose, not GTM.
export default function FirstTouch() {
  useEffect(() => {
    saveFirstTouch();
  }, []);
  return null;
}
