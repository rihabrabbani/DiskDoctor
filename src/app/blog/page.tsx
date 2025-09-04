import { Metadata } from 'next';
import BlogPageClient from './BlogPageClient';

// Add metadata for the blog page
export const metadata: Metadata = {
  title: 'Data Recovery Blog | Expert Tips & Industry News | DiskDoctor',
  description: 'Expert data recovery insights, tips, and industry news from DiskDoctor specialists. Learn about hard drive recovery, SSD repair, and data protection strategies.',
  keywords: 'data recovery blog, hard drive recovery tips, SSD recovery guide, data protection, data loss prevention, recovery techniques, disk doctor blog',
  openGraph: {
    title: 'Data Recovery Blog | Expert Tips & Industry News | DiskDoctor',
    description: 'Expert data recovery insights, tips, and industry news from DiskDoctor specialists. Learn about hard drive recovery, SSD repair, and data protection strategies.',
    type: 'website',
    url: 'https://www.diskdoctorsamerica.com/blog',
    siteName: 'DiskDoctor Data Recovery',
    locale: 'en_US',
    images: [
      {
        url: 'https://www.diskdoctorsamerica.com/images/og-blog.jpg',
        width: 1200,
        height: 630,
        alt: 'DiskDoctor Data Recovery Blog - Expert Tips and Industry News',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@diskdoctor',
    creator: '@diskdoctor',
    title: 'Data Recovery Blog | Expert Tips & Industry News | DiskDoctor',
    description: 'Expert data recovery insights, tips, and industry news from DiskDoctor specialists.',
    images: ['https://www.diskdoctorsamerica.com/images/og-blog.jpg'],
  },
  alternates: {
    canonical: 'https://www.diskdoctorsamerica.com/blog',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function BlogPage() {
  return <BlogPageClient />;
}
