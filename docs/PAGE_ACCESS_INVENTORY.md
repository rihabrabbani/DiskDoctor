# DiskDoctor Page Access Inventory

Generated: 2026-03-13

This file lists all current App Router pages (`page.tsx` routes), their URLs, and whether users can reach them from the current UI.

## 1) Public pages

| Page | URL | Visible in UI? | How users reach it now |
|---|---|---|---|
| Home | `/` | Yes | Header `HOME`, logo click |
| Contact | `/contact` | Yes | Header `CONTACT`, many CTA buttons across home/services/location pages |
| Blog listing | `/blog` | Yes | Header `BLOGS` |
| Blog detail | `/blog/[id-or-slug]` | Yes (indirect) | From blog cards on `/blog` |
| Locations listing | `/locations` | No (not linked in main nav) | Direct URL only |
| Location detail (dynamic) | `/{location-slug}` | Yes (indirect) | From cards on `/locations` |
| Service detail (dynamic) | `/services/{service-id}` | Yes | Header `SERVICES` dropdown |

---

## 2) Dynamic location pages that currently exist

Source: `src/data/locations.ts`

- `/columbia-md`
- `/baltimore-md`
- `/washington-dc`
- `/alexandria-va`
- `/arlington-va`
- `/rockville-md`
- `/annapolis-md`
- `/frederick-md`
- `/mclean-va`
- `/tysons-va`
- `/great-falls-va`
- `/potomac-md`

---

## 3) Dynamic service pages that currently exist

Source: `src/data/allServices.ts`

- `/services/data-security`
- `/services/email-security`
- `/services/data-backup`
- `/services/email-recovery`
- `/services/windows-recovery`
- `/services/mac-recovery`
- `/services/photo-recovery`
- `/services/mobile-recovery`
- `/services/raid-recovery`
- `/services/file-recovery`
- `/services/virtual-recovery`
- `/services/remote-recovery`
- `/services/data-cloning`
- `/services/data-duplication`
- `/services/linux-recovery`
- `/services/unix-recovery`

---

## 4) Admin pages

| Page | URL | Visible in public UI? | Access notes |
|---|---|---|---|
| Admin login | `/admin/login` | No | Direct URL only |
| Admin dashboard | `/admin/dashboard` | No | Redirects to login if not authenticated |
| Admin editor (new/edit draft by query) | `/admin/editor` | No | Reached from dashboard after login |
| Admin editor (edit by id) | `/admin/editor/[id]` | No | Reached from dashboard edit actions |

---

## 5) Route source files used for this inventory

- `src/app/page.tsx`
- `src/app/contact/page.tsx`
- `src/app/blog/page.tsx`
- `src/app/blog/[id]/page.tsx`
- `src/app/locations/page.tsx`
- `src/app/[location]/page.tsx`
- `src/app/services/[service]/page.tsx`
- `src/app/admin/login/page.tsx`
- `src/app/admin/dashboard/page.tsx`
- `src/app/admin/editor/page.tsx`
- `src/app/admin/editor/[id]/page.tsx`
