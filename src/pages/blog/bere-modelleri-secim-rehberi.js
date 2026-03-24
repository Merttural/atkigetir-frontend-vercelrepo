import SEO from '@/components/SEO';
import Link from 'next/link';
import Image from 'next/image';

export default function BereModelleriSecimRehberi() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://atkigetir.com';
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Bere Modelleri ve Seçim Rehberi',
    description:
      'Kışlık bere modelleri: ponponlu, örgü, kaşkolbere uyumu, yüz şekline göre seçim ve atkı kombinleri.',
    image: `${baseUrl}/images/atkıgörsel3.jpg`,
    datePublished: '2023-12-20T10:00:00+03:00',
    dateModified: '2023-12-20T10:00:00+03:00',
    author: { '@type': 'Organization', name: 'Atkigetir' },
    publisher: {
      '@type': 'Organization',
      name: 'Atkigetir',
      logo: { '@type': 'ImageObject', url: `${baseUrl}/images/atkigetir-logo.png` },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/blog/bere-modelleri-secim-rehberi`,
    },
  };

  return (
    <>
      <SEO
        title="Bere Modelleri ve Seçim Rehberi 2024 | Atkı ile Kombin | Atkigetir"
        description="Bere çeşitleri: örgü, triko, polar. Baş ölçüsü, yüz hatları, renk uyumu ve atkı-bere takımı. Kış aksesuarı alışveriş rehberi."
        keywords="bere modelleri, kışlık bere, örgü bere, polar bere, bere atkı kombin, taraftar bere, toptan bere"
        url="/blog/bere-modelleri-secim-rehberi"
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
            <li className="text-gray-900 font-medium">Bere Rehberi</li>
          </ol>
        </nav>

        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 mb-4">
            <span>20 Aralık 2023</span>
            <span>•</span>
            <span>4 dk okuma</span>
            <span className="bg-pink-100 text-pink-800 px-2 py-0.5 rounded-full text-xs font-medium">Moda</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Bere Modelleri ve Seçim Rehberi</h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Doğru <strong>bere modeli</strong> sıcaklık ve stil dengesini kurar; <strong>atkı</strong> ile ton uyumu kombinasyonu güçlendirir.
          </p>
        </header>

        <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden mb-8">
          <Image src="/images/atkıgörsel3.jpg" alt="Bere modelleri seçim rehberi" fill className="object-cover" sizes="(max-width: 768px) 100vw, 896px" priority />
        </div>

        <div className="prose prose-lg max-w-none">
          <h2>Model Türleri</h2>
          <p><strong>Klasik örgü bere</strong> günlük kullanım için uygundur. <strong>Ponponlu modeller</strong> genç ve taraftar tarzına yakışır. <strong>Polar bere</strong> outdoor ve spor aktivitelerinde hafiflik sunar.</p>

          <h2>Atkı ile Uyum</h2>
          <p>Aynı renk ailesinden iki ton veya tam tersi kontrast (ör. lacivert bere + sarı vurgulu <strong>taraftar atkısı</strong>) dengeli görünür.</p>

          <h2>Beden ve Rahatlık</h2>
          <p>Esnemeyen modellerde baş çevresine göre üretici tablosunu kontrol edin; fazla sıkı bere uzun süreli kullanımda rahatsızlık verir.</p>

          <p><Link href="/urunler/bere" className="text-blue-600 hover:underline">Bere ürünlerimizi</Link> inceleyebilirsiniz.</p>
        </div>
      </article>
    </>
  );
}
