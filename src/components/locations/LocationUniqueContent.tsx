import { LocationData } from '@/data/locations';
import { SCENARIO_LABEL } from '@/data/scenarios';
import { LocationCopy } from '@/data/locationCopy';

// Splits a paragraph into a bold lead and the rest, without changing the text: a short "Label:" prefix
// ("Address:", "How to reach the suite:") or else the first sentence.
function splitLead(paragraph: string): [string, string] {
  const label = paragraph.match(/^([^.:]{3,60}:)\s/);
  if (label) return [label[1], paragraph.slice(label[1].length)];
  const sentence = paragraph.match(/^(.{20,180}?[.?!])\s/);
  if (sentence) return [sentence[1], paragraph.slice(sentence[1].length)];
  return ['', paragraph];
}

export default function LocationUniqueContent({
  location,
  copy,
}: {
  location: LocationData;
  copy: LocationCopy;
}) {
  const mapQuery = encodeURIComponent(location.address);
  const [intro, ...rest] = copy.paragraphs;

  return (
    <section className="py-16 bg-[var(--color-background)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        {/* The location copy is long, so it is laid out as an intro plus cards with a bold lead each,
            instead of one column of paragraphs. The text itself is unchanged. */}
        <p className="text-xl text-[var(--color-text-primary)] leading-relaxed max-w-3xl">{intro}</p>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
          {rest.map((p) => {
            const [lead, body] = splitLead(p);
            return (
              <p
                key={p.slice(0, 40)}
                className="bg-[var(--color-surface-100)] border border-[var(--color-border)] rounded-xl p-5 text-[var(--color-text-secondary)] leading-relaxed"
              >
                {lead && <strong className="block mb-1 text-[var(--color-text-primary)]">{lead}</strong>}
                {lead && ' '}
                {body.trim()}
              </p>
            );
          })}
        </div>

        {copy.scenarios.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-6">
              Failures we often see
            </h2>
            <div className="space-y-6">
              {copy.scenarios.map((s) => (
                <div key={s.title} className="border border-[var(--color-border)] rounded-xl p-5 bg-[var(--color-surface-100)]">
                  <p className="text-sm italic text-[var(--color-text-tertiary)] mb-2">{SCENARIO_LABEL}</p>
                  <h3 className="font-semibold text-[var(--color-text-primary)] mb-2">{s.title}</h3>
                  <p className="text-[var(--color-text-secondary)] leading-relaxed">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {copy.kind === 'lab' && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4">Map</h2>
            <iframe
              title={`Map of ${location.fullName}`}
              className="w-full h-72 rounded-xl border border-[var(--color-border)]"
              loading="lazy"
              src={`https://maps.google.com/maps?q=${mapQuery}&output=embed`}
            />
          </div>
        )}
      </div>
    </section>
  );
}
