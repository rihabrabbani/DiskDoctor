'use client';

import { useEffect, useState } from 'react';
import { FILES_NEEDED, URGENCY, URGENCY_LABELS } from '@/lp/config/form';

// Ads brief 16 Nov, change 2 "after submit": optional urgency and files-needed questions on /thank-you,
// shown only right after a landing-page lead (LpForm leaves dd_lp_prepare in sessionStorage). The answers
// go to /api/lp-prepare, which adds them to the same HubSpot contact.

type Prepare = { submissionId: string; email: string; phone: string; token: string };

const chip =
  'min-h-[44px] px-4 rounded-full border text-sm font-semibold transition-colors ' +
  'border-[var(--color-border)] bg-[var(--color-background)] text-[var(--color-text-primary)] ' +
  'aria-pressed:bg-[var(--color-text-primary)] aria-pressed:text-[var(--color-background)] aria-pressed:border-[var(--color-text-primary)]';

export default function LpPrepare() {
  const [lead, setLead] = useState<Prepare | null>(null);
  const [urgency, setUrgency] = useState('');
  const [files, setFiles] = useState<string[]>([]);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'failed' | 'empty'>('idle');

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem('dd_lp_prepare');
      // eslint-disable-next-line react-hooks/set-state-in-effect -- sessionStorage is only readable after mount
      if (raw) setLead(JSON.parse(raw) as Prepare);
    } catch {}
  }, []);

  if (!lead) return null;

  if (status === 'sent') {
    return (
      <p role="status" className="mb-8 text-lg font-semibold text-[var(--color-text-primary)]">
        Thanks, we&apos;ve added that to your request.
      </p>
    );
  }

  const send = async () => {
    if (!urgency && files.length === 0) {
      setStatus('empty');
      return;
    }
    setStatus('sending');
    let ok = false;
    try {
      const res = await fetch('/api/lp-prepare', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...lead, urgency, filesNeeded: files, pageUri: location.href }),
      });
      ok = res.ok && (await res.json()).ok === true;
    } catch {}
    if (ok) {
      try {
        sessionStorage.removeItem('dd_lp_prepare');
      } catch {}
    }
    setStatus(ok ? 'sent' : 'failed');
  };

  return (
    <section
      aria-labelledby="lp-prepare-h"
      className="mb-8 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-100)] p-6 sm:p-8"
    >
      <h2 id="lp-prepare-h" className="mb-1 text-2xl font-bold text-[var(--color-text-primary)]">
        Help us prepare <span className="text-base font-normal text-[var(--color-text-secondary)]">(optional)</span>
      </h2>
      <p className="mb-6 text-[var(--color-text-secondary)]">Two quick questions, so we&apos;re ready when we call.</p>

      <p id="lp-prepare-urg" className="mb-3 font-semibold text-[var(--color-text-primary)]">
        How urgent is it?
      </p>
      <div role="group" aria-labelledby="lp-prepare-urg" className="mb-6 flex flex-wrap gap-2">
        {URGENCY.map((value) => (
          <button
            key={value}
            type="button"
            className={chip}
            aria-pressed={urgency === value}
            onClick={() => setUrgency(urgency === value ? '' : value)}
          >
            {URGENCY_LABELS[value]}
          </button>
        ))}
      </div>

      <p id="lp-prepare-files" className="mb-3 font-semibold text-[var(--color-text-primary)]">
        What do you need back most?
      </p>
      <div role="group" aria-labelledby="lp-prepare-files" className="mb-6 flex flex-wrap gap-2">
        {FILES_NEEDED.map((label) => (
          <button
            key={label}
            type="button"
            className={chip}
            aria-pressed={files.includes(label)}
            onClick={() => setFiles((list) => (list.includes(label) ? list.filter((v) => v !== label) : [...list, label]))}
          >
            {label}
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={send}
        disabled={status === 'sending'}
        className="min-h-[48px] rounded-xl bg-[var(--color-primary)] px-6 font-semibold text-white disabled:opacity-70"
      >
        {status === 'sending' ? 'Sending…' : 'Send'}
      </button>
      {status === 'empty' && (
        <p role="alert" className="mt-3 text-sm font-semibold text-[var(--color-primary)]">
          Pick an answer above, or skip this: your request is already in.
        </p>
      )}
      {status === 'failed' && (
        <p role="alert" className="mt-3 text-sm font-semibold text-[var(--color-primary)]">
          Sorry, that didn&apos;t go through. Your request is already in, so you can skip this.
        </p>
      )}
    </section>
  );
}
