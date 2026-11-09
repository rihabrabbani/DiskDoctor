// Per-area copy for the ad landing pages, from the design canvas (Main.dc.html → AREAS).
// Ratings, review counts, avatars and quotes are not here: they come from lp/data/lp-reviews.json.
// Pickup copy follows the client rule: "available, call for details", never a fee.

export type AreaId = 'md' | 'va' | 'all';

export type Area = {
  id: AreaId;
  /** lp-reviews.json location whose rating the page shows. */
  location: 'columbia' | 'tysons';
  office: 'columbia' | 'tysons';
  pill: string;
  phone: string;
  tel: string;
  eyebrow: string;
  place: string;
  heroSub: string;
  talkSuffix: string;
  soonerSuffix: string;
  stateDefault: string;
  step2: string;
  /** Tap-to-call block under the H1: the number plus this note. 24/7 only ever goes with the (410) line. */
  heroCallNote: string;
  officeH: string;
  officeP: string;
  addrName: string;
  addr: string;
  addrHours: string;
  otherOffice: string;
  faqBring: string;
  stickyCallLabel: string;
};

const LAB_PHONE = '(410) 937-7332';
const LAB_TEL = 'tel:+14109377332';

const md: Area = {
  id: 'md',
  location: 'columbia',
  office: 'columbia',
  pill: 'Phone line open 24/7',
  phone: LAB_PHONE,
  tel: LAB_TEL,
  eyebrow: 'Local recovery lab · Columbia, MD',
  place: 'Maryland',
  heroSub:
    'Clicking, not detected, dropped or dead? Our Columbia lab has been recovering data since 1991. The diagnosis is free, and nothing is charged unless you approve the quote and we recover your data.',
  talkSuffix: ', answered 24/7.',
  soonerSuffix: ', 24/7.',
  stateDefault: 'Maryland',
  step2:
    'Walk in to our Columbia lab, or ship it to us: shipping is free both ways. Pickup is also available, call for details.',
  heroCallNote: 'answered 24/7',
  officeH: 'A real lab in Columbia, Maryland',
  officeP:
    'Recoveries are done at our Columbia lab, including physical recoveries in our clean room. We’re ISO 9001 certified and have handled more than 15,000 cases since 1991.',
  addrName: 'Disk Doctors · Columbia lab',
  addr: '10015 Old Columbia Rd, Suite B 215, Columbia, MD 21046',
  addrHours: 'Walk in Mon–Fri, 8:30 a.m.–5:00 p.m. · Phone answered 24/7',
  otherOffice: 'Closer to Northern Virginia? We also have an office in Tysons, VA, by appointment.',
  faqBring:
    'No. Shipping is free both ways, and pickup is also available, call for details. You can also walk in at our Columbia lab, Mon–Fri 8:30–5.',
  stickyCallLabel: 'Call 24/7',
};

// 24/7 wording only ever attaches to the lab line (410), never to the Tysons 571 line.
const va: Area = {
  id: 'va',
  location: 'tysons',
  office: 'tysons',
  pill: 'Tysons office · by appointment',
  phone: '(571) 202-8529',
  tel: 'tel:+15712028529',
  eyebrow: 'Tysons office · Northern Virginia & DC',
  place: 'Northern Virginia & DC',
  heroSub:
    'Clicking, not detected, dropped or dead? Meet us at our Tysons office by appointment, or ship your drive free to our Columbia, MD lab, recovering data since 1991. The diagnosis is free, and nothing is charged unless you approve the quote and we recover your data.',
  talkSuffix: `. Emergency? Our lab line ${LAB_PHONE} is answered 24/7.`,
  soonerSuffix: `, or our 24/7 lab line ${LAB_PHONE}.`,
  stateDefault: 'Virginia',
  step2:
    'Bring it to our Tysons office by appointment, or ship it free both ways to our Columbia lab. Pickup is also available, call for details.',
  heroCallNote: 'Tysons office',
  officeH: 'Our Tysons office, by appointment',
  officeP:
    'Meet us at our Tysons office by appointment: fill in the form or call (571) 202-8529 to set a time. Recoveries are then done at our Columbia, MD lab, including physical recoveries in our clean room. ISO 9001 certified, 15,000+ cases since 1991.',
  addrName: 'Disk Doctors · Tysons office',
  addr: '8300 Boone Blvd, Suite 513, Tysons, VA 22182 (American Center)',
  addrHours: 'By appointment, Mon–Fri · Call (571) 202-8529',
  otherOffice: 'Our lab: 10015 Old Columbia Rd, Suite B 215, Columbia, MD 21046.',
  faqBring:
    'No. Shipping is free both ways, and pickup is also available, call for details. You can also bring it to our Tysons office by appointment.',
  stickyCallLabel: 'Call Tysons',
};

// /lp/raid-nas-server: business page for MD, DC & VA, on the lab line.
const all: Area = {
  ...md,
  id: 'all',
  eyebrow: 'Recovery lab · Columbia, MD · serving MD, DC & VA',
  place: '',
  heroSub:
    'Failed rebuild, degraded array or a NAS that won’t mount? Our Columbia, MD lab has been recovering data since 1991, for businesses across MD, DC & VA. Ship the drives free both ways or bring them to our Columbia lab. The diagnosis is free, and nothing is charged unless you approve the quote and we recover your data.',
};

export const AREAS: Record<AreaId, Area> = { md, va, all };
