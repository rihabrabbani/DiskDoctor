'use client';

import { useEffect, useRef, useState } from 'react';

const STATS = [
  { value: 35, suffix: '+', label: 'years recovering data, since 1991' },
  { value: 15000, suffix: '+', label: 'recovery cases handled' },
  { value: 95, suffix: '%', label: 'success rate' },
];

// Server HTML has the final numbers. If the band is still below the fold on load, it counts up once
// when it comes into view; with reduced motion, or already in view, the numbers just stay.
export default function StatsBand() {
  const ref = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(1);

  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    setProgress(0);
    let raf = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / 1800);
          setProgress(1 - Math.pow(1 - t, 3));
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={ref} className="lp-stats lp-reveal" aria-label="Disk Doctors in numbers">
      <div className="lp-wrap">
        {STATS.map((s) => (
          <div key={s.label} className="lp-stat">
            <div className="lp-stat-num">
              {Math.round(s.value * progress).toLocaleString('en-US')}
              {s.suffix}
            </div>
            <div className="lp-stat-label">{s.label}</div>
          </div>
        ))}
        {/* The real certificate mark goes here once the client sends the scan. */}
        <div className="lp-stat">
          <div className="lp-stat-num">ISO 9001</div>
          <div className="lp-stat-label">certified quality system</div>
        </div>
      </div>
    </section>
  );
}
