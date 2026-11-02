import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HubspotContactForm from '@/components/contact/HubspotContactForm';
import {
  COLUMBIA_ADDRESS,
  EMAIL,
  OFFICE_MAPS,
  PHONE_DISPLAY,
  PHONE_TEL,
  SITE_URL,
  TYSONS_ADDRESS,
  telHref,
} from '@/lib/site';
import { locations } from '@/data/locations';

const tysons = locations.find((loc) => loc.slug === 'tysons-va');

// Both offices with Directions links. Tysons uses its own office line, per the client's spec.
const officeCards = [
  {
    office: OFFICE_MAPS['columbia-md'].office,
    title: 'Columbia, MD lab',
    address: COLUMBIA_ADDRESS,
    hours: 'Walk-in Mon–Fri, 8:30 a.m.–5:00 p.m.',
    phone: '(410) 937-7332',
    mapsUrl: OFFICE_MAPS['columbia-md'].url,
  },
  {
    office: OFFICE_MAPS['tysons-va'].office,
    title: 'Tysons, VA office',
    address: TYSONS_ADDRESS,
    hours: 'By appointment. Call ahead so someone is here to meet you.',
    phone: tysons?.officePhone ?? '(410) 937-7332',
    mapsUrl: OFFICE_MAPS['tysons-va'].url,
  },
];

export const metadata: Metadata = {
  title: 'Free Data Recovery Evaluation',
  description:
    'Request a free data recovery evaluation in Columbia MD. No data, no charge. Confidential handling. Call (410) 937-7332 for emergencies.',
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)]">
      <Header />

      <main className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="mb-8" data-track-position="form_intro">
              <h1 className="text-4xl sm:text-5xl font-bold text-[var(--color-text-primary)] mb-4">
                Free data recovery evaluation
              </h1>
              <p className="text-lg text-[var(--color-text-secondary)] max-w-3xl leading-relaxed">
                Tell us what failed and we&apos;ll give you a free evaluation and a fixed quote before
                any paid work. No data, no charge. We reply within one business day; for emergencies
                call our 24/7 line,{' '}
                <a href={PHONE_TEL} className="text-[var(--color-primary)] font-semibold">
                  (410) 937-7332
                </a>
                .
              </p>
            </div>

            <div className="bg-[var(--color-surface-100)] border border-[var(--color-border)] rounded-2xl p-6 sm:p-8 shadow-[var(--shadow-md)] mb-10">
              <HubspotContactForm />
            </div>

            <div data-track-position="location_card" className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              {officeCards.map((card) => (
                <div key={card.office} className="bg-[var(--color-surface-100)] border border-[var(--color-border)] rounded-xl p-6">
                  <h2 className="text-xl font-bold text-[var(--color-text-primary)]">{card.title}</h2>
                  <address className="not-italic text-[var(--color-text-secondary)] mt-2">{card.address}</address>
                  <p className="text-[var(--color-text-secondary)] mt-1">{card.hours}</p>
                  <p className="mt-2">
                    <a href={telHref(card.phone)} className="text-[var(--color-primary)] font-semibold hover:underline">
                      {card.phone}
                    </a>
                  </p>
                  <a
                    href={card.mapsUrl}
                    data-office={card.office}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-4 px-5 py-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[var(--color-text-inverse)] rounded-lg font-semibold transition-all"
                  >
                    Directions
                  </a>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
              <div className="bg-[var(--color-surface-100)] border border-[var(--color-border)] rounded-xl p-5">
                <p className="text-sm text-[var(--color-text-tertiary)]">Success Rate</p>
                <p className="text-2xl font-bold text-[var(--color-text-primary)]">95%</p>
              </div>
              <div className="bg-[var(--color-surface-100)] border border-[var(--color-border)] rounded-xl p-5">
                <p className="text-sm text-[var(--color-text-tertiary)]">In Business Since</p>
                <p className="text-2xl font-bold text-[var(--color-text-primary)]">1991</p>
              </div>
              <div className="bg-[var(--color-surface-100)] border border-[var(--color-border)] rounded-xl p-5">
                <p className="text-sm text-[var(--color-text-tertiary)]">Emergency Assistance</p>
                <p className="text-2xl font-bold text-[var(--color-text-primary)]">24/7</p>
              </div>
            </div>

            <div>
              <p className="text-lg text-[var(--color-text-secondary)] max-w-3xl leading-relaxed mb-4">
                Stop using the failed drive, phone, or RAID. Power it down and tell us what happened.
                A DiskDoctor specialist at the Columbia, MD lab reviews the case, explains options, and
                gives a fixed quote before any paid work. If we cannot recover the data you need, you do
                not pay a recovery fee — no data, no charge.
              </p>
              <p className="text-lg text-[var(--color-text-secondary)] max-w-3xl leading-relaxed mb-4">
                Typical logical recoveries finish in 24–48 hours. Physical jobs (clicking drives, RAID
                with multiple dead members, water-damaged phones) usually take 3–7 days, with emergency
                options when the files are time-critical. Drop off at 10015 Old Columbia Rd Suite B 215
                or ship in. The Tysons office at 8300 Boone Blvd Suite 513 is by appointment.
              </p>
              <p className="text-lg text-[var(--color-text-secondary)] max-w-3xl leading-relaxed mb-4">
                After you submit this form we confirm receipt, ask for device type and symptoms, and
                schedule intake. Media is handled under chain-of-custody. We do not browse your files
                beyond what is required to verify recovery. For urgent cases call{' '}
                <a href={PHONE_TEL} className="text-[var(--color-primary)] font-semibold">
                  {PHONE_DISPLAY}
                </a>
                , or email{' '}
                <a href={`mailto:${EMAIL}`} className="text-[var(--color-primary)] font-semibold">
                  {EMAIL}
                </a>
                .
              </p>
              <p className="text-lg text-[var(--color-text-secondary)] max-w-3xl leading-relaxed mb-4">
                What to include in the form: device type (hard drive, SSD, NAS, phone), what failed
                (click, not detected, water, RAID rebuild), operating system, and the folders that
                matter. Power the device down before you drive or ship. Do not run CHKDSK, Disk Utility
                First Aid, or a vendor RAID repair while you wait for a reply.
              </p>
              <p className="text-lg text-[var(--color-text-secondary)] max-w-3xl leading-relaxed mb-4">
                Confidentiality: recovered files are returned on new media you receive. We do not keep
                extra copies longer than needed to confirm delivery unless you ask us to retain them.
                Legal, medical, and contractor jobs can request written chain-of-custody. Evaluation
                stays free either way. No data, no charge on the recovery fee if we cannot retrieve
                what you specified.
              </p>
              <p className="text-lg text-[var(--color-text-secondary)] max-w-3xl leading-relaxed mb-4">
                Drop off at the Columbia lab weekdays 8:30 a.m.–5:00 p.m., schedule Tysons if that is
                closer, or ship in a rigid padded box. If the form does not load, call the number
                above. A specialist replies with next steps. You are not buying a repair until you
                accept a quote.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
