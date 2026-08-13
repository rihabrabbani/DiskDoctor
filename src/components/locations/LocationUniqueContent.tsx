import { LocationData } from '@/data/locations';
import { LocationCopy } from '@/data/locationCopy';

export default function LocationUniqueContent({
  location,
  copy,
}: {
  location: LocationData;
  copy: LocationCopy;
}) {
  const mapQuery = encodeURIComponent(location.address);

  return (
    <section className="py-16 bg-[var(--color-background)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="space-y-5 text-lg text-[var(--color-text-secondary)] leading-relaxed">
          {copy.paragraphs.map((p) => (
            <p key={p.slice(0, 40)}>{p}</p>
          ))}
        </div>

        {copy.scenarios.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-6">
              Local cases we actually see
            </h2>
            <div className="space-y-6">
              {copy.scenarios.map((s) => (
                <div key={s.title} className="border border-[var(--color-border)] rounded-xl p-5 bg-[var(--color-surface-100)]">
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
