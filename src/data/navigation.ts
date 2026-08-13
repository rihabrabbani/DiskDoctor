export interface FooterSection {
  title: string;
  links: { label: string; href: string }[];
}

export interface ServiceRoute {
  label: string;
  href: string;
  category: string;
}

export const serviceRoutes: ServiceRoute[] = [
  { label: 'Windows Recovery', href: '/services/windows-recovery', category: 'Operating Systems' },
  { label: 'Mac Recovery', href: '/services/mac-recovery', category: 'Operating Systems' },
  { label: 'Linux Recovery', href: '/services/linux-recovery', category: 'Operating Systems' },
  { label: 'UNIX Recovery', href: '/services/unix-recovery', category: 'Operating Systems' },
  { label: 'Photo Recovery', href: '/services/photo-recovery', category: 'Media & Devices' },
  { label: 'Mobile Recovery', href: '/services/mobile-recovery', category: 'Media & Devices' },
  { label: 'File Recovery', href: '/services/file-recovery', category: 'Media & Devices' },
  { label: 'RAID Recovery', href: '/services/raid-recovery', category: 'Enterprise' },
  { label: 'Virtual Recovery', href: '/services/virtual-recovery', category: 'Enterprise' },
  { label: 'Remote Recovery', href: '/services/remote-recovery', category: 'Enterprise' },
  { label: 'Data Security', href: '/services/data-security', category: 'Security & Backup' },
  { label: 'Email Security', href: '/services/email-security', category: 'Security & Backup' },
  { label: 'Data Backup', href: '/services/data-backup', category: 'Security & Backup' },
  { label: 'Email Recovery', href: '/services/email-recovery', category: 'Specialized' },
  { label: 'Data Cloning', href: '/services/data-cloning', category: 'Specialized' },
  { label: 'Data Duplication', href: '/services/data-duplication', category: 'Specialized' }
];

export const mainNavItems = [
  { href: "/", label: "HOME" },
  { href: "/contact", label: "CONTACT" }
];

export const footerSections: FooterSection[] = [
  {
    title: 'Popular Services',
    links: serviceRoutes.slice(0, 6).map((s) => ({ label: s.label, href: s.href }))
  }
];
