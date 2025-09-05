// pages/index.js

import SEO from "@/components/SEO";
import Hero from "@/components/Hero";
import StatsSection from '@/components/StatsSection';
import CategoryGrid from "@/components/CategoryGrid";
import FeaturedProducts from "@/components/FeaturedProducts";
import TrustSection from "@/components/TrustSection";
import AdvantagesSection from '@/components/AdvantagesSection';
import AboutBanner from '@/components/AboutBanner';

export default function HomePage() {
  return (
    <>
      <SEO
        title="Atkı Modelleri ve Fiyatları | Atkigetir"
        description="Kaliteli şal atkı, dokuma atkı ve kişiye özel tasarımlar Atkigetir.com'da. Güvenli alışveriş, hızlı kargo ve uygun fiyat."
        image="/images/logo.svg"
        canonical="https://www.atkigetir.com/"
      />
      
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "AtkıGetir",
            "url": "https://www.atkigetir.com",
            "logo": "https://www.atkigetir.com/images/logo.svg",
            "description": "Kişiye ve firmaya özel şal, atkı ve bayrak üretimi",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "İstanbul",
              "addressCountry": "TR"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+90-212-225-31-29",
              "contactType": "customer service",
              "availableLanguage": "Turkish"
            },
            "sameAs": [
              "https://www.facebook.com/atkigetir",
              "https://www.instagram.com/atkigetir/",
              "https://t.me/atkigetir"
            ]
          })
        }}
      />
      <Hero />
      <StatsSection />
      <div className="bg-white text-gray-900 min-h-screen">
        <div className="py-6 px-4 max-w-7xl mx-auto">
          <CategoryGrid />
        </div>
        <section className="py-6 px-4 bg-gray-50">
          <FeaturedProducts />
        </section>
        <section className="py-0 px-4 max-w-6xl mx-auto">
          <TrustSection />
          <AdvantagesSection />
          <AboutBanner />
        </section>
      </div>
    </>
  );
}
