# DiskDoctor client packet — send after last deploy (not Day 1)

**To:** DiskDoctor (Columbia / Tysons operation)  
**From:** SEO / site execution  
**Date:** 13 Aug 2026 (packet drafted with the code; send the morning after Vercel is live with `NEXT_PUBLIC_GTM_ID`)  
**GBP website URL to paste (C2):** https://www.diskdoctorsamerica.com/?utm_source=google&utm_medium=organic&utm_campaign=gbp

---

## Say this in writing (entity)

`diskdoctors.com` still owns the entity, reviews, and AI citations for the same Columbia lab street and often the same 410 number. This site will not win national head terms (`hard drive repair`, `data recovery`). The 90-day target is local / near-me / GBP and converting the ~26 organic visits/month we already get — not “hard drive repair” #1.

We did **not** invent a franchise or parent relationship with Disk Doctor Labs Inc. `/about` describes this Columbia/Tysons operation at 10015 Old Columbia Rd Suite B 215 only. C4/C5 below unlocks an honest entity paragraph.

---

## SERP diagnosis (why we abandoned the head terms)

GSC (audit window): `hard drive repair` 50,234 impressions, **0 clicks**, avg position **1.08**, almost all desktop. `data recovery` 9,928 impressions, **1 click**, pos **1.29**. A real US #1 blue link would produce thousands of clicks, not zero. Position 1 with 0.00% CTR is a SERP-module / AI Overview / legacy-HTTP attribution artifact.

**Decision:** do not chase those head terms. Invest in near-me and MD/DC/NoVA city queries, on-site conversion, GBP (you), and symptom long-tail (clicking drive, RAID 5 two disks down). Full write-up: `seo-execution/01-serp-diagnosis.md`.

---

## What shipped on the site (no login required from you)

- One NAP: **+1 (410) 937-7332** / `tel:+14109377332`. 571 and 1-800-DISKDOC removed from this codebase.
- Primary CTA: `/contact` form + phone. `shah4268@msn.com` is secondary until C1.
- HubSpot form on homepage, all 16 service pages, `/contact`, `/locations`, and the 12 city pages (city pages already had it — not double-embedded).
- Sticky mobile bar: Call + Free Evaluation.
- Conversion hooks in code: HubSpot `onFormSubmitted` → `generate_lead` / `hubspot_form_submit`; `tel_click`; `mailto_click`. They fire to `dataLayer` immediately; they reach GA4 only after GTM is on Vercel.
- Real 404s for unknown city/service slugs (`dynamicParams = false`). `/llms.txt` is plain text, not a fake city page.
- Columbia + Tysons = real `LocalBusiness`. Other cities = service-area copy + `Service` schema (no fake street).
- Deep unique copy: Columbia, Baltimore, DC, Rockville, Tysons. Honest shorter pages for the other eight cities.
- RAID and mobile service depth; FAQs visible on all services + homepage (matching JSON-LD).
- `/about`, `/privacy`, `/terms`. Public Angi + Yelp quotes on-page. **AggregateRating schema stays off** until more reviews are on-page (we will not restore 4.9/39).
- Two symptom posts: clicking external drive; RAID 5 two drives down.
- Apex host redirect to `www` in `vercel.json` (fixes http://apex → hanging https://apex).

**We did not invent prices, ISO certificate numbers, or `info@diskdoctorsamerica.com`.**

---

## HubSpot paid tier (C16) — price to decide

To remove HubSpot branding under the Submit button, the first paid Marketing Hub tier is enough.

| Billing | List price (verify on hubspot.com/pricing/marketing before you buy) |
|---|---|
| Marketing Hub Starter, monthly | **~$20 / seat / month** |
| Marketing Hub Starter, annual | **~$15 / seat / month** |
| Contacts included | 1,000 marketing contacts on Starter |
| Onboarding fee | None on Starter (Professional is a different product: ~$800–890/mo + ~$3,000 onboarding — not needed to remove form branding) |

Recommendation: **Starter, 1 seat, annual if you will keep the form a year** (~$180–240/year) vs staring at “HubSpot” on every lead. We cannot flip this from the repo.

**Also in the HubSpot portal (you or we with portal access):** set the form phone-country default to **United States**, not +92. The site already passes `locale: 'en'` and tries to force US on load; the portal default is the reliable fix.

---

## Ask list (still blocked on you)

| # | Need | Why it still matters after this deploy |
|---|---|---|
| C1 | Create `info@diskdoctorsamerica.com` (or similar) and who monitors it | Replace msn.com everywhere |
| C2 | GBP login at 10015 Old Columbia Rd + current website URL | Highest remaining leverage. Paste the UTM URL above. Categories, hours (we used Mo–Fr 08:30–17:00 on-site), photos |
| C3 | Yelp `disk-doctors-columbia-3` control | Website field → https://www.diskdoctorsamerica.com/ |
| C4 | Legal relationship to Disk Doctor Labs Inc. / `diskdoctors.com` | Unlocks honest About + GEO entity |
| C5 | Any link from or access to `diskdoctors.com` | Entity recovery |
| C6 | Confirm Tysons: staffed vs drop point | On-site already says appointment-only |
| C7 | Substantiation: 95% success, 50K+ cases | Claims still on some UI; add proof when you send it |
| C8 | ISO Class 100 cert: issuer + number | We removed invented ISO 9001 / Class 10 / NAID rows. Do not put a class number back without the cert |
| C9 | AggregateRating source | Schema removed until on-page reviews; confirm numbers. Angi is 5.0 from **1** review |
| C10 | Price ranges or permission to publish “from $X” | Largest objection; we used free-eval / no data no charge |
| C11 | Call-tracking number + budget | Mobile is ~60% of clicks in the audit; calls are untracked. Sticky bar uses the real 410 number |
| C13 | 3–5 permissioned named customer stories | We used public Angi + Yelp quotes in the meantime |
| C16 | Decision on HubSpot Starter (~$15–20/seat/mo) | Removes free-form ad under Submit |
| C14 | Already have HubSpot — not asked | |
| C15 | Already creating GA4/GTM — not asked | Set `NEXT_PUBLIC_GTM_ID` on Vercel after the container exists |

Citation spreadsheet (logged-out): `seo-execution/citations.csv`.

---

## Scoreboard (baselines from the 10 Aug 2026 audit)

| Metric | Baseline | Day 14 expectation | Day 90 target |
|---|---|---|---|
| Form fills / month | ~2.75 | ≥4 (friction) | ≥15 (traffic + GBP) |
| Lead source known | No | Yes after GTM is live | Yes |
| Organic clicks / month | ~26 | still ~26 (say this out loud) | 80–120 |
| Location pages <30% 7-gram duplicate | 0/12 | 12/12 pairs under 30% in repo (see `shingle-overlap.csv`) | Keep |
| Soft-404 indexable | unbounded fake city/service URLs | 0 after deploy (`dynamicParams = false`) | 0 |
| GBP pointing at this domain | unknown | client (C2) | yes + UTM |

Leads since tracking went live: **fill after GTM is on production** (HubSpot form submissions + GA4 `generate_lead` + `tel_click`).

---

## What you should do this week (30 minutes)

1. Open GBP → website → paste the UTM URL.
2. HubSpot form → country default United States; decide Starter vs live with branding.
3. Reply C4 in one sentence: independent lab / franchisee / licensee / same company as diskdoctors.com / other.
4. Confirm Tysons (C6) and whether 8:30–5:00 Mon–Fri is still accurate.

Weeks 3–4 (not a blocker): full 1,500-word rewrites of the remaining eight service-area cities if C2/C4 are moving.
