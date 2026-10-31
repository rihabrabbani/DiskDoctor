export type LocationKind = 'lab' | 'service-area';

export interface LocationFaq {
  question: string;
  answer: string;
}

export interface LocationScenario {
  title: string;
  body: string;
}

export interface LocationCopy {
  kind: LocationKind;
  seoTitle: string;
  seoDescription: string;
  directAnswer: string;
  heroDescription: string;
  paragraphs: string[];
  scenarios: LocationScenario[];
  faqs: LocationFaq[];
  relatedServiceIds: string[];
  relatedLocationSlugs: string[];
}

export const locationCopy: Record<string, LocationCopy> = {
  'columbia-md': {
    kind: 'lab',
    seoTitle: 'Data Recovery Columbia MD | Free Evaluation',
    seoDescription:
      'Columbia MD data recovery lab at 10015 Old Columbia Rd. Hard drive, SSD, RAID, and phone recovery. Free evaluation. No data, no charge. Call (410) 937-7332.',
    directAnswer:
      'DiskDoctor recovers failed hard drives, SSDs, RAID arrays, and phones at 10015 Old Columbia Rd Suite B 215, Columbia, MD 21046. Walk in or ship the device. Evaluation is free. You pay a recovery fee only if we retrieve the files you need. Call (410) 937-7332 before you run more software on a clicking drive.',
    heroDescription:
      'The Columbia lab is the working cleanroom for Maryland, DC, and Northern Virginia jobs. Drop off a failed disk, RAID member, or phone here. We image first, quote before paid work, and return files on new media.',
    paragraphs: [
      'This is a data recovery laboratory, not a walk-up computer-repair counter. When a drive clicks, an SSD disappears from BIOS, or a RAID 5 loses a second member during a rebuild, the useful work is cloning the media and reconstructing the filesystem from that clone. Doing that on the original disk is how remaining readable sectors get overwritten.',
      'The lab sits at 10015 Old Columbia Rd Suite B 215, Columbia, MD 21046, in the Oakland Ridge industrial area off Route 175. Howard County businesses, law offices, medical practices, and home users drop devices here during weekday hours (8:30 a.m.–5:00 p.m.). After hours, leave a message or use the form; emergency intake is arranged by phone at (410) 937-7332.',
      'Walk-in: power the device down, do not run CHKDSK, Disk Utility, or RAID rebuilds, and bring any passwords you have. Mail-in: pad the drive, do not send it in a bubble envelope without a box, and include a note with the OS, what failed, and the files that matter. We confirm receipt, diagnose at no charge, and send a fixed quote.',
      'Logical jobs (deleted files, formatted volumes, failed Windows boot with a still-healthy head stack) often finish in 24–48 hours. Physical jobs — clicking ST/WD desktop drives, NVMe controller failure, multi-disk RAID — typically take 3–7 days because every platter or NAND chip is imaged before reconstruction. Same-day is possible when the clone is fast and the filesystem is intact.',
      'Columbia is the head office for the Tysons appointment location and for service-area pages covering Baltimore, DC, Rockville, and the rest of the corridor. Media from those cities is processed here, including devices brought to a Tysons appointment. There is no second cleanroom in Baltimore or DC; claiming otherwise would be a fake office.',
      'If another shop already started a rebuild or ran recovery software, say so. We can often still image remaining sectors, but every prior write reduces the odds. The “no data, no charge” policy applies to the recovery fee after a successful evaluation, not to shipping or to cases where the customer insists on destructive attempts we advise against.',
      'Neighbors who actually use this lab: Ellicott City accountants with QuickBooks on a dying NAS, Laurel medical offices with imaging studies on RAID 5, Clarksville and Fulton home offices with photo libraries, and Maple Lawn startups whose only copy of source lived on a laptop disk. Howard County is small enough that people drive; they do not need a second pin in the Mall in Columbia.',
      'What evaluation means here: we identify the device, photograph serials, attempt a safe clone, and tell you whether the files you named are present on that clone. You are not buying a “repair.” A repaired original disk is a bonus when the mechanics allow it; the deliverable is your files on new media. If the clone is empty of what you asked for, you do not pay a recovery fee.',
      'Packaging for mail-in from elsewhere in Maryland: original drive in an anti-static bag if you have one, then a rigid box with two inches of foam or crumpled paper on all sides. Tape the box. Write “do not X-ray / magnetic media” only if your carrier asks; the important part is rigidity. Include OS, what failed, passwords you are willing to share, and the folder names that matter. We email when the box is opened.',
      'What we will not do in Columbia: install Windows on the failed disk as a first step, run a RAID vendor rebuild “to see if it comes back,” freeze a clicking drive, or promise a dollar amount before we have seen the media. Those are how remaining readable sectors disappear. The phone number for a real intake is (410) 937-7332, not a 1-800 franchise line.',
      'Evenings and weekends: the suite is not a 24-hour lobby. Leave a voicemail or the form. If the files are time-critical — payroll, a filing, a shoot that cannot be repeated — say so. Emergency imaging is scheduled by phone when a bench is free, not by an unstaffed drop slot.',
      'How to find the suite: 10015 Old Columbia Rd is in Oakland Ridge, not the Mall in Columbia. Suite B 215 is an office-lab, not a storefront with a neon “computer repair” sign. If GPS drops you at the wrong building, call (410) 937-7332 from the parking lot. Bring the device powered down. We will not start a paid recovery until you accept a quote.',
      'What “no data, no charge” does not cover: shipping, a new return disk, or a job you told us to attempt after we said the platters were unreadable. It does cover the recovery fee when we cannot retrieve the files you named. That distinction is why we ask you to list the folders that matter on the form.',
      'Same-day logical jobs happen when the clone is fast and the filesystem is intact — a formatted volume with intact photo headers, a Windows boot that failed with healthy heads. Physical jobs do not become same-day because someone is in a hurry; they become same-day when the platters still read. Call before you drive if you need a timed slot.',
    ],
    scenarios: [
      {
        title: 'Howard County accounting firm, clicking 4TB NAS disk',
        body: 'A Columbia CPA’s Synology dropped one disk with a click. They stopped the rebuild, brought both members in, and we cloned the degraded disk plus the healthy one. QuickBooks and tax-year folders came back from the clone. Rebuilding in the NAS would have been the second failure.',
      },
      {
        title: 'Ellicott City photographer, formatted SD card',
        body: 'A wedding card was formatted in-camera the next morning. The card still had intact photo headers. We imaged it and carved JPEG/RAW without writing to the card. Same-day return because the filesystem had not been overwritten by a new shoot.',
      },
      {
        title: 'Laurel medical office, RAID 5 with two dead members',
        body: 'A small RAID 5 used for imaging studies lost a disk, then a second during a weekend rebuild. We cloned all five members, including the two that the controller had marked failed, and reconstructed the stripe in software. Partial patient studies were still on the remaining parity. Do not rebuild a RAID 5 that already lost a disk.',
      },
    ],
    faqs: [
      {
        question: 'Where do I drop off a failed drive in Columbia, MD?',
        answer: '10015 Old Columbia Rd Suite B 215, Columbia, MD 21046, weekdays 8:30 a.m.–5:00 p.m. Call (410) 937-7332 if you need after-hours intake. Ship-in is accepted with a padded box.',
      },
      {
        question: 'How much does data recovery cost in Columbia?',
        answer: 'Evaluation is free. You receive a fixed quote before paid work. There is no recovery fee if we cannot retrieve the data you need. We do not publish dollar menus because physical vs logical jobs are not the same case.',
      },
      {
        question: 'How long does Columbia lab recovery take?',
        answer: 'Logical recoveries are often 24–48 hours. Physical and RAID jobs are typically 3–7 business days. Emergency imaging can be scheduled by phone.',
      },
      {
        question: 'Can you recover a clicking hard drive in Columbia?',
        answer: 'Yes, if the platters still have readable areas. Stop using the drive, do not freeze it, and bring it in. We image in a cleanroom rather than letting Windows retry the heads.',
      },
      {
        question: 'Do you recover RAID arrays for Howard County businesses?',
        answer: 'Yes. Bring every member, including disks the controller marked failed. We clone first and reconstruct RAID 0/1/5/6/10 in software. Do not start a rebuild.',
      },
      {
        question: 'Is mail-in data recovery available from nearby towns?',
        answer: 'Yes. Ellicott City, Laurel, Clarksville, Fulton, Savage, and Jessup routinely ship or drop at this lab. Include OS, symptoms, and the files that matter.',
      },
    ],
    relatedServiceIds: ['raid-recovery', 'mobile-recovery', 'windows-recovery', 'file-recovery'],
    relatedLocationSlugs: ['tysons-va', 'baltimore-md', 'rockville-md', 'washington-dc'],
  },
  'tysons-va': {
    kind: 'lab',
    seoTitle: 'Data Recovery Tysons VA | By Appointment',
    seoDescription:
      'Tysons VA data recovery office at 8300 Boone Blvd Suite 513, by appointment. Media is processed at the Columbia MD lab. Free evaluation. Call (410) 937-7332.',
    directAnswer:
      'DiskDoctor’s Tysons office is at 8300 Boone Blvd Suite 513, Tysons, VA 22182, by appointment. Recovery work happens in the Columbia, MD lab: devices you bring to a Tysons appointment are taken there for imaging. Call (410) 937-7332 to schedule.',
    heroDescription:
      'Our Northern Virginia office in Tysons, by appointment. Staff are not always on site, so book before you drive. Recovery work is performed at the Columbia lab.',
    paragraphs: [
      'Tysons is DiskDoctor’s Virginia office, by appointment. Recovery work happens in the Columbia lab, not in Tysons. If you arrive unannounced, the suite may be locked. Call (410) 937-7332, pick a window, and bring the failed media powered down.',
      'Address: 8300 Boone Blvd Suite 513, Tysons, VA 22182. Parking is in the Boone Boulevard garage. McLean, Vienna, Falls Church, Dunn Loring, and Merrifield clients book an appointment here to avoid a trip to Howard County.',
      'What happens after your appointment: the device is logged, transported to Columbia, imaged, and quoted. You can collect recovered files in Tysons on a scheduled return or receive a shipped encrypted drive. Chain of custody is kept for business and legal jobs.',
      'Do not start a RAID rebuild on a Tysons-area NAS while you wait for an appointment. Power the array down. The second disk in a degraded RAID 5 often dies during the rebuild, which is the expensive case.',
      'Urgent jobs do not have to wait for a Tysons slot. Call our 24/7 emergency line at (410) 937-7332 and we will work out the fastest way to get the device to the Columbia lab. The appointment constraint is physical presence at Boone Blvd, not whether the lab will take the job.',
      'How to reach the suite: 8300 Boone Blvd is the office tower next to the Tysons Corner corridor, not a mall kiosk inside Tysons I or II. Suite 513 is upstairs. Bring a photo ID if the building desk asks. Do not leave a drive with a receptionist who is not DiskDoctor staff. If you cannot get in, call (410) 937-7332 from the lobby rather than sliding media under a door.',
      'Silver Line riders sometimes prefer Tysons to Columbia. That is a logistics choice, not a second laboratory. The clone still happens in Howard County. If you need to watch chain-of-custody paperwork signed, say so when you book; we can do that at your appointment and again at return.',
      'What to bring: the failed disk or phone powered off, every RAID member, any passwords you will share, and a note with the OS and the folders that matter. Do not bring a running NAS that is still rebuilding. Power it down at the office before you drive.',
      'Return of files: encrypted USB or a new SATA/NVMe you approve, pickup in Tysons on a second appointment, or tracked shipping to your office. We do not email archives of recovered patient or legal files. If you want the original media back, say so; some physical jobs cannot reseal a drive that was opened for heads work.',
    ],
    scenarios: [
      {
        title: 'McLean law firm, failed laptop SSD',
        body: 'An NVMe that vanished from BIOS was brought to a Tysons appointment the same afternoon, imaged in Columbia overnight, and returned as a cloned volume of working documents. No Windows “repair” was run on the original.',
      },
      {
        title: 'Vienna office, Synology RAID 1 with one click',
        body: 'They booked a Tysons appointment, brought both disks, and we cloned the clicking member before it was used in any rebuild. The mirror was rebuilt onto new disks after files were verified.',
      },
    ],
    faqs: [
      {
        question: 'Is the Tysons office a full lab?',
        answer: 'No. It is our Virginia office, by appointment, at 8300 Boone Blvd Suite 513. Imaging and clean-room work happen in Columbia, MD.',
      },
      {
        question: 'Do I need an appointment in Tysons?',
        answer: 'Yes. Staff are not always present. Call (410) 937-7332 before you go.',
      },
      {
        question: 'Can I bring a Northern Virginia RAID job to Tysons?',
        answer: 'Yes, by appointment. Bring every array member. Do not rebuild. We take the disks to the Columbia lab for reconstruction.',
      },
      {
        question: 'What are Tysons hours?',
        answer: 'By appointment on weekdays. For emergencies, call our 24/7 line at (410) 937-7332 rather than walking in.',
      },
    ],
    relatedServiceIds: ['raid-recovery', 'mobile-recovery', 'mac-recovery', 'windows-recovery'],
    relatedLocationSlugs: ['columbia-md', 'mclean-va', 'arlington-va', 'washington-dc'],
  },
  'baltimore-md': {
    kind: 'service-area',
    seoTitle: 'Data Recovery Baltimore MD | Columbia Lab',
    seoDescription:
      'Baltimore data recovery via DiskDoctor’s Columbia MD lab. Hard drive, RAID, and phone recovery. Free evaluation. No data, no charge. Call (410) 937-7332.',
    directAnswer:
      'There is no DiskDoctor storefront in Baltimore. Failed drives, RAID members, and phones from Baltimore, Towson, Catonsville, and Glen Burnie are recovered at the Columbia, MD lab (about 25 minutes from downtown). Free evaluation. Call (410) 937-7332. Do not rebuild a clicking disk or a degraded RAID.',
    heroDescription:
      'Baltimore-area recovery is handled at the Columbia laboratory, not a Harbor-front kiosk. Ship or drop the failed device. We image first and quote before paid work.',
    paragraphs: [
      'Baltimore jobs look like everyone else’s physical failures: 3.5" NAS disks that click after a power event, RAID 5 arrays in Harbor East offices that lost a second disk during a rebuild, and phones pulled from a wet bag. The work is the same. The lab is in Columbia, not a “Baltimore metro office” with a fake street.',
      'Drive time from Inner Harbor to 10015 Old Columbia Rd is typically 25–40 minutes via I-95 or I-895. Towson, Dundalk, Catonsville, Pikesville, and Glen Burnie ship overnight if a trip is inconvenient. Pad the drive; do not send it loose in a bubble mailer.',
      'Port, hospital, and municipal contractors in Baltimore often need chain-of-custody notes. Say so on the form. We log intake, restrict access, and return files on new media. We do not browse contents beyond verification.',
      'If a Baltimore IT vendor already ran recovery software or a RAID rebuild, tell us. Remaining readable sectors can still be cloned. Every extra write lowers the odds.',
      'Turnaround matches the Columbia bench: 24–48 hours for logical, 3–7 days for physical and RAID, emergency imaging by phone. Evaluation is free. No data, no charge on the recovery fee.',
      'From Canton, Hampden, Federal Hill, and Locust Point the drive is I-95 south to 175 west, or 895 if the Fort McHenry Tunnel is faster that hour. From Towson and Timonium, 83 to the Beltway to 95 is the usual path. If you would rather not sit in traffic, overnight the disks; a padded box arrives before most people finish arguing with a local “computer repair” counter about RAID rebuilds.',
      'Johns Hopkins, UMB, and hospital-adjacent offices: we recover unclassified research and practice files. Follow your IRB and HIPAA process for what you are allowed to send. We do not need a fake Baltimore “medical campus lab.” We need the media powered down and a note that chain-of-custody is required.',
      'Harbor East and Fells Point restaurants and retailers often lose a POS disk after a power blip. Do not reinstall the POS image on the failed module. Clone first. Ticket history and card-batch files are usually still on the NAND or platters if you stop using the device.',
      'If a Baltimore IT company already imaged the disk to a USB and the copy is incomplete, send both the original and their copy. Partial clones are still useful. Do not format the original “because we have a copy.”',
      'Federal Hill, Mount Vernon, and Charles Village apartments: a single USB disk with taxes and photos is the usual failure. Unplug it. Do not let Windows offer to format. Columbia is 25–40 minutes; overnight shipping is fine if you would rather not drive.',
      'BWI-area and Glen Burnie offices: RAID members from a small server closet should travel together in one box, labeled by slot. A “Baltimore lab” pin in a directory that is not 10015 Old Columbia Rd is not this operation. The clone happens in Columbia.',
      'If the disk clicked after a Harbor East power blip, do not keep the NAS on “so people can still work off the remaining disks.” That is a rebuild in slow motion. Power down and send the set.',
      'Pigtown, Locust Point, and Port Covington small businesses often keep the only copy of invoices on a desktop disk. When that disk clicks, a local “we’ll reinstall Windows” visit is the wrong first hour. Clone first in Columbia. Reinstall later on new media.',
      'Towson University-adjacent and county offices: unclassified student or business media only on this public form. Follow your records policy. We can log chain-of-custody; we cannot invent a Baltimore cleanroom that does not exist.',
      'Catonsville and Ellicott City (the Baltimore-side commute): you are closer to Columbia than downtown thinks. 40 to 29 is often faster than 95. Drop the device powered down. Do not copy “one more folder” in the parking lot.',
      'If a Harbor IT company quoted a rebuild on a clicking RAID 5, get a second opinion before they write a new member. The expensive Baltimore case is the second disk dying at 80% rebuild. We clone first. Evaluation is free once the members arrive.',
      'What to bring from Baltimore: the failed disk or phone powered off, every RAID member, passwords you will share, and a note with the OS and the folders that matter. If you ship, use a rigid box and tracking. We email when the box is opened at Old Columbia Rd.',
      'What happens next: free evaluation, fixed quote, clone, then files on new media. You can collect in Columbia or receive a shipped encrypted drive. We do not keep a Baltimore waiting room because there is no Baltimore storefront.',
      'Rush jobs: say so on the form if payroll or a filing is stuck. Emergency imaging is scheduled by phone at (410) 937-7332. A Harbor-front kiosk cannot clone platters faster than a lab that already has the bench.',
    ],
    scenarios: [
      {
        title: 'Fells Point restaurant, POS disk not recognized',
        body: 'A SATA SSD used for tickets dropped out of the BIOS after a power blip. Columbia imaged the NAND-side data. Sales history came back; they did not reinstall Windows on the failed module.',
      },
      {
        title: 'Towson clinic, external drive with patient exports',
        body: 'A USB enclosure stopped enumerating. The disk inside was healthy enough to clone once removed from the cheap bridge board. Files were returned on a new encrypted drive.',
      },
      {
        title: 'Catonsville contractor, RAID 10 with two failed disks',
        body: 'Two disks in different mirrors failed. We cloned all four, rebuilt the RAID 10 layout in software, and recovered project CAD. A controller rebuild would have finished the array off.',
      },
    ],
    faqs: [
      {
        question: 'Is there a DiskDoctor office in Baltimore?',
        answer: 'No staffed Baltimore storefront. Recovery is at the Columbia, MD lab. Drop off there or ship from Baltimore, Towson, or Glen Burnie.',
      },
      {
        question: 'How fast can a Baltimore RAID come back?',
        answer: 'After the array arrives in Columbia, most RAID reconstructions take 3–7 days. Do not rebuild on site while you wait.',
      },
      {
        question: 'Can you recover a phone from Baltimore the same week?',
        answer: 'Often yes. Water-damaged and board-failed phones are chip-level jobs at the Columbia lab. Stop charging the device.',
      },
      {
        question: 'Do you serve the Port and downtown businesses?',
        answer: 'Yes, as a service area of the Columbia lab, with chain-of-custody on request.',
      },
      {
        question: 'What should I do if my Baltimore NAS is clicking?',
        answer: 'Power it down. Do not run a repair or rebuild. Remove the disks or bring the whole unit to Columbia.',
      },
      {
        question: 'How do I get a quote from Baltimore?',
        answer: 'Use the form on this page or call (410) 937-7332. Evaluation is free once the media is in the lab.',
      },
    ],
    relatedServiceIds: ['raid-recovery', 'windows-recovery', 'mobile-recovery', 'file-recovery'],
    relatedLocationSlugs: ['columbia-md', 'annapolis-md', 'washington-dc', 'rockville-md'],
  },
  'washington-dc': {
    kind: 'service-area',
    seoTitle: 'Data Recovery Washington DC | Columbia Lab',
    seoDescription:
      'Washington DC data recovery for government, legal, and business media at DiskDoctor’s Columbia MD lab. Free evaluation. Call (410) 937-7332.',
    directAnswer:
      'DiskDoctor does not operate a storefront on the National Mall. DC, Georgetown, Capitol Hill, and Navy Yard recoveries are performed at the Columbia, MD lab. Government, legal, and contractor media is accepted with chain-of-custody. Free evaluation. Call (410) 937-7332. Do not image a classified or CUI disk with consumer software.',
    heroDescription:
      'DC-area hard drive, RAID, and phone recovery through the Columbia laboratory. Built for legal, contractor, and office failures — not a tourist-page about monuments.',
    paragraphs: [
      'Washington jobs are often time-bound: a partner’s laptop died the night before a filing, a RAID holding discovery productions lost a disk, a phone with field photos will not boot. The laboratory that can clone those devices is in Columbia, Maryland, about 30–45 minutes from downtown depending on the Beltway.',
      'We are not a federal contractor by default and we do not claim SCIF access on this page. If your media is classified, follow your agency’s procedure. For unclassified business, legal, and personal media, intake is the same: power down, no CHKDSK, no RAID rebuild, document the serials, and either drop at Columbia or ship with tracking.',
      'Chain of custody, restricted bench access, and return on encrypted drives are routine for DC law firms and contractors. Put that requirement on the form. We do not mine files for marketing and we do not keep copies longer than the agreed retention after you confirm the delivery disk.',
      'Georgetown, Capitol Hill, Dupont, Foggy Bottom, Navy Yard, and Shaw are service areas, not fake offices. If a directory lists a DC street for DiskDoctor that is not 10015 Old Columbia Rd or the Tysons appointment suite, it is stale or belongs to another entity.',
      'Turnaround: logical 24–48 hours after arrival, physical/RAID 3–7 days, emergency by phone. Evaluation free. No data, no charge on the recovery fee.',
      'Driving from downtown: I-295 or 395 to the Beltway to 29 north, or 95 if that is moving. Metro does not reach the Columbia suite; our Tysons office on the Silver Line is closer, by appointment, if you will not drive to Howard County. Book Tysons; do not assume the Boone Blvd suite is staffed.',
      'Law firms around Judiciary Square and K Street: BitLocker and FileVault volumes are routine. Bring the protector key or password. We will not “break” encryption as a service. If the SSD is not detected in firmware, chip-level work may still return an encrypted blob you can unlock in-house.',
      'Contractors in Navy Yard and Crystal City (the DC side of that commute): RAID 6 and virtual disks on failed members are the expensive cases. Photograph slot order. Do not let a hardware card finish a rebuild overnight “so it is ready in the morning.”',
      'This page is not a guide to the monuments. If a directory still describes DiskDoctor with Mall copy, that is leftover tourism text from an older template. The service is laboratory recovery for failed media that happens to be used by people who work in the District.',
      'Dupont, Logan, and Shaw offices: a partner laptop that died the night before a filing is the usual rush. Power it down. Do not run Startup Repair overnight. Drop in Columbia in the morning or ship with tracking. Our Tysons office is closer, by appointment, if you will not cross into Maryland.',
      'Georgetown and Foggy Bottom: Fusion Drives and failing NVMe modules are common. Disk Utility First Aid on a clicking HDD is a write. Imaging is a read. Bring the machine or the pulled storage.',
      'If a DC IT vendor already started a RAID rebuild “so it would be ready Monday,” stop it and send the members. Partial writes are often still reconstructable. Finishing the rebuild is how the second disk dies.',
      'Capitol Hill and Judiciary Square filings: a dead laptop the night before a deadline is not a reason to run Startup Repair until 3 a.m. Power it down. Columbia can image in the morning. Our Tysons office can see you by appointment if you will not cross into Maryland.',
      'Navy Yard and Southwest contractors: RAID 6 and virtual disks are the usual expensive case. Photograph slot order. Do not let a hardware card import a foreign configuration over a weekend. Unclassified media only unless your contracting officer says otherwise.',
      'Georgetown retailers and restaurants: a POS SSD that vanished from BIOS after a power blip still often clones. Do not reinstall the POS image on the failed module. Ticket history lives on the NAND until you overwrite it.',
      'If a directory lists a National Mall address for DiskDoctor, ignore it. This operation’s streets are 10015 Old Columbia Rd in Columbia and 8300 Boone Blvd in Tysons (appointment). DC is a service area of those two, not a third laboratory.',
      'What to bring from DC: powered-down media, RAID members labeled by slot, BitLocker or FileVault keys if the volume is encrypted, and a note if chain-of-custody is required. Unclassified business and personal media only on this public form.',
      'What happens next: Columbia evaluates at no charge, quotes, clones, and returns files on new media. Pickup in Columbia, scheduled Tysons return, or tracked shipping. We do not email archives of recovered legal files.',
      'If you are on the Hill and cannot drive to Howard County, book Tysons. Do not leave a drive with a building receptionist who is not DiskDoctor staff. Call (410) 937-7332 from the lobby if the suite is locked.',
    ],
    scenarios: [
      {
        title: 'Capitol Hill firm, BitLocker SSD not detected',
        body: 'The NVMe dropped from firmware. We recovered the encrypted volume from a chip-level read and the firm supplied the protector key. Files were returned without decrypting on an uncontrolled workstation.',
      },
      {
        title: 'Navy Yard contractor, RAID 6 with a failed rebuild',
        body: 'A RAID 6 started a rebuild, then a second disk slow-failed. We cloned every member, including the “rebuilding” disk, and reconstructed from parity. They did not let the controller finish.',
      },
      {
        title: 'Adams Morgan photographer, drowned iPhone',
        body: 'The phone was sealed in rice, which did nothing useful. Chip-level extraction at Columbia recovered the camera roll. Stop charging wet phones.',
      },
    ],
    faqs: [
      {
        question: 'Where is DiskDoctor for Washington DC data recovery?',
        answer: 'The lab is in Columbia, MD. DC is a service area. Drop off at the Columbia lab, book a Tysons appointment, or ship. There is no Mall kiosk.',
      },
      {
        question: 'Can you handle legal hold and chain of custody?',
        answer: 'Yes for unclassified media. Say so on intake. We log who touched the device and return files on new media.',
      },
      {
        question: 'Do you recover government laptops?',
        answer: 'Unclassified business and personal media, yes. Classified or CUI media must follow your agency’s rules; we will not improvise that on a public form.',
      },
      {
        question: 'How long from DC drop-off to files back?',
        answer: 'After the device reaches Columbia: often 24–48 hours logical, 3–7 days physical or RAID.',
      },
      {
        question: 'Should I run recovery software on a DC office RAID?',
        answer: 'No. Power it down and send the members. Rebuilds and repair utilities write to disks that still have your data.',
      },
      {
        question: 'Is evaluation free for DC clients?',
        answer: 'Yes. Fixed quote before paid work. No data, no charge on the recovery fee if we cannot get the files you need.',
      },
    ],
    relatedServiceIds: ['raid-recovery', 'data-security', 'mobile-recovery', 'windows-recovery'],
    relatedLocationSlugs: ['columbia-md', 'arlington-va', 'alexandria-va', 'tysons-va'],
  },
  'rockville-md': {
    kind: 'service-area',
    seoTitle: 'Data Recovery Rockville MD | Columbia Lab',
    seoDescription:
      'Rockville and Montgomery County data recovery at DiskDoctor’s Columbia lab. Hard drive, RAID, SSD, phone. Free evaluation. Call (410) 937-7332.',
    directAnswer:
      'Rockville data recovery is performed at DiskDoctor’s Columbia, MD lab, not a Rockville storefront. Montgomery County hard drives, RAID arrays, and phones can be dropped in Columbia or shipped from Rockville, North Bethesda, or Gaithersburg. Free evaluation. Call (410) 937-7332.',
    heroDescription:
      'Montgomery County recovery through the Columbia laboratory. Built for biotech, professional offices, and home NAS failures — not a park-guide page.',
    paragraphs: [
      'Rockville and North Bethesda produce a lot of NAS and workstation failures: 4-bay desktop RAIDs in home offices, lab PCs with research data, and BitLocker volumes that vanished after a firmware update. Those jobs need a clone, not another trip through Windows Startup Repair.',
      'There is no DiskDoctor street address in Rockville. The working lab is 10015 Old Columbia Rd, Columbia. Drive time is typically 30–40 minutes via 29 or 95/495. Gaithersburg, Derwood, Twinbrook, and White Flint ship as often as they drive.',
      'Biotech and professional offices in the Pike District should say if media contains regulated research or client files. We apply chain-of-custody and do not keep extra copies after you confirm delivery.',
      '`data recovery rockville md` is already a query this site appears for. This page exists so that query lands on honest service-area copy, not a fake LocalBusiness pin in zip 20850.',
      'Turnaround and pricing policy match Columbia: free evaluation, fixed quote, no data no charge, 24–48 hours logical, 3–7 days physical/RAID.',
      'I-270 and the Pike: from Rockville Town Center, 270 to 495 to 29 is the usual drive to Old Columbia Rd. From North Bethesda and White Flint, 355 to the Beltway works when 270 is stopped. Gaithersburg and Germantown often ship; a morning drop in Columbia still beats a week of “repair software” on a clicking NAS.',
      'Pike & Rose and Twinbrook offices run a lot of 4-bay desktop RAIDs under desks. When one disk clicks, the enclosure’s “repair” button is a rebuild. Power the box down, label the slots, and bring all four. We clone in Columbia and reconstruct in software.',
      'Montgomery County clinics and professional practices: say on the form if the volume holds patient or client files. We apply chain-of-custody and return on encrypted media. We do not need a Rockville storefront to do that.',
      'If you already started a Synology or QNAP rebuild from a Rockville home office, stop it. Send the members anyway. Partial rebuilds are often still reconstructable from clones. Continuing the rebuild is how the second disk dies.',
      'North Bethesda condos and Pike District offices: a 4-bay RAID under a desk is not a second laboratory. When one disk clicks, the enclosure’s repair button is a rebuild. Label the slots. Bring all four to Columbia or ship them padded, separately wrapped, in one box.',
      'Gaithersburg and Derwood: overnight to 10015 Old Columbia Rd is often faster than sitting on 270. Include OS, what failed, and the folder names that matter. We email when the box is opened.',
      'BitLocker volumes from Montgomery County professional offices: bring the protector key. We can image an undetected NVMe and return an encrypted blob you unlock in-house. We will not “break” BitLocker as a service.',
      'Twinbrook and White Flint home offices: Lightroom catalogs on a single 8TB disk are the usual failure. If the disk is clicking, stop the catalog. Every extra spin is how remaining photos disappear. Pad the drive and send it to Columbia.',
      'Pike District biotech and professional suites: say on the form if the volume holds regulated research or client files. We apply chain-of-custody and return on encrypted media. We do not need a Rockville pin in 20850 to do that work.',
      'Gaithersburg life-science and engineering shops: RAID 1 pairs used for instruments should both travel, even if only one is clicking. The quiet mirror is often next. We clone both before anyone rebuilds.',
      'If Google still shows a Rockville storefront for this lab, it is a leftover citation. The working address is 10015 Old Columbia Rd Suite B 215. Rockville is how you describe the customer, not a second cleanroom.',
      'What to bring from Rockville: powered-down NAS or disks, slot photos, BitLocker key if needed, and the folder names that matter. Montgomery County clinics should say if patient files are on the volume so we apply chain-of-custody.',
      'What happens next: Columbia evaluates free, quotes, clones, returns files on new media. Drive 29 or 270/495, or overnight the box. Book a Tysons appointment only if you live closer to Boone Blvd than to Oakland Ridge.',
      'If a Pike District IT person already ran recovery software on the live disks, tell us. Remaining readable sectors can still be cloned. Do not format the original because a partial USB copy exists.',
    ],
    scenarios: [
      {
        title: 'North Bethesda home NAS, RAID 5 with one click',
        body: 'A 4-bay RAID 5 started clicking. They powered it down, brought all four disks to Columbia, and we cloned the degraded member. Family photos and tax PDFs came off the reconstructed array.',
      },
      {
        title: 'Rockville clinic, failed boot SSD',
        body: 'Practice-management data lived on a SATA SSD that dropped to raw. Imaging recovered the database files. They did not reinstall Windows on the failed module.',
      },
      {
        title: 'Gaithersburg engineer, deleted project folder',
        body: 'An SSD was still in use after a delete. We imaged immediately; some files were already overwritten. Fast intake matters more than “undelete” apps on a working disk.',
      },
    ],
    faqs: [
      {
        question: 'Is there a data recovery shop in Rockville, MD?',
        answer: 'DiskDoctor’s lab is in Columbia. Rockville is a service area. Drop off in Columbia or ship from Montgomery County.',
      },
      {
        question: 'Can you recover a Rockville NAS that is clicking?',
        answer: 'Yes, if you stop using it. Bring every disk. Do not run the vendor rebuild.',
      },
      {
        question: 'How long does Rockville-area recovery take?',
        answer: 'After arrival in Columbia: 24–48 hours for many logical jobs, 3–7 days for physical and RAID.',
      },
      {
        question: 'Do you recover BitLocker drives from Montgomery County?',
        answer: 'Yes, when the volume can be imaged and you can supply the key or password.',
      },
      {
        question: 'Is evaluation free?',
        answer: 'Yes. Fixed quote before work. No data, no charge on the recovery fee.',
      },
      {
        question: 'Can I drop a phone in Rockville?',
        answer: 'Not at a Rockville storefront. Drop off at the Columbia lab, book a Tysons appointment, or ship the device powered off.',
      },
    ],
    relatedServiceIds: ['raid-recovery', 'file-recovery', 'windows-recovery', 'mobile-recovery'],
    relatedLocationSlugs: ['columbia-md', 'potomac-md', 'washington-dc', 'tysons-va'],
  },
  'alexandria-va': {
    kind: 'service-area',
    seoTitle: 'Data Recovery Alexandria VA | Columbia Lab',
    seoDescription:
      'Alexandria VA data recovery via DiskDoctor’s Columbia MD lab. Hard drive, RAID, phone. Free evaluation. Call (410) 937-7332.',
    directAnswer:
      'Alexandria does not have a DiskDoctor storefront. Old Town, Del Ray, and Eisenhower Valley recoveries are done at the Columbia, MD lab, with our Tysons office available by appointment. Free evaluation. Call (410) 937-7332.',
    heroDescription:
      'Northern Virginia recovery for Alexandria devices at the Columbia laboratory. Stop using a clicking drive. Do not rebuild a NAS.',
    paragraphs: [
      'Alexandria failures are the usual mix: laptop disks that click on the GW Parkway commute, RAID boxes in home offices, and phones that took a fall on King Street. None of that requires a fake Old Town address. It requires a clone in Columbia.',
      'Drop off at the Columbia lab, book an appointment at our Tysons office (8300 Boone Blvd), or ship. Evaluation free. No data, no charge.',
      'If a local repair shop already opened the drive, tell us. We can still image many of those, but opened HDA work belongs in a lab, not on a counter.',
      'From Old Town, King Street to 395 to the Beltway to 29 is the usual drive to Columbia. From Eisenhower Avenue and Huntington, the Beltway west toward Tysons is shorter if you booked a Boone Blvd appointment. Do not leave a clicking NAS running in a Del Ray office “until Friday.”',
      'Alexandria home offices and small firms often keep QuickBooks and photo archives on a single USB disk. When the enclosure dies, the SATA disk inside may still clone. Bring the whole unit if you are unsure how to open it. Evaluation is free once it reaches Columbia.',
      'Waterfront and marina devices: power them off. Do not charge a wet phone or “dry out” a laptop on a heater. Corrosion continues with power. Chip-level work is in Columbia, not at a King Street counter.',
    ],
    scenarios: [
      {
        title: 'Del Ray small business, failed boot drive',
        body: 'Windows would not start. The disk was still readable enough to clone. They avoided Startup Repair loops that would have written more.',
      },
    ],
    faqs: [
      { question: 'Do you have an Alexandria office?', answer: 'No. Columbia lab, or our Tysons office by appointment.' },
      { question: 'Where can Old Town businesses bring RAID disks?', answer: 'Drop them off at the Columbia lab, or book a Tysons appointment. Bring every member.' },
      { question: 'Phone recovery from Alexandria?', answer: 'Chip-level work is in Columbia. Power the phone off and stop charging it if it is wet.' },
      { question: 'Cost?', answer: 'Free evaluation, fixed quote, no data no charge on the recovery fee.' },
    ],
    relatedServiceIds: ['windows-recovery', 'raid-recovery', 'mobile-recovery', 'mac-recovery'],
    relatedLocationSlugs: ['columbia-md', 'arlington-va', 'tysons-va', 'washington-dc'],
  },
  'arlington-va': {
    kind: 'service-area',
    seoTitle: 'Data Recovery Arlington VA | Columbia Lab',
    seoDescription:
      'Arlington VA data recovery at DiskDoctor’s Columbia MD lab. RAID, SSD, phone. Free evaluation. Call (410) 937-7332.',
    directAnswer:
      'Arlington, Rosslyn, Ballston, and Crystal City data recovery is handled at the Columbia, MD lab. No Arlington storefront. Free evaluation. Call (410) 937-7332. Power down failed RAID and clicking disks.',
    heroDescription:
      'Arlington-area drive and phone recovery through Columbia. Contractor and office media welcome with chain-of-custody on request.',
    paragraphs: [
      'Arlington sits next to DC contractor offices and dense apartment NAS setups. When a disk fails, the correct next step is imaging, not another Disk Management “initialize” click.',
      'Service area of Columbia; Tysons office by appointment. Evaluation free.',
      'Rosslyn and Courthouse contractors: BitLocker laptops that vanish from BIOS are chip-level or firmware jobs, not “Startup Repair.” Bring the machine or the NVMe. We will not bypass agency account locks.',
      'Ballston and Virginia Square apartments: USB disks with taxes and photos fail in cheap enclosures. Unplug them. A clone in Columbia is cheaper than another week of Disk Management “initialize.”',
      'Crystal City and Pentagon City offices: RAID members should travel together. Photograph the slots. Do not hot-swap a new disk into a clicking array over a weekend.',
    ],
    scenarios: [
      {
        title: 'Ballston apartment, dying USB disk with taxes',
        body: 'The enclosure failed; the disk inside cloned cleanly in Columbia. Files returned the next day.',
      },
    ],
    faqs: [
      { question: 'Arlington office?', answer: 'No. Columbia lab; Tysons by appointment.' },
      { question: 'RAID in Crystal City?', answer: 'Bring all members to Columbia. Do not rebuild.' },
      { question: 'How long?', answer: '24–48 hours logical after arrival; 3–7 days physical/RAID.' },
      { question: 'Cost?', answer: 'Free evaluation. No data, no charge on the recovery fee.' },
    ],
    relatedServiceIds: ['raid-recovery', 'windows-recovery', 'data-security', 'mobile-recovery'],
    relatedLocationSlugs: ['washington-dc', 'columbia-md', 'tysons-va', 'alexandria-va'],
  },
  'annapolis-md': {
    kind: 'service-area',
    seoTitle: 'Data Recovery Annapolis MD | Columbia Lab',
    seoDescription:
      'Annapolis data recovery at DiskDoctor’s Columbia MD lab — not SEO services. Hard drive, RAID, phone. Free evaluation. Call (410) 937-7332.',
    directAnswer:
      'Annapolis and Anne Arundel County data recovery is done at the Columbia, MD lab. This is not an SEO or IT-retainer page. Failed drives and phones can be shipped from Annapolis or dropped in Columbia. Free evaluation. Call (410) 937-7332.',
    heroDescription:
      'Anne Arundel recovery through the Columbia laboratory. Hard drives, RAID, and phones — not “SEO strategies.”',
    paragraphs: [
      'Annapolis media fails the same way as everywhere else: marine-electronics laptops, home NAS units, and phones that went over a gunwale. Rice and freezer tricks waste time. Power down and send the device.',
      'No Annapolis storefront. Columbia lab. Evaluation free.',
      'From City Dock or West Annapolis, 50 west to 97 to 32 to Columbia is the usual drive. From Arnold and Severna Park, 97 north works. Overnight shipping from Anne Arundel often beats sitting on 50 on a Friday.',
      'Marine electronics and boat-soaked laptops: do not power them. Salt water plus a charger is how boards die. We recover what the NAND still holds after cleaning; we do not “fix the laptop” as a first step.',
      'State-adjacent offices in Annapolis: unclassified business media only on this public form. Follow your agency’s rules for anything else. Chain-of-custody is available when you ask.',
    ],
    scenarios: [
      {
        title: 'Eastport, drowned work phone',
        body: 'Chip-level extraction in Columbia recovered the camera roll after the board would not boot.',
      },
    ],
    faqs: [
      { question: 'Annapolis shop?', answer: 'No. Columbia, MD lab.' },
      { question: 'Boat-soaked drive?', answer: 'Do not power it. Ship or drop in Columbia. Corrosion gets worse with retries.' },
      { question: 'Naval Academy / government media?', answer: 'Unclassified personal and business media yes. Follow your organization’s rules for anything else.' },
      { question: 'Cost?', answer: 'Free evaluation. No data, no charge on the recovery fee.' },
    ],
    relatedServiceIds: ['mobile-recovery', 'windows-recovery', 'raid-recovery', 'photo-recovery'],
    relatedLocationSlugs: ['columbia-md', 'baltimore-md', 'washington-dc', 'alexandria-va'],
  },
  'frederick-md': {
    kind: 'service-area',
    seoTitle: 'Data Recovery Frederick MD | Columbia Lab',
    seoDescription:
      'Frederick MD data recovery via DiskDoctor’s Columbia lab. Hard drive, RAID, phone. Free evaluation. Call (410) 937-7332.',
    directAnswer:
      'Frederick County data recovery is performed in Columbia, MD. No Frederick storefront. Ship or drop failed drives and phones. Free evaluation. Call (410) 937-7332.',
    heroDescription:
      'Frederick-area recovery at the Columbia laboratory. Stop using a clicking disk. Do not rebuild a NAS.',
    paragraphs: [
      'Frederick, Urbana, and New Market jobs are often farm-office NAS units and workstation disks that clicked after a storm. Imaging in Columbia is the path. A fake downtown Frederick pin does not clone platters.',
      'From downtown Frederick, 70 east to 29 south is the usual drive to Old Columbia Rd. From Urbana and the 270 corridor, 70 or 270 to the Beltway also works. If the disk is clicking, do not copy “one more folder” before you leave.',
      'Storm and power-event failures are common in Frederick County: a NAS that clicked after a outage, a desktop that would not boot after a surge. Power down. A UPS does not repair a head stack that already started clicking.',
      'Contractors and farms running RAID 1 for invoices: bring both disks even if only one is clicking. The “healthy” mirror is often next. We clone both in Columbia.',
    ],
    scenarios: [
      {
        title: 'Frederick contractor, RAID 1 with one click',
        body: 'Both disks came to Columbia. The clicking member was cloned; the healthy mirror confirmed the file set.',
      },
    ],
    faqs: [
      { question: 'Frederick office?', answer: 'No. Columbia lab.' },
      { question: 'How to send a drive?', answer: 'Padded box, powered down, note with symptoms. Or drop in Columbia.' },
      { question: 'Timeline?', answer: '24–48 hours logical after arrival; 3–7 days physical.' },
      { question: 'Cost?', answer: 'Free evaluation. No data, no charge.' },
    ],
    relatedServiceIds: ['raid-recovery', 'windows-recovery', 'file-recovery', 'mobile-recovery'],
    relatedLocationSlugs: ['columbia-md', 'rockville-md', 'baltimore-md', 'potomac-md'],
  },
  'mclean-va': {
    kind: 'service-area',
    seoTitle: 'Data Recovery McLean VA | Tysons Office',
    seoDescription:
      'McLean VA data recovery via our Tysons office (by appointment) and Columbia MD lab. Free evaluation. Call (410) 937-7332.',
    directAnswer:
      'McLean data recovery uses the Tysons appointment office (8300 Boone Blvd Suite 513) and the Columbia lab. No McLean storefront. Call (410) 937-7332 before you drive to Tysons.',
    heroDescription:
      'McLean and Langley clients can meet us at the Tysons office by appointment or go straight to the Columbia lab. Recovery is laboratory work, not a mall kiosk.',
    paragraphs: [
      'McLean is minutes from the Tysons appointment suite. Imaging still happens in the Columbia lab. Book an appointment so the suite is staffed.',
      'From downtown McLean or Langley, Boone Blvd is a short drive. Call (410) 937-7332 first. An unscheduled visit to suite 513 is how people find a locked door. Columbia remains the laboratory if Tysons cannot meet that day.',
      'McLean household Fusion Drives and iMacs: the HDD side clicks while the SSD side still boots slowly. Do not run Disk Utility First Aid in a loop. Bring the machine or the pulled drives. We clone both parts of the pair.',
      'Professional offices along Chain Bridge and Old Dominion: BitLocker volumes and failing NVMe modules are routine. Bring the key. We return files on new media, not a “repaired” original you should trust as the only copy.',
    ],
    scenarios: [
      {
        title: 'McLean household, iMac Fusion Drive',
        body: 'The HDD side clicked. We cloned both parts of the Fusion pair in Columbia and returned a working disk image.',
      },
    ],
    faqs: [
      { question: 'McLean office?', answer: 'No. Tysons by appointment; lab in Columbia.' },
      { question: 'Can I walk into Tysons?', answer: 'Call first. Staff are not always present.' },
      { question: 'RAID?', answer: 'Bring every member. Do not rebuild.' },
      { question: 'Cost?', answer: 'Free evaluation. No data, no charge.' },
    ],
    relatedServiceIds: ['mac-recovery', 'raid-recovery', 'mobile-recovery', 'windows-recovery'],
    relatedLocationSlugs: ['tysons-va', 'great-falls-va', 'arlington-va', 'columbia-md'],
  },
  'great-falls-va': {
    kind: 'service-area',
    seoTitle: 'Data Recovery Great Falls VA | Columbia Lab',
    seoDescription:
      'Great Falls VA data recovery at DiskDoctor’s Columbia lab, with a Tysons office by appointment. Free evaluation. Call (410) 937-7332.',
    directAnswer:
      'Great Falls does not have a DiskDoctor office. Book an appointment at our Tysons office or use the Columbia lab. Free evaluation. Call (410) 937-7332.',
    heroDescription:
      'Great Falls and Reston-area recovery through Columbia, with our Tysons office by appointment. Not a park brochure.',
    paragraphs: [
      'Home NAS and workstation failures in Great Falls are imaged in Columbia. Book a Tysons appointment if that is a shorter drive. Power down clicking disks.',
      'Great Falls, Reston, and Herndon are not a park-brochure service. The work is cloning a clicking 8TB desktop disk or a 4-bay RAID under a home-office desk. Tysons is the closer office, by appointment; Columbia is the lab.',
      'Photo libraries on a single disk are the usual Great Falls failure. If the disk is clicking, stop the Lightroom catalog on that volume. Every extra spin is a write-adjacent risk. Bring the disk in a padded box.',
      'Mail-in from Great Falls: rigid box, two inches of padding, powered down, note with the folders that matter. We confirm receipt by email.',
      'Reston and Herndon neighbors use the same path: Tysons by appointment or Columbia lab. There is no Great Falls storefront and no park-ranger copy on this page. The job is cloning a failed disk.',
    ],
    scenarios: [
      {
        title: 'Great Falls home office, 8TB disk click',
        body: 'The drive was cloned in Columbia. Most of the photo library was intact because they stopped using it the same day.',
      },
    ],
    faqs: [
      { question: 'Local office?', answer: 'No. Tysons appointment or Columbia lab.' },
      { question: 'Mail-in?', answer: 'Yes. Padded box, powered down.' },
      { question: 'Timeline?', answer: '24–48 hours logical after arrival.' },
      { question: 'Cost?', answer: 'Free evaluation. No data, no charge.' },
    ],
    relatedServiceIds: ['file-recovery', 'raid-recovery', 'photo-recovery', 'windows-recovery'],
    relatedLocationSlugs: ['tysons-va', 'mclean-va', 'columbia-md', 'potomac-md'],
  },
  'potomac-md': {
    kind: 'service-area',
    seoTitle: 'Data Recovery Potomac MD | Columbia Lab',
    seoDescription:
      'Potomac MD data recovery via DiskDoctor’s Columbia lab. Hard drive, RAID, phone. Free evaluation. Call (410) 937-7332.',
    directAnswer:
      'Potomac and Bethesda-adjacent recoveries are done at the Columbia, MD lab. No Potomac storefront. Free evaluation. Call (410) 937-7332.',
    heroDescription:
      'Potomac-area drive and phone recovery at the Columbia laboratory. Stop using a failing disk.',
    paragraphs: [
      'Potomac home offices often run large photo and video volumes on desktop RAIDs. When a member clicks, power the box down and send every disk. Rebuilds are how the second disk dies.',
      'From Potomac Village, 189 to 495 to 29 is a common drive to Columbia. Bethesda-adjacent streets can also use Tysons by appointment if that is shorter. There is no Potomac storefront and no “Bethesda lab.”',
      'Video and photo archives on RAID 5 are the expensive Potomac case. One clicking member plus a rebuild is two holes in the stripe. Label the slots. Bring all disks. We reconstruct from clones in Columbia.',
      'Mac desktops and Fusion pairs are common in Potomac households. If Disk Utility cannot repair the volume, stop. First Aid on a clicking HDD is a write. Imaging is a read.',
      'Bethesda-adjacent clients can book a Tysons appointment if that is shorter than Columbia. Call (410) 937-7332 before you drive to Boone Blvd. The suite is not always staffed.',
    ],
    scenarios: [
      {
        title: 'Potomac household, RAID 5 photo archive',
        body: 'One disk clicking, rebuild not started. Columbia cloned all members and reconstructed the volume.',
      },
    ],
    faqs: [
      { question: 'Potomac office?', answer: 'No. Columbia lab.' },
      { question: 'Where do Bethesda clients bring a drive?', answer: 'Drop it off at the Columbia lab, or book an appointment at our Tysons office.' },
      { question: 'Timeline?', answer: '24–48 hours logical after arrival; 3–7 days RAID.' },
      { question: 'Cost?', answer: 'Free evaluation. No data, no charge.' },
    ],
    relatedServiceIds: ['raid-recovery', 'photo-recovery', 'mac-recovery', 'file-recovery'],
    relatedLocationSlugs: ['columbia-md', 'rockville-md', 'tysons-va', 'mclean-va'],
  },
};
