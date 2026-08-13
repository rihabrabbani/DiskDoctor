export interface RecoveryService {
  id: string;
  icon: string;
  title: string;
  description: string;
  href: string;
}

const defaultIcon =
  "M4 6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6z";

export const recoveryServices: RecoveryService[] = [
  { id: "windows-recovery", icon: "M20 6a2 2 0 002-2V2a2 2 0 00-2-2H4a2 2 0 00-2 2v2a2 2 0 002 2h16zm-2 4H6v6h12V10z", title: "Windows Recovery", description: "Corrupted NTFS volumes, failed boots, and ransomware-damaged Windows disks.", href: "/services/windows-recovery" },
  { id: "mac-recovery", icon: defaultIcon, title: "Mac Recovery", description: "APFS and HFS+ recovery from MacBook, iMac, and Fusion Drive failures.", href: "/services/mac-recovery" },
  { id: "linux-recovery", icon: defaultIcon, title: "Linux Recovery", description: "ext4, XFS, and LVM volume recovery for workstations and servers.", href: "/services/linux-recovery" },
  { id: "unix-recovery", icon: defaultIcon, title: "UNIX Recovery", description: "UFS and ZFS recovery for UNIX and legacy enterprise systems.", href: "/services/unix-recovery" },
  { id: "photo-recovery", icon: defaultIcon, title: "Photo Recovery", description: "Memory cards, cameras, and corrupted photo libraries.", href: "/services/photo-recovery" },
  { id: "mobile-recovery", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", title: "Mobile Recovery", description: "iPhone and Android chip-level recovery after water, board, or lock-screen failure.", href: "/services/mobile-recovery" },
  { id: "file-recovery", icon: defaultIcon, title: "File Recovery", description: "Deleted documents, databases, and formatted volumes.", href: "/services/file-recovery" },
  { id: "raid-recovery", icon: "M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2zM3 16a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2z", title: "RAID & Server Recovery", description: "RAID 0/1/5/6/10 reconstruction when a rebuild would destroy the remaining disks.", href: "/services/raid-recovery" },
  { id: "virtual-recovery", icon: defaultIcon, title: "Virtual Recovery", description: "VMware, Hyper-V, and virtual disk recovery.", href: "/services/virtual-recovery" },
  { id: "remote-recovery", icon: defaultIcon, title: "Remote Recovery", description: "Logical recovery over a secure session when the hardware still spins.", href: "/services/remote-recovery" },
  { id: "data-security", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", title: "Data Security", description: "Secure handling, destruction, and chain of custody for sensitive media.", href: "/services/data-security" },
  { id: "email-security", icon: defaultIcon, title: "Email Security", description: "Exchange, PST, and mailbox recovery with confidentiality controls.", href: "/services/email-security" },
  { id: "data-backup", icon: defaultIcon, title: "Data Backup", description: "Backup design after a recovery so the next failure is not an emergency.", href: "/services/data-backup" },
  { id: "email-recovery", icon: defaultIcon, title: "Email Recovery", description: "PST/OST, Exchange, and corrupted mail stores.", href: "/services/email-recovery" },
  { id: "data-cloning", icon: defaultIcon, title: "Data Cloning", description: "Forensic imaging and sector clones before any repair attempt.", href: "/services/data-cloning" },
  { id: "data-duplication", icon: defaultIcon, title: "Data Duplication", description: "Verified copies of recovered sets onto encrypted delivery drives.", href: "/services/data-duplication" }
];

export interface RecoveryStep {
  step: string;
  image: string;
  title: string;
  description: string;
  color: string;
}

export const recoverySteps: RecoveryStep[] = [
  {
    step: "01",
    image: "https://images.unsplash.com/photo-1563207153-f403bf289096?auto=format&fit=crop&w=800&q=80",
    title: "Free Evaluation",
    description: "Drop off or ship the device. We diagnose at no charge and quote before work starts.",
    color: "var(--color-primary)"
  },
  {
    step: "02",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
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
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=800&q=80",
    title: "Secure Delivery",
    description: "Recovered files go to new media. You pay only if we recover the data you need.",
    color: "var(--color-accent-400)"
  }
];
