export interface CaseStudy {
  id: number;
  src: string;
  alt: string;
  category: string;
  title: string;
  summary: string;
  href: string;
}

export const caseStudies: CaseStudy[] = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
    alt: "Hard drive data recovery process",
    category: "HARD DRIVE RECOVERY",
    title: "Critical Business Data Recovered from Failed Enterprise Drive",
    summary: "A Columbia-area firm lost access to accounting and client files after a 4TB enterprise drive started clicking. We imaged the platters in a cleanroom and restored the working file set without a rebuild attempt on the original disk.",
    href: "/services/windows-recovery"
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    alt: "RAID server recovery",
    category: "RAID RECOVERY",
    title: "Complete RAID 5 Array Restoration for Healthcare Provider",
    summary: "Two disks in a RAID 5 dropped during a rebuild. We cloned every member, reconstructed the stripe in software, and returned patient-record volumes. Do not rebuild a degraded array — that is how the second disk dies.",
    href: "/services/raid-recovery"
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1720048169387-84bbb8fd8ec9?q=80&w=2070&auto=format&fit=crop&w=800&q=80",
    alt: "SSD data recovery",
    category: "SSD RECOVERY",
    title: "Advanced SSD Recovery Using Specialized Firmware Tools",
    summary: "A NVMe SSD that vanished from the BIOS needed controller-level work, not desktop undelete software. We recovered the user partition after stabilizing firmware and reading NAND directly.",
    href: "/services/file-recovery"
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1533749047139-189de3cf06d3?auto=format&fit=crop&w=800&q=80",
    alt: "Mobile device recovery",
    category: "MOBILE RECOVERY",
    title: "Emergency Recovery of Legal Evidence from Water-Damaged Phone",
    summary: "A water-damaged iPhone held photos needed for a case. Chip-level extraction recovered the camera roll after the board would no longer boot. Stop charging a wet phone; bring it in as-is.",
    href: "/services/mobile-recovery"
  }
];
