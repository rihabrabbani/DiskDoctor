import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HubspotContactForm from '@/components/contact/HubspotContactForm';

export const metadata: Metadata = {
  title: 'Contact Us | Free Data Recovery Evaluation | DiskDoctor',
  description:
    'Request a free data recovery evaluation. Tell us what happened and a DiskDoctor specialist will contact you shortly. Emergency help available 24/7.',
  alternates: {
    canonical: 'https://www.diskdoctorsamerica.com/contact',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)]">
      <Header />

      <main className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-4xl sm:text-5xl font-bold text-[var(--color-text-primary)] mb-4">
                Free Data Recovery Evaluation
              </h1>
              <p className="text-lg text-[var(--color-text-secondary)] max-w-3xl mx-auto">
                Tell us what happened, and a DiskDoctor recovery specialist will contact you shortly with next steps.
                For urgent cases, call <a href="tel:+14109377332" className="text-[var(--color-primary)] font-semibold">+1 (410) 937-7332</a>.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="bg-[var(--color-surface-100)] border border-[var(--color-border)] rounded-xl p-5">
                <p className="text-sm text-[var(--color-text-tertiary)]">Success Rate</p>
                <p className="text-2xl font-bold text-[var(--color-text-primary)]">95%</p>
              </div>
              <div className="bg-[var(--color-surface-100)] border border-[var(--color-border)] rounded-xl p-5">
                <p className="text-sm text-[var(--color-text-tertiary)]">In Business Since</p>
                <p className="text-2xl font-bold text-[var(--color-text-primary)]">1991</p>
              </div>
              <div className="bg-[var(--color-surface-100)] border border-[var(--color-border)] rounded-xl p-5">
                <p className="text-sm text-[var(--color-text-tertiary)]">Emergency Assistance</p>
                <p className="text-2xl font-bold text-[var(--color-text-primary)]">24/7</p>
              </div>
            </div>

            <div className="bg-white border border-[var(--color-border)] rounded-2xl p-6 sm:p-8 shadow-[var(--shadow-md)]">
              <HubspotContactForm />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}