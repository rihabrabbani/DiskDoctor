'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const basePath = process.env.NODE_ENV === 'production' ? '/DiskDoctor' : '';

  return (
    <html>
      <body className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)] flex items-center justify-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-6xl sm:text-7xl font-bold text-[var(--color-primary)] mb-8">
              ⚠️
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-text-primary)] mb-4">
              Something went wrong
            </h1>
            
            <p className="text-lg text-[var(--color-text-secondary)] mb-8">
              We encountered an unexpected error. Please try again.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={reset}
                className="px-6 py-3 bg-[var(--color-primary)] text-white rounded-lg font-semibold hover:bg-[var(--color-primary-hover)] transition-all duration-300"
              >
                Try Again
              </button>
              
              <Link 
                href={`${basePath}/`}
                className="px-6 py-3 bg-[var(--color-surface-100)] border-2 border-[var(--color-border)] rounded-lg text-[var(--color-text-primary)] font-semibold hover:shadow-[var(--shadow-md)] hover:border-[var(--color-border-hover)] transition-all duration-300 text-center block"
              >
                Go Home
              </Link>
            </div>
          </motion.div>
        </div>
      </body>
    </html>
  );
}
