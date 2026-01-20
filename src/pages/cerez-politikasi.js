import SEO from '@/components/SEO';
import Breadcrumbs from '@/components/Breadcrumbs';
import Link from 'next/link';
import { ArrowLeft, Cookie } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CookiePolicyPage() {
  return (
    <>
      <SEO
        title="Çerez Politikası - Atkigetir"
        description="Atkigetir çerez politikası. Web sitemizde kullanılan çerezler ve amaçları hakkında detaylı bilgi."
        url="/cerez-politikasi"
      />
      
      <div className="bg-[#F8FAFC] min-h-screen py-6">
        <div className="max-w-4xl mx-auto px-4">
          <Breadcrumbs items={[
            { name: 'Anasayfa', href: '/' },
            { name: 'Çerez Politikası', href: '/cerez-politikasi' }
          ]} />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-[24px] shadow-sm border border-slate-200 p-8"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                <Cookie className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-[#0F172A] tracking-tighter">Çerez Politikası</h1>
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
                <h2 className="text-2xl font-semibold text-[#0F172A] mb-4 tracking-tight">1. Çerez Nedir?</h2>
                <p className="text-slate-600 mb-4 leading-relaxed">
                  Çerezler, web sitelerini ziyaret ettiğinizde tarayıcınız tarafından bilgisayarınıza veya 
                  mobil cihazınıza kaydedilen küçük metin dosyalarıdır. Bu dosyalar, web sitesinin düzgün 
                  çalışmasını sağlar ve kullanıcı deneyimini iyileştirir.
                </p>
              </motion.section>

              <motion.section
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-8"
              >
                <h2 className="text-2xl font-semibold text-[#0F172A] mb-4 tracking-tight">2. Hangi Çerezleri Kullanıyoruz?</h2>
                
                <div className="space-y-6">
                  <div className="bg-slate-50 rounded-xl p-5">
                    <h3 className="text-lg font-semibold text-[#0F172A] mb-3 tracking-tight">Zorunlu Çerezler</h3>
                    <p className="text-slate-600 mb-3 text-sm leading-relaxed">
                      Bu çerezler web sitesinin temel işlevlerini yerine getirmesi için gereklidir. 
                      Bu çerezler olmadan web sitesi düzgün çalışmaz.
                    </p>
                    <ul className="list-disc list-inside text-slate-600 space-y-2 text-sm">
                      <li><strong>Oturum Çerezleri:</strong> Alışveriş sepetinizi hatırlamak için</li>
                      <li><strong>Güvenlik Çerezleri:</strong> Güvenli bağlantı sağlamak için</li>
                      <li><strong>Dil Tercihi:</strong> Seçtiğiniz dil ayarını hatırlamak için</li>
                    </ul>
                  </div>

                  <div className="bg-blue-50 rounded-xl p-5">
                    <h3 className="text-lg font-semibold text-[#0F172A] mb-3 tracking-tight">Performans ve Analitik Çerezler</h3>
                    <p className="text-slate-600 mb-3 text-sm leading-relaxed">
                      Bu çerezler, web sitesinin nasıl kullanıldığını anlamamıza yardımcı olur. 
                      Bu çerezler sadece izninizle kullanılır.
                    </p>
                    <ul className="list-disc list-inside text-slate-600 space-y-2 text-sm">
                      <li><strong>Google Analytics:</strong> Site trafiği ve kullanıcı davranışlarını analiz etmek için</li>
                      <li><strong>Google Tag Manager:</strong> Etiket yönetimi için</li>
                      <li><strong>Meta Pixel:</strong> Facebook reklam performansını ölçmek için</li>
                    </ul>
                    <p className="text-slate-600 mt-3 text-sm italic">
                      Bu çerezler sadece çerez onayınızı verdiğinizde aktif olur.
                    </p>
                  </div>

                  <div className="bg-purple-50 rounded-xl p-5">
                    <h3 className="text-lg font-semibold text-[#0F172A] mb-3 tracking-tight">Hedefleme ve Reklam Çerezleri</h3>
                    <p className="text-slate-600 mb-3 text-sm leading-relaxed">
                      Bu çerezler, size daha ilgili reklamlar göstermek için kullanılır. 
                      Bu çerezler sadece izninizle kullanılır.
                    </p>
                    <ul className="list-disc list-inside text-slate-600 space-y-2 text-sm">
                      <li><strong>Google Ads:</strong> Dönüşüm takibi ve reklam optimizasyonu için</li>
                      <li><strong>Meta Pixel:</strong> Facebook ve Instagram reklamları için</li>
                    </ul>
                    <p className="text-slate-600 mt-3 text-sm italic">
                      Bu çerezler sadece çerez onayınızı verdiğinizde aktif olur.
                    </p>
                  </div>
                </div>
              </motion.section>

              <motion.section
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-8"
              >
                <h2 className="text-2xl font-semibold text-[#0F172A] mb-4 tracking-tight">3. Çerezlerin Kullanım Amacı</h2>
                <ul className="list-disc list-inside text-slate-600 space-y-2 bg-slate-50 rounded-xl p-4">
                  <li>Web sitesinin düzgün çalışmasını sağlamak</li>
                  <li>Alışveriş sepetinizi hatırlamak</li>
                  <li>Kullanıcı tercihlerinizi kaydetmek</li>
                  <li>Site performansını iyileştirmek</li>
                  <li>Güvenliği sağlamak</li>
                  <li>Size özel içerik ve reklamlar sunmak (izin verirseniz)</li>
                  <li>Site kullanım istatistiklerini toplamak (izin verirseniz)</li>
                </ul>
              </motion.section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-[#0F172A] mb-4 tracking-tight">4. Çerez Süreleri</h2>
                <div className="space-y-4">
                  <div className="bg-slate-50 rounded-xl p-4">
                    <h3 className="text-lg font-semibold text-[#0F172A] mb-2">Oturum Çerezleri</h3>
                    <p className="text-slate-600 text-sm">
                      Tarayıcınızı kapattığınızda otomatik olarak silinir.
                    </p>
                  </div>
                  
                  <div className="bg-slate-50 rounded-xl p-4">
                    <h3 className="text-lg font-semibold text-[#0F172A] mb-2">Kalıcı Çerezler</h3>
                    <p className="text-slate-600 text-sm">
                      Belirli bir süre boyunca (genellikle 1-2 yıl) cihazınızda kalır. 
                      Süresi dolduğunda otomatik olarak silinir.
                    </p>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-[#0F172A] mb-4 tracking-tight">5. Çerezleri Nasıl Yönetebilirsiniz?</h2>
                <div className="space-y-4">
                  <div className="bg-blue-50 rounded-xl p-4">
                    <h3 className="text-lg font-semibold text-[#0F172A] mb-2">Tarayıcı Ayarları</h3>
                    <p className="text-slate-600 mb-3 text-sm">
                      Çoğu tarayıcı, çerezleri kabul etme veya reddetme seçeneği sunar. 
                      Tarayıcınızın ayarlarından çerezleri yönetebilirsiniz:
                    </p>
                    <ul className="list-disc list-inside text-slate-600 space-y-1 text-sm">
                      <li><strong>Chrome:</strong> Ayarlar → Gizlilik ve güvenlik → Çerezler</li>
                      <li><strong>Firefox:</strong> Seçenekler → Gizlilik ve Güvenlik → Çerezler</li>
                      <li><strong>Safari:</strong> Tercihler → Gizlilik → Çerezler</li>
                      <li><strong>Edge:</strong> Ayarlar → Gizlilik, arama ve hizmetler → Çerezler</li>
                    </ul>
                  </div>
                  
                  <div className="bg-emerald-50 rounded-xl p-4">
                    <h3 className="text-lg font-semibold text-[#0F172A] mb-2">Çerez Onayı</h3>
                    <p className="text-slate-600 text-sm">
                      Web sitemizi ilk ziyaret ettiğinizde, çerez onayı penceresi görüntülenir. 
                      Bu pencereden hangi çerezleri kabul etmek istediğinizi seçebilirsiniz. 
                      İstediğiniz zaman tarayıcı ayarlarınızdan veya çerez yönetim panelinden 
                      tercihlerinizi değiştirebilirsiniz.
                    </p>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-[#0F172A] mb-4 tracking-tight">6. Çerezleri Devre Dışı Bırakmanın Etkileri</h2>
                <p className="text-slate-600 mb-4 leading-relaxed">
                  Çerezleri devre dışı bırakırsanız, web sitesinin bazı özellikleri düzgün çalışmayabilir:
                </p>
                <ul className="list-disc list-inside text-slate-600 space-y-2 bg-amber-50 rounded-xl p-4">
                  <li>Alışveriş sepetiniz kaydedilmeyebilir</li>
                  <li>Giriş yaptığınızda oturumunuz hatırlanmayabilir</li>
                  <li>Tercihleriniz kaydedilmeyebilir</li>
                  <li>Bazı sayfalar düzgün yüklenmeyebilir</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-[#0F172A] mb-4 tracking-tight">7. Üçüncü Taraf Çerezler</h2>
                <p className="text-slate-600 mb-4 leading-relaxed">
                  Web sitemizde aşağıdaki üçüncü taraf hizmetlerin çerezleri kullanılmaktadır:
                </p>
                <div className="space-y-3">
                  <div className="bg-slate-50 rounded-xl p-4">
                    <h3 className="font-semibold text-[#0F172A] mb-2">Google Analytics</h3>
                    <p className="text-slate-600 text-sm">
                      Google&apos;ın gizlilik politikası: 
                      <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#2563EB] hover:underline ml-1">
                        https://policies.google.com/privacy
                      </a>
                    </p>
                  </div>
                  
                  <div className="bg-slate-50 rounded-xl p-4">
                    <h3 className="font-semibold text-[#0F172A] mb-2">Meta (Facebook) Pixel</h3>
                    <p className="text-slate-600 text-sm">
                      Meta&apos;nın gizlilik politikası: 
                      <a href="https://www.facebook.com/privacy/explanation" target="_blank" rel="noopener noreferrer" className="text-[#2563EB] hover:underline ml-1">
                        https://www.facebook.com/privacy/explanation
                      </a>
                    </p>
                  </div>
                  
                  <div className="bg-slate-50 rounded-xl p-4">
                    <h3 className="font-semibold text-[#0F172A] mb-2">Google Ads</h3>
                    <p className="text-slate-600 text-sm">
                      Google Ads gizlilik politikası: 
                      <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#2563EB] hover:underline ml-1">
                        https://policies.google.com/privacy
                      </a>
                    </p>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-[#0F172A] mb-4 tracking-tight">8. İletişim</h2>
                <p className="text-slate-600 mb-4 leading-relaxed">
                  Çerez politikamız hakkında sorularınız için:
                </p>
                <div className="bg-slate-50 rounded-xl p-4">
                  <p className="text-slate-600">
                    <strong>E-posta:</strong> privacy@atkigetir.com<br/>
                    <strong>Telefon:</strong> +90 533 749 82 66<br/>
                    <strong>Adres:</strong> İstanbul, Türkiye
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
