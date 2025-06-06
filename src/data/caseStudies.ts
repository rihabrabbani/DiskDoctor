export interface CaseStudy {
  id: number;
  src: string;
  alt: string;
  category: string;
  title: string;
}

export const caseStudies: CaseStudy[] = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
    alt: "Hard drive data recovery process",
    category: "HARD DRIVE RECOVERY",
    title: "Critical Business Data Recovered from Failed Enterprise Drive"
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    alt: "RAID server recovery",
    category: "RAID RECOVERY",
    title: "Complete RAID 5 Array Restoration for Healthcare Provider"
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1720048169387-84bbb8fd8ec9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "SSD data recovery",
    category: "SSD RECOVERY",
    title: "Advanced SSD Recovery Using Specialized Firmware Tools"
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1533749047139-189de3cf06d3?auto=format&fit=crop&w=800&q=80",
    alt: "Mobile device recovery",
    category: "MOBILE RECOVERY",
    title: "Emergency Recovery of Legal Evidence from Water-Damaged Phone"
  }
];
