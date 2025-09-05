import Head from 'next/head';
import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <>
      <Head>
        <title>Gizlilik Politikası - Atkigetir</title>
        <meta name="description" content="Atkigetir gizlilik politikası ve kişisel verilerin korunması hakkında bilgiler." />
      </Head>
      
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Gizlilik Politikası</h1>
              <p className="text-gray-600 mb-6">Son güncelleme: {new Date().toLocaleDateString('tr-TR')}</p>
            </div>

            <div className="prose prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Giriş</h2>
                <p className="text-gray-700 mb-4">
                  Atkigetir olarak, kişisel verilerinizin güvenliği bizim için çok önemlidir. 
                  Bu gizlilik politikası, hangi bilgileri topladığımızı, nasıl kullandığımızı 
                  ve koruduğumuzu açıklar.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Toplanan Bilgiler</h2>
                <p className="text-gray-700 mb-4">Aşağıdaki bilgileri topluyoruz:</p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Ad, soyad ve iletişim bilgileri</li>
                  <li>Sipariş ve ödeme bilgileri</li>
                  <li>Site kullanım verileri</li>
                  <li>Teknik bilgiler (IP adresi, tarayıcı türü)</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Bilgilerin Kullanım Amacı</h2>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Siparişlerinizi işlemek ve teslimat yapmak</li>
                  <li>Müşteri hizmetleri sağlamak</li>
                  <li>Yasal yükümlülükleri yerine getirmek</li>
                  <li>Site performansını iyileştirmek</li>
                  <li>Güvenliği sağlamak</li>
                  <li>Size özel teklifler sunmak (izin verirseniz)</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Bilgi Paylaşımı</h2>
                <p className="text-gray-700 mb-4">
                  Kişisel verilerinizi üçüncü taraflarla paylaşmıyoruz, ancak aşağıdaki durumlar hariç:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Yasal zorunluluk durumunda</li>
                  <li>Hizmet sağlayıcılarımızla (kargo, ödeme sistemi)</li>
                  <li>Açık rızanız olduğunda</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Veri Güvenliği</h2>
                <p className="text-gray-700 mb-4">
                  Verilerinizi korumak için aşağıdaki önlemleri alıyoruz:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>SSL şifreleme kullanıyoruz</li>
                  <li>Güvenli sunucu altyapısı</li>
                  <li>Düzenli güvenlik güncellemeleri</li>
                  <li>Erişim kontrolü ve yetkilendirme</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Çerezler (Cookies)</h2>
                <p className="text-gray-700 mb-4">
                  Sitemizde çerezler kullanılmaktadır. Çerezler:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Alışveriş sepetinizi hatırlamak için</li>
                  <li>Site performansını iyileştirmek için</li>
                  <li>Güvenlik amacıyla</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. KVKK Haklarınız</h2>
                <p className="text-gray-700 mb-4">
                  KVKK kapsamında aşağıdaki haklara sahipsiniz:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
                  <li>Kişisel verileriniz işlenmişse buna ilişkin bilgi talep etme</li>
                  <li>Kişisel verilerinizin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme</li>
                  <li>Yurt içinde veya yurt dışında kişisel verilerinizin aktarıldığı üçüncü kişileri bilme</li>
                  <li>Kişisel verilerinizin eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme</li>
                  <li>KVKK&apos;nın 7. maddesinde öngörülen şartlar çerçevesinde kişisel verilerinizin silinmesini veya yok edilmesini isteme</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. İletişim</h2>
                <p className="text-gray-700 mb-4">
                  Gizlilik politikamız hakkında sorularınız için:
                </p>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700">
                    <strong>E-posta:</strong> privacy@atkigetir.com<br/>
                    <strong>Telefon:</strong> +90 (212) 555 0123<br/>
                    <strong>Adres:</strong> Tekstil Sanayi Sitesi, 34000 İstanbul, Türkiye
                  </p>
                </div>
              </section>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200">
              <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                </svg>
                Ana Sayfaya Dön
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 