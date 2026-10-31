export const SITE_HOST = 'www.diskdoctorsamerica.com';
export const SITE_URL = 'https://www.diskdoctorsamerica.com';
export const SITE_URL_SLASH = 'https://www.diskdoctorsamerica.com/';

export const PHONE_DISPLAY = '+1 (410) 937-7332';
export const PHONE_TEL = 'tel:+14109377332';
export const EMAIL = 'shah4268@msn.com';

export const HUBSPOT_PORTAL_ID = '245521023';
export const HUBSPOT_FORM_ID = 'a6b03a7f-4f8f-402a-93f0-d755bee55cdc';
export const HUBSPOT_REGION = 'na2';

export const GBP_UTM_URL =
  'https://www.diskdoctorsamerica.com/?utm_source=google&utm_medium=organic&utm_campaign=gbp';

export const COLUMBIA_ADDRESS = '10015 Old Columbia Rd Suite B 215, Columbia, MD 21046';
export const TYSONS_ADDRESS = '8300 Boone Blvd Suite 513, Tysons, VA 22182';

// Google Business Profile links (by CID): open the profile with directions and reviews.
export const COLUMBIA_MAPS_URL = 'https://maps.google.com/?cid=14046850434310190420';
export const TYSONS_MAPS_URL = 'https://maps.google.com/?cid=8914738077225716090';

export function telHref(phone?: string): string {
  if (!phone) return PHONE_TEL;
  const digits = phone.replace(/[^\d]/g, '');
  if (digits.length === 11 && digits.startsWith('1')) return `tel:+${digits}`;
  if (digits.length === 10) return `tel:+1${digits}`;
  return PHONE_TEL;
}

export function absoluteUrl(path = '/'): string {
  if (path === '/' || path === '') return SITE_URL_SLASH;
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}
