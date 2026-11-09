import { getImageProps } from 'next/image';

// Review display helpers: the reviewer's stored Google profile photo (initials when there is none),
// a per-review star row, and a rating row that shows the real rating (4.9 = a partial fifth star).

const AVATAR_COLOURS = ['#111827', '#b92d1a', '#374151', '#9a2a18', '#4b5563'];

export function initials(name: string) {
  const words = name.split(/\s+/).filter((w) => /^[A-Za-z]/.test(w));
  if (words.length === 0) return '?';
  const first = words[0][0];
  const last = words.length > 1 ? words[words.length - 1][0] : '';
  return (first + last).toUpperCase();
}

export function Initials({ name, size }: { name: string; size: number }) {
  let hash = 0;
  for (const ch of name) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0;
  return (
    <span
      className="lp-initials"
      aria-hidden="true"
      style={{
        width: size,
        height: size,
        fontSize: Math.round(size * 0.4),
        background: AVATAR_COLOURS[hash % AVATAR_COLOURS.length],
      }}
    >
      {initials(name)}
    </span>
  );
}

/** Reviewer avatar: the stored profile photo (round, lazy, alt = name) or initials as the fallback. */
export function Avatar({ name, photo, size }: { name: string; photo?: string; size: number }) {
  if (!photo) return <Initials name={name} size={size} />;
  // getImageProps + <img>: optimized like <Image>, without a client component per avatar (the review
  // strip renders each one twice).
  const { props } = getImageProps({ src: photo, alt: name, width: size, height: size, loading: 'lazy' });
  // eslint-disable-next-line @next/next/no-img-element
  return <img {...props} alt={name} className="lp-avatar" />;
}

/** One review's own stars, as on Google. */
export function ReviewStars({ stars }: { stars: number }) {
  const n = Math.max(0, Math.min(5, Math.round(stars)));
  return (
    <span className="lp-stars" role="img" aria-label={`${n} out of 5 stars`}>
      {'★'.repeat(n)}
      {n < 5 && <span className="lp-stars-off">{'★'.repeat(5 - n)}</span>}
    </span>
  );
}

export function RatingStars({ rating, className = '' }: { rating: number | string; className?: string }) {
  const value = Math.max(0, Math.min(5, Number(rating)));
  return (
    <span className={`lp-stars lp-stars-partial ${className}`} role="img" aria-label={`${value.toFixed(1)} out of 5 stars`}>
      <span className="lp-stars-empty" aria-hidden="true">
        ★★★★★
      </span>
      <span className="lp-stars-fill" aria-hidden="true" style={{ width: `${(value / 5) * 100}%` }}>
        ★★★★★
      </span>
    </span>
  );
}
