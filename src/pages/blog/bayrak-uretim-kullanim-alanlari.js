import SEO from '@/components/SEO';
import Link from 'next/link';
import Image from 'next/image';

export default function BayrakUretimKullanimAlanlari() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://atkigetir.com';
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Bayrak Üretimi ve Kullanım Alanları',
    description:
      'Türk bayrağı ve özel tasarım bayraklarda kumaş, ebat, direk ve iç/dış mekan kullanımı. Kurumsal ve spor kulübü uygulamaları.',
    image: `${baseUrl}/images/atkıgörsel4.jpg`,
    datePublished: '2023-12-15T10:00:00+03:00',
    dateModified: '2023-12-15T10:00:00+03:00',
    author: { '@type': 'Organization', name: 'Atkigetir' },
    publisher: {
      '@type': 'Organization',
      name: 'Atkigetir',
      logo: { '@type': 'ImageObject', url: `${baseUrl}/images/atkigetir-logo.png` },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/blog/bayrak-uretim-kullanim-alanlari`,
    },
  };

  return (
    <>
      <SEO
        title="Bayrak Üretimi ve Kullanım Alanları | Türk Bayrağı, Özel Tasarım | Atkigetir"
        description="Bayrak imalatı: saten, polyester, olta ve gönder bayrak. tribün, maç günü, kurumsal bina ve etkinlik kullanımı. Bakım ve güneş hasarı önleme."
        keywords="bayrak üretimi, Türk bayrağı, özel tasarım bayrak, olta bayrak, gönder bayrak, taraftar bayrağı, toptan bayrak"
        url="/blog/bayrak-uretim-kullanim-alanlari"
        image="/images/atkıgörsel4.jpg"
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
            <li className="text-gray-900 font-medium">Bayrak Üretimi</li>
          </ol>
        </nav>

        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 mb-4">
            <span>15 Aralık 2023</span>
            <span>•</span>
            <span>6 dk okuma</span>
            <span className="bg-red-100 text-red-800 px-2 py-0.5 rounded-full text-xs font-medium">Üretim</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Bayrak Üretimi ve Kullanım Alanları</h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Dayanıklı <strong>bayrak üretimi</strong>, doğru kumaş ve baskı yöntemi seçimine bağlıdır; kullanım yeri (iç/dış mekan) kararı maliyeti ve ömrü belirler.
          </p>
        </header>

        <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden mb-8">
          <Image src="/images/atkıgörsel4.jpg" alt="Bayrak üretimi ve kullanım alanları" fill className="object-cover" sizes="(max-width: 768px) 100vw, 896px" priority />
        </div>

        <div className="prose prose-lg max-w-none">
          <h2>Kullanım Alanları</h2>
          <ul>
            <li>Spor kulüpleri ve <strong>taraftar</strong> tribün görselliği</li>
            <li>Kurumsal bina ve fuar standı</li>
            <li>Belediye ve milli gün törenleri</li>
          </ul>

          <h2>Kumaş ve Baskı</h2>
          <p>
            Dış mekanda UV dayanımı için polyester tabanlı kumaşlar; iç mekanda saten görünüm talep edilebilir. Dijital baskı çözünürlüğü yüksek detaylı logolara uygundur.
          </p>

          <h2>Bakım</h2>
          <p>
            Nem ve güneşe maruz kalan bayrakları periyodik kontrol edin; yırtık halka bölgesini erken onarmak direk hasarını önler.
          </p>

          <p>
            <Link href="/urunler/bayrak" className="text-blue-600 hover:underline">Bayrak ürünlerimize</Link> göz atın. <Link href="/blog/taraftar-atkisi-tasarim-trendleri" className="text-blue-600 hover:underline">Taraftar atkısı</Link> ile kombine projeler için tek tedarikçiden ilerleyebilirsiniz.
          </p>
        </div>
      </article>
    </>
  );
}
