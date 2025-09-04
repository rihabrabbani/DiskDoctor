'use client';

import { motion } from 'framer-motion';
import { LocationData } from '@/data/locations';
import { HardDrive, Smartphone, Server, Database, Shield, Clock } from 'lucide-react';

interface LocationServicesProps {
  location: LocationData;
}

const services = [
  {
    icon: HardDrive,
    title: 'Hard Drive Recovery',
    description: 'Mechanical and electronic hard drive failures, clicking sounds, boot failures',
    features: ['Mechanical failures', 'PCB damage', 'Firmware corruption', 'Head crashes']
  },
  {
    icon: Database,
    title: 'SSD Recovery',
    description: 'Solid State Drive recovery from logical and physical failures',
    features: ['Controller failures', 'NAND flash issues', 'Firmware corruption', 'Logical damage']
  },
  {
    icon: Server,
    title: 'RAID Recovery',
    description: 'Complex RAID array reconstruction and data recovery',
    features: ['RAID 0, 1, 5, 6, 10', 'Multiple drive failures', 'Controller issues', 'Rebuild errors']
  },
  {
    icon: Smartphone,
    title: 'Mobile Devices',
    description: 'iPhone, Android, and tablet data recovery services',
    features: ['Water damage', 'Screen damage', 'Logic board issues', 'Deleted data']
  },
  {
    icon: Shield,
    title: 'Forensic Recovery',
    description: 'Legal and corporate forensic data recovery services',
    features: ['Chain of custody', 'Court admissible', 'Encrypted data', 'Secure handling']
  },
  {
    icon: Clock,
    title: 'Emergency Service',
    description: '24/7 emergency data recovery for critical situations',
    features: ['Same-day service', 'On-site pickup', 'Rush processing', 'Priority handling']
  }
];

export default function LocationServices({ location }: LocationServicesProps) {
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
            Expert Data Recovery Services in {location.city}
          </h2>
          <p className="text-xl text-[var(--color-text-secondary)] max-w-3xl mx-auto leading-relaxed">
            Our {location.fullName} data recovery specialists use advanced techniques and cleanroom facilities 
            to recover data from any storage device with industry-leading success rates.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-[var(--color-surface-100)] rounded-xl p-8 shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)] transition-all duration-300 border border-[var(--color-border)]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center mb-6">
                <div className="flex-shrink-0 h-12 w-12 bg-[var(--color-primary)] rounded-lg flex items-center justify-center">
                  <service.icon className="h-6 w-6 text-[var(--color-text-inverse)]" />
                </div>
                <h3 className="text-xl font-semibold text-[var(--color-text-primary)] ml-4">
                  {service.title}
                </h3>
              </div>
              
              <p className="text-[var(--color-text-secondary)] mb-6 leading-relaxed">
                {service.description}
              </p>
              
              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-sm text-[var(--color-text-secondary)]">
                    <div className="h-1.5 w-1.5 bg-[var(--color-accent)] rounded-full mr-3 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          className="mt-16 text-center bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-800)] rounded-2xl p-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl md:text-4xl font-bold text-[var(--color-text-inverse)] mb-6">
            Need Data Recovery in {location.city}?
          </h3>
          <p className="text-xl text-[var(--color-text-inverse)]/90 mb-8 max-w-2xl mx-auto">
            Don't let data loss affect your business or personal life. Our {location.fullName} experts 
            are ready to help you recover your valuable files.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href={`tel:${location.phone}`}
              className="inline-flex items-center px-8 py-4 bg-[var(--color-accent)] text-[var(--color-text-inverse)] font-semibold rounded-lg hover:bg-[var(--color-accent-hover)] transition-all duration-300 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Call {location.phone}
            </motion.a>
            <motion.a
              href="#contact"
              className="inline-flex items-center px-8 py-4 bg-[var(--color-text-inverse)]/20 backdrop-blur-sm text-[var(--color-text-inverse)] font-semibold rounded-lg hover:bg-[var(--color-text-inverse)]/30 transition-all duration-300 border border-[var(--color-text-inverse)]/30"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Get Free Evaluation
            </motion.a>
          </div>
        </motion.div>

        {/* Keywords Section for SEO */}
        <motion.div
          className="mt-16 bg-[var(--color-surface-100)] rounded-xl p-8 border border-[var(--color-border)]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-[var(--color-text-primary)] mb-6 text-center">
            Serving {location.fullName} and Surrounding Areas
          </h3>
          <div className="flex flex-wrap justify-center gap-2">
            {location.nearbyAreas.map((area, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-[var(--color-surface-200)] text-[var(--color-text-secondary)] rounded-full text-sm"
              >
                {area}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
