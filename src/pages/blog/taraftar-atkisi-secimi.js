import SEO from "@/components/SEO";
import Link from "next/link";
import Image from "next/image";

export default function TaraftarAtkisiSecimi() {
  return (
    <>
      <SEO
        title="Taraftar Atkısı Nasıl Seçilir? | Renk, Ölçü ve Toptan Sipariş"
        description="Taraftar atkısı seçerken takım renkleri, dokuma sıklığı, yazı ölçüsü ve toptan adet nasıl belirlenir? Maç, deplasman ve özel üretim için rehber."
        keywords="taraftar atkısı, taraftar atkısı fiyatları, özel taraftar atkısı, toptan atkı, dokuma atkı, takım atkısı, atkı üretimi"
        image="/images/atkıgörsel2.jpg"
        url="/blog/taraftar-atkisi-secimi"
        type="article"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": "Taraftar Atkısı Nasıl Seçilir?",
          "description": "Maç, deplasman ve toptan sipariş için taraftar atkısında renk, ölçü, dokuma ve adet seçimini anlatan rehber.",
          "image": "https://atkigetir.com/images/atkıgörsel2.jpg",
          "datePublished": "2026-09-29",
          "dateModified": "2026-09-29",
          "author": {
            "@type": "Organization",
            "name": "Atkigetir"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Atkigetir",
            "logo": {
              "@type": "ImageObject",
              "url": "https://atkigetir.com/images/atkigetir-logo.png"
            }
          },
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "https://atkigetir.com/blog/taraftar-atkisi-secimi"
          }
        }}
      />

      <article className="max-w-4xl mx-auto py-10 px-4">
        <nav className="mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li>
              <Link href="/" className="hover:text-blue-600 transition-colors">Ana Sayfa</Link>
            </li>
            <li className="flex items-center">
              <span className="mx-2">/</span>
              <Link href="/blog" className="hover:text-blue-600 transition-colors">Blog</Link>
            </li>
            <li className="flex items-center">
              <span className="mx-2">/</span>
              <span className="text-gray-900 font-medium">Taraftar Atkısı Seçimi</span>
            </li>
          </ol>
        </nav>

        <header className="mb-8">
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <span>29 Eylül 2026</span>
            <span className="mx-2">•</span>
            <span>5 dk okuma</span>
            <span className="mx-2">•</span>
            <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs font-medium">Taraftar</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Taraftar Atkısı Nasıl Seçilir?</h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            İyi bir taraftar atkısı tribünde okunur, elde dağılmaz ve takım renklerini
            ışıktan ışığa değiştirmez. Seçim bu üç noktadan başlar.
          </p>
        </header>

        <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden mb-8">
          <Image src="/images/atkıgörsel2.jpg" alt="Taraftar atkısı seçimi" fill className="object-cover" sizes="(max-width: 768px) 100vw, 896px" priority />
        </div>

        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Renk, logodan önce gelir</h2>
          <p className="text-gray-700 mb-6 leading-relaxed">
            Tribünde atkı uzaktan okunur. Ana renkler takımın saha renkleriyle aynı olmalı,
            yazı rengi zeminden net ayrılmalıdır. Sarı üstüne beyaz ya da lacivert üstüne
            siyah gibi yakın tonlar, ışık düşünce kaybolur. Özel üretimde renk kodunu
            numune üzerinde onaylamak, ekrandaki görsele güvenmekten daha sağlıklıdır.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">Dokuma ve kenar</h2>
          <p className="text-gray-700 mb-6 leading-relaxed">
            Sık dokuma, atkının formunu korur ve yazının eğrilmesini geciktirir. Kenar örgüsü
            açık kalırsa ilk kullanımlarda iplik atar. Saçak isteniyorsa bunun tasarımın
            parçası olduğu siparişte belirtilmelidir; aksi halde düz kenar daha dayanıklıdır.
            Tek maçlık dağıtımda hafif akrilik yeterlidir. Sezon boyu kullanılacak atkıda
            daha sık dokuma ve sağlam kenar tercih edilir.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">Yazı ve arma ölçüsü</h2>
          <p className="text-gray-700 mb-6 leading-relaxed">
            İsim, slogan ya da yıl bilgisi atkının orta bandına sığmalıdır. Çok uzun bir
            cümle, harf boyunu küçültür ve tribünden okunmaz. Kısa bir takım adı veya
            tek satırlık slogan daha temiz durur. Arma kullanılacaksa çözünürlüğü yüksek
            bir kaynak dosya gerekir; bulanık bir logo dokumada daha da dağılır.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">Kaç adet, ne zaman?</h2>
          <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
            <li>Kişisel kullanım ve hediye için hazır modeller yeterlidir.</li>
            <li>Taraftar grubu ve deplasman için adedi önceden kilitlemek, renk farkını önler.</li>
            <li>Toptan işte numune onayı alınmadan kasaya girilmemelidir.</li>
            <li>Maç tarihine göre üretim payı bırakın; özel dokuma aynı gün çıkmaz.</li>
          </ul>

          <p className="text-gray-700 mb-8 leading-relaxed">
            Bayrak da aynı renk düzeniyle üretilecekse atkı ve bayrağı aynı siparişte
            eşleştirmek, ton farkını azaltır. Ölçü ve kumaş karşılaştırması için
            sezon rehberine de bakabilirsiniz.
          </p>
        </div>

        <div className="bg-blue-50 rounded-xl p-8 mt-12 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Atkı ve bayrak üretimine bakın</h2>
          <p className="text-gray-600 mb-6">
            Hazır modelleri inceleyin veya renk, yazı ve adet belirterek özel üretim isteyin.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/urunler/atki" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Atkı modelleri
            </Link>
            <Link href="/urunler/bayrak" className="bg-white text-blue-600 px-6 py-3 rounded-lg border border-blue-600 hover:bg-blue-50 transition-colors font-medium">
              Bayrak modelleri
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
