import Image from 'next/image';
import Link from 'next/link';
import type { Area } from '@/lp/config/areas';
import type { FaqItem, Template } from '@/lp/config/templates';
import type { LocationRating, LpReview, StackAvatar } from '@/lp/reviews';
import type { LabPhotoCode } from '@/data/labPhotos';
import logo from '@/../public/images/light_mode.png';
import LabFigure from '@/components/lab/LabFigure';
import LpIcon, { type IconName } from './LpIcon';
import { Avatar, RatingStars } from './ReviewBits';

const LAB_TEL = 'tel:+14109377332';

// Original line art: drive platters, rotating slowly (decorative).
export function Platter({ size, dark = false }: { size: number; dark?: boolean }) {
  const ring = dark ? '#374151' : '#E2E5EA';
  const radii = dark ? [370, 290, 210, 130] : [370, 310, 250, 190, 130];
  return (
    <svg className="lp-platter" width={size} height={size} viewBox="0 0 760 760" fill="none" aria-hidden="true">
      {radii.map((r) => (
        <circle key={r} cx="380" cy="380" r={r} stroke={ring} strokeWidth="2" />
      ))}
      {!dark && <circle cx="380" cy="380" r="46" stroke="#D9DDE3" strokeWidth="2" />}
      <path d="M380 10 A370 370 0 0 1 690 180" stroke={dark ? '#B92D1A' : '#F3C9C1'} strokeWidth="6" strokeLinecap="round" />
      {!dark && <path d="M380 130 A250 250 0 0 1 600 260" stroke="#F3C9C1" strokeWidth="4" strokeLinecap="round" />}
    </svg>
  );
}

export function LpHeader({ area }: { area: Area }) {
  return (
    <header className="lp-header" data-track-position="header">
      <div className="lp-wrap">
        <Link href="/" aria-label="Disk Doctors home" style={{ display: 'flex' }}>
          <Image src={logo} alt="Disk Doctors" height={44} className="lp-logo" priority />
        </Link>
        <div className="lp-header-right">
          <span className="lp-pill">
            <span className="lp-dot" />
            {area.pill}
          </span>
          <a href={area.tel} className="lp-btn lp-btn-ink">
            <LpIcon name="phone" size={18} />
            {area.phone}
          </a>
        </div>
      </div>
    </header>
  );
}

export const FIXED_QUOTE = 'You get a fixed quote before any paid work. Nothing is charged unless you approve it.';

const TICKS = ['Free diagnosis', 'You approve the quote first', 'No data, no charge', 'Free shipping both ways'];

export function LpHero({
  area,
  heroSub,
  h1,
  rating,
  ratingSub,
  heroStack,
  form,
}: {
  area: Area;
  heroSub: string;
  h1: { lead: string; place?: string };
  rating: LocationRating;
  ratingSub: string;
  heroStack: StackAvatar[];
  form: React.ReactNode;
}) {
  return (
    <section className="lp-hero">
      <Platter size={760} />
      <div className="lp-wrap lp-hero-inner">
        <div className="lp-hero-copy" data-track-position="hero">
          <p className="lp-eyebrow">
            <LpIcon name="pin" size={14} strokeWidth={2.2} />
            {area.eyebrow}
          </p>
          <h1 className="lp-h1">
            {h1.lead}
            {h1.place && <span className="lp-place">{h1.place}</span>}
          </h1>
          <div className="lp-hero-call" data-track-position="hero_call">
            <a href={area.tel} className="lp-hero-call-btn">
              <LpIcon name="phone" size={22} />
              <span>
                <strong>{area.phone}</strong> · {area.heroCallNote}
              </span>
            </a>
            {area.tel !== LAB_TEL && (
              <p>
                Emergency? Our lab line <a href={LAB_TEL}>(410) 937-7332</a> is answered 24/7.
              </p>
            )}
          </div>
          <p className="lp-hero-sub">{heroSub}</p>
          <p className="lp-hero-quote">
            <LpIcon name="check" size={18} strokeWidth={3} />
            {FIXED_QUOTE}
          </p>
          <div className="lp-rating-row">
            <div className="lp-avatars">
              {heroStack.map((r) => (
                <Avatar key={r.name} name={r.name} photo={r.photo} size={40} />
              ))}
            </div>
            <div className="lp-rating-text">
              <div>
                <RatingStars rating={rating.rating} /> <strong>{rating.rating}</strong> on Google
              </div>
              <a href="#reviews">{ratingSub}</a>
            </div>
          </div>
          <ul className="lp-ticks">
            {TICKS.map((t) => (
              <li key={t}>
                <span className="lp-tick">
                  <LpIcon name="check" size={15} strokeWidth={3} />
                </span>
                {t}
              </li>
            ))}
          </ul>
        </div>
        {form}
      </div>
    </section>
  );
}

