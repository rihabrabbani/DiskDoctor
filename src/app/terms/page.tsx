import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { EMAIL, SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms for DiskDoctor Data Recovery evaluations and recovery work.',
  alternates: { canonical: `${SITE_URL}/terms` },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <Header />
      <main className="py-16 container mx-auto px-4 max-w-3xl text-[var(--color-text-secondary)] leading-relaxed space-y-4">
        <h1 className="text-4xl font-bold text-[var(--color-text-primary)]">Terms of Service</h1>
        <p>
          Evaluation is free. Paid recovery work proceeds only after you accept a quote. “No data, no
          charge” means no recovery fee if we cannot retrieve the files specified in that quote. Shipping
          to and from our lab is free, and the return drive for your data is included in your fixed
          quote.
        </p>
        <p>
          You warrant that you have the right to authorize recovery of the device you send. We may refuse
          jobs that appear stolen or that would require bypassing account locks we are not permitted to
          bypass.
        </p>
        <p>
          Maryland law governs. Contact {EMAIL} for questions.
        </p>
      </main>
      <Footer />
    </div>
  );
}
