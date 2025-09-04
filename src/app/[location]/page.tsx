import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getLocationBySlug, getAllLocationSlugs } from '@/data/locations';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import LocationHero from '@/components/locations/LocationHero';
import LocationServices from '@/components/locations/LocationServices';
import LocationProcess from '@/components/locations/LocationProcess';
import LocationTrustSignals from '@/components/locations/LocationTrustSignals';
import LocationContact from '@/components/locations/LocationContact';
import LocationTestimonials from '@/components/locations/LocationTestimonials';
import LocationFAQ from '@/components/locations/LocationFAQ';
import JsonLd from '@/components/seo/JsonLd';

interface LocationPageProps {
  params: Promise<{ location: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllLocationSlugs();
  return slugs.map((slug) => ({
    location: slug,
  }));
}

export async function generateMetadata({ params }: LocationPageProps): Promise<Metadata> {
  const { location: locationSlug } = await params;
  const location = getLocationBySlug(locationSlug);
  
  if (!location) {
    return {
      title: 'Location Not Found',
    };
  }

  const title = `Data Recovery Services in ${location.fullName} | Disk Doctor`;
  const description = location.metaDescription;
  const canonical = `https://diskdoctorsamerica.com/${location.slug}`;

  return {
    title,
    description,
    keywords: location.localKeywords.join(', '),
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: 'Disk Doctor',
      type: 'website',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical,
    },
    other: {
      'geo.region': location.state === 'DC' ? 'US-DC' : `US-${location.state.substring(0, 2)}`,
      'geo.placename': location.city,
      'geo.position': `${location.coordinates.lat};${location.coordinates.lng}`,
      'ICBM': `${location.coordinates.lat}, ${location.coordinates.lng}`,
    },
  };
}

export default async function LocationPage({ params }: LocationPageProps) {
  const { location: locationSlug } = await params;
  const location = getLocationBySlug(locationSlug);

  if (!location) {
    notFound();
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `Disk Doctor - ${location.fullName}`,
    "description": location.metaDescription,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": location.address.split(',')[0],
      "addressLocality": location.city,
      "addressRegion": location.state,
      "postalCode": location.zipCode,
      "addressCountry": "US"
    },
    "telephone": location.phone,
    "url": `https://diskdoctorsamerica.com/${location.slug}`,
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": location.coordinates.lat,
      "longitude": location.coordinates.lng
    },
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": location.coordinates.lat,
        "longitude": location.coordinates.lng
      },
      "geoRadius": "50000"
    },
    "areaServed": location.nearbyAreas.map(area => ({
      "@type": "Place",
      "name": `${area}, ${location.state}`
    })),
    "services": [
      {
        "@type": "Service",
        "name": "Hard Drive Data Recovery",
        "description": `Professional hard drive data recovery services in ${location.fullName}`
      },
      {
        "@type": "Service", 
        "name": "SSD Data Recovery",
        "description": `Expert SSD data recovery services in ${location.fullName}`
      },
      {
        "@type": "Service",
        "name": "RAID Data Recovery", 
        "description": `Specialized RAID array data recovery in ${location.fullName}`
      },
      {
        "@type": "Service",
        "name": "Mobile Device Recovery",
        "description": `iPhone and Android data recovery services in ${location.fullName}`
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "39"
    },
    "priceRange": "$$",
    "openingHours": "Mo-Fr 08:30-17:00"
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)] font-[var(--font-sans)]">
      <JsonLd data={structuredData} />
      <Header />
      <main>
        <LocationHero location={location} />
        <LocationServices location={location} />
        <LocationProcess location={location} />
        <LocationTrustSignals location={location} />
        <LocationTestimonials location={location} />
        <LocationFAQ location={location} />
        <LocationContact location={location} />
      </main>
      <Footer />
    </div>
  );
}
