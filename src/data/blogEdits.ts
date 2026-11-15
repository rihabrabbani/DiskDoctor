// Per-post edits applied when a post is read (SEO change list v5): shorter <title>s, and text edits
// to posts stored in MongoDB. The database records stay as they are.

type BlogEdit = {
  /** Replaces the <title> only; the H1 and URL stay as they are. */
  metaTitle?: string;
  /** Exact HTML replacements, applied to the post content and every section. */
  replace?: [string | RegExp, string][];
};

const BLOG_EDITS: Record<string, BlogEdit> = {
  'data-recovery-for-maryland-residents-common-scenarios-solutions': {
    metaTitle: 'Data Recovery in Maryland: Common Scenarios',
    replace: [
      // S4: the phone and memory-card scenarios go; the rest are renumbered 1–3.
      [/<h3>3\. Mobile Device Data Loss<\/h3>\s*<p>[\s\S]*?<\/p>\s*/, ''],
      [/<h3>5\. Flash Drive and Memory Card Issues<\/h3>\s*<p>[\s\S]*?<\/p>\s*/, ''],
      ['<h3>4. Server Failures</h3>', '<h3>3. Server Failures</h3>'],
    ],
  },
  'mastering-water-damaged-data-recovery-in-easy-steps': {
    replace: [
      [
        "Whether it's a smartphone dropped in the pool or a laptop caught in the rain",
        "Whether it's an external drive caught in a basement flood or a laptop caught in the rain",
      ],
      // S3: the link pointed at a removed page.
      [
        'Devices like <a href="/services/mobile-device-recovery">mobile phones</a> and laptops often have',
        'Devices like laptops and external drives often have',
      ],
      ['Carefully remove any batteries, SIM cards, or memory cards.', 'Carefully remove any batteries and detachable drives.'],
    ],
  },
  'understanding-data-recovery-options-for-business-continuity': {
    metaTitle: 'Data Recovery Options for Business Continuity',
  },
  'data-loss-prevention-best-practices-for-maryland-residents': {
    metaTitle: 'Data Loss Prevention Tips for Maryland',
  },
  // SEO content v5 posts: the <title> is shorter than the H1.
  'ssd-not-detected-or-showing-0-mb': { metaTitle: 'SSD Not Detected or Showing 0 MB?' },
  'external-hard-drive-not-showing-up': { metaTitle: 'External Drive Not Showing Up? Safe Checks' },
  'synology-volume-crashed': { metaTitle: 'Synology Volume Crashed? What to Do First' },
  'business-data-recovery-chain-of-custody': { metaTitle: 'Business Data Recovery and Chain of Custody' },
};

export const blogMetaTitle = (slug: string, title: string) => BLOG_EDITS[slug]?.metaTitle ?? title;

const editHtml = (html: string, edits: BlogEdit['replace'] = []) =>
  edits.reduce((out, [from, to]) => out.replace(from, to), html);

export function applyBlogEdits<T extends { slug: string; content?: string; sections?: { content: string }[] }>(blog: T): T {
  const edits = BLOG_EDITS[blog.slug]?.replace;
  if (!edits) return blog;
  return {
    ...blog,
    content: blog.content ? editHtml(blog.content, edits) : blog.content,
    sections: blog.sections?.map((section) => ({ ...section, content: editHtml(section.content, edits) })),
  };
}
