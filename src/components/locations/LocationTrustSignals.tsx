'use client';

import { motion } from 'framer-motion';
import { LocationData } from '@/data/locations';
import { Shield, Award, Clock, Users, CheckCircle } from 'lucide-react';
import { telHref } from '@/lib/site';

interface LocationTrustSignalsProps {
  location: LocationData;
}

const trustSignals = [
  {
    icon: Clock,
    title: '35+ Years Experience',
    description: 'Recovering data since 1991',
    highlight: '35+'
  },
  {
    icon: Users,
    title: '15,000+ Cases Recovered',
    description: 'Hard drives, SSDs, RAID arrays and servers',
    highlight: '15,000+'
  },
  {
    icon: Shield,
    title: 'Cleanroom imaging',
    description: 'Open-drive work is done in a controlled lab, not on a shop counter',
    highlight: 'Lab'
  },
  {
    icon: Award,
    title: '95% Success Rate',
    description: 'Industry-leading recovery success rate',
    highlight: '95%'
  }
];

// The client doesn't want Tysons pages to say where the recovery is done.
const appointmentOfficeSignal = {
  icon: Shield,
  title: 'Free evaluation',
  description: 'No data, no charge on the recovery fee',
  highlight: 'Free'
};

const certifications = [
  { name: 'Free evaluation', logo: '' },
  { name: 'No data, no charge', logo: '' },
  { name: 'Columbia MD laboratory', logo: '' },
  { name: 'Tysons by appointment', logo: '' }
];

const features = [
  'Free initial consultation and diagnosis',
  'No data, no charge guarantee policy',
  'Secure chain of custody procedures',
  '24/7 emergency line: (410) 937-7332',
  'All major device types supported',
  'Confidentiality agreements available'
];

export default function LocationTrustSignals({ location }: LocationTrustSignalsProps) {
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
            Why {location.city} Trusts Disk Doctor
          </h2>
          <p className="text-xl text-[var(--color-text-secondary)] max-w-3xl mx-auto leading-relaxed">
            {location.fullName} businesses and residents choose us for our proven track record, 
            advanced technology, and commitment to data security.
          </p>
        </motion.div>

        {/* Trust Metrics */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {trustSignals
            .map((signal) => (location.isAppointmentOnly && signal.highlight === 'Lab' ? appointmentOfficeSignal : signal))
            .map((signal, index) => (
              <motion.div
                key={index}
                className="text-center bg-[var(--color-surface-100)] rounded-xl p-8 shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)] transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="inline-flex items-center justify-center h-16 w-16 bg-[var(--color-primary)] rounded-full mb-6">
                  <signal.icon className="h-8 w-8 text-[var(--color-text-inverse)]" />
                </div>
                <div className="text-4xl font-bold text-[var(--color-accent)] mb-2">
                  {signal.highlight}
                </div>
                <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-3">
                  {signal.title}
                </h3>
                <p className="text-[var(--color-text-secondary)] text-sm">
                  {signal.description}
                </p>
              </motion.div>
            ))}
        </div>

        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center bg-[var(--color-surface-100)] rounded-full px-8 py-4 shadow-[var(--shadow-md)]">
            <div className="text-left">
              <div className="text-2xl font-bold text-[var(--color-text-primary)]">Public Angi review</div>
              <div className="text-sm text-[var(--color-text-secondary)]">Frank O. · Feb 2019 · 5.0 from 1 Angi review on-page</div>
            </div>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="bg-[var(--color-surface-100)] rounded-2xl p-8 shadow-[var(--shadow-md)] mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-[var(--color-text-primary)] mb-8 text-center">
            What Makes Us Different in {location.city}
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-start gap-3"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <CheckCircle className="h-5 w-5 text-[var(--color-accent)] mt-0.5 flex-shrink-0" />
                <span className="text-[var(--color-text-secondary)]">{feature}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Certifications */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-[var(--color-text-primary)] mb-8">
            Certified & Trusted
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {certifications
              // The client doesn't want Tysons pages to say where the recovery is done.
              .filter((cert) => !(location.isAppointmentOnly && cert.name === 'Columbia MD laboratory'))
              .map((cert, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
                  <Shield className="h-5 w-5" />
                  {cert.name}
                </div>
              ))}
          </div>
        </motion.div>

        {/* Local Emphasis */}
        <motion.div
          data-track-position="cta_band"
          className="mt-16 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-hover)] rounded-2xl p-8 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-[var(--color-text-inverse)] mb-4">
            Local Data Recovery Experts Serving {location.fullName}
          </h3>
          <p className="text-[var(--color-text-inverse)]/90 text-lg mb-6 max-w-2xl mx-auto">
            As {location.isHeadOffice ? 'our head office location' : location.isAppointmentOnly ? 'our Virginia office' : 'a trusted service area'}, 
            we understand the unique data recovery needs of {location.city} businesses and residents.
          </p>
          <a
            href={telHref(location.officePhone ?? location.phone)}
            className="inline-flex items-center px-8 py-4 bg-[var(--color-accent)] text-[var(--color-text-inverse)] font-semibold rounded-lg hover:bg-[var(--color-accent-hover)] transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Get Expert Help: {location.officePhone ?? location.phone}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
