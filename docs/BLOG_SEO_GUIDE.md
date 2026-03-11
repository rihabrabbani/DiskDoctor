# Blog Posting & SEO Best Practices Guide

> For DiskDoctor Data Recovery — Blog Content Strategy

---

## How Blog Posts Are Created

### Admin Panel

1. Navigate to `/admin/login`
2. Log in with admin credentials
3. Go to `/admin/dashboard`
4. Use the blog editor to create/edit/delete posts

### What Happens Under the Hood

When you create a blog post, the system:

1. **Creates a blog entry in MongoDB** with these fields:
   - `id` — auto-generated UUID
   - `title` — the blog title
   - `content` — full HTML content (from the rich text editor)
   - `excerpt` — short description (auto-generated from content if not provided, first 150 chars)
   - `tags` — comma-separated tags (stored as array)
   - `images` — array of Cloudinary URLs (extracted from content + uploaded files)
   - `createdAt` / `updatedAt` — ISO timestamps

2. **Images are uploaded to Cloudinary** automatically when added via the editor or file input

3. **The blog detail page** (`/blog/[id]`) is server-side rendered — fetches directly from MongoDB, so Google sees the full content immediately

4. **The sitemap** (`/sitemap.xml`) auto-includes new blog posts with their creation date

5. **Structured data** (BlogPosting JSON-LD) is automatically injected into the page head

---

## SEO-Optimized Blog Post Checklist

Use this checklist every time you write a blog post:

### Before Writing

- [ ] **Research a target keyword** — Use Google autocomplete, "People Also Ask", or free tools like Ubersuggest to find what people search for
- [ ] **Check search intent** — Google the keyword yourself. Are the top results guides? Lists? Product pages? Match that format
- [ ] **Pick a specific topic** — "Data Recovery" is too broad. "How to Recover Data from a Water-Damaged iPhone" is specific and rankable

### Title (Critical for CTR)

- [ ] **Include the target keyword** near the beginning of the title
- [ ] **Keep it under 60 characters** (Google truncates longer titles)
- [ ] **Make it compelling** — use numbers, "How to", "Guide", "in 2026" to increase clicks
- [ ] **Examples of good titles:**
  - "5 Signs Your Hard Drive Is About to Fail (And What to Do)"
  - "RAID Recovery: A Complete Guide for Business Owners"
  - "SSD vs HDD: Which Is Easier to Recover Data From?"
  - "What to Do When Your Laptop Won't Turn On — Data Recovery Steps"

### Excerpt / Meta Description

- [ ] **Write a custom excerpt** — don't let it auto-generate from the first 150 chars
- [ ] **Keep it 150-160 characters** — this becomes the meta description in search results
- [ ] **Include the target keyword** naturally
- [ ] **Include a call to action** — "Learn how...", "Find out why...", "Call for free evaluation"
- [ ] **Example:** "Lost files after a hard drive crash? Learn the 7 steps to maximize your chances of successful data recovery. Free evaluation available."

### Content Body

- [ ] **Minimum 1,000 words** — longer content tends to rank better for informational queries
- [ ] **Use heading structure properly:**
  - H1: Blog title (automatically set)
  - H2: Main sections
  - H3: Subsections
- [ ] **Include the target keyword** in the first 100 words
- [ ] **Use related keywords** naturally throughout (e.g., if targeting "hard drive recovery", also use "disk failure", "data loss", "recovery service")
- [ ] **Add internal links** to your service pages and location pages:
  - "Our [Windows recovery service](/services/windows-recovery) can help..."
  - "If you're in the DC area, visit our [Washington DC location](/washington-dc)..."
- [ ] **Break up text** with bullet points, numbered lists, and short paragraphs
- [ ] **Answer common questions** — these can appear in Google's "People Also Ask" boxes

### Images

