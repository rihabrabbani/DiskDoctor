import Link from 'next/link';
import { Truck } from 'lucide-react';
import { telHref } from '@/lib/site';

export default function LocationPickup({ phone }: { phone: string }) {
  return (
    <section className="py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-[var(--color-surface-100)] border border-[var(--color-border)] rounded-2xl p-6">
          <div className="flex-shrink-0 h-12 w-12 bg-[var(--color-primary)] rounded-lg flex items-center justify-center">
            <Truck className="h-6 w-6 text-[var(--color-text-inverse)]" />
          </div>
          <p className="text-lg text-[var(--color-text-primary)] leading-relaxed">
            <Link href="/mail-in-data-recovery" className="font-semibold text-[var(--color-primary)] hover:underline">
              Ship your drive to us free both ways
            </Link>
            , or book a pickup for a small fee. Call{' '}
            <a href={telHref(phone)} className="text-[var(--color-primary)] font-semibold hover:underline">
              {phone}
            </a>{' '}
            or{' '}
            <Link href="/contact" className="text-[var(--color-primary)] font-semibold hover:underline">
              use the form
            </Link>{' '}
            to arrange it.
          </p>
        </div>
      </div>
    </section>
  );
}
