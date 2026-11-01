import type { Metadata } from 'next';
import CorePageLayout from '@/components/corePage/CorePageLayout';
import { mailInDataRecovery } from '@/data/corePages';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: { absolute: mailInDataRecovery.seoTitle },
  description: mailInDataRecovery.seoDescription,
  openGraph: {
    title: mailInDataRecovery.seoTitle,
    description: mailInDataRecovery.seoDescription,
    type: 'website',
    images: ['/images/og-image.jpg'],
    url: `${SITE_URL}${mailInDataRecovery.path}`,
  },
  twitter: {
    card: 'summary_large_image',
    title: mailInDataRecovery.seoTitle,
    description: mailInDataRecovery.seoDescription,
    images: ['/images/og-image.jpg'],
  },
  alternates: {
    canonical: `${SITE_URL}${mailInDataRecovery.path}`,
  },
};

export default function MailInDataRecoveryPage() {
  return <CorePageLayout page={mailInDataRecovery} />;
}
