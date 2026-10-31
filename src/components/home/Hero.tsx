'use client';

import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { PHONE_TEL } from '@/lib/site';

// Item 1 links to /free-pickup-and-mail-in once the pickup details are confirmed and that page is live.
const trustItems = [
  'Free pickup and drop-off across the Northeast',
  'On-site diagnostics in special cases',
  '35+ years · 15,000+ cases recovered · 95% success rate',
  'ISO 9001 certified · clean room',
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
        <motion.div 
          className="absolute top-10 right-10 w-72 h-72 bg-[var(--color-primary)] rounded-full mix-blend-multiply filter blur-xl"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
        <motion.div 
          className="absolute bottom-10 left-10 w-72 h-72 bg-[var(--color-accent)] rounded-full mix-blend-multiply filter blur-xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ 
            duration: 5, 
            delay: 1,
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={heroVariants}
          >
            <motion.h1 
              className="text-4xl sm:text-5xl xl:text-6xl font-bold tracking-tight leading-[1.1] mb-6 !text-[#212529]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Data recovery for hard drives, SSDs and RAID servers
            </motion.h1>
            
            <motion.p 
              className="text-lg sm:text-xl text-[var(--color-neutral-800)] mb-8 max-w-2xl leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
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
                <motion.li key={item} className="flex items-start gap-2 text-[var(--color-neutral-800)] font-medium" variants={statItemVariants}>
                  <svg className="w-5 h-5 mt-0.5 flex-shrink-0 text-[var(--color-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{item}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
          
          <motion.div 
            className="hidden lg:block relative"
            initial="hidden"
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
            <motion.div 
              className="absolute -bottom-6 -left-6 h-24 w-24 bg-[var(--color-accent)] rounded-full opacity-80"
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.6, 0.9, 0.6]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div 
              className="absolute top-1/2 -right-6 h-16 w-16 bg-[var(--color-primary)] rounded-full opacity-60"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.4, 0.8, 0.4]
              }}
              transition={{ 
                duration: 4, 
                delay: 1,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
