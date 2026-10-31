// P2 blog cleanup (Nov 2026): rename the "-2" slugs and refresh the 2023 myths post for 2026.
//
//   node --env-file=.env scripts/blog-cleanup-2026.mjs           dry run: prints what would change
//   node --env-file=.env scripts/blog-cleanup-2026.mjs --apply   writes to MongoDB (backs the posts up first)
//
// The site already 301s the old slugs and serves the new ones from the old records
// (src/data/blogSlugs.ts), so this can run before or after the deploy.
import { createRequire } from 'module';
import { writeFileSync } from 'fs';

const require = createRequire(import.meta.url);
const { MongoClient } = require('mongodb');

const APPLY = process.argv.includes('--apply');

const renames = {
  'cloud-data-recovery-solutions-for-lost-files-2': 'cloud-data-recovery-solutions-for-lost-files',
  'data-loss-prevention-best-practices-for-maryland-residents-2': 'data-loss-prevention-best-practices-for-maryland-residents',
  'data-recovery-for-maryland-residents-common-scenarios-soluti-2': 'data-recovery-for-maryland-residents-common-scenarios-solutions',
  'data-recovery-myths-what-you-need-to-know-in-2023-2': 'data-recovery-myths-what-you-need-to-know',
  'emergency-data-recovery-for-power-surge-damage-2': 'emergency-data-recovery-for-power-surge-damage',
  'hard-drive-clicking-causes-and-recovery-solutions-2': 'hard-drive-clicking-causes-and-recovery-solutions',
  'understanding-data-recovery-options-for-business-continuity-2': 'understanding-data-recovery-options-for-business-continuity',
};

const MYTHS_OLD_SLUG = 'data-recovery-myths-what-you-need-to-know-in-2023-2';

// [sectionIndex, find, replace]: each find must match exactly once.
const mythSectionEdits = [
  [0,
    "As we step into 2023, it's time to debunk these misconceptions. This article will shed light on common data recovery myths, the realities behind them, and actionable tips to safeguard your data.",
    'In 2026, with more of our files on SSDs, NAS units and cloud accounts, these misconceptions still cost people their data. This article sets out the most common data recovery myths, the reality behind each one, and what to do instead.'],
  [1,
    '</li> </ul> <p>Each of these myths',
    '</li> <li><strong>Myth 6:</strong> An SSD can always be recovered like a hard drive.</li> <li><strong>Myth 7:</strong> A RAID rebuild will bring the data back.</li> </ul> <p>Each of these myths'],
  [2,
    'Many assume that data recovery services come with a hefty price tag. However, options exist for various budgets, and many companies offer free evaluations to assess the situation before proceeding.',
    'Many assume data recovery always comes with a hefty price tag. Cost depends on what failed: a deleted folder on a healthy drive is a very different job from a clicking drive or a degraded RAID. At DiskDoctor the evaluation is free, you get a fixed quote before any paid work, and if we can’t recover the data you need, you don’t pay the recovery fee. <a href="/data-recovery-cost">See what affects the cost</a>.'],
  [2,
    'Strange noises can indicate a mechanical failure, but it’s not always a death sentence for your data. Professional services can often recover data even from failing drives if they are contacted promptly.</p>',
    'Clicking, beeping or grinding usually means a mechanical fault, often failing heads. It is not a death sentence for your data, but every extra power-on can scratch the platters. Power the drive down and get it to a lab with a clean room. <a href="/services/hard-drive-recovery">Read about hard drive recovery</a>.</p> <h3>Myth 6: An SSD Can Always Be Recovered Like a Hard Drive</h3> <p>SSDs fail differently. A controller or firmware fault can hide data that is still intact on the flash chips, and that is often recoverable. But when you delete files or format an SSD, TRIM tells the drive to erase those blocks in the background, and erased flash can’t be read back. Stop using the drive straight away. <a href="/services/ssd-recovery">Read about SSD and NVMe recovery</a>.</p> <h3>Myth 7: A RAID Rebuild Will Bring the Data Back</h3> <p>A rebuild is a heavy write operation across every remaining disk. If a second disk is already weak, the rebuild is often what takes the whole array down. Power the array down, label the disks by slot and send every member, including the ones marked failed. <a href="/services/raid-recovery">Read about RAID recovery</a>.</p>'],
  [5,
    'Our experts are ready to help you recover your valuable data and guide you in implementing effective prevention strategies.',
    'Our ISO 9001 certified Columbia, MD lab has been recovering data since 1991. For emergencies, call our 24/7 line at (410) 937-7332.'],
];

