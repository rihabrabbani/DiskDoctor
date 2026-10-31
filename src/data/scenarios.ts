// Example scenarios from spec P1-7. They are NOT client jobs: every block that shows one must carry
// SCENARIO_LABEL, must not add outcomes (percentages, TB recovered, turnaround) or client descriptions,
// and must never be marked up as Review or AggregateRating. Replace with real cases when the client supplies them.

export const SCENARIO_LABEL = 'Example scenario based on the kinds of failures we see. Not an individual client result.';
export const SCENARIOS_LABEL = 'Example scenarios based on the kinds of failures we see. Not individual client results.';

export type ScenarioId = 'S1' | 'S2' | 'S3' | 'S4' | 'S5';

export interface Scenario {
  id: ScenarioId;
  title: string;
  situation: string;
  howWeHandleIt: string;
  lesson: string;
  links: { href: string; label: string }[];
}

export const scenarios: Record<ScenarioId, Scenario> = {
  S1: {
    id: 'S1',
    title: 'Synology RAID 5: the rebuild that took the volume down',
    situation:
      'A 4-bay Synology NAS in RAID 5 starts beeping: one disk has failed and a second is reporting bad sectors. Someone swaps the failed disk and starts a rebuild. The heavy read load pushes the weak second disk over the edge mid-rebuild, and the whole volume crashes.',
    howWeHandleIt:
      'We take all four disks out, image each one sector by sector with hardware imagers (working around the damaged areas of the weak disk), rebuild the RAID 5 stripe order virtually from the images, then repair the Btrfs file system. The original disks are never written to.',
    lesson: 'Never force a rebuild while a second disk is showing errors. Power down and call.',
    links: [
      { href: '/services/raid-recovery', label: 'RAID recovery' },
      { href: '/services/nas-recovery', label: 'NAS recovery' },
    ],
  },
  S2: {
    id: 'S2',
    title: 'QNAP RAID 6 after a power surge',
    situation:
      'After a power outage and surge, an 8-bay RAID 6 NAS won’t mount. Two disks are dead and a third is clicking, which is one failure more than RAID 6 can survive. Moving the disks into a spare enclosure brings up an “initialise” warning.',
    howWeHandleIt:
      'We diagnose each disk. Surge-damaged circuit boards get a donor board with the drive’s own firmware chip transferred over. A clicking disk gets a head replacement in the clean room. Then we image all eight disks and rebuild the RAID 6 array virtually.',
    lesson:
      'Never move NAS disks to another enclosure after a power event. An “initialise” prompt can overwrite the array’s metadata.',
    links: [
      { href: '/services/raid-recovery', label: 'RAID recovery' },
      { href: '/services/nas-recovery', label: 'NAS recovery' },
    ],
  },
  S3: {
    id: 'S3',
    title: 'Dell server running VMware: a failed RAID 10 mirror',
    situation:
      'Both drives in one mirrored pair of a RAID 10 array fail, one quietly days before the other. Forcing a drive back online in the RAID controller BIOS corrupts the VMware datastore, and the virtual machines disappear.',
    howWeHandleIt:
      'We connect every SAS drive to write-blocked equipment and image the failing drive in several targeted passes. Then we rebuild the RAID 10 mirrors virtually, repair the VMFS datastore, and extract the virtual machine (.VMDK) files, including SQL databases, for verification.',
    lesson:
      'Forcing an offline drive back online through the controller can overwrite good data with stale data. Image first.',
    links: [
      { href: '/services/server-recovery', label: 'Server recovery' },
      { href: '/services/raid-recovery', label: 'RAID recovery' },
    ],
  },
  S4: {
    id: 'S4',
    title: 'NVMe SSD shows “0 MB”',
    situation:
      'A workstation crashes mid-render and its NVMe SSD disappears from the BIOS. In another machine or a USB enclosure it shows as “0 MB, uninitialised”.',
    howWeHandleIt:
      'This is usually the SSD’s controller or its firmware translation tables, not the memory chips. We connect the drive to dedicated SSD recovery hardware in a mode that stops background TRIM and garbage collection, stabilise the firmware, rebuild the translation layer, and read the data out.',
    lesson:
      'Don’t keep plugging in or rebooting a failing SSD. Background routines can permanently erase recoverable data.',
    links: [{ href: '/services/ssd-recovery', label: 'SSD & NVMe recovery' }],
  },
  S5: {
    id: 'S5',
    title: 'Dropped external drive, clicking',
    situation:
      'A portable drive falls off a desk. Plugged back in, it clicks, spins down and never appears. Running Disk Utility First Aid makes the clicking worse.',
    howWeHandleIt:
      'A drop usually damages the read/write heads. In the clean room we open the drive, check the platters, replace the head assembly with a matched donor, and image the data with a hardware imager. For drives with built-in USB encryption, that includes reading through the drive’s own board.',
    lesson:
      'If a dropped drive clicks, unplug it immediately. Every second it spins with damaged heads can scrape data off the platters.',
    links: [{ href: '/services/hard-drive-recovery', label: 'Hard drive recovery' }],
  },
};
