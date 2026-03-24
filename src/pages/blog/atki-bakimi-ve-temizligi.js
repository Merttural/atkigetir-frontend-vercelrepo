import SEO from '@/components/SEO';
import Link from 'next/link';
import Image from 'next/image';

export default function AtkiBakimiVeTemizligi() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://atkigetir.com';
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Atkı Bakımı ve Temizliği',
    description:
      'Yün, akrilik ve dokuma atkıların yıkama, kurutma ve saklama rehberi. Ömür uzatan pratik atkı bakımı ipuçları.',
    image: `${baseUrl}/images/atkıgörsel4.jpg`,
    datePublished: '2024-01-01T10:00:00+03:00',
    dateModified: '2024-01-01T10:00:00+03:00',
    author: { '@type': 'Organization', name: 'Atkigetir' },
    publisher: {
      '@type': 'Organization',
      name: 'Atkigetir',
      logo: { '@type': 'ImageObject', url: `${baseUrl}/images/atkigetir-logo.png` },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/blog/atki-bakimi-ve-temizligi`,
    },
  };

  return (
    <>
      <SEO
        title="Atkı Bakımı ve Temizliği: Yün, Akrilik ve Dokuma Rehberi | Atkigetir"
        description="Atkı yıkama sıcaklığı, deterjan seçimi, kurutma ve ütüleme. Dokuma taraftar atkısı ve özel üretim atkılarda renk solmasını önleme önerileri."
        keywords="atkı bakımı, atkı temizliği, yün atkı yıkama, dokuma atkı bakımı, taraftar atkısı temizlik, akrilik atkı yıkama"
        url="/blog/atki-bakimi-ve-temizligi"
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
            <li className="text-gray-900 font-medium">Atkı Bakımı</li>
          </ol>
        </nav>

        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 mb-4">
            <span>1 Ocak 2024</span>
            <span>•</span>
            <span>3 dk okuma</span>
            <span className="bg-teal-100 text-teal-800 px-2 py-0.5 rounded-full text-xs font-medium">Bakım</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Atkı Bakımı ve Temizliği</h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Doğru <strong>atkı temizliği</strong> iplik yapısını korur, renkleri canlı tutar ve formu bozmaz.
          </p>
        </header>

        <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden mb-8">
          <Image src="/images/atkıgörsel4.jpg" alt="Atkı bakımı ve temizlik" fill className="object-cover" sizes="(max-width: 768px) 100vw, 896px" priority />
        </div>

        <div className="prose prose-lg max-w-none">
          <h2>Genel Kurallar</h2>
          <ul>
            <li>Her zaman <strong>etiket talimatlarına</strong> uyun.</li>
            <li>Ağartıcı kullanmayın; renkli ve <strong>dokuma atkı</strong> modellerinde solma riski yaratır.</li>
            <li>Ağır merdane veya yüksek devir sıkıştırır; elde yıkamayı tercih edin.</li>
          </ul>

          <h2>Malzemeye Göre</h2>
          <h3>Yün ve yün karışım</h3>
          <p>Soğuk veya ılık su, yün uyumlu deterjan, nazik sıkma. Düz zeminde havlu üzerinde şekil vererek kurutun.</p>
          <h3>Akrilik</h3>
          <p>Genelde daha dayanıklıdır; makinede hassas program mümkün olabilir. Sıkmadan, gölgede kurutun.</p>
          <h3>Jakarlı taraftar atkısı</h3>
          <p>Logo ve çift yüz desenleri için fazla sıcak su ve ters çevirmeden yıkamak desen bütünlüğünü korur.</p>

          <h2>Saklama</h2>
          <p>
            Temiz ve kuru ortamda katlanmış veya askılı saklayın; güve için lavanta veya kapalı gardırop tercih edin.
          </p>

          <p className="mt-8">
            Yeni atkı almadan önce <Link href="/blog/atki-seciminde-dikkat-edilecekler" className="text-blue-600 hover:underline">atkı seçim rehberimize</Link> göz atabilirsiniz.
          </p>
        </div>
      </article>
    </>
  );
}
