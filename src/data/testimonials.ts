export interface Testimonial {
  id: number;
  quote: string;
  author: string;
  position: string;
  company: string;
  avatar: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: "DiskDoctor saved our law firm when our main server crashed during a major case. They recovered 100% of our client files within 48 hours. Absolutely professional and reliable service.",
    author: "Robert Chen",
    position: "Managing Partner",
    company: "Chen & Associates Legal",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=128&q=80"
  },
  {
    id: 2,
    quote: "After our accounting department's drive failed, we thought we lost years of financial records. DiskDoctor's forensic team recovered everything, even files we thought were permanently deleted.",
    author: "Maria Rodriguez",
    position: "CFO",
    company: "TechStart Innovations",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=128&q=80"
  },
  {
    id: 3,
    quote: "The photographers' nightmare - a corrupted memory card with an entire wedding shoot. DiskDoctor recovered every single photo. They literally saved my business and reputation.",
    author: "James Thompson",
    position: "Professional Photographer",
    company: "Thompson Photography Studio",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=128&q=80"
  }
];
