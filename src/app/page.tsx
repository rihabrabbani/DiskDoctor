import type { Metadata } from 'next';
import HomePage from './HomePage';
import { faqSchema } from '@/lib/structuredData';
import { homeFaqs } from '@/data/homeFaqs';
import { SITE_URL_SLASH } from '@/lib/site';

const title = 'Data Recovery for Hard Drives, SSD & RAID | MD, VA & DC | DiskDoctor';
const description =
  'Hard drive, SSD, RAID and server data recovery from our ISO 9001 certified Columbia, MD lab. Free evaluation, free shipping both ways, no data, no charge. 24/7: (410) 937-7332.';

export const metadata: Metadata = {
  title: {
    absolute: title,
  },
  description,
  alternates: {
    canonical: SITE_URL_SLASH,
  },
  openGraph: {
    title,
    description,
    url: SITE_URL_SLASH,
    type: 'website',
    siteName: 'DiskDoctor Data Recovery',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'DiskDoctor data recovery lab' }],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/images/og-image.jpg'],
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema(homeFaqs)),
        }}
      />
      <HomePage />
    </>
  );
}