export function UrgencyBand({ template }: { template: Template }) {
  return (
    <section className="lp-dark lp-urgency-band" data-track-position="urgency_band">
      <div className="lp-wrap">
        <LpIcon name="warn" size={28} />
        <p>
          <strong>{template.urgency.strong}</strong> {template.urgency.text}
        </p>
        <a href={LAB_TEL} className="lp-btn lp-btn-ghost-dark">
          Talk to the lab, 24/7
        </a>
      </div>
    </section>
  );
}

// "What happened?" tiles: each one scrolls to the form and pre-picks its symptom (LpForm listens for
// data-cta clicks); the RAID tile opens the RAID path instead.
const TILES: { label: string; icon: IconName; symptom?: string; raid?: true }[] = [
  { label: 'Clicking or beeping', icon: 'sound', symptom: 'Clicking or beeping' },
  { label: 'Not detected', icon: 'monitorX', symptom: 'Not detected' },
  { label: 'Dropped or damaged', icon: 'drop', symptom: 'Dropped' },
  { label: 'RAID or NAS failed', icon: 'server', raid: true },
  { label: 'Deleted or formatted', icon: 'trash', symptom: 'Deleted files' },
  { label: 'Something else', icon: 'alert', symptom: 'Something else' },
];

export function WhatHappenedTiles() {
  return (
    <section className="lp-tiles-sec" data-track-position="tiles" aria-labelledby="lp-tiles-h">
      <div className="lp-wrap">
        <h2 id="lp-tiles-h" className="lp-tiles-h">
          What happened?
        </h2>
        <div className="lp-tiles">
          {TILES.map((t) => (
            <a
              key={t.label}
              href="#start"
              className="lp-tile"
              data-cta="tile"
              data-tile-symptom={t.symptom}
              data-tile-raid={t.raid ? '' : undefined}
            >
              <LpIcon name={t.icon} size={22} />
              {t.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export function RaidFirstHour({ photo }: { photo?: LabPhotoCode }) {
  // RAID page only, which is never a VA page.
  return (
    <section className="lp-reveal" data-track-position="raid_first_hour">
      <div className="lp-wrap lp-sec">
        <h2 className="lp-h2">First hour after a RAID failure</h2>
        <div className="lp-firsthour">
          <div className="lp-firsthour-col is-dont">
            <h3>Don&apos;t</h3>
            <ul>
              <li>Rebuild the array</li>
              <li>Run chkdsk or fsck</li>
              <li>Swap the drive order</li>
              <li>Re-initialize the controller</li>
            </ul>
          </div>
          <div className="lp-firsthour-col is-do">
            <h3>Do</h3>
            <ul>
              <li>Power it down</li>
              <li>Label each drive with its slot</li>
              <li>Note the RAID level and controller</li>
              <li>
                Call us: <a href={LAB_TEL}>(410) 937-7332</a>, answered 24/7
              </li>
            </ul>
          </div>
        </div>
        {photo && (
          <LabFigure code={photo} sizes="(min-width: 1200px) 1100px, 100vw" aspect="3 / 1" className="lp-firsthour-photo" />
        )}
      </div>
    </section>
  );
}

export function SymptomGrid({ template, photos = [], va = false }: { template: Template; photos?: LabPhotoCode[]; va?: boolean }) {
  return (
    <section className="lp-reveal">
      <div className="lp-wrap lp-sec">
        <h2 className="lp-h2">{template.symptomsH}</h2>
        <p className="lp-sec-sub">{template.symptomsP}</p>
        {photos.length > 0 && (
          <div className="lp-photo-row">
            {photos.map((code) => (
              <LabFigure
                key={code}
                code={code}
                sizes={photos.length > 1 ? '(min-width: 768px) 50vw, 100vw' : '(min-width: 1200px) 1100px, 100vw'}
                aspect={photos.length > 1 ? '16 / 9' : '3 / 1'}
                va={va}
              />
            ))}
          </div>
        )}
        <div className="lp-cards">
          {template.symptoms.map((s) => (
            <div key={s.title} className="lp-card">
              <span className="lp-card-icon">
                <LpIcon name={s.icon} />
              </span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          ))}
        </div>
        {template.brands && (
          <div className="lp-brands">
            <span className="lp-brands-label">All major brands</span>
            {template.brands.map((b) => (
              <span key={b}>{b}</span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export function HowItWorks({ area, photos = [], va = false }: { area: Area; photos?: LabPhotoCode[]; va?: boolean }) {
  const steps = [
    { title: 'Tell us what happened', text: 'Use the form or call. Our lab line is answered 24/7.' },
    { title: 'Free diagnosis', text: area.step2 },
    { title: 'Fixed quote before any paid work', text: `${FIXED_QUOTE} No data, no charge.` },
    {
      title: 'Get your data back',
      text: 'Your recovered files, returned to you, with free shipping back if you mailed the drive in.',
    },
  ];
  return (
    <section className="lp-grey lp-reveal">
      <div className="lp-wrap lp-sec">
        <h2 className="lp-h2">How it works</h2>
        <ol className="lp-steps">
          {steps.map((s, i) => (
            <li key={s.title} className="lp-card">
              <span className="lp-step-num">{i + 1}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
        {photos.length > 0 && (
          <div className="lp-photo-row is-steps">
            {photos.map((code) => (
              <LabFigure key={code} code={code} sizes="(min-width: 768px) 33vw, 100vw" va={va} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// Lab photo grid (desktop) plus the one vertical photo phones get instead, when set.
export function LabGrid({ photos, mobile, va = false }: { photos: LabPhotoCode[]; mobile?: LabPhotoCode; va?: boolean }) {
  if (photos.length === 0) return null;
  return (
    <>
      <div
        className={`lp-lab-grid${mobile ? ' has-mobile' : ''}`}
        style={{ '--lp-lab-n': photos.length } as React.CSSProperties}
      >
        {photos.map((code) => (
          <LabFigure
            key={code}
            code={code}
            sizes={`(min-width: 768px) ${Math.round(100 / photos.length)}vw, 100vw`}
            aspect={photos.length >= 3 ? '4 / 3' : '16 / 9'}
            va={va}
          />
        ))}
      </div>
      {mobile && (
        <div className="lp-lab-mobile">
          <LabFigure code={mobile} sizes="(max-width: 767px) 100vw, 1px" aspect="4 / 5" va={va} />
        </div>
      )}
    </>
  );
}

// VA pages: the Columbia lab photos get their own section with a neutral heading, apart from the
// Tysons office block, and never name Columbia (MD pages show them in the office block instead).
export function LabPhotos({ photos, mobile }: { photos: LabPhotoCode[]; mobile?: LabPhotoCode }) {
  if (photos.length === 0) return null;
  return (
    <section className="lp-reveal" data-track-position="lab_photos">
      <div className="lp-wrap lp-sec">
        <h2 className="lp-h2">At the recovery bench</h2>
        <LabGrid photos={photos} mobile={mobile} va />
      </div>
    </section>
  );
}

export function FeaturedReview({
  rating,
  ratingBig,
  review,
  meta,
}: {
  rating: LocationRating;
  ratingBig: string;
  review: LpReview;
  meta: string;
}) {
  return (
    <section id="reviews" className="lp-reveal">
      <div className="lp-wrap lp-sec lp-featured">
        <div className="lp-featured-score">
          <div className="lp-big-rating">{rating.rating}</div>
          <div>
            <RatingStars rating={rating.rating} />
          </div>
          <p>{ratingBig}</p>
          <a
            href={rating.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-map-link="reviews"
            className="lp-btn lp-btn-ghost"
            style={{ fontSize: 15 }}
          >
            Read all reviews on Google Maps
          </a>
        </div>
        <figure>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="#B92D1A" aria-hidden="true">
            <path d="M7.2 6C4.9 7.3 3.5 9.6 3.5 12.6V18h6v-6H6.6c0-1.9.9-3.3 2.4-4.1zm10 0c-2.3 1.3-3.7 3.6-3.7 6.6V18h6v-6h-2.9c0-1.9.9-3.3 2.4-4.1z" />
          </svg>
          <blockquote>{review.featuredBody}</blockquote>
          <figcaption>
            <Avatar name={review.name} photo={review.photo} size={48} />
            <div>
              <strong>{review.name}</strong>
              <span>{meta}</span>
            </div>
            <a href={review.mapsUrl} target="_blank" rel="noopener noreferrer" data-map-link="reviews">
              Read on Google
            </a>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

// MD and RAID pages: "A real lab in Columbia, Maryland" with the lab photos under the intro.
// VA pages: the Tysons office block takes only the Tysons office photo (next week), so no photos yet.
export function OfficeBlock({ area, mapsUrl, photos }: { area: Area; mapsUrl: string; photos?: React.ReactNode }) {
  return (
    <section className="lp-reveal" style={{ borderTop: '1px solid #E5E7EB' }}>
      <div className="lp-wrap lp-sec lp-office">
        <div className="lp-office-copy">
          <h2 className="lp-h2" style={{ marginBottom: 14 }}>
            {area.officeH}
          </h2>
          <p>{area.officeP}</p>
          {photos && <div className="lp-office-photos">{photos}</div>}
          <div className="lp-addr">
            <strong>{area.addrName}</strong>
            <span>{area.addr}</span>
            <span>{area.addrHours}</span>
            <a href={mapsUrl} target="_blank" rel="noopener noreferrer" data-office={area.office}>
              Get directions
            </a>
          </div>
          <p className="lp-other-office">{area.otherOffice}</p>
        </div>
      </div>
    </section>
  );
}

export function LpFaq({ items }: { items: FaqItem[] }) {
  return (
    <section className="lp-grey lp-reveal" style={{ borderBottom: 0 }}>
      <div className="lp-wrap lp-sec lp-faq-wrap">
        <h2 className="lp-h2">Questions people ask first</h2>
        <div className="lp-faq">
          {items.map((item, i) => (
            <details key={item.q} open={i === 0}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FinalCta({ area, heading }: { area: Area; heading: string }) {
  return (
    <section className="lp-dark lp-final" data-track-position="final_cta">
      <Platter size={520} dark />
      <div className="lp-wrap lp-final-inner">
        <div>
          <h2>{heading}</h2>
          <p>Free diagnosis. You approve the quote. No data, no charge.</p>
        </div>
        <div className="lp-final-actions">
          <a href="#start" data-cta="footer" className="lp-btn lp-btn-red">
            Start free diagnosis
          </a>
          <a href={area.tel} className="lp-btn lp-btn-ghost-dark">
            Call {area.phone}
          </a>
        </div>
      </div>
    </section>
  );
}

export function LpFooter() {
  return (
    <footer className="lp-footer" data-track-position="footer">
      <div className="lp-wrap">
        <span>Disk Doctors America · 10015 Old Columbia Rd, Suite B 215, Columbia, MD 21046</span>
        <span>Tysons office (by appointment): 8300 Boone Blvd, Suite 513, Tysons, VA 22182</span>
        <a href="/privacy">Privacy policy</a>
      </div>
    </footer>
  );
}
