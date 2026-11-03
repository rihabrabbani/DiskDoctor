import data from './data/lp-reviews.json';

// Reviews come only from lp-reviews.json (regenerated weekly from the Business Profile data).
// Never hand-edit ratings or excerpts here or in the JSON.

export type LocationId = 'columbia' | 'tysons';

export type LpReview = {
  id: string;
  name: string;
  date: string;
  location: LocationId;
  avatar: string;
  excerpt: string;
  featuredText?: string;
  mapsUrl: string;
};

export type LocationRating = { rating: string; count: number; mapsUrl: string };

type RawReview = {
  location: string;
  name: string;
  date?: string;
  avatar: string;
  excerpt?: string;
  featuredText?: string;
};

const reviews = data.reviews as Record<string, RawReview>;
const stackOnly = data.stackOnly as Record<string, RawReview>;
const pages = data.pages as Record<string, { location: string; heroStack: string[]; featured: string; strip: string[] }>;

export function locationRating(id: LocationId): LocationRating {
  const loc = data.locations[id];
  return { rating: loc.rating.toFixed(1), count: loc.count, mapsUrl: loc.mapsUrl };
}

function toReview(id: string): LpReview {
  const r = reviews[id];
  if (!r) throw new Error(`lp-reviews.json: unknown review "${id}"`);
  const location = r.location as LocationId;
  return {
    id,
    name: r.name,
    date: r.date ?? '',
    location,
    avatar: r.avatar,
    excerpt: r.excerpt ?? '',
    featuredText: r.featuredText,
    mapsUrl: data.locations[location].mapsUrl,
  };
}

/** Reviews for one page, by its lp-reviews.json key (md/hard-drive … raid). */
export function pageReviews(key: string) {
  const page = pages[key];
  if (!page) throw new Error(`lp-reviews.json: no page "${key}"`);
  return {
    heroStack: page.heroStack.map((id) => {
      const r = reviews[id] ?? stackOnly[id];
      return { name: r.name, avatar: r.avatar };
    }),
    featured: toReview(page.featured),
    strip: page.strip.map(toReview),
  };
}

export const REVIEWS_UPDATED = data.updated;
