'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { recoveryServices } from '@/data/services';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const headerVariants = {
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
            Professional <span className="text-[var(--color-primary)]">Data Recovery</span> Services
          </h2>
          <p className="text-lg sm:text-xl text-[var(--color-text-secondary)] leading-relaxed">
            Comprehensive data recovery solutions for individuals, businesses, and government agencies.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
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
              <motion.div 
                className="rounded-full w-16 h-16 bg-[var(--color-primary-50)] flex items-center justify-center mb-6 group-hover:bg-[var(--color-primary-100)] transition-colors duration-300"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                <svg className="w-8 h-8 text-[var(--color-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={service.icon} />
                </svg>
              </motion.div>
              <h3 className="text-xl font-semibold mb-3 text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)] transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-[var(--color-text-secondary)] leading-relaxed mb-6">
                {service.description}
              </p>
              <motion.a 
                href="#" 
                className="inline-flex items-center text-[var(--color-primary)] font-medium hover:underline"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                Learn more
                <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </motion.a>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="flex justify-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="#contact" className="px-8 py-4 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[var(--color-text-inverse)] rounded-lg transition-all duration-300 inline-flex items-center font-medium shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)]">
              <span>Start Your Recovery</span>
              <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
