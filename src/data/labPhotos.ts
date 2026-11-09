import type { StaticImageData } from 'next/image';
import p1 from '@/../public/lab/p1-lab-clean-hood-technician.webp';
import p2 from '@/../public/lab/p2-lab-imaging-engineers.webp';
import p3 from '@/../public/lab/p3-raid-server-rack.webp';
import p4 from '@/../public/lab/p4-ssd-microscope-bench.webp';
import p5 from '@/../public/lab/p5-ssd-chip-probe.webp';
import p6 from '@/../public/lab/p6-raid-controller-drives.webp';
import p7 from '@/../public/lab/p7-lab-cleaning-oven.webp';
import p8 from '@/../public/lab/p8-hdd-head-swap-tools.webp';
import p9 from '@/../public/lab/p9-nas-units-bench.webp';
import p10 from '@/../public/lab/p10-ssd-nvme-board.webp';
import p11 from '@/../public/lab/p11-intake-case-label.webp';
import p12 from '@/../public/lab/p12-return-drive-packed.webp';
import p13 from '@/../public/lab/p13-lab-aisle-vertical.webp';
import p14 from '@/../public/lab/p14-clean-hood-vertical.webp';
import p15 from '@/../public/lab/p15-nas-server-bench-vertical.webp';
import p16 from '@/../public/lab/p16-lab-wide.webp';
import p17 from '@/../public/lab/p17-raid-12-bay-chassis.webp';
import p18 from '@/../public/lab/p18-donor-drive-shelves.webp';
import p19 from '@/../public/lab/p19-clean-bench-tools.webp';

// Lab photos P1–P19 from the client (lab-photos.zip, 9 Nov 2026), 2000 px masters in /public/lab/.
// `alt`/`caption` are the manifest's (used on the MD pages, homepage and service pages). The VA pages
// never name Columbia next to a photo, so they use `vaAlt`/`vaCaption` where the manifest wording
// names it or says "our lab". P11/P12 drop the manifest's "Step 1:"/"Step 3:" prefix: the steps they
// sit under are numbered differently.

export type LabPhotoCode =
  | 'P1' | 'P2' | 'P3' | 'P4' | 'P5' | 'P6' | 'P7' | 'P8' | 'P9' | 'P10'
  | 'P11' | 'P12' | 'P13' | 'P14' | 'P15' | 'P16' | 'P17' | 'P18' | 'P19';

export type LabPhoto = { src: StaticImageData; alt: string; caption: string; vaAlt?: string; vaCaption?: string };

export const LAB_PHOTOS: Record<LabPhotoCode, LabPhoto> = {
  P1: {
    src: p1,
    alt: 'Technician opening a hard drive at the clean-air hood in the Disk Doctors lab, Columbia, MD',
    vaAlt: 'Technician opening a hard drive at a clean-air hood',
    caption: 'At the clean-air hood',
  },
  P2: {
    src: p2,
    alt: 'Two engineers imaging failed drives sector by sector at the Disk Doctors lab',
    vaAlt: 'Two engineers imaging failed drives sector by sector',
    caption: 'Imaging a failed drive',
  },
  P3: { src: p3, alt: 'Technician pulling a drive from a server rack for RAID recovery', caption: 'Server and RAID intake' },
  P4: { src: p4, alt: 'Engineer at a microscope bench working on a drive circuit board', caption: 'Board-level work under the microscope' },
  P5: { src: p5, alt: 'Probe fixture reading a memory chip during SSD recovery', caption: 'Chip-level SSD work' },
  P6: { src: p6, alt: 'RAID controller connected to the member drives of a failed array', caption: 'Rebuilding a RAID image' },
  P7: { src: p7, alt: 'Ultrasonic cleaner and drying oven used for physically damaged drive boards', caption: 'Cleaning damaged boards' },
  P8: { src: p8, alt: 'Open hard drive in a fixture beside head-swap combs at the clean hood', caption: 'Head-swap tools for a clicking drive' },
  P9: { src: p9, alt: 'Synology, QNAP and Buffalo NAS units on the bench with their drives labelled by slot', caption: 'NAS units in for recovery' },
  P10: { src: p10, alt: 'Engineer testing an M.2 NVMe SSD on the bench', caption: 'Testing an NVMe SSD' },
  P11: { src: p11, alt: 'Drive being logged in with a case label at intake', caption: 'Every drive gets a case number' },
  P12: { src: p12, alt: 'Recovered data on a new external drive, packed for return', caption: 'Your data comes back on a new drive' },
  P13: {
    src: p13,
    alt: 'Engineer at a microscope in the Disk Doctors lab, with donor drive shelves alongside',
    vaAlt: 'Engineer at a microscope bench, with donor drive shelves alongside',
    caption: 'Inside the lab',
    vaCaption: 'At the microscope bench',
  },
  P14: { src: p14, alt: 'Technician in a clean suit working inside an open hard drive at the clean hood', caption: 'Opened only at the clean hood' },
  P15: { src: p15, alt: 'NAS units and a rack server on the bench, drives numbered in slot order, imaging screens above', caption: 'RAID, NAS and server bench' },
  P16: {
    src: p16,
    alt: 'The Disk Doctors lab: clean hoods along the wall, engineers at microscope benches',
    vaAlt: 'Clean hoods along the wall and engineers at microscope benches',
    caption: 'Our lab in Columbia, MD',
    vaCaption: 'Clean hoods and microscope benches',
  },
  P17: { src: p17, alt: '12-bay storage chassis with every drive labelled by slot number', caption: 'Every drive labelled by slot' },
  P18: { src: p18, alt: 'Shelves of donor drives in anti-static bags next to the board-repair bench', caption: 'Donor drives on hand' },
  P19: { src: p19, alt: 'Open hard drive and precision tools laid out at the clean bench', caption: 'The clean bench' },
};

/** Alt text and caption for a photo; `va` = the VA-page wording (no Columbia, no "our lab"). */
export function photoText(code: LabPhotoCode, va = false) {
  const p = LAB_PHOTOS[code];
  return { alt: (va && p.vaAlt) || p.alt, caption: (va && p.vaCaption) || p.caption };
}
