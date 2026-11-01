import type { CorePage } from './types';

// Spec v4 W5. Leave out how the free shipping works (label or reimbursement, carrier, insurance), the
// pickup coverage area and fee amounts until the client confirms them.
export const mailInDataRecovery: CorePage = {
  id: 'mail-in-data-recovery',
  path: '/mail-in-data-recovery',
  navLabel: 'Ship your drive',
  listTitle: 'Mail-in data recovery',
  listDescription: 'Free shipping to our lab and back',
  seoTitle: 'Mail-In Data Recovery | Free Shipping Both Ways | DiskDoctor',
  seoDescription:
    'Ship your failed hard drive, SSD, RAID or NAS to our ISO 9001 certified lab. Shipping both ways is free, the evaluation is free, and there’s no charge if we can’t recover your data.',
  h1: 'Mail-in data recovery with free shipping both ways',
  heroEyebrow: 'Free shipping to our lab and back',
  heroIntro:
    'Send your failed hard drive, SSD, RAID or NAS disks to our ISO 9001 certified lab. Shipping both ways is free, the evaluation is free, and if we can’t recover the data you need, you don’t pay the recovery fee.',
  heroImage: '/images/illustrations/delivery-external-drive.webp',
  heroImageAlt: 'Recovered data delivered on a new external drive in protective packaging',
  sections: [
    {
      heading: 'How mail-in recovery works',
      bullets: [
        'Contact us. Call (410) 937-7332 or fill in the form, and tell us what failed. We’ll tell you how to send it.',
        'Ship the drive. Pack it as described below and send it to the lab. Shipping is free.',
        'Free evaluation and a fixed quote. We diagnose the device at no charge and send you a fixed quote before any paid work starts.',
        'Recovery. Once you approve the quote, we image the device and recover your files from the copy, never from the original.',
        'Your data comes back on new media, shipped back to you free.',
      ],
    },
    {
      heading: 'How to pack a drive',
      bullets: [
        'Put the drive in an anti-static bag if you have one.',
        'Pad it with at least 2 inches of bubble wrap or foam on every side, so it can’t move in the box.',
        'Use a sturdy cardboard box, not a padded envelope.',
        'For a RAID or NAS, send every disk and label each one with its slot number, in order.',
        'Include a note with your name, phone number and what failed.',
      ],
      closing: [
        'Power the device down before you pack it. Don’t run repair tools or start a RAID rebuild first: every extra write can lower the odds of a full recovery.',
      ],
    },
    {
      heading: 'Prefer not to ship it?',
      paragraphs: [
        'We offer pickup and drop-off for a small fee, and on-site diagnostics for a small fee. Call us or use the form to arrange it. You can also walk in to our Columbia, MD lab, Monday to Friday, 8:30 a.m. to 5:00 p.m.',
      ],
    },
    {
      heading: 'Confidentiality',
      paragraphs: [
        'Your data is handled only for the recovery. Recovered files are returned on new media, and businesses can request a written chain-of-custody.',
      ],
    },
  ],
  faqs: [
    {
      question: 'Is shipping really free?',
      answer:
        'Yes. Shipping your drive to our lab and back is free. Call us or fill in the form before you send it, and we’ll tell you how to ship it.',
    },
    {
      question: 'Is it safe to ship a failed drive?',
      answer:
        'Yes, if it’s packed well: an anti-static bag, at least 2 inches of padding on every side and a sturdy box. We image the drive before any recovery work, so the original is never used as a working disk.',
    },
    {
      question: 'How long does it take?',
      answer:
        'Logical recoveries usually take 24–48 hours once the drive arrives. Physical jobs, such as clicking drives or RAID with failed members, usually take 3–7 days. For an emergency, call our 24/7 line at (410) 937-7332.',
    },
    {
      question: 'Do you offer pickup?',
      answer:
        'Yes. If you’d rather not ship it, we offer pickup and drop-off for a small fee, and on-site diagnostics for a small fee. Call us or fill in the form to arrange it.',
    },
  ],
  relatedLinks: [
    { href: '/services/hard-drive-recovery', label: 'Hard drive recovery' },
    { href: '/services/ssd-recovery', label: 'SSD & NVMe recovery' },
    { href: '/services/raid-recovery', label: 'RAID recovery' },
    { href: '/data-recovery-cost', label: 'Data recovery cost' },
  ],
};
