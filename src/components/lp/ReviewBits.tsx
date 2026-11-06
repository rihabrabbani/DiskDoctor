// Review display helpers: initials instead of copied Google profile photos, and a star row that
// shows the real rating (4.9 = a partial fifth star), never five full stars by default.

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
