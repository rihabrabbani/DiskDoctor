import { BlogPost } from '@/lib/types';

export const staticBlogPosts: BlogPost[] = [
  {
    id: 'why-is-my-external-hard-drive-clicking',
    slug: 'why-is-my-external-hard-drive-clicking',
    title: 'Why is my external hard drive clicking?',
    excerpt:
      'A clicking external drive is usually a failing head stack. Power it down. Do not run repair software. Here is what the sound means and how Columbia lab recovery works.',
    metaDescription:
      'Clicking external hard drive? Stop using it. The click is often a failed read/write head. Free evaluation at DiskDoctor Columbia MD. No data, no charge.',
    focusKeyword: 'external hard drive clicking',
    author: 'DiskDoctor Team',
    category: 'Data Recovery',
    tags: ['hard drive clicking', 'external drive', 'data recovery'],
    featuredImage: null,
    images: [],
    status: 'published',
    scheduledAt: null,
    readingTime: 7,
    wordCount: 1200,
    createdAt: '2026-08-13T00:00:00.000Z',
    updatedAt: '2026-08-13T00:00:00.000Z',
    keyTakeaways: [
      'Clicking is a mechanical warning, not a software bug.',
      'Power down. Do not run CHKDSK or “repair” apps.',
      'USB enclosures fail too — the disk inside may still be cloneable.',
      'Columbia lab images platters in a cleanroom. Free evaluation.',
    ],
    faqs: [
      {
        question: 'Can I freeze a clicking hard drive?',
        answer: 'No. Condensation and thermal shock make head and platter damage worse. Power it down and bring it in.',
      },
      {
        question: 'Is a clicking drive recoverable?',
        answer: 'Often, if you stop using it. We clone remaining readable surfaces. Every extra spin reduces the odds.',
      },
      {
        question: 'The enclosure is clicking but the computer still sees the disk sometimes.',
        answer: 'Unplug it. Intermittent detection is how remaining sectors get damaged. Remove the disk from a cheap USB bridge only if you know the connector; otherwise bring the whole enclosure.',
      },
    ],
    sections: [
      {
        heading: 'What the click actually is',
        content:
          '<p>On a spinning hard drive, a repeating click is usually the actuator trying to find servo data and failing. The heads park, retry, and park again. That is a mechanical problem. It is not a corrupted USB driver and it is not “the disk needs to be formatted.” Formatting a clicking disk is how you add writes on top of a dying head stack.</p><p>External drives click for the same reason internal ones do: shock, age, stiction, or a weak preamp. The plastic box does not change the physics. Sometimes the click is the USB-SATA bridge dying while the disk is fine — we see that on cheap enclosures. The first rule is still the same: stop powering it.</p>',
      },
      {
        heading: 'What to do in the next five minutes',
        content:
          '<p>Unplug the drive. Do not reopen Disk Utility, Windows Repair, or a “data recovery” app that wants to scan for hours. Those tools read the disk hard. A lab clones it with hardware that can retry gently and then stop.</p><p>If the files matter, bring the enclosure to the <a href="/columbia-md">Columbia, MD lab</a> or ship it padded in a box, not a bubble mailer. Call <a href="tel:+14109377332">(410) 937-7332</a>. Evaluation is free. You get a quote before paid work. No data, no charge on the recovery fee if we cannot get the files you need.</p>',
      },
      {
        heading: 'Why DIY scans fail on clickers',
        content:
          '<p>Desktop undelete software assumes the drive still seeks. A clicking head does not. The software keeps issuing reads; the drive keeps slamming. People then say “recovery software made it worse,” which is accurate. The correct first copy is a sector image, often after a head swap in a cleanroom if the original heads cannot read.</p><p>Related: <a href="/services/file-recovery">file recovery</a> for logical damage on healthy disks, and <a href="/services/windows-recovery">Windows recovery</a> when the volume is corrupt but the mechanics are quiet.</p>',
      },
      {
        heading: 'External drive vs the disk inside',
        content:
          '<p>Many “dead” USB drives are a failed board on the enclosure. The 2.5" or 3.5" disk inside still IDs on a native SATA port. Do not pry it out if you are unsure of the adapter — some proprietary bridges will not speak SATA after removal. Bring the whole unit. We will decide whether to clone in-place or pull the disk.</p>',
      },
      {
        heading: 'Click of death vs a dying USB bridge',
        content:
          '<p>A mechanical click repeats at a fairly steady interval while the drive tries to calibrate. A dying USB-SATA bridge often sounds like a single tick when you plug it in, then silence, then the computer shows “USB device not recognized.” Those are different jobs. The first needs a clone, sometimes after a head swap. The second may be a $20 board and a healthy disk. You cannot tell from the plastic box. Unplug either way.</p><p>Western Digital, Seagate, Toshiba, and “store brand” enclosures all use the same physics. A 2.5" laptop disk in a USB sleeve clicks for the same reason a 3.5" desktop disk clicks. Age, drop, and heat are the usual causes. Running the disk on a pillow or in a hot closet does not help.</p>',
      },
      {
        heading: 'What Columbia actually does with a clicker',
        content:
          '<p>We attempt a clone with hardware that can limit retries. If the heads cannot read, open-drive work in the lab is the next step — not a Windows format. You get a list of what came back and a quote before paid reconstruction. Evaluation is free. No data, no charge on the recovery fee if we cannot get the files you named.</p><p>Related reading: <a href="/services/raid-recovery">RAID recovery</a> if the clicking disk is a NAS member, and <a href="/columbia-md">the Columbia lab page</a> for drop-off hours. Call <a href="tel:+14109377332">(410) 937-7332</a>.</p>',
      },
      {
        heading: 'When the files are probably gone',
        content:
          '<p>If you already formatted the clicking disk, ran a three-hour “repair” app, and then copied new video onto it, the original files are often overwritten. We still image what is left. Be honest about those steps so the quote matches reality. A lab cannot un-write new data.</p>',
      },
      {
        heading: 'A short checklist before you leave the house',
        content:
          '<p>Unplug the enclosure. Do not pack it next to a speaker magnet on purpose, but also do not wrap it in foil. A rigid box with crumpled paper on all sides is enough. Write the symptoms on a note: click, not detected, dropped, ran CHKDSK, yes or no. Drop at <a href="/columbia-md">Columbia</a> or ship. Call <a href="tel:+14109377332">(410) 937-7332</a> if the files are time-critical.</p><p>If the clicking disk is one member of a NAS, stop and read <a href="/blog/raid-5-failed-two-drives">RAID 5 with two drives down</a> before you let the NAS repair itself. A click plus a rebuild is how the second disk dies.</p>',
      },
    ],
  },
  {
    id: 'raid-5-failed-two-drives',
    slug: 'raid-5-failed-two-drives',
    title: 'RAID 5 failed with two drives down — what now?',
    excerpt:
      'Two dead disks in RAID 5 is past the redundancy the array was sold on. Stop the rebuild. Send every member. Here is why a rebuild is the expensive step.',
    metaDescription:
      'RAID 5 with two failed drives: power down, do not rebuild, send every disk. DiskDoctor Columbia reconstructs from clones. Free evaluation.',
    focusKeyword: 'RAID 5 two drives failed',
    author: 'DiskDoctor Team',
    category: 'RAID Recovery',
    tags: ['RAID 5', 'RAID recovery', 'NAS'],
    featuredImage: null,
    images: [],
    status: 'published',
    scheduledAt: null,
    readingTime: 8,
    wordCount: 1250,
    createdAt: '2026-08-13T00:00:00.000Z',
    updatedAt: '2026-08-13T00:00:00.000Z',
    keyTakeaways: [
      'RAID 5 survives one missing disk, not two — unless both failed members can still be imaged.',
      'A rebuild is a write. Recovery is a read of clones.',
      'Send every member, including disks the controller marked failed.',
      'Columbia lab reconstructs RAID 0/1/5/6/10 in software.',
    ],
    faqs: [
      {
        question: 'Can RAID 5 be recovered with two failed drives?',
        answer: 'Often, if both “failed” disks still have readable sectors. We clone all members and reconstruct. A finished rebuild on dying disks is worse.',
      },
      {
        question: 'Should I start a rebuild with a new disk?',
        answer: 'No. Rebuilds stress the remaining set. That is how the second disk dies. Power down and send the array.',
      },
      {
        question: 'Do you need the NAS or just the disks?',
        answer: 'The disks, labeled by slot. The enclosure helps if the layout is proprietary, but members are the data.',
      },
    ],
    sections: [
      {
        heading: 'Why the second disk dies during the rebuild',
        content:
          '<p>RAID 5 stripes data and parity. One missing member can be calculated from the others. When that member fails, the remaining disks are already the oldest, hottest, or from the same batch. A rebuild reads every block on those remaining disks to write a new spare. If a second disk is weak, the rebuild is the load that takes it out. You then have two holes in the stripe and a controller that is still writing.</p><p>That is why “the NAS said rebuild, so we clicked OK” is the most expensive sentence in this lab. Read the <a href="/services/raid-recovery">RAID recovery</a> page before you let Synology, QNAP, or a hardware card finish the job.</p>',
      },
      {
        heading: 'What to do tonight',
        content:
          '<p>Power the NAS or RAID card down. Do not initialize disks in Windows. Do not run vendor “repair.” Photograph the slot order. Bring every disk to <a href="/columbia-md">Columbia</a> or schedule Tysons. Call <a href="tel:+14109377332">(410) 937-7332</a>.</p><p>We clone each member, including the ones marked failed, then reconstruct RAID 5 (and 6, 10, 0, 1) in software. Evaluation is free. Fixed quote before paid work. No data, no charge on the recovery fee if we cannot get the files you need.</p>',
      },
      {
        heading: 'RAID 6 is not a free pass',
        content:
          '<p>RAID 6 can lose two disks by design. People still start rebuilds that kill a third. Same rule: clone first. If you already started a rebuild, stop it and send the members anyway. Partial writes are often still recoverable from the clones.</p>',
      },
      {
        heading: 'Virtual disks sitting on the array',
        content:
          '<p>VMDK and VHDX files come back after the RAID is reconstructed, not by installing ESXi on the broken members. Tell us if the array held VMs so we verify those files, not just a mountable NTFS volume.</p>',
      },
      {
        heading: 'RAID 5 vs RAID 6 vs RAID 10 when two disks are down',
        content:
          '<p>RAID 5 is designed for one missing member. Two down means you need readable sectors from both “failed” disks, or you have holes in every stripe. RAID 6 is designed for two missing members — until a rebuild writes a third. RAID 10 can survive two failures only if they are in different mirrors. Two failures in the same mirror is RAID 0. People mix these up because the NAS UI said “degraded” for all of them.</p><p>Send every member regardless of level. We will tell you which layout you actually had after we see the clones. Do not buy a new NAS and initialize the old disks in it while you wait.</p>',
      },
      {
        heading: 'Synology, QNAP, and hardware cards',
        content:
          '<p>SHR and RAID 5 on Synology still stripe data and parity. A “repair” in DSM is a rebuild. QNAP’s storage manager does the same. An LSI or PERC card that says “foreign configuration” is asking you to write metadata. Stop. Photograph the slots. Bring the disks to <a href="/columbia-md">Columbia</a>. Read <a href="/services/raid-recovery">RAID recovery</a> before you click OK.</p>',
      },
      {
        heading: 'What “no data, no charge” means on RAID',
        content:
          '<p>Evaluation is free. If we cannot reconstruct the files you named from the clones, you do not pay a recovery fee. Shipping and return media are separate. A two-disk RAID 1 is not priced like a six-disk RAID 6 with a half-finished rebuild. You get a fixed quote before paid work. Call <a href="tel:+14109377332">(410) 937-7332</a>.</p>',
      },
      {
        heading: 'A 20-minute intake that does not make it worse',
        content:
          '<p>Power down. Photograph the bays. Pull the members only if you can do it without forcing trays. Pad each disk. Write the RAID level if you know it, and whether a rebuild already started. Drop at Columbia or schedule Tysons. Do not buy a replacement NAS and initialize the old disks in it while you wait.</p><p>If the array held VMs, say so on the <a href="/contact">evaluation form</a>. We check VMDK and VHDX after the RAID is assembled, not by installing a hypervisor on the broken members.</p>',
      },
    ],
  },
];

export function getStaticBlog(identifier: string) {
  return (
    staticBlogPosts.find((b) => b.slug === identifier || b.id === identifier) || null
  );
}
