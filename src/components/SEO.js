import Head from 'next/head';

/**
 * SEO Component - Optimize edilmiş meta tag ve structured data yönetimi
 * Analytics scriptleri _app.js'de yönetiliyor
 */
export default function SEO({ 
  title, 
  description, 
  keywords, 
  image, 
  url, 
  type = 'website',
  noindex = false,
  structuredData = null,
  canonical = null
}) {
  const siteName = 'Atkigetir';
  const siteDescription = 'Türkiye\'nin en kaliteli atkı, bere, forma ve bayrak ürünleri. Kişiye özel tasarım, hızlı kargo, güvenli alışveriş.';
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://atkigetir.com';
  
  const fullTitle = title ? `${title} | ${siteName}` : `${siteName} | Kaliteli Atkı ve Bere Ürünleri`;
  const fullDescription = description || siteDescription;
  const fullUrl = url ? `${baseUrl}${url}` : baseUrl;
  const fullImage = image ? (image.startsWith('http') ? image : `${baseUrl}${image}`) : `${baseUrl}/images/logo.svg`;
  const canonicalUrl = canonical || fullUrl;

  // Default Organization Structured Data
  const defaultOrganizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": siteName,
    "url": baseUrl,
    "logo": `${baseUrl}/images/logo.svg`,
    "description": siteDescription,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "İstanbul",
      "addressCountry": "TR"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+90-533-749-82-66",
      "contactType": "customer service",
      "availableLanguage": ["Turkish"]
    },
    "sameAs": [
      // Sosyal medya linkleriniz varsa buraya ekleyin
    ]
  };

  // WebSite Schema with SearchAction
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": siteName,
    "url": baseUrl,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${baseUrl}/urunler?search={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  // Structured data'yı birleştir
  const allStructuredData = [
    defaultOrganizationSchema,
    websiteSchema,
    ...(structuredData ? (Array.isArray(structuredData) ? structuredData : [structuredData]) : [])
  ];

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      <meta name="keywords" content={keywords || 'atkı, atkı modelleri, atkı fiyatları, kışlık atkı, şal atkı, dokuma atkı, bere, forma, bayrak, kişiye özel tasarım, kaliteli atkı'} />
      <meta name="author" content={siteName} />
      <meta name="robots" content={noindex ? 'noindex,nofollow' : 'index,follow'} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Language and Locale */}
      <meta httpEquiv="content-language" content="tr" />
      <meta name="language" content="Turkish" />
      <meta name="geo.region" content="TR" />
      <meta name="geo.placename" content="İstanbul" />
      
      {/* Hreflang Tags */}
      <link rel="alternate" hreflang="tr" href={fullUrl} />
      <link rel="alternate" hreflang="x-default" href={fullUrl} />
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title || siteName} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="tr_TR" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={fullImage} />
      <meta name="twitter:image:alt" content={title || siteName} />
      <meta name="twitter:site" content="@atkigetir" />
      <meta name="twitter:creator" content="@atkigetir" />
      
      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#2563EB" />
      <meta name="msapplication-TileColor" content="#2563EB" />
      
      {/* Preload Critical Resources */}
      <link rel="preload" href="/images/atkigetirlogo.jpg" as="image" type="image/jpeg" />
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      <link rel="dns-prefetch" href="//www.googletagmanager.com" />
      <link rel="dns-prefetch" href="//connect.facebook.net" />
      
      {/* Structured Data (JSON-LD) */}
      {allStructuredData.map((data, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(data, null, 0)
          }}
        />
      ))}
      
      {/* Favicon */}
      <link rel="icon" href="/images/atkigetirlogo.jpg" type="image/jpeg" />
      <link rel="apple-touch-icon" href="/images/atkigetirlogo.jpg" />
      
      {/* Preconnect for Performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    </Head>
  );
}
