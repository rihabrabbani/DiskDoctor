import type { Metadata } from 'next';
import HomePage from './HomePage';
import { faqSchema } from '@/lib/structuredData';
import { homeFaqs } from '@/data/homeFaqs';
import { SITE_URL_SLASH } from '@/lib/site';

export const metadata: Metadata = {
  title: {
    absolute: 'Data Recovery Services in MD, VA & DC | DiskDoctor',
  },
  description:
    'Hard drive, SSD, RAID, and phone data recovery in Columbia MD and Tysons VA. Free evaluation. No data, no charge. Call (410) 937-7332.',
  alternates: {
    canonical: SITE_URL_SLASH,
  },
  openGraph: {
    title: 'Data Recovery Services in MD, VA & DC | DiskDoctor',
    description:
      'Hard drive, SSD, RAID, and phone data recovery in Columbia MD and Tysons VA. Free evaluation. No data, no charge.',
    url: SITE_URL_SLASH,
    type: 'website',
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
