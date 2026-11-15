import { BlogPost } from '@/lib/types';

// SEO content v5, batch 1 (C4): four posts, published one a week, oldest first, each on a Monday at
// 00:00 Pakistan time (19:00 UTC the Sunday before). Each one goes live on its scheduledAt date (see isLiveBlogPost in staticBlogPosts.ts); until then it is a 404 and is
// left out of /blog and the sitemap.

const ext = (href: string, text: string) => `<a href="${href}" target="_blank" rel="noopener">${text}</a>`;

const base = {
  author: 'DiskDoctor Team',
  category: 'Data Recovery',
  featuredImage: null,
  images: [],
  status: 'published' as const,
};

export const seoPostsV5: BlogPost[] = [
  {
    ...base,
    id: 'ssd-not-detected-or-showing-0-mb',
    slug: 'ssd-not-detected-or-showing-0-mb',
    title: 'SSD not detected or showing 0 MB? What it means and what to do',
    excerpt:
      'Your SSD vanished, shows 0 MB or a strange name like SATAFIRM S11? Here’s what failed, what not to try, and how the data can still be recovered.',
    metaDescription:
      'Your SSD vanished, shows 0 MB or a strange name like SATAFIRM S11? Here’s what failed, what not to try, and how the data can still be recovered.',
    focusKeyword: 'ssd not detected',
    tags: ['SSD recovery', 'data recovery tips'],
    scheduledAt: '2026-11-15T19:00:00.000Z',
    readingTime: 5,
    wordCount: 800,
    createdAt: '2026-11-15T19:00:00.000Z',
    updatedAt: '2026-11-15T19:00:00.000Z',
    keyTakeaways: [],
    faqs: [
      {
        question: 'Can recovery software fix an SSD that shows 0 MB?',
        answer:
          'No. Software only sees what the controller reports, and a controller in safe mode reports almost nothing. The fix happens at the controller level.',
      },
      {
        question: 'Is my data gone if the SSD isn’t detected?',
        answer:
          'Usually not. In most cases the controller has failed, not the memory chips. The data stays recoverable as long as nobody formats or reflashes the drive.',
      },
      {
        question: 'Should I update the firmware?',
        answer: 'Not on a drive that holds data you need. A firmware update can erase the drive’s map.',
      },
      {
        question: 'How long does SSD recovery take?',
        answer:
          'Logical recoveries usually take 24–48 hours. Controller and firmware repairs are physical jobs and usually take 3–7 days.',
      },
    ],
    sections: [
      {
        heading: '',
        content:
          '<p>An SSD rarely dies with a noise. One day it simply isn’t there. The laptop says “no bootable device”, Disk Utility or Disk Management doesn’t list it, or it shows up with the wrong size: 0 MB, 1 GB, or a strange model name instead of the brand. Portable SSDs do the same thing in their own way: the light blinks for a second and nothing mounts.</p><p>That usually means the drive’s controller has stopped working properly, not that the data is gone.</p>',
      },
      {
        heading: 'What’s actually going on',
        content:
          '<p>An SSD is flash memory chips run by a small computer, the controller. The controller keeps a map of where every piece of every file sits in the flash. That map changes all the time, because the controller spreads writes evenly and cleans up deleted blocks in the background.</p><p>When the controller’s firmware hits an error it can’t handle, it often drops into a safe mode. In that mode it reports a placeholder: a tiny capacity, a firmware name such as “SATAFIRM S11”, or nothing at all. The files are still on the chips. What’s missing is the controller’s ability to find them.</p>',
      },
      {
        heading: 'What not to do',
        content:
          '<ul><li><strong>Don’t install a firmware update to “fix” it.</strong> Firmware tools can reset the drive’s map, and with it any chance of reading your files.</li><li><strong>Don’t initialise, format or “repair” it</strong> when Windows or macOS asks. That writes new structures over the old ones.</li><li><strong>Don’t keep plugging it in.</strong> Each power-up gives a struggling controller another chance to make things worse.</li><li><strong>Don’t run recovery software.</strong> Software can only read what the controller shows it, and right now that’s nothing.</li><li><strong>Don’t take a portable SSD apart.</strong> On most portable SSDs the USB connection and the storage share one board, so there’s no “drive inside” to move to another enclosure.</li></ul>',
        insertCtaAfter: true,
      },
      {
        heading: 'What you can safely check',
        content:
          '<ol><li>Try a different cable and port once, and a different computer once.</li><li>On a desktop, check whether the drive appears in the BIOS or UEFI setup.</li><li>Write down the exact model and capacity from the label.</li></ol><p>If it still doesn’t show up correctly, stop there and keep the drive unplugged.</p>',
      },
      {
        heading: 'Why deleted files on an SSD are different',
        content: `<p>If your SSD works but you deleted something by mistake, act fast for a different reason. Most SSDs use ${ext('https://en.wikipedia.org/wiki/Trim_(computing)', 'TRIM')}, which tells the drive which blocks are free so it can erase them in the background. The longer the drive stays on, the less chance of getting deleted files back. Shut it down and contact us.</p>`,
      },
      {
        heading: 'How SSD recovery works in a lab',
        content:
          '<p>We identify the controller and its failure mode, then use specialised tools to talk to the controller below the operating system. The goal is to get the drive’s map working again long enough to make a full copy. Many modern SSDs encrypt everything with a key held inside the controller, so swapping the memory chips into another device usually doesn’t work. Repairing the controller’s access is the way in. Once we have a copy, we check the files you named and return them on new media.</p><p>Read more about <a href="/services/ssd-recovery">SSD and NVMe recovery</a>, or <a href="/mail-in-data-recovery">ship your drive to us free both ways</a>.</p>',
      },
    ],
  },
  {
    ...base,
    id: 'external-hard-drive-not-showing-up',
    slug: 'external-hard-drive-not-showing-up',
    title: 'External hard drive not showing up? Safe checks before you lose data',
    excerpt:
      'WD or Seagate external drive not showing up on your Mac or PC? Try these safe checks, learn what not to click, and know when to stop.',
    metaDescription:
      'WD or Seagate external drive not showing up on your Mac or PC? Try these safe checks, learn what not to click, and know when to stop.',
    focusKeyword: 'external hard drive not showing up',
    tags: ['hard drive recovery', 'data recovery tips'],
    scheduledAt: '2026-11-22T19:00:00.000Z',
    readingTime: 5,
    wordCount: 800,
    createdAt: '2026-11-22T19:00:00.000Z',
    updatedAt: '2026-11-22T19:00:00.000Z',
    keyTakeaways: [],
    faqs: [
      {
        question: 'Why does my external drive light up but not show on my computer?',
        answer:
          'The light only means it has power. The cause can be a bad cable, a file system the computer can’t read, or a failing drive. Try the safe checks, and stop if you hear clicking.',
      },
      {
        question: 'Is it safe to format the drive and then recover the files?',
        answer:
          'No. Formatting writes new data over the structures that hold your folder layout and can make recovery harder or impossible.',
      },
      {
        question: 'Can I take the drive out and put it in an enclosure?',
        answer: 'Not on many WD and some Seagate models. Their USB connector and encryption are on the drive’s own board.',
      },
      {
        question: 'What if the drive shows up but is very slow?',
        answer:
          'Slowness often means weak sectors. Copy your most important folder first, once, then stop. If it freezes, unplug it and contact us.',
      },
    ],
    sections: [
      {
        heading: '',
        content:
          '<p>You plug in your external drive and nothing happens. No icon on the desktop, nothing in Finder or File Explorer. Sometimes the light comes on. Sometimes the computer offers to “initialise” or “format” the disk. That offer is the most dangerous thing on the screen.</p><p>Here’s how to tell a cable problem from a failing drive without making it worse.</p>',
      },
      {
        heading: 'Step 1: the safe checks',
        content:
          '<ul><li><strong>Try another cable.</strong> USB cables, especially the short flat ones on portable drives, fail more often than drives do.</li><li><strong>Try another port and another computer.</strong> Plug straight into the computer, not a hub or dock.</li><li><strong>Desktop drives</strong> (WD My Book, Seagate Expansion Desktop) need their power adapter. Check it’s plugged in and the light is on.</li><li><strong>Look, don’t click.</strong> On Windows, open Disk Management. On a Mac, open Disk Utility and choose “Show All Devices”. If the drive appears there but not in File Explorer or Finder, note what it says: “Not Initialized”, “Unallocated”, “RAW”, or a size that looks wrong.</li></ul>',
      },
      {
        heading: 'Step 2: what not to click',
        content:
          '<ul><li><strong>“You need to format the disk before you can use it”</strong> means Windows can’t read the file system. Click Cancel. Formatting writes over the information we need to rebuild your folders.</li><li><strong>“Initialize disk”</strong> in Disk Management writes a new partition table. Don’t.</li><li><strong>First Aid, CHKDSK or repair tools</strong> try to “fix” the file system on hardware that may be failing, and on a weak drive the extra reading can finish it off.</li></ul>',
        insertCtaAfter: true,
      },
      {
        heading: 'Step 3: listen to the drive',
        content:
          '<p>Hold it close and listen. A steady, quiet spin is normal. Stop using the drive and unplug it if you hear:</p><ul><li>clicking or ticking that repeats;</li><li>beeping or buzzing (often a motor that can’t spin up);</li><li>grinding or scraping.</li></ul><p>These are physical failures. Every extra minute of power can damage the platters where your files sit. Our guide to <a href="/blog/why-is-my-external-hard-drive-clicking">why an external drive clicks</a> explains each sound.</p>',
      },
      {
        heading: 'Why you shouldn’t open the case',
        content:
          '<p>On many WD My Passport and some Seagate models, the USB connector is built into the hard drive’s own circuit board, so there’s no standard drive inside to move into a dock. Many WD drives also encrypt data on that board, even if you never set a password. Swap the board and the data becomes unreadable. Opening the case also voids the warranty and can let dust onto the platters.</p>',
      },
      {
        heading: 'When it’s time for a lab',
        content:
          '<p>Bring it to a lab when:</p><ul><li>the safe checks didn’t help;</li><li>the drive makes any of the sounds above;</li><li>it was dropped, got wet, or failed after a power surge;</li><li>the files are the only copy.</li></ul><p>We evaluate the drive for free and give you a fixed quote before any paid work. If we can’t recover the data you need, you don’t pay the recovery fee. See <a href="/services/hard-drive-recovery">hard drive recovery</a> or <a href="/mail-in-data-recovery">ship it to us free both ways</a>.</p>',
      },
    ],
  },
  {
    ...base,
    id: 'synology-volume-crashed',
    slug: 'synology-volume-crashed',
    title: 'Synology says "volume crashed": what to do and what not to click',
    excerpt:
      'Synology DSM says your volume or storage pool crashed? Here’s what it means, what not to click, and how to keep your data recoverable.',
    metaDescription:
      'Synology DSM says your volume or storage pool crashed? Here’s what it means, what not to click, and how to keep your data recoverable.',
    focusKeyword: 'synology volume crashed',
    tags: ['NAS recovery', 'RAID technology'],
    scheduledAt: '2026-11-29T19:00:00.000Z',
    readingTime: 5,
    wordCount: 850,
    createdAt: '2026-11-29T19:00:00.000Z',
    updatedAt: '2026-11-29T19:00:00.000Z',
    keyTakeaways: [],
    faqs: [
      {
        question: 'Can I fix a crashed Synology volume myself?',
        answer:
          'Sometimes DSM’s own repair works when only one disk failed and the others are healthy. If you can’t confirm that, or the data has no other copy, image the disks first.',
      },
      {
        question: 'Should I replace the failed disk and let it rebuild?',
        answer:
          'Only if you’re sure the remaining disks are healthy and you have a backup. A rebuild reads every sector of every disk, which is when a second weak disk tends to fail.',
      },
      {
        question: 'Do I need to send the whole NAS?',
        answer:
          'Usually just the disks, labelled with their bay numbers. Send the unit too if it uses an SSD cache or hardware encryption.',
      },
      {
        question: 'How long does NAS recovery take?',
        answer: 'RAID and NAS recoveries usually take 3–7 days, depending on the number and condition of the disks.',
      },
    ],
    sections: [
      {
        heading: '',
        content:
          '<p>DSM’s Storage Manager shows a red status: “Crashed”. Your shared folders are gone or read-only, and the NAS may be beeping. It’s one of the most stressful screens an office or home user can see, because the NAS was supposed to be the backup.</p><p>A crashed volume is often recoverable. What you do in the next hour decides how much.</p>',
      },
      {
        heading: 'What “crashed” means',
        content: `<p>A Synology volume sits on a storage pool, usually SHR or RAID 5/6, built from several disks. DSM marks the pool or volume as crashed when it can no longer keep it consistent. The usual causes:</p><ul><li>more disks failed than the RAID level can survive (two in SHR-1 or RAID 5);</li><li>a disk dropped out and a second failed during the rebuild;</li><li>the file system (Btrfs or ext4) was damaged, often after a power cut;</li><li>an SSD cache failed, especially a read-write cache.</li></ul><p>Synology’s own ${ext('https://kb.synology.com/en-af/DSM/tutorial/What_do_I_do_when_a_volume_crashes', 'knowledge base article on crashed volumes')} covers the official steps. The advice below is about protecting the data while you decide.</p>`,
      },
      {
        heading: 'What not to click',
        content:
          '<ul><li><strong>Repair.</strong> A repair is a rebuild. If another disk is weak, the rebuild is the most likely moment for it to fail, and a failed rebuild can scramble the data.</li><li><strong>Remove or create a pool, or reinstall DSM.</strong> These write new structures over the old ones.</li><li><strong>Swap disks around or pull and re-seat them while the NAS is on.</strong> Disk order matters for reconstruction.</li><li><strong>File system repair commands</strong> from the command line, unless you have a full copy of every disk first.</li></ul>',
        insertCtaAfter: true,
      },
      {
        heading: 'What to do instead',
        content:
          '<ol><li><strong>If shares are still readable,</strong> copy off the most important folders first, once. Don’t try to copy everything.</li><li><strong>If not, shut the NAS down from DSM</strong> (or hold the power button) rather than leaving it to retry.</li><li><strong>Label each disk with its bay number</strong> before removing anything, and take a photo of Storage Manager.</li><li><strong>Write down</strong> the model, the DSM version, the pool type (SHR, RAID 5, RAID 6), and what happened just before the crash: power cut, new disk, update.</li></ol>',
      },
      {
        heading: 'How we recover a crashed Synology',
        content:
          '<p>We never work on the original disks. Each disk is cloned in our lab, including the ones DSM marked as failed, which are often still readable. Synology’s SHR is built on standard Linux RAID and volume tools, so we can rebuild the pool from the clones in software, in the right order, and then rebuild the Btrfs or ext4 file system. We confirm the folders you named before we copy anything back.</p><p>For businesses we log intake and serial numbers, restrict access, and provide a written chain of custody on request.</p><p>Read more about <a href="/services/nas-recovery">NAS recovery</a> and <a href="/services/raid-recovery">RAID recovery</a>, or <a href="/contact">contact us</a> before you click anything.</p>',
      },
    ],
  },
  {
    ...base,
    id: 'business-data-recovery-chain-of-custody',
    slug: 'business-data-recovery-chain-of-custody',
    title: 'Business data recovery in Maryland, Virginia and DC: chain of custody and confidentiality',
    excerpt:
      'How a recovery lab should handle confidential business files: logged intake, restricted access, chain of custody and secure return, in MD, VA and DC.',
    metaDescription:
      'How a recovery lab should handle confidential business files: logged intake, restricted access, chain of custody and secure return, in MD, VA and DC.',
    focusKeyword: 'business data recovery chain of custody',
    tags: ['data recovery', 'business continuity'],
    category: 'Business',
    scheduledAt: '2026-12-06T19:00:00.000Z',
    readingTime: 5,
    wordCount: 800,
    createdAt: '2026-12-06T19:00:00.000Z',
    updatedAt: '2026-12-06T19:00:00.000Z',
    keyTakeaways: [],
    faqs: [
      {
        question: 'Will you look through our files?',
        answer: 'Only enough to confirm the recovery worked, usually the folders you list. Files aren’t browsed beyond that.',
      },
      {
        question: 'Can you provide a written chain of custody?',
        answer: 'Yes, on request. It records intake, handling and return of the device and data.',
      },
      {
        question: 'Do you keep a copy of our data?',
        answer: 'We keep the recovered data only until you confirm you received it, then delete our working copy.',
      },
      {
        question: 'Can you recover an encrypted server or laptop?',
        answer: 'Yes, if you have the keys. We recover the encrypted data and you unlock it.',
      },
    ],
    sections: [
      {
        heading: '',
        content:
          '<p>When a law firm’s file server, a clinic’s workstation or a contractor’s project NAS fails, getting the data back is only half the job. The other half is knowing who handled the drive, who could see the files, and where every copy went.</p><p>Here’s what to expect from a recovery lab, and how to prepare your office.</p>',
      },
      {
        heading: 'What chain of custody means in data recovery',
        content: `<p>Chain of custody is a record of who had the device, when, and what was done to it. Forensic guidance such as ${ext('https://csrc.nist.gov/pubs/sp/800/86/final', 'NIST SP 800-86')} treats it as basic practice for any evidence that may matter later. For a business recovery it should cover:</p><ul><li><strong>Intake:</strong> the device logged on arrival, with photos of its serial numbers;</li><li><strong>Access:</strong> only the technicians working on the case at the bench;</li><li><strong>Work:</strong> a record of what was cloned, rebuilt and recovered;</li><li><strong>Viewing:</strong> files opened only to confirm the recovery worked, never browsed;</li><li><strong>Return:</strong> data delivered on new media, encrypted on request, plus a written chain-of-custody record if you ask for one.</li></ul>`,
      },
      {
        heading: 'Before the drive leaves your office',
        content:
          '<ol><li><strong>Name one contact</strong> who can approve the quote and receive the data.</li><li><strong>List the serial numbers</strong> of the drives or server you’re sending.</li><li><strong>List the folders that matter most,</strong> so the lab can check those first.</li><li><strong>Have the encryption keys ready.</strong> BitLocker, FileVault or NAS encryption keys stay with you; the lab recovers the encrypted data and you unlock it.</li><li><strong>Stop the do-it-yourself attempts.</strong> Recovery software, CHKDSK and RAID rebuilds on failing disks are the most common reasons a recoverable job gets harder.</li><li><strong>Say what kind of data it is.</strong> If it includes patient records, client files or regulated data, say so on the form so it’s handled accordingly.</li></ol>',
        insertCtaAfter: true,
      },
      {
        heading: 'Government and classified media',
        content:
          '<p>Unclassified business, legal and home-office media can come straight to a lab. Classified media, and devices your agency controls, must follow your agency’s own procedure first. A commercial lab shouldn’t accept them otherwise.</p>',
      },
      {
        heading: 'Turnaround for a business outage',
        content:
          '<p>Logical recoveries usually take 24–48 hours after the device arrives. Physical failures and RAID arrays usually take 3–7 days. Emergency handling is available when a business is down, and the evaluation stays free either way.</p>',
      },
      {
        heading: 'Where to bring it',
        content:
          '<ul><li><strong>Maryland and DC:</strong> our Columbia, MD lab, weekdays 8:30 a.m.–5:00 p.m.</li><li><strong>Northern Virginia:</strong> our Tysons office, by appointment.</li><li><strong>Anywhere:</strong> ship it to us, with free shipping both ways.</li></ul><p>See <a href="/services/server-recovery">server data recovery</a>, <a href="/washington-dc">data recovery in Washington, DC</a>, <a href="/tysons-va">our Tysons office</a>, or <a href="/contact">contact us</a>.</p>',
      },
    ],
  },
];
