import type { AreaId } from './areas';
import type { IconName } from '@/components/lp/LpIcon';
import { DEVICE_VALUES, type DeviceValue } from './form';

export type TemplateId = 'hard-drive' | 'data-recovery' | 'ssd' | 'raid';

export type FaqItem = { q: string; a: string };

export type Template = {
  id: TemplateId;
  /** URL segment under /lp/{area}/ (raid has its own route). */
  slug: string;
  h1: (area: AreaId, place: string) => { lead: string; place?: string };
  metaDescription: (area: AreaId) => string;
  symptomsH: string;
  symptomsP: string;
  symptoms: { icon: IconName; title: string; text: string }[];
  brands: string[] | null;
  urgency: { strong: string; text: string };
  /** Replaces "Should I try recovery software first?" in the shared FAQ. */
  faqFirstAid: FaqItem;
  /** Replaces the opening question of the area's hero subline. */
  heroQuestion?: string;
  /** Pre-selected device; step 1 still shows. */
  device?: DeviceValue;
};

const HDD_BRANDS = ['Western Digital', 'Seagate', 'Toshiba', 'LaCie', 'Samsung', 'HGST', 'G-Technology'];

const HDD_URGENCY = {
  strong: 'Is the drive clicking or beeping? Turn it off.',
  text: 'Every power-on of a failing drive can make recovery harder. Don’t run recovery software on it and don’t open it.',
};

const where = (area: AreaId) =>
  area === 'va'
    ? 'Tysons office by appointment, free shipping to our Columbia, MD lab'
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
      { icon: 'sound', title: 'Clicking or grinding', text: 'Usually a mechanical fault. These recoveries are done in our clean room.' },
      { icon: 'monitorX', title: 'Not detected', text: 'The drive spins or lights up but your computer doesn’t see it.' },
      { icon: 'drop', title: 'Dropped or knocked', text: 'External drives fall off desks. Don’t plug it in again until it’s been checked.' },
      { icon: 'fileAlert', title: '“Needs to be formatted”', text: 'Corrupted partitions and file systems. Don’t click format.' },
      { icon: 'bolt', title: 'Water, fire or power surge', text: 'Electronic and physical damage after an accident or outage.' },
      { icon: 'trash', title: 'Deleted by mistake', text: 'Files or partitions deleted or overwritten. Stop using the drive straight away.' },
    ],
    brands: HDD_BRANDS,
    urgency: HDD_URGENCY,
    faqFirstAid: {
      q: 'Should I try recovery software first?',
      a: 'Not on a clicking, beeping or dropped drive. Software keeps the drive spinning, which can damage it further. Turn it off and talk to us first.',
    },
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
      { icon: 'chip', title: 'SSD not detected', text: 'The SSD vanished from your computer or shows the wrong size.' },
      { icon: 'server', title: 'RAID or NAS down', text: 'Failed rebuild, several failed drives or a NAS that won’t mount.' },
      { icon: 'power', title: 'Computer won’t boot', text: 'Your files are still on the drive. Don’t reinstall the operating system.' },
      { icon: 'trash', title: 'Deleted or formatted', text: 'Files deleted or a drive formatted by mistake. Stop using it straight away.' },
      { icon: 'bolt', title: 'Water or power damage', text: 'Electronic and physical damage after a spill, flood, surge or outage.' },
    ],
    brands: HDD_BRANDS,
    urgency: {
      strong: 'Drive clicking, beeping or not detected? Turn it off.',
      text: 'Every power-on of a failing drive can make recovery harder. Don’t run recovery software on it and don’t open it.',
    },
    faqFirstAid: {
      q: 'Should I try recovery software first?',
      a: 'Not on a drive that clicks, beeps, was dropped or isn’t detected. Software keeps a failing drive running, which can damage it further. Turn it off and talk to us first.',
    },
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
      { icon: 'monitorX', title: 'SSD not detected', text: 'The SSD has disappeared from your computer or BIOS.' },
      { icon: 'chip', title: 'Shows 0 MB or the wrong size', text: 'A common sign of a firmware fault. Don’t initialise or format it.' },
      { icon: 'refresh', title: 'Died after an update or power loss', text: 'The SSD stopped working after a firmware update, crash or outage.' },
      { icon: 'power', title: 'Laptop won’t boot', text: 'The laptop starts but can’t find the SSD, or won’t start at all.' },
      { icon: 'drive', title: 'External SSD stopped working', text: 'A portable SSD that no longer shows up or won’t open your files.' },
      { icon: 'trash', title: 'Deleted files on an SSD', text: 'Turn it off straight away: SSDs can clear deleted data on their own.' },
    ],
    brands: ['Samsung', 'Crucial', 'WD', 'Kingston', 'Intel'],
    urgency: {
      strong: 'SSD not detected or showing the wrong size? Turn it off.',
      text: 'Don’t initialise, format or update it, and don’t run recovery software on it. Talk to the lab first.',
    },
    faqFirstAid: {
      q: 'Should I try recovery software first?',
      a: 'Not on an SSD that isn’t detected or shows the wrong size. Software can’t fix that kind of fault, and keeping the SSD powered on can make recovery harder. Turn it off and talk to us first.',
    },
    device: DEVICE_VALUES.ssd,
  },
  raid: {
    id: 'raid',
    slug: 'raid-nas-server',
    h1: () => ({ lead: 'RAID, NAS & server data recovery' }),
    metaDescription: () =>
      `RAID, NAS and server data recovery for businesses in MD, DC & VA. Columbia, MD lab, free shipping both ways. ${facts}`,
    symptomsH: 'RAID, NAS and server failures we recover from',
    symptomsP: 'Hardware and software RAID, Synology and QNAP NAS boxes, and servers.',
    symptoms: [
      { icon: 'refresh', title: 'Failed rebuild', text: 'The rebuild stopped part way or the array came back empty.' },
      { icon: 'server', title: 'Two or more drives failed', text: 'More failed drives than the array can survive.' },
      { icon: 'monitorX', title: 'NAS not mounting', text: 'A Synology or QNAP box that won’t mount its volume or shows it as crashed.' },
      { icon: 'alert', title: 'Degraded array', text: 'One member has dropped out. Don’t keep working on it.' },
      { icon: 'power', title: 'Server won’t boot', text: 'The server can’t find its boot volume or stops during start-up.' },
      { icon: 'layers', title: 'Virtual machines inaccessible', text: 'VMware or Hyper-V virtual machines won’t start or their disks won’t open.' },
    ],
    brands: null,
    urgency: {
      strong: 'Array degraded or failed? Power it down.',
      text: 'Don’t rebuild or re-initialise a degraded array, and don’t swap in more drives. Talk to the lab first.',
    },
    faqFirstAid: {
      q: 'Should I try a rebuild first?',
      a: 'No. Don’t rebuild or re-initialise a degraded array. A rebuild on a failing member can overwrite the data you need. Power it down and talk to us first.',
    },
    device: DEVICE_VALUES.raid,
  },
};

export const TEMPLATE_BY_SLUG: Record<string, Template> = Object.fromEntries(
  Object.values(TEMPLATES)
    .filter((t) => t.id !== 'raid')
    .map((t) => [t.slug, t]),
);
