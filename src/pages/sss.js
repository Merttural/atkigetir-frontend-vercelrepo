import SEO from "@/components/SEO";
import Breadcrumbs from '@/components/Breadcrumbs';
import Link from "next/link";
import { ChevronDown, Plus, Minus, MessageCircle, Mail, HelpCircle, Package, FileText, Building2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function FAQPage() {
  const [openFaq, setOpenFaq] = useState(null);

  const faqData = [
    {
      id: 9,
      question: "Toplu sipariş indirimi var mı?",
      answer: "Evet! 10 adet ve üzeri siparişlerde %15, 25 adet ve üzeri siparişlerde %20 indirim uygulanır. Kurumsal siparişler için özel fiyat teklifi alabilirsiniz."
    },
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

      <div className="bg-[#F8FAFC] min-h-screen">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Breadcrumbs items={[
            { name: 'Anasayfa', href: '/' },
            { name: 'SSS', href: '/sss' }
          ]} />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-center mb-12"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#2563EB] to-[#1e40af] flex items-center justify-center mx-auto mb-4 shadow-lg">
                <HelpCircle className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-[#0F172A] mb-4 tracking-tighter">
                Sıkça Sorulan Sorular
              </h1>
              <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
                Atkı siparişi, ödeme, kargo ve kullanım hakkında merak ettiğiniz 
                tüm soruların cevaplarını burada bulabilirsiniz.
              </p>
            </motion.div>

            {/* FAQ List */}
            <div className="space-y-4 mb-12">
              {faqData.map((faq, index) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`bg-gradient-to-b from-white to-gray-50 rounded-[24px] shadow-sm border border-slate-200 overflow-hidden transition-all duration-300 ${
                    openFaq === index ? 'ring-2 ring-blue-500/20' : ''
                  }`}
                >
                  <motion.button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-between p-5 bg-transparent hover:bg-gray-50/50 transition-colors text-left active:scale-95"
                    aria-expanded={openFaq === index}
                    aria-controls={`faq-answer-${faq.id}`}
                    aria-label={`${faq.question} - ${openFaq === index ? 'Cevabı gizle' : 'Cevabı göster'}`}
                  >
                    <div className="flex items-start gap-3 flex-1">
                      <span className="bg-gradient-to-br from-[#2563EB] to-[#1e40af] text-white rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5" aria-hidden="true">
                        {index + 1}
                      </span>
                      <span className="font-semibold text-[#0F172A] text-sm flex-1" id={`faq-question-${faq.id}`}>{faq.question}</span>
                    </div>
                    <motion.div
                      animate={{ rotate: openFaq === index ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      aria-hidden="true"
                    >
                      <ChevronDown className="w-5 h-5 text-slate-500 flex-shrink-0" />
                    </motion.div>
                  </motion.button>
                  <AnimatePresence>
                    {openFaq === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 ml-10 text-slate-600 text-sm leading-relaxed">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>

            {/* Contact CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-gradient-to-br from-[#2563EB]/10 to-[#1e40af]/10 rounded-[24px] p-8 text-center border border-[#2563EB]/20 mb-12"
            >
              <h2 className="text-2xl font-bold text-[#0F172A] mb-4 tracking-tight">
                Sorunuzun Cevabını Bulamadınız mı?
              </h2>
              <p className="text-slate-600 mb-6">
                Uzman ekibimiz size yardımcı olmaktan mutluluk duyar. 
                İletişim kanallarımızdan bize ulaşabilirsiniz.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="https://wa.me/905337498266?text=Merhabalar%20Kerim%20Bey%20Sipariş%20Vermek%20istiyorum."
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-[#22C55E] to-[#16A34A] text-white px-6 py-3 rounded-xl hover:from-[#16A34A] hover:to-[#15803d] transition-all shadow-md hover:shadow-[0_0_25px_rgba(34,197,94,0.4)] font-semibold inline-flex items-center justify-center gap-2 group"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>WhatsApp ile Sor</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </motion.a>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/iletisim"
                    className="bg-gradient-to-r from-[#2563EB] to-[#1e40af] text-white px-6 py-3 rounded-xl hover:from-[#1e40af] hover:to-[#1e3a8a] transition-all shadow-md hover:shadow-lg font-medium inline-flex items-center justify-center gap-2"
                    aria-label="İletişim sayfasına git"
                  >
                    <Mail className="w-5 h-5" aria-hidden="true" />
                    İletişim Sayfası
                  </Link>
                </motion.div>
              </div>
            </motion.div>

            {/* Related Links */}
            <div>
              <h3 className="text-xl font-bold text-[#0F172A] mb-6 text-center tracking-tight">
                İlgili Sayfalar
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { href: '/urunler', icon: Package, title: 'Ürünlerimiz', desc: 'Atkı modellerimizi inceleyin', gradient: 'from-blue-500 to-cyan-500' },
                  { href: '/blog', icon: FileText, title: 'Blog', desc: 'Atkı rehberleri ve ipuçları', gradient: 'from-purple-500 to-pink-500' },
                  { href: '/hakkimizda', icon: Building2, title: 'Hakkımızda', desc: 'Atkigetir hikayesi', gradient: 'from-emerald-500 to-teal-500' }
                ].map((link, index) => {
                  const IconComponent = link.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      whileHover={{ y: -4, scale: 1.02 }}
                    >
                      <Link
                        href={link.href}
                        className="bg-white border border-slate-200 rounded-[24px] p-6 hover:shadow-md transition-all text-center block"
                        aria-label={`${link.title} sayfasına git - ${link.desc}`}
                      >
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${link.gradient} flex items-center justify-center mx-auto mb-3`} aria-hidden="true">
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <h4 className="font-semibold text-[#0F172A] mb-1">{link.title}</h4>
                        <p className="text-sm text-slate-500">{link.desc}</p>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
