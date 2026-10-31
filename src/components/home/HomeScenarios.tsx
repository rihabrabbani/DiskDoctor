import Link from 'next/link';
import { SCENARIOS_LABEL, scenarios, type ScenarioId } from '@/data/scenarios';

// Replaces the homepage case studies until the client supplies real jobs (spec P0-5 / P1-7).
const homeScenarioIds: ScenarioId[] = ['S1', 'S3', 'S5'];

export default function HomeScenarios() {
  return (
    <section id="common-failures" className="py-16 lg:py-24 bg-[var(--color-surface-100)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--color-text-primary)]">
            How we handle <span className="text-[var(--color-primary)]">common failures</span>
          </h2>
          <p className="mt-3 text-sm italic text-[var(--color-text-tertiary)]">{SCENARIOS_LABEL}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {homeScenarioIds.map((id) => {
            const scenario = scenarios[id];
            const primary = scenario.links[0];
            return (
              <article
                key={id}
                className="flex flex-col bg-[var(--color-background)] border border-[var(--color-border)] rounded-2xl p-6"
              >
                <h3 className="font-semibold text-lg text-[var(--color-text-primary)] mb-3">{scenario.title}</h3>
                <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed mb-3">{scenario.situation}</p>
                <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed mb-5">
                  <strong className="text-[var(--color-text-primary)]">Lesson:</strong> {scenario.lesson}
                </p>
                <Link
                  href={primary.href}
                  className="mt-auto inline-flex items-center text-sm font-medium text-[var(--color-primary)] hover:underline"
                >
                  {primary.label} →
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
