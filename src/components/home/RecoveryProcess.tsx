'use client';

import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import { recoverySteps } from '@/data/services';

// Define variants with proper typing
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15
    }
  }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: { 
      duration: 0.6, 
      ease: "easeOut",
      type: "spring",
      stiffness: 100
    }
  }
};

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const progressBarVariants: Variants = {
  hidden: { scaleX: 0 },
  visible: { 
    scaleX: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export default function RecoveryProcess() {
  return (
    <section className="py-16 lg:py-24 bg-[var(--color-surface-200)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center max-w-4xl mx-auto mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={headerVariants}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-[var(--color-text-primary)]">
            Our Recovery <span className="text-[var(--color-primary)]">Process</span>
          </h2>
          <p className="text-lg sm:text-xl text-[var(--color-text-secondary)] leading-relaxed">
            Professional, secure, and transparent data recovery in 4 simple steps.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {recoverySteps.map((step, index) => (
            <motion.div 
              key={index}
              className="group relative rounded-2xl overflow-hidden shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)] transition-all duration-300"
              variants={cardVariants}
              whileHover={{ 
                y: -10,
                scale: 1.03,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
            >
              <div className="relative h-64 lg:h-72 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/70 z-10"></div>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                >
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    className="object-cover"
                  />
                </motion.div>
                
                <motion.div 
                  className="absolute top-4 left-4 z-20"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <motion.div 
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
                    style={{ backgroundColor: step.color }}
                    whileHover={{ 
                      scale: 1.2,
                      rotate: 360,
                      transition: { duration: 0.5 }
                    }}
                  >
                    {step.step}
                  </motion.div>
                </motion.div>
                
                <motion.div 
                  className="absolute bottom-4 left-4 right-4 z-20"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
                >
                  <h3 className="text-white text-lg font-semibold leading-tight mb-2">
                    {step.title}
                  </h3>
                  <p className="text-white/90 text-sm">
                    {step.description}
                  </p>
                </motion.div>
              </div>
              
              <motion.div 
                className="absolute bottom-0 left-0 right-0 h-1 origin-left"
                style={{ backgroundColor: step.color }}
                variants={progressBarVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.5 }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
