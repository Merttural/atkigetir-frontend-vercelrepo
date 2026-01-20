import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="tr" className="scroll-smooth">
      <Head>
        {/* Meta tags */}
        <meta charSet="UTF-8" />
        <meta name="description" content="AtkıGetir - Kişiye özel şal, atkı, bere, forma, bayrak üretimi ve satışı. Spor kulüplerine, firmalara, bireylere özel üretim." />
        <meta name="keywords" content="atkı, şal, bere, bayrak, forma, özel tasarım, atkigetir, takım atkısı, spor bayrağı, kurumsal ürünler" />
        <meta name="author" content="AtkıGetir" />
        <meta name="theme-color" content="#3b82f6" />
        
        {/* PWA Meta Tags */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Atkigetir" />
        <meta name="msapplication-TileColor" content="#3b82f6" />

        {/* Open Graph for social sharing */}
        <meta property="og:title" content="AtkıGetir" />
        <meta property="og:description" content="Kişiye ve firmaya özel şal, atkı ve bayrak üretimi." />
        <meta property="og:image" content="/images/atkigetirlogo.jpg" />
        <meta property="og:url" content={process.env.NEXT_PUBLIC_BASE_URL || "https://www.atkigetir.com"} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="AtkıGetir" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AtkıGetir" />
        <meta name="twitter:description" content="Kişiye ve firmaya özel şal, atkı ve bayrak üretimi." />
        <meta name="twitter:image" content="/images/atkigetirlogo.jpg" />

        {/* Favicon and Icons */}
        <link rel="icon" href="/images/atkigetirlogo.jpg" type="image/jpeg" />
        <link rel="shortcut icon" href="/images/atkigetirlogo.jpg" type="image/jpeg" />
        <link rel="apple-touch-icon" href="/images/atkigetirlogo.jpg" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Logo preload kaldırıldı - Layout'ta priority ile yükleniyor */}
        
        {/* 
          NOT: Google Ads ve diğer analytics scriptleri _app.js içinde
          cookie consent kontrolü ile yükleniyor. Burada tekrar eklenmesine gerek yok.
        */}
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <link rel="canonical" href={process.env.NEXT_PUBLIC_BASE_URL || "https://www.atkigetir.com"} />
      </Head>
      <body className="bg-white text-black">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
