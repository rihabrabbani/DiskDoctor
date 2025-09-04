import { notFound } from 'next/navigation';
import { allServices } from '@/data/allServices';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ServiceHero from '@/components/new_components/ServiceHero';
import ServiceFeatures from '@/components/new_components/ServiceFeatures';
import ServiceProcess from '@/components/new_components/ServiceProcess';
import ServiceCTA from '@/components/new_components/ServiceCTA';
import { serviceSchema, breadcrumbSchema } from '@/lib/structuredData';

// Updated interface to match Next.js 15 App Router requirements
type ServiceParams = {
  service: string;
};

// Correct interface definition for Next.js 15 - params is now a Promise
interface ServicePageProps {
  params: Promise<ServiceParams>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

// Generate static params for all services
export async function generateStaticParams(): Promise<ServiceParams[]> {
  return allServices.map((service) => ({
    service: service.id,
  }));
}

export default async function ServicePage({ params }: ServicePageProps) {
  // Await the params since it's now a Promise in Next.js 15
  const { service } = await params;
  const serviceData = allServices.find(s => s.id === service);
  
  if (!serviceData) {
    notFound();
  }

  // Enhanced accent color mapping with the new services
  const getAccentColor = (id: string) => {
    const colorMap: Record<string, string> = {
      'windows-recovery': '#0078d4',
      'mac-recovery': '#007aff',
      'linux-recovery': '#ff6600',
      'unix-recovery': '#8b4513',
      'photo-recovery': '#ff6b35',
      'mobile-recovery': '#34c759',
      'raid-recovery': '#af52de',
      'email-recovery': '#ff3b30',
      'file-recovery': '#007acc',
      'virtual-recovery': '#5856d6',
      'remote-recovery': '#00d4aa',
      'data-cloning': '#ff9500',
      'data-duplication': '#32d74b',
      'data-security': '#ff2d92',
      'email-security': '#dc3545',
      'data-backup': '#28a745',
    };
    return colorMap[id] || 'var(--color-primary)';
  };

  const accentColor = getAccentColor(serviceData.id);

  // Breadcrumb data
  const breadcrumbData = [
    { name: 'Home', url: 'https://www.diskdoctorsamerica.com' },
    { name: 'Services', url: 'https://www.diskdoctorsamerica.com/#services' },
    { name: serviceData.title, url: `https://www.diskdoctorsamerica.com/services/${serviceData.id}` }
  ];

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)]">
      <Header />
      
      <main className="relative">
        {/* Service Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(serviceSchema(serviceData))
          }}
        />
        
        {/* Breadcrumb Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbSchema(breadcrumbData))
          }}
        />
        

        <ServiceHero
          title={serviceData.title}
          subtitle={serviceData.subtitle}
          description={serviceData.description}
          heroImage={serviceData.heroImage}
          layoutType={serviceData.layoutType}
          ctaSection={serviceData.ctaSection}
          accentColor={accentColor}
        />
        
        <ServiceFeatures
          features={serviceData.features}
          benefits={serviceData.benefits}
          detailedFeatures={serviceData.detailedFeatures}
          detailedBenefits={serviceData.detailedBenefits}
          accentColor={accentColor}
        />
        
        <ServiceProcess
          process={serviceData.process}
          additionalContent={serviceData.additionalContent}
          accentColor={accentColor}
        />
        
        {/* Trust indicators section */}
        <section className="py-12 bg-[var(--color-surface-200)]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold" style={{ color: accentColor }}>95%</div>
                <div className="text-sm text-[var(--color-text-secondary)]">Success Rate</div>
              </div>
              <div>
                <div className="text-3xl font-bold" style={{ color: accentColor }}>24/7</div>
                <div className="text-sm text-[var(--color-text-secondary)]">Emergency Service</div>
              </div>
              <div>
                <div className="text-3xl font-bold" style={{ color: accentColor }}>ISO</div>
                <div className="text-sm text-[var(--color-text-secondary)]">9001 Certified</div>
              </div>
              <div>
                <div className="text-3xl font-bold" style={{ color: accentColor }}>15+</div>
                <div className="text-sm text-[var(--color-text-secondary)]">Years Experience</div>
              </div>
            </div>
          </div>
        </section>
        
        <ServiceCTA
          ctaSection={serviceData.ctaSection}
          accentColor={accentColor}
        />
      </main>
      
      <Footer />
    </div>
  );
}

// Also fix the metadata function with the updated type
export async function generateMetadata({ params }: ServicePageProps) {
  // Await the params since it's now a Promise in Next.js 15
  const { service } = await params;
  const serviceData = allServices.find(s => s.id === service);
  
  if (!serviceData) {
    return {
      title: 'Service Not Found',
    };
  }

  return {
    title: `${serviceData.title} - Professional Data Recovery Services | DiskDoctor`,
    description: `${serviceData.description} Professional ${serviceData.title.toLowerCase()} with 95% success rate. Free evaluation, no data no charge guarantee.`,
    keywords: `${serviceData.title.toLowerCase()}, data recovery, professional recovery services, emergency data recovery, disk doctor`,
    openGraph: {
      title: `${serviceData.title} - DiskDoctor Data Recovery`,
      description: serviceData.description,
      type: 'website',
      images: [serviceData.heroImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${serviceData.title} - DiskDoctor`,
      description: serviceData.description,
      images: [serviceData.heroImage],
    },
    alternates: {
      canonical: `/services/${service}`,
    },
  };
}