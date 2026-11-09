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

// Directions links by location slug. `office` is the directions_click param GTM reads via data-office.
export const OFFICE_MAPS: Record<string, { office: 'columbia' | 'tysons'; url: string }> = {
  'columbia-md': { office: 'columbia', url: COLUMBIA_MAPS_URL },
  'tysons-va': { office: 'tysons', url: TYSONS_MAPS_URL },
};

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

// Used by Header, Footer and GlobalSchema (server-rendered with the right path, so pages stay static).
// Brief 9 Nov, section 6: Virginia pages never mention the Columbia lab or where recovery is done, and
// never imply a lab in Virginia. Tysons is only ever "our Tysons office, by appointment".
export const VIRGINIA_CITY_SLUGS = ['tysons-va', 'mclean-va', 'arlington-va', 'alexandria-va', 'great-falls-va'];

export function isVirginiaPath(pathname: string | null | undefined): boolean {
  if (!pathname) return false;
  if (pathname.startsWith('/lp/va/')) return true;
  return VIRGINIA_CITY_SLUGS.includes(pathname.replace(/^\/|\/$/g, ''));
}

export const TYSONS_ADDRESS_LINE = '8300 Boone Blvd, Suite 513, Tysons, VA 22182';
