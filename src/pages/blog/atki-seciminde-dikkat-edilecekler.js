import SEO from "@/components/SEO";
import Link from "next/link";
import Image from "next/image";

export default function AtkiSecimindeDikkatEdilecekler() {
  return (
    <>
      <SEO
        title="Atkı Seçiminde Dikkat Edilmesi Gerekenler | Kapsamlı Rehber"
        description="Doğru atkı seçimi için malzeme, renk, boyut ve stil faktörlerini değerlendirme rehberi. Atkı seçim ipuçları ve önerileri."
        keywords="atkı seçimi, atkı rehberi, atkı malzemesi, atkı boyutu, atkı rengi, atkı bakımı, doğru atkı seçimi, atkı önerileri"
        url="/blog/atki-seciminde-dikkat-edilecekler"
        type="article"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": "Atkı Seçiminde Dikkat Edilmesi Gerekenler",
          "description": "Doğru atkı seçimi için malzeme, renk, boyut ve stil faktörlerini değerlendirme rehberi.",
          "image": "/images/atkiresimleri.jpg",
          "datePublished": "2024-01-10",
          "dateModified": "2024-01-10",
          "author": {
            "@type": "Person",
            "name": "Atkigetir Editör"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Atkigetir",
            "logo": {
              "@type": "ImageObject",
              "url": "https://atkigetir.com/images/logo.svg"
            }
          },
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "https://atkigetir.com/blog/atki-seciminde-dikkat-edilecekler"
          }
        }}
      />

      <article className="max-w-4xl mx-auto py-10 px-4">
        {/* Breadcrumb */}
        <nav className="mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li>
              <Link href="/" className="hover:text-blue-600 transition-colors">
                Ana Sayfa
              </Link>
            </li>
            <li className="flex items-center">
              <svg className="w-4 h-4 mx-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <Link href="/blog" className="hover:text-blue-600 transition-colors">
                Blog
              </Link>
            </li>
            <li className="flex items-center">
              <svg className="w-4 h-4 mx-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-900 font-medium">Atkı Seçim Rehberi</span>
            </li>
          </ol>
        </nav>

        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <span>10 Ocak 2024</span>
            <span className="mx-2">•</span>
            <span>4 dk okuma</span>
            <span className="mx-2">•</span>
            <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs font-medium">
              Rehber
            </span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Atkı Seçiminde Dikkat Edilmesi Gerekenler
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Doğru atkı seçimi için malzeme, renk, boyut ve stil faktörlerini 
            değerlendirme rehberi ve uzman önerileri.
          </p>
        </header>

        {/* Featured Image */}
        <div className="relative w-full h-96 rounded-xl overflow-hidden mb-8">
          <Image
            src="/images/atkiresimleri.jpg"
            alt="Atkı seçim rehberi"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 800px"
            priority
          />
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Atkı Seçiminde Temel Faktörler
          </h2>
          
          <p className="text-gray-700 mb-6 leading-relaxed">
            <strong>Atkı seçimi</strong> yaparken dikkat edilmesi gereken birçok faktör bulunmaktadır. 
            Doğru atkı seçimi, hem konforunuzu hem de görünümünüzü doğrudan etkiler. 
            Bu rehberde atkı seçiminde dikkat edilmesi gereken temel faktörleri ele alacağız.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            1. Malzeme Seçimi
          </h3>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Atkı seçiminde en önemli faktörlerden biri <strong>malzeme</strong>dir. 
            Her malzemenin kendine özgü avantajları ve dezavantajları bulunmaktadır.
          </p>

          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Malzeme Karşılaştırması</h4>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <h5 className="font-semibold text-gray-900">Yün</h5>
                <p className="text-gray-700 text-sm">
                  <strong>Avantajlar:</strong> Doğal, sıcak, nefes alabilir<br/>
                  <strong>Dezavantajlar:</strong> Bakımı zor, yıkanabilir değil
                </p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <h5 className="font-semibold text-gray-900">Akrilik</h5>
                <p className="text-gray-700 text-sm">
                  <strong>Avantajlar:</strong> Dayanıklı, kolay bakım, ekonomik<br/>
                  <strong>Dezavantajlar:</strong> Doğal değil, elektriklenebilir
                </p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4">
                <h5 className="font-semibold text-gray-900">Kaşmir</h5>
                <p className="text-gray-700 text-sm">
                  <strong>Avantajlar:</strong> Yumuşak, hafif, lüks<br/>
                  <strong>Dezavantajlar:</strong> Pahalı, bakımı özenli
                </p>
              </div>
              <div className="border-l-4 border-orange-500 pl-4">
                <h5 className="font-semibold text-gray-900">Saten</h5>
                <p className="text-gray-700 text-sm">
                  <strong>Avantajlar:</strong> Şık görünüm, yumuşak<br/>
                  <strong>Dezavantajlar:</strong> Soğuk havalarda yetersiz
                </p>
              </div>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            2. Boyut ve Uzunluk
          </h3>
          <p className="text-gray-700 mb-6 leading-relaxed">
            <strong>Atkı boyutu</strong>, kullanım amacınıza göre değişiklik gösterir. 
            Standart atkı boyutları genellikle 180x30 cm'dir, ancak farklı ihtiyaçlar 
            için özel boyutlar da mevcuttur.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Standart Boyut</h4>
              <p className="text-gray-700 text-sm">
                180x30 cm - Günlük kullanım için ideal, çoğu bağlama tekniği için uygun
              </p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Uzun Atkı</h4>
              <p className="text-gray-700 text-sm">
                200x35 cm - Şal tarzı kullanım için ideal, daha fazla sarma imkanı
              </p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Çocuk Atkısı</h4>
              <p className="text-gray-700 text-sm">
                120x25 cm - Çocuklar için özel tasarlanmış, güvenli kullanım
              </p>
            </div>
            <div className="bg-orange-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Jumbo Atkı</h4>
              <p className="text-gray-700 text-sm">
                220x40 cm - Oversized modeller, maksimum sıcaklık
              </p>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            3. Renk Seçimi
          </h3>
          <p className="text-gray-700 mb-6 leading-relaxed">
            <strong>Atkı rengi</strong> seçimi, kişisel tarzınız ve kıyafetlerinizle 
            uyumlu olmalıdır. Klasik renkler uzun vadeli kullanım için ideal iken, 
            trend renkler moda takibi için tercih edilebilir.
          </p>

          <div className="bg-yellow-50 rounded-lg p-6 mb-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Renk Önerileri</h4>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <h5 className="font-semibold text-gray-900 mb-2">Klasik Renkler</h5>
                <ul className="text-gray-700 text-sm space-y-1">
                  <li>• Siyah</li>
                  <li>• Beyaz</li>
                  <li>• Gri</li>
                  <li>• Kahverengi</li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold text-gray-900 mb-2">Nötr Renkler</h5>
                <ul className="text-gray-700 text-sm space-y-1">
                  <li>• Bej</li>
                  <li>• Krem</li>
                  <li>• Haki</li>
                  <li>• Bordo</li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold text-gray-900 mb-2">Canlı Renkler</h5>
                <ul className="text-gray-700 text-sm space-y-1">
                  <li>• Kırmızı</li>
                  <li>• Mavi</li>
                  <li>• Yeşil</li>
                  <li>• Mor</li>
                </ul>
              </div>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            4. Kullanım Amacı
          </h3>
          <p className="text-gray-700 mb-6 leading-relaxed">
            Atkı seçiminde <strong>kullanım amacınız</strong> çok önemlidir. 
            Günlük kullanım, spor aktiviteleri, resmi etkinlikler veya özel günler 
            için farklı atkı türleri tercih edilmelidir.
          </p>

          <div className="space-y-4 mb-8">
            <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 font-bold">1</span>
              </div>
              <div>
                <h5 className="font-semibold text-gray-900 mb-1">Günlük Kullanım</h5>
                <p className="text-gray-700 text-sm">
                  Dayanıklı, kolay bakım, rahat malzemeler tercih edin. Akrilik veya karışım kumaşlar ideal.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 font-bold">2</span>
              </div>
              <div>
                <h5 className="font-semibold text-gray-900 mb-1">Resmi Etkinlikler</h5>
                <p className="text-gray-700 text-sm">
                  Şık ve kaliteli malzemeler seçin. Kaşmir, yün veya saten modeller uygun.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 font-bold">3</span>
              </div>
              <div>
                <h5 className="font-semibold text-gray-900 mb-1">Spor Aktiviteleri</h5>
                <p className="text-gray-700 text-sm">
                  Nefes alabilir, hafif ve esnek malzemeler tercih edin. Sentetik kumaşlar ideal.
                </p>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Atkı Bakımı ve Temizliği
          </h2>
          
          <p className="text-gray-700 mb-6 leading-relaxed">
            Doğru atkı seçimi kadar <strong>bakım ve temizlik</strong> de önemlidir. 
            Her malzeme için farklı bakım yöntemleri uygulanmalıdır.
          </p>

          <div className="bg-red-50 rounded-lg p-6 mb-8">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Genel Bakım Kuralları</h4>
            <ul className="text-gray-700 space-y-2">
              <li>• Atkıları kullanım sonrası düzgün şekilde katlayın</li>
              <li>• Nemli ortamlarda saklamayın</li>
              <li>• Güve önleyici kullanın</li>
              <li>• Yıkama talimatlarına uyun</li>
              <li>• Aşırı sıcakta kurutmayın</li>
            </ul>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Sonuç ve Öneriler
          </h2>
          <p className="text-gray-700 mb-8 leading-relaxed">
            <strong>Atkı seçimi</strong> yaparken malzeme, boyut, renk ve kullanım amacınızı 
            göz önünde bulundurun. Kaliteli bir atkı, uzun yıllar kullanılabilir ve 
            yatırım değeri taşır. <strong>Atkigetir</strong> olarak, her ihtiyaca uygun 
            kaliteli atkı modelleri sunuyoruz.
          </p>
        </div>

        {/* CTA Section */}
        <div className="bg-blue-50 rounded-xl p-8 mt-12 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Doğru Atkıyı Bulun
          </h3>
          <p className="text-gray-600 mb-6">
            Uzman ekibimiz size en uygun atkı modelini seçmenizde yardımcı olabilir. 
            Geniş ürün yelpazemizden ihtiyacınıza uygun atkıyı bulun.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/urunler/atki"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Atkı Modellerimizi İncele
            </Link>
            <Link
              href="/sss"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg border border-blue-600 hover:bg-blue-50 transition-colors font-medium"
            >
              SSS'yi Görüntüle
            </Link>
          </div>
        </div>

        {/* Related Articles */}
        <div className="mt-12">
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            İlgili Makaleler
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <Link
              href="/blog/2024-trend-atki-modelleri"
              className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <h4 className="font-semibold text-gray-900 mb-2">
                2024'ün En Trend Atkı Modelleri
              </h4>
              <p className="text-gray-600 text-sm">
                2024 yılında moda dünyasında öne çıkan atkı modelleri
              </p>
            </Link>
            <Link
              href="/blog/atki-bakimi-ve-temizligi"
              className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <h4 className="font-semibold text-gray-900 mb-2">
                Atkı Bakımı ve Temizliği
              </h4>
              <p className="text-gray-600 text-sm">
                Atkılarınızı uzun süre kullanabilmek için bakım önerileri
              </p>
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
