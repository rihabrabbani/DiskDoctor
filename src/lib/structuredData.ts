// Structured Data (JSON-LD) generators for SEO

import { COLUMBIA_MAPS_URL, TYSONS_MAPS_URL } from "./site"

const SITE = "https://www.diskdoctorsamerica.com"

// Stable entity ids. Service pages point their provider at COLUMBIA_ID.
export const ORGANIZATION_ID = `${SITE}/#organization`
export const COLUMBIA_ID = `${SITE}/#columbia`
export const TYSONS_ID = `${SITE}/#tysons`

const servicesOffered = [
  { name: "Hard Drive Recovery", path: "/services/hard-drive-recovery" },
  { name: "SSD & NVMe Recovery", path: "/services/ssd-recovery" },
  { name: "RAID Recovery", path: "/services/raid-recovery" },
  { name: "NAS Recovery", path: "/services/nas-recovery" },
  { name: "Server & Virtual Machine Recovery", path: "/services/server-recovery" },
]

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": ORGANIZATION_ID,
  "name": "DiskDoctor Data Recovery",
  "alternateName": "Disk Doctor",
  "url": SITE,
  "logo": `${SITE}/images/logo.png`,
  "image": `${SITE}/images/logo.png`,
  "description": "ISO 9001 certified data recovery lab in Columbia, MD, recovering hard drives, SSDs, RAID arrays, NAS units and servers since 1991. 15,000+ cases recovered, 95% success rate.",
  "foundingDate": "1991",
  "slogan": "Your Data is Recoverable",
  "email": "shah4268@msn.com",
  "telephone": "+1-410-937-7332",
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "telephone": "+1-410-937-7332",
      "contactType": "emergency",
      "areaServed": "US",
      "availableLanguage": "English",
      "hoursAvailable": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "00:00",
        "closes": "23:59"
      }
    },
    {
      "@type": "ContactPoint",
      "telephone": "+1-410-937-7332",
      "email": "shah4268@msn.com",
      "contactType": "customer service",
      "areaServed": "US",
      "availableLanguage": "English"
    }
  ],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "10015 Old Columbia Rd Suite B 215",
    "addressLocality": "Columbia",
    "addressRegion": "MD",
    "postalCode": "21046",
    "addressCountry": "US"
  },
  "hasCredential": [
    {
      "@type": "EducationalOccupationalCredential",
      "name": "ISO 9001 Certified",
      "credentialCategory": "certification"
    }
  ],
  "department": [{ "@id": COLUMBIA_ID }, { "@id": TYSONS_ID }]
}

// Columbia, MD: head office and recovery lab (walk-in hours).
export const columbiaLocalBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": COLUMBIA_ID,
  "name": "DiskDoctor Data Recovery — Columbia, MD Lab",
  "description": "Head office and ISO 9001 certified recovery lab, with a clean room, for hard drives, SSDs, RAID arrays, NAS units and servers. Walk-in Monday to Friday; 24/7 emergency line.",
  "url": `${SITE}/columbia-md`,
  "hasMap": COLUMBIA_MAPS_URL,
  "image": `${SITE}/images/logo.png`,
  "telephone": "+1-410-937-7332",
  "email": "shah4268@msn.com",
  "parentOrganization": { "@id": ORGANIZATION_ID },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "10015 Old Columbia Rd Suite B 215",
    "addressLocality": "Columbia",
    "addressRegion": "MD",
    "postalCode": "21046",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 39.2037,
    "longitude": -76.861
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "08:30",
      "closes": "17:00"
    }
  ],
  "areaServed": [
    { "@type": "State", "name": "Maryland" },
    { "@type": "State", "name": "Virginia" },
    { "@type": "AdministrativeArea", "name": "District of Columbia" }
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Data Recovery Services",
    "itemListElement": servicesOffered.map((service) => ({
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": service.name,
        "url": `${SITE}${service.path}`
      }
    }))
  }
}

