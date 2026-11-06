import type { CorePage } from './types';

export const virtualRecovery: CorePage = {
  id: 'virtual-recovery',
  path: '/services/virtual-recovery',
  navLabel: 'Virtual machine recovery',
  listTitle: 'Virtual machine recovery',
  listDescription: 'VMware, Hyper-V and other virtual machines and datastores',
  seoTitle: 'Virtual Machine Data Recovery | VMware & Hyper-V | DiskDoctor',
  seoDescription:
    'Recovery for lost or corrupted VMware and Hyper-V virtual machines, VMDK and VHDX files and datastores. Free evaluation, fixed quote, no data no charge. 24/7: (410) 937-7332.',
  h1: 'Virtual machine data recovery',
  heroEyebrow: 'VMware, Hyper-V and virtual disks',
  heroIntro:
    'A datastore that won’t mount, a VM that won’t boot or a broken snapshot chain. Stop writing to the host, don’t re-create the datastore, and call our 24/7 emergency line at (410) 937-7332.',
  heroImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
  sections: [
    {
      heading: 'What goes wrong with virtual machines',
      paragraphs: [
        'A virtual machine is a set of files on a volume, usually on a RAID array. When something fails, it is often one layer below the VM: the disks, the RAID set, the datastore filesystem, or the virtual disk files themselves. Recovery means working through those layers in order, from images of the physical disks.',
      ],
      bullets: [
        'VMFS datastore missing or showing as unmounted after a power event or a controller fault.',
        'Hyper-V volume or Cluster Shared Volume offline, or a VHDX that won’t attach.',
        'Broken snapshot or checkpoint chains, including delta disks that no longer link to their parent.',
        'Thin-provisioned disks that ran out of space and left the VM corrupted.',
        'VMs deleted by mistake, or a datastore re-created or formatted over the old one.',
        'The RAID array under the host degraded or failed, taking every VM with it.',
      ],
    },
    {
      heading: 'What to do and not do first',
      bullets: [
        'Do power the host down if the datastore sits on failing disks or a degraded array.',
        'Do note the hypervisor version, the datastore names and which VMs matter most.',
        'Do send every disk from the array, labelled with its bay number.',
        'Don’t re-create, format or re-initialize the datastore or volume.',
        'Don’t consolidate or delete snapshots on a damaged chain.',
        'Don’t run chkdsk, fsck or a vendor repair tool inside a damaged VM or on the host volume.',
        'Don’t restore backups onto the original disks. Restore to different storage.',
      ],
    },
    {
      heading: 'How we recover virtual machines',
      paragraphs: [
        'Clone first. Every physical disk is imaged with hardware that retries gently. All later work happens on the images, never on your originals.',
        'Rebuild the storage. If the datastore sat on RAID, we work out disk order, stripe size and parity from the images and assemble the array in software.',
        'Recover the datastore and the virtual disks. We read the VMFS, NTFS or ReFS volume, find the VMDK or VHDX files and their snapshot or checkpoint chains, and repair the links between them where we can.',
        'Check the data inside. A virtual disk that opens is not the end of the job. We check the filesystems and the files that matter to you, such as databases, mail stores and shared folders, before we call it recovered.',
      ],
    },
    {
      heading: 'Chain-of-custody and confidentiality',
      paragraphs: [
        'Virtual servers often hold client records, accounting databases and email. Written chain-of-custody is available on request, from intake to return.',
      ],
      bullets: [
        'Recovered files or virtual disks are returned on new media.',
        'We don’t keep copies of your data longer than needed to confirm delivery.',
        'We only clone and read the disks. We don’t write to your originals.',
      ],
    },
    {
      heading: 'Turnaround, cost and contact',
      paragraphs: [
        'Logical jobs, like a deleted VM or a damaged virtual disk on healthy drives, usually take 24–48 hours. Physical and RAID jobs, like failed disks under the datastore, usually take 3–7 days once all disks arrive.',
        'The evaluation is free. You get a fixed quote before any paid work, and if we can’t recover the data you need, you don’t pay the recovery fee. We have been recovering data since 1991, with 15,000+ cases recovered and a 95% success rate.',
        'Call the 24/7 emergency line at (410) 937-7332, bring the disks to our Columbia lab at 10015 Old Columbia Rd, Suite B 215, Columbia, MD 21046, or ship them to us free both ways. Form enquiries get a reply within one business day.',
      ],
      link: { href: '/data-recovery-cost', label: 'What affects the cost' },
    },
  ],
  scenarioIds: ['S3'],
  faqs: [
    {
      question: 'Can you recover a single virtual machine from a failed datastore?',
      answer:
        'Often, yes. We image the disks, rebuild the array if there is one, then recover the datastore and the virtual disk files for the VMs you need.',
    },
    {
      question: 'Our snapshot chain is broken. Should we consolidate it?',
      answer:
        'No. Consolidating or deleting snapshots on a damaged chain can merge or discard the data you need. Leave the files as they are and call us.',
    },
    {
      question: 'Do you work with VMware and Hyper-V?',
      answer:
        'Yes. We recover VMFS datastores and VMDK files from VMware, and Hyper-V volumes with VHD and VHDX files, on Windows, Linux or RAID storage underneath.',
    },
    {
      question: 'How long does virtual machine recovery take?',
      answer:
        'Logical jobs usually take 24–48 hours. Physical and RAID jobs usually take 3–7 days after all disks arrive. For an urgent outage, call (410) 937-7332, answered 24/7.',
    },
  ],
  relatedLinks: [
    { href: '/services/server-recovery', label: 'Server recovery' },
    { href: '/services/raid-recovery', label: 'RAID recovery' },
    { href: '/services/nas-recovery', label: 'NAS recovery' },
    { href: '/data-recovery-cost', label: 'What affects the cost' },
  ],
};
