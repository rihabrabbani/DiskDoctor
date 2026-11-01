import Link from 'next/link';
import { serviceRoutes } from '@/data/navigation';
import { locations } from '@/data/locations';
import { EMAIL, PHONE_DISPLAY, PHONE_TEL } from '@/lib/site';

export default function Footer() {
  const labs = locations.filter((l) => l.isHeadOffice || l.slug === 'tysons-va');
  const serviceAreas = locations.filter((l) => !l.isHeadOffice && l.slug !== 'tysons-va');

  return (
    <footer className="bg-[var(--color-surface-200)] border-t border-[var(--color-border)] py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <Link href="/" className="text-2xl font-bold tracking-tight inline-flex items-center text-[var(--color-primary)]">
            DiskDoctor
            <span className="ml-2 text-xs bg-[var(--color-primary)] text-[var(--color-text-inverse)] px-2 py-0.5 rounded">
              DATA RECOVERY
            </span>
          </Link>
          <p className="mt-4 max-w-xl text-[var(--color-text-secondary)]">
            Columbia, MD · Tysons, VA (by appointment). Hard drive, SSD, RAID, and phone recovery since 1991.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4">Contact</h3>
            <div className="space-y-3">
              <a href={PHONE_TEL} className="block text-[var(--color-text-secondary)] hover:text-[var(--color-primary)]">
                {PHONE_DISPLAY}
              </a>
              <a href={`mailto:${EMAIL}`} className="block text-[var(--color-text-secondary)] hover:text-[var(--color-primary)]">
                {EMAIL}
              </a>
              <Link href="/contact" className="block text-[var(--color-primary)] font-medium hover:underline">
                Free evaluation form
              </Link>
              {labs.map((lab) => (
                <p key={lab.slug} className="text-sm text-[var(--color-text-secondary)]">
                  {lab.address}
                </p>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4">Services</h3>
            <ul className="space-y-2">
              {serviceRoutes.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] hover:underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4">Labs</h3>
            <ul className="space-y-2">
              {labs.map((lab) => (
                <li key={lab.slug}>
                  <Link href={`/${lab.slug}`} className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] hover:underline">
                    {lab.fullName}{lab.isHeadOffice ? ' (Head office)' : ''}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mt-6 mb-4">Service areas</h3>
            <ul className="space-y-2">
              {serviceAreas.map((lab) => (
                <li key={lab.slug}>
                  <Link href={`/${lab.slug}`} className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] hover:underline">
                    {lab.fullName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-sm text-[var(--color-text-secondary)] hover:underline">About</Link></li>
              <li><Link href="/locations" className="text-sm text-[var(--color-text-secondary)] hover:underline">All locations</Link></li>
              <li><Link href="/blog" className="text-sm text-[var(--color-text-secondary)] hover:underline">Blog</Link></li>
              <li><Link href="/contact" className="text-sm text-[var(--color-text-secondary)] hover:underline">Contact</Link></li>
              <li><Link href="/privacy" className="text-sm text-[var(--color-text-secondary)] hover:underline">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-sm text-[var(--color-text-secondary)] hover:underline">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[var(--color-border)] text-sm text-[var(--color-text-tertiary)]">
          © {new Date().getFullYear()} DiskDoctor Data Recovery. Trusted since 1991.
        </div>
      </div>
    </footer>
  );
}
