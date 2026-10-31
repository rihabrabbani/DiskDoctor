import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { PHONE_TEL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Thank You',
  description: 'Your free data recovery evaluation request has been received.',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)]">
      <Header />

      <main className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold text-[var(--color-text-primary)] mb-6">
              Thanks, we&apos;ve got your request.
            </h1>
            <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed mb-6">
              A DiskDoctor specialist will reply within one business day. If your data is urgent, our
              emergency line is answered 24/7:{' '}
              <a href={PHONE_TEL} className="text-[var(--color-primary)] font-semibold">
                (410) 937-7332
              </a>
              .
            </p>
            <div className="bg-[var(--color-surface-100)] border border-[var(--color-border)] rounded-2xl p-6 sm:p-8 mb-8">
              <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
                <strong className="text-[var(--color-text-primary)]">While you wait:</strong> power the
                device down. Don&apos;t run CHKDSK, Disk Utility First Aid or a RAID rebuild, and keep
                failed drives in the order they came out of the array.
              </p>
            </div>
            <Link href="/" className="text-[var(--color-primary)] font-semibold hover:underline">
              Back to the homepage
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
