import Image from 'next/image';
import Link from 'next/link';
import { TEAM } from '@/data/team';

// SEO change list v6, T3: the team on the homepage, names and titles only (bios and Person schema live
// on /about). Not for location pages.
export default function HomeTeam() {
  return (
    <section id="team" aria-labelledby="home-team-h" className="py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl text-center">
        <h2
          id="home-team-h"
          className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--color-text-primary)] mb-10"
        >
          The people behind your recovery
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-10">
          {TEAM.map((member) => (
            <li key={member.id} className="flex flex-col items-center">
              <Image
                src={member.photo}
                alt={member.alt}
                width={180}
                height={180}
                loading="lazy"
                className="w-[180px] h-[180px] rounded-2xl mb-4"
              />
              <p className="text-lg font-semibold text-[var(--color-text-primary)]">{member.name}</p>
              <p className="text-[var(--color-text-secondary)]">{member.title}</p>
            </li>
          ))}
        </ul>
        <Link href="/about" className="text-[var(--color-primary)] font-semibold hover:underline">
          Meet the team →
        </Link>
      </div>
    </section>
  );
}
