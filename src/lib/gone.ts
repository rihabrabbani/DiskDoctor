// Pages taken down for good (SEO change list v5, S3): the lab doesn't take phone, SD card or USB
// stick jobs. Middleware answers these paths with 410 Gone, and they are left out of the sitemap,
// the menus, the services lists and the blog listing. Don't redirect them elsewhere.

export const GONE_SERVICE_IDS = ['mobile-recovery', 'photo-recovery'];

export const GONE_BLOG_SLUGS = [
  'guide-to-recovering-data-from-corrupted-sd-cards',
  'mastering-usb-data-recovery-for-damaged-drives',
  'unlocking-data-recovery-for-mobile-devices',
];

export const GONE_PATHS = new Set([
  ...GONE_SERVICE_IDS.map((id) => `/services/${id}`),
  '/services/mobile-device-recovery',
  ...GONE_BLOG_SLUGS.map((slug) => `/blog/${slug}`),
]);

// Blog tags for that work, dropped from the blog's tag list.
const GONE_TAGS = new Set([
  'sd card',
  'sd card recovery',
  'usb recovery',
  'usb data recovery',
  'flash drive',
  'flash drive recovery',
  'mobile recovery',
  'mobile devices',
  'mobile data recovery',
  'smartphone recovery',
  'android recovery',
  'iphone recovery',
]);

export const isGoneTag = (tag: string) => GONE_TAGS.has(tag.trim().toLowerCase());
