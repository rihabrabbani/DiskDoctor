'use client';

import { useEffect, useState } from 'react';
import LpIcon from './LpIcon';

// < 768px only (CSS). Hidden while the form card is on screen, so it never covers the form.
export default function LpStickyBar({ tel, callLabel }: { tel: string; callLabel: string }) {
  const [formInView, setFormInView] = useState(false);

  useEffect(() => {
    const form = document.getElementById('start');
    if (!form || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(([entry]) => setFormInView(entry.isIntersecting), { threshold: 0.15 });
    observer.observe(form);
    return () => observer.disconnect();
  }, []);

  return (
    <nav aria-label="Quick actions" className="lp-sticky" data-track-position="sticky_mobile" data-hidden={formInView}>
      <a href={tel} className="lp-btn lp-btn-ink" tabIndex={formInView ? -1 : undefined}>
        <LpIcon name="phone" size={18} />
        {callLabel}
      </a>
      <a href="#start" className="lp-btn lp-btn-red" tabIndex={formInView ? -1 : undefined}>
        Free diagnosis
      </a>
    </nav>
  );
}
