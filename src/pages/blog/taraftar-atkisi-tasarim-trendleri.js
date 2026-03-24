import SEO from '@/components/SEO';
import Link from 'next/link';
import Image from 'next/image';

export default function TaraftarAtkisiTasarimTrendleri() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://atkigetir.com';
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Taraftar Atkısı Tasarımında Trendler',
    description:
      '2024 taraftar atkısı tasarım trendleri: renk blokları, logo yerleşimi, jakar dokuma ve baskılı modeller. Kulüp ve taraftar grupları için pratik rehber.',
    image: `${baseUrl}/images/atkıgörsel1.jpg`,
    datePublished: '2023-12-28T10:00:00+03:00',
    dateModified: '2023-12-28T10:00:00+03:00',
    author: { '@type': 'Organization', name: 'Atkigetir' },
    publisher: {
      '@type': 'Organization',
      name: 'Atkigetir',
      logo: { '@type': 'ImageObject', url: `${baseUrl}/images/atkigetir-logo.png` },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/blog/taraftar-atkisi-tasarim-trendleri`,
    },
  };

  return (
    <>
      <SEO
        title="Taraftar Atkısı Tasarımında Trendler 2024 | Logo, Renk, Jakar | Atkigetir"
        description="Taraftar atkısı tasarımı: renk paleti, logo ve yazı hiyerarşisi, jakar dokuma vs baskı, püskül ve uç detayları. Toptan taraftar atkısı siparişi öncesi okuyun."
        keywords="taraftar atkısı, taraftar atkısı tasarımı, jakarlı taraftar atkısı, dokuma taraftar atkısı, taraftar atkısı toptan, kulüp atkısı, özel taraftar atkısı"
        url="/blog/taraftar-atkisi-tasarim-trendleri"
        image="/images/atkıgörsel1.jpg"
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
            <li className="text-gray-900 font-medium">Taraftar Atkısı Trendleri</li>
          </ol>
        </nav>

        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 mb-4">
            <span>28 Aralık 2023</span>
            <span>•</span>
            <span>5 dk okuma</span>
            <span className="bg-violet-100 text-violet-800 px-2 py-0.5 rounded-full text-xs font-medium">Tasarım</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Taraftar Atkısı Tasarımında Trendler</h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            <strong>Taraftar atkısı</strong> sadece aksesuar değil; tribün ve dijitalda görünürlüğü belirleyen güçlü bir görsel kimlik unsurudur.
          </p>
        </header>

        <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden mb-8">
          <Image src="/images/atkıgörsel1.jpg" alt="Taraftar atkısı tasarım trendleri" fill className="object-cover" sizes="(max-width: 768px) 100vw, 896px" priority />
        </div>

        <div className="prose prose-lg max-w-none">
          <h2>Renk ve Kontrast</h2>
          <p>
            Takım renkleri net bloklar halinde kullanıldığında uzaktan okunurluk artar. Üçüncü bir vurgu rengi (beyaz/siyah) logo çevresinde boşluk yaratır.
          </p>

          <h2>Logo ve Yazı Hiyerarşisi</h2>
          <p>
            <strong>Jakarlı taraftar atkısı</strong> üretiminde arma ortada veya tekrarlayan desen olarak işlenir. Slogan kısa ve büyük punto tercih edilmelidir; ince detaylar dokumada kaybolabilir.
          </p>

          <h2>Jakar mı, Baskı mı?</h2>
          <p>
            Jakar: uzun ömür, iki yüz okunurluk, klasik tribün görünümü. Baskı: fotoğraf ve karmaşık grafiklere daha uygun; promosyon ve özel etkinliklerde tercih edilir.
          </p>

          <h2>Toptan Üretim İçin İpuçları</h2>
          <p>
            Minimum adet ve termin planı için <Link href="/blog/toplan-atki-siparisi-avantajlar" className="text-blue-600 hover:underline">toptan atkı siparişi rehberimize</Link> bakın. <Link href="/partnerlik" className="text-blue-600 hover:underline">Kurumsal iş birliği</Link> sayfamızdan da süreci başlatabilirsiniz.
          </p>
        </div>
      </article>
    </>
  );
}
