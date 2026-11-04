import Image from 'next/image';
import Link from 'next/link';
import type { Area } from '@/lp/config/areas';
import type { FaqItem, Template } from '@/lp/config/templates';
import type { LocationRating, LpReview } from '@/lp/reviews';
import logo from '@/../public/images/light_mode.png';
import LpIcon from './LpIcon';

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
  heroStack: { name: string; avatar: string }[];
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
          <p className="lp-hero-sub">{heroSub}</p>
          <div className="lp-rating-row">
            <div className="lp-avatars" aria-hidden="true">
              {heroStack.map((r) => (
                <Image key={r.avatar} src={r.avatar} alt="" width={40} height={40} sizes="40px" loading="eager" />
              ))}
            </div>
            <div className="lp-rating-text">
              <div>
                <span className="lp-stars" role="img" aria-label={`${rating.rating} out of 5 stars`}>
                  ★★★★★
                </span>{' '}
                <strong>{rating.rating}</strong> on Google
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

export function SymptomGrid({ template }: { template: Template }) {
  return (
    <section className="lp-reveal">
      <div className="lp-wrap lp-sec">
        <h2 className="lp-h2">{template.symptomsH}</h2>
        <p className="lp-sec-sub">{template.symptomsP}</p>
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

export function HowItWorks({ area }: { area: Area }) {
  const steps = [
    { title: 'Tell us what happened', text: 'Use the form or call. Our lab line is answered 24/7.' },
    { title: 'Free diagnosis', text: area.step2 },
    { title: 'You approve a quote', text: 'No paid work starts without your OK. No data, no charge.' },
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
          <div className="lp-stars" role="img" aria-label={`${rating.rating} out of 5 stars`}>
            ★★★★★
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
          <blockquote>{review.featuredText ?? review.excerpt}</blockquote>
          <figcaption>
            <Image src={review.avatar} alt="" width={48} height={48} sizes="48px" />
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

export function OfficeBlock({ area, mapsUrl, showPhotoSlots }: { area: Area; mapsUrl: string; showPhotoSlots: boolean }) {
  return (
    <section className="lp-reveal" style={{ borderTop: '1px solid #E5E7EB' }}>
      <div className="lp-wrap lp-sec lp-office">
        {/* Real photos only (never stock or AI) once the client sends them. Until then the labelled
            slots show on previews and are left out of production. */}
        {showPhotoSlots && (
          <div className="lp-photos">
            {area.photoSlots.map((label) => (
              <div key={label} className="lp-photo">
                [{label}]
              </div>
            ))}
          </div>
        )}
        <div className="lp-office-copy">
          <h2 className="lp-h2" style={{ marginBottom: 14 }}>
            {area.officeH}
          </h2>
          <p>{area.officeP}</p>
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
          <a href="#start" className="lp-btn lp-btn-red">
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
