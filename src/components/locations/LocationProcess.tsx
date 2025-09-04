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

        <div className="max-w-6xl mx-auto">
          {processSteps.map((step, index) => (
            <motion.div
              key={index}
              className="relative mb-12 last:mb-0"
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className={`flex items-center gap-8 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} max-lg:flex-col`}>
                {/* Content */}
                <div className="flex-1 bg-[var(--color-surface-100)] rounded-2xl p-8">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="h-16 w-16 bg-[var(--color-primary)] rounded-xl flex items-center justify-center shadow-lg">
                        <step.icon className="h-8 w-8 text-[var(--color-text-inverse)]" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="h-8 w-8 bg-[var(--color-accent)] rounded-full flex items-center justify-center">
                          <span className="text-[var(--color-text-inverse)] font-bold text-sm">{index + 1}</span>
                        </div>
                        <h3 className="text-2xl font-bold text-[var(--color-text-primary)]">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-lg text-[var(--color-text-secondary)] mb-6 leading-relaxed">
                        {step.description}
                      </p>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {step.details.map((detail, detailIndex) => (
                          <div key={detailIndex} className="flex items-center text-sm text-[var(--color-text-secondary)]">
                            <div className="h-2 w-2 bg-[var(--color-accent)] rounded-full mr-3 flex-shrink-0" />
                            {detail}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Connector Line */}
                {index < processSteps.length - 1 && (
                  <div 
                    className="hidden lg:block absolute left-1/2 top-full w-0.5 h-8 bg-gradient-to-b from-[var(--color-primary)] via-[var(--color-primary-300)] to-transparent transform -translate-x-1/2"
                    style={{
                      background: `linear-gradient(to bottom, var(--color-primary), var(--color-primary-300), transparent)`
                    }}
                  />
                )}
              </div>
            </motion.div>
          ))}
        </div>

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
