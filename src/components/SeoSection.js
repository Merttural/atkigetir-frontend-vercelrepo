import { motion } from 'framer-motion';
import { HelpCircle } from 'lucide-react';

export default function SeoSection() {
  const faqs = [
    {
      question: 'Taraftar atkısı nasıl üretilir?',
      answer: 'Taraftar atkıları, kaliteli yün veya akrilik kumaşlardan özel tasarım ile üretilir. Müşteri talebine göre renk, desen ve logo eklenebilir.'
    },
    {
      question: 'Bayrak üretim süresi ne kadar?',
      answer: 'Standart bayrak üretim süresi 5-7 iş günüdür. Özel tasarım ve büyük siparişlerde süre değişebilir. Detaylı bilgi için WhatsApp\'tan iletişime geçin.'
    },
    {
      question: 'Toptan fiyat alabilir miyim?',
      answer: 'Evet, toptan siparişler için özel fiyatlandırma yapıyoruz. Miktar ve detaylar için WhatsApp üzerinden iletişime geçebilirsiniz.'
    },
    {
      question: 'Hangi ödeme yöntemlerini kabul ediyorsunuz?',
      answer: 'Nakit, kredi kartı ve banka havalesi ile ödeme kabul ediyoruz. Toptan siparişlerde özel ödeme koşulları sunulabilir.'
    }
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="mt-12 bg-white rounded-[24px] shadow-sm border border-slate-200 p-8"
    >
      <h2 className="text-2xl font-bold text-[#0F172A] mb-6 tracking-tight">
        Taraftar Atkısı ve Bayrak Üretimi
      </h2>
      
      <div className="prose prose-slate max-w-none mb-8">
        <p className="text-slate-600 leading-relaxed mb-4">
          Atkigetir olarak, Türkiye'nin önde gelen taraftar atkısı ve bayrak üreticisiyiz. 
          Yılların verdiği deneyimle, kaliteli malzemeler kullanarak özel tasarım ürünler üretiyoruz.
        </p>
        <p className="text-slate-600 leading-relaxed mb-4">
          Spor kulüpleri, taraftar grupları, firmalar ve bireyler için özel üretim yapıyoruz. 
          Toptan siparişlerde özel fiyatlandırma sunuyoruz.
        </p>
        <p className="text-slate-600 leading-relaxed">
          Ürünlerimiz yerli üretimdir ve hızlı teslimat garantisi sunuyoruz. 
          Detaylı bilgi ve fiyat teklifi için WhatsApp üzerinden iletişime geçebilirsiniz.
        </p>
      </div>

      {/* FAQ Accordion */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-[#0F172A] mb-4 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-[#2563EB]" />
          Sık Sorulan Sorular
        </h3>
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <motion.details
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="bg-slate-50 rounded-xl p-4 border border-slate-200"
            >
              <summary className="font-semibold text-[#0F172A] cursor-pointer hover:text-[#2563EB] transition-colors">
                {faq.question}
              </summary>
              <p className="mt-2 text-slate-600 text-sm leading-relaxed">
                {faq.answer}
              </p>
            </motion.details>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
