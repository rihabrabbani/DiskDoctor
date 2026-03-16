'use client';

import { motion } from 'framer-motion';
import { LocationData } from '@/data/locations';
import { Phone, Truck, Search, FileCheck } from 'lucide-react';

interface LocationProcessProps {
  location: LocationData;
}

const processSteps = [
  {
    icon: Phone,
    title: 'Free Consultation',
    description: 'Call our experts for immediate assistance and initial diagnosis',
    details: ['Describe your data loss situation', 'Get expert advice over the phone', 'Receive preliminary cost estimate', 'Schedule device pickup or drop-off']
  },
  {
    icon: Truck,
    title: 'Secure Pickup',
    description: 'Safe and secure device collection from your location',
    details: ['Free pickup in metro area', 'Secure chain of custody', 'Device tracking system', 'Insurance coverage included']
  },
  {
    icon: Search,
    title: 'Expert Analysis',
    description: 'Comprehensive evaluation in our certified cleanroom facility',
    details: ['Professional diagnostic testing', 'Detailed damage assessment', 'Success probability evaluation', 'Fixed price quote provided']
  },
  {
    icon: FileCheck,
    title: 'Data Recovery',
    description: 'Advanced recovery techniques to restore your valuable data',
    details: ['Cleanroom recovery process', 'Multiple recovery methods', 'Quality assurance testing', 'Secure data delivery']
  }
];

export default function LocationProcess({ location }: LocationProcessProps) {
  return (
    <section className="py-20 bg-[var(--color-surface-100)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-text-primary)] mb-6">
            Our Data Recovery Process in {location.city}
          </h2>
          <p className="text-xl text-[var(--color-text-secondary)] max-w-3xl mx-auto leading-relaxed">
            We follow a proven 4-step process to ensure the highest success rate for data recovery 
            in {location.fullName} and surrounding areas.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10"
          initial="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {processSteps.map((step, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center text-center group h-full"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
            >
              <div className="flex-1 flex flex-col items-center">
                {/* Icon Circle with Step Number */}
                <motion.div 
                  className="relative w-24 h-24 rounded-2xl bg-gradient-to-br from-[var(--color-surface-200)] to-[var(--color-surface-100)] border border-[var(--color-border)] flex items-center justify-center mb-8 shadow-sm group-hover:shadow-md transition-all duration-300 z-10"
                  whileHover={{ scale: 1.05, borderColor: 'var(--color-primary)' }}
                >
                  <step.icon className="h-10 w-10 text-[var(--color-primary)]" />
                  <div className="absolute -top-3 -right-3 h-8 w-8 bg-[var(--color-accent)] rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md border-2 border-[var(--color-surface-100)]">
                    {index + 1}
                  </div>

                  {/* Connector line with Arrow (Desktop only) */}
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute left-[120%] top-1/2 w-16 h-0.5 -translate-y-1/2 z-0">
                      <motion.div 
                        className="w-full h-full relative"
                        style={{ backgroundColor: 'var(--color-border)', originX: 0 }}
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ duration: 0.8, delay: 0.5 + index * 0.2 }}
                      >
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 border-t-2 border-r-2 border-[var(--color-border)] rotate-45" />
                      </motion.div>
                    </div>
                  )}
                </motion.div>

                <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-4 min-h-[56px] flex items-center group-hover:text-[var(--color-primary)] transition-colors">
                  {step.title}
                </h3>
                
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-8 px-2 max-w-[240px]">
                  {step.description}
                </p>
              </div>

              {/* Detail Pills */}
              <div className="mt-auto w-full space-y-2">
                {step.details.slice(0, 2).map((detail, dIndex) => (
                  <div 
                    key={dIndex} 
                    className="py-2 px-3 bg-[var(--color-surface-200)] rounded-lg text-[11px] text-[var(--color-text-secondary)] border border-transparent group-hover:border-[var(--color-border)] transition-all flex items-center justify-center"
                  >
                    <div className="w-1 h-1 bg-[var(--color-accent)] rounded-full mr-2" />
                    {detail}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Emergency Service Highlight */}
        <motion.div
      className="mt-20 bg-gradient-to-r from-[var(--color-surface-100)] to-[var(--color-surface-200)] rounded-2xl p-8 border-l-4 border-[var(--color-accent)]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0 h-12 w-12 bg-[var(--color-primary)] rounded-full flex items-center justify-center">
              <Phone className="h-6 w-6 text-[var(--color-text-inverse)]" />
            </div>
            <div className="flex-1">
        <h3 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4">
                Emergency Data Recovery in {location.city}
              </h3>
        <p className="text-[var(--color-text-secondary)] mb-6 leading-relaxed">
                Critical data loss situation? We offer 24/7 emergency data recovery services for {location.fullName} 
                businesses and individuals who need immediate assistance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={`tel:${location.phone}`}
          className="inline-flex items-center px-6 py-3 bg-[var(--color-accent)] text-[var(--color-text-inverse)] font-semibold rounded-lg hover:bg-[var(--color-accent-hover)] transition-all duration-300"
                >
                  Emergency Hotline: {location.phone}
                </a>
                <div className="flex items-center text-sm text-[var(--color-text-secondary)]">
                  <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse mr-2" />
                  Available 24/7 for emergencies
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
