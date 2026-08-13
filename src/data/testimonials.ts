export interface Testimonial {
  id: number;
  quote: string;
  author: string;
  position: string;
  company: string;
  source: string;
  date?: string;
  location?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    quote:
      'I called and took the CPU to the facility and described what had happened and that my PC wouldn\'t even try to Boot-Up any longer. Shahid called later that day and explained what he could do and how much it would cost. When he called 2 days later and said it was done, I was elated. All of my data and documents were backed-up on an external hard drive and he even repaired my hard drive.',
    author: 'Frank O.',
    position: 'Customer',
    company: 'Angi',
    source: 'Angi',
    date: 'Feb 2019',
    location: 'Columbia, MD',
  },
  {
    id: 2,
    quote:
      'Data fully recovered from a dead drive. Turnaround as stated; rush jobs offered as an option. Great professional customer support with someone always answering the phone and answering emails quickly. Very expensive but that\'s the going rate. Hope to never need their services again but feel very lucky to have found them.',
    author: 'Yelp reviewer',
    position: 'Customer',
    company: 'Columbia, MD',
    source: 'Yelp (Disk Doctors, Columbia, MD)',
    date: 'c. 2016',
    location: 'Columbia, MD',
  },
];
