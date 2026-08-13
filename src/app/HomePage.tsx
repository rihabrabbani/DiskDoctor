'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import ServicesSection from '@/components/home/ServicesSection';
import RecoveryProcess from '@/components/home/RecoveryProcess';
import CaseStudiesCarousel from '@/components/home/CaseStudiesCarousel';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import EmergencyContact from '@/components/home/EmergencyContact';
import ScrollAnimations from '@/components/utils/ScrollAnimations';
import HubspotContactForm from '@/components/contact/HubspotContactForm';
import { homeFaqs } from '@/data/homeFaqs';

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)] font-[var(--font-sans)]">
      <ScrollAnimations />
      <Header />

      <main>
        <Hero />
        <ServicesSection />
        <RecoveryProcess />
        <CaseStudiesCarousel />
        <TestimonialsSection />

        <section id="evaluation" className="py-16 lg:py-24 bg-[var(--color-surface-100)]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)] mb-4 text-center">
                Free data recovery evaluation
              </h2>
              <p className="text-[var(--color-text-secondary)] mb-8 text-center">
                Tell us what failed. A specialist replies with next steps. No data, no charge.
              </p>
              <div className="bg-white border border-[var(--color-border)] rounded-2xl p-6 sm:p-8">
                <HubspotContactForm />
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)] mb-8 text-center">
              Data recovery FAQs
            </h2>
            <div className="space-y-3">
              {homeFaqs.map((faq, index) => (
                <div key={faq.question} className="border border-[var(--color-border)] rounded-xl bg-[var(--color-surface-100)]">
                  <button
                    type="button"
                    className="w-full text-left px-5 py-4 font-semibold text-[var(--color-text-primary)]"
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    aria-expanded={openFaq === index}
                  >
                    {faq.question}
                  </button>
                  {openFaq === index ? (
                    <p className="px-5 pb-4 text-[var(--color-text-secondary)] leading-relaxed">
                      {faq.answer}
                    </p>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </section>

        <EmergencyContact />
      </main>

      <Footer />
    </div>
  );
}
