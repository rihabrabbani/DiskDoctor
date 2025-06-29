'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const heroVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 1, delay: 0.3, ease: "easeOut" }
  }
};

const statsVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.5
    }
  }
};

const statItemVariants = {
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
            <motion.div 
              className="mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="inline-block bg-[var(--color-primary)] text-white px-4 py-2 rounded-full text-sm font-medium">
                TRUSTED SINCE 1991 • 95% SUCCESS RATE
              </span>
            </motion.div>
            
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6 !text-[#212529]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Your Data is <span className="text-[var(--color-primary)]">Recoverable</span>
            </motion.h1>
            
            <motion.p 
              className="text-lg sm:text-xl text-[var(--color-text-secondary)] mb-8 max-w-2xl leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Professional data recovery from hard drives, SSDs, RAID systems, and all digital media. When your data matters, trust the experts with over 30 years of experience.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="#quote" className="px-8 py-4 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white rounded-lg font-semibold transition-all duration-300 shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)] text-center block">
                  Get Free Evaluation
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="tel:+1 (571) 202-8529" className="px-8 py-4 bg-[var(--color-surface-100)] border border-[var(--color-border)] rounded-lg text-[var(--color-text-primary)] font-semibold hover:shadow-[var(--shadow-md)] hover:border-[var(--color-border-hover)] transition-all duration-300 text-center block">
                  📞 Emergency: +1 (571) 202-8529
                </Link>
              </motion.div>
            </motion.div>
            
            {/* Trust Indicators */}
            <motion.div 
              className="mt-12 flex flex-wrap items-center gap-8"
              variants={statsVariants}
              initial="hidden"
              animate="visible"
            >
              {[
                { value: "95%", label: "Success Rate" },
                { value: "30+", label: "Years Experience" },
                { value: "50K+", label: "Cases Recovered" },
                { value: "24/7", label: "Emergency Service" }
              ].map((stat, index) => (
                <motion.div key={index} className="text-center" variants={statItemVariants}>
                  <div className="text-2xl font-bold text-[var(--color-primary)]">{stat.value}</div>
                  <div className="text-sm text-[var(--color-text-secondary)]">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
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
