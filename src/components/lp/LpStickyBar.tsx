'use client';

import { useEffect, useState } from 'react';
import LpIcon from './LpIcon';

// Mobile (< 768px, CSS): bottom bar, hidden while the form card is on screen so it never covers it.
// Desktop (>= 768px): slim top bar with the phone number, shown once the page header has scrolled away.
export default function LpStickyBar({
  tel,
  phone,
  callLabel,
  topNote,
}: {
  tel: string;
  phone: string;
  callLabel: string;
  topNote: string;
}) {
  const [formInView, setFormInView] = useState(false);
  const [headerGone, setHeaderGone] = useState(false);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const observers: IntersectionObserver[] = [];
    const form = document.getElementById('start');
    if (form) {
      const o = new IntersectionObserver(([entry]) => setFormInView(entry.isIntersecting), { threshold: 0.15 });
      o.observe(form);
      observers.push(o);
    }
    const header = document.querySelector('.lp-header');
    if (header) {
      const o = new IntersectionObserver(([entry]) => setHeaderGone(!entry.isIntersecting));
      o.observe(header);
      observers.push(o);
    }
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <>
      <nav aria-label="Quick actions" className="lp-sticky" data-track-position="sticky_mobile" data-hidden={formInView}>
        <a href={tel} className="lp-btn lp-btn-ink" tabIndex={formInView ? -1 : undefined}>
          <LpIcon name="phone" size={18} />
          {callLabel}
        </a>
        <a href="#start" data-cta="sticky" className="lp-btn lp-btn-red" tabIndex={formInView ? -1 : undefined}>
          Free diagnosis
        </a>
      </nav>
      <nav aria-label="Call the lab" className="lp-topbar" data-track-position="sticky" data-hidden={!headerGone}>
        <div className="lp-wrap">
          <span className="lp-topbar-note">{topNote}</span>
          <div className="lp-topbar-actions">
            <a href="#start" data-cta="sticky" className="lp-topbar-start" tabIndex={headerGone ? undefined : -1}>
              Start free diagnosis
            </a>
            <a href={tel} className="lp-btn lp-btn-ink" tabIndex={headerGone ? undefined : -1}>
              <LpIcon name="phone" size={16} />
              {phone}
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
