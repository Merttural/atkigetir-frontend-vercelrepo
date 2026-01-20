import SEO from '@/components/SEO';
import Breadcrumbs from '@/components/Breadcrumbs';
import Link from 'next/link';
import { ArrowLeft, Shield, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

export default function KVKKPage() {
  return (
    <>
      <SEO
        title="KVKK Aydınlatma Metni - Atkigetir"
        description="Atkigetir KVKK (6698 sayılı Kişisel Verilerin Korunması Kanunu) aydınlatma metni. Kişisel verilerinizin işlenmesi hakkında bilgilendirme."
        url="/kvkk"
      />
      
      <div className="bg-[#F8FAFC] min-h-screen py-6">
        <div className="max-w-4xl mx-auto px-4">
          <Breadcrumbs items={[
            { name: 'Anasayfa', href: '/' },
            { name: 'KVKK Aydınlatma Metni', href: '/kvkk' }
          ]} />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-[24px] shadow-sm border border-slate-200 p-8"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-[#0F172A] tracking-tighter">KVKK Aydınlatma Metni</h1>
                <p className="text-slate-500 text-sm mt-1">6698 sayılı Kişisel Verilerin Korunması Kanunu</p>
                <p className="text-slate-500 text-sm">Son güncelleme: {new Date().toLocaleDateString('tr-TR')}</p>
              </div>
            </div>

            <div className="prose prose-lg max-w-none">
              <motion.section
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-8"
              >
                <h2 className="text-2xl font-semibold text-[#0F172A] mb-4 tracking-tight">1. Veri Sorumlusu</h2>
                <p className="text-slate-600 mb-4 leading-relaxed">
                  6698 sayılı Kişisel Verilerin Korunması Kanunu (&quot;KVKK&quot;) uyarınca, kişisel verileriniz 
                  aşağıdaki bilgiler kapsamında işlenmektedir:
                </p>
                <div className="bg-slate-50 rounded-xl p-4">
                  <p className="text-slate-600">
                    <strong>Veri Sorumlusu:</strong> Atkigetir<br/>
                    <strong>Adres:</strong> İstanbul, Türkiye<br/>
                    <strong>E-posta:</strong> privacy@atkigetir.com<br/>
                    <strong>Telefon:</strong> +90 533 749 82 66
                  </p>
                </div>
              </motion.section>

              <motion.section
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-8"
              >
                <h2 className="text-2xl font-semibold text-[#0F172A] mb-4 tracking-tight">2. İşlenen Kişisel Veriler</h2>
                <p className="text-slate-600 mb-4 leading-relaxed">
                  Aşağıdaki kişisel verileriniz işlenmektedir:
                </p>
                
                <div className="space-y-4">
                  <div className="bg-slate-50 rounded-xl p-4">
                    <h3 className="text-lg font-semibold text-[#0F172A] mb-3 tracking-tight">Kimlik Bilgileri</h3>
                    <ul className="list-disc list-inside text-slate-600 space-y-2 text-sm">
                      <li>Ad, soyad</li>
                      <li>TC Kimlik No (yasal zorunluluk durumunda)</li>
                      <li>Doğum tarihi (yaş kontrolü için)</li>
                    </ul>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-4">
                    <h3 className="text-lg font-semibold text-[#0F172A] mb-3 tracking-tight">İletişim Bilgileri</h3>
                    <ul className="list-disc list-inside text-slate-600 space-y-2 text-sm">
                      <li>E-posta adresi</li>
                      <li>Telefon numarası</li>
                      <li>Adres bilgileri (teslimat için)</li>
                    </ul>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-4">
                    <h3 className="text-lg font-semibold text-[#0F172A] mb-3 tracking-tight">Müşteri İşlem Bilgileri</h3>
                    <ul className="list-disc list-inside text-slate-600 space-y-2 text-sm">
                      <li>Sipariş bilgileri</li>
                      <li>Ödeme bilgileri (kredi kartı bilgileri saklanmaz)</li>
                      <li>Fatura bilgileri</li>
                      <li>İade/değişim bilgileri</li>
                    </ul>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-4">
                    <h3 className="text-lg font-semibold text-[#0F172A] mb-3 tracking-tight">İşlem Güvenliği Bilgileri</h3>
                    <ul className="list-disc list-inside text-slate-600 space-y-2 text-sm">
                      <li>IP adresi</li>
                      <li>Tarayıcı bilgileri</li>
                      <li>Çerez bilgileri</li>
                      <li>Site kullanım verileri</li>
                    </ul>
                  </div>
                </div>
              </motion.section>

              <motion.section
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-8"
              >
                <h2 className="text-2xl font-semibold text-[#0F172A] mb-4 tracking-tight">3. Kişisel Verilerin İşlenme Amaçları</h2>
                <p className="text-slate-600 mb-4 leading-relaxed">
                  Kişisel verileriniz aşağıdaki amaçlarla işlenmektedir:
                </p>
                <ul className="list-disc list-inside text-slate-600 space-y-2 bg-slate-50 rounded-xl p-4">
                  <li>Siparişlerinizi işlemek ve teslimat yapmak</li>
                  <li>Ödeme işlemlerini gerçekleştirmek</li>
                  <li>Müşteri hizmetleri sağlamak</li>
                  <li>Yasal yükümlülükleri yerine getirmek (fatura, vergi vb.)</li>
                  <li>Güvenlik ve dolandırıcılık önleme</li>
                  <li>Site performansını iyileştirmek</li>
                  <li>Size özel teklifler sunmak (izin verirseniz)</li>
                  <li>Pazarlama ve reklam faaliyetleri (izin verirseniz)</li>
                  <li>Müşteri memnuniyeti analizi</li>
                </ul>
              </motion.section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-[#0F172A] mb-4 tracking-tight">4. Kişisel Verilerin İşlenme Hukuki Sebepleri</h2>
                <p className="text-slate-600 mb-4 leading-relaxed">
                  Kişisel verileriniz KVKK&apos;nın 5. ve 6. maddelerinde belirtilen aşağıdaki hukuki sebeplerle işlenmektedir:
                </p>
                <ul className="list-disc list-inside text-slate-600 space-y-2 bg-blue-50 rounded-xl p-4">
                  <li><strong>Açık rıza:</strong> Pazarlama ve reklam faaliyetleri için</li>
                  <li><strong>Sözleşmenin kurulması veya ifası:</strong> Sipariş ve ödeme işlemleri için</li>
                  <li><strong>Yasal yükümlülük:</strong> Vergi, fatura, muhasebe kayıtları için</li>
                  <li><strong>Meşru menfaat:</strong> Güvenlik, dolandırıcılık önleme, site iyileştirme için</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-[#0F172A] mb-4 tracking-tight">5. Kişisel Verilerin Aktarılması</h2>
                <p className="text-slate-600 mb-4 leading-relaxed">
                  Kişisel verileriniz, aşağıdaki durumlarda üçüncü taraflarla paylaşılabilir:
                </p>
                <div className="space-y-4">
                  <div className="bg-amber-50 rounded-xl p-4">
                    <h3 className="text-lg font-semibold text-[#0F172A] mb-2">Hizmet Sağlayıcılar</h3>
                    <ul className="list-disc list-inside text-slate-600 space-y-2 text-sm">
                      <li><strong>Kargo Firmaları:</strong> Teslimat için adres bilgileri</li>
                      <li><strong>Ödeme Kuruluşları:</strong> Ödeme işlemleri için (kredi kartı bilgileri saklanmaz)</li>
                      <li><strong>Hosting ve Teknoloji Hizmetleri:</strong> Veri saklama ve işleme</li>
                    </ul>
                  </div>
                  
                  <div className="bg-red-50 rounded-xl p-4">
                    <h3 className="text-lg font-semibold text-[#0F172A] mb-2">Yasal Zorunluluklar</h3>
                    <p className="text-slate-600 text-sm">
                      Yasal yükümlülüklerimizi yerine getirmek için ilgili kamu kurum ve kuruluşlarına 
                      bilgi verilebilir (vergi dairesi, mahkemeler vb.).
                    </p>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-[#0F172A] mb-4 tracking-tight">6. Kişisel Verilerin Saklanma Süresi</h2>
                <p className="text-slate-600 mb-4 leading-relaxed">
                  Kişisel verileriniz, işlenme amacının gerektirdiği süre boyunca ve yasal saklama 
                  süreleri (örneğin, vergi mevzuatı gereği 10 yıl) dikkate alınarak saklanmaktadır.
                </p>
                <div className="bg-slate-50 rounded-xl p-4">
                  <ul className="list-disc list-inside text-slate-600 space-y-2 text-sm">
                    <li><strong>Sipariş Bilgileri:</strong> 10 yıl (vergi mevzuatı gereği)</li>
                    <li><strong>İletişim Bilgileri:</strong> İş ilişkisi süresince</li>
                    <li><strong>Çerez Bilgileri:</strong> Çerez türüne göre 1-2 yıl</li>
                    <li><strong>Pazarlama İzinleri:</strong> İzin geri alınana kadar</li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-[#0F172A] mb-4 tracking-tight">7. KVKK Kapsamındaki Haklarınız</h2>
                <p className="text-slate-600 mb-4 leading-relaxed">
                  KVKK&apos;nın 11. maddesi uyarınca aşağıdaki haklara sahipsiniz:
                </p>
                <div className="space-y-3">
                  <div className="bg-emerald-50 rounded-xl p-4">
                    <h3 className="font-semibold text-[#0F172A] mb-2">Bilgi Talep Etme Hakkı</h3>
                    <p className="text-slate-600 text-sm">
                      Kişisel verilerinizin işlenip işlenmediğini öğrenme ve işlenmişse buna ilişkin bilgi talep etme
                    </p>
                  </div>
                  
                  <div className="bg-emerald-50 rounded-xl p-4">
                    <h3 className="font-semibold text-[#0F172A] mb-2">Erişim Hakkı</h3>
                    <p className="text-slate-600 text-sm">
                      Kişisel verilerinizin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme
                    </p>
                  </div>
                  
                  <div className="bg-emerald-50 rounded-xl p-4">
                    <h3 className="font-semibold text-[#0F172A] mb-2">Düzeltme Hakkı</h3>
                    <p className="text-slate-600 text-sm">
                      Kişisel verilerinizin eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme
                    </p>
                  </div>
                  
                  <div className="bg-emerald-50 rounded-xl p-4">
                    <h3 className="font-semibold text-[#0F172A] mb-2">Silme Hakkı</h3>
                    <p className="text-slate-600 text-sm">
                      KVKK&apos;nın 7. maddesinde öngörülen şartlar çerçevesinde kişisel verilerinizin 
                      silinmesini veya yok edilmesini isteme
                    </p>
                  </div>
                  
                  <div className="bg-emerald-50 rounded-xl p-4">
                    <h3 className="font-semibold text-[#0F172A] mb-2">İtiraz Hakkı</h3>
                    <p className="text-slate-600 text-sm">
                      Kişisel verilerinizin kanuna aykırı olarak işlenmesi sebebiyle zarara uğramanız 
                      hâlinde zararın giderilmesini talep etme
                    </p>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-[#0F172A] mb-4 tracking-tight">8. Haklarınızı Nasıl Kullanabilirsiniz?</h2>
                <p className="text-slate-600 mb-4 leading-relaxed">
                  KVKK kapsamındaki haklarınızı kullanmak için aşağıdaki yöntemlerden birini kullanabilirsiniz:
                </p>
                <div className="bg-blue-50 rounded-xl p-4">
                  <ul className="list-disc list-inside text-slate-600 space-y-2 text-sm">
                    <li><strong>E-posta:</strong> privacy@atkigetir.com adresine yazılı başvuru</li>
                    <li><strong>Posta:</strong> İstanbul, Türkiye adresine noter onaylı başvuru</li>
                    <li><strong>Şahsen:</strong> İstanbul adresimize gelerek başvuru</li>
                  </ul>
                  <p className="text-slate-600 mt-3 text-sm">
                    Başvurunuzda kimliğinizi tespit edici belgeler ve talep ettiğiniz konuya ilişkin 
                    açıklamalar bulunmalıdır. Başvurunuz en geç 30 gün içinde sonuçlandırılacaktır.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-[#0F172A] mb-4 tracking-tight">9. Kişisel Verilerin Güvenliği</h2>
                <p className="text-slate-600 mb-4 leading-relaxed">
                  Kişisel verilerinizin güvenliği için aşağıdaki teknik ve idari önlemler alınmaktadır:
                </p>
                <ul className="list-disc list-inside text-slate-600 space-y-2 bg-slate-50 rounded-xl p-4">
                  <li>SSL şifreleme ile güvenli veri aktarımı</li>
                  <li>Güvenli sunucu altyapısı</li>
                  <li>Düzenli güvenlik güncellemeleri</li>
                  <li>Erişim kontrolü ve yetkilendirme</li>
                  <li>Düzenli yedekleme</li>
                  <li>Personel eğitimi ve bilinçlendirme</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-[#0F172A] mb-4 tracking-tight">10. İletişim</h2>
                <p className="text-slate-600 mb-4 leading-relaxed">
                  KVKK kapsamındaki haklarınız ve kişisel verilerinizin işlenmesi hakkında sorularınız için:
                </p>
                <div className="bg-slate-50 rounded-xl p-4">
                  <p className="text-slate-600">
                    <strong>E-posta:</strong> privacy@atkigetir.com<br/>
                    <strong>Telefon:</strong> +90 533 749 82 66<br/>
                    <strong>Adres:</strong> İstanbul, Türkiye
                  </p>
                </div>
                <p className="text-slate-600 mt-4 text-sm italic">
                  Kişisel Verileri Koruma Kurulu&apos;na şikayet hakkınız saklıdır. 
                  Detaylı bilgi için: <a href="https://www.kvkk.gov.tr" target="_blank" rel="noopener noreferrer" className="text-[#2563EB] hover:underline">www.kvkk.gov.tr</a>
                </p>
              </section>
            </div>
            
            <div className="mt-8 pt-6 border-t border-slate-200">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 text-[#2563EB] hover:text-[#1e40af] font-medium transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Ana Sayfaya Dön</span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
