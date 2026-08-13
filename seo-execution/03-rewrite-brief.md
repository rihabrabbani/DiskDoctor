# Location rewrite brief (repeatable)

Use this for any remaining city or a week-3 pass on the eight service-area pages.

1. **Kind:** lab (Columbia, Tysons) vs service-area (everyone else). Service-area pages never get a fake `streetAddress`.
2. **Open with a 40–60 word direct answer:** who does the work, where the lab is, free evaluation, the phone, the one thing not to do (rebuild / CHKDSK / charge a wet phone).
3. **Local facts only you could not paste from Columbia:** commute, neighborhoods, industries, drop vs ship, Tysons if it is actually closer.
4. **Three scenarios** with different device types (NAS/RAID, phone, SSD/USB). Do not reuse Columbia’s CPA / photographer / medical RAID trio.
5. **FAQs must match on-page accordion and JSON-LD.** Include at least one GSC-shaped question (`data recovery {city}`, cost, clicking drive, RAID, office or not).
6. **Internal links:** ≥4 services + ≥3 other cities + `/contact`.
7. **Shingle:** after writing, run `python3 seo-execution/compute-verify.py`. Reject any pair >30% 7-gram containment vs Columbia or Baltimore.
8. **Do not invent:** prices, ISO numbers, extra offices, `info@`, diskdoctors.com franchise language.
9. **NAP:** display may be `(410) 937-7332`; `href` is always `tel:+14109377332`.
