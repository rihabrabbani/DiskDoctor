'use client';

import { motion } from 'framer-motion';
import { LocationData } from '@/data/locations';
import { Phone, Mail, MapPin } from 'lucide-react';

interface LocationHeroProps {
  location: LocationData;
}

export default function LocationHero({ location }: LocationHeroProps) {
  return (
    <section className="relative pt-24 pb-16 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-800)] overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='7'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {location.isHeadOffice && (
              <div className="inline-flex items-center px-4 py-2 bg-[var(--color-text-inverse)]/20 backdrop-blur-sm rounded-full text-[var(--color-text-inverse)] text-sm font-medium mb-6">
                <MapPin className="h-4 w-4 mr-2" />
                Head Office Location
              </div>
            )}
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--color-text-inverse)] mb-6 leading-tight">
              Data Recovery Services in{' '}
              <span className="text-[var(--color-accent)]">{location.city}</span>
              {location.state !== 'DC' && `, ${location.state}`}
            </h1>
            
            <p className="text-xl md:text-2xl text-[var(--color-text-inverse)]/90 mb-8 leading-relaxed max-w-3xl mx-auto">
              {location.heroDescription}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <motion.a
                href={`tel:${location.phone}`}
                className="inline-flex items-center px-8 py-4 bg-[var(--color-accent)] text-[var(--color-text-inverse)] font-semibold rounded-lg hover:bg-[var(--color-accent-hover)] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Phone className="h-5 w-5 mr-3" />
                Call Now: {location.phone}
              </motion.a>
              
              <motion.a
                href="#contact"
                className="inline-flex items-center px-8 py-4 bg-[var(--color-text-inverse)]/20 backdrop-blur-sm text-[var(--color-text-inverse)] font-semibold rounded-lg hover:bg-[var(--color-text-inverse)]/30 transition-all duration-300 border border-[var(--color-text-inverse)]/30"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Mail className="h-5 w-5 mr-3" />
                Get Free Quote
              </motion.a>
            </div>

            {/* Trust Indicators */}
            <motion.div
              className="flex flex-wrap justify-center items-center gap-8 text-[var(--color-text-inverse)]/80"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="flex items-center">
                <div className="h-8 w-8 bg-[var(--color-accent)] rounded-full flex items-center justify-center mr-3">
                  <span className="text-[var(--color-text-inverse)] font-bold text-sm">20+</span>
                </div>
                <span className="text-sm">Years Experience</span>
              </div>
              <div className="flex items-center">
                <div className="h-8 w-8 bg-[var(--color-accent)] rounded-full flex items-center justify-center mr-3">
                  <span className="text-[var(--color-text-inverse)] font-bold text-sm">4.9</span>
                </div>
                <span className="text-sm">Rating (39 Reviews)</span>
              </div>
              <div className="flex items-center">
                <div className="h-8 w-8 bg-[var(--color-accent)] rounded-full flex items-center justify-center mr-3">
                  <span className="text-[var(--color-text-inverse)] font-bold text-sm">24/7</span>
                </div>
                <span className="text-sm">Emergency Service</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-12 fill-[var(--color-surface-100)]" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M1200 120L0 16.48L0 120z" />
        </svg>
      </div>
    </section>
  );
}