// Tysons, VA: office by appointment. No opening hours, because there are no walk-in hours.
export const tysonsLocalBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": TYSONS_ID,
  "name": "DiskDoctor Data Recovery — Tysons, VA Office",
  "description": "Northern Virginia office, by appointment, for hard drive, SSD, RAID and phone data recovery. Free evaluation.",
  "url": `${SITE}/tysons-va`,
  "hasMap": TYSONS_MAPS_URL,
  "image": `${SITE}/images/logo.png`,
  "telephone": "+1-571-202-8529",
  "parentOrganization": { "@id": ORGANIZATION_ID },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "8300 Boone Blvd Suite 513",
    "addressLocality": "Tysons",
    "addressRegion": "VA",
    "postalCode": "22182",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 38.9182,
    "longitude": -77.2228
  }
}

const serviceAreaServed = [
  { "@type": "State", "name": "Maryland" },
  { "@type": "State", "name": "Virginia" },
  { "@type": "AdministrativeArea", "name": "District of Columbia" },
  { "@type": "Country", "name": "United States" }
]

export const serviceSchema = (service: any) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "name": service.title,
  "description": service.description,
  "url": `${SITE}/services/${service.id}`,
  "provider": { "@id": COLUMBIA_ID },
  "serviceType": "Data Recovery",
  "category": service.category || "Data Recovery Services",
  "areaServed": serviceAreaServed,
  "availableChannel": {
    "@type": "ServiceChannel",
    "servicePhone": "+1-410-937-7332",
    "availableLanguage": ["English"]
  },
  "offers": {
    "@type": "Offer",
    "description": "Free evaluation and consultation",
    "price": "0",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Data Recovery Services",
    "itemListElement": service.features?.map((feature: any, index: number) => ({
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": typeof feature === 'string' ? feature : feature.title,
        "description": typeof feature === 'string' ? undefined : feature.description
      },
      "position": index + 1
    }))
  }
})

export const coreServiceSchema = (page: { h1: string; seoDescription: string; path: string }) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "name": page.h1,
  "description": page.seoDescription,
  "url": `https://www.diskdoctorsamerica.com${page.path}`,
  "serviceType": "Data Recovery",
  "provider": { "@id": COLUMBIA_ID },
  "areaServed": serviceAreaServed,
  "availableChannel": {
    "@type": "ServiceChannel",
    "servicePhone": "+1-410-937-7332",
    "availableLanguage": ["English"]
  }
})

export const blogPostSchema = (blog: any) => {
  const canonicalPath = blog.slug || blog.id;
  const featuredImage =
    blog.featuredImage ||
    blog.images?.[0] ||
    blog.sections?.find((section: any) => section?.image)?.image ||
    "https://www.diskdoctorsamerica.com/images/og-blog.jpg";

  const sectionText = Array.isArray(blog.sections)
    ? blog.sections
        .map((section: any) => `${section?.heading || ''} ${section?.content || ''}`)
        .join(' ')
    : '';

  const sourceText = blog.content || sectionText || '';
  const plainText = sourceText.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  const computedWordCount = plainText ? plainText.split(' ').length : 0;

  return {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": blog.title,
  "description": blog.metaDescription || blog.excerpt,
  "image": featuredImage,
  "author": {
    "@type": "Organization",
    "name": "DiskDoctor Data Recovery",
    "url": "https://www.diskdoctorsamerica.com"
  },
  "publisher": {
    "@type": "Organization",
    "name": "DiskDoctor Data Recovery",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.diskdoctorsamerica.com/images/logo.png"
    }
  },
  "datePublished": blog.createdAt,
  "dateModified": blog.updatedAt || blog.createdAt,
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": `https://www.diskdoctorsamerica.com/blog/${canonicalPath}`
  },
  "keywords": blog.tags?.join(", ") || "data recovery, blog",
  "articleSection": blog.category || "Data Recovery",
  "wordCount": blog.wordCount || computedWordCount
  }
}

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "DiskDoctor Data Recovery",
  "url": "https://www.diskdoctorsamerica.com",
  "description": "Data recovery for hard drives, SSDs, RAID arrays, NAS units and servers from an ISO 9001 certified lab in Columbia, MD.",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://www.diskdoctorsamerica.com/blog?search={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  },
  "publisher": { "@id": ORGANIZATION_ID }
}

export const breadcrumbSchema = (items: Array<{ name: string, url: string }>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
})

export const faqSchema = (faqs: Array<{ question: string, answer: string }>) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
})
