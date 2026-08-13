# Phase 5 — verify (13 Aug 2026)

Repo checks. Live e2e (5.1) is blocked until Vercel has `NEXT_PUBLIC_GTM_ID` and this branch is deployed. Do not treat the current production HTML as this work — production still had mailto Free Quote and tourism Columbia copy at Phase 0.

## 5.1 Form + GA4 (blocked on deploy + GTM)

**Code ready:** HubSpot embed, `onFormSubmitted` → `generate_lead` / `hubspot_form_submit`, `tel_click`, `mailto_click`, noscript + `FormFallback` on script error.

**Cannot complete from this environment:** creating the GA4 property, GTM container, linking GA4↔GSC, or submitting a real customer form.

**After deploy, do this on a phone (cellular) and desktop:**

1. Open `/contact`, `/`, `/services/raid-recovery`, `/columbia-md`.
2. Confirm the form loads (not the noscript-only state).
3. Submit a real test lead marked TEST.
4. HubSpot: contact created, form `a6b03a7f-4f8f-402a-93f0-d755bee55cdc`.
5. GA4 DebugView / Realtime: `generate_lead` (or GTM event `hubspot_form_submit`).
6. Tap the sticky Call button: `tel_click`.
7. If any of 4–6 fail, tracking is not live — fix GTM before calling the two weeks “done.”

HubSpot +92: portal default still required. Code forces US on `onFormReady` as a workaround.

## 5.2 Recrawl titles / descriptions / H1 / canonical / noscript / schema

See `titles-recrawl.csv`. All 37 indexable titles render at **≤60 characters** with the `%s | DiskDoctor` template (home and `/about` use `absolute` so the brand is not doubled).

| Check | Repo |
|---|---|
| One H1 | Home: “Data recovery in Columbia, MD”. Services: plain `{title}` (no RAIDRecovery concatenation). Locations: “Data recovery in {city}” |
| Self-canonical | `SITE_URL` / `SITE_URL_SLASH` (`https://www.diskdoctorsamerica.com/` on home) |
| Noscript | Under HubSpot embed |
| FAQ visible = FAQ JSON-LD | Homepage `homeFaqs`; location `copy.faqs`; services `longform.faqs \|\| service.faq` |
| AggregateRating | Removed from Organization/LocalBusiness |
| Fake verification meta | Removed |

Schema validators (Rich Results) need the deployed URLs. After deploy: home, `/columbia-md`, `/tysons-va`, `/services/raid-recovery`, `/blog/why-is-my-external-hard-drive-clicking`.

Meta descriptions: location `seoDescription` strings are 110–156 chars (Columbia 156). Service descriptions are sliced to 160 in `generateMetadata`.

## 5.3 Shingle overlap

`shingle-overlap.csv` — 7-gram containment across 12 location unique-copy blocks. **0 / 66 pairs over 30%.**

Word counts (unique copy block including FAQs/scenarios):

| Page | Words | Role |
|---|---:|---|
| columbia-md | ~1,480 | Deep lab |
| baltimore-md / washington-dc | ~1,280 | Deep service-area |
| rockville-md | ~1,140 | Deep service-area |
| tysons-va | ~740 | Real appointment office |
| remaining 8 | ~300–440 | Honest service-area |

Full 1,500-word rewrites of the remaining eight cities are weeks 3–4 (client packet), not a blocker.

## 5.4 404 / redirects / sitemap / robots / llms.txt

| Check | Repo / Phase 0 live | After this deploy (expected) |
|---|---|---|
| `/this-page-definitely-does-not-exist-9x8z` | Live was **200** `[location]` | **404** `dynamicParams = false` + `notFound()` |
| `/services/fake-service-abc` | Live **200** | **404** |
| `/llms.txt` | Live **200 HTML** | `text/plain` via `src/app/llms.txt/route.ts` + `public/llms.txt` |
| `http://www` → `https://www` | 308, 1 hop, 200 | keep |
| `http://apex` | 308 → hanging `https://apex` | `vercel.json` host redirect → `https://www.diskdoctorsamerica.com/:path*` |
| Sitemap home | no slash | `https://www.diskdoctorsamerica.com/` |
| robots.txt | crawl-delay, `/_next`, `/*.xml$`, Googlebot Allow-all | Allow `/`; Disallow `/admin/` `/api/` only; AI bot Allow groups |

Re-hit those URLs after Vercel promote. Request indexing on HTTPS home.

## 5.5 Rank grid rerun

`rank-grid-day14.csv` — same GSC positions as Day 1. **Expect little movement**; this is the month-2 baseline, not a ranking win. US-IP incognito still not available from this environment.

## 5.6 Client report

`CLIENT-PACKET.md` is the report: what shipped, what is blocked on them, scoreboard, UTM URL, HubSpot Starter ~$15–20/seat/mo, C1–C13/C16.
