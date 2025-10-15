import SEO from "@/components/SEO";
import Link from "next/link";

export default function PartnerlikPage() {
  return (
    <>
      <SEO
        title="Partnerlik ve İş Birliği | Atkigetir"
        description="Atkigetir ile iş birliği yapın. Blog yazarları, influencer'lar ve e-ticaret siteleri için partnerlik programı. Ortak çalışma fırsatları."
        keywords="atkigetir partnerlik, atkı iş birliği, blog yazarları, influencer, affiliate, ortaklık, atkı sponsorluk"
        url="/partnerlik"
        type="page"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Atkigetir Partnerlik Programı",
          "description": "Atkigetir ile iş birliği fırsatları ve partnerlik programı",
          "url": "https://atkigetir.com/partnerlik",
          "mainEntity": {
            "@type": "Organization",
            "name": "Atkigetir",
            "url": "https://atkigetir.com"
          }
        }}
      />

      <main className="max-w-6xl mx-auto py-10 px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Partnerlik ve İş Birliği
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Atkigetir ile birlikte çalışmak istiyorsanız, size özel iş birliği 
            fırsatları sunuyoruz. Blog yazarları, influencer'lar ve e-ticaret 
            siteleri için kapsamlı partnerlik programımız.
          </p>
        </div>

        {/* Partnership Types */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="text-center mb-4">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📝</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Blog Yazarları</h3>
            </div>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>Guest post yazımı</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>Ürün inceleme fırsatları</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>Özel indirim kuponları</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>Komisyon bazlı ortaklık</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="text-center mb-4">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Influencer'lar</h3>
            </div>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>Ücretsiz ürün gönderimi</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>Sponsorluk fırsatları</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>Özel kampanya kodları</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>Uzun vadeli iş birlikleri</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="text-center mb-4">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🛒</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">E-ticaret Siteleri</h3>
            </div>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>Toplu alım indirimleri</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>Özel ürün koleksiyonları</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>Marka ortaklıkları</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>Beyaz etiket üretim</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="bg-blue-50 rounded-xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Partnerlik Avantajları
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Size Özel Avantajlar</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">🎁</span>
                  <span>Özel fiyatlandırma ve indirimler</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">📦</span>
                  <span>Hızlı ve ücretsiz kargo</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">🎨</span>
                  <span>Kişiye özel tasarım desteği</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">📞</span>
                  <span>Özel müşteri hizmetleri</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Ortak Faydalar</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">📈</span>
                  <span>Karşılıklı trafik artışı</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">🔗</span>
                  <span>Backlink değişimi</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">🤝</span>
                  <span>Uzun vadeli iş birlikleri</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">💼</span>
                  <span>Profesyonel network genişletme</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Application Process */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Başvuru Süreci
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                1
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Başvuru</h3>
              <p className="text-sm text-gray-600">Partnerlik formunu doldurun</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                2
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Değerlendirme</h3>
              <p className="text-sm text-gray-600">Başvurunuzu 48 saat içinde değerlendiriyoruz</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                3
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Onay</h3>
              <p className="text-sm text-gray-600">Partnerlik koşullarını belirliyoruz</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                4
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Başlangıç</h3>
              <p className="text-sm text-gray-600">İş birliğine başlıyoruz</p>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">
            Partnerlik Başvurusu Yapın
          </h2>
          <p className="text-lg mb-6 opacity-90">
            Atkigetir ailesine katılmak için hemen başvurun. 
            Size özel iş birliği fırsatları bekliyor!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/905337498266?text=Merhabalar%20Kerim%20Bey%20Partnerlik%20için%20başvuru%20yapmak%20istiyorum."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium inline-flex items-center justify-center"
            >
              <span className="mr-2">📱</span>
              WhatsApp ile Başvur
            </a>
            <a
              href="mailto:info@atkigetir.com?subject=Partnerlik Başvurusu&body=Merhaba, Atkigetir ile partnerlik yapmak istiyorum. Detayları aşağıda paylaşıyorum:"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors font-medium inline-flex items-center justify-center"
            >
              <span className="mr-2">✉️</span>
              Email ile Başvur
            </a>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Sıkça Sorulan Sorular
          </h2>
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Partnerlik için minimum gereksinimler nelerdir?
              </h3>
              <p className="text-gray-700">
                Blog yazarları için aylık 1000+ ziyaretçi, influencer'lar için 5000+ takipçi, 
                e-ticaret siteleri için aktif mağaza durumu gerekmektedir.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Komisyon oranları nasıl belirleniyor?
              </h3>
              <p className="text-gray-700">
                Komisyon oranları partner türüne ve aylık satış hacmine göre %5-15 arasında değişmektedir. 
                Detaylar başvuru sonrası belirlenir.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Ödeme süreçleri nasıl işliyor?
              </h3>
              <p className="text-gray-700">
                Ödemeler aylık olarak yapılmaktadır. Banka havalesi veya PayPal ile ödeme seçenekleri mevcuttur.
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
