# Blog Posting & SEO Best Practices Guide

> For DiskDoctor Data Recovery — Blog Content Strategy  
> Last updated: March 11, 2026

---

## How Blog Posts Are Created

### The New Full-Page Editor

1. Navigate to `/admin/login` and log in
2. Go to `/admin/dashboard` — view all posts, filter by status (Published / Drafts / Scheduled)
3. Click **+ New Post** to open the full-page editor at `/admin/editor`
4. To edit an existing post, click **Edit** on any post in the dashboard

### Editor Features

The editor (at `/admin/editor`) has two main areas:

**Left — Content Area:**
- Large title input
- Excerpt field (shown on the blog listing page and in meta descriptions)
- Full-height rich text editor (Quill) with formatting toolbar:
  - Headers (H2, H3, H4), bold, italic, underline, strike
  - Text color, background color, alignment
  - Blockquotes, code blocks, lists (ordered/unordered)
  - Links, inline image uploads (auto-uploaded to Cloudinary)

**Right — Sidebar Sections:**

| Section | Fields |
|---|---|
| **Publish** | Status (Draft / Published / Scheduled), schedule date & time picker |
| **SEO** | Focus keyword, meta description (with 160 char counter), URL slug (auto-generated from title, editable) |
| **Featured Image** | Drag/click to upload (stored on Cloudinary, recommended 1200×630px) |
| **Categories & Tags** | Category dropdown, comma-separated tags |
| **Author** | Defaults to "DiskDoctor Team" |

**Live SEO Score:** A green/yellow/red dot next to the SEO section header shows quality based on keyword presence in title, content, and meta description.

### What Happens Under the Hood

When you create a blog post, the system:

1. **Saves to MongoDB** (`blogDB.blogs`) with these fields:
   - `id` — auto-generated UUID
   - `slug` — SEO-friendly URL slug (auto-generated from title, e.g. `hard-drive-recovery-guide`)
   - `title`, `content` (HTML), `excerpt`
   - `metaDescription` — custom meta description for search results
   - `focusKeyword` — target SEO keyword
   - `author`, `category`, `tags[]`
   - `featuredImage` — Cloudinary URL for the hero image
   - `status` — `draft`, `published`, or `scheduled`
   - `scheduledAt` — ISO datetime (for scheduled posts)
   - `readingTime`, `wordCount` — auto-calculated
   - `createdAt`, `updatedAt`

2. **Images uploaded to Cloudinary** — both inline (via editor) and featured images

3. **Blog URLs use slugs** — `/blog/hard-drive-recovery-guide` instead of `/blog/550e8400-...`
   - Old UUID URLs automatically 301-redirect to the slug URL
   - Slugs are auto-generated from the title but can be manually edited

4. **Server-side rendered** — full content is in the HTML for Google crawlers

5. **Sitemap auto-updated** — only published posts appear, using slug URLs

6. **Structured data injected** — BlogPosting + Breadcrumb JSON-LD on every blog page

7. **Scheduled publishing** — a cron job (cron-job.org, every 5 min) hits `/api/blogs/publish-scheduled` to auto-publish posts past their scheduled time

### Publishing Workflow

| Status | Behavior |
|---|---|
| **Draft** | Saved but not visible on the public blog |
| **Published** | Immediately live on `/blog` and in sitemap |
| **Scheduled** | Hidden until the scheduled date/time, then auto-published by cron |

