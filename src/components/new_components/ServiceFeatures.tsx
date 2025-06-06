'use client';

import { motion } from 'framer-motion';

interface ServiceFeaturesProps {
  features: string[];
  benefits: string[];
  detailedFeatures?: {
    title: string;
    description: string;
    icon: string;
  }[];
  detailedBenefits?: {
    title: string;
    description: string;
    metric: string;
  }[];
  accentColor?: string;
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
};

export default function ServiceFeatures({ 
  features, 
  benefits,
  detailedFeatures,
  detailedBenefits,
  accentColor = 'var(--color-primary)'
}: ServiceFeaturesProps) {
  return (
    <section className="py-16 lg:py-24 bg-[var(--color-surface-100)] relative">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `linear-gradient(45deg, ${accentColor} 25%, transparent 25%), linear-gradient(-45deg, ${accentColor} 25%, transparent 25%)`,
          backgroundSize: '60px 60px',
          backgroundPosition: '0 0, 0 30px'
        }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
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
            WHY CHOOSE US
          </motion.div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-[var(--color-text-primary)]">
            Professional <span style={{ color: accentColor }}>Excellence</span> in Every Recovery
          </h2>
          <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
            Combining cutting-edge technology with years of expertise to deliver unmatched results
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Enhanced Features with detailed features */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            <motion.div 
              className="flex items-center mb-8"
              variants={itemVariants}
            >
              <motion.div 
                className="w-12 h-12 rounded-full flex items-center justify-center mr-4"
                style={{ backgroundColor: `${accentColor}20` }}
                whileHover={{ scale: 1.1 }}
              >
                <svg className="w-6 h-6" style={{ color: accentColor }} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" clipRule="evenodd" />
                </svg>
              </motion.div>
              <div>
                <h3 className="text-2xl font-bold text-[var(--color-text-primary)]">Service Features</h3>
                <p className="text-[var(--color-text-secondary)]">Advanced technology and proven methods</p>
              </div>
            </motion.div>

            {/* Detailed Features - if available */}
            {detailedFeatures && detailedFeatures.length > 0 ? (
              <motion.div className="space-y-6" variants={containerVariants}>
                {detailedFeatures.map((feature, index) => (
                  <motion.div 
                    key={index}
                    className="p-6 bg-[var(--color-surface-200)] rounded-lg hover:shadow-[var(--shadow-md)] transition-all duration-300 group"
                    variants={itemVariants}
                    whileHover={{ x: 5, scale: 1.02 }}
                  >
                    <div className="flex items-start">
                      <motion.div 
                        className="text-3xl mr-4 flex-shrink-0"
                        whileHover={{ scale: 1.2, rotate: 15 }}
                        transition={{ duration: 0.3 }}
                      >
                        {feature.icon}
                      </motion.div>
                      <div>
                        <h4 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">
                          {feature.title}
                        </h4>
                        <p className="text-[var(--color-text-secondary)] leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              // Fallback to basic features
              <motion.div className="space-y-4" variants={containerVariants}>
                {features.map((feature, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-start p-4 bg-[var(--color-surface-200)] rounded-lg hover:shadow-[var(--shadow-md)] transition-all duration-300 group"
                    variants={itemVariants}
                    whileHover={{ x: 5, scale: 1.02 }}
                  >
                    <motion.div 
                      className="w-6 h-6 rounded-full flex items-center justify-center mr-4 mt-0.5 flex-shrink-0"
                      style={{ backgroundColor: `${accentColor}20` }}
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.3 }}
                    >
                      <svg 
                        className="w-3 h-3" 
                        style={{ color: accentColor }}
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </motion.div>
                    <div>
                      <p className="text-[var(--color-text-primary)] font-medium group-hover:text-[var(--color-text-primary)] leading-relaxed">
                        {feature}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>

          {/* Enhanced Benefits with detailed benefits */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            <motion.div 
              className="flex items-center mb-8"
              variants={itemVariants}
            >
              <motion.div 
                className="w-12 h-12 rounded-full flex items-center justify-center mr-4"
                style={{ backgroundColor: `${accentColor}20` }}
                whileHover={{ scale: 1.1 }}
              >
                <svg className="w-6 h-6" style={{ color: accentColor }} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </motion.div>
              <div>
                <h3 className="text-2xl font-bold text-[var(--color-text-primary)]">Key Benefits</h3>
                <p className="text-[var(--color-text-secondary)]">Why customers choose our services</p>
              </div>
            </motion.div>

            {/* Detailed Benefits - if available */}
            {detailedBenefits && detailedBenefits.length > 0 ? (
              <motion.div className="space-y-6" variants={containerVariants}>
                {detailedBenefits.map((benefit, index) => (
                  <motion.div 
                    key={index}
                    className="p-6 bg-gradient-to-r from-[var(--color-surface-200)] to-[var(--color-surface-100)] rounded-lg border border-[var(--color-border)] hover:shadow-[var(--shadow-lg)] transition-all duration-300 group"
                    variants={itemVariants}
                    whileHover={{ y: -3, borderColor: accentColor, scale: 1.02 }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">
                          {benefit.title}
                        </h4>
                        <p className="text-[var(--color-text-secondary)] leading-relaxed mb-3">
                          {benefit.description}
                        </p>
                        <motion.div 
                          className="inline-block px-3 py-1 rounded-full text-sm font-semibold text-white"
                          style={{ backgroundColor: accentColor }}
                        >
                          {benefit.metric}
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              // Fallback to basic benefits
              <motion.div className="space-y-4" variants={containerVariants}>
                {benefits.map((benefit, index) => (
                  <motion.div 
                    key={index}
                    className="p-6 bg-gradient-to-r from-[var(--color-surface-200)] to-[var(--color-surface-100)] rounded-lg border border-[var(--color-border)] hover:shadow-[var(--shadow-lg)] transition-all duration-300 group"
                    variants={itemVariants}
                    whileHover={{ y: -3, borderColor: accentColor, scale: 1.02 }}
                  >
                    {/* ...existing basic benefit content... */}
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
