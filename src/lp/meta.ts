import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/site';
import { AREAS, type AreaId } from './config/areas';
import { TEMPLATES, type TemplateId } from './config/templates';

export const lpPath = (area: AreaId, template: TemplateId) =>
  template === 'raid' ? '/lp/raid-nas-server' : `/lp/${area}/${TEMPLATES[template].slug}`;

// noindex (also sent as X-Robots-Tag from next.config), canonical = self, never in the sitemap.
export function lpMetadata(area: AreaId, template: TemplateId): Metadata {
  const t = TEMPLATES[template];
  const h1 = t.h1(area, AREAS[area].place);
  const title = `${h1.lead}${h1.place ?? ''} | Free diagnosis | Disk Doctors`;
  const description = t.metaDescription(area);
  return {
    title: { absolute: title },
    description,
    // VA pages (section 6): their own og/twitter text instead of the site default, which names Columbia.
    ...(area === 'va'
      ? {
          openGraph: {
            type: 'website',
            locale: 'en_US',
            url: `${SITE_URL}${lpPath(area, template)}`,
            siteName: 'DiskDoctor Data Recovery',
            title,
            description,
            images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'DiskDoctor data recovery' }],
          },
          twitter: { card: 'summary_large_image', title, description, images: ['/images/og-image.jpg'] },
        }
      : {}),
    alternates: { canonical: `${SITE_URL}${lpPath(area, template)}` },
    robots: { index: false },
  };
}
