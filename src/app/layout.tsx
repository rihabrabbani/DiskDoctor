import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { organizationSchema, websiteSchema, columbiaLocalBusinessSchema, tysonsLocalBusinessSchema } from "@/lib/structuredData";
import AnalyticsClicks from "@/components/analytics/AnalyticsClicks";
import HubspotPageViews from "@/components/analytics/HubspotPageViews";
import StickyMobileBar from "@/components/layout/StickyMobileBar";
import { SITE_URL, SITE_URL_SLASH } from "@/lib/site";

// GTM is the only Google tag on the site: GA4, Google Ads conversions and remarketing all live in the container.
const gtmId = "GTM-K5DVZQX4";
// GTM loads only on the live host, so preview deployments and localhost never send hits to GA4 or Ads.
const GTM_HOST = "www.diskdoctorsamerica.com";
const isProductionBuild = process.env.VERCEL_ENV === "production";

export const metadata: Metadata = {
  title: {
    default: "Data Recovery Services in MD, VA & DC | DiskDoctor",
    template: "%s | DiskDoctor"
  },
  description: "Hard drive, SSD, RAID, and phone data recovery in Columbia MD and Tysons VA. Free evaluation. No data, no charge. Call (410) 937-7332.",
  authors: [{ name: "DiskDoctor Data Recovery" }],
  creator: "DiskDoctor Data Recovery",
  publisher: "DiskDoctor Data Recovery",
  formatDetection: {
    email: false,
    address: false,
    telephone: true,
  },
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: SITE_URL_SLASH,
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    shortcut: '/favicon.svg',
    apple: '/images/icon-192x192.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL_SLASH,
    siteName: 'DiskDoctor Data Recovery',
    title: 'Data Recovery Services in MD, VA & DC | DiskDoctor',
    description: 'Hard drive, SSD, RAID, and phone data recovery in Columbia MD and Tysons VA. Free evaluation. No data, no charge.',
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
    title: 'Data Recovery Services in MD, VA & DC | DiskDoctor',
    description: 'Hard drive, SSD, RAID, and phone data recovery. Free evaluation. No data, no charge.',
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Set the theme before first paint, so dark-mode visitors don't see the light theme flash first.
            ThemeContext applies the same rule after hydration. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{var t=localStorage.getItem('theme')||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.className=t}catch(e){}",
          }}
        />
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
            __html: JSON.stringify(columbiaLocalBusinessSchema)
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(tysonsLocalBusinessSchema)
          }}
        />
      </head>
      <body className="pb-16 lg:pb-0">
        {gtmId ? (
          <>
            <Script id="gtm" strategy="afterInteractive">
              {`if(location.hostname==='${GTM_HOST}')(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`}
            </Script>
            {/* No hostname check is possible without JS, so the no-JS fallback is left out of non-production builds. */}
            {isProductionBuild ? (
              <noscript>
                <iframe
                  src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
                  height="0"
                  width="0"
                  style={{ display: 'none', visibility: 'hidden' }}
                  title="Google Tag Manager"
                />
              </noscript>
            ) : null}
          </>
        ) : null}
        <ThemeProvider>
          <AnalyticsClicks />
          <HubspotPageViews />
          {children}
          <StickyMobileBar />
        </ThemeProvider>
      </body>
    </html>
  );
}
