# Google Search Console — Status & History

> Property: `diskdoctorsamerica.com`  
> Last updated: March 11, 2026

---

## Current Status (as of March 11, 2026)

### Performance
- **95 total web search clicks** (Dec 2025 — Mar 2026)
- Impressions trending up: **148-160/day** in early March (vs 33-50/day in December)
- The `/locations` page recently got more impressions than usual

### Indexing
- **11 indexed pages**
- **32 not-indexed pages** (was 38 in Dec 2025, trending down slowly)

### Indexing Issue Breakdown

| Issue | Count | Status |
|---|---|---|
| Crawled - currently not indexed | 23 | Content quality signal — Google chose not to index (mostly templated location/service pages) |
| Page with redirect | 4 | Expected — `/home` → `/` redirect and www/non-www variants |
| Discovered - currently not indexed | 3 | Indexing requested for `/blog` and other pages |
| Soft 404 | 2 | **Fixed** — caused by ghost `/about` and `/contact` pages removed from sitemap |

### Sitemap
- **URL:** `https://www.diskdoctorsamerica.com/sitemap.xml`
- **Status:** Success
- **Discovered pages:** 35
- **First submitted:** Sep 4, 2025
- **Last read by Google:** Mar 4, 2026
- **Changed:** Now only includes published blog posts with SEO-friendly slug URLs

### Enhancements Detected
- ✅ HTTPS
- ✅ FAQ (1 valid item — homepage)
- ✅ Review snippets (1 valid item)
- ✅ Breadcrumbs (added to blog pages)
- ✅ BlogPosting structured data (added to all blog detail pages)

---

## What We Did (March 11, 2026)

### Phase 1 — Critical SEO Fixes (commit `a34de3a`)
1. **Fixed robots.txt** — was blocking `sitemap.xml` via `Disallow: /*.xml$` rule
2. **Cleaned sitemap** — removed ghost `/about` and `/contact` pages (soft 404s)
3. **SSR'd blog pages** — content is now server-rendered and visible to crawlers
4. **Added BlogPosting JSON-LD** — structured data for blog posts
5. **Fixed OG images** — generated all missing image assets
6. **Unified URLs** — all structured data uses `www.diskdoctorsamerica.com`

### Phase 2 — Blog System Overhaul (commit `d5e6253`)
1. **Full-page blog editor** — WordPress-like experience at `/admin/editor`
2. **SEO fields** — focus keyword, meta description, URL slug, featured image, categories, author
3. **SEO-friendly slug URLs** — `/blog/hard-drive-recovery-guide` instead of UUID URLs
4. **Old UUID URLs 301-redirect** to new slug URLs (preserves any existing link juice)
5. **Draft/Publish/Schedule workflow** — drafts hidden from public, scheduled auto-publishes via cron
6. **Admin dashboard upgraded** — status tabs, stats, edit/view/delete buttons
7. **Dark mode fix** — blog content text now visible in dark mode
8. **Sitemap updated** — only published posts, using slug URLs

### Phase 2 — Bug Fixes
1. **Migration script DB name** — fixed from `diskdoctor` to `blogDB` (commit `adfd117`)
2. **Dark mode text color** — override Quill inline black styles (commit `548cad6`)
3. **Slug auto-generation** — prevent concatenation bug with slugTouched ref (commit `904bf0a`)

### Actions Taken in GSC
1. URL Inspection & Indexing requested for key pages
2. Sitemap resubmitted after ghost page removal

---

## Understanding the "Crawled - Not Indexed" Issue

**23 pages** are "Crawled - currently not indexed." This is NOT a technical problem — Google decided these pages don't have enough unique value.

**Why:** Templated location/service pages with similar content structure, low domain authority, no backlinks.

**How it gets fixed organically:**
1. **Blog content** — regular publishing builds site authority
2. **Backlinks** — as blog gains traction, other sites link to it
3. **User signals** — more traffic → Google sees value → indexes more
4. **Google My Business** — active GMB profiles boost local indexing
5. **Unique content** — adding unique testimonials/case studies to location pages

---

## Next Steps

### Immediate (This Week)
- [ ] Start publishing blogs (2-4 posts, see `BLOG_SEO_GUIDE.md`)
- [ ] After each post, request indexing via GSC URL Inspection
- [ ] Verify new blog posts appear in sitemap with slug URLs

### Short-Term (Next 2-4 Weeks)
- [ ] Publish 8-12 blog posts to build content foundation
- [ ] Set up **Google Analytics 4** to track traffic
- [ ] Check GSC weekly — monitor indexed page count and blog performance
- [ ] Verify BlogPosting and Breadcrumb enhancements appear in GSC
- [ ] After first posts are indexed, check Performance → Queries for blog keywords

### Medium-Term (Month 2-3)
- [ ] Analyze which blog posts get impressions/clicks — double down on those topics
- [ ] Start building backlinks (guest posts, directory listings, industry sites)
- [ ] Set up Google My Business for Columbia MD head office
- [ ] Add unique content to location pages to help them get indexed
- [ ] Review scheduled publishing workflow — scale up AI-automated posting

### How to Check Progress
1. **GSC → Pages** — watch "Indexed" count increase
2. **GSC → Performance** — monitor clicks and impressions weekly
3. **GSC → URL Inspection** — spot-check specific blog post URLs
4. **Site search** — Google `site:diskdoctorsamerica.com` to see all indexed pages

---

## Key URLs for Reference

| Tool | URL |
|---|---|
| Google Search Console | https://search.google.com/search-console |
| Rich Results Test | https://search.google.com/test/rich-results |
| PageSpeed Insights | https://pagespeed.web.dev/ |
| Facebook Sharing Debugger | https://developers.facebook.com/tools/debug/ |
| Sitemap (live) | https://www.diskdoctorsamerica.com/sitemap.xml |
| Robots.txt (live) | https://www.diskdoctorsamerica.com/robots.txt |
| Cron Job Dashboard | https://cron-job.org |
