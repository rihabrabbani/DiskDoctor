// Real recoveries from the client's public Google reviews (spec v4 W4). `quote` is the reviewer's own
// words; `context` (shown before it) and `outcome` (after it) may only restate what the review says.
// Never add outcome numbers the review doesn't state, and never mark these up as Review or
// AggregateRating schema.

export const GOOGLE_REVIEWS_URL = 'https://maps.google.com/maps?cid=14046850434310190420';

export type ReviewCaseId = 'R1' | 'R2' | 'R3' | 'R4' | 'R5' | 'R6';

export interface ReviewCase {
  id: ReviewCaseId;
  title: string;
  context?: string;
  quote?: string;
  outcome?: string;
  // First name + last initial as shown on Google, or the business name.
  reviewer: string;
  // Month and year of the review, e.g. 'March 2025'.
  date: string;
}

export const reviewCases: Record<ReviewCaseId, ReviewCase> = {
  R1: {
    id: 'R1',
    title: 'RAID server crash at a business',
    quote: 'Our RAID server unexpectedly crashed at our business, putting critical data at risk.',
    outcome: 'Recovered over the weekend, with all the vital information back.',
    reviewer: 'Moeez A.',
    date: 'March 2025',
  },
  R2: {
    id: 'R2',
    title: 'RAID 5 with two failed drives',
    quote: 'I had my raid5 array go down with two drive failures.',
    outcome: 'All the data was recovered, with the file structure kept.',
    reviewer: 'F. Khan',
    date: 'July 2020',
  },
  R3: {
    id: 'R3',
    title: 'Corrupted SSD during a graduate thesis',
    context: 'The computer force-reset in the middle of a graduate thesis and the SSD was corrupted.',
    quote: 'Disk Doctors were able to recover all my files.',
    reviewer: 'Emma S.',
    date: 'July 2026',
  },
  R4: {
    id: 'R4',
    title: 'Completely dead 8 TB hard drive',
    quote: 'Immaculately recovered my completely dead 8-terabyte disk drive.',
    reviewer: 'One Love Co-Op Network',
    date: 'November 2025',
  },
  R5: {
    id: 'R5',
    title: '15-year-old external drive with family photos',
    context: 'A 15-year-old external drive was not powering on.',
    quote: 'It had ALL my family photos stored on it.',
    outcome: 'All of them were retrieved.',
    reviewer: 'Kylie B.',
    date: 'March 2025',
  },
  R6: {
    id: 'R6',
    title: 'Business drive down in the 2023 Western Digital hack',
    context: 'Their business hard drive went down in the 2023 Western Digital hack and the business was at a standstill.',
    quote: 'We were back up and running in 24 hours.',
    reviewer: 'Jennifer T.',
    date: 'April 2023',
  },
};
