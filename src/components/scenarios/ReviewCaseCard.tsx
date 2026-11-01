import { GOOGLE_REVIEWS_URL, type ReviewCase } from '@/data/reviewCases';

// A real recovery from a Google review. Real, so no example label; the source line links to the reviews.
export default function ReviewCaseCard({ review }: { review: ReviewCase }) {
  return (
    <article className="bg-[var(--color-surface-100)] border border-[var(--color-border)] rounded-2xl p-6 flex flex-col">
      <h3 className="font-semibold text-lg text-[var(--color-text-primary)] mb-3">{review.title}</h3>
      {review.context && (
        <p className="text-[var(--color-text-secondary)] leading-relaxed mb-3">{review.context}</p>
      )}
      {review.quote && (
        <blockquote className="border-l-4 border-[var(--color-primary)] pl-4 text-[var(--color-text-primary)] italic leading-relaxed mb-4">
          “{review.quote}”
        </blockquote>
      )}
      {review.outcome && (
        <p className="text-[var(--color-text-secondary)] leading-relaxed mb-4">{review.outcome}</p>
      )}
      <footer className="mt-auto text-sm">
        <p className="font-semibold text-[var(--color-text-primary)]">{review.reviewer}</p>
        <a
          href={GOOGLE_REVIEWS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--color-primary)] hover:underline"
        >
          From a Google review, {review.date}
        </a>
      </footer>
    </article>
  );
}