const mythFields = {
  title: 'Data Recovery Myths: What You Need to Know in 2026',
  metaDescription:
    'Seven data recovery myths that still cost people files in 2026, from clicking drives to SSD TRIM and RAID rebuilds, and what to do instead.',
  excerpt:
    'Seven common data recovery myths, from deleted files and clicking drives to SSD TRIM and RAID rebuilds, and what to do instead in 2026.',
  keyTakeaways: [
    'Deleted files and clicking drives are often recoverable if you stop using the device straight away.',
    'SSDs and RAID arrays have their own risks: TRIM can erase deleted data, and a rebuild can destroy a degraded array.',
    'A free evaluation and fixed quote tell you the real cost before any paid work.',
  ],
};

const mythExtraFaqs = [
  {
    question: 'Is data recovery always expensive?',
    answer:
      'Not always. Cost depends on what failed and how much work the recovery takes. DiskDoctor’s evaluation is free, you get a fixed quote before any paid work, and there’s no recovery fee if we can’t recover the data you need.',
  },
  {
    question: 'Can a TRIMmed SSD be recovered?',
    answer:
      'Usually not. Once TRIM has erased the blocks, the data is gone. Power the SSD down as soon as you notice the loss and get it evaluated.',
  },
];

const countWords = (doc) =>
  (doc.sections || [])
    .map((s) => `${s.heading || ''} ${s.content || ''}`)
    .join(' ')
    .replace(/<[^>]+>/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length;

const client = new MongoClient(process.env.MONGODB_URI);
await client.connect();
const blogs = client.db('blogDB').collection('blogs');

const oldSlugs = Object.keys(renames);
const docs = await blogs.find({ slug: { $in: oldSlugs } }).toArray();
const clashes = await blogs.find({ slug: { $in: Object.values(renames) } }).toArray();
if (clashes.length) throw new Error(`New slugs already in use: ${clashes.map((d) => d.slug).join(', ')}`);

const updates = [];
for (const doc of docs) {
  const set = { slug: renames[doc.slug] };

  if (doc.slug === MYTHS_OLD_SLUG) {
    const sections = doc.sections.map((s) => ({ ...s }));
    for (const [index, find, replace] of mythSectionEdits) {
      const count = sections[index].content.split(find).length - 1;
      if (count !== 1) throw new Error(`Myths section ${index}: expected 1 match, found ${count}: ${find.slice(0, 60)}`);
      sections[index].content = sections[index].content.replace(find, replace);
    }
    const stamp = Date.now();
    const faqs = [
      ...(doc.faqs || []),
      ...mythExtraFaqs.map((faq, i) => ({ ...faq, id: `faq_${stamp}_${(doc.faqs || []).length + i}` })),
    ];
    const wordCount = countWords({ sections });
    Object.assign(set, mythFields, {
      sections,
      faqs,
      wordCount,
      readingTime: Math.max(1, Math.round(wordCount / 200)),
      updatedAt: new Date().toISOString(),
    });
  }
  updates.push({ doc, set });
}

const missing = oldSlugs.filter((slug) => !docs.some((d) => d.slug === slug));
console.log(`${APPLY ? 'APPLY' : 'DRY RUN'}: ${updates.length} posts to update${missing.length ? `; not found: ${missing.join(', ')}` : ''}`);
for (const { doc, set } of updates) {
  const fields = Object.keys(set).filter((k) => k !== 'slug');
  console.log(`  ${doc.slug}\n    -> ${set.slug}${fields.length ? `\n    also: ${fields.join(', ')}` : ''}`);
}

if (APPLY) {
  const backup = `blog-cleanup-backup-${Date.now()}.json`;
  writeFileSync(backup, JSON.stringify(updates.map(({ doc }) => doc), null, 2));
  console.log(`Backup of the original posts: ${backup}`);
  for (const { doc, set } of updates) {
    await blogs.updateOne({ _id: doc._id, slug: doc.slug }, { $set: set });
  }
  console.log('Done.');
}

await client.close();
