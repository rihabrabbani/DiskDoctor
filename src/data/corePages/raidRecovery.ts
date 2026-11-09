import { LAB_PHOTOS } from '@/data/labPhotos';
import type { CorePage } from './types';

export const raidRecovery: CorePage = {
  id: 'raid-recovery',
  path: '/services/raid-recovery',
  navLabel: 'RAID & server',
  listTitle: 'RAID & server recovery',
  listDescription: 'RAID 0/1/5/6/10, failed rebuilds, controller failures',
  seoTitle: 'RAID Data Recovery | RAID 0, 1, 5, 6, 10 & Failed Rebuilds | DiskDoctor',
  seoDescription:
    'RAID 0, 1, 5, 6 and 10 recovery after failed rebuilds, dead disks and controller failures. Free evaluation, no data no charge. 24/7: (410) 937-7332.',
  h1: 'RAID data recovery',
  heroEyebrow: 'Failed rebuilds, dead members, controller failures',
  heroIntro:
    'Power the array down and don’t rebuild it. We clone every member in our Columbia, MD lab and reconstruct RAID 0, 1, 5, 6 and 10 from the clones.',
  heroImage: LAB_PHOTOS.P17.src,
  heroImageAlt: LAB_PHOTOS.P17.alt,
  heroPhotoNote: true,
  labPhoto: 'P16',
  sections: [
    {
      heading: 'Rebuild versus recovery',
      paragraphs: [
        'RAID recovery is not “run the vendor rebuild.” A rebuild reads every remaining disk hard and writes a new member. If a second disk is already weak — the usual reason the first one died — the rebuild is what kills the array.',
        'A rebuild is a write operation the controller performs to regenerate a missing member. Recovery is a read operation we perform on clones. If the filesystem is already damaged, a rebuild will not put files back; it will finish destroying them. If you already started a rebuild, stop it and send the members anyway. Partial rebuilds are still often reconstructable.',
      ],
    },
    {
      heading: 'What not to do with a degraded array',
      bullets: [
        'Don’t hot-swap a new disk into a clicking or degraded array.',
        'Don’t run chkdsk, fsck or any repair tool on a member, and don’t initialize disks in Windows.',
        'Don’t let Synology, QNAP or a hardware card “repair” the volume.',
        'Don’t reboot again and again hoping the volume mounts.',
        'Don’t restore a backup over the degraded set.',
        'Don’t install the members in a new NAS “to see if it mounts.” A new enclosure may initialize a foreign set.',
      ],
      paragraphs: [
        'Power the NAS, SAN or RAID card down. Photograph the bays and label the slot order before you pull disks. If you already mixed them, send them anyway and say so. We can often work out the order from clones; it takes longer.',
      ],
    },
    {
      heading: 'Send every disk, including the ones marked failed',
      paragraphs: [
        'Parity and stripe order live across the whole set, so a single “failed” disk is not enough. A clicking member is not the disk you can ignore either. It still holds blocks the other disks do not. RAID 5 with one click plus a second timeout during a rebuild is the classic two-hole stripe.',
        'Controllers also lie about “healthy.” SMART on a RAID member is often hidden or reset by the card. A disk that rebuilt yesterday can be the one that dies tomorrow, because the rebuild was the heaviest read of its life. That is why we clone disks the controller marked failed, not only the ones that still blink green.',
      ],
    },
    {
      heading: 'RAID levels and systems we recover',
      paragraphs: [
        'RAID 0 has no parity. One dead disk means that stripe is gone unless the failed member can still be imaged. RAID 1 is a mirror; we clone both sides because the “healthy” disk is often the next to go. RAID 5 survives one missing member if you do not rebuild onto a dying spare. RAID 6 survives two, until a rebuild stresses the remaining set. RAID 10 is mirrored stripes; two failures in the same mirror is a RAID 0 problem.',
        'Synology SHR, QNAP, Asustor, TrueNAS, Windows Storage Spaces and hardware cards from Adaptec, LSI/Broadcom, Dell PERC and HP Smart Array all have different metadata layouts. The first physical step is the same: clone every member with hardware that can retry gently, then stop.',
      ],
    },
    {
      heading: 'How we recover a RAID',
      bullets: [
        'Free evaluation of every member, including the disks marked failed.',
        'Clone each disk; the originals are never used as working disks.',
        'Map stripe size, rotation and parity position from the clones and assemble the array in software.',
        'Verify the filesystem (NTFS, ReFS, ext4, XFS, APFS or a hypervisor datastore) on the assembled image.',
        'Check virtual disks (VMDK, VHDX) when the array held VMs, then deliver the files on new media.',
      ],
      paragraphs: [
        'A LUN that disappeared after a controller failover is often still on the members. Do not present those disks to a new array as unused capacity. Encrypted volumes can usually be reconstructed, but we need your password or recovery key to unlock them.',
      ],
    },
    {
      heading: 'Getting your array to us',
      paragraphs: [
        'Drop the disks at our Columbia, MD lab (walk-in Mon–Fri, 8:30 a.m.–5:00 p.m.), book an appointment at our Tysons, VA office, or ship the disks to us free both ways. Pickup is also available, call for details. If you ship, pad each disk separately, keep them in slot order in the box, and include the NAS or card only if the layout is proprietary.',
        'Tell us the RAID level if you know it, how many disks, which bays failed and whether a rebuild already started.',
      ],
    },
    {
      heading: 'Cost and turnaround',
      paragraphs: [
        'Evaluation is free. You get a fixed quote before any paid work, and if we can’t recover the files you need, you don’t pay the recovery fee. We don’t publish a dollar menu because a two-disk RAID 1 is not a six-disk RAID 6 with a failed rebuild.',
        'RAID jobs usually take 3–7 days after all members arrive. For emergencies, call our 24/7 line: (410) 937-7332.',
      ],
      link: { href: '/data-recovery-cost', label: 'What affects the cost' },
    },
    {
      heading: 'Why businesses send arrays to our lab',
      bullets: [
        'Recovering data since 1991, with 15,000+ cases and a 95% success rate.',
        'ISO 9001 certified lab with a clean room for physical work on failed members.',
        'Written chain-of-custody on request for medical, legal and enterprise arrays.',
      ],
    },
  ],
  reviewsHeading: 'Recent RAID cases',
  reviewIds: ['R1', 'R2'],
  scenariosHeading: 'RAID failures we handle',
  scenarioIds: ['S1', 'S2', 'S3'],
  faqs: [
    { question: 'Should I rebuild a RAID 5 that lost one disk?', answer: 'No. Power it down and send every member. Rebuilds are how the second disk dies.' },
    { question: 'Can you recover RAID 6 with two failed drives?', answer: 'Often yes, if both failed members can still be imaged. RAID 6 is designed for two missing disks; a rebuild in progress is the risk.' },
    { question: 'Do I need to send all the disks?', answer: 'Yes. Parity and stripe order live across the set. A single “failed” disk is not enough.' },
    { question: 'How long does RAID recovery take?', answer: 'Usually 3–7 days after the members arrive in Columbia. For emergencies, call our 24/7 line: (410) 937-7332.' },
    { question: 'What RAID levels do you recover?', answer: 'RAID 0, 1, 5, 6, 10, and common NAS variants (Synology SHR, QNAP, hardware cards).' },
    { question: 'Can you recover after a failed rebuild?', answer: 'Often. Stop the rebuild and send the members. We clone whatever is left, including the disk that was being written.' },
    { question: 'Is evaluation free?', answer: 'Yes. Fixed quote before work. No data, no charge on the recovery fee if we cannot get the files you need.' },
    { question: 'Where do I bring a RAID in Maryland or Virginia?', answer: 'Drop it off at the Columbia lab, 10015 Old Columbia Rd Suite B 215, or book an appointment at our Tysons office, 8300 Boone Blvd Suite 513.' },
  ],
  relatedLinks: [
    { href: '/services/nas-recovery', label: 'NAS recovery' },
    { href: '/services/server-recovery', label: 'Server & virtual machine recovery' },
    { href: '/services/virtual-recovery', label: 'Virtual recovery' },
    { href: '/services/hard-drive-recovery', label: 'Hard drive recovery' },
  ],
};
