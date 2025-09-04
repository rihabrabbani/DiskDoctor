import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page Not Found - 404',
  description: 'The page you are looking for could not be found.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[var(--color-background)] flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="text-6xl font-bold text-[var(--color-primary)] mb-4">404</div>
        <h1 className="text-2xl font-semibold text-[var(--color-text-primary)] mb-4">
          Page Not Found
        </h1>
        <p className="text-[var(--color-text-secondary)] mb-8">
          The page you are looking for could not be found. It might have been moved, deleted, or you entered the wrong URL.
        </p>
        <div className="space-y-4">
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-primary-hover)] transition-colors duration-300"
          >
            Go Home
          </Link>
          <div className="text-sm text-[var(--color-text-tertiary)]">
            <p>Popular pages:</p>
            <div className="mt-2 space-x-4">
              <Link href="/blog" className="text-[var(--color-primary)] hover:underline">
                Blog
              </Link>
              <Link href="/services/windows-recovery" className="text-[var(--color-primary)] hover:underline">
                Services
              </Link>
              <Link href="/#contact" className="text-[var(--color-primary)] hover:underline">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
