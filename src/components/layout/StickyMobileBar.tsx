'use client';

import Link from 'next/link';
import { PHONE_DISPLAY, PHONE_TEL } from '@/lib/site';

export default function StickyMobileBar() {
  return (
    <div className="fixed bottom-0 inset-x-0 z-50 lg:hidden border-t border-[var(--color-border)] bg-[var(--color-surface-100)] pb-[env(safe-area-inset-bottom)]">
      <div className="grid grid-cols-2">
        <a
          href={PHONE_TEL}
          className="flex items-center justify-center gap-2 py-3.5 text-sm font-semibold text-white bg-[var(--color-primary-800)]"
        >
          Call {PHONE_DISPLAY.replace('+1 ', '')}
        </a>
        <Link
          href="/contact"
          className="flex items-center justify-center py-3.5 text-sm font-semibold text-white bg-[var(--color-accent-700)]"
        >
          Free Evaluation
        </Link>
      </div>
    </div>
  );
}
