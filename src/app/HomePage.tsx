'use client';

import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import ServicesSection from '@/components/home/ServicesSection';
import RecoveryProcess from '@/components/home/RecoveryProcess';
import HomeLocations from '@/components/home/HomeLocations';
import HomeRecoveries from '@/components/home/HomeRecoveries';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import EmergencyContact from '@/components/home/EmergencyContact';
import ScrollAnimations from '@/components/utils/ScrollAnimations';
import HubspotContactForm from '@/components/contact/HubspotContactForm';
import { homeFaqs } from '@/data/homeFaqs';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)] font-[var(--font-sans)]">
      <ScrollAnimations />
      <Header />

      <main>
        <Hero />
        <ServicesSection />
        <RecoveryProcess />
        <HomeLocations />
        <HomeRecoveries />

        <section id="faq" className="py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)] mb-8 text-center">
              Data recovery FAQs
            </h2>
            {/* Answers stay visible: they must match the FAQPage JSON-LD built from homeFaqs. */}
            <div className="space-y-4">
              {homeFaqs.map((faq) => (
                <div key={faq.question} className="border border-[var(--color-border)] rounded-xl bg-[var(--color-surface-100)] px-5 py-4">
                  <h3 className="font-semibold text-[var(--color-text-primary)] mb-2">{faq.question}</h3>
                  <p className="text-[var(--color-text-secondary)] leading-relaxed">{faq.answer}</p>
                  {faq.link ? (
                    <Link href={faq.link.href} className="inline-block mt-2 text-[var(--color-primary)] font-medium hover:underline">
                      {faq.link.label} →
                    </Link>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </section>

        <TestimonialsSection />

        <section id="evaluation" data-track-position="form_intro" className="py-16 lg:py-24 bg-[var(--color-surface-100)]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)] mb-4 text-center">
                Free data recovery evaluation
              </h2>
              <p className="text-[var(--color-text-secondary)] mb-8 text-center">
                Tell us what failed. A specialist replies within one business day. No data, no charge.
              </p>
              <div className="bg-[var(--color-surface-100)] border border-[var(--color-border)] rounded-2xl p-6 sm:p-8">
                <HubspotContactForm />
              </div>
            </div>
          </div>
        </section>

        <EmergencyContact />
      </main>

      <Footer />
    </div>
  );
}
