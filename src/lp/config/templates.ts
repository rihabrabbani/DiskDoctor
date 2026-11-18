import type { AreaId } from './areas';
import type { IconName } from '@/components/lp/LpIcon';
import { DEVICE_VALUES, type DeviceValue, type Symptom } from './form';

export type TemplateId = 'hard-drive' | 'data-recovery' | 'ssd' | 'raid';

export type FaqItem = { q: string; a: string };

/** A failure card. Tapping it scrolls to the form and picks this device (straight to step 2) and/or symptom. */
export type SymptomCard = { icon: IconName; title: string; text: string; device?: DeviceValue; symptom?: Symptom };

export type Template = {
  id: TemplateId;
  /** URL segment under /lp/{area}/ (raid has its own route). */
  slug: string;
  h1: (area: AreaId, place: string) => { lead: string; place?: string };
  metaDescription: (area: AreaId) => string;
  symptomsH: string;
  symptomsP: string;
  symptoms: SymptomCard[];
  brands: string[] | null;
  /** Replaces the opening question of the area's hero subline. */
  heroQuestion?: string;
  /** Pre-selected device; step 1 still shows. */
  device?: DeviceValue;
};

const HDD_BRANDS = ['Western Digital', 'Seagate', 'Toshiba', 'LaCie', 'Samsung', 'HGST', 'G-Technology'];

const where = (area: AreaId) =>
  area === 'va'
    ? 'Tysons office by appointment, free shipping both ways'
    : 'Columbia, MD lab, walk in or ship free both ways';

const facts = 'Free diagnosis, no data no charge. Since 1991, ISO 9001.';

