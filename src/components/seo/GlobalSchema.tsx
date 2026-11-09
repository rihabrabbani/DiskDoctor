'use client';

import { usePathname } from 'next/navigation';
import { isVirginiaPath } from '@/lib/site';
import {
  columbiaLocalBusinessSchema,
  organizationSchema,
  tysonsLocalBusinessSchema,
  websiteSchema,
} from '@/lib/structuredData';

// Site-wide JSON-LD. A client component only so it knows the path: it still renders into the
// server HTML (static pages stay static). Virginia pages (brief 9 Nov, section 6) get the Tysons
// office LocalBusiness only, with no Columbia address anywhere in their schema.
export default function GlobalSchema() {
  const schemas = isVirginiaPath(usePathname())
    ? [tysonsLocalBusinessSchema]
    : [organizationSchema, websiteSchema, columbiaLocalBusinessSchema, tysonsLocalBusinessSchema];
  return (
    <>
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
    </>
  );
}
