'use client';

import Link from 'next/link';
import { LocationData } from '@/data/locations';
import { allServices } from '@/data/allServices';
import { telHref } from '@/lib/site';

interface LocationServicesProps {
  location: LocationData;
  serviceIds?: string[];
}

export default function LocationServices({ location, serviceIds }: LocationServicesProps) {
  const selected = (serviceIds || ['raid-recovery', 'mobile-recovery', 'windows-recovery', 'file-recovery'])
    .map((id) => allServices.find((s) => s.id === id))
    .filter(Boolean);

  return (
    <section className="py-16 bg-[var(--color-surface-100)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-[var(--color-text-primary)] mb-8 text-center">
          Recovery services for {location.city}
        </h2>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {selected.map((service) => (
            <Link
              key={service!.id}
              href={`/services/${service!.id}`}
              className="block border border-[var(--color-border)] rounded-xl p-6 bg-[var(--color-background)] hover:border-[var(--color-primary)]"
            >
              <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-2">
                {service!.title}
              </h3>
              <p className="text-[var(--color-text-secondary)]">{service!.description}</p>
            </Link>
          ))}
        </div>
        <p className="text-center mt-8">
          <a href={telHref(location.officePhone ?? location.phone)} className="font-semibold text-[var(--color-primary)]">
            Call {location.officePhone ?? location.phone}
          </a>
          {' '}or{' '}
          <Link href="/contact" className="font-semibold text-[var(--color-primary)]">
            request a free evaluation
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
