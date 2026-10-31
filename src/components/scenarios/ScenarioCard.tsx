import Link from 'next/link';
import { SCENARIO_LABEL, type Scenario } from '@/data/scenarios';

// Full scenario block for service pages. The example label is part of the block, as spec P1-7 requires.
export default function ScenarioCard({ scenario }: { scenario: Scenario }) {
  return (
    <article className="bg-[var(--color-surface-100)] border border-[var(--color-border)] rounded-2xl p-6 flex flex-col">
      <p className="text-sm italic text-[var(--color-text-tertiary)] mb-3">{SCENARIO_LABEL}</p>
      <h3 className="font-semibold text-lg text-[var(--color-text-primary)] mb-3">{scenario.title}</h3>
      <p className="text-[var(--color-text-secondary)] leading-relaxed mb-3">{scenario.situation}</p>
      <p className="text-[var(--color-text-secondary)] leading-relaxed mb-3">
        <strong className="text-[var(--color-text-primary)]">How we handle it:</strong> {scenario.howWeHandleIt}
      </p>
      <p className="text-[var(--color-text-secondary)] leading-relaxed mb-4">
        <strong className="text-[var(--color-text-primary)]">Lesson:</strong> {scenario.lesson}
      </p>
      <p className="mt-auto text-sm">
        {scenario.links.map((link, index) => (
          <span key={link.href}>
            {index > 0 ? ' · ' : ''}
            <Link href={link.href} className="text-[var(--color-primary)] font-medium hover:underline">
              {link.label} →
            </Link>
          </span>
        ))}
      </p>
    </article>
  );
}
