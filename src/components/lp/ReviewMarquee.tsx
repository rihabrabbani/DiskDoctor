'use client';

import { useState } from 'react';
import { Initials } from './ReviewBits';
import type { LpReview } from '@/lp/reviews';

// CSS-only infinite scroll (track duplicated, translateX(-50%)), paused on hover/focus and by the
// button (WCAG 2.2.2). Reduced motion: no animation, the duplicates hide and the strip scrolls.
export default function ReviewMarquee({
  title,
  reviews,
  linkLabel,
  mapsUrl,
}: {
  title: string;
  reviews: LpReview[];
  linkLabel: string;
  mapsUrl: string;
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
        <Initials name={r.name} size={38} />
        <span className="lp-rcard-name">
          <strong>{r.name}</strong>
          <span>{r.date} · Google</span>
        </span>
        <span className="lp-stars" role="img" aria-label="5 out of 5 stars">
          ★★★★★
        </span>
      </span>
      <blockquote>{r.excerpt}</blockquote>
    </a>
  );

  return (
    <section aria-label="Selected Google reviews" className="lp-marquee-sec">
      <div className="lp-wrap lp-marquee-head">
        <p>{title}</p>
        <div className="lp-marquee-head-right">
          <a href={mapsUrl} target="_blank" rel="noopener noreferrer" data-map-link="reviews">
            {linkLabel}
          </a>
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
