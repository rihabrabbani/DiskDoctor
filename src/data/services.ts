export interface RecoveryService {
  id: string;
  icon: string;
  title: string;
  description: string;
  href: string; // Add href to match existing routes
}

export const recoveryServices: RecoveryService[] = [
  {
    id: "windows-recovery",
    icon: "M20 6a2 2 0 002-2V2a2 2 0 00-2-2H4a2 2 0 00-2 2v2a2 2 0 002 2h16zm-2 4H6v6h12V10z",
    title: "Windows Recovery",
    description: "Professional recovery from Windows systems including corrupted files, system crashes, and malware damage.",
    href: "/services/windows-recovery"
  },
  {
    id: "raid-recovery",
    icon: "M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2zM3 16a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2z",
    title: "RAID & Server Recovery",
    description: "Expert recovery from all RAID configurations and enterprise storage systems with 24/7 support.",
    href: "/services/raid-recovery"
  },
  {
    id: "data-security",
    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
    title: "Data Security",
    description: "Comprehensive data protection with encryption, secure destruction, and compliance management.",
    href: "/services/data-security"
  },
  {
    id: "mobile-recovery",
    icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
    title: "Mobile Recovery",
    description: "Professional smartphone and tablet data recovery with chip-level repair and forensic techniques.",
    href: "/services/mobile-recovery"
  }
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
    description: "Send us your device for a comprehensive diagnostic assessment at no cost.",
    color: "var(--color-primary)"
  },
  {
    step: "02", 
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    title: "Expert Analysis",
    description: "Our certified technicians analyze your device in our ISO Class 100 cleanroom.",
    color: "var(--color-accent)"
  },
  {
    step: "03",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80", 
    title: "Data Recovery",
    description: "Advanced tools and proprietary techniques recover your valuable data safely.",
    color: "var(--color-primary-400)"
  },
  {
    step: "04",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=800&q=80",
    title: "Secure Delivery",
    description: "Your recovered data is securely transferred to new media and delivered to you.",
    color: "var(--color-accent-400)"
  }
];
