import Head from 'next/head';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <>
      <Head>
        <title>Kullanım Şartları - Atkigetir</title>
        <meta name="description" content="Atkigetir kullanım şartları. Sipariş, ödeme, iade ve diğer tüm şartlar hakkında bilgi." />
      </Head>
      
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Kullanım Şartları</h1>
            <p className="text-gray-600 mb-6">Son güncelleme: {new Date().toLocaleDateString('tr-TR')}</p>
            
            <div className="prose prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Genel Hükümler</h2>
                <p className="text-gray-700 mb-4">
                  Bu kullanım şartları, Atkigetir web sitesi üzerinden yapacağınız alışverişler için geçerlidir. 
                  Sitemizi kullanarak bu şartları kabul etmiş sayılırsınız.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Sipariş ve Ödeme</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Sipariş Verme</h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      <li>Siparişleriniz 7/24 online olarak verilebilir</li>
                      <li>Stok durumu gerçek zamanlı olarak kontrol edilir</li>
                      <li>Ödeme onayından sonra sipariş işleme alınır</li>
                      <li>Eksik veya hatalı bilgilerle verilen siparişler iptal edilebilir</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Ödeme Yöntemleri</h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      <li>Kredi kartı (iyzico güvenlik sistemi)</li>
                      <li>Banka kartı</li>
                      <li>Havale/EFT (ön sipariş gerekli)</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Teslimat</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Teslimat Süreleri</h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      <li>Stokta olan ürünler: 1-3 iş günü</li>
                      <li>Özel üretim ürünler: 7-15 iş günü</li>
                      <li>Büyük siparişler: 15-30 iş günü</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Teslimat Ücreti</h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      <li>150 TL üzeri siparişlerde ücretsiz kargo</li>
                      <li>150 TL altı siparişlerde 25 TL kargo ücreti</li>
                      <li>Özel teslimat talepleri için ek ücret</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. İade ve Değişim</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">İade Koşulları</h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      <li>Ürün tesliminden itibaren 14 gün içinde iade edilebilir</li>
                      <li>Ürün orijinal ambalajında ve kullanılmamış olmalıdır</li>
                      <li>Kişiye özel üretim ürünler iade edilemez</li>
                      <li>İade kargo ücreti müşteri tarafından karşılanır</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Değişim Koşulları</h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      <li>Beden değişimi 30 gün içinde yapılabilir</li>
                      <li>Renk değişimi stok durumuna bağlıdır</li>
                      <li>Değişim kargo ücreti firmamız tarafından karşılanır</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Garanti</h2>
                <p className="text-gray-700 mb-4">
                  Tüm ürünlerimiz 2 yıl garanti kapsamındadır. Garanti kapsamı:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Üretim hataları</li>
                  <li>Malzeme kalitesi sorunları</li>
                  <li>Dikiş hataları</li>
                  <li>Renk solması (normal kullanım koşullarında)</li>
                </ul>
                <p className="text-gray-700 mt-4">
                  Garanti kapsamı dışında kalan durumlar: Yanlış kullanım, yıkama hataları, 
                  kimyasal maddelerle temas.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Fiyat ve Ödeme</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Fiyatlandırma</h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      <li>Tüm fiyatlar KDV dahildir</li>
                      <li>Fiyatlar önceden haber verilmeksizin değiştirilebilir</li>
                      <li>Sipariş anındaki fiyat geçerlidir</li>
                      <li>Toplu siparişlerde özel fiyatlandırma</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Ödeme Güvenliği</h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      <li>iyzico güvenlik sistemi kullanılmaktadır</li>
                      <li>Kredi kartı bilgileriniz saklanmaz</li>
                      <li>SSL şifreleme ile güvenli ödeme</li>
                      <li>3D Secure doğrulama</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Sorumluluk Sınırları</h2>
                <p className="text-gray-700 mb-4">
                  Atkigetir olarak sorumluluğumuz:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Ürün kalitesi ve uygunluğu</li>
                  <li>Zamanında teslimat</li>
                  <li>Müşteri hizmetleri desteği</li>
                  <li>Güvenli ödeme işlemi</li>
                </ul>
                <p className="text-gray-700 mt-4">
                  Sorumluluğumuz dışında kalan durumlar: Kargo firması kaynaklı gecikmeler, 
                  doğal afetler, teknik sorunlar.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Gizlilik ve Güvenlik</h2>
                <p className="text-gray-700 mb-4">
                  Kişisel verileriniz KVKK kapsamında korunmaktadır. Detaylı bilgi için 
                  <Link href="/privacy" legacyBehavior>
                    <a className="text-blue-600 hover:underline font-medium"> Gizlilik Politikamızı</a>
                  </Link> inceleyebilirsiniz.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. İletişim</h2>
                <p className="text-gray-700 mb-4">
                  Kullanım şartları hakkında sorularınız için:
                </p>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700">
                    <strong>E-posta:</strong> info@atkigetir.com<br/>
                    <strong>Telefon:</strong> +90 (212) 555 0123<br/>
                    <strong>Adres:</strong> Tekstil Sanayi Sitesi, 34000 İstanbul, Türkiye
                  </p>
                </div>
              </section>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200">
              <Link href="/" legacyBehavior>
                <a className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                  </svg>
                  Ana Sayfaya Dön
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 