### API Endpoints (for AI Automation)

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/blogs` | Public: published posts only. `?admin=true`: all posts |
| `POST` | `/api/blogs` | Create new post (FormData with all fields) |
| `GET` | `/api/blogs/[slug-or-id]` | Get single post by slug or UUID |
| `PUT` | `/api/blogs/[slug-or-id]` | Update existing post |
| `DELETE` | `/api/blogs/[slug-or-id]` | Delete post (also removes Cloudinary images) |
| `GET` | `/api/blogs/publish-scheduled` | Cron endpoint: publishes due scheduled posts |

---

## SEO-Optimized Blog Post Checklist

Use this checklist every time you write a blog post:

### Before Writing

- [ ] **Research a target keyword** — Use Google autocomplete, "People Also Ask", or free tools like Ubersuggest
- [ ] **Check search intent** — Google the keyword yourself. Are the top results guides? Lists? Match that format
- [ ] **Pick a specific topic** — "Data Recovery" is too broad. "How to Recover Data from a Water-Damaged iPhone" is specific and rankable

### In the Editor

#### Title
- [ ] Include the **target keyword** near the beginning
- [ ] Keep it **under 60 characters** (Google truncates longer titles)
- [ ] Make it compelling — use numbers, "How to", "Guide", "in 2026"
- [ ] Examples: "5 Signs Your Hard Drive Is About to Fail (And What to Do)", "RAID Recovery: A Complete Guide for Business Owners"

#### Excerpt
- [ ] Write a **custom excerpt** — don't leave it blank
- [ ] Keep it **150-160 characters** — this appears on the blog listing page

#### SEO Sidebar
- [ ] **Focus Keyword** — enter your target keyword (e.g., "hard drive recovery")
- [ ] **Meta Description** — write a compelling 120-160 char summary with a CTA ("Learn how...", "Free evaluation available")
- [ ] **URL Slug** — auto-generated, but review it. Aim for 3-5 words max (e.g., `hard-drive-recovery-guide`)
- [ ] **SEO Score dot** should be green (4-5/5)

#### Featured Image
- [ ] Upload a relevant, high-quality image (1200×630px recommended)
- [ ] This becomes the OG/social sharing image

#### Categories & Tags
- [ ] Pick the most relevant **category**
- [ ] Add **3-5 tags** separated by commas
- [ ] Keep tag names consistent across posts

#### Content Body
- [ ] **Minimum 1,000 words** — longer for competitive keywords
- [ ] Use **heading structure**: H2 for sections, H3 for sub-sections
- [ ] Include the **target keyword in the first 100 words**
- [ ] Use **related keywords** naturally (e.g., "disk failure", "data loss", "recovery service")
- [ ] Add **internal links** to service and location pages
- [ ] Break up text with bullet points, numbered lists, and short paragraphs
- [ ] Answer **common questions** — these can appear in "People Also Ask"

#### Status
- [ ] Set to **Published** (or **Scheduled** with a future date)
- [ ] If not ready, save as **Draft**

---

## Content Strategy — What to Write About

### Tier 1: High-Intent Keywords (Drive Leads)
| Topic | Target Keyword | Type |
|---|---|---|
| Emergency data recovery guide | "emergency data recovery" | How-to |
| Cost of data recovery | "data recovery cost" | Informational |
| How to choose a data recovery service | "best data recovery service" | Guide |
| Free vs paid recovery software | "data recovery software" | Comparison |

### Tier 2: Problem-Aware Keywords (Build Authority)
| Topic | Target Keyword | Type |
|---|---|---|
| Signs your hard drive is failing | "hard drive failure signs" | List |
| What to do when SSD is not detected | "SSD not detected" | How-to |
| RAID array rebuilt vs recovery | "RAID rebuild failed" | Guide |
| iPhone stuck on Apple logo | "iPhone won't turn on data" | How-to |

### Tier 3: Local SEO Keywords (Location Targeting)
| Topic | Target Keyword | Type |
|---|---|---|
| Data recovery services in Columbia MD | "data recovery Columbia MD" | Local |
| Government data recovery in DC | "government data recovery DC" | Niche local |
| Business data recovery in Northern VA | "data recovery Northern Virginia" | Local |

### Tier 4: Educational Content (Build Backlinks)
| Topic | Target Keyword | Type |
|---|---|---|
| Complete guide to preventing data loss | "how to prevent data loss" | Ultimate guide |
| Understanding RAID levels (0, 1, 5, 10) | "RAID levels explained" | Educational |
| How data recovery actually works | "data recovery process" | Behind-the-scenes |

---

## Publishing Frequency

- **Minimum:** 2 posts per week
- **Ideal:** 3-4 posts per week for the first 3 months
- **After 3 months:** 1-2 posts per week to maintain momentum
- **Consistency matters more than volume**

---

## After Publishing — Post-Publish Checklist

- [ ] **Request indexing in GSC** — URL Inspection → paste the blog URL → Request Indexing
- [ ] **Verify the page** — visit the live slug URL, check content, images, dark mode
- [ ] **Check structured data** — use [Rich Results Test](https://search.google.com/test/rich-results)
- [ ] **Share on social media** — OG image is pulled automatically from the featured image
- [ ] **Internal linking** — go back and add links from older relevant posts to the new one

---

## SEO Quick Reference

| Element | Optimal | Notes |
|---|---|---|
| Title | 50-60 chars | Include keyword near start |
| Meta Description | 120-160 chars | Fill in the SEO sidebar field |
| URL Slug | 3-5 words | Auto-generated from title, editable |
| Content Length | 1,000-2,500 words | Longer for competitive keywords |
| Featured Image | 1200×630px | Becomes OG/social image |
| Headings | H2 → H3 | Don't skip levels |
| Internal Links | 2-4 per post | Link to services and location pages |
| Tags | 3-5 per post | Keep consistent |
| Focus Keyword | 1 per post | Fill in SEO sidebar |
