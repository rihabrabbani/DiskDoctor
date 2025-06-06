'use client';

import { motion } from 'framer-motion';

interface ServiceProcessProps {
  process: {
    title: string;
    steps: string[];
    detailedSteps?: {
      title: string;
      description: string;
      duration: string;
      icon: string;
    }[];
  };
  additionalContent?: {
    title: string;
    description: string;
    image: string;
  };
  accentColor?: string;
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15
    }
  }
};

const stepVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6 }
  }
};

export default function ServiceProcess({ 
  process, 
  additionalContent,
  accentColor = 'var(--color-primary)'
}: ServiceProcessProps) {
  const useDetailedSteps = process.detailedSteps && process.detailedSteps.length > 0;
  const stepsToShow = useDetailedSteps ? process.detailedSteps! : process.steps.map((step) => ({
    title: step,
    description: '',
    duration: '',
    icon: ''
  }));

  return (
    <section className="py-16 lg:py-24 bg-[var(--color-surface-200)] relative">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, ${accentColor} 2px, transparent 2px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center max-w-4xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="inline-block px-4 py-2 rounded-full text-sm font-medium text-white mb-4"
            style={{ backgroundColor: accentColor }}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            PROVEN METHODOLOGY
          </motion.div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6 text-[var(--color-text-primary)]">
            Our <span style={{ color: accentColor }}>{process.title}</span>
          </h2>
          <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
            We follow industry-leading standards to ensure the highest success rate in data recovery
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {stepsToShow.map((step, index) => (
            <motion.div 
              key={index}
              className="text-center group"
              variants={stepVariants}
              whileHover={{ y: -5 }}
            >
              <motion.div 
                className="relative w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-xl shadow-lg"
                style={{ backgroundColor: accentColor }}
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                {useDetailedSteps && step.icon ? (
                  <span className="text-2xl">{step.icon}</span>
                ) : (
                  String(index + 1).padStart(2, '0')
                )}
                {index < stepsToShow.length - 1 && (
                  <motion.div 
                    className="hidden lg:block absolute left-full top-1/2 w-8 h-0.5 -translate-y-1/2 ml-4"
                    style={{ backgroundColor: accentColor }}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                  />
                )}
              </motion.div>
              
              <h3 className="font-semibold text-lg mb-3 text-[var(--color-text-primary)]">
                {step.title}
              </h3>
              
              {useDetailedSteps && step.description && (
                <p className="text-sm text-[var(--color-text-secondary)] mb-3 leading-relaxed">
                  {step.description}
                </p>
              )}
              
              {useDetailedSteps && step.duration && (
                <motion.div 
                  className="inline-block px-2 py-1 rounded-full text-xs font-medium text-white"
                  style={{ backgroundColor: `${accentColor}80` }}
                >
                  {step.duration}
                </motion.div>
              )}
              
              <motion.div 
                className="w-full h-1 rounded-full bg-[var(--color-border)] overflow-hidden mt-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <motion.div 
                  className="h-full rounded-full"
                  style={{ backgroundColor: accentColor }}
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  transition={{ duration: 1, delay: index * 0.2 }}
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {additionalContent && (
          <motion.div 
            className="bg-[var(--color-surface-100)] rounded-2xl p-8 lg:p-12 shadow-[var(--shadow-lg)] border border-[var(--color-border)]"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div>
                <motion.div 
                  className="inline-block px-3 py-1 rounded-full text-xs font-medium text-white mb-4"
                  style={{ backgroundColor: accentColor }}
                >
                  INDUSTRY EXPERTISE
                </motion.div>
                <h3 className="text-2xl lg:text-3xl font-bold mb-6 text-[var(--color-text-primary)]">
                  {additionalContent.title}
                </h3>
                <p className="text-[var(--color-text-secondary)] leading-relaxed text-lg">
                  {additionalContent.description}
                </p>
                <motion.div 
                  className="mt-6 flex items-center text-sm"
                  style={{ color: accentColor }}
                  whileHover={{ x: 5 }}
                >
                  <span className="mr-2">Learn more about our process</span>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </motion.div>
              </div>
              <div className="relative group">
                <div className="relative h-64 lg:h-80 rounded-xl overflow-hidden shadow-lg">
                  <img
                    src={additionalContent.image}
                    alt={additionalContent.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
                <motion.div 
                  className="absolute -bottom-4 -right-4 h-16 w-16 rounded-full opacity-80 shadow-lg"
                  style={{ backgroundColor: accentColor }}
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
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
