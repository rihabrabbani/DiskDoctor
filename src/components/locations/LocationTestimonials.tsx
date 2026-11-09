'use client';

import { LocationData, isVirginia } from '@/data/locations';
import { testimonials } from '@/data/testimonials';
import { telHref } from '@/lib/site';
import Link from 'next/link';
import lpReviews from '@/lp/data/lp-reviews.json';

type StoredReview = { location: string; name: string; date?: string; stars: number; text?: string; featuredText?: string; excerpt?: string };

// Virginia pages show Google reviews of the Tysons office only (brief 9 Nov, section 6), from the
// same stored data as the landing pages: the full Google text where stored, never edited.
const TYSONS_REVIEWS = Object.entries(lpReviews.reviews as Record<string, StoredReview>)
  .filter(([id, r]) => r.location === 'tysons' && r.stars >= 4 && id !== 'moeez-ahmed')
  .map(([id, r]) => ({ id, name: r.name, date: r.date ?? '', text: r.text ?? r.featuredText ?? r.excerpt ?? '' }));
const TYSONS_MAPS_URL = lpReviews.locations.tysons.mapsUrl;

export default function LocationTestimonials({ location }: { location: LocationData }) {
  if (isVirginia(location)) {
    return (
      <section className="py-16 bg-[var(--color-surface-100)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <h2 className="text-3xl font-bold text-[var(--color-text-primary)] mb-10 text-center">
            Google reviews of our Tysons office
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {TYSONS_REVIEWS.map((r) => (
              <blockquote key={r.id} className="border border-[var(--color-border)] rounded-xl p-6 bg-[var(--color-background)]">
                <p className="text-[var(--color-text-secondary)] leading-relaxed mb-4 whitespace-pre-line">“{r.text}”</p>
                <footer className="text-sm font-semibold text-[var(--color-text-primary)]">
                  {r.name} · Google{r.date ? ` · ${r.date}` : ''}
                </footer>
              </blockquote>
            ))}
          </div>
          <p className="text-center mt-8">
            <a
              href={TYSONS_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-map-link="reviews"
              className="font-semibold text-[var(--color-primary)]"
            >
              See all reviews on Google Maps
            </a>
            {' · '}
            <a href={telHref(location.officePhone ?? location.phone)} className="font-semibold text-[var(--color-primary)]">
              Call {location.officePhone ?? location.phone}
            </a>
            {' '}or{' '}
            <Link href="/contact" className="font-semibold text-[var(--color-primary)]">
              get a free evaluation
            </Link>
            .
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-[var(--color-surface-100)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {location.isAppointmentOnly ? (
          <h2 className="text-3xl font-bold text-[var(--color-text-primary)] mb-10 text-center">
            Reviews from our clients
          </h2>
        ) : (
          <>
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] mb-4 text-center">
              Reviews for the Columbia lab
            </h2>
            <p className="text-center text-[var(--color-text-secondary)] mb-10">
              Public reviews naming the Columbia facility. {location.city} jobs are processed there
              {location.slug === 'columbia-md' ? '.' : `, not at a fake ${location.city} storefront.`}
            </p>
          </>
        )}
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((t) => (
            <blockquote key={t.id} className="border border-[var(--color-border)] rounded-xl p-6 bg-[var(--color-background)]">
              <p className="text-[var(--color-text-secondary)] leading-relaxed mb-4">“{t.quote}”</p>
              <footer className="text-sm font-semibold text-[var(--color-text-primary)]">
                {t.author} · {t.source}
                {t.date ? ` · ${t.date}` : ''}
              </footer>
            </blockquote>
          ))}
        </div>
        <p className="text-center mt-8">
          <a href={telHref(location.officePhone ?? location.phone)} className="font-semibold text-[var(--color-primary)]">
            Call {location.officePhone ?? location.phone}
          </a>
          {' '}or{' '}
          <Link href="/contact" className="font-semibold text-[var(--color-primary)]">
            get a free evaluation
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
