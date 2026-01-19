// Structured Data (JSON-LD) generators for SEO

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "DiskDoctor Data Recovery",
  "alternateName": "Disk Doctor",
  "url": "https://www.diskdoctorsamerica.com",
  "logo": "https://www.diskdoctorsamerica.com/images/logo.png",
  "description": "Professional data recovery services with 95% success rate. Specializing in hard drive, SSD, RAID, and mobile device recovery since 1991.",
  "foundingDate": "1991",
  "slogan": "Your Data is Recoverable",
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "telephone": "+1-410-937-7332",
      "contactType": "customer service",
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
      "contactType": "emergency",
      "areaServed": "US",
      "availableLanguage": "English"
    }
  ],
  "address": [
    {
      "@type": "PostalAddress",
      "streetAddress": "10015 Old Columbia Rd Suite B 215",
      "addressLocality": "Columbia",
      "addressRegion": "Maryland",
      "postalCode": "21046",
      "addressCountry": "US"
    },
    {
      "@type": "PostalAddress",
      "streetAddress": "8300 Boone Blvd Suite 513",
      "addressLocality": "Tysons",
      "addressRegion": "Virginia",
      "postalCode": "22182",
      "addressCountry": "US"
    }
  ],
  "email": "shah4268@msn.com",
  "sameAs": [
    "https://www.facebook.com/diskdoctor",
    "https://www.twitter.com/diskdoctor",
    "https://www.linkedin.com/company/diskdoctor",
    "https://www.youtube.com/diskdoctor"
  ],
  "hasCredential": [
    {
      "@type": "EducationalOccupationalCredential",
      "name": "ISO 9001 Certified",
      "credentialCategory": "certification"
    }
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "150",
    "bestRating": "5",
    "worstRating": "1"
  }
}

export const serviceSchema = (service: any) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "name": service.title,
  "description": service.description,
  "provider": {
    "@type": "Organization",
    "name": "DiskDoctor Data Recovery",
    "url": "https://diskdoctor.com"
  },
  "serviceType": "Data Recovery",
  "category": service.category || "Data Recovery Services",
  "areaServed": {
    "@type": "Country",
    "name": "United States"
  },
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
        "name": feature.title,
        "description": feature.description
      },
      "position": index + 1
    }))
  }
})

export const blogPostSchema = (blog: any) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": blog.title,
  "description": blog.excerpt,
  "image": blog.images?.[0] || "https://diskdoctor.com/images/blog-default.jpg",
  "author": {
    "@type": "Organization",
    "name": "DiskDoctor Data Recovery",
    "url": "https://diskdoctor.com"
  },
  "publisher": {
    "@type": "Organization",
    "name": "DiskDoctor Data Recovery",
    "logo": {
      "@type": "ImageObject",
      "url": "https://diskdoctor.com/images/logo.png"
    }
  },
  "datePublished": blog.createdAt,
  "dateModified": blog.updatedAt || blog.createdAt,
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": `https://www.diskdoctorsamerica.com/blog/${blog.id}`
  },
  "keywords": blog.tags?.join(", ") || "data recovery, blog",
  "articleSection": "Data Recovery",
  "wordCount": blog.content?.replace(/<[^>]*>/g, '').split(' ').length || 0
})

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "DiskDoctor Data Recovery",
  "url": "https://www.diskdoctorsamerica.com",
  "description": "Professional data recovery services with 95% success rate. Specializing in hard drive, SSD, RAID, and mobile device recovery.",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://www.diskdoctorsamerica.com/blog?search={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  },
  "publisher": {
    "@type": "Organization",
    "name": "DiskDoctor Data Recovery",
    "url": "https://diskdoctor.com"
  }
}

export const breadcrumbSchema = (items: Array<{name: string, url: string}>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
})

export const faqSchema = (faqs: Array<{question: string, answer: string}>) => ({
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

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://www.diskdoctorsamerica.com/#localbusiness",
  "name": "DiskDoctor Data Recovery",
  "image": "https://www.diskdoctorsamerica.com/images/logo.png",
  "description": "Professional data recovery services with 95% success rate. Specializing in hard drive, SSD, RAID, and mobile device recovery since 1991.",
  "url": "https://www.diskdoctorsamerica.com",
  "telephone": "+1-410-937-7332",
  "email": "shah4268@msn.com",
  "address": [
    {
      "@type": "PostalAddress",
      "streetAddress": "10015 Old Columbia Rd Suite B 215",
      "addressLocality": "Columbia",
      "addressRegion": "Maryland",
      "postalCode": "21046",
      "addressCountry": "US"
    },
    {
      "@type": "PostalAddress",
      "streetAddress": "8300 Boone Blvd Suite 513",
      "addressLocality": "Tysons",
      "addressRegion": "Virginia",
      "postalCode": "22182",
      "addressCountry": "US"
    }
  ],
  "geo": [
    {
      "@type": "GeoCoordinates",
      "latitude": "39.2037",
      "longitude": "-76.8610"
    },
    {
      "@type": "GeoCoordinates",
      "latitude": "38.9182",
      "longitude": "-77.2228"
    }
  ],
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "00:00",
      "closes": "23:59"
    }
  ],
  "priceRange": "$$",
  "paymentAccepted": ["Cash", "Credit Card", "Check"],
  "currenciesAccepted": "USD",
  "areaServed": {
    "@type": "Country",
    "name": "United States"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Data Recovery Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Hard Drive Recovery",
          "description": "Professional hard drive data recovery services"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "SSD Recovery",
          "description": "Advanced SSD data recovery using specialized tools"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "RAID Recovery",
          "description": "Enterprise RAID array data recovery services"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Mobile Recovery",
          "description": "Smartphone and tablet data recovery services"
        }
      }
    ]
  }
}
