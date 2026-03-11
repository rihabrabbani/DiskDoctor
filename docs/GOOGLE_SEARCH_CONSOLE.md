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
| Crawled - currently not indexed | 23 | Ongoing — content quality signal, Google chose not to index these |
| Page with redirect | 4 | Expected — includes `/home` → `/` redirect and www/non-www variants |
| Discovered - currently not indexed | 3 | Indexing requested for `/blog` and other pages |
| Soft 404 | 2 | **Fixed** — was caused by `/about` and `/contact` ghost pages in sitemap |

### Sitemap
- **URL:** `https://www.diskdoctorsamerica.com/sitemap.xml`
- **Status:** Success
- **Discovered pages:** 35
- **First submitted:** Sep 4, 2025
- **Last read by Google:** Mar 4, 2026

### Enhancements Detected
- ✅ HTTPS
- ✅ FAQ (1 valid item — homepage)
- ✅ Review snippets (1 valid item)
- ✅ Breadcrumbs (will appear after next crawl — just added to blog pages)

---

## What We Did (March 11, 2026)

### Fixes Pushed to Production
1. **Fixed robots.txt** — was accidentally blocking `sitemap.xml` via `Disallow: /*.xml$` rule. Added `Allow: /sitemap.xml` before the block rule.
2. **Cleaned sitemap** — removed `/about` and `/contact` pages that didn't exist (causing soft 404 errors in GSC)
3. **SSR'd blog pages** — blog content is now server-rendered and visible to Google's crawler
4. **Added BlogPosting JSON-LD** — structured data for blog posts (will start showing in Enhancements after next crawl)
5. **Fixed OG images** — all referenced OG images now exist in `public/images/`
6. **Unified URLs** — all structured data now consistently uses `www.diskdoctorsamerica.com`

### Actions Taken in GSC
1. **URL Inspection & Indexing Requested** for:
   - `https://www.diskdoctorsamerica.com/` — ✅ already indexed
   - `https://www.diskdoctorsamerica.com/blog` — was "Discovered - not indexed" → requested indexing
   - `https://www.diskdoctorsamerica.com/locations` — ✅ already indexed
   - `https://www.diskdoctorsamerica.com/columbia-md` — was "Crawled - not indexed" → requested indexing

---

## Understanding the "Crawled - Not Indexed" Issue

**23 pages** are in "Crawled - currently not indexed" status. This is NOT a technical problem — it's Google deciding these pages don't have enough unique value to index.

### Why This Happens
- **Templated location pages** — 12 location pages share a very similar content structure with just the city/state swapped. Google sees these as near-duplicate
- **Templated service pages** — similar issue, services pages follow the same template
- **Low domain authority** — new sites need to build trust before Google indexes all pages
- **No backlinks** — these pages have no external sites linking to them

### How It Gets Fixed (Organically Over Time)
1. **Blog content** — regular publishing builds site authority, which helps ALL pages get indexed
2. **Backlinks** — as the blog gains traction, other sites link to it, boosting domain authority
3. **User signals** — more traffic → Google sees the site is valuable → indexes more pages
4. **Google My Business** — active GMB profiles boost local page indexing
5. **Unique content per page** — adding unique testimonials, case studies, or local-specific content to location pages would help differentiate them

---

## Next Steps

### Immediate (This Week)
- [ ] Start publishing blog content (see `BLOG_SEO_GUIDE.md`)
- [ ] Request indexing for 5-10 more important pages via URL Inspection (daily limit: ~10-12)
- [ ] Monitor Vercel deployment to confirm all changes are live

### Short-Term (Next 2-4 Weeks)
- [ ] Publish 8-12 blog posts to build content foundation
- [ ] Set up **Google Analytics 4** to track traffic and user behavior
- [ ] Check GSC weekly to monitor indexed page count
- [ ] Verify BlogPosting and Breadcrumb enhancements appear in GSC after Google re-crawls
- [ ] After first blog posts are indexed, check if they appear in "Performance" → Queries

### Medium-Term (Month 2-3)
- [ ] Review which pages moved from "not indexed" to "indexed"
- [ ] Analyze blog performance data (which posts get impressions/clicks)
- [ ] Double down on topics that get traction
- [ ] Start building backlinks (guest posts, directory listings, industry sites)
- [ ] Set up Google My Business for the Columbia MD head office
- [ ] Add unique content to location pages to help them get indexed

### How to Check Progress
1. **GSC → Pages** — watch the "Indexed" count increase over time
2. **GSC → Performance** — monitor total clicks and impressions weekly
3. **GSC → URL Inspection** — spot-check specific pages to see if their status changed
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
