import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { COLUMBIA_ADDRESS, PHONE_DISPLAY, PHONE_TEL, SITE_URL, TYSONS_ADDRESS } from '@/lib/site';
import Link from 'next/link';

export const metadata: Metadata = {
  title: {
    absolute: 'About the Columbia MD Lab | DiskDoctor',
  },
  description:
    'DiskDoctor Data Recovery operates the Columbia MD laboratory at 10015 Old Columbia Rd and a Tysons VA office by appointment. ISO 9001 certified, recovering data since 1991.',
  alternates: { canonical: `${SITE_URL}/about` },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <Header />
      <main className="py-16 lg:py-24">
        <article className="container mx-auto px-4 max-w-3xl text-lg text-[var(--color-text-secondary)] leading-relaxed space-y-5">
          <h1 className="text-4xl font-bold text-[var(--color-text-primary)] mb-6">
            About DiskDoctor Data Recovery
          </h1>
          <p>
            This website is the Columbia, Maryland and Tysons, Virginia operation at{' '}
            {COLUMBIA_ADDRESS}. We recover failed hard drives, SSDs, RAID arrays, and phones.
            The laboratory has been doing that work since 1991: 35+ years, 15,000+ cases recovered
            and a 95% success rate.
          </p>
          <p>
            The Columbia lab is ISO 9001 certified, and open-drive work is done in its clean room.
          </p>
          <p>
            Head office and recovery lab: {COLUMBIA_ADDRESS}. Walk-in weekdays 8:30 a.m.–5:00 p.m.
            24/7 emergency line:{' '}
            <a className="text-[var(--color-primary)] font-semibold" href={PHONE_TEL}>{PHONE_DISPLAY}</a>.
            Tysons: {TYSONS_ADDRESS}, an office by appointment — staff are not always present.
            Recovery work is performed in the Columbia lab.
          </p>
          <p>
            We do not run extra storefronts in Baltimore, Washington DC, Rockville, or the other
            cities listed on this site. Those pages are service areas for the same lab. If a
            directory still points at another domain for this address and phone number, that is a
            leftover citation. This site is how you reach this lab.
          </p>
          <p>
            Process: power the device down, drop it off or ship it, free evaluation, fixed quote
            before paid work, clone first, return files on new media. No data, no charge on the
            recovery fee if we cannot retrieve what you need. Confidentiality and chain-of-custody
            are available for legal and medical media.
          </p>
          <p>
            <Link href="/contact" className="text-[var(--color-primary)] font-semibold">Request a free evaluation</Link>
            {' '}or see <Link href="/locations" className="text-[var(--color-primary)] font-semibold">locations</Link>.
          </p>
        </article>
      </main>
      <Footer />
    </div>
  );
}
