# Copilot instructions for DiskDoctor

## Architecture snapshot
- This is a Next.js App Router app (Next 16) with mixed static marketing pages and dynamic blog/content features.
- Primary domains:
  - Marketing site + service/location landing pages from static datasets in `src/data/*`.
  - Blog CMS/admin in `src/app/admin/*` backed by MongoDB.
  - AI-assisted blog generation in `src/app/api/blogs/ai-generate/route.ts` via OpenAI + internal search helpers.
- Blog storage is MongoDB (`blogDB.blogs`) via shared client in `src/lib/mongodb.ts`.
- Image storage is MongoDB GridFS (not Cloudinary in current runtime code): upload via `/api/upload`, serve via `/api/images/[id]`.

## Critical code patterns (project-specific)
- Dynamic route params are typed as `Promise<...>` and awaited (Next 15/16 style). Follow existing pattern in `src/app/blog/[id]/page.tsx` and `src/app/services/[service]/page.tsx`.
- Blog documents are section-based (`sections`, `faqs`, `keyTakeaways`) with legacy fallback `content`; preserve both read paths in blog UI/API.
- Blog API create/update endpoints expect `FormData` (not JSON) in `src/app/api/blogs/route.ts` and `src/app/api/blogs/[id]/route.ts`.
- Public blog listing only returns published posts unless `?admin=true` is present.
- Blog lookup is slug-first, UUID-id fallback; keep redirect behavior from id → slug in `src/app/blog/[id]/page.tsx`.
- Styling uses CSS custom properties (`--color-*`) + Tailwind classes; dark mode toggles `html.className` in `src/contexts/ThemeContext.tsx`.

## AI + publishing flow
- Admin dashboard (`src/app/admin/dashboard/page.tsx`) streams generation progress from `/api/blogs/ai-generate` using SSE (`data:` events).
- Generated blog payload is stored in `sessionStorage` and consumed by `/admin/editor?ai=true`.
- OpenAI credentials/model are stored in MongoDB `settings` collection via `/api/admin/ai-settings` (not env-based OpenAI key).
- Scheduled publishing is external-cron driven: `/api/blogs/publish-scheduled` flips `scheduled` → `published` based on ISO timestamp comparison.

## Developer workflows
- Install/start: `npm install` then `npm run dev`.
- Production checks: `npm run build`, `npm run lint`, `npm run start`.
- One-time data migration: `MONGODB_URI="..." npx tsx scripts/migrate-blogs.ts`.
- No formal automated test suite is configured; `test-*.js` files are ad-hoc search experiments.

## Integration points to preserve
- MongoDB: blog + settings + GridFS.
- OpenAI SDK for text/image generation in `src/lib/openai.ts`.
- Wikipedia API based research helper in `src/lib/search.ts` (used during AI generation).
- SEO/structured data is first-class; preserve metadata + JSON-LD behavior in `src/app/layout.tsx`, `src/lib/structuredData.ts`, and route-level `generateMetadata()` functions.

## Guardrails when editing
- Keep `src/data/allServices.ts` and `src/data/locations.ts` as source-of-truth for generated service/location pages.
- Avoid introducing auth assumptions: admin auth is currently simple local token + hardcoded API credentials in `src/app/api/admin/login/route.ts`.
- When changing blog schema fields, update all of: admin editor pages, API routes, blog detail/list pages, sitemap, and migration script if needed.
