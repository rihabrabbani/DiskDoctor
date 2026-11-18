// The team (SEO change list v6). Copy is exactly as supplied; photos are the supplied 800×800 WebP files
// in /public/team, used as they are. /about shows everything; the homepage strip shows names and titles
// only. Not for location pages: the Virginia pages must not show the Maryland lines in the bios.

export type TeamMember = {
  id: string;
  name: string;
  title: string;
  photo: string;
  alt: string;
  bio: string[];
  quote?: string;
};

export const TEAM: TeamMember[] = [
  {
    id: 'shahid-khan',
    name: 'Shahid Khan',
    title: 'Chief Engineer',
    photo: '/team/shahid-khan.webp',
    alt: 'Shahid Khan, Chief Engineer at Disk Doctors',
    bio: [
      'Shahid has been with Disk Doctors for more than 25 years. He started as a hardware engineer and rose to Chief Engineer. He specialises in complex RAID architectures, enterprise storage systems, hard drive failures and digital forensics, with deep knowledge of storage hardware, firmware, file systems and data structures. He oversees complex recovery cases and holds the lab to its standards of accuracy, confidentiality and professional integrity.',
      'Maryland has been home for more than 30 years. Away from the lab he follows professional tennis and UFC, and likes to travel.',
    ],
    quote: 'Behind every failed storage device lies potentially irreplaceable information.',
  },
  {
    id: 'shahzeb-khan',
    name: 'Shahzeb Khan',
    title: 'Strategy & Growth',
    photo: '/team/shahzeb-khan.webp',
    alt: 'Shahzeb Khan, Strategy and Growth at Disk Doctors',
    bio: [
      "Shahzeb graduated summa cum laude from UMBC and did graduate studies in Health Care Management at Johns Hopkins University. His background spans technology, healthcare, finance and strategic consulting. At Disk Doctors he leads growth, business development and the company's technology, with a focus on client satisfaction, transparency, responsiveness and trust.",
    ],
  },
  {
    id: 'gracie-hunt',
    name: 'Gracie Hunt',
    title: 'Director of Operations',
    photo: '/team/gracie-hunt.webp',
    alt: 'Gracie Hunt, Director of Operations at Disk Doctors',
    bio: [
      'Gracie runs daily operations at Disk Doctors: team coordination, workflows, internal processes and customer communications, so every client gets timely, professional service. Born and raised in Maryland, she is a graduate of Lincoln Tech and John Carroll High School, and also a professional baker. Her goal is to build Disk Doctors into a trusted, nationally recognised data recovery company with a customer-first experience.',
    ],
  },
];

// T2: Person schema for /about only, exactly as supplied. worksFor points at the Organization @id.
export const teamPersonSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': 'https://www.diskdoctorsamerica.com/about#shahid-khan',
      name: 'Shahid Khan',
      jobTitle: 'Chief Engineer',
      image: 'https://www.diskdoctorsamerica.com/team/shahid-khan.webp',
      url: 'https://www.diskdoctorsamerica.com/about',
      worksFor: { '@id': 'https://www.diskdoctorsamerica.com/#organization' },
      knowsAbout: [
        'RAID data recovery',
        'Enterprise storage systems',
        'Hard drive failure',
        'Digital forensics',
        'Storage firmware',
        'File systems',
      ],
    },
    {
      '@type': 'Person',
      '@id': 'https://www.diskdoctorsamerica.com/about#shahzeb-khan',
      name: 'Shahzeb Khan',
      jobTitle: 'Strategy & Growth',
      image: 'https://www.diskdoctorsamerica.com/team/shahzeb-khan.webp',
      url: 'https://www.diskdoctorsamerica.com/about',
      worksFor: { '@id': 'https://www.diskdoctorsamerica.com/#organization' },
      alumniOf: { '@type': 'CollegeOrUniversity', name: 'University of Maryland, Baltimore County' },
    },
    {
      '@type': 'Person',
      '@id': 'https://www.diskdoctorsamerica.com/about#gracie-hunt',
      name: 'Gracie Hunt',
      jobTitle: 'Director of Operations',
      image: 'https://www.diskdoctorsamerica.com/team/gracie-hunt.webp',
      url: 'https://www.diskdoctorsamerica.com/about',
      worksFor: { '@id': 'https://www.diskdoctorsamerica.com/#organization' },
    },
  ],
};
