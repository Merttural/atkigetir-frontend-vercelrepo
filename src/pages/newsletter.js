import { useState } from "react";
import SEO from "@/components/SEO";
import Link from "next/link";

export default function NewsletterPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Newsletter kayıt işlemi burada yapılacak
    setSubscribed(true);
  };

  return (
    <>
      <SEO
        title="Newsletter Kayıt | Atkigetir - Atkı Trendleri ve Kampanyalar"
        description="Atkigetir newsletter'a kayıt olun! En yeni atkı modelleri, özel kampanyalar, trend haberleri ve indirim fırsatlarından ilk siz haberdar olun."
        keywords="atkigetir newsletter, atkı kampanyaları, atkı indirimleri, atkı trendleri, email abonelik, atkı haberleri"
        url="/newsletter"
        type="page"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Atkigetir Newsletter Kayıt",
          "description": "Atkı trendleri ve kampanyalar için newsletter kayıt sayfası",
          "url": "https://atkigetir.com/newsletter"
        }}
      />

      <main className="max-w-4xl mx-auto py-10 px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Newsletter'a Kayıt Olun
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            En yeni atkı modelleri, özel kampanyalar, trend haberleri ve 
            indirim fırsatlarından ilk siz haberdar olun!
          </p>
        </div>

        {!subscribed ? (
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Ad Soyad *
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Adınızı ve soyadınızı girin"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  E-posta Adresi *
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="ornek@email.com"
                />
              </div>

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="privacy"
                  required
                  className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="privacy" className="text-sm text-gray-600">
                  <Link href="/gizlilik" className="text-blue-600 hover:underline">
                    Gizlilik politikası
                  </Link>{" "}
                  ve{" "}
                  <Link href="/kosullar" className="text-blue-600 hover:underline">
                    kullanım şartlarını
                  </Link>{" "}
                  okudum ve kabul ediyorum.
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center gap-2"
              >
                <span>📧</span>
                <span>Newsletter'a Kayıt Ol</span>
              </button>
            </form>
          </div>
        ) : (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-8 max-w-2xl mx-auto text-center">
            <div className="text-6xl mb-4">✅</div>
            <h2 className="text-2xl font-bold text-green-800 mb-4">
              Kayıt Başarılı!
            </h2>
            <p className="text-green-700 mb-6">
              Newsletter kaydınız başarıyla tamamlandı. Artık en yeni atkı modelleri, 
              özel kampanyalar ve indirim fırsatlarından ilk siz haberdar olacaksınız!
            </p>
            <Link
              href="/"
              className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
            >
              Ana Sayfaya Dön
            </Link>
          </div>
        )}

        {/* Benefits Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Newsletter Avantajları
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎁</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Özel Kampanyalar</h3>
              <p className="text-gray-600">
                Newsletter üyelerine özel indirimler ve kampanyalardan ilk siz haberdar olun.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🆕</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Yeni Ürünler</h3>
              <p className="text-gray-600">
                En yeni atkı modelleri ve koleksiyonlarından ilk siz haberdar olun.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📈</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Trend Haberleri</h3>
              <p className="text-gray-600">
                Atkı dünyasındaki son trendler ve stil önerilerinden haberdar olun.
              </p>
            </div>
          </div>
        </div>

        {/* Content Examples */}
        <div className="mt-16 bg-gray-50 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Newsletter İçeriği
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Haftalık İçerik</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">✓</span>
                  <span>Yeni atkı modelleri ve koleksiyonları</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">✓</span>
                  <span>Özel indirim kuponları</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">✓</span>
                  <span>Stil önerileri ve kombinasyonlar</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">✓</span>
                  <span>Müşteri yorumları ve deneyimleri</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Özel İçerikler</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Sezonluk trend raporları</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Atkı bakımı ve temizlik ipuçları</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Kişiye özel tasarım süreçleri</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Şirket haberleri ve gelişmeler</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Newsletter ile ilgili sorularınız için bizimle iletişime geçin:
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:info@atkigetir.com"
              className="text-blue-600 hover:underline"
            >
              📧 info@atkigetir.com
            </a>
            <a
              href="https://wa.me/905337498266"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 hover:underline"
            >
              📱 0533 749 82 66
            </a>
          </div>
        </div>
      </main>
    </>
  );
}
