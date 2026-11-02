import { Metadata } from 'next';
import Link from 'next/link';
import { locations } from '@/data/locations';
import { locationCopy } from '@/data/locationCopy';
import { MapPin, Phone } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HubspotContactForm from '@/components/contact/HubspotContactForm';
import { PHONE_DISPLAY, PHONE_TEL, SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Data Recovery Locations | MD VA DC',
  description:
    'Columbia MD lab and Tysons VA appointment office, plus service areas across Maryland, Virginia, and Washington DC. Free evaluation. Call (410) 937-7332.',
  alternates: { canonical: `${SITE_URL}/locations` },
};

export default function LocationsPage() {
  const labs = locations.filter((loc) => locationCopy[loc.slug]?.kind === 'lab');
  const areas = locations.filter((loc) => locationCopy[loc.slug]?.kind === 'service-area');

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)]">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-text-primary)] mb-6">
              Locations and service areas
            </h1>
            <p className="text-xl text-[var(--color-text-secondary)] leading-relaxed">
              Our lab is in Columbia, Maryland, and our Tysons, Virginia office sees clients by appointment.
              Other cities on this site are service areas — not extra storefronts.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-6 text-center">Lab and office</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-16">
            {labs.map((location) => (
              <Link key={location.slug} href={`/${location.slug}`} className="block bg-[var(--color-surface-100)] rounded-xl p-8 border border-[var(--color-border)]">
                <div className="flex items-start gap-4">
                  <MapPin className="h-8 w-8 text-[var(--color-primary)]" />
                  <div>
                    <h3 className="text-2xl font-bold text-[var(--color-text-primary)]">
                      {location.fullName}
                      {location.isHeadOffice ? ' — Head office' : ''}
                      {location.isAppointmentOnly ? ' — Appointment only' : ''}
                    </h3>
                    <p className="text-[var(--color-text-secondary)] mt-2">{location.address}</p>
                    <p className="mt-3 font-medium text-[var(--color-text-primary)]">{location.officePhone ?? location.phone}</p>
                    <p className="text-sm text-[var(--color-text-secondary)] mt-2">
                      {locationCopy[location.slug]?.directAnswer}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-6 text-center">Service areas</h2>
          <p className="text-center text-[var(--color-text-secondary)] mb-8 max-w-2xl mx-auto">
            These pages describe how to get a failed drive from that city to the Columbia lab. They are not separate offices.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {areas.map((location) => (
              <Link key={location.slug} href={`/${location.slug}`} className="block bg-[var(--color-surface-100)] rounded-xl p-6 border border-[var(--color-border)]">
                <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-2">{location.fullName}</h3>
                <p className="text-sm text-[var(--color-text-secondary)] line-clamp-4">
                  {locationCopy[location.slug]?.heroDescription}
                </p>
                <p className="mt-3 text-sm font-medium">{location.phone}</p>
              </Link>
            ))}
          </div>

          <div className="text-center mb-12" data-track-position="cta_band">
            <a
              href={PHONE_TEL}
              className="inline-flex items-center px-8 py-4 bg-[var(--color-accent-700)] text-white font-semibold rounded-lg"
            >
              <Phone className="h-5 w-5 mr-3" />
              Call {PHONE_DISPLAY}
            </a>
          </div>

          <div data-track-position="form_intro" className="max-w-3xl mx-auto bg-[var(--color-surface-100)] border border-[var(--color-border)] rounded-2xl p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4 text-center">
              Free evaluation
            </h2>
            <HubspotContactForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
