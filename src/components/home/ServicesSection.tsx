'use client';

import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import { recoveryServices } from '@/data/services';
import type { LabPhotoCode } from '@/data/labPhotos';
import LabFigure from '@/components/lab/LabFigure';

// Card photos (manifest "/" what_we_recover). Cards without one show their icon in the same 16:9 box,
// so every card in a row lines up.
const CARD_PHOTOS: Record<string, LabPhotoCode> = {
  'hard-drive-recovery': 'P8',
  'ssd-recovery': 'P10',
  'raid-recovery': 'P17',
  'nas-recovery': 'P9',
};

// Define variants with proper typing
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

export default function ServicesSection() {
  return (
    <section id="services" className="py-16 lg:py-24 bg-[var(--color-surface-100)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center max-w-4xl mx-auto mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={headerVariants}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-[var(--color-text-primary)]">
            What we <span className="text-[var(--color-primary)]">recover</span>
          </h2>
          <p className="text-lg sm:text-xl text-[var(--color-text-secondary)] leading-relaxed">
            Hard drives, SSDs, RAID arrays, NAS units and business servers, recovered in our Columbia, MD lab.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {recoveryServices.map((service) => (
            <motion.div 
              key={service.id}
              className="bg-[var(--color-surface-100)] border border-[var(--color-border)] p-6 lg:p-8 rounded-2xl hover:shadow-[var(--shadow-lg)] hover:border-[var(--color-primary-200)] transition-all duration-300 group"
              variants={itemVariants}
              whileHover={{ 
                y: -5,
                transition: { duration: 0.2 }
              }}
            >
              {CARD_PHOTOS[service.id] ? (
                <LabFigure
                  code={CARD_PHOTOS[service.id]}
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                  aspect="16 / 9"
                  caption={false}
                  className="mb-6"
                />
              ) : (
                <div className="mb-6 aspect-[16/9] rounded-[14px] bg-[var(--color-primary-50)] group-hover:bg-[var(--color-primary-100)] transition-colors duration-300 flex items-center justify-center">
                  <svg className="w-12 h-12 text-[var(--color-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={service.icon} />
                  </svg>
                </div>
              )}
              <h3 className="text-xl font-semibold mb-3 text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)] transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-[var(--color-text-secondary)] leading-relaxed mb-6">
                {service.description}
              </p>
              <Link
                href={service.href}
                className="inline-flex items-center text-[var(--color-primary)] font-medium hover:underline"
              >
                Learn more<span className="sr-only"> about {service.title.toLowerCase()}</span>
                <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="flex justify-center mt-10">
          <Link href="/services" className="text-[var(--color-primary)] font-medium hover:underline">
            All services →
          </Link>
        </div>
      </div>
    </section>
  );
}
