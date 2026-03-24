import SEO from '@/components/SEO';
import Link from 'next/link';
import Image from 'next/image';

export default function OzelTasarimAtkiUretim() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://atkigetir.com';
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Özel Tasarım Atkı: Hayalinizdeki Atkıyı Üretin',
    description:
      'Özel tasarım atkı süreci: fikirden numuneye, renk onayından seri üretime. Kulüp, marka ve etkinlikler için kişiselleştirme.',
    image: `${baseUrl}/images/atkıgörsel2.jpg`,
    datePublished: '2023-12-05T10:00:00+03:00',
    dateModified: '2023-12-05T10:00:00+03:00',
    author: { '@type': 'Organization', name: 'Atkigetir' },
    publisher: {
      '@type': 'Organization',
      name: 'Atkigetir',
      logo: { '@type': 'ImageObject', url: `${baseUrl}/images/atkigetir-logo.png` },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/blog/ozel-tasarim-atki-uretim`,
    },
  };

  return (
    <>
      <SEO
        title="Özel Tasarım Atkı Üretimi | Logo, Renk, Numune | Atkigetir"
        description="Özel atkı üretimi adımları: tasarım brifi, vektörel dosya, jakar veya baskı seçimi, minimum adet ve teslim süresi. Toptan özel taraftar ve kurumsal atkı."
        keywords="özel tasarım atkı, kişiye özel atkı, logo işlemeli atkı, özel üretim taraftar atkısı, custom scarf, taslak onayı atkı"
        url="/blog/ozel-tasarim-atki-uretim"
        image="/images/atkıgörsel2.jpg"
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
            <li className="text-gray-900 font-medium">Özel Tasarım Atkı</li>
          </ol>
        </nav>

        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 mb-4">
            <span>5 Aralık 2023</span>
            <span>•</span>
            <span>6 dk okuma</span>
            <span className="bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full text-xs font-medium">Tasarım</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Özel Tasarım Atkı: Hayalinizdeki Atkıyı Üretin</h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            <strong>Özel tasarım atkı</strong> ile kulübünüzün veya markanızın kimliği iplik veya baskı ile doğrudan ürüne işlenir.
          </p>
        </header>

        <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden mb-8">
          <Image src="/images/atkıgörsel2.jpg" alt="Özel tasarım atkı üretimi" fill className="object-cover" sizes="(max-width: 768px) 100vw, 896px" priority />
        </div>

        <div className="prose prose-lg max-w-none">
          <h2>1. Brif ve Referans</h2>
          <p>Hedef kitle, kullanım yeri (tribün, kurumsal, hediye) ve bütçe aralığı netleştikçe doğru teknik (jakar/baskı) önerilir.</p>

          <h2>2. Görsel Dosyalar</h2>
          <p>Vektörel logo ve varsa yazı karakteri paylaşımı, renk sapmalarını azaltır. Raster görseller için minimum çözünürlük talep edilir.</p>

          <h2>3. Numune ve Onay</h2>
          <p>İlk siparişlerde dijital mockup + isteğe bağlı fiziksel numune ile onay akışı önerilir.</p>

          <h2>4. Seri Üretim</h2>
          <p>Onay sonrası iplik/baskı hazırlığı ve dokuma veya transfer süreleri planlanır. <Link href="/blog/toplan-atki-siparisi-avantajlar" className="text-blue-600 hover:underline">Toptan sipariş</Link> avantajları için rehbere bakın.</p>

          <div className="not-prose bg-indigo-50 border border-indigo-100 rounded-xl p-6 mt-8">
            <p className="text-gray-800 font-medium mb-2">Projeyi başlatın</p>
            <p className="text-gray-600 text-sm mb-4">Tasarımınızı ve tahmini adedi paylaşın; size üretim seçenekleri ve süre tahmini ile dönelim.</p>
            <a
              href="https://wa.me/905337498266?text=Merhaba%2C%20%C3%B6zel%20tasar%C4%B1m%20atk%C4%B1%20projesi%20i%C3%A7in%20teklif%20istiyorum."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-emerald-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-emerald-700"
            >
              WhatsApp ile Gönder
            </a>
          </div>
        </div>
      </article>
    </>
  );
}
