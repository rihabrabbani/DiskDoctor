import type { CorePage } from './types';

export const serverRecovery: CorePage = {
  id: 'server-recovery',
  path: '/services/server-recovery',
  navLabel: 'Business & virtual servers',
  listTitle: 'Business & virtual servers',
  listDescription: 'VMware, Hyper-V, Linux and Windows servers',
  seoTitle: 'Server Data Recovery | Windows, Linux & VMware Servers | DiskDoctor',
  seoDescription:
    'Recovery for failed business servers: RAID arrays, VMware and Hyper-V virtual machines, Windows and Linux servers. 24/7 emergency line, chain-of-custody on request.',
  h1: 'Server and virtual machine data recovery',
  heroEyebrow: 'Business server recovery',
  heroIntro:
    'When a file server, database host or VMware datastore goes down, what you do in the first hour matters. Power it down, don’t rebuild, and call our 24/7 emergency line at (410) 937-7332.',
  heroImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
  sections: [
    {
      heading: 'Who this is for',
      paragraphs: [
        'This page covers server data recovery for organizations whose work stops when one box stops. Usually that is a rack or tower server with a RAID card, running Windows Server, Linux, or a hypervisor with several virtual machines on top. Sometimes it is an older machine nobody has touched in years until it fails.',
        'You don’t need a large IT department to use us. Business data recovery starts with a phone call from whoever is on hand, an office manager or an outside IT contractor. We have done this work since 1991, and the lab is ISO 9001 certified.',
      ],
      bullets: [
        'Offices running a shared file server, accounting database or domain controller.',
        'Medical practices with imaging, records or practice-management data on a local server.',
        'Legal firms with document management systems and case files on a RAID volume.',
        'Contractors and engineering firms with plans, CAD files and job archives on a NAS or server.',
        'IT providers who look after any of the above and need a lab for enterprise data recovery.',
      ],
    },
    {
      heading: 'Common server failures, and what to do first',
      paragraphs: [
        'RAID controller failure. The card dies, loses its configuration, or marks healthy disks as foreign after a firmware update or power event. The data is usually still on the members. The risk is someone importing, initializing or rebuilding the set to get it back online. Dell PERC, HP Smart Array, LSI/Broadcom and Adaptec cards store their metadata differently, but the first step is the same: clone every member, then map stripe size, disk order and parity position from the clones. Guessing the layout on live disks adds writes.',
        'VMDK and VHDX corruption. A VMware datastore or Hyper-V volume goes missing, or a single virtual machine won’t boot. Snapshot chains break, thin disks run out of space, or a LUN disappears after a failover. We assemble the array from clones first, then check the virtual disks, then the filesystems inside them. A volume that mounts but is missing its VMs is not a finished job.',
        'Filesystem damage. ReFS, NTFS, ext4 and XFS volumes can fail after a crash, a bad shutdown or a repair attempt. Running a repair tool on the original disks writes to them. We work on images instead, and verify the filesystem on the assembled image rather than by booting the original controller. Linux software RAID and Windows Storage Spaces get the same treatment.',
        'Ransomware. We don’t decrypt ransomware and we won’t promise that anyone can. What we can do is examine the disks for data the attack did not reach, such as older or unencrypted copies. Results depend on how far the encryption got and how long the system kept running. Disconnect the server from the network, but don’t wipe or reinstall it.',
        'What to do and not do in the first hour:',
      ],
      bullets: [
        'Do power the server down and leave it off.',
        'Do label every disk with its bay number, or photograph the bays before you pull anything.',
        'Do send every member, including disks the controller marked failed. Parity lives across the set.',
        'Don’t start a rebuild, and stop one that is running. A rebuild is the heaviest read a weak disk will ever do.',
        'Don’t run chkdsk, fsck or any repair tool on a member disk or a degraded volume.',
        'Don’t present the disks to a new controller, NAS or SAN. A new controller may initialize them as unused capacity.',
        'Don’t restore a backup onto the original disks. Restore to different hardware.',
      ],
    },
    {
      heading: 'On-site diagnostics',
      paragraphs: [
        'On-site diagnostics are available. Call us for details or to arrange a visit.',
        'Recovery itself is done in our Columbia, MD lab.',
      ],
    },
    {
      heading: 'Chain-of-custody and confidentiality',
      paragraphs: [
        'Servers hold payroll, patient records, client files and contracts. We treat them that way. Medical and legal clients, and anyone else who needs it, can request a written chain-of-custody record when the disks come in.',
      ],
      bullets: [
        'Written chain-of-custody on request, from intake to return.',
        'Recovered files are returned on new media.',
        'We don’t keep copies of your data longer than needed to confirm delivery.',
        'We only clone and read the disks. We don’t write to your originals.',
      ],
    },
    {
      heading: '24/7 priority handling',
      paragraphs: [
        'A down server is a business outage. Call the 24/7 emergency line at (410) 937-7332 and tell us the RAID level if you know it, how many disks, which bays failed, whether a rebuild started, and whether the server held virtual machines. Form enquiries get a reply within one business day.',
        'Bring the disks to our Columbia lab at 10015 Old Columbia Rd, Suite B 215, Columbia, MD 21046, weekdays 8:30 a.m. to 5:00 p.m. You can also ship the disks to us free both ways. Pickup is available too; call or use the form for details.',
        'Once all disks arrive, RAID and physical jobs usually take 3–7 days. The evaluation is free. You get a fixed quote before any paid work, and if we can’t recover the data you need, you don’t pay the recovery fee. Over 15,000 cases recovered, with a 95% success rate.',
      ],
      link: { href: '/data-recovery-cost', label: 'What affects the cost' },
    },
  ],
  reviewIds: ['R1', 'R6'],
  scenarioIds: ['S3'],
  faqs: [
    {
      question: 'Can you recover a VMware datastore or a single virtual machine?',
      answer:
        'Often, yes. We clone the disks, rebuild the RAID in software, then recover the VMFS datastore or Hyper-V volume and check each VMDK or VHDX. Don’t install a hypervisor on the broken disks to test them.',
    },
    {
      question: 'Our RAID controller died. What should we do now?',
      answer:
        'Power the server down, label the disks by bay, and don’t import or initialize them on a replacement controller. Send us every member disk, including the ones marked failed.',
    },
    {
      question: 'Do you provide chain-of-custody for medical or legal data?',
      answer:
        'Yes, written chain-of-custody is available on request. Recovered files are returned on new media, and we don’t keep copies longer than needed to confirm delivery.',
    },
    {
      question: 'Do you come on-site?',
      answer:
        'On-site diagnostics are available. Call us for details or to arrange a visit. The recovery itself is done in our Columbia, MD lab.',
    },
    {
      question: 'How fast can you recover a business server?',
      answer:
        'RAID and physical jobs usually take 3–7 days after all disks arrive. For an urgent outage, call our 24/7 emergency line at (410) 937-7332 rather than using the form.',
    },
  ],
  relatedLinks: [
    { href: '/services/raid-recovery', label: 'RAID recovery' },
    { href: '/services/virtual-recovery', label: 'Virtual machine recovery' },
    { href: '/services/nas-recovery', label: 'NAS recovery' },
    { href: '/data-recovery-cost', label: 'What affects the cost' },
  ],
};