- [ ] **Add at least one relevant image** per blog post
- [ ] **Use descriptive file names** before uploading (e.g., `hard-drive-recovery-process.jpg` not `IMG_4521.jpg`)
- [ ] **The first image becomes the OG image** for social sharing — make it count
- [ ] **Recommended size:** 1200x630px for the featured/first image (optimal for social sharing)

### Tags

- [ ] **Add 3-5 relevant tags** separated by commas
- [ ] **Use consistent tag names** across posts (e.g., always use "Hard Drive Recovery" not sometimes "HDD Recovery")
- [ ] **Good tag examples:** `Data Recovery, Hard Drive, SSD, RAID, Tips, How To, Business, Emergency`
- [ ] **Tags help with** internal blog filtering and can be used as keywords in meta tags

---

## Content Strategy — What to Write About

### Tier 1: High-Intent Keywords (Drive Leads)
These target people actively looking for recovery services:

| Topic | Target Keyword | Type |
|---|---|---|
| Emergency data recovery guide | "emergency data recovery" | How-to |
| Cost of data recovery | "data recovery cost" | Informational |
| How to choose a data recovery service | "best data recovery service" | Guide |
| Free vs paid recovery software | "data recovery software" | Comparison |

### Tier 2: Problem-Aware Keywords (Build Authority)
These target people who have a problem but don't know they need recovery:

| Topic | Target Keyword | Type |
|---|---|---|
| Signs your hard drive is failing | "hard drive failure signs" | List |
| What to do when SSD is not detected | "SSD not detected" | How-to |
| RAID array rebuilt vs recovery | "RAID rebuild failed" | Guide |
| iPhone stuck on Apple logo — data recovery | "iPhone won't turn on data" | How-to |

### Tier 3: Local SEO Keywords (Location Targeting)
Write location-specific content to boost local pages:

| Topic | Target Keyword | Type |
|---|---|---|
| Data recovery services in Columbia MD | "data recovery Columbia MD" | Local landing |
| Government data recovery in Washington DC | "government data recovery DC" | Niche local |
| Business data recovery in Northern Virginia | "data recovery Northern Virginia" | Local landing |

### Tier 4: Educational Content (Build Backlinks)
These attract links from other sites:

| Topic | Target Keyword | Type |
|---|---|---|
| Complete guide to preventing data loss | "how to prevent data loss" | Ultimate guide |
| Understanding RAID levels (0, 1, 5, 10) | "RAID levels explained" | Educational |
| How data recovery actually works (process) | "data recovery process" | Behind-the-scenes |

---

## Publishing Frequency

- **Minimum:** 2 posts per week
- **Ideal:** 3-4 posts per week for the first 3 months
- **After 3 months:** 1-2 posts per week to maintain momentum
- **Consistency matters more than volume** — better to do 2/week reliably than 5 one week and 0 the next

---

## After Publishing — Post-Publish Checklist

- [ ] **Request indexing in GSC** — Go to Google Search Console → URL Inspection → paste the blog URL → Request Indexing
- [ ] **Verify the page renders correctly** — Visit the live URL and check that content, images, and formatting look right
- [ ] **Check structured data** — Use [Rich Results Test](https://search.google.com/test/rich-results) to verify BlogPosting schema
- [ ] **Share on social media** — share the post link (OG image will be pulled automatically)
- [ ] **Internal linking** — go back and add links from older relevant posts to the new one

---

## SEO Quick Reference

| Element | Optimal Length | Notes |
|---|---|---|
| Title | 50-60 chars | Include keyword near start |
| Meta Description / Excerpt | 150-160 chars | Write a compelling summary with CTA |
| URL slug | 3-5 words | Currently UUID-based — will be fixed in Phase 2 |
| Content length | 1,000-2,500 words | Longer for competitive keywords |
| Images | At least 1 | First image = OG/social sharing image |
| Headings | H2 for sections, H3 for sub | Don't skip heading levels |
| Internal links | 2-4 per post | Link to services and location pages |
| Tags | 3-5 per post | Keep consistent across posts |
