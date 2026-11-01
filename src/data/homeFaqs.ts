// Visible on the homepage and used verbatim for the FAQPage JSON-LD, so keep the two in sync by editing here only.
export const homeFaqs: { question: string; answer: string; link?: { href: string; label: string } }[] = [
  {
    question: 'How much does data recovery cost?',
    answer:
      "The evaluation is free. After we diagnose the device you get a fixed quote before any paid work, and if we can't recover the data you need, you don't pay the recovery fee. Cost depends on the device, the type of failure and how urgent the job is.",
    link: { href: '/data-recovery-cost', label: 'What affects the cost' },
  },
  {
    question: 'How long does it take?',
    answer:
      'Logical recoveries usually finish in 24–48 hours. Physical jobs (clicking drives, RAID with failed members) usually take 3–7 days. Emergency service is available 24/7.',
  },
  {
    question: 'Do you offer pickup or shipping?',
    answer:
      "Yes. Shipping your drive to us and back is free. If you'd rather not ship it, we offer pickup and drop-off for a small fee, and on-site diagnostics for a small fee. Call us or fill in the form to arrange it.",
    link: { href: '/mail-in-data-recovery', label: 'How mail-in works' },
  },
  {
    question: 'Can you recover a RAID or server?',
    answer:
      "Yes. RAID 0, 1, 5, 6 and 10, NAS units, and Windows, Linux and virtual servers. Don't rebuild a degraded array or run repair tools before calling us.",
    link: { href: '/services/raid-recovery', label: 'RAID recovery' },
  },
  {
    question: 'Where are you located?',
    answer:
      'Our ISO 9001 certified recovery lab is in Columbia, MD. Our Tysons, VA office sees clients by appointment.',
  },
  {
    question: 'Is my data kept confidential?',
    answer:
      "Recovered files are returned on new media. We don't keep copies longer than needed to confirm delivery, and businesses can request written chain-of-custody.",
  },
];
