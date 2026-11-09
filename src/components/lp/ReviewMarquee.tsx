'use client';

import { useState } from 'react';
import { Avatar, ReviewStars } from './ReviewBits';
import type { LpReview } from '@/lp/reviews';

const OFFICE_LABEL = { tysons: 'Tysons office', columbia: 'Columbia, MD' } as const;

// CSS-only infinite scroll (track duplicated, translateX(-50%)), paused on hover/focus and by the
// button (WCAG 2.2.2). Reduced motion: no animation, the duplicates hide and the strip scrolls.
export default function ReviewMarquee({
  reviews,
  links,
  ratings,
  showOffice,
}: {
  reviews: LpReview[];
  /** "See all reviews on Google Maps" per location shown (no counts: they go stale). */
  links: { label: string; href: string }[];
  /** Each office's own rating, shown in the header. */
  ratings: { label: string; rating: string }[];
  /** VA pages: label each card with its office. */
  showOffice: boolean;
}) {
  const [paused, setPaused] = useState(false);

  const card = (r: LpReview, dup: boolean) => (
    <a
      key={`${r.id}${dup ? '-dup' : ''}`}
      href={r.mapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="lp-rcard"
      data-map-link="reviews"
      {...(dup ? { 'data-dup': '', 'aria-hidden': true, tabIndex: -1 } : {})}
    >
      <span className="lp-rcard-top">
        <Avatar name={r.name} photo={r.photo} size={40} />
        <span className="lp-rcard-name">
          <strong>{r.name}</strong>
          <span>{r.date} · Google</span>
        </span>
        <ReviewStars stars={r.stars} />
      </span>
      {showOffice && <span className="lp-rcard-label">{OFFICE_LABEL[r.location]}</span>}
      <blockquote>{r.body}</blockquote>
      <span className="lp-rcard-more">Read more on Google Maps</span>
    </a>
  );

  return (
    <section aria-labelledby="lp-reviews-h" className="lp-marquee-sec">
      <div className="lp-wrap lp-marquee-head">
        <div>
          <p id="lp-reviews-h">Reviews from Google</p>
          <span className="lp-marquee-ratings">
            {ratings.map((r) => (
              <span key={r.label}>
                {r.label} <strong>{r.rating}</strong>
              </span>
            ))}
          </span>
        </div>
        <div className="lp-marquee-head-right">
          {links.map((l) => (
            <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" data-map-link="reviews">
              {l.label}
            </a>
          ))}
          <button type="button" className="lp-marquee-toggle" aria-pressed={paused} onClick={() => setPaused(!paused)}>
            {paused ? 'Play reviews' : 'Pause reviews'}
          </button>
        </div>
      </div>
      <div className={`lp-marquee${paused ? ' is-paused' : ''}`}>
        <div className="lp-track">
          {reviews.map((r) => card(r, false))}
          {reviews.map((r) => card(r, true))}
        </div>
      </div>
    </section>
  );
}
