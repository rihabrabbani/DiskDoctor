import type { Metadata } from 'next';
import CorePageLayout from '@/components/corePage/CorePageLayout';
import { dataRecoveryCost } from '@/data/corePages';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: { absolute: dataRecoveryCost.seoTitle },
  description: dataRecoveryCost.seoDescription,
  openGraph: {
    title: dataRecoveryCost.seoTitle,
    description: dataRecoveryCost.seoDescription,
    type: 'website',
    images: ['/images/og-image.jpg'],
    url: `${SITE_URL}${dataRecoveryCost.path}`,
  },
  twitter: {
    card: 'summary_large_image',
    title: dataRecoveryCost.seoTitle,
    description: dataRecoveryCost.seoDescription,
    images: ['/images/og-image.jpg'],
  },
  alternates: {
    canonical: `${SITE_URL}${dataRecoveryCost.path}`,
  },
};

export default function DataRecoveryCostPage() {
  return <CorePageLayout page={dataRecoveryCost} />;
}
