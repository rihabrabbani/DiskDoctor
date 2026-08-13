import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { EMAIL, SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How DiskDoctor Data Recovery handles contact-form and recovery-job information.',
  alternates: { canonical: `${SITE_URL}/privacy` },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <Header />
      <main className="py-16 container mx-auto px-4 max-w-3xl text-[var(--color-text-secondary)] leading-relaxed space-y-4">
        <h1 className="text-4xl font-bold text-[var(--color-text-primary)]">Privacy Policy</h1>
        <p>
          DiskDoctor Data Recovery (Columbia, MD) collects the information you submit on our contact
          form and the details needed to diagnose a recovery job. That data is used to quote, recover,
          and return your files. We do not sell it.
        </p>
        <p>
          The form is processed by HubSpot. Analytics (when configured) measure page views and
          conversions. Recovered files are returned on media you receive; we do not keep extra copies
          longer than needed to confirm delivery unless you ask us to retain them.
        </p>
        <p>
          Questions: {EMAIL}.
        </p>
      </main>
      <Footer />
    </div>
  );
}
