import SEO from '@/components/SEO';
import Link from 'next/link';
import Image from 'next/image';

export default function KisAylarindaAtkiKullanimi() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://atkigetir.com';
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Kış Aylarında Atkı Nasıl Kullanılır?',
    description:
      'Soğuk havalarda atkı bağlama teknikleri, kışlık atkı kullanım ipuçları ve stil önerileri. Sıcak kalırken şık görünmenin pratik yolları.',
    image: `${baseUrl}/images/atkıgörsel3.jpg`,
    datePublished: '2024-01-05T10:00:00+03:00',
    dateModified: '2024-01-05T10:00:00+03:00',
    author: { '@type': 'Organization', name: 'Atkigetir' },
    publisher: {
      '@type': 'Organization',
      name: 'Atkigetir',
      logo: { '@type': 'ImageObject', url: `${baseUrl}/images/atkigetir-logo.png` },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/blog/kis-aylarinda-atki-kullanimi`,
    },
  };

  return (
    <>
      <SEO
        title="Kış Aylarında Atkı Nasıl Kullanılır? Bağlama ve Stil Rehberi | Atkigetir"
        description="Kışlık atkı kullanımı: klasik bağlama, şal tarzı, Euro düğümü ve katmanlı giyim. Soğukta boğaz ve yüz bölgesini koruma ipuçları, atkı bakımı ve ürün seçimi."
        keywords="kışlık atkı, atkı bağlama, atkı kullanımı, soğuk hava aksesuarı, dokuma atkı kış, taraftar atkısı kış, şal atkı kullanımı"
        url="/blog/kis-aylarinda-atki-kullanimi"
        image="/images/atkıgörsel3.jpg"
        type="article"
        structuredData={structuredData}
      />

      <article className="max-w-4xl mx-auto py-10 px-4">
        <nav className="mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center flex-wrap gap-1 text-sm text-gray-600">
            <li><Link href="/" className="hover:text-blue-600">Anasayfa</Link></li>
            <li className="text-gray-400">/</li>
            <li><Link href="/blog" className="hover:text-blue-600">Blog</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-900 font-medium">Kış Aylarında Atkı</li>
          </ol>
        </nav>

        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 mb-4">
            <span>5 Ocak 2024</span>
            <span>•</span>
            <span>6 dk okuma</span>
            <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full text-xs font-medium">Stil</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Kış Aylarında Atkı Nasıl Kullanılır?</h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            <strong>Kışlık atkı</strong> doğru bağlandığında hem sıcak tutar hem de kombinınızı tamamlar. Bu yazıda pratik bağlama yöntemleri ve dış giyimle uyum ipuçlarını bulacaksınız.
          </p>
        </header>

        <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden mb-8">
          <Image src="/images/atkıgörsel3.jpg" alt="Kış aylarında atkı kullanımı" fill className="object-cover" sizes="(max-width: 768px) 100vw, 896px" priority />
        </div>

        <div className="prose prose-lg max-w-none">
          <h2>Neden Önce Atkı?</h2>
          <p>
            Boğaz ve göğüs bölgesi soğukta hızlı kayıp verir. Kaliteli bir <strong>dokuma atkı</strong> veya <strong>yün atkı</strong>, montun üst düğmesini açsanız bile koruma sağlar. <strong>Taraftar atkısı</strong> gibi geniş modeller ekstra tabaka etkisi yaratır.
          </p>

          <h2>Popüler Bağlama Teknikleri</h2>
          <h3>1. Klasik tek tur</h3>
          <p>Atkıyı boyunda eşit iki uç bırakıp gevşek düğüm atın; ofis ve günlük için yeterli sıcaklık ve rahatlık sunar.</p>
          <h3>2. Paris / Avrupa düğümü</h3>
          <p>Uçları önce çaprazlayıp boyundan geçirmek; mont yakası yüksekse boğazı sıkı sarar.</p>
          <h3>3. Şal kullanımı</h3>
          <p>Uzun <strong>şal atkı</strong> modellerini omuzdan sarkıtmak; kadın–erkek kombinlerinde ince ceketlerle uyumludur.</p>

          <h2>Katmanlı Giyimle Uyum</h2>
          <p>
            İnce termal içlik, polar veya tüylü yelek ile atkıyı en dışa almak nem kontrolünü kolaylaştırır. Yağmura yatkın günlerde sentetik veya hızlı kuruyan iç katman tercih edin.
          </p>

          <h2>Sonuç</h2>
          <p>
            Doğru <strong>atkı kullanımı</strong> kış konforunu doğrudan artırır. Özel tasarım veya <strong>toptan atkı</strong> ihtiyaçlarınız için <Link href="/blog/toplan-atki-siparisi-avantajlar" className="text-blue-600 hover:underline">toptan sipariş rehberimize</Link> göz atabilirsiniz.
          </p>
        </div>

        <div className="bg-slate-50 rounded-xl p-8 mt-12 text-center border border-slate-200">
          <h3 className="text-xl font-bold text-gray-900 mb-3">Kış Koleksiyonu ve Özel Üretim</h3>
          <p className="text-gray-600 mb-4">Atkı ve bere modellerimizi inceleyin veya WhatsApp üzerinden teklif alın.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/urunler/atki" className="inline-flex justify-center bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700">Atkı Modelleri</Link>
            <a href="https://wa.me/905337498266?text=Merhaba%2C%20k%C4%B1%C5%9F%20atk%C4%B1s%C4%B1%20hakk%C4%B1nda%20bilgi%20istiyorum." target="_blank" rel="noopener noreferrer" className="inline-flex justify-center border-2 border-emerald-600 text-emerald-700 px-6 py-3 rounded-lg font-semibold hover:bg-emerald-50">WhatsApp</a>
          </div>
        </div>
      </article>
    </>
  );
}
