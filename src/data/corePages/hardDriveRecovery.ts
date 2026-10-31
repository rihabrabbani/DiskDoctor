import type { CorePage } from './types';

export const hardDriveRecovery: CorePage = {
  id: 'hard-drive-recovery',
  path: '/services/hard-drive-recovery',
  navLabel: 'Hard drive',
  listTitle: 'Hard drive recovery',
  listDescription: 'Clicking, beeping, not detected, dropped or dead drives',
  seoTitle: 'Hard Drive Data Recovery | Clicking & Dead Drives | DiskDoctor',
  seoDescription:
    'Hard drive recovery for clicking, beeping and undetected drives in our ISO 9001 certified clean-room lab. Free evaluation, no data no charge, 24/7 emergency line.',
  h1: 'Hard drive data recovery',
  heroEyebrow: 'Clicking, dead and undetected drives',
  heroIntro:
    'Hard drive recovery for drives that click, beep, vanish from your computer or stopped working after a fall. We image the drive before any recovery work, give you a fixed quote first, and if we can’t get your data back, you don’t pay.',
  heroImage: '/images/illustrations/hard-drive-open.webp',
  heroImageAlt: 'Inside a hard drive: platters and read/write head assembly',
  sections: [
    {
      heading: 'Hard drive symptoms we handle',
      paragraphs: [
        'Most failed drives fall into a few patterns. The symptom tells us where to start. It also tells you what to stop doing.',
      ],
      bullets: [
        'Clicking or beeping. Usually a head or motor problem. Every power-on can scrape the platters.',
        'Not detected. The drive spins but doesn’t show up in Windows, macOS or BIOS, or it shows the wrong size or model name.',
        'Spins up, then stops. The drive starts, can’t read its own service data, and parks or powers down.',
        'Dropped drive. Common with external and laptop drives. A drop while the drive is running can damage the heads and the platter surface.',
        'Water or fire damage. Corrosion and heat affect the circuit board, heads and platters. Don’t dry it out and test it.',
        'Firmware failure. The drive reports as busy, shows 0 GB or locks up. The data is often intact behind a corrupted firmware module.',
        'Accidental format or deleted partitions. A logical problem: the hardware works, but the file system was overwritten or removed.',
      ],
    },
    {
      heading: 'Stop before you make it worse',
      paragraphs: [
        'What you do in the first hour matters more than anything we do later. A clicking hard drive damages itself every time it spins. Recovery software doesn’t fix that. It makes the drive read every sector, which is the hardest work you can ask of a failing head.',
        'If the files are urgent, call our 24/7 emergency line at (410) 937-7332 before you try anything else.',
      ],
      bullets: [
        'Power it down. Unplug the USB or SATA cable, or shut the computer off.',
        'Don’t open it. Dust on the platters causes new damage. Head and platter work belongs in a clean room.',
        'Don’t freeze it. Condensation forms on the platters as it warms up.',
        'Don’t run recovery software, CHKDSK or Disk Utility on a clicking or slow drive.',
        'Don’t swap in a circuit board from another drive. Modern boards carry data specific to their own drive.',
        'Don’t reformat the drive or reinstall the operating system on it.',
      ],
    },
    {
      heading: 'What we do with your drive',
      paragraphs: [
        'Our hard drive data recovery services follow the same order on every job, whether it’s a deleted folder or a drive with failed heads. We work from a copy, not from the original.',
        'All recovery work happens at our ISO 9001 certified lab in Columbia, MD. We’ve been recovering data since 1991, with 15,000+ cases recovered and a 95% success rate.',
      ],
      bullets: [
        'Diagnosis. We identify the drive, check the board, heads and motor, and work out whether the fault is physical, firmware or logical. The evaluation is free.',
        'Imaging first. Before any recovery work, we make a sector-by-sector image of the original media with hardware that reads gently, skips bad areas and comes back for them later. The original drive does as little work as possible.',
        'Clean-room work. When the heads or platters are damaged, we open the drive in our clean room, replace the head stack where needed and image what can be read.',
        'Recovery from the image. We rebuild the file system and pull your files from the copy. Tell us which folders matter and we check those first.',
        'Verified delivery. We check that the recovered files open, then deliver them to you on new media.',
      ],
    },
    {
      heading: 'Drives we work on',
      paragraphs: [
        'We recover desktop, laptop, external and enterprise hard drives. External hard drive recovery needs extra care. A USB drive is often the only copy of someone’s photos or business files, and some models have the USB port built into the drive’s own board. Don’t pry the case open to pull the drive out.',
        'If the drive came out of a NAS or RAID, bring every disk from the set, not only the one that failed.',
      ],
      bullets: [
        'External drives: WD My Book and Elements, Seagate Backup Plus and Expansion, LaCie.',
        '2.5" and 3.5" SATA drives from laptops, desktops and NAS units.',
        'Enterprise SAS drives from servers and storage arrays.',
      ],
    },
    {
      heading: 'Cost and turnaround',
      paragraphs: [
        'Evaluation is free. Once we’ve looked at the drive, you get a fixed quote before any paid work starts. No data, no charge.',
        'We don’t publish a price list. A deleted folder on a healthy drive and a dropped drive with damaged heads are different jobs, and the quote reflects the actual failure.',
        'Physical jobs, like head replacement or a drive that won’t spin, usually take 3–7 days. Logical jobs, like a formatted drive or deleted partitions, usually take 24–48 hours. Form enquiries get a reply within one business day.',
        'Looking for hard drive recovery near you in Maryland, Virginia or DC? Walk in at our Columbia lab, 10015 Old Columbia Rd, Suite B 215, Columbia, MD 21046, Monday to Friday, 8:30 a.m. to 5:00 p.m. You can also book an appointment at our Tysons, VA office, 8300 Boone Blvd, Suite 513. We offer free pickup and drop-off across the Northeast — call or use the form to arrange it.',
      ],
      link: { href: '/data-recovery-cost', label: 'What affects the cost' },
    },
  ],
  scenarioIds: ['S5'],
  faqs: [
    {
      question: 'Can you recover a clicking hard drive?',
      answer:
        'Often, yes, as long as the platters still have readable areas. A clicking drive usually has a head or motor fault, which we deal with in our clean room before imaging the platters. Power it down now, because every extra spin can cause more damage.',
    },
    {
      question: 'Is it safe to keep powering it on?',
      answer:
        'No. If the drive clicks, beeps or keeps disconnecting, each power-on can scratch the platters and turn a recoverable job into a harder one. Unplug it and leave it off until we’ve looked at it.',
    },
    {
      question: 'How much does hard drive recovery cost?',
      answer:
        'Evaluation is free, and you get a fixed quote before any paid work starts. If we can’t recover the data you need, you don’t pay the recovery fee: no data, no charge.',
    },
    {
      question: 'Do I have to bring it in?',
      answer:
        'No. We offer free pickup and drop-off across the Northeast — call or use the form to arrange it. You can also call us to arrange shipping, or walk in at our Columbia, MD lab Monday to Friday, 8:30 a.m. to 5:00 p.m.',
    },
  ],
  relatedLinks: [
    { href: '/services/ssd-recovery', label: 'SSD & NVMe recovery' },
    { href: '/services/raid-recovery', label: 'RAID recovery' },
    { href: '/services/nas-recovery', label: 'NAS recovery' },
    { href: '/data-recovery-cost', label: 'What affects the cost' },
  ],
};
