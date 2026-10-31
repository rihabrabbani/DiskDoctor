import type { CorePage } from './types';

export const ssdRecovery: CorePage = {
  id: 'ssd-recovery',
  path: '/services/ssd-recovery',
  navLabel: 'SSD & NVMe',
  listTitle: 'SSD & NVMe recovery',
  listDescription: 'Failed, locked or undetected SSDs and NVMe drives',
  seoTitle: 'SSD & NVMe Data Recovery | Failed and Undetected SSDs | DiskDoctor',
  seoDescription:
    'Recovery from failed, locked and undetected SATA and NVMe SSDs, including laptop SSDs. Free evaluation, fixed quote, no data no charge.',
  h1: 'SSD and NVMe data recovery',
  heroEyebrow: 'SSD data recovery',
  heroIntro:
    'We recover data from failed, locked and undetected SATA and NVMe SSDs, including laptop SSDs. Power the drive down, then get a free evaluation and a fixed quote before any paid work.',
  heroImage:
    'https://images.unsplash.com/photo-1720048169387-84bbb8fd8ec9?q=80&w=2070&auto=format&fit=crop&w=800&q=80',
  sections: [
    {
      heading: 'Why SSD recovery is different',
      paragraphs: [
        'SSD data recovery is not hard drive recovery with a faster disk. There are no heads or platters. Your files sit in NAND flash chips, and a controller decides where every block lives. The map that ties your files to physical locations is managed by the controller’s firmware. When the controller or firmware fails, the NAND can be intact and the drive still shows nothing.',
        'Three things make SSD recovery and NVMe recovery harder than most people expect:',
      ],
      bullets: [
        'Controller and firmware failures. The most common SSD fault is not worn-out flash. It’s a controller that hangs, firmware that drops the drive into a safe mode, or a block map damaged by a sudden power loss. Desktop recovery software can’t fix any of that, because it needs the drive to answer first.',
        'TRIM. When you delete files or format an SSD, the operating system tells the drive those blocks are free. The controller then erases them in the background. Once that happens, there is nothing left to read.',
        'Encryption. Many SSDs encrypt everything they store with a key held by the controller, whether you turned encryption on or not. BitLocker, FileVault and similar tools add another layer on top. Recovery has to work through both.',
      ],
    },
    {
      heading: 'Signs your SSD has failed',
      paragraphs: [
        'Most SSDs don’t give much warning. They work one day and act strangely the next. Common symptoms:',
      ],
      bullets: [
        'Not detected. The drive is missing from the BIOS, Disk Management or Disk Utility, or the computer boots to “no bootable device.”',
        'Wrong capacity. The SSD shows up as a tiny size, 0 bytes, or under a generic name instead of its model number. That usually means the firmware has dropped into a safe mode.',
        'Read-only. You can see files but can’t save anything, or every write fails. Some SSDs lock themselves read-only when they detect a fault.',
        'Locked. The drive asks for a password you never set, or reports a security lock.',
        'Slow or freezing. Copies stall, the system hangs when the drive is accessed, or files open as zeros or garbage.',
      ],
    },
    {
      heading: 'What not to do with a failing SSD',
      paragraphs: [
        'An SSD that is powered on can still be changing. The controller runs garbage collection and TRIM in the background, and a failing controller can get worse each time it starts. The best move is usually to stop.',
      ],
      bullets: [
        'Don’t keep it powered. Shut the computer down or unplug the enclosure. Don’t leave it running overnight to see if it comes back.',
        'Don’t keep power-cycling it. Each restart is another chance for a weak controller to fail completely.',
        'Don’t format, initialize or repartition it. Windows and macOS will offer to when they see an unreadable drive. Click Cancel.',
        'Don’t reinstall the operating system or restore a backup onto it. Both send TRIM commands across the drive.',
        'Don’t run TRIM, “optimize” or retrim tools, and don’t run chkdsk or First Aid on it.',
        'Don’t update the firmware. An update can overwrite the state we need to read the drive.',
        'Don’t run recovery software on a drive that isn’t detected properly. It can’t help, and it keeps the drive powered.',
      ],
    },
    {
      heading: 'Honest limits of SSD recovery',
      paragraphs: [
        'We would rather tell you this now than after the evaluation. Some SSD data can’t be recovered by anyone.',
      ],
      bullets: [
        'TRIMmed data is usually gone. If files were deleted or the drive was formatted while TRIM was active, the controller has likely erased those blocks. We check every case, and sometimes the erase hasn’t finished, but often there is nothing left to read.',
        'Hardware-encrypted data may be unrecoverable. If the controller holds the encryption key and the controller can’t be brought back, the data on the NAND stays encrypted. Reading the chips directly then returns data nobody can use.',
        'We can’t unlock encryption without your key. For BitLocker, FileVault or a drive password, we need your password or recovery key. We don’t break encryption, and we won’t pretend we can.',
        'Physically destroyed flash is a hard limit. Cracked or burned NAND chips can take the data with them.',
      ],
    },
    {
      heading: 'Our SSD data recovery process',
      paragraphs: [
        'Our SSD data recovery services follow the same order on every drive, whether it’s a SATA SSD, an M.2 NVMe drive or the SSD inside a laptop. All recovery work happens at our ISO 9001 certified lab in Columbia, MD, where we have been recovering data since 1991. The evaluation is free, you get a fixed quote before any paid work, and if we can’t recover the files you need, you don’t pay the recovery fee. No data, no charge.',
      ],
      bullets: [
        'Free evaluation. Tell us what happened and get the drive to us. We check the controller, the firmware state and the condition of the NAND.',
        'Diagnosis and fixed quote. You get a plain explanation of the fault and a fixed quote before any paid work. You decide whether to go ahead.',
        'Stabilize and image. We get the controller or firmware into a state where it answers, or read the NAND directly when the controller can’t be used. We make a full image of the drive and stop working on the original.',
        'Recover from the image. File systems are rebuilt and files are extracted from that copy, not from your SSD.',
        'Verified delivery. We check that the files you care about open, then deliver them on new media.',
      ],
      closing: [
        'Logical jobs usually take 24–48 hours. Physical jobs usually take 3–7 days. If it can’t wait, call our 24/7 emergency line at (410) 937-7332. Form enquiries get a reply within one business day. Walk in at the Columbia lab, use free pickup and drop-off across the Northeast (call or use the form to arrange it), or call us to arrange shipping.',
      ],
      link: { href: '/data-recovery-cost', label: 'What affects the cost' },
    },
  ],
  casesHeading: 'An SSD recovery case',
  cases: [
    {
      title: 'NVMe SSD that vanished from the BIOS',
      details: [
        { label: 'Drive', value: 'NVMe SSD' },
        { label: 'Symptom', value: 'Not visible in the BIOS' },
        { label: 'Work', value: 'Firmware stabilized, NAND read directly' },
        { label: 'Result', value: 'User partition recovered' },
      ],
      body: 'An NVMe SSD had disappeared from the BIOS. This was a job for controller-level work, not desktop undelete software. We stabilized the firmware, read the NAND directly, and recovered the user partition.',
    },
  ],
  faqs: [
    {
      question: 'Can you recover data from an SSD that isn’t detected?',
      answer:
        'Often, yes. An SSD that is missing from the BIOS usually has a controller or firmware fault, and the data can still be on the NAND chips. Power it down and send it in for a free evaluation.',
    },
    {
      question: 'Does TRIM mean my deleted files are gone?',
      answer:
        'Often, yes. With TRIM active, an SSD erases deleted or formatted blocks in the background, and erased flash can’t be read back. Stop using the drive now, and the free evaluation will show what is left.',
    },
    {
      question: 'Can you recover an encrypted or BitLocker SSD?',
      answer:
        'Yes, if the drive can be read and you have the password or recovery key. We can’t unlock encryption without your key. If the SSD’s built-in hardware encryption key was lost with a dead controller, the data may be unrecoverable.',
    },
    {
      question: 'How much does SSD data recovery cost?',
      answer:
        'Evaluation is free, and you get a fixed quote before any paid work. The price depends on the fault and what it takes to fix it. No data, no charge.',
    },
    {
      question: 'How long does SSD recovery take?',
      answer:
        'Logical jobs usually take 24–48 hours, and physical jobs usually take 3–7 days. For an emergency, call our 24/7 line at (410) 937-7332.',
    },
  ],
  relatedLinks: [
    { href: '/services/hard-drive-recovery', label: 'Hard drive recovery' },
    { href: '/services/raid-recovery', label: 'RAID recovery' },
    { href: '/services/windows-recovery', label: 'Laptop & desktop recovery' },
    { href: '/data-recovery-cost', label: 'What affects the cost' },
  ],
};
