import SEO from '@/components/SEO';
import Breadcrumbs from '@/components/Breadcrumbs';
import Link from 'next/link';
import { ArrowLeft, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PrivacyPage() {
  return (
    <>
      <SEO
        title="Gizlilik Politikası - Atkigetir"
        description="Atkigetir gizlilik politikası ve kişisel verilerin korunması hakkında bilgiler."
        url="/privacy"
      />
      
      <div className="bg-[#F8FAFC] min-h-screen py-6">
        <div className="max-w-4xl mx-auto px-4">
          <Breadcrumbs items={[
            { name: 'Anasayfa', href: '/' },
            { name: 'Gizlilik Politikası', href: '/privacy' }
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
                <h1 className="text-3xl font-bold text-[#0F172A] tracking-tighter">Gizlilik Politikası</h1>
                <p className="text-slate-500 text-sm mt-1">Son güncelleme: {new Date().toLocaleDateString('tr-TR')}</p>
              </div>
            </div>

            <div className="prose prose-lg max-w-none">
              <motion.section
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-8"
              >
                <h2 className="text-2xl font-semibold text-[#0F172A] mb-4 tracking-tight">1. Giriş</h2>
                <p className="text-slate-600 mb-4 leading-relaxed">
                  Atkigetir olarak, kişisel verilerinizin güvenliği bizim için çok önemlidir. 
                  Bu gizlilik politikası, hangi bilgileri topladığımızı, nasıl kullandığımızı 
                  ve koruduğumuzu açıklar.
                </p>
              </motion.section>

              <motion.section
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-8"
              >
                <h2 className="text-2xl font-semibold text-[#0F172A] mb-4 tracking-tight">2. Toplanan Bilgiler</h2>
                <p className="text-slate-600 mb-4">Aşağıdaki bilgileri topluyoruz:</p>
                <ul className="list-disc list-inside text-slate-600 space-y-2 bg-slate-50 rounded-xl p-4">
                  <li>Ad, soyad ve iletişim bilgileri</li>
                  <li>Sipariş ve ödeme bilgileri</li>
                  <li>Site kullanım verileri</li>
                  <li>Teknik bilgiler (IP adresi, tarayıcı türü)</li>
                </ul>
              </motion.section>

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