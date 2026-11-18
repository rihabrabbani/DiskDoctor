import Image from 'next/image';
import { TEAM } from '@/data/team';

// SEO change list v6, T1: "Meet the team" on /about. 3 columns from md up, 1 on phones; every card uses
// the same square image size.
export default function TeamSection() {
  return (
    <section aria-labelledby="team-h" className="container mx-auto px-4 max-w-5xl py-10">
      <h2 id="team-h" className="text-3xl font-bold text-[var(--color-text-primary)] mb-3">
        Meet the team
      </h2>
      <p className="text-lg text-[var(--color-text-secondary)] mb-8">
        The people who answer your call, run the lab and look after your case.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {TEAM.map((member) => (
          <article
            key={member.id}
            id={member.id}
            className="flex flex-col bg-[var(--color-surface-100)] border border-[var(--color-border)] rounded-2xl p-6"
          >
            <Image
              src={member.photo}
              alt={member.alt}
              width={800}
              height={800}
              loading="lazy"
              sizes="(min-width: 1024px) 300px, (min-width: 768px) 30vw, 100vw"
              className="w-full h-auto aspect-square rounded-xl mb-5"
            />
            <h3 className="text-xl font-semibold text-[var(--color-text-primary)]">{member.name}</h3>
            <p className="text-[var(--color-primary)] font-medium mb-4">{member.title}</p>
            <div className="space-y-3 text-base text-[var(--color-text-secondary)] leading-relaxed">
              {member.bio.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>
            {member.quote && (
              <blockquote className="mt-5 border-l-4 border-[var(--color-primary)] pl-4 italic text-[var(--color-text-primary)]">
                &ldquo;{member.quote}&rdquo;
              </blockquote>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