export const TEMPLATES: Record<TemplateId, Template> = {
  'hard-drive': {
    id: 'hard-drive',
    slug: 'hard-drive-recovery',
    h1: (_area, place) => ({ lead: 'Hard drive data recovery in ', place }),
    metaDescription: (area) =>
      `Clicking, not detected, dropped or dead hard drive? ${where(area)}. ${facts}`,
    symptomsH: 'Hard drive failures we recover from',
    symptomsP: 'External, desktop and laptop drives, any capacity.',
    symptoms: [
      { icon: 'sound', title: 'Clicking or grinding', text: 'Usually a mechanical fault. These recoveries are done in our clean room.', symptom: 'Clicking or beeping' },
      { icon: 'monitorX', title: 'Not detected', text: 'The drive spins or lights up but your computer doesn’t see it.', symptom: 'Not detected' },
      { icon: 'drop', title: 'Dropped or knocked', text: 'External and desktop drives damaged by a drop or a knock.', symptom: 'Dropped' },
      { icon: 'fileAlert', title: '“Needs to be formatted”', text: 'Corrupted partitions and file systems.', symptom: 'Asks to format' },
      { icon: 'bolt', title: 'Water, fire or power surge', text: 'Electronic and physical damage after an accident or outage.', symptom: 'Water or power damage' },
      { icon: 'trash', title: 'Deleted by mistake', text: 'Files or partitions deleted or overwritten by mistake.', symptom: 'Deleted files' },
    ],
    brands: HDD_BRANDS,
  },
  'data-recovery': {
    id: 'data-recovery',
    slug: 'data-recovery',
    h1: (area, place) =>
      area === 'va' ? { lead: 'Data recovery near ', place: 'Tysons, VA & DC' } : { lead: 'Data recovery in ', place },
    metaDescription: (area) =>
      `Hard drive, SSD, RAID and NAS data recovery. ${where(area)}. ${facts}`,
    symptomsH: 'What we recover from',
    symptomsP: 'Hard drives, SSDs, RAID arrays, NAS boxes and servers.',
    symptoms: [
      { icon: 'drive', title: 'Hard drive failed', text: 'Clicking, grinding, not spinning or not detected. Physical faults are handled in our clean room.' },
      { icon: 'chip', title: 'SSD not detected', text: 'The SSD vanished from your computer or shows the wrong size.', device: DEVICE_VALUES.ssd, symptom: 'Not detected' },
      { icon: 'server', title: 'RAID or NAS down', text: 'Failed rebuild, several failed drives or a NAS that won’t mount.', device: DEVICE_VALUES.raid },
      { icon: 'power', title: 'Computer won’t boot', text: 'Files recovered from drives in computers that no longer start.' },
      { icon: 'trash', title: 'Deleted or formatted', text: 'Files deleted or a drive formatted by mistake.', symptom: 'Deleted files' },
      { icon: 'bolt', title: 'Water or power damage', text: 'Electronic and physical damage after a spill, flood, surge or outage.', symptom: 'Water or power damage' },
    ],
    brands: HDD_BRANDS,
  },
  ssd: {
    id: 'ssd',
    slug: 'ssd-recovery',
    h1: (_area, place) => ({ lead: 'SSD & NVMe data recovery in ', place }),
    heroQuestion: 'SSD not detected, showing the wrong size or dead after an update?',
    metaDescription: (area) =>
      `SSD or NVMe not detected, showing 0 MB or dead after an update? ${where(area)}. ${facts}`,
    symptomsH: 'SSD failures we recover from',
    symptomsP: 'SATA and NVMe SSDs, external SSDs and laptop drives.',
    symptoms: [
      { icon: 'monitorX', title: 'SSD not detected', text: 'The SSD has disappeared from your computer or BIOS.', device: DEVICE_VALUES.ssd, symptom: 'Not detected' },
      { icon: 'chip', title: 'Shows 0 MB or the wrong size', text: 'A common sign of a firmware fault.', device: DEVICE_VALUES.ssd },
      { icon: 'refresh', title: 'Died after an update or power loss', text: 'The SSD stopped working after a firmware update, crash or outage.', device: DEVICE_VALUES.ssd },
      { icon: 'power', title: 'Laptop won’t boot', text: 'The laptop starts but can’t find the SSD, or won’t start at all.', device: DEVICE_VALUES.ssd },
      { icon: 'drive', title: 'External SSD stopped working', text: 'A portable SSD that no longer shows up or won’t open your files.', device: DEVICE_VALUES.ssd },
      { icon: 'trash', title: 'Deleted files on an SSD', text: 'Files deleted by mistake from an internal or external SSD.', device: DEVICE_VALUES.ssd, symptom: 'Deleted files' },
    ],
    brands: ['Samsung', 'Crucial', 'WD', 'Kingston', 'Intel'],
    device: DEVICE_VALUES.ssd,
  },
  raid: {
    id: 'raid',
    slug: 'raid-nas-server',
    h1: () => ({ lead: 'RAID, NAS & server data recovery' }),
    metaDescription: () =>
      `RAID, NAS and server data recovery for businesses across the US. Columbia, MD lab, free shipping both ways. ${facts}`,
    symptomsH: 'RAID, NAS and server failures we recover from',
    symptomsP: 'Hardware and software RAID, Synology and QNAP NAS boxes, and servers.',
    symptoms: [
      { icon: 'refresh', title: 'Failed rebuild', text: 'The rebuild stopped part way or the array came back empty.', device: DEVICE_VALUES.raid },
      { icon: 'server', title: 'Two or more drives failed', text: 'More failed drives than the array can survive.', device: DEVICE_VALUES.raid },
      { icon: 'monitorX', title: 'NAS not mounting', text: 'A Synology or QNAP box that won’t mount its volume or shows it as crashed.', device: DEVICE_VALUES.raid },
      { icon: 'alert', title: 'Degraded array', text: 'One member has dropped out of the array.', device: DEVICE_VALUES.raid },
      { icon: 'power', title: 'Server won’t boot', text: 'The server can’t find its boot volume or stops during start-up.', device: DEVICE_VALUES.raid },
      { icon: 'layers', title: 'Virtual machines inaccessible', text: 'VMware or Hyper-V virtual machines won’t start or their disks won’t open.', device: DEVICE_VALUES.raid },
    ],
    brands: null,
    device: DEVICE_VALUES.raid,
  },
};

export const TEMPLATE_BY_SLUG: Record<string, Template> = Object.fromEntries(
  Object.values(TEMPLATES)
    .filter((t) => t.id !== 'raid')
    .map((t) => [t.slug, t]),
);
