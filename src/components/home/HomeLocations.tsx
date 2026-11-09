import Link from 'next/link';
import { locations } from '@/data/locations';
import { COLUMBIA_MAPS_URL, PHONE_TEL, TYSONS_MAPS_URL } from '@/lib/site';
import LabFigure from '@/components/lab/LabFigure';

const serviceAreas = locations.filter((location) => !location.isHeadOffice && !location.isAppointmentOnly);

export default function HomeLocations() {
  return (
    <section id="locations" data-track-position="location_card" className="py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--color-text-primary)]">
            Our <span className="text-[var(--color-primary)]">locations</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          <div className="flex flex-col bg-[var(--color-surface-100)] border border-[var(--color-border)] rounded-2xl p-6 lg:p-8">
            {/* P16. The Tysons card gets its own office photo when it arrives (manifest: null). */}
            <LabFigure code="P16" sizes="(min-width: 768px) 45vw, 100vw" aspect="16 / 9" caption={false} className="mb-5" />
            <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-1">Columbia, MD</h3>
            <p className="text-[var(--color-primary)] font-medium mb-4">Head office and recovery lab</p>
            <address className="not-italic text-[var(--color-text-secondary)] leading-relaxed mb-4">
              10015 Old Columbia Rd, Suite B 215
              <br />
              Columbia, MD 21046
            </address>
            <p className="text-[var(--color-text-secondary)] mb-1">Walk-in Mon–Fri, 8:30 a.m.–5:00 p.m.</p>
            <p className="text-[var(--color-text-secondary)] mb-6">
              24/7 emergency line:{' '}
              <a href={PHONE_TEL} className="text-[var(--color-primary)] font-semibold hover:underline">
                (410) 937-7332
              </a>
            </p>
            <div className="mt-auto">
              <Link
                href="/columbia-md"
                className="mr-4 text-[var(--color-primary)] font-medium hover:underline"
              >
                About the lab
              </Link>
              <a
                href={COLUMBIA_MAPS_URL}
                data-office="columbia"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-3 px-6 py-3 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[var(--color-text-inverse)] rounded-lg font-semibold transition-all"
              >
                Directions
              </a>
            </div>
          </div>

          <div className="flex flex-col bg-[var(--color-surface-100)] border border-[var(--color-border)] rounded-2xl p-6 lg:p-8">
            <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-1">Tysons, VA</h3>
            <p className="text-[var(--color-primary)] font-medium mb-4">Office, by appointment</p>
            <address className="not-italic text-[var(--color-text-secondary)] leading-relaxed mb-6">
              8300 Boone Blvd, Suite 513
              <br />
              Tysons, VA 22182
            </address>
            <div className="mt-auto">
              <Link
                href="/tysons-va"
                className="mr-4 text-[var(--color-primary)] font-medium hover:underline"
              >
                About the office
              </Link>
              <a
                href={TYSONS_MAPS_URL}
                data-office="tysons"
                target="_blank"
                rel="noopener noreferrer"
                className="mr-4 text-[var(--color-primary)] font-medium hover:underline"
              >
                Directions
              </a>
              <Link
                href="/contact"
                className="inline-block mt-3 px-6 py-3 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[var(--color-text-inverse)] rounded-lg font-semibold transition-all"
              >
                Book an appointment
              </Link>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto mt-10 text-center">
          <p className="font-semibold text-[var(--color-text-primary)] mb-3">
            Serving Maryland, Virginia and Washington, DC
          </p>
          <p className="text-[var(--color-text-secondary)] leading-relaxed">
            {serviceAreas.map((area, index) => (
              <span key={area.slug}>
                {index > 0 ? ' · ' : ''}
                <Link href={`/${area.slug}`} className="text-[var(--color-primary)] hover:underline">
                  {area.fullName}
                </Link>
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
