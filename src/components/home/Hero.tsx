'use client';

import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { PHONE_TEL } from '@/lib/site';

const trustItems: { label: string; href?: string }[] = [
  { label: 'Free shipping to our lab and back', href: '/mail-in-data-recovery' },
  { label: 'Pickup and on-site diagnostics available' },
  { label: '35+ years · 15,000+ cases recovered · 95% success rate' },
  { label: 'ISO 9001 certified · clean room' },
];

// Define variants with proper typing
const heroVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 1, delay: 0.3, ease: "easeOut" }
  }
};

const statsVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.5
    }
  }
};

const statItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
};

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center bg-gradient-to-br from-[var(--color-primary-50)] to-[var(--color-primary-100)] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 right-10 w-72 h-72 bg-[var(--color-primary)] rounded-full mix-blend-multiply filter blur-xl" />
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-[var(--color-accent)] rounded-full mix-blend-multiply filter blur-xl" />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* initial={false}: the headline and subhead are the LCP element, so they render visible
              on the server instead of waiting for hydration and a fade-in. */}
          <motion.div
            initial={false}
            animate="visible"
            variants={heroVariants}
          >
            <motion.h1 
              className="text-4xl sm:text-5xl xl:text-6xl font-bold tracking-tight leading-[1.1] mb-6 !text-[var(--color-text-primary)]"
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Data recovery for hard drives, SSDs and RAID servers
            </motion.h1>
            
            <motion.p 
              className="text-lg sm:text-xl text-[var(--color-text-primary)] mb-8 max-w-2xl leading-relaxed"
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Recovering data since 1991 at our ISO 9001 certified lab and clean room in Columbia, Maryland, with a Virginia office in Tysons by appointment. Free evaluation. No data, no charge.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/contact" className="px-6 py-4 whitespace-nowrap bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white rounded-lg font-semibold transition-all duration-300 shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)] text-center block">
                  Get a free evaluation
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <a href={PHONE_TEL} className="px-6 py-4 whitespace-nowrap bg-[var(--color-surface-100)] border border-[var(--color-border)] rounded-lg text-[var(--color-text-primary)] font-semibold hover:shadow-[var(--shadow-md)] hover:border-[var(--color-border-hover)] transition-all duration-300 text-center block">
                  24/7: (410) 937-7332
                </a>
              </motion.div>
            </motion.div>
            
            {/* Trust strip */}
            <motion.ul 
              className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3"
              variants={statsVariants}
              initial="hidden"
              animate="visible"
            >
              {trustItems.map((item) => (
                <motion.li key={item.label} className="flex items-start gap-2 text-[var(--color-text-primary)] font-medium" variants={statItemVariants}>
                  <svg className="w-5 h-5 mt-0.5 flex-shrink-0 text-[var(--color-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  {item.href ? (
                    <Link href={item.href} className="underline decoration-[var(--color-primary)] underline-offset-4 hover:text-[var(--color-primary)]">
                      {item.label}
                    </Link>
                  ) : (
                    <span>{item.label}</span>
                  )}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
          
          <motion.div 
            className="hidden lg:block relative"
            initial={false}
            animate="visible"
            variants={imageVariants}
          >
            <div className="relative h-[400px] lg:h-[500px] w-full">
              <Image
                src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80"
                alt="Professional data recovery laboratory with technician working on hard drive"
                fill
                className="object-cover rounded-2xl shadow-[var(--shadow-lg)]"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 h-24 w-24 bg-[var(--color-accent)] rounded-full opacity-80" />
            <div className="absolute top-1/2 -right-6 h-16 w-16 bg-[var(--color-primary)] rounded-full opacity-60" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
