import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { organizationSchema, websiteSchema, localBusinessSchema } from "@/lib/structuredData";

export const metadata: Metadata = {
  title: {
    default: "DiskDoctor - Professional Data Recovery Services | 95% Success Rate",
    template: "%s | DiskDoctor Data Recovery"
  },
  description: "Professional data recovery from hard drives, SSDs, RAID systems, and all digital media. Trusted since 1991 with a 95% success rate. Free evaluation, no data no charge guarantee.",
  keywords: [
    "data recovery",
    "hard drive recovery", 
    "SSD recovery",
    "RAID recovery",
    "file recovery",
    "photo recovery",
    "mobile recovery",
    "data security",
    "professional data recovery",
    "emergency data recovery",
    "Columbia Maryland",
    "Tysons Virginia",
    "disk doctor",
    "data recovery specialists"
  ],
  authors: [{ name: "DiskDoctor Data Recovery" }],
  creator: "DiskDoctor Data Recovery",
  publisher: "DiskDoctor Data Recovery",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.diskdoctorsamerica.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.diskdoctorsamerica.com',
    siteName: 'DiskDoctor Data Recovery',
    title: 'DiskDoctor - Professional Data Recovery Services | 95% Success Rate',
    description: 'Professional data recovery from hard drives, SSDs, RAID systems, and all digital media. Trusted since 1991 with a 95% success rate.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'DiskDoctor Professional Data Recovery Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@diskdoctor',
    creator: '@diskdoctor',
    title: 'DiskDoctor - Professional Data Recovery Services',
    description: 'Professional data recovery from hard drives, SSDs, RAID systems, and all digital media. Trusted since 1991 with a 95% success rate.',
    images: ['/images/og-image.jpg'],
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
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema)
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema)
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema)
          }}
        />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
