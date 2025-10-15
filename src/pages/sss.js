import SEO from "@/components/SEO";
import Link from "next/link";

export default function FAQPage() {
  const faqData = [
    {
      id: 1,
      question: "Atkı siparişlerim ne kadar sürede hazırlanır?",
      answer: "Standart atkı siparişleri 2-3 iş gününde hazırlanır. Kişiye özel tasarım atkılar ise 5-7 iş günü sürebilir. Özel günlerde (bayram, yılbaşı) süreler değişebilir."
    },
    {
      id: 2,
      question: "Hangi malzemelerden atkı üretiyorsunuz?",
      answer: "Atkı modellerimiz yün, saten, akrilik, pamuk ve premium kumaşlardan üretilmektedir. Her malzeme farklı özellikler sunar - yün doğal ve sıcak, saten şık ve yumuşak, akrilik dayanıklı ve kolay bakım."
    },
    {
      id: 3,
      question: "Kişiye özel atkı tasarımı yapıyor musunuz?",
      answer: "Evet! İstediğiniz renk, desen, boyut ve yazı ile özel atkı tasarımı yapıyoruz. WhatsApp hattımızdan bizimle iletişime geçerek tasarım detaylarınızı paylaşabilirsiniz."
    },
    {
      id: 4,
      question: "Kargo ücreti ne kadar?",
      answer: "Türkiye'nin her yerine kargo ücretimiz 25 TL'dir. 200 TL ve üzeri siparişlerde kargo ücretsizdir. Özel kargo seçenekleri için bizimle iletişime geçebilirsiniz."
    },
    {
      id: 5,
      question: "Atkı bakımı nasıl yapılır?",
      answer: "Yün atkılar için soğuk su ve yün deterjanı kullanın. Saten atkılar için ılık su ve yumuşak deterjan önerilir. Makinede yıkarken düşük devirde, kurutma makinesinde ise düşük ısıda kurutun."
    },
    {
      id: 6,
      question: "İade ve değişim politikası nedir?",
      answer: "Ürünlerimizi teslim aldığınız tarihten itibaren 14 gün içinde iade edebilirsiniz. Ürün orijinal ambalajında, kullanılmamış ve etiketli olmalıdır. Kişiye özel ürünlerde iade yapılmaz."
    },
    {
      id: 7,
      question: "Hangi ödeme yöntemlerini kabul ediyorsunuz?",
      answer: "Kredi kartı, banka kartı, havale/EFT ve kapıda ödeme seçeneklerini kabul ediyoruz. Güvenli ödeme altyapımız ile tüm işlemleriniz korunmaktadır."
    },
    {
      id: 8,
      question: "Atkı boyutları nasıl belirlenir?",
      answer: "Standart atkı boyutlarımız 180x30 cm'dir. Özel boyut talepleriniz için bizimle iletişime geçebilirsiniz. Çocuk atkıları ve jumbo boy atkılar da mevcuttur."
    },
    {
      id: 9,
      question: "Toplu sipariş indirimi var mı?",
      answer: "Evet! 10 adet ve üzeri siparişlerde %15, 25 adet ve üzeri siparişlerde %20 indirim uygulanır. Kurumsal siparişler için özel fiyat teklifi alabilirsiniz."
    },
    {
      id: 10,
      question: "Atkı seçiminde nelere dikkat etmeliyim?",
      answer: "Malzeme kalitesi, boyut, renk uyumu ve kullanım amacınıza göre seçim yapın. Kışlık kullanım için yün, şık görünüm için saten, günlük kullanım için akrilik önerilir."
    }
  ];

  return (
    <>
      <SEO
        title="Sıkça Sorulan Sorular (SSS) | Atkı Sipariş ve Kullanım Rehberi"
        description="Atkı siparişi, ödeme, kargo, iade ve kullanım hakkında sıkça sorulan soruların cevapları. Atkigetir müşteri hizmetleri rehberi."
        keywords="atkı sss, atkı sipariş, atkı kargo, atkı iade, atkı bakımı, atkı kullanımı, atkı seçimi, müşteri hizmetleri"
        url="/sss"
        type="faq"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqData.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.answer
            }
          }))
        }}
      />

      <main className="max-w-4xl mx-auto py-10 px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Sıkça Sorulan Sorular
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Atkı siparişi, ödeme, kargo ve kullanım hakkında merak ettiğiniz 
            tüm soruların cevaplarını burada bulabilirsiniz.
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-6 mb-12">
          {faqData.map((faq, index) => (
            <div key={faq.id} className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-start">
                <span className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">
                  {index + 1}
                </span>
                {faq.question}
              </h3>
              <div className="ml-9">
                <p className="text-gray-700 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="bg-blue-50 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Sorunuzun Cevabını Bulamadınız mı?
          </h2>
          <p className="text-gray-600 mb-6">
            Uzman ekibimiz size yardımcı olmaktan mutluluk duyar. 
            İletişim kanallarımızdan bize ulaşabilirsiniz.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/905337498266?text=Merhabalar%20Kerim%20Bey%20Sipariş%20Vermek%20istiyorum."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium inline-flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
              WhatsApp ile Sor
            </a>
            <Link
              href="/iletisim"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium inline-flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              İletişim Sayfası
            </Link>
          </div>
        </div>

        {/* Related Links */}
        <div className="mt-12">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
            İlgili Sayfalar
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            <Link
              href="/urunler"
              className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow text-center"
            >
              <div className="text-2xl mb-2">🧵</div>
              <h4 className="font-semibold text-gray-900">Ürünlerimiz</h4>
              <p className="text-sm text-gray-600">Atkı modellerimizi inceleyin</p>
            </Link>
            <Link
              href="/blog"
              className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow text-center"
            >
              <div className="text-2xl mb-2">📝</div>
              <h4 className="font-semibold text-gray-900">Blog</h4>
              <p className="text-sm text-gray-600">Atkı rehberleri ve ipuçları</p>
            </Link>
            <Link
              href="/hakkimizda"
              className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow text-center"
            >
              <div className="text-2xl mb-2">🏢</div>
              <h4 className="font-semibold text-gray-900">Hakkımızda</h4>
              <p className="text-sm text-gray-600">Atkigetir hikayesi</p>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
