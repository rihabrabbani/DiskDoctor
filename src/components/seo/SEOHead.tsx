import Head from 'next/head'

interface SEOHeadProps {
  title?: string
  description?: string
  keywords?: string
  canonicalUrl?: string
  ogImage?: string
  ogType?: string
  twitterCard?: string
  structuredData?: any
  noindex?: boolean
  nofollow?: boolean
}

export default function SEOHead({
  title = "DiskDoctor - Professional Data Recovery Services | 95% Success Rate",
  description = "Professional data recovery from hard drives, SSDs, RAID systems, and all digital media. Trusted since 1991 with a 95% success rate. Free evaluation, no data no charge guarantee.",
  keywords = "data recovery, hard drive recovery, SSD recovery, RAID recovery, file recovery, photo recovery, mobile recovery, data security, professional data recovery, emergency data recovery",
  canonicalUrl,
  ogImage = "https://diskdoctor.com/images/og-image.jpg",
  ogType = "website",
  twitterCard = "summary_large_image",
  structuredData,
  noindex = false,
  nofollow = false
}: SEOHeadProps) {
  const fullTitle = title.includes('DiskDoctor') ? title : `${title} | DiskDoctor Data Recovery`
  const fullDescription = description.length > 160 ? description.substring(0, 157) + '...' : description
  
  const robotsContent = [
    noindex ? 'noindex' : 'index',
    nofollow ? 'nofollow' : 'follow'
  ].join(', ')

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="DiskDoctor Data Recovery" />
      <meta name="robots" content={robotsContent} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#00a864" />
      
      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      
      {/* Open Graph Meta Tags */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      <meta property="og:url" content={canonicalUrl || "https://www.diskdoctorsamerica.com"} />
      <meta property="og:site_name" content="DiskDoctor Data Recovery" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={title} />
      <meta name="twitter:site" content="@diskdoctor" />
      <meta name="twitter:creator" content="@diskdoctor" />
      
      {/* Additional SEO Meta Tags */}
      <meta name="geo.region" content="US-MD" />
      <meta name="geo.placename" content="Columbia, Maryland" />
      <meta name="geo.position" content="39.2037;-76.8610" />
      <meta name="ICBM" content="39.2037, -76.8610" />
      
      {/* Business Information */}
      <meta name="business:contact_data:street_address" content="10015 Old Columbia Rd Suite B 215" />
      <meta name="business:contact_data:locality" content="Columbia" />
      <meta name="business:contact_data:region" content="Maryland" />
      <meta name="business:contact_data:postal_code" content="21046" />
      <meta name="business:contact_data:country_name" content="United States" />
      <meta name="business:contact_data:phone_number" content="+1-571-202-8529" />
      <meta name="business:contact_data:email" content="shah4268@msn.com" />
      
      {/* Structured Data */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData)
          }}
        />
      )}
      
      {/* Preconnect to external domains for performance */}
      <link rel="preconnect" href="https://images.unsplash.com" />
      <link rel="preconnect" href="https://res.cloudinary.com" />
      <link rel="dns-prefetch" href="https://images.unsplash.com" />
      <link rel="dns-prefetch" href="https://res.cloudinary.com" />
    </Head>
  )
}
