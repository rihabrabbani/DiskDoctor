import type { CorePage } from './types';

export const dataRecoveryCost: CorePage = {
  id: 'data-recovery-cost',
  path: '/data-recovery-cost',
  navLabel: 'Cost',
  listTitle: 'Data recovery cost',
  listDescription: 'How the free evaluation and fixed quote work',
  seoTitle: 'How Much Does Data Recovery Cost? | Free Evaluation | Disk Doctors',
  seoDescription:
    'What drives the cost of hard drive, SSD and RAID recovery, how our free evaluation and fixed quote work, and why there is no charge if we recover nothing.',
  h1: 'How much does data recovery cost?',
  heroEyebrow: 'Free evaluation. Fixed quote.',
  heroIntro:
    'Data recovery cost depends on what failed and what it takes to get your files back. We evaluate your device for free, give you a fixed quote before any paid work, and if we can’t recover the data you need, you don’t pay the recovery fee.',
  heroImage: 'https://images.unsplash.com/photo-1563207153-f403bf289096?auto=format&fit=crop&w=1200&q=80',
  sections: [
    {
      heading: 'The short answer',
      paragraphs: [
        'How much does data recovery cost? There is no single price. The cost depends on what failed, what kind of device it is, and how much work it takes to get your files back. So we look first and quote second.',
        'Here’s how it works. The evaluation is free. Once we know what’s wrong, you get a fixed quote before any paid work starts. If you decline, you owe nothing for the evaluation. If you approve and we can’t recover the data you need, you don’t pay the recovery fee. No data, no charge.',
        'That’s why this page has no price list. A deleted folder on a healthy laptop drive is not a six-disk RAID 6 with a failed rebuild. A menu that treats them the same is a guess. A fixed quote after an evaluation is not.',
      ],
    },
    {
      heading: 'What changes the cost of data recovery',
      paragraphs: [
        'Hard drive recovery cost, SSD recovery cost and RAID recovery cost all come down to the same handful of factors. Here’s what each one means in plain words.',
      ],
      bullets: [
        'Logical or physical failure. A logical failure means the hardware works but the data is hard to reach: deleted files, a formatted partition, a corrupted file system. A physical failure means the device itself is damaged: a clicking hard drive, a dead circuit board, an SSD that no longer shows up. Physical work takes more time, more tools and sometimes parts.',
        'Device type. A hard drive, an SSD or NVMe drive, a RAID array, a NAS and a server each need different work. A hard drive has moving parts. An SSD stores data in flash chips run by a controller, so a failed controller is a different problem from a failed motor. RAID and NAS jobs mean rebuilding the layout of the array before we can reach a single file.',
        'Number of disks. We clone every disk in an array before we do anything else. A two-disk mirror is less work than an eight-disk RAID 6. More disks means more imaging time and more reconstruction.',
        'Parts. A clicking drive usually has failed read/write heads. Fixing that means finding a matching donor drive and swapping the heads in our clean room. How easy the right donor is to find affects the quote.',
        'Urgency. Emergency handling is available when you need your data back as fast as possible. Urgency is one of the factors in the quote, and you’ll know it before you approve.',
        'What already happened to the device. Repeated power-ons, recovery software or a started rebuild can add damage. More damage means more work.',
      ],
    },
    {
      heading: 'Which jobs usually cost more',
      paragraphs: [
        'We don’t publish prices, because the same symptom can be a quick logical fix or a clean-room job. This is how jobs usually compare.',
      ],
      table: {
        columns: ['Job', 'Usually', 'Why'],
        rows: [
          ['Deleted files or a formatted drive that still works', 'Lowest', 'No hardware repair; we work on a clone of the drive'],
          ['Hard drive that’s slow or has bad sectors', 'Low to middle', 'Careful imaging around weak areas'],
          ['SSD or NVMe that no longer shows up', 'Middle to higher', 'The controller or firmware has to be repaired first'],
          ['Clicking or dead hard drive', 'Higher', 'Clean-room head swap with a matching donor drive'],
          ['RAID, NAS or server with failed disks', 'Highest; grows with the number of disks', 'Every disk is cloned, then the array is rebuilt in software'],
          ['Emergency handling', 'Adds to any of the above', 'Work is scheduled ahead of the queue'],
        ],
      },
      closing: [
        'You get a fixed quote after the free evaluation, before any paid work. If we can’t recover the data you need, you don’t pay the recovery fee.',
      ],
    },
    {
      heading: 'How the quote works',
      paragraphs: [
        'The steps are the same whether you bring in one laptop drive or a full server. Turnaround depends on the failure. Logical jobs usually take 24–48 hours. Physical jobs, like clicking drives or RAID arrays with failed members, usually take 3–7 days.',
      ],
      bullets: [
        'You contact us. Fill in the form or call. Form enquiries get a reply within one business day.',
        'Free evaluation. The device comes to our recovery lab in Columbia, MD, where all recovery work happens. We find out what failed and what it will take to get your data back.',
        'Fixed quote. You get a fixed quote based on what we found, before any paid work starts.',
        'You approve or decline. Approve and we start. Decline and that’s the end of it. The evaluation was free.',
        'Recovery. We do the work in the lab, in our clean room for drives that need to be opened.',
        'You pay only if we recover the data you need. If we can’t get the files that matter to you, there’s no recovery fee.',
      ],
    },
    {
      heading: 'Why cheap DIY can cost you the data',
      paragraphs: [
        'When you don’t know the quote yet, it’s tempting to try a free fix first. Sometimes that’s fine. Often it’s the most expensive thing you can do, because it costs you the data.',
        'Each extra write or spin-up can turn a recoverable job into a harder one, or an impossible one. A harder job takes longer and costs more. An impossible one costs you the data. If the drive is clicking, grinding or not showing up, or your array is degraded, power it down and call us before you try anything else. These are the usual mistakes:',
      ],
      bullets: [
        'Powering it on again and again. A failing drive gets weaker every time it spins up. Damaged heads can scratch the platters, and then there may be nothing left to read.',
        'Running recovery software on a clicking drive. Software reads every sector, hard, for hours. On a drive with failing heads, that is the worst workload you can give it.',
        'Letting a RAID rebuild. A rebuild reads every remaining disk and writes a new one. If a second disk is weak, the rebuild is what takes the array down.',
        'Running chkdsk or a repair tool. These write to the disk to “fix” the file system. On a damaged volume they can overwrite the very records we need to find your files.',
        'Installing software on the same drive. It can land on top of the deleted files you want back.',
      ],
    },
    {
      heading: 'Getting started',
      paragraphs: [
        'Use the form on this page or call our 24/7 emergency line, (410) 937-7332.',
        'The more you tell us up front, the faster we can evaluate the device and quote. Here’s what helps:',
      ],
      bullets: [
        'The device. Hard drive, SSD, RAID, NAS or server, and the make or model if you know it. For an array, the number of disks and the RAID level.',
        'Symptoms. Clicking, not detected, very slow, a deleted folder, a failed rebuild.',
        'What you’ve already tried. Software, a rebuild, chkdsk, another shop. It changes how we approach the job, so be honest.',
        'How urgent it is, and which files matter most.',
      ],
      closing: [
        'Shipping to our lab and back is free. Pickup is also available: call or use the form for details. You can also walk in to the Columbia lab at 10015 Old Columbia Rd, Suite B 215, Columbia, MD 21046, Monday to Friday, 8:30 a.m. to 5:00 p.m.',
        'DiskDoctor has been recovering data since 1991, with 15,000+ cases recovered, a 95% success rate and ISO 9001 certification. The evaluation is free, and you see a fixed quote before you commit to anything.',
      ],
      link: { href: '/contact', label: 'Request a free evaluation' },
    },
  ],
  faqs: [
    {
      question: 'What is the average cost of data recovery?',
      answer:
        'There’s no honest average across all jobs. Recovering deleted files from a working drive costs far less than a clean-room repair or a multi-disk RAID. That’s why we evaluate for free and give a fixed quote for your device before any paid work.',
    },
    {
      question: 'How much does hard drive data recovery cost?',
      answer:
        'It depends on whether the drive works or is physically damaged. A working drive with deleted files is at the low end. A clicking or dead drive needs a clean-room head swap and costs more. You get a fixed quote after the free evaluation.',
      link: { href: '/services/hard-drive-recovery', label: 'Hard drive recovery' },
    },
    {
      question: 'How much does SSD data recovery cost?',
      answer:
        'If the SSD still shows up, recovery is usually simpler. If it no longer shows up or reports the wrong size, the controller or firmware has to be repaired first, which takes more work. The free evaluation tells us which it is.',
      link: { href: '/services/ssd-recovery', label: 'SSD recovery' },
    },
    {
      question: 'How much does RAID data recovery cost?',
      answer:
        'RAID cost grows with the number of disks and how far a rebuild got. We clone every disk, then rebuild the array from the clones. Tell us the RAID level and number of disks and we can describe the work before you ship.',
      link: { href: '/services/raid-recovery', label: 'RAID recovery' },
    },
    {
      question: 'Is the evaluation really free?',
      answer:
        'Yes. We evaluate your device at no charge and give you a fixed quote before any paid work. If you decline the quote, you owe nothing for the evaluation.',
    },
    {
      question: 'Do I pay if you can’t recover my files?',
      answer:
        'No. If we can’t recover the data you need, you don’t pay the recovery fee. No data, no charge.',
    },
    {
      question: 'Why can’t you give a price over the phone?',
      answer:
        'The cost depends on what failed inside the device, and that isn’t known until it’s evaluated in the lab. A clicking drive may need donor heads, and a RAID may have a second weak disk. A fixed quote after a free evaluation is more honest than a phone guess that changes later.',
    },
    {
      question: 'Does emergency service cost more?',
      answer:
        'Urgency is one of the factors in the quote. Tell us your deadline when you contact us, and the fixed quote will reflect the handling you need before you approve anything.',
    },
    {
      question: 'Is it cheaper to try recovery software first?',
      answer:
        'For a healthy drive with accidentally deleted files, software can sometimes work, as long as you install it on a different drive. Never run it on a clicking drive or a degraded RAID. That can turn a recoverable job into a harder or impossible one.',
    },
  ],
  relatedLinks: [
    { href: '/services/hard-drive-recovery', label: 'Hard drive recovery' },
    { href: '/services/ssd-recovery', label: 'SSD & NVMe recovery' },
    { href: '/services/raid-recovery', label: 'RAID recovery' },
    { href: '/services/nas-recovery', label: 'NAS recovery' },
    { href: '/services/server-recovery', label: 'Server recovery' },
  ],
};
