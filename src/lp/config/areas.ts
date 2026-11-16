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
  /** Form and hero: offer the (410) main line as well (VA pages, whose own number is the Tysons line). */
  mainLine: boolean;
  /** service_state sent with the lead (the form no longer asks). */
  stateDefault: string;
  step2: string;
  /** Tap-to-call block under the H1: the number plus this note. */
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

export const LAB_PHONE = '(410) 937-7332';
export const LAB_TEL = 'tel:+14109377332';

const md: Area = {
  id: 'md',
  location: 'columbia',
  office: 'columbia',
  pill: 'Columbia lab · since 1991',
  phone: LAB_PHONE,
  tel: LAB_TEL,
  eyebrow: 'Local recovery lab · Columbia, MD',
  place: 'Maryland',
  heroSub:
    'Clicking, not detected, dropped or dead? We recover hard drives, SSDs and RAID arrays for offices and individuals across Maryland, in our Columbia lab since 1991.',
  mainLine: false,
  stateDefault: 'Maryland',
  step2:
    'Walk in to our Columbia lab, or ship it to us: shipping is free both ways. Pickup is also available, call for details.',
  heroCallNote: 'Columbia lab',
  officeH: 'A real lab in Columbia, Maryland',
  officeP:
    'Recoveries are done at our Columbia lab, including physical recoveries in our clean room. We’re ISO 9001 certified and have handled more than 15,000 cases since 1991.',
  addrName: 'Disk Doctors · Columbia lab',
  addr: '10015 Old Columbia Rd, Suite B 215, Columbia, MD 21046',
  addrHours: 'Walk in Mon–Fri, 8:30 a.m.–5:00 p.m.',
  otherOffice: 'Closer to Northern Virginia? We also have an office in Tysons, VA, by appointment.',
  faqBring:
    'No. Shipping is free both ways, and pickup is also available, call for details. You can also walk in at our Columbia lab, Mon–Fri 8:30–5.',
  stickyCallLabel: 'Call our team',
};

// Ads brief 16 Nov: no "24/7" anywhere on the landing pages, and no do-this-don't-do-that advice.
// Brief 9 Nov, section 6: VA copy never mentions the Columbia lab or where recovery is done, and never
// implies a lab in Virginia. Tysons is only ever "our Tysons office, by appointment".
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
    'Clicking, not detected, dropped or dead? We recover hard drives, SSDs and RAID arrays for offices and individuals across Northern Virginia and DC. Meet us at our Tysons office by appointment, or ship your drive to us, free both ways.',
  mainLine: true,
  stateDefault: 'Virginia',
  step2:
    'Bring it to our Tysons office by appointment, or ship it to us free both ways. Pickup is also available, call for details.',
  heroCallNote: 'Tysons office',
  officeH: 'Our Tysons office, by appointment',
  officeP:
    'Meet us at our Tysons office by appointment: fill in the form or call (571) 202-8529 to set a time. Physical recoveries are done in a certified clean room. ISO 9001 certified, 15,000+ cases since 1991.',
  addrName: 'Disk Doctors · Tysons office',
  addr: '8300 Boone Blvd, Suite 513, Tysons, VA 22182 (American Center)',
  addrHours: 'By appointment, Mon–Fri · Call (571) 202-8529',
  otherOffice: 'Our Tysons office (by appointment): 8300 Boone Blvd, Suite 513, Tysons, VA 22182.',
  faqBring:
    'No. Shipping is free both ways, and pickup is also available, call for details. You can also bring it to our Tysons office by appointment.',
  stickyCallLabel: 'Call Tysons',
};

// /lp/raid-nas-server: business page for MD, DC & VA, on the lab line.
const all: Area = {
  ...md,
  id: 'all',
  // The RAID page serves MD, DC and VA, so the form leaves service_state blank.
  stateDefault: '',
  eyebrow: 'Recovery lab · Columbia, MD · serving MD, DC & VA',
  place: '',
  heroSub:
    'Failed rebuild, degraded array or a NAS that won’t mount? RAID, NAS and server recovery for businesses across MD, DC and VA, in our Columbia lab since 1991.',
};

export const AREAS: Record<AreaId, Area> = { md, va, all };
