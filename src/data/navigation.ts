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
  // Operating Systems
  { label: 'Windows Recovery', href: '/services/windows-recovery', category: 'Operating Systems' },
  { label: 'Mac Recovery', href: '/services/mac-recovery', category: 'Operating Systems' },
  { label: 'Linux Recovery', href: '/services/linux-recovery', category: 'Operating Systems' },
  { label: 'UNIX Recovery', href: '/services/unix-recovery', category: 'Operating Systems' },
  
  // Devices & Media
  { label: 'Photo Recovery', href: '/services/photo-recovery', category: 'Media & Devices' },
  { label: 'Mobile Recovery', href: '/services/mobile-recovery', category: 'Media & Devices' },
  { label: 'File Recovery', href: '/services/file-recovery', category: 'Media & Devices' },
  
  // Enterprise Solutions
  { label: 'RAID Recovery', href: '/services/raid-recovery', category: 'Enterprise' },
  { label: 'Virtual Recovery', href: '/services/virtual-recovery', category: 'Enterprise' },
  { label: 'Remote Recovery', href: '/services/remote-recovery', category: 'Enterprise' },
  
  // Security & Backup
  { label: 'Data Security', href: '/services/data-security', category: 'Security & Backup' },
  { label: 'Email Security', href: '/services/email-security', category: 'Security & Backup' },
  { label: 'Data Backup', href: '/services/data-backup', category: 'Security & Backup' },
  
  // Specialized Services
  { label: 'Email Recovery', href: '/services/email-recovery', category: 'Specialized' },
  { label: 'Data Cloning', href: '/services/data-cloning', category: 'Specialized' },
  { label: 'Data Duplication', href: '/services/data-duplication', category: 'Specialized' }
];

// Main navigation items (only existing pages)
export const mainNavItems = [
  { href: "/", label: "HOME" },
  { href: "/#about", label: "ABOUT" },
  { href: "/#contact", label: "CONTACT" }
];

export const footerSections: FooterSection[] = [
  {
    title: 'Popular Services',
    links: [
      { label: 'Windows Recovery', href: '/services/windows-recovery' },
      { label: 'Mac Recovery', href: '/services/mac-recovery' },
      { label: 'Photo Recovery', href: '/services/photo-recovery' },
      { label: 'RAID Recovery', href: '/services/raid-recovery' },
      { label: 'Mobile Recovery', href: '/services/mobile-recovery' },
      { label: 'Data Security', href: '/services/data-security' }
    ]
  },
  {
    title: 'Enterprise Solutions',
    links: [
      { label: 'Virtual Recovery', href: '/services/virtual-recovery' },
      { label: 'Remote Recovery', href: '/services/remote-recovery' },
      { label: 'Email Security', href: '/services/email-security' },
      { label: 'Data Backup', href: '/services/data-backup' },
      { label: 'Data Cloning', href: '/services/data-cloning' },
      { label: 'Linux Recovery', href: '/services/linux-recovery' }
    ]
  },
  {
    title: 'Information',
    links: [
      { label: 'All Services', href: '/#services' },
      { label: 'Recovery Process', href: '/#process' },
      { label: 'Case Studies', href: '/#case-studies' },
      { label: 'About Us', href: '/#about' }
    ]
  },
  {
    title: 'Contact',
    links: [
      { label: '1-800-DISKDOC', href: 'tel:+1-800-DISKDOC' },
      { label: 'Emergency Service', href: '/#emergency' },
      { label: 'Free Evaluation', href: '/#quote' },
      { label: 'Get Support', href: '/#contact' }
    ]
  }
];

export interface SocialLink {
  name: string;
  icon: string;
  href: string;
}

export const socialLinks: SocialLink[] = [
  {
    name: 'Facebook',
    href: '#',
    icon: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z'
  },
  {
    name: 'Twitter',
    href: '#',
    icon: 'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z'
  },
  {
    name: 'LinkedIn',
    href: '#',
    icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'
  },
  {
    name: 'YouTube',
    href: '#',
    icon: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z'
  }
];
