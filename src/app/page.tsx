'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import ServicesSection from '@/components/home/ServicesSection';
import RecoveryProcess from '@/components/home/RecoveryProcess';
import CaseStudiesCarousel from '@/components/home/CaseStudiesCarousel';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import EmergencyContact from '@/components/home/EmergencyContact';
import ScrollAnimations from '@/components/utils/ScrollAnimations';
import { faqSchema } from '@/lib/structuredData';

export default function Home() {
  // FAQ data for structured data
  const faqData = [
    {
      question: "What is your data recovery success rate?",
      answer: "We maintain a 95% success rate in data recovery, with over 30 years of experience and advanced recovery techniques."
    },
    {
      question: "Do you offer free evaluations?",
      answer: "Yes, we provide free diagnostic evaluations for all data recovery cases. You only pay if we successfully recover your data."
    },
    {
      question: "How long does data recovery take?",
      answer: "Recovery time varies depending on the complexity of the case. Simple recoveries can be completed within 24-48 hours, while complex cases may take 3-7 days."
    },
    {
      question: "What types of devices can you recover data from?",
      answer: "We recover data from hard drives, SSDs, RAID arrays, mobile devices, memory cards, USB drives, and virtually any digital storage media."
    },
    {
      question: "Do you offer emergency data recovery services?",
      answer: "Yes, we provide 24/7 emergency data recovery services for critical business data and time-sensitive cases."
    },
    {
      question: "Is my data secure during the recovery process?",
      answer: "Absolutely. We maintain strict confidentiality and use secure, ISO-certified facilities with advanced security protocols to protect your data."
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)] font-[var(--font-sans)]">
      {/* FAQ Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema(faqData))
        }}
      />
      
      {/* Initialize scroll animations */}
      <ScrollAnimations />
      
      {/* Header with Data Recovery Focus */}
      <Header />

      {/* Main Content */}
      <main>
        {/* Hero Section - Data Recovery Focus */}
        <Hero />

        {/* Data Recovery Services Section */}
        <ServicesSection />

        {/* Recovery Process Section */}
        <RecoveryProcess />

        {/* Success Stories Carousel */}
        <CaseStudiesCarousel />
        
        {/* Client Testimonials Section */}
        <TestimonialsSection />

        {/* Emergency Contact Section */}
        <EmergencyContact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
