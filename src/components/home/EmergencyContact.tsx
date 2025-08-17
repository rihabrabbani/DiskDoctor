'use client';

import { motion, Variants } from 'framer-motion';
import Link from 'next/link';

// Define headerVariants with proper typing
const headerVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

// Define containerVariants with proper typing
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Define itemVariants with proper typing
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

export default function EmergencyContact() {
  const contactMethods = [
    {
      title: "24/7 Emergency Line",
      value: "+1 (571) 202-8529",
      icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.836l1.498 4.493a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.493 1.498a1 1 0 01.684.949V17a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
    },
    {
      title: "Email Support",
      value: "shah4268@msn.com",
      icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    },
    {
      title: "Service Areas",
      value: "Columbia, MD | Tysons, VA",
      icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z"
    }
  ];

  return (
    <section id="contact" className="py-16 lg:py-24 bg-[var(--color-surface-100)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={headerVariants}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--color-text-primary)] mb-6">
              Need <span className="text-[var(--color-primary)]">Emergency</span> Data Recovery?
            </h2>
            <p className="text-lg sm:text-xl text-[var(--color-text-secondary)] mb-8 leading-relaxed">
              Don&#39;t let data loss stop your business. Contact our emergency recovery team now for immediate assistance.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {contactMethods.map((method, index) => (
              <motion.div 
                key={index}
                className="text-center"
                variants={itemVariants}
                whileHover={{ 
                  y: -5,
                  transition: { duration: 0.2 }
                }}
              >
                <motion.div 
                  className="w-16 h-16 bg-[var(--color-primary-100)] rounded-full flex items-center justify-center mx-auto mb-4"
                  whileHover={{ 
                    scale: 1.1,
                    backgroundColor: "var(--color-primary-200)",
                    transition: { duration: 0.2 }
                  }}
                >
                  <svg className="w-8 h-8 text-[var(--color-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={method.icon} />
                  </svg>
                </motion.div>
                <h3 className="font-semibold text-[var(--color-text-primary)] mb-2">{method.title}</h3>
                <p className="text-[var(--color-primary)] font-bold">{method.value}</p>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="tel:+15712028529" className="px-8 py-4 bg-[var(--color-accent-600)] hover:bg-[var(--color-accent-hover)] text-white rounded-lg font-semibold transition-all duration-300 shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)] text-center block">
                📞 Call +1 (571) 202-8529
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
                <Link href="mailto:shah4268@msn.com" className="px-8 py-4 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[var(--color-text-inverse)] rounded-lg font-semibold transition-all duration-300 shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)] text-center block">
                Email Us
                </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
