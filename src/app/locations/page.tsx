import { Metadata } from 'next';
import Link from 'next/link';
import { locations } from '@/data/locations';
import { MapPin, Phone, Star } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Data Recovery Locations | MD, VA, DC | DiskDoctor',
  description: 'Professional data recovery services across Maryland, Virginia, and Washington DC. 95% success rate. Free evaluation. Find your nearest location.',
  keywords: 'data recovery locations, Maryland data recovery, Virginia data recovery, Washington DC data recovery, local data recovery services, Columbia MD data recovery, Baltimore data recovery, Arlington VA data recovery, Alexandria data recovery',
  authors: [{ name: "DiskDoctor Data Recovery" }],
  creator: "DiskDoctor Data Recovery",
  publisher: "DiskDoctor Data Recovery",
  openGraph: {
    title: 'Data Recovery Locations | MD, VA, DC | DiskDoctor',
    description: 'Professional data recovery services across Maryland, Virginia, and Washington DC. 95% success rate. Free evaluation. Find your nearest location.',
    type: 'website',
    url: 'https://www.diskdoctorsamerica.com/locations',
    siteName: 'DiskDoctor Data Recovery',
    locale: 'en_US',
    images: [
      {
        url: 'https://www.diskdoctorsamerica.com/images/og-locations.jpg',
        width: 1200,
        height: 630,
        alt: 'DiskDoctor Data Recovery Service Locations - Maryland, Virginia, Washington DC',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@diskdoctor',
    creator: '@diskdoctor',
    title: 'Data Recovery Locations | MD, VA, DC | DiskDoctor',
    description: 'Professional data recovery services across Maryland, Virginia, and Washington DC. 95% success rate. Free evaluation.',
    images: ['https://www.diskdoctorsamerica.com/images/og-locations.jpg'],
  },
  alternates: {
    canonical: 'https://www.diskdoctorsamerica.com/locations',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  other: {
    'geo.region': 'US-MD,US-VA,US-DC',
    'geo.placename': 'Maryland, Virginia, Washington DC',
    'business:contact_data:phone_number': '+1-410-937-7332',
    'business:contact_data:email': 'shah4268@msn.com',
  },
};

export default function LocationsPage() {
  const headOffice = locations.find(loc => loc.isHeadOffice);
  const otherLocations = locations.filter(loc => !loc.isHeadOffice);

  return (
    <div className="min-h-screen pt-24 pb-16 bg-[var(--color-surface-100)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-text)] mb-6">
            Our Service Locations
          </h1>
          <p className="text-xl text-[var(--color-text-light)] max-w-3xl mx-auto leading-relaxed">
            Professional data recovery services across Maryland, Virginia, and Washington DC. 
            Find your nearest location for expert data recovery assistance.
          </p>
        </div>

        {/* Head Office */}
        {headOffice && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-[var(--color-text)] mb-6 text-center">
              Head Office
            </h2>
            <div className="max-w-2xl mx-auto">
              <Link href={`/${headOffice.slug}`}>
                <div className="bg-white rounded-xl p-8 shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)] transition-all duration-300 border-2 border-[var(--color-accent)] hover:border-[var(--color-accent-hover)]">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="h-16 w-16 bg-[var(--color-accent)] rounded-xl flex items-center justify-center">
                        <MapPin className="h-8 w-8 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-2xl font-bold text-[var(--color-text)]">
                          {headOffice.fullName}
                        </h3>
                        <span className="px-3 py-1 bg-[var(--color-accent)] text-white text-sm font-medium rounded-full">
                          Head Office
                        </span>
                      </div>
                      <p className="text-[var(--color-text-light)] mb-4">
                        {headOffice.address}
                      </p>
                      <div className="flex items-center gap-6 text-sm">
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 text-[var(--color-accent)] mr-2" />
                          <span className="font-medium">{headOffice.phone}</span>
                        </div>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                          <span>4.9/5 Rating</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        )}

        {/* Other Office Locations */}
        <div>
          <h2 className="text-2xl font-bold text-[var(--color-text)] mb-8 text-center">
            Office Locations
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherLocations.map((location) => (
              <Link key={location.slug} href={`/${location.slug}`}>
                <div className="bg-white rounded-xl p-6 shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)] transition-all duration-300 hover:-translate-y-1 border border-[var(--color-border)] hover:border-[var(--color-primary)]">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="h-12 w-12 bg-[var(--color-primary)] rounded-lg flex items-center justify-center">
                        <MapPin className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-[var(--color-text)] mb-2">
                        {location.fullName}
                      </h3>
                      <p className="text-[var(--color-text-light)] text-sm mb-4 line-clamp-2">
                        {location.heroDescription}
                      </p>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 text-[var(--color-accent)] mr-2" />
                          <span className="font-medium">{location.phone}</span>
                        </div>
                      </div>
                      
                      {/* Nearby Areas */}
                      <div className="mt-4 pt-4 border-t border-[var(--color-border)]">
                        <p className="text-xs text-[var(--color-text-light)] mb-2">Also serving:</p>
                        <div className="flex flex-wrap gap-1">
                          {location.nearbyAreas.slice(0, 3).map((area, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-[var(--color-surface-200)] text-[var(--color-text-light)] rounded text-xs"
                            >
                              {area}
                            </span>
                          ))}
                          {location.nearbyAreas.length > 3 && (
                            <span className="px-2 py-1 bg-[var(--color-surface-200)] text-[var(--color-text-light)] rounded text-xs">
                              +{location.nearbyAreas.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Service Information */}
        <div className="mt-16 bg-white rounded-2xl p-8 shadow-[var(--shadow-md)]">
          <h2 className="text-2xl font-bold text-[var(--color-text)] mb-6 text-center">
            Comprehensive Data Recovery Services
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <h3 className="font-semibold text-[var(--color-text)] mb-2">Hard Drive Recovery</h3>
              <p className="text-sm text-[var(--color-text-light)]">Mechanical and electronic failures</p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-[var(--color-text)] mb-2">SSD Recovery</h3>
              <p className="text-sm text-[var(--color-text-light)]">Solid state drive failures</p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-[var(--color-text)] mb-2">RAID Recovery</h3>
              <p className="text-sm text-[var(--color-text-light)]">Server and NAS systems</p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-[var(--color-text)] mb-2">Mobile Recovery</h3>
              <p className="text-sm text-[var(--color-text-light)]">Smartphones and tablets</p>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="mt-12 text-center bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)] rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Need Data Recovery Services?
          </h2>
          <p className="text-white/90 text-lg mb-6 max-w-2xl mx-auto">
            Contact your nearest location for immediate assistance with data recovery needs.
          </p>
          <a
            href="tel:+1 (571) 202-8529"
            className="inline-flex items-center px-8 py-4 bg-[var(--color-accent)] text-white font-semibold rounded-lg hover:bg-[var(--color-accent-hover)] transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <Phone className="h-5 w-5 mr-3" />
            Call (571) 202-8529
          </a>
        </div>
      </div>
    </div>
  );
}
