import { EMAIL, PHONE_DISPLAY, PHONE_TEL } from '@/lib/site';

export default function FormFallback({ compact = false }: { compact?: boolean }) {
  return (
    <div className="text-center p-6 rounded-xl bg-[var(--color-surface-200)] border border-[var(--color-border)]">
      <p className="text-[var(--color-text-primary)] font-medium mb-2">
        {compact ? 'Prefer to call?' : 'Form unavailable — call or email us now.'}
      </p>
      <p className="text-[var(--color-text-secondary)] mb-4">
        Free evaluation. No data, no charge. A specialist will tell you what to do with the drive.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <a
          href={PHONE_TEL}
          className="inline-block px-5 py-2.5 bg-[var(--color-primary-800)] text-white rounded-lg font-medium"
        >
          Call {PHONE_DISPLAY}
        </a>
        <a
          href={`mailto:${EMAIL}`}
          className="inline-block px-5 py-2.5 border border-[var(--color-border)] rounded-lg font-medium text-[var(--color-text-primary)]"
        >
          {EMAIL}
        </a>
      </div>
    </div>
  );
}
