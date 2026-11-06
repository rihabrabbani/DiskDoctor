import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { allServices } from '@/data/allServices';
import { coreServicePages } from '@/data/corePages';
import { PHONE_TEL, SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Data Recovery Services',
  description:
    'Every DiskDoctor data recovery service: hard drives, SSDs, RAID, NAS, servers, Windows, Mac, Linux, photos, email and more. Free evaluation. No data, no charge.',
  alternates: {
    canonical: `${SITE_URL}/services`,
  },
};

// Ids that are not live yet are skipped, so new service pages appear here once they exist in allServices.
const groups: { title: string; ids: string[] }[] = [
  {
    title: 'Drives, RAID and servers',
    ids: ['hard-drive-recovery', 'ssd-recovery', 'raid-recovery', 'nas-recovery', 'server-recovery', 'virtual-recovery', 'remote-recovery'],
  },
  {
    title: 'Computers and operating systems',
    ids: ['windows-recovery', 'mac-recovery', 'linux-recovery', 'unix-recovery'],
  },
  {
    title: 'Files and photos',
    ids: ['file-recovery', 'photo-recovery'],
  },
  {
    title: 'Email, security and backup',
    ids: ['email-recovery', 'email-security', 'data-security', 'data-backup'],
  },
  {
    title: 'Cloning and duplication',
    ids: ['data-cloning', 'data-duplication'],
  },
];

// Core pages (hard drive, SSD, RAID, NAS, server) use their own list copy; the rest come from allServices.
const directory = [
  ...coreServicePages.map((page) => ({ id: page.id, title: page.listTitle, description: page.listDescription })),
  ...allServices
    .filter((service) => !coreServicePages.some((page) => page.id === service.id))
    .map((service) => ({ id: service.id, title: service.title, description: service.description })),
];

// Phone recovery is not promoted: its page stays live but isn't listed here.
const hidden = new Set(['mobile-recovery']);
const grouped = new Set([...groups.flatMap((group) => group.ids), ...hidden]);
const ungrouped = directory.filter((service) => !grouped.has(service.id));

const sections = [
  ...groups.map((group) => ({
    title: group.title,
    services: group.ids
      .map((id) => directory.find((service) => service.id === id))
      .filter((service) => service !== undefined),
  })),
  ...(ungrouped.length > 0 ? [{ title: 'More services', services: ungrouped }] : []),
].filter((section) => section.services.length > 0);

export default function ServicesIndexPage() {
  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)]">
      <Header />

      <main className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold text-[var(--color-text-primary)] mb-4">
              Data recovery services
            </h1>
            <p className="text-lg text-[var(--color-text-secondary)] max-w-3xl leading-relaxed mb-12">
              Every job is handled in our ISO 9001 certified Columbia, MD lab. Free evaluation, a fixed quote
              before any paid work, and no data, no charge. Emergencies: call our 24/7 line,{' '}
              <a href={PHONE_TEL} className="text-[var(--color-primary)] font-semibold">
                (410) 937-7332
              </a>
              .
            </p>

            <div className="space-y-12">
              {sections.map((section) => (
                <section key={section.title}>
                  <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-5">{section.title}</h2>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {section.services.map((service) => (
                      <li key={service.id}>
                        <Link
                          href={`/services/${service.id}`}
                          className="block h-full bg-[var(--color-surface-100)] border border-[var(--color-border)] rounded-xl p-5 hover:border-[var(--color-primary-200)] hover:shadow-[var(--shadow-md)] transition-all"
                        >
                          <span className="block font-semibold text-[var(--color-text-primary)] mb-1">
                            {service.title}
                          </span>
                          <span className="block text-sm text-[var(--color-text-secondary)] leading-relaxed line-clamp-3">
                            {service.description}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>

            <div className="mt-14 text-center" data-track-position="cta_band">
              <Link
                href="/contact"
                className="inline-block px-8 py-4 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white rounded-lg font-semibold transition-all"
              >
                Get a free evaluation
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
