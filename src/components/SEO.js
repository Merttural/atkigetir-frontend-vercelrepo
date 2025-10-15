import Head from 'next/head';

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
  const baseUrl = 'https://atkigetir.com';
  
  const fullTitle = title ? `${title} - ${siteName}` : `${siteName} | Kaliteli Atkı ve Bere Ürünleri`;
  const fullDescription = description || siteDescription;
  const fullUrl = url ? `${baseUrl}${url}` : baseUrl;
  const fullImage = image ? `${baseUrl}${image}` : `${baseUrl}/images/logo.svg`;
  const canonicalUrl = canonical || fullUrl;

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
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#2563eb" />
      <meta name="msapplication-TileColor" content="#2563eb" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content={siteName} />
      
      {/* Structured Data */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData)
          }}
        />
      )}
      
      {/* Favicon */}
      <link rel="icon" href="/images/logo.svg" type="image/svg+xml" />
      <link rel="icon" href="/images/logo.svg" sizes="any" />
      <link rel="apple-touch-icon" href="/images/logo.svg" />
      <link rel="manifest" href="/manifest.json" />
      
      {/* Preconnect for Performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* Google Analytics */}
      {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID && (
        <>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}');
              `,
            }}
          />
        </>
      )}
      
      {/* Facebook Pixel */}
      {process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID && (
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID}');
              fbq('track', 'PageView');
            `,
          }}
        />
      )}
    </Head>
  );
} 