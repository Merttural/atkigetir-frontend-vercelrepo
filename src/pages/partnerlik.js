import SEO from "@/components/SEO";
import Breadcrumbs from '@/components/Breadcrumbs';
import Link from "next/link";
import { FileText, Smartphone, ShoppingCart, Gift, Package, Palette, Phone, TrendingUp, Link2, Handshake, Briefcase, CheckCircle2, MessageCircle, Mail, HelpCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PartnerlikPage() {
  return (
    <>
      <SEO
        title="Partnerlik ve İş Birliği | Atkigetir"
        description="Atkigetir ile iş birliği yapın. Blog yazarları, influencer'lar ve e-ticaret siteleri için partnerlik programı. Ortak çalışma fırsatları."
        keywords="atkigetir partnerlik, atkı iş birliği, blog yazarları, influencer, affiliate, ortaklık, atkı sponsorluk"
        url="/partnerlik"
        type="page"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Atkigetir Partnerlik Programı",
          "description": "Atkigetir ile iş birliği fırsatları ve partnerlik programı",
          "url": "https://atkigetir.com/partnerlik",
          "mainEntity": {
            "@type": "Organization",
            "name": "Atkigetir",
            "url": "https://atkigetir.com"
          }
        }}
      />

      <div className="bg-[#F8FAFC] min-h-screen py-6">
        <div className="max-w-6xl mx-auto px-4">
          <Breadcrumbs items={[
            { name: 'Anasayfa', href: '/' },
            { name: 'Partnerlik', href: '/partnerlik' }
          ]} />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Header */}
            <div className="text-center mb-12 mt-6">
              <h1 className="text-3xl font-bold text-[#0F172A] mb-4 tracking-tighter">
                Partnerlik ve İş Birliği
              </h1>
              <p className="text-slate-500 max-w-3xl mx-auto leading-relaxed">
                Atkigetir ile birlikte çalışmak istiyorsanız, size özel iş birliği 
                fırsatları sunuyoruz. Blog yazarları, influencer'lar ve e-ticaret 
                siteleri için kapsamlı partnerlik programımız.
              </p>
            </div>

            {/* Partnership Types */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {[
                { 
                  icon: FileText, 
                  title: 'Blog Yazarları', 
                  items: ['Guest post yazımı', 'Ürün inceleme fırsatları', 'Özel indirim kuponları', 'Komisyon bazlı ortaklık'],
                  gradient: 'from-blue-500 to-cyan-500'
                },
                { 
                  icon: Smartphone, 
                  title: "Influencer'lar", 
                  items: ['Ücretsiz ürün gönderimi', 'Sponsorluk fırsatları', 'Özel kampanya kodları', 'Uzun vadeli iş birlikleri'],
                  gradient: 'from-purple-500 to-pink-500'
                },
                { 
                  icon: ShoppingCart, 
                  title: 'E-ticaret Siteleri', 
                  items: ['Toplu alım indirimleri', 'Özel ürün koleksiyonları', 'Marka ortaklıkları', 'Beyaz etiket üretim'],
                  gradient: 'from-emerald-500 to-teal-500'
                }
              ].map((type, index) => {
                const IconComponent = type.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.1 }}
                    whileHover={{ y: -4 }}
                    className="bg-white rounded-[24px] shadow-sm p-6 border border-slate-200"
                  >
                    <div className="text-center mb-4">
                      <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${type.gradient} flex items-center justify-center mx-auto mb-4`}>
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-[#0F172A] mb-2 tracking-tight">{type.title}</h3>
                    </div>
                    <ul className="space-y-3">
                      {type.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start gap-2 text-slate-700 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                );
              })}
            </div>

            {/* Benefits Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-[#2563EB]/10 to-[#1e40af]/10 rounded-[24px] p-8 mb-12 border border-[#2563EB]/20"
            >
              <h2 className="text-2xl font-bold text-[#0F172A] mb-6 text-center tracking-tight">
                Partnerlik Avantajları
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                {[
                  {
                    title: 'Size Özel Avantajlar',
                    items: [
                      { icon: Gift, text: 'Özel fiyatlandırma ve indirimler' },
                      { icon: Package, text: 'Hızlı ve ücretsiz kargo' },
                      { icon: Palette, text: 'Kişiye özel tasarım desteği' },
                      { icon: Phone, text: 'Özel müşteri hizmetleri' }
                    ]
                  },
                  {
                    title: 'Ortak Faydalar',
                    items: [
                      { icon: TrendingUp, text: 'Karşılıklı trafik artışı' },
                      { icon: Link2, text: 'Backlink değişimi' },
                      { icon: Handshake, text: 'Uzun vadeli iş birlikleri' },
                      { icon: Briefcase, text: 'Profesyonel network genişletme' }
                    ]
                  }
                ].map((section, index) => (
                  <div key={index}>
                    <h3 className="text-lg font-semibold text-[#0F172A] mb-4 tracking-tight">{section.title}</h3>
                    <ul className="space-y-3">
                      {section.items.map((item, itemIndex) => {
                        const IconComponent = item.icon;
                        return (
                          <li key={itemIndex} className="flex items-start gap-3 text-slate-700">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#2563EB]/10 to-[#1e40af]/10 flex items-center justify-center flex-shrink-0">
                              <IconComponent className="w-4 h-4 text-[#2563EB]" />
                            </div>
                            <span className="text-sm">{item.text}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Application Process */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-[24px] shadow-sm p-8 mb-12 border border-slate-200"
            >
              <h2 className="text-2xl font-bold text-[#0F172A] mb-6 text-center tracking-tight">
                Başvuru Süreci
              </h2>
              <div className="grid md:grid-cols-4 gap-6">
                {[
                  { step: 1, title: 'Başvuru', desc: 'Partnerlik formunu doldurun' },
                  { step: 2, title: 'Değerlendirme', desc: 'Başvurunuzu 48 saat içinde değerlendiriyoruz' },
                  { step: 3, title: 'Onay', desc: 'Partnerlik koşullarını belirliyoruz' },
                  { step: 4, title: 'Başlangıç', desc: 'İş birliğine başlıyoruz' }
                ].map((process, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className="bg-gradient-to-br from-[#2563EB] to-[#1e40af] text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 font-bold shadow-md">
                      {process.step}
                    </div>
                    <h3 className="font-semibold text-[#0F172A] mb-2 tracking-tight">{process.title}</h3>
                    <p className="text-sm text-slate-600">{process.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Contact CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-gradient-to-r from-[#2563EB] to-[#1e40af] rounded-[24px] p-8 text-center text-white mb-12"
            >
              <h2 className="text-2xl font-bold mb-4 tracking-tighter">
                Partnerlik Başvurusu Yapın
              </h2>
              <p className="text-lg mb-6 opacity-90 leading-relaxed">
                Atkigetir ailesine katılmak için hemen başvurun. 
                Size özel iş birliği fırsatları bekliyor!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="https://wa.me/905337498266?text=Merhabalar%20Kerim%20Bey%20Partnerlik%20için%20başvuru%20yapmak%20istiyorum."
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-[#22C55E] to-[#16A34A] text-white px-6 py-3 rounded-xl hover:from-[#16A34A] hover:to-[#15803d] transition-all shadow-md hover:shadow-[0_0_25px_rgba(34,197,94,0.4)] font-semibold inline-flex items-center justify-center gap-2 group"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>WhatsApp ile Başvur</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </motion.a>
                <motion.a
                  href="mailto:info@atkigetir.com?subject=Partnerlik Başvurusu&body=Merhaba, Atkigetir ile partnerlik yapmak istiyorum. Detayları aşağıda paylaşıyorum:"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-[#2563EB] px-6 py-3 rounded-xl hover:bg-slate-50 transition-all font-medium inline-flex items-center justify-center gap-2 shadow-md"
                >
                  <Mail className="w-5 h-5" />
                  Email ile Başvur
                </motion.a>
              </div>
            </motion.div>

            {/* FAQ Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <h2 className="text-2xl font-bold text-[#0F172A] mb-6 text-center tracking-tight">
                Sıkça Sorulan Sorular
              </h2>
              <div className="space-y-4">
                {[
                  {
                    question: "Partnerlik için minimum gereksinimler nelerdir?",
                    answer: "Blog yazarları için aylık 1000+ ziyaretçi, influencer'lar için 5000+ takipçi, e-ticaret siteleri için aktif mağaza durumu gerekmektedir."
                  },
                  {
                    question: "Komisyon oranları nasıl belirleniyor?",
                    answer: "Komisyon oranları partner türüne ve aylık satış hacmine göre %5-15 arasında değişmektedir. Detaylar başvuru sonrası belirlenir."
                  },
                  {
                    question: "Ödeme süreçleri nasıl işliyor?",
                    answer: "Ödemeler aylık olarak yapılmaktadır. Banka havalesi veya PayPal ile ödeme seçenekleri mevcuttur."
                  }
                ].map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 + index * 0.1 }}
                    className="bg-white rounded-[24px] shadow-sm p-6 border border-slate-200"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#2563EB] to-[#1e40af] flex items-center justify-center flex-shrink-0">
                        <HelpCircle className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-[#0F172A] mb-2 tracking-tight">
                          {faq.question}
                        </h3>
                        <p className="text-slate-600 text-sm leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
