'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { LocationData } from '@/data/locations';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useState } from 'react';
import { telHref } from '@/lib/site';

interface LocationFAQProps {
  location: LocationData;
  faqs: { question: string; answer: string }[];
}

export default function LocationFAQ({ location, faqs }: LocationFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-[var(--color-background)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-text)] mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-[var(--color-text-light)] max-w-3xl mx-auto leading-relaxed">
            Common questions about data recovery services in {location.fullName} and how we can help you.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="bg-[var(--color-surface-100)] rounded-xl border border-[var(--color-border)] overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <motion.button
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-[var(--color-surface-200)] transition-colors duration-200"
                  onClick={() => toggleFAQ(index)}
                  whileHover={{ backgroundColor: 'var(--color-surface-200)' }}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 h-8 w-8 bg-[var(--color-primary)] rounded-lg flex items-center justify-center mt-1">
                      <HelpCircle className="h-5 w-5 text-[var(--color-text-inverse)]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[var(--color-text)]">
                        {faq.question}
                      </h3>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown className="h-5 w-5 text-[var(--color-text-light)]" />
                  </motion.div>
                </motion.button>
                
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pl-18">
                        <p className="text-[var(--color-text-light)] leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Additional local FAQ section */}
        <motion.div
          className="mt-16 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)] rounded-2xl p-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center text-[var(--color-text-inverse)]">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Have Questions About Data Recovery in {location.city}?
            </h3>
            <p className="text-[var(--color-text-inverse)]/90 text-lg mb-6 max-w-2xl mx-auto">
              Our {location.fullName} data recovery experts are here to answer your questions 
              and provide personalized guidance for your specific situation.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href={telHref(location.phone)}
                className="inline-flex items-center px-8 py-4 bg-[var(--color-accent)] text-[var(--color-text-inverse)] font-semibold rounded-lg hover:bg-[var(--color-accent-hover)] transition-all duration-300 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Call {location.phone}
              </motion.a>
              
              <motion.a
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-[var(--color-text-inverse)]/20 backdrop-blur-sm text-[var(--color-text-inverse)] font-semibold rounded-lg hover:bg-[var(--color-text-inverse)]/30 transition-all duration-300 border border-[var(--color-text-inverse)]/30"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Get Expert Consultation
              </motion.a>
            </div>

            <p className="text-[var(--color-text-inverse)]/70 text-sm mt-4">
              Free consultation • No obligation • Expert advice
            </p>
          </div>
        </motion.div>

        {/* Local keywords for SEO */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-sm text-[var(--color-text-light)] max-w-4xl mx-auto leading-relaxed">
            <strong>Professional data recovery services in {location.fullName}</strong> - 
            Serving {location.nearbyAreas.slice(0, 4).join(', ')} and surrounding areas. 
            Specializing in hard drive recovery, SSD data recovery, RAID reconstruction, 
            mobile device recovery, and emergency data recovery services. 
            {location.isHeadOffice && ' Our head office location provides comprehensive data recovery solutions with on-site cleanroom facilities.'}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
