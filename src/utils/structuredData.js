/**
 * Structured Data (Schema.org) Helper Functions
 * SEO için JSON-LD formatında structured data oluşturur
 */

export function getHomePageStructuredData() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://atkigetir.com';
  
  return [
    // Organization Schema
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Atkigetir",
      "url": baseUrl,
      "logo": `${baseUrl}/images/logo.svg`,
      "description": "Türkiye'nin önde gelen taraftar atkısı ve bayrak üreticisi. Özel üretim, toptan fiyat, hızlı teslimat.",
      "foundingDate": "1999",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+90-533-749-82-66",
        "contactType": "customer service",
        "areaServed": "TR",
        "availableLanguage": ["Turkish"]
      },
      "sameAs": [
        "https://www.facebook.com/atkigetir",
        "https://www.instagram.com/atkigetir",
        "https://twitter.com/atkigetir"
      ],
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "İstanbul",
        "addressCountry": "TR"
      }
    },
    
    // LocalBusiness Schema
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": `${baseUrl}/#organization`,
      "name": "Atkigetir",
      "image": `${baseUrl}/images/logo.svg`,
      "url": baseUrl,
      "telephone": "+90-533-749-82-66",
      "priceRange": "$$",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "İstanbul",
        "addressRegion": "İstanbul",
        "addressCountry": "TR"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "41.0082",
        "longitude": "28.9784"
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "09:00",
          "closes": "18:00"
        }
      ],
      "areaServed": {
        "@type": "Country",
        "name": "Turkey"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Taraftar Atkısı ve Bayrak Ürünleri",
        "itemListElement": [
          {
            "@type": "OfferCatalog",
            "name": "Atkı",
            "itemListElement": {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Product",
                "name": "Taraftar Atkısı"
              }
            }
          },
          {
            "@type": "OfferCatalog",
            "name": "Bayrak",
            "itemListElement": {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Product",
                "name": "Taraftar Bayrağı"
              }
            }
          }
        ]
      }
    },
    
    // WebSite Schema
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Atkigetir",
      "url": baseUrl,
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": `${baseUrl}/urunler?search={search_term_string}`
        },
        "query-input": "required name=search_term_string"
      }
    },
    
    // BreadcrumbList Schema
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Anasayfa",
          "item": baseUrl
        }
      ]
    }
  ];
}

export function getFAQStructuredData(faqs) {
  return {
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
  };
}

export function getProductStructuredData(products) {
  return products.slice(0, 10).map(product => ({
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description || `${product.name} - Özel üretim taraftar atkısı`,
    "image": product.image || product.image_url || "https://atkigetir.com/images/placeholder.svg",
    "brand": {
      "@type": "Brand",
      "name": "Atkigetir"
    },
    "offers": {
      "@type": "Offer",
      "url": `${process.env.NEXT_PUBLIC_BASE_URL || 'https://atkigetir.com'}/urunler/${product.slug || product.id}`,
      "priceCurrency": "TRY",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "Atkigetir"
      }
    },
    "category": product.category || "Taraftar Ürünleri"
  }));
}
