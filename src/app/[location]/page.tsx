import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getLocationBySlug, getAllLocationSlugs } from '@/data/locations';
import { locationCopy } from '@/data/locationCopy';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import LocationHero from '@/components/locations/LocationHero';
import LocationServices from '@/components/locations/LocationServices';
import LocationPickup from '@/components/locations/LocationPickup';
import LocationUniqueContent from '@/components/locations/LocationUniqueContent';
import LocationTrustSignals from '@/components/locations/LocationTrustSignals';
import LocationContact from '@/components/locations/LocationContact';
import LocationTestimonials from '@/components/locations/LocationTestimonials';
import LocationFAQ from '@/components/locations/LocationFAQ';
import JsonLd from '@/components/seo/JsonLd';
import { COLUMBIA_ID, TYSONS_ID, faqSchema } from '@/lib/structuredData';
import { SITE_URL, telHref } from '@/lib/site';
import Link from 'next/link';

export const dynamicParams = false;

interface LocationPageProps {
  params: Promise<{ location: string }>;
}

export async function generateStaticParams() {
  return getAllLocationSlugs().map((slug) => ({ location: slug }));
}

export async function generateMetadata({ params }: LocationPageProps): Promise<Metadata> {
  const { location: locationSlug } = await params;
  const location = getLocationBySlug(locationSlug);
  const copy = locationCopy[locationSlug];

  if (!location || !copy) {
    notFound();
  }

  const canonical = `${SITE_URL}/${location.slug}`;

  return {
    title: copy.seoTitle,
    description: copy.seoDescription,
    alternates: { canonical },
    openGraph: {
      title: copy.seoTitle,
      description: copy.seoDescription,
      url: canonical,
      siteName: 'DiskDoctor Data Recovery',
      type: 'website',
      locale: 'en_US',
    },
    robots: { index: true, follow: true },
  };
}

export default async function LocationPage({ params }: LocationPageProps) {
  const { location: locationSlug } = await params;
  const location = getLocationBySlug(locationSlug);
  const copy = locationCopy[locationSlug];

  if (!location || !copy) {
    notFound();
  }

  const pageUrl = `${SITE_URL}/${location.slug}`;
  // The Columbia and Tysons LocalBusiness entities are defined once in the root layout;
  // location pages reference them by @id instead of redefining them.
  const structuredData =
    copy.kind === 'lab'
      ? {
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          '@id': `${pageUrl}#webpage`,
          url: pageUrl,
          name: copy.seoTitle,
          description: copy.seoDescription,
          about: { '@id': location.slug === 'tysons-va' ? TYSONS_ID : COLUMBIA_ID },
        }
      : {
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: `Data recovery serving ${location.fullName}`,
          description: copy.directAnswer,
          url: pageUrl,
          provider: { '@id': COLUMBIA_ID },
          areaServed: {
            '@type': 'City',
            name: location.city,
          },
        };

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)] font-[var(--font-sans)]">
      <JsonLd data={structuredData} />
      <JsonLd data={faqSchema(copy.faqs)} />
      <Header />
      <main>
        <LocationHero location={location} copy={copy} />
        <LocationUniqueContent location={location} copy={copy} />
        <LocationPickup />
        <LocationServices location={location} serviceIds={copy.relatedServiceIds} />
        <LocationTrustSignals location={location} />
        <LocationTestimonials location={location} />
        <LocationFAQ location={location} faqs={copy.faqs} />
        <section className="py-8">
          <div className="container mx-auto px-4 text-center text-sm text-[var(--color-text-secondary)]">
            Also see{' '}
            {copy.relatedLocationSlugs.map((slug, i) => (
              <span key={slug}>
                {i > 0 ? ', ' : ''}
                <Link href={`/${slug}`} className="text-[var(--color-primary)] hover:underline">
                  {slug.replace('-', ' ')}
                </Link>
              </span>
            ))}
            . Call{' '}
            <a href={telHref(location.phone)} className="font-semibold text-[var(--color-primary)]">
              {location.phone}
            </a>
          </div>
        </section>
        <LocationContact location={location} />
      </main>
      <Footer />
    </div>
  );
}
