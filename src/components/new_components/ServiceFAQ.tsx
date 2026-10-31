// Answers are always rendered: the page's FAQPage JSON-LD is built from the same list, and Google
// only accepts FAQ markup whose answers are visible on the page.
export default function ServiceFAQ({ faqs }: { faqs: { question: string; answer: string }[] }) {
  if (!faqs?.length) return null;

  return (
    <section className="py-16 bg-[var(--color-surface-100)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <h2 className="text-3xl font-bold text-[var(--color-text-primary)] mb-8 text-center">
          Frequently asked questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.question} className="border border-[var(--color-border)] rounded-xl bg-[var(--color-background)] px-5 py-4">
              <h3 className="font-semibold text-[var(--color-text-primary)] mb-2">{faq.question}</h3>
              <p className="text-[var(--color-text-secondary)] leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
