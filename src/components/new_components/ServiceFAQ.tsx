'use client';

import { useState } from 'react';

export default function ServiceFAQ({ faqs }: { faqs: { question: string; answer: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  if (!faqs?.length) return null;

  return (
    <section className="py-16 bg-[var(--color-surface-100)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <h2 className="text-3xl font-bold text-[var(--color-text-primary)] mb-8 text-center">
          Frequently asked questions
        </h2>
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div key={faq.question} className="border border-[var(--color-border)] rounded-xl bg-[var(--color-background)]">
              <button
                type="button"
                className="w-full text-left px-5 py-4 font-semibold text-[var(--color-text-primary)]"
                onClick={() => setOpen(open === index ? null : index)}
                aria-expanded={open === index}
              >
                {faq.question}
              </button>
              {open === index ? (
                <p className="px-5 pb-4 text-[var(--color-text-secondary)] leading-relaxed">{faq.answer}</p>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
