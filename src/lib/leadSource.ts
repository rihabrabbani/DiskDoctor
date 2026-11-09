// First-touch lead source for the main HubSpot form when GTM is blocked (dev brief 9 Nov 2026, item 1).
// Site code saves the first touch in sessionStorage `dd_fb`; HubspotContactForm fills the dd_ fields
// from it only if GTM did not (window.__ddHsFill). No cookies, no third-party calls.
// The landing-page form (LpForm, form cfcbdbd3) has its own fallback and does not use this.

export const FB_KEY = 'dd_fb';

export type FirstTouch = {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term: string;
  utm_content: string;
  gclid: string;
  gbraid: string;
  wbraid: string;
  /** Landing path, e.g. "/" or "/services/raid-recovery". */
  landing: string;
  /** Referrer host; empty when it is this site. */
  ref: string;
};

const PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'gbraid', 'wbraid'] as const;

function referrerHost(): string {
  try {
    if (!document.referrer) return '';
    const host = new URL(document.referrer).hostname.toLowerCase();
    if (host === location.hostname || host === 'diskdoctorsamerica.com' || host.endsWith('.diskdoctorsamerica.com')) return '';
    return host;
  } catch {
    return '';
  }
}

/** The touch as seen on this page load (URL params, path, referrer). */
export function currentTouch(): FirstTouch {
  const qs = new URLSearchParams(location.search);
  const touch = { landing: location.pathname, ref: referrerHost() } as FirstTouch;
  for (const key of PARAMS) touch[key] = (qs.get(key) || '').slice(0, 300);
  return touch;
}

/** Save the first touch of this session, only if it is not set yet. */
export function saveFirstTouch() {
  try {
    if (sessionStorage.getItem(FB_KEY)) return;
    sessionStorage.setItem(FB_KEY, JSON.stringify(currentTouch()));
  } catch {
    // Storage blocked: the form falls back to the current URL.
  }
}

export function readFirstTouch(): Partial<FirstTouch> {
  try {
    const raw = sessionStorage.getItem(FB_KEY);
    return raw ? (JSON.parse(raw) as Partial<FirstTouch>) : {};
  } catch {
    return {};
  }
}

export type LeadChannel =
  | 'google_ads'
  | 'gbp'
  | 'lsa'
  | 'ai_assistant'
  | 'organic_search'
  | 'referral'
  | 'other'
  | 'unknown';

const AI_REFERRER = /chatgpt|openai|perplexity|gemini\.google|copilot|claude\.ai/;
const SEARCH_REFERRER = /(^|\.)(google|bing|duckduckgo|yahoo|ecosia|brave)\./;

/** Same rules and order as GTM's dd_lead_channel. Never "direct": nothing at all is "unknown". */
export function leadChannel(t: Partial<FirstTouch>): LeadChannel {
  const src = (t.utm_source || '').toLowerCase();
  const med = (t.utm_medium || '').toLowerCase();
  const cmp = (t.utm_campaign || '').toLowerCase();
  const ref = (t.ref || '').toLowerCase();

  if (t.gclid || t.gbraid || t.wbraid || /^(cpc|ppc|paid)/.test(med)) return 'google_ads';
  if (/^gbp[-_]/.test(cmp)) return 'gbp';
  if (src === 'lsa') return 'lsa';
  if ((ref && AI_REFERRER.test(ref)) || /chatgpt|perplexity/.test(src)) return 'ai_assistant';
  if ((ref && SEARCH_REFERRER.test(ref)) || med === 'organic') return 'organic_search';
  if (ref) return 'referral';
  if (src || med) return 'other';
  return 'unknown';
}

/** dd_ field values for the main HubSpot form: first touch, each field falling back to the current URL. */
export function fallbackFields(): Record<string, string> {
  const first = readFirstTouch();
  const now = currentTouch();
  const pick = (key: keyof FirstTouch) => first[key] || now[key] || '';
  const merged: FirstTouch = {
    utm_source: pick('utm_source'),
    utm_medium: pick('utm_medium'),
    utm_campaign: pick('utm_campaign'),
    utm_term: pick('utm_term'),
    utm_content: pick('utm_content'),
    gclid: pick('gclid'),
    gbraid: pick('gbraid'),
    wbraid: pick('wbraid'),
    landing: pick('landing'),
    // The current page's referrer is this site after the first page, so only the saved one counts,
    // unless nothing was saved (storage blocked).
    ref: first.landing !== undefined ? first.ref || '' : now.ref,
  };
  return {
    dd_utm_source: merged.utm_source,
    dd_utm_medium: merged.utm_medium,
    dd_utm_campaign: merged.utm_campaign,
    dd_utm_term: merged.utm_term,
    dd_utm_content: merged.utm_content,
    dd_gclid: merged.gclid,
    dd_gbraid: merged.gbraid,
    dd_wbraid: merged.wbraid,
    dd_landing_page: merged.landing,
    dd_lead_channel: leadChannel(merged),
    // dd_ga_client_id stays empty on purpose: that is how a blocked visit is told apart.
  };
}
