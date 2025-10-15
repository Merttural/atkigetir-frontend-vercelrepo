// pages/index.js

import SEO from "@/components/SEO";
import Hero from "@/components/Hero";
import StatsSection from '@/components/StatsSection';
import RandomProducts from "@/components/RandomProducts";
import TrustSection from "@/components/TrustSection";
import AdvantagesSection from '@/components/AdvantagesSection';
import AboutBanner from '@/components/AboutBanner';

export default function HomePage() {
  return (
    <>
      <SEO
        title="Atkı Modelleri ve Fiyatları 2024 | Türkiye'nin En Kaliteli Atkıları"
        description="2024'ün en kaliteli atkı modelleri Atkigetir'de! Kişiye özel tasarım atkı, şal, bere ve forma ürünleri. Hızlı kargo, güvenli alışveriş. Ücretsiz kargo fırsatı!"
        keywords="atkı, atkı modelleri, atkı fiyatları, istanbul atkı, türkiye atkı mağazası, online atkı siparişi, kışlık atkı, şal atkı, dokuma atkı, kişiye özel atkı, kaliteli atkı, ucuz atkı, atkı imalatı istanbul, atkı üreticisi türkiye"
        image="/images/logo.svg"
        url="/"
        type="website"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "Atkigetir",
          "alternateName": "Atkı Getir",
          "url": "https://atkigetir.com",
          "logo": "https://atkigetir.com/images/logo.svg",
          "description": "Türkiye'nin en kaliteli atkı, bere, forma ve bayrak ürünleri. Kişiye özel tasarım, hızlı kargo, güvenli alışveriş. İstanbul merkezli online atkı mağazası.",
          "image": "https://atkigetir.com/images/atkiresim.jpg",
          "telephone": "+90-533-749-82-66",
          "email": "info@atkigetir.com",
          "priceRange": "₺₺",
          "currenciesAccepted": "TRY",
          "paymentAccepted": "Cash, Credit Card, Bank Transfer",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "İstanbul",
            "addressLocality": "İstanbul",
            "addressRegion": "İstanbul",
            "postalCode": "34000",
            "addressCountry": "TR"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": "41.0082",
            "longitude": "28.9784"
          },
          "areaServed": {
            "@type": "Country",
            "name": "Turkey"
          },
          "serviceArea": {
            "@type": "GeoCircle",
            "geoMidpoint": {
              "@type": "GeoCoordinates",
              "latitude": "41.0082",
              "longitude": "28.9784"
            },
            "geoRadius": "1000000"
          },
          "openingHours": [
            "Mo-Fr 09:00-18:00",
            "Sa 09:00-17:00"
          ],
          "contactPoint": [
            {
              "@type": "ContactPoint",
              "telephone": "+90-533-749-82-66",
              "contactType": "customer service",
              "availableLanguage": "Turkish",
              "areaServed": "TR"
            },
            {
              "@type": "ContactPoint",
              "email": "info@atkigetir.com",
              "contactType": "customer service",
              "availableLanguage": "Turkish"
            }
          ],
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Atkı Ürünleri",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Product",
                  "name": "Atkı Modelleri",
                  "description": "Çeşitli atkı modelleri"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Product",
                  "name": "Bere Modelleri",
                  "description": "Çeşitli bere modelleri"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Product",
                  "name": "Forma Modelleri",
                  "description": "Çeşitli forma modelleri"
                }
              }
            ]
          },
          "sameAs": [
            "https://www.facebook.com/atkigetir",
            "https://www.instagram.com/atkigetir/",
            "https://t.me/atkigetir"
          ]
        }}
      />
      <Hero />
      <StatsSection />
      <div className="bg-white text-gray-900 min-h-screen">
        <section className="py-6 px-4 bg-gray-50">
          <RandomProducts />
        </section>
        
        {/* SEO İçerik Bölümü */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Türkiye'nin En Kaliteli Atkı Modelleri</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Atkigetir olarak, 2024'ün en kaliteli atkı modellerini sizlerle buluşturuyoruz. 
                Kişiye özel tasarım, şal atkı, dokuma atkı ve kışlık atkı modellerimizle 
                tarzınızı tamamlayın.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🧵</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Premium Malzemeler</h3>
                <p className="text-gray-600">Yün, saten, akrilik ve premium kumaşlardan üretilen dayanıklı atkı modelleri.</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎨</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Kişiye Özel Tasarım</h3>
                <p className="text-gray-600">İstediğiniz renk, desen, boyut ve yazı ile özel atkı tasarımı yapıyoruz.</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🚚</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">İstanbul Merkezli Teslimat</h3>
                <p className="text-gray-600">İstanbul merkezli atölyemizden Türkiye'nin her yerine güvenli ve hızlı kargo seçenekleri sunuyoruz.</p>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-center mb-6 text-gray-900">Atkı Modelleri Hakkında</h3>
              <div className="prose prose-lg max-w-none text-gray-700">
                <p className="mb-4">
                  <strong>İstanbul atkı modelleri</strong> kış aylarının vazgeçilmez aksesuarları arasında yer alır. 
                  Hem ısıtıcı özelliği hem de şık görünümü ile atkılar, gardırobunuzun önemli parçalarıdır.
                </p>
                <p className="mb-4">
                  <strong>Türkiye atkı fiyatları</strong> malzeme kalitesi, tasarım karmaşıklığı ve marka değerine göre değişiklik gösterir. 
                  İstanbul merkezli atölyemizde üretilen kaliteli atkı modelleri ile en uygun fiyatları sunuyoruz.
                </p>
                <p>
                  <strong>Online atkı siparişi</strong> için güvenilir adres Atkigetir. <strong>Kışlık atkı</strong> modellerimiz 
                  özellikle soğuk havalarda sıcaklık sağlarken, <strong>şal atkı</strong> modelleri daha zarif ve şık bir görünüm sunar.
                </p>
              </div>
            </div>
          </div>
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
