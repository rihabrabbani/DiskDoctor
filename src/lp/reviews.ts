import data from './data/lp-reviews.json';

// Reviews come only from lp-reviews.json (regenerated weekly from the Business Profile data).
// Never hand-edit ratings or excerpts here or in the JSON.
// Dev brief 9 Nov 2026, item 3: reviewers' stored profile photos (realPhoto) with initials as the
// fallback; 4★ and up only; MD and RAID pages show Columbia reviews only; VA pages show Tysons reviews
// first, then Columbia, and never put the Tysons rating next to Columbia reviews. No review counts.
// 9 Nov follow-up: cards show the full Google text (`text`) when stored; Menna Khaliel and Kristin
// deGhetaldi are off the landing pages; Moeez Ahmed is off the VA pages.
// Section 6: VA pages show Tysons reviews only (no Columbia review, rating or label).

export type LocationId = 'columbia' | 'tysons';

export type LpReview = {
  id: string;
  name: string;
  date: string;
  location: LocationId;
  /** Stored Google profile photo, only when the reviewer has a real one (else render initials). */
  photo?: string;
  stars: number;
  /** What the card shows: the full Google text when stored, else the stored excerpt. */
  body: string;
  /** What the featured block shows. */
  featuredBody: string;
  mapsUrl: string;
};

export type StackAvatar = { name: string; photo?: string };

export type LocationRating = { rating: string; mapsUrl: string };

type RawReview = {
  location: string;
  name: string;
  date?: string;
  avatar: string;
  realPhoto?: boolean;
  stars: number;
  text?: string;
  excerpt?: string;
  featuredText?: string;
};

// Ads brief 16 Nov: every review stays, but work-related ones lead and the family-photo ones go last.
// MD pages also get the Columbia work reviews, which their strips didn't have.
const WORK_FIRST = ['mustafar-raheem', 'jordan-johnson', 'jennifer-leigh-tully', 'sunny-2021', 'moeez-ahmed'];
const PERSONAL_LAST = ['kylie-berry', 'yaadira-brown', 'yassaman-hashemi', 'sincerelymaha'];
// The featured block follows the same idea: a work review instead of a personal one.
const FEATURED_OVERRIDE: Record<string, string> = {
  'va/hard-drive': 'jordan-johnson',
  'va/data-recovery': 'jordan-johnson',
  'va/ssd': 'jordan-johnson',
  'md/hard-drive': 'jennifer-leigh-tully',
  'md/data-recovery': 'jennifer-leigh-tully',
};

const MIN_STARS = 4;
// 18 Nov: Gracie Hunt's review is off too (same name as the Director of Operations in the team block).
const LP_EXCLUDE = new Set(['menna-khaliel', 'kristin-deghetaldi', 'gracie-hunt']);
const VA_EXCLUDE = new Set(['moeez-ahmed']);

const reviews = data.reviews as Record<string, RawReview>;
const stackOnly = data.stackOnly as Record<string, RawReview>;
const pages = data.pages as Record<string, { location: string; heroStack: string[]; featured: string; strip: string[] }>;

export function locationRating(id: LocationId): LocationRating {
  const loc = data.locations[id];
  return { rating: loc.rating.toFixed(1), mapsUrl: loc.mapsUrl };
}

// realPhoto false = a Google letter avatar (initials render instead). Stack-only entries have no flag
// and all hold real profile photos.
const hasPhoto = (r: RawReview) => r.realPhoto !== false;

function toReview(id: string): LpReview {
  const r = reviews[id];
  if (!r) throw new Error(`lp-reviews.json: unknown review "${id}"`);
  const location = r.location as LocationId;
  return {
    id,
    name: r.name,
    date: r.date ?? '',
    location,
    photo: hasPhoto(r) ? r.avatar : undefined,
    stars: r.stars,
    body: r.text ?? r.featuredText ?? r.excerpt ?? '',
    featuredBody: r.text ?? r.featuredText ?? r.excerpt ?? '',
    mapsUrl: data.locations[location].mapsUrl,
  };
}

const toAvatar = (r: RawReview): StackAvatar => ({ name: r.name, photo: hasPhoto(r) ? r.avatar : undefined });

/** Reviews for one page, by its lp-reviews.json key (md/hard-drive … raid). */
export function pageReviews(key: string) {
  const page = pages[key];
  if (!page) throw new Error(`lp-reviews.json: no page "${key}"`);
  const isVa = page.location === 'tysons';
  const allowed = (id: string) => !LP_EXCLUDE.has(id) && !(isVa && VA_EXCLUDE.has(id));
  const good = (r: LpReview) => r.stars >= MIN_STARS && allowed(r.id);

  let strip = page.strip.map(toReview).filter(good);
  if (isVa) {
    // Every Tysons review in the JSON (not only this page's strip), in the strip's order first.
    const tysons = Object.keys(reviews).filter((id) => allowed(id) && reviews[id].location === 'tysons');
    const order = [...strip.map((r) => r.id).filter((id) => tysons.includes(id)), ...tysons.filter((id) => !strip.some((r) => r.id === id))];
    strip = order.map(toReview).filter(good);
  } else {
    strip = strip.filter((r) => r.location === 'columbia');
  }
  const location = isVa ? 'tysons' : 'columbia';
  const work = WORK_FIRST.filter((id) => allowed(id) && reviews[id]?.location === location);
  const rank = (id: string) => (PERSONAL_LAST.includes(id) ? 1 : 0);
  strip = [...work.map(toReview).filter(good), ...strip.filter((r) => !work.includes(r.id))];
  strip = strip.map((r, i) => ({ r, i })).sort((a, b) => rank(a.r.id) - rank(b.r.id) || a.i - b.i).map(({ r }) => r);

  // The hero stack sits next to the page's own rating, so it only shows that location's reviewers.
  // VA: every Tysons reviewer, real photos first. MD/RAID: the JSON stack, minus any Tysons reviewer.
  const heroStack = isVa
    ? Object.entries(reviews)
        .filter(([id, r]) => allowed(id) && r.location === 'tysons' && r.stars >= MIN_STARS)
        .map(([, r]) => r)
        .sort((a, b) => Number(hasPhoto(b)) - Number(hasPhoto(a)))
        .map(toAvatar)
    : page.heroStack
        .filter(allowed)
        .map((id) => reviews[id] ?? stackOnly[id])
        .filter((r) => r.location === 'columbia' && r.stars >= MIN_STARS)
        .map(toAvatar);

  const featured = FEATURED_OVERRIDE[key] ?? page.featured;
  if (!allowed(featured)) throw new Error(`lp-reviews.json: featured review "${featured}" is excluded on ${key}`);
  return { heroStack, featured: toReview(featured), strip };
}

export const REVIEWS_UPDATED = data.updated;
