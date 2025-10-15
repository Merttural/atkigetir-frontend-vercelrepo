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
        keywords="atkı, atkı modelleri, atkı fiyatları, kışlık atkı, şal atkı, dokuma atkı, kişiye özel atkı, kaliteli atkı, ucuz atkı, online atkı mağazası"
        image="/images/logo.svg"
        url="/"
        type="website"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Atkigetir",
          "url": "https://atkigetir.com",
          "logo": "https://atkigetir.com/images/logo.svg",
          "description": "Türkiye'nin en kaliteli atkı, bere, forma ve bayrak ürünleri. Kişiye özel tasarım, hızlı kargo, güvenli alışveriş.",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "İstanbul",
            "addressCountry": "TR"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+90-533-749-82-66",
            "contactType": "customer service",
            "availableLanguage": "Turkish"
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
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Hızlı Teslimat</h3>
                <p className="text-gray-600">Türkiye'nin her yerine güvenli ve hızlı kargo seçenekleri sunuyoruz.</p>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-center mb-6 text-gray-900">Atkı Modelleri Hakkında</h3>
              <div className="prose prose-lg max-w-none text-gray-700">
                <p className="mb-4">
                  <strong>Atkı modelleri</strong> kış aylarının vazgeçilmez aksesuarları arasında yer alır. 
                  Hem ısıtıcı özelliği hem de şık görünümü ile atkılar, gardırobunuzun önemli parçalarıdır.
                </p>
                <p className="mb-4">
                  <strong>Atkı fiyatları</strong> malzeme kalitesi, tasarım karmaşıklığı ve marka değerine göre değişiklik gösterir. 
                  Atkigetir olarak, en uygun fiyatlarla kaliteli atkı modelleri sunuyoruz.
                </p>
                <p>
                  <strong>Kışlık atkı</strong> modellerimiz özellikle soğuk havalarda sıcaklık sağlarken, 
                  <strong>şal atkı</strong> modelleri daha zarif ve şık bir görünüm sunar.
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
