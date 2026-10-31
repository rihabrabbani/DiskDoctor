import { notFound } from 'next/navigation';
import Link from 'next/link';
import { allServices } from '@/data/allServices';
import { serviceLongform } from '@/data/serviceLongform';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ServiceHero from '@/components/new_components/ServiceHero';
import ServiceFeatures from '@/components/new_components/ServiceFeatures';
import ServiceProcess from '@/components/new_components/ServiceProcess';
import ServiceCTA from '@/components/new_components/ServiceCTA';
import ServiceFAQ from '@/components/new_components/ServiceFAQ';
import HubspotContactForm from '@/components/contact/HubspotContactForm';
import { serviceSchema, breadcrumbSchema, faqSchema } from '@/lib/structuredData';
import { coreServicePages, getCoreServicePage } from '@/data/corePages';
import CorePageLayout from '@/components/corePage/CorePageLayout';
import { SITE_URL } from '@/lib/site';

export const dynamicParams = false;

type ServiceParams = { service: string };

interface ServicePageProps {
  params: Promise<ServiceParams>;
}

export async function generateStaticParams(): Promise<ServiceParams[]> {
  const ids = new Set([...coreServicePages.map((page) => page.id), ...allServices.map((service) => service.id)]);
  return Array.from(ids, (service) => ({ service }));
}

export async function generateMetadata({ params }: ServicePageProps) {
  const { service } = await params;
  const corePage = getCoreServicePage(service);

  if (corePage) {
    return {
      title: { absolute: corePage.seoTitle },
      description: corePage.seoDescription,
      openGraph: {
        title: corePage.seoTitle,
        description: corePage.seoDescription,
        type: 'website',
        images: ['/images/og-image.jpg'],
        url: `${SITE_URL}${corePage.path}`,
      },
      twitter: {
        card: 'summary_large_image',
        title: corePage.seoTitle,
        description: corePage.seoDescription,
        images: ['/images/og-image.jpg'],
      },
      alternates: {
        canonical: `${SITE_URL}${corePage.path}`,
      },
      robots: { index: true, follow: true },
    };
  }

  const serviceData = allServices.find((s) => s.id === service);

  if (!serviceData) {
    notFound();
  }

  const seoTitle = `${serviceData.title} | No Data No Charge`;
  const seoDescription = `${serviceData.description} Free evaluation in Columbia MD. No data, no charge. Call (410) 937-7332.`.slice(0, 160);

  return {
    title: seoTitle,
    description: seoDescription,
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      type: 'website',
      url: `${SITE_URL}/services/${service}`,
    },
    alternates: {
      canonical: `${SITE_URL}/services/${service}`,
    },
    robots: { index: true, follow: true },
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { service } = await params;
  const corePage = getCoreServicePage(service);

  if (corePage) {
    return <CorePageLayout page={corePage} />;
  }

  const serviceData = allServices.find((s) => s.id === service);

  if (!serviceData) {
    notFound();
  }

  const longform = serviceLongform[serviceData.id];
  const faqs = longform?.faqs || serviceData.faq || [];
  const relatedLocations = [
    { slug: 'columbia-md', name: 'Columbia, MD lab' },
    { slug: 'tysons-va', name: 'Tysons, VA (appointment)' },
    { slug: 'baltimore-md', name: 'Baltimore service area' },
    { slug: 'washington-dc', name: 'Washington DC service area' },
  ];

  const breadcrumbData = [
    { name: 'Home', url: SITE_URL },
    { name: 'Services', url: `${SITE_URL}/services` },
    { name: serviceData.title, url: `${SITE_URL}/services/${serviceData.id}` },
  ];

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)]">
      <Header />
      <main className="relative">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema(serviceData)) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(breadcrumbData)) }}
        />
        {faqs.length > 0 && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }}
          />
        )}

        <ServiceHero
          title={serviceData.title}
          subtitle={serviceData.subtitle}
          description={longform ? longform.paragraphs[0] : serviceData.description}
          heroImage={serviceData.heroImage}
          layoutType={serviceData.layoutType}
          ctaSection={serviceData.ctaSection}
        />

        {longform && (
          <section className="py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl space-y-5 text-lg text-[var(--color-text-secondary)] leading-relaxed">
              {longform.paragraphs.map((p) => (
                <p key={p.slice(0, 32)}>{p}</p>
              ))}
            </div>
          </section>
        )}

        <ServiceFeatures
          features={serviceData.features}
          benefits={serviceData.benefits}
          detailedFeatures={serviceData.detailedFeatures}
          detailedBenefits={serviceData.detailedBenefits}
        />

        <ServiceProcess
          process={serviceData.process}
          additionalContent={serviceData.additionalContent}
        />

        <ServiceFAQ faqs={faqs} />

        <section className="py-12">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4">Labs and service areas</h2>
            <p className="text-[var(--color-text-secondary)] mb-4">
              {relatedLocations.map((loc, i) => (
                <span key={loc.slug}>
                  {i > 0 ? ' · ' : ''}
                  <Link href={`/${loc.slug}`} className="text-[var(--color-primary)] hover:underline">
                    {loc.name}
                  </Link>
                </span>
              ))}
            </p>
          </div>
        </section>

        <section className="py-16 bg-[var(--color-surface-100)]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] mb-4 text-center">
              Free evaluation
            </h2>
            <p className="text-center text-[var(--color-text-secondary)] mb-8">
              No data, no charge. Tell us what failed.
            </p>
            <div className="bg-white border border-[var(--color-border)] rounded-2xl p-6 sm:p-8">
              <HubspotContactForm />
            </div>
          </div>
        </section>

        <ServiceCTA ctaSection={serviceData.ctaSection} />
      </main>
      <Footer />
    </div>
  );
}
