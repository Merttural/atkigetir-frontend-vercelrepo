import SEO from '@/components/SEO';
import Link from 'next/link';
import Image from 'next/image';

export default function KurumsalAtkiUretimRehberi() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://atkigetir.com';
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Kurumsal Atkı Üretimi: İşletmeler İçin Rehber',
    description:
      'Logo nakışı, kurumsal renk uyumu, promosyon ve çalışan hediyesi için kurumsal atkı üretim süreci, adet ve teslimat.',
    image: `${baseUrl}/images/atkıgörsel2.jpg`,
    datePublished: '2023-12-25T10:00:00+03:00',
    dateModified: '2023-12-25T10:00:00+03:00',
    author: { '@type': 'Organization', name: 'Atkigetir' },
    publisher: {
      '@type': 'Organization',
      name: 'Atkigetir',
      logo: { '@type': 'ImageObject', url: `${baseUrl}/images/atkigetir-logo.png` },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/blog/kurumsal-atki-uretim-rehberi`,
    },
  };

  return (
    <>
      <SEO
        title="Kurumsal Atkı Üretimi Rehberi: Logo, Adet, Fiyat | Atkigetir"
        description="İşletmeler için kurumsal atkı üretimi: marka kılavuzu, Pantone/CMYK eşlemesi, minimum sipariş, paketleme ve etkinlik teslimatı. Promosyon ve HR hediyeleri."
        keywords="kurumsal atkı, kurumsal atkı üretimi, logo baskılı atkı, promosyon atkı, şirket hediyesi atkı, toptan kurumsal atkı"
        url="/blog/kurumsal-atki-uretim-rehberi"
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
            <li className="text-gray-900 font-medium">Kurumsal Atkı</li>
          </ol>
        </nav>

        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 mb-4">
            <span>25 Aralık 2023</span>
            <span>•</span>
            <span>7 dk okuma</span>
            <span className="bg-slate-200 text-slate-800 px-2 py-0.5 rounded-full text-xs font-medium">Kurumsal</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Kurumsal Atkı Üretimi: İşletmeler İçin Rehber</h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            <strong>Kurumsal atkı</strong>, markanızı üniforma ve ekipmanla paralel güçlendiren ekonomik ve hatırlanır bir üründür.
          </p>
        </header>

        <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden mb-8">
          <Image src="/images/atkıgörsel2.jpg" alt="Kurumsal atkı üretimi" fill className="object-cover" sizes="(max-width: 768px) 100vw, 896px" priority />
        </div>

        <div className="prose prose-lg max-w-none">
          <h2>Marka Dosyaları</h2>
          <p>Vektörel logo (AI, PDF, EPS), kurumsal renk kodları ve kullanım kuralları üretimi hızlandırır, revizyonu azaltır.</p>

          <h2>Kullanım Senaryoları</h2>
          <ul>
            <li>Kış kampanyaları ve açık hava etkinlikleri</li>
            <li><strong>Promosyon atkı</strong> dağıtımı</li>
            <li>Çalışan takdir ve yılbaşı hediyeleri</li>
          </ul>

          <h2>Süreç</h2>
          <ol>
            <li>Brif ve adet</li>
            <li>Görsel tasarım onayı</li>
            <li>Numune (isteğe bağlı)</li>
            <li>Seri üretim ve kalite kontrol</li>
            <li>Kolili sevkiyat</li>
          </ol>

          <p>
            <Link href="/iletisim" className="text-blue-600 hover:underline">İletişim</Link> veya <Link href="/partnerlik" className="text-blue-600 hover:underline">partnerlik</Link> üzerinden teklif talebinde bulunabilirsiniz.
          </p>
        </div>
      </article>
    </>
  );
}
