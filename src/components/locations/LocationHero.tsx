'use client';

import { motion } from 'framer-motion';
import { LocationData, isVirginia } from '@/data/locations';
import { LocationCopy } from '@/data/locationCopy';
import { Phone, Mail, MapPin } from 'lucide-react';
import { PHONE_TEL, telHref } from '@/lib/site';

interface LocationHeroProps {
  location: LocationData;
  copy: LocationCopy;
}

export default function LocationHero({ location, copy }: LocationHeroProps) {
  return (
    <section data-track-position="hero" className="relative pt-24 pb-16 bg-[var(--color-primary-800)] overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {location.isHeadOffice && (
            <div className="inline-flex items-center px-4 py-2 bg-white/20 rounded-full text-white text-sm font-medium mb-6">
              <MapPin className="h-4 w-4 mr-2" />
              Head office laboratory
            </div>
          )}
          {location.isAppointmentOnly && (
            <div className="inline-flex items-center px-4 py-2 bg-white/20 rounded-full text-white text-sm font-medium mb-6">
              Office, by appointment
            </div>
          )}
          {copy.kind === 'service-area' && (
            <div className="inline-flex items-center px-4 py-2 bg-white/20 rounded-full text-white text-sm font-medium mb-6">
              {isVirginia(location) ? 'Service area — Tysons office by appointment' : 'Service area — lab in Columbia, MD'}
            </div>
          )}

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Data recovery in {location.fullName}
            {location.isAppointmentOnly ? ': office by appointment' : ''}
          </h1>

          <p className="text-lg md:text-xl text-white/95 mb-6 leading-relaxed max-w-3xl mx-auto">
            {copy.directAnswer}
          </p>
          <p className="text-base text-white/85 mb-8 leading-relaxed max-w-3xl mx-auto">
            {copy.heroDescription}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href={telHref(location.officePhone ?? location.phone) || PHONE_TEL}
              className="inline-flex items-center px-8 py-4 bg-[var(--color-accent-700)] text-white font-semibold rounded-lg"
            >
              <Phone className="h-5 w-5 mr-3" />
              Call {location.officePhone ?? location.phone}
            </a>
            <a
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-white/20 text-white font-semibold rounded-lg border border-white/30"
            >
              <Mail className="h-5 w-5 mr-3" />
              Free evaluation
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
