#!/usr/bin/env python3
"""Phase 5 helpers: word counts, 7-gram overlap, title lengths."""
from __future__ import annotations

import csv
import re
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = Path(__file__).resolve().parent


def words(text: str) -> list[str]:
    return re.findall(r"[a-z0-9']+", text.lower())


def ngrams(tokens: list[str], n: int = 7) -> Counter:
    if len(tokens) < n:
        return Counter()
    return Counter(tuple(tokens[i : i + n]) for i in range(len(tokens) - n + 1))


def extract_location_copy() -> dict[str, str]:
    text = (ROOT / "src/data/locationCopy.ts").read_text()
    parts = re.split(r"\n  '([a-z0-9-]+)': \{", text)
    data = {}
    for i in range(1, len(parts), 2):
        slug = parts[i]
        body = parts[i + 1].split("relatedServiceIds")[0]
        data[slug] = body
    return data


def extract_titles() -> list[tuple[str, str, str]]:
    """url, title_without_template, rendered_with_template"""
    rows = []
    template_suffix = " | DiskDoctor"
    rows.append(("/", "Data Recovery Services in MD, VA & DC | DiskDoctor", "Data Recovery Services in MD, VA & DC | DiskDoctor"))

    copy = (ROOT / "src/data/locationCopy.ts").read_text()
    for slug, title in re.findall(r"'([a-z0-9-]+)': \{[\s\S]*?seoTitle: '([^']+)'", copy):
        rendered = title if title.endswith("DiskDoctor") else title + template_suffix
        rows.append((f"/{slug}", title, rendered))

    services = (ROOT / "src/data/allServices.ts").read_text()
    ids_titles = re.findall(r"id: '([a-z0-9-]+)',\s*\n\s*title: '([^']+)'", services)
    for sid, title in ids_titles:
        page_title = f"{title} | No Data No Charge"
        rendered = page_title + template_suffix
        rows.append((f"/services/{sid}", page_title, rendered))

    static = [
        ("/contact", "Free Data Recovery Evaluation", "Free Data Recovery Evaluation | DiskDoctor"),
        ("/locations", "Data Recovery Locations | MD VA DC", "Data Recovery Locations | MD VA DC | DiskDoctor"),
        ("/about", "About the Columbia MD Lab | DiskDoctor", "About the Columbia MD Lab | DiskDoctor"),
        ("/privacy", "Privacy Policy", "Privacy Policy | DiskDoctor"),
        ("/terms", "Terms of Service", "Terms of Service | DiskDoctor"),
        ("/blog", "Data Recovery Blog", "Data Recovery Blog | DiskDoctor"),
        ("/blog/why-is-my-external-hard-drive-clicking", "Why is my external hard drive clicking?", "Why is my external hard drive clicking? | DiskDoctor"),
        ("/blog/raid-5-failed-two-drives", "RAID 5 failed with two drives down — what now?", "RAID 5 failed with two drives down — what now? | DiskDoctor"),
    ]
    rows.extend(static)
    return rows


def main() -> None:
    loc = extract_location_copy()
    print("=== Word counts (location unique copy block) ===")
    for slug, body in loc.items():
        print(f"{slug:20} {len(words(body)):5}")

    slugs = list(loc)
    gram_map = {s: ngrams(words(loc[s]), 7) for s in slugs}

    overlap_rows = []
    print("\n=== Pairwise 7-gram containment (shared / min) ===")
    for i, a in enumerate(slugs):
        for b in slugs[i + 1 :]:
            ga, gb = gram_map[a], gram_map[b]
            if not ga or not gb:
                pct = 0.0
                shared = 0
            else:
                shared_keys = set(ga) & set(gb)
                shared = sum(min(ga[k], gb[k]) for k in shared_keys)
                denom = min(sum(ga.values()), sum(gb.values()))
                pct = 100.0 * shared / denom if denom else 0.0
            overlap_rows.append((a, b, round(pct, 1), shared))
            flag = " FAIL" if pct > 30 else ""
            if pct >= 15:
                print(f"{a:18} vs {b:18} {pct:5.1f}%{flag}")

    with (OUT / "shingle-overlap.csv").open("w", newline="") as f:
        w = csv.writer(f)
        w.writerow(["page_a", "page_b", "seven_gram_containment_pct", "shared_7grams", "over_30pct"])
        for a, b, pct, shared in sorted(overlap_rows, key=lambda r: -r[2]):
            w.writerow([a, b, pct, shared, "yes" if pct > 30 else "no"])

    over = [r for r in overlap_rows if r[2] > 30]
    print(f"\nPairs over 30%: {len(over)} / {len(overlap_rows)}")

    print("\n=== Titles (rendered) ===")
    title_rows = extract_titles()
    with (OUT / "titles-recrawl.csv").open("w", newline="") as f:
        w = csv.writer(f)
        w.writerow(["url", "title_source", "rendered_title", "chars", "over_60"])
        for url, src, rendered in title_rows:
            n = len(rendered)
            w.writerow([url, src, rendered, n, "yes" if n > 60 else "no"])
            if n > 60:
                print(f"OVER 60 ({n}): {url} :: {rendered}")
    print(f"Wrote {len(title_rows)} title rows")


if __name__ == "__main__":
    main()
