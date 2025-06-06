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

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)] font-[var(--font-sans)]">
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
