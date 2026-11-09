import type { LabPhotoCode } from '@/data/labPhotos';

// Lab photo slots per landing page, from manifest.json `pages` (dev brief 9 Nov 2026, item 2).
// Keys match pageReviews(): md/hard-drive … raid. Tysons office slots stay out until its own photo
// arrives (null in the manifest = render nothing). Photos sit below the first screen only.

export type LpPhotos = {
  /** "Failures" section (SymptomGrid). */
  failures?: LabPhotoCode[];
  /** RAID page only: next to "First hour after a RAID failure". */
  firstHour?: LabPhotoCode;
  /** The lab photo block (desktop). */
  lab: LabPhotoCode[];
  /** Phones show this one vertical photo instead of `lab`, when set. */
  labMobile?: LabPhotoCode;
};

export const HOW_IT_WORKS_PHOTOS: LabPhotoCode[] = ['P11', 'P2', 'P12'];

export const LP_PHOTOS: Record<string, LpPhotos> = {
  'md/data-recovery': { lab: ['P16', 'P1', 'P18'], labMobile: 'P13' },
  'md/hard-drive': { failures: ['P8'], lab: ['P1', 'P19', 'P16'], labMobile: 'P14' },
  'md/ssd': { failures: ['P10'], lab: ['P4', 'P5', 'P16'], labMobile: 'P13' },
  'va/data-recovery': { lab: ['P16', 'P1'] },
  'va/hard-drive': { failures: ['P8'], lab: ['P1', 'P19'] },
  'va/ssd': { failures: ['P10'], lab: ['P4', 'P16'] },
  raid: { firstHour: 'P17', failures: ['P9', 'P6'], lab: ['P3', 'P16'], labMobile: 'P15' },
};
