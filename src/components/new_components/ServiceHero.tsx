'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface ServiceHeroProps {
  title: string;
  subtitle: string;
  description: string;
  heroImage: string;
  layoutType: 'hero-left' | 'hero-center' | 'hero-split' | 'hero-overlay' | 'hero-video' | 'hero-carousel';
  ctaSection: {
    title: string;
    description: string;
    primaryButton: string;
    secondaryButton?: string;
    urgencyText?: string;
  };
  accentColor?: string;
}

export default function ServiceHero({ 
  title, 
  subtitle, 
  description, 
  heroImage,
  layoutType,
  ctaSection,
  accentColor = 'var(--color-primary)'
}: ServiceHeroProps) {
  const getLayoutClasses = () => {
    switch (layoutType) {
      case 'hero-center':
        return 'text-center max-w-4xl mx-auto';
      case 'hero-split':
        return 'grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center';
      case 'hero-overlay':
        return 'relative text-center text-white';
      default:
        return 'grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center';
    }
  };

  const isOverlay = layoutType === 'hero-overlay';

  return (
    <section className={`relative min-h-[80vh] flex items-center overflow-hidden ${
      isOverlay 
        ? 'bg-black' 
        : 'bg-gradient-to-br from-[var(--color-primary-50)] to-[var(--color-primary-100)]'
    }`}>
      {/* Enhanced Background Pattern */}
      {!isOverlay && (
        <div className="absolute inset-0 opacity-10">
          <motion.div 
            className="absolute top-20 right-20 w-64 h-64 rounded-full mix-blend-multiply filter blur-xl"
            style={{ backgroundColor: accentColor }}
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.7, 0.3],
              rotate: [0, 180, 360]
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute bottom-20 left-20 w-48 h-48 rounded-full mix-blend-multiply filter blur-xl"
            style={{ backgroundColor: accentColor }}
            animate={{ 
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.5, 0.2],
              rotate: [360, 180, 0]
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      )}

      {/* Overlay background */}
      {isOverlay && (
        <div className="absolute inset-0">
          <Image
            src={heroImage}
            alt={title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
      )}
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={getLayoutClasses()}>
          <motion.div
            initial={{ opacity: 0, x: layoutType === 'hero-center' ? 0 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className={layoutType === 'hero-center' ? 'text-center' : ''}
          >
            <motion.div 
              className="mb-6 mt-2"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span 
              className="inline-flex items-center text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg"
              style={{ backgroundColor: accentColor }}
              >
              <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></span>
              PROFESSIONAL DATA RECOVERY
              </span>
            </motion.div>
            
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-6 !text-[#212529]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {title.split(' ').map((word, index) => (
                <motion.span
                  key={index}
                  className="inline-block mr-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>
            
            <motion.p 
              className="text-xl lg:text-2xl font-medium mb-6"
              style={{ color: accentColor }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {subtitle}
            </motion.p>
            
            <motion.p 
              className="text-lg text-[var(--color-text-secondary)] mb-8 leading-relaxed max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {description}
            </motion.p>

            {/* Trust indicators */}
            <motion.div 
              className="flex flex-wrap gap-4 mb-8 text-sm text-[var(--color-text-secondary)]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
            >
              <div className="flex items-center bg-[var(--color-surface-100)] px-3 py-1 rounded-full">
                <span className="text-green-500 mr-1">✓</span>
                95% Success Rate
              </div>
              <div className="flex items-center bg-[var(--color-surface-100)] px-3 py-1 rounded-full">
                <span className="text-green-500 mr-1">✓</span>
                24/7 Emergency
              </div>
              <div className="flex items-center bg-[var(--color-surface-100)] px-3 py-1 rounded-full">
                <span className="text-green-500 mr-1">✓</span>
                No Data, No Charge
              </div>
            </motion.div>
            
            {/* Enhanced CTA buttons using ctaSection data */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link 
                  href="#quote" 
                  className="px-8 py-4 text-white rounded-lg font-semibold transition-all duration-300 shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)] hover:brightness-110 text-center block relative overflow-hidden group"
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
                  <Link href="tel:+1-800-DISKDOC" className="px-8 py-4 bg-[var(--color-surface-100)] border-2 border-[var(--color-border)] rounded-lg text-[var(--color-text-primary)] font-semibold hover:shadow-[var(--shadow-md)] hover:border-[var(--color-border-hover)] transition-all duration-300 text-center block">
                    {ctaSection.secondaryButton}
                  </Link>
                </motion.div>
              )}
            </motion.div>

            {/* Urgency text */}
            {ctaSection.urgencyText && (
              <motion.p
                className="mt-4 text-sm text-[var(--color-text-secondary)] font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                {ctaSection.urgencyText}
              </motion.p>
            )}
          </motion.div>
          
          {/* Image section - only show if not overlay */}
          {!isOverlay && layoutType !== 'hero-center' && (
            <motion.div 
              className="relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              <div className="relative h-[400px] lg:h-[500px] w-full group">
                <Image
                  src={heroImage}
                  alt={title}
                  fill
                  className="object-cover rounded-2xl shadow-[var(--shadow-xl)] group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
                
                {/* Floating elements */}
                <motion.div 
                  className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                >
                  <div className="text-sm font-semibold" style={{ color: accentColor }}>
                    ISO 9001 Certified
                  </div>
                </motion.div>
                
                <motion.div 
                  className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.4, duration: 0.5 }}
                >
                  <div className="text-sm font-semibold" style={{ color: accentColor }}>
                    Class 10 Clean Room
                  </div>
                </motion.div>
              </div>
              
              <motion.div 
                className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full opacity-80 shadow-lg"
                style={{ backgroundColor: accentColor }}
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.6, 0.9, 0.6]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
