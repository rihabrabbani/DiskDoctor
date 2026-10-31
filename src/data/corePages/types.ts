import type { ScenarioId } from '@/data/scenarios';

// Content model for the core service pages (hard drive, SSD, RAID, NAS, server) and /data-recovery-cost.
// Every page renders through src/components/corePage/CorePageLayout.tsx:
// hero → sections (problem → what we do → process) → cases → FAQ → locations → form CTA.

export interface CorePageSection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  // Paragraphs shown after the bullets.
  closing?: string[];
  // Optional closing link under the section, e.g. { href: '/data-recovery-cost', label: 'How pricing works' }.
  link?: { href: string; label: string };
}

export interface CorePageCase {
  title: string;
  // Short facts shown as a list above the story, e.g. { label: 'RAID level', value: 'RAID 5, five disks' }.
  details?: { label: string; value: string }[];
  body: string;
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
  heroImage: string;
  // Required when heroImage is one of the P1-7 illustration photos.
  heroImageAlt?: string;
  // CSS object-position for the hero photo, e.g. 'center bottom'.
  heroImagePosition?: string;
  sections: CorePageSection[];
  // Labelled example scenarios (spec P1-7), shown until real cases arrive.
  scenariosHeading?: string;
  scenarioIds?: ScenarioId[];
  // Real client cases only (confirmed by the client). None are published yet.
  casesHeading?: string;
  cases?: CorePageCase[];
  // Shown visibly and used verbatim for the FAQPage JSON-LD.
  faqs: { question: string; answer: string }[];
  relatedLinks?: { href: string; label: string }[];
}
