import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ServiceHero from '@/components/new_components/ServiceHero';
import ServiceFAQ from '@/components/new_components/ServiceFAQ';
import HubspotContactForm from '@/components/contact/HubspotContactForm';
import type { CorePage } from '@/data/corePages/types';
import ReviewCaseCard from '@/components/scenarios/ReviewCaseCard';
import ScenarioCard from '@/components/scenarios/ScenarioCard';
import { reviewCases } from '@/data/reviewCases';
import { scenarios } from '@/data/scenarios';
import { breadcrumbSchema, coreServiceSchema, faqSchema } from '@/lib/structuredData';
import { PHONE_TEL, SITE_URL } from '@/lib/site';

const heroCta = {
  title: '',
  description: '',
  primaryButton: 'Get a free evaluation',
  secondaryButton: '24/7: (410) 937-7332',
};

export default function CorePageLayout({ page }: { page: CorePage }) {
  const isServicePage = page.path.startsWith('/services/');
  const breadcrumbs = [
    { name: 'Home', url: SITE_URL },
    ...(isServicePage ? [{ name: 'Services', url: `${SITE_URL}/services` }] : []),
    { name: page.h1, url: `${SITE_URL}${page.path}` },
  ];

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)]">
      <Header />
      <main className="relative">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(coreServiceSchema(page)) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(breadcrumbs)) }}
        />
        {page.faqs.length > 0 && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(page.faqs)) }}
          />
        )}

        <ServiceHero
          title={page.h1}
          subtitle={page.heroEyebrow}
          description={page.heroIntro}
          heroImage={page.heroImage}
          layoutType="hero-split"
          ctaSection={heroCta}
          heroImageAlt={page.heroImageAlt}
          heroImagePosition={page.heroImagePosition}
          showImageBadges={!page.heroImageAlt}
        />

        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl space-y-12">
            {page.sections.map((section) => (
              <div key={section.heading}>
                <h2 className="text-2xl sm:text-3xl font-bold text-[var(--color-text-primary)] mb-4">
                  {section.heading}
                </h2>
                <div className="space-y-4 text-lg text-[var(--color-text-secondary)] leading-relaxed">
                  {section.paragraphs?.map((paragraph) => (
                    <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                  ))}
                  {section.bullets && section.bullets.length > 0 && (
                    <ul className="list-disc pl-6 space-y-2">
                      {section.bullets.map((bullet) => (
                        <li key={bullet.slice(0, 40)}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                  {section.closing?.map((paragraph) => (
                    <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                  ))}
                  {section.link && (
                    <p>
                      <Link href={section.link.href} className="text-[var(--color-primary)] font-semibold hover:underline">
                        {section.link.label} →
                      </Link>
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {page.reviewIds && page.reviewIds.length > 0 && (
          <section className="py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
              <h2 className="text-3xl font-bold text-[var(--color-text-primary)] mb-8 text-center">
                {page.reviewsHeading || 'Recent recoveries, in our clients’ words'}
              </h2>
              <div
                className={
                  page.reviewIds.length === 1
                    ? 'grid grid-cols-1 gap-6 max-w-2xl mx-auto'
                    : 'grid grid-cols-1 md:grid-cols-2 gap-6'
                }
              >
                {page.reviewIds.map((id) => (
                  <ReviewCaseCard key={id} review={reviewCases[id]} />
                ))}
              </div>
            </div>
          </section>
        )}

        {page.scenarioIds && page.scenarioIds.length > 0 && (
          <section className="py-16 bg-[var(--color-surface-200)]">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
              <h2 className="text-3xl font-bold text-[var(--color-text-primary)] mb-8 text-center">
                {page.scenariosHeading || 'How we handle common failures'}
              </h2>
              <div
                className={
                  page.scenarioIds.length === 1
                    ? 'grid grid-cols-1 gap-6 max-w-2xl mx-auto'
                    : page.scenarioIds.length === 2
                      ? 'grid grid-cols-1 md:grid-cols-2 gap-6'
                      : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                }
              >
                {page.scenarioIds.map((id) => (
                  <ScenarioCard key={id} scenario={scenarios[id]} />
                ))}
              </div>
            </div>
          </section>
        )}


        <ServiceFAQ faqs={page.faqs} />

        <section className="py-12">
          <div className="container mx-auto px-4 max-w-3xl text-center space-y-4">
            <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">Where the work is done</h2>
            <p className="text-[var(--color-text-secondary)] leading-relaxed">
              All recovery work happens at our{' '}
              <Link href="/columbia-md" className="text-[var(--color-primary)] font-semibold hover:underline">
                Columbia, MD lab
              </Link>{' '}
              (walk-in Mon–Fri, 8:30 a.m.–5:00 p.m.). Our{' '}
              <Link href="/tysons-va" className="text-[var(--color-primary)] font-semibold hover:underline">
                Tysons, VA office
              </Link>{' '}
              sees clients by appointment.{' '}
              {page.path === '/mail-in-data-recovery' ? (
                'Ship your drive to us free both ways'
              ) : (
                <Link href="/mail-in-data-recovery" className="text-[var(--color-primary)] font-semibold hover:underline">
                  Ship your drive to us free both ways
                </Link>
              )}
              , or book a pickup for a small fee. 24/7 emergency line:{' '}
              <a href={PHONE_TEL} className="text-[var(--color-primary)] font-semibold hover:underline">
                (410) 937-7332
              </a>
              .
            </p>
            {page.relatedLinks && page.relatedLinks.length > 0 && (
              <p className="text-[var(--color-text-secondary)]">
                Related:{' '}
                {page.relatedLinks.map((link, index) => (
                  <span key={link.href}>
                    {index > 0 ? ' · ' : ''}
                    <Link href={link.href} className="text-[var(--color-primary)] hover:underline">
                      {link.label}
                    </Link>
                  </span>
                ))}
              </p>
            )}
          </div>
        </section>

        <section className="py-16 bg-[var(--color-surface-100)]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] mb-4 text-center">
              Get a free evaluation
            </h2>
            <p className="text-center text-[var(--color-text-secondary)] mb-8">
              Tell us what failed. We reply within one business day, and you get a fixed quote before any paid
              work. No data, no charge.
            </p>
            <div className="bg-[var(--color-surface-100)] border border-[var(--color-border)] rounded-2xl p-6 sm:p-8">
              <HubspotContactForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
