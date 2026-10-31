'use client';

import { motion, Variants } from 'framer-motion';
import Image from "next/image";
import Link from "next/link";
import { caseStudies, homeCaseStudyIds } from '@/data/caseStudies';

const homeCases = caseStudies.filter((c) => homeCaseStudyIds.includes(c.id));

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export default function CaseStudiesCarousel() {
  return (
    <section id="case-studies" className="py-16 lg:py-24 bg-[var(--color-surface-100)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--color-text-primary)]">
            Recovery <span className="text-[var(--color-primary)]">success stories</span>
          </h2>
          <p className="mt-3 text-[var(--color-text-secondary)] max-w-2xl">
            Representative cases from the Columbia lab. Every job starts with a free evaluation and a fixed quote before work begins.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {homeCases.map((slide) => (
            <motion.div
              key={slide.id}
              className="bg-[var(--color-surface-100)] border border-[var(--color-border)] rounded-2xl overflow-hidden h-full"
              variants={cardVariants}
            >
              <div className="relative h-44 overflow-hidden">
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  className="object-cover"
                />
                <span className="absolute bottom-3 left-3 bg-black/80 text-white text-xs px-3 py-1 rounded-lg font-medium">
                  {slide.category}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-lg mb-3 text-[var(--color-text-primary)] line-clamp-2">
                  {slide.title}
                </h3>
                <p className="text-[var(--color-text-secondary)] text-sm mb-4 line-clamp-4 leading-relaxed">
                  {slide.summary}
                </p>
                <Link
                  href={slide.href}
                  className="inline-flex items-center text-sm font-medium text-[var(--color-primary)] hover:underline"
                >
                  Related service
                  <svg className="ml-1 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
