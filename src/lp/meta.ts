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
  return {
    title: { absolute: `${h1.lead}${h1.place ?? ''} | Free diagnosis | Disk Doctors` },
    description: t.metaDescription(area),
    alternates: { canonical: `${SITE_URL}${lpPath(area, template)}` },
    robots: { index: false },
  };
}
