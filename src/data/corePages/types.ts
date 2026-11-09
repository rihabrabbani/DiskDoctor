import type { StaticImageData } from 'next/image';
import type { LabPhotoCode } from '@/data/labPhotos';
import type { ReviewCaseId } from '@/data/reviewCases';
import type { ScenarioId } from '@/data/scenarios';

// Content model for the core service pages (hard drive, SSD, RAID, NAS, server) and /data-recovery-cost.
// Every page renders through src/components/corePage/CorePageLayout.tsx:
// hero → sections (problem → what we do → process) → review cases → scenarios → FAQ → locations → form CTA.

export interface CorePageSection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  // Paragraphs shown after the bullets.
  closing?: string[];
  // Optional closing link under the section, e.g. { href: '/data-recovery-cost', label: 'How pricing works' }.
  link?: { href: string; label: string };
}

export interface CorePage {
  id: string;
  path: string;
  navLabel: string;
  listTitle: string;
  listDescription: string;
  seoTitle: string;
  seoDescription: string;
  h1: string;
  heroEyebrow: string;
  heroIntro: string;
  heroImage: string | StaticImageData;
  // Required when heroImage is one of the P1-7 illustration photos.
  heroImageAlt?: string;
  // CSS object-position for the hero photo, e.g. 'center bottom'.
  heroImagePosition?: string;
  sections: CorePageSection[];
  // Lab photo under "Where the work is done", with its caption.
  labPhoto?: LabPhotoCode;
  // Real recoveries from Google reviews (spec v4 W4), shown above the scenarios.
  reviewsHeading?: string;
  reviewIds?: ReviewCaseId[];
  // Labelled example scenarios (spec P1-7).
  scenariosHeading?: string;
  scenarioIds?: ScenarioId[];
  // Shown visibly and used verbatim for the FAQPage JSON-LD.
  faqs: { question: string; answer: string }[];
  relatedLinks?: { href: string; label: string }[];
}
