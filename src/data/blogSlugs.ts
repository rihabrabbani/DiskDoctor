// Blog posts whose slugs ended in "-2" with no twin, renamed per the P2 blog cleanup.
// Old URLs 301 to the new ones (next.config.ts). Until the slug is also renamed in MongoDB,
// a request for the new slug falls back to the record stored under the old one.
export const blogSlugRenames: Record<string, string> = {
  'cloud-data-recovery-solutions-for-lost-files-2': 'cloud-data-recovery-solutions-for-lost-files',
  'data-loss-prevention-best-practices-for-maryland-residents-2': 'data-loss-prevention-best-practices-for-maryland-residents',
  'data-recovery-for-maryland-residents-common-scenarios-soluti-2': 'data-recovery-for-maryland-residents-common-scenarios-solutions',
  'data-recovery-myths-what-you-need-to-know-in-2023-2': 'data-recovery-myths-what-you-need-to-know',
  'emergency-data-recovery-for-power-surge-damage-2': 'emergency-data-recovery-for-power-surge-damage',
  'hard-drive-clicking-causes-and-recovery-solutions-2': 'hard-drive-clicking-causes-and-recovery-solutions',
  'understanding-data-recovery-options-for-business-continuity-2': 'understanding-data-recovery-options-for-business-continuity',
};

export const currentBlogSlug = (slug: string) => blogSlugRenames[slug] ?? slug;

export const legacyBlogSlug = (slug: string) =>
  Object.keys(blogSlugRenames).find((oldSlug) => blogSlugRenames[oldSlug] === slug);

// Matching service page for hard drive, SSD, RAID, NAS and server posts, picked from the title, tags and
// focus keyword. Phone, SD card and other posts get no box.
const serviceMatches: { pattern: RegExp; href: string; label: string; description: string }[] = [
  { pattern: /\braid\b/, href: '/services/raid-recovery', label: 'RAID data recovery', description: 'Failed rebuilds, dead members and controller failures, recovered from clones in our Columbia, MD lab.' },
  { pattern: /\bnas\b|synology|qnap|truenas/, href: '/services/nas-recovery', label: 'NAS data recovery', description: 'Crashed volumes and failed rebuilds on Synology, QNAP and TrueNAS units.' },
  { pattern: /\bssd\b|nvme|solid[- ]state/, href: '/services/ssd-recovery', label: 'SSD and NVMe data recovery', description: 'Failed, locked and undetected SATA and NVMe SSDs.' },
  { pattern: /\bservers?\b|virtual machine|vmware|hyper-v|business continuity/, href: '/services/server-recovery', label: 'Server and virtual machine recovery', description: 'Business servers, RAID arrays and VMware or Hyper-V virtual machines.' },
  { pattern: /hard drive|hdd|clicking|external drive|power surge/, href: '/services/hard-drive-recovery', label: 'Hard drive data recovery', description: 'Clicking, beeping, undetected and dropped drives, in our ISO 9001 certified clean-room lab.' },
];

export function relatedServiceForPost(post: { title?: string; tags?: string[]; focusKeyword?: string; category?: string }) {
  const haystack = [post.title, post.focusKeyword, post.category, ...(post.tags || [])].join(' ').toLowerCase();
  if (/\bsd card|\bphone|mobile|iphone|android|usb stick/.test(haystack)) return null;
  const match = serviceMatches.find((service) => service.pattern.test(haystack));
  return match ? { href: match.href, label: match.label, description: match.description } : null;
}
