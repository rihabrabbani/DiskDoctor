import ReviewCaseCard from '@/components/scenarios/ReviewCaseCard';
import { reviewCases, type ReviewCaseId } from '@/data/reviewCases';

// Real recoveries from Google reviews (spec v4 W4). These replace the example scenarios on the homepage.
const homeReviewIds: ReviewCaseId[] = ['R1', 'R3', 'R4'];

export default function HomeRecoveries() {
  return (
    <section id="recent-recoveries" className="py-16 lg:py-24 bg-[var(--color-surface-200)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--color-text-primary)]">
            Recent recoveries, <span className="text-[var(--color-primary)]">in our clients&apos; words</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {homeReviewIds.map((id) => (
            <ReviewCaseCard key={id} review={reviewCases[id]} />
          ))}
        </div>
      </div>
    </section>
  );
}
