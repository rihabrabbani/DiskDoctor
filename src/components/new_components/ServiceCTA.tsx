'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

interface ServiceCTAProps {
  ctaSection: {
    title: string;
    description: string;
    primaryButton: string;
    secondaryButton?: string;
    urgencyText?: string;
  };
  accentColor?: string;
}

export default function ServiceCTA({ 
  ctaSection,
  accentColor = 'var(--color-primary)'
}: ServiceCTAProps) {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-[var(--color-primary-50)] to-[var(--color-primary-100)] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <motion.div 
          className="absolute top-10 left-10 w-32 h-32 rounded-full"
          style={{ backgroundColor: accentColor }}
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-10 right-10 w-24 h-24 rounded-full"
          style={{ backgroundColor: accentColor }}
          animate={{ scale: [1.2, 1, 1.2], rotate: [360, 180, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="max-w-5xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {ctaSection.urgencyText && (
            <motion.div 
              className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium text-white mb-6"
              style={{ backgroundColor: accentColor }}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {ctaSection.urgencyText}
            </motion.div>
          )}

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--color-text-primary)] mb-6">
            {ctaSection.title}
          </h2>
          <p className="text-lg lg:text-xl text-[var(--color-text-secondary)] mb-8 leading-relaxed max-w-3xl mx-auto">
            {ctaSection.description}
          </p>
          
          {/* Trust indicators */}
          <motion.div 
            className="flex flex-wrap justify-center gap-6 mb-10 text-sm text-[var(--color-text-secondary)]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              No Data, No Charge
            </div>
            <div className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              ISO 9001 Certified
            </div>
            <div className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Class 10 Clean Room
            </div>
            <div className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              95% Success Rate
            </div>
          </motion.div>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                href="#quote" 
                className="px-8 py-4 text-white rounded-lg font-semibold transition-all duration-300 shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)] text-center block group relative overflow-hidden"
                style={{ backgroundColor: accentColor }}
              >
                <span className="relative z-10">{ctaSection.primaryButton}</span>
                <motion.div 
                  className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20"
                  whileHover={{ opacity: 0.2 }}
                />
              </Link>
            </motion.div>
            {ctaSection.secondaryButton && (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="#contact" className="px-8 py-4 bg-[var(--color-surface-100)] border-2 border-[var(--color-border)] rounded-lg text-[var(--color-text-primary)] font-semibold hover:shadow-[var(--shadow-md)] hover:border-[var(--color-border-hover)] transition-all duration-300 text-center block">
                  {ctaSection.secondaryButton}
                </Link>
              </motion.div>
            )}
          </motion.div>

          {/* Contact info */}
          <motion.div 
            className="text-center text-[var(--color-text-secondary)]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <p className="text-sm mb-2">Available 24/7 for Emergency Recovery</p>
            <p className="text-xs">Average response time: Under 30 minutes</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
