export interface RecoveryService {
  id: string;
  icon: string;
  title: string;
  description: string;
  href: string;
}

const driveIcon =
  "M4 6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6z M12 15a3 3 0 100-6 3 3 0 000 6z";
const chipIcon =
  "M9 3v2m6-2v2M9 19v2m6-2v2M3 9h2m-2 6h2m14-6h2m-2 6h2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z";
const stackIcon =
  "M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2zM3 16a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2z";
const nasIcon =
  "M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2zm2 4v10m3.33-10v10m3.34-10v10M17 7v10";
const serverIcon =
  "M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01";
const laptopIcon =
  "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z";

// Homepage "What we recover" grid. Every other service page is listed on /services.
export const recoveryServices: RecoveryService[] = [
  { id: "hard-drive-recovery", icon: driveIcon, title: "Hard drive recovery", description: "Clicking, beeping, not detected, dropped or dead drives", href: "/services/hard-drive-recovery" },
  { id: "ssd-recovery", icon: chipIcon, title: "SSD & NVMe recovery", description: "Failed, locked or undetected SSDs and NVMe drives", href: "/services/ssd-recovery" },
  { id: "raid-recovery", icon: stackIcon, title: "RAID & server recovery", description: "RAID 0/1/5/6/10, failed rebuilds, controller failures", href: "/services/raid-recovery" },
  { id: "nas-recovery", icon: nasIcon, title: "NAS recovery", description: "Synology, QNAP, TrueNAS and other NAS units", href: "/services/nas-recovery" },
  { id: "server-recovery", icon: serverIcon, title: "Business & virtual servers", description: "VMware, Hyper-V, Linux and Windows servers", href: "/services/server-recovery" },
  { id: "windows-recovery", icon: laptopIcon, title: "Laptop & desktop", description: "Windows and Mac machines that won't boot", href: "/services/windows-recovery" }
];

export interface RecoveryStep {
  step: string;
  image: string;
  // Steps 2 and 4 use P1-7 illustration photos, which need the spec's generic alt text.
  alt?: string;
  title: string;
  description: string;
  color: string;
}

export const recoverySteps: RecoveryStep[] = [
  {
    step: "01",
    image: "https://images.unsplash.com/photo-1563207153-f403bf289096?auto=format&fit=crop&w=800&q=80",
    title: "Free Evaluation",
    description: "We diagnose at no charge and quote before work starts. Bring it in, book a free pickup in the Northeast, or call us to arrange shipping.",
    color: "var(--color-primary)"
  },
  {
    step: "02",
    image: "/images/illustrations/hardware-imager.webp",
    alt: "Hard drive connected to a hardware imager for sector-by-sector cloning",
    title: "Lab imaging",
    description: "We clone first. Original media is not used as a working disk.",
    color: "var(--color-accent)"
  },
  {
    step: "03",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    title: "Data Recovery",
    description: "Logical or physical recovery from the clone, including RAID reconstruction when needed.",
    color: "var(--color-primary-400)"
  },
  {
    step: "04",
    image: "/images/illustrations/delivery-external-drive.webp",
    alt: "Recovered data delivered on a new external drive in protective packaging",
    title: "Secure Delivery",
    description: "Recovered files go to new media. You pay only if we recover the data you need.",
    color: "var(--color-accent-400)"
  }
];
