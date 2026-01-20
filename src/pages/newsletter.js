import { useState } from "react";
import SEO from "@/components/SEO";
import Breadcrumbs from '@/components/Breadcrumbs';
import Link from "next/link";
import { Mail, Gift, Sparkles, TrendingUp, CheckCircle2, ArrowRight, MessageCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { validateEmail, validateRequired, validateMinLength } from '@/utils/validation';

export default function NewsletterPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = (name, value) => {
    let error = '';
    
    if (name === 'name') {
      if (!validateRequired(value)) {
        error = 'İsim zorunludur';
      } else if (!validateMinLength(value, 2)) {
        error = 'İsim en az 2 karakter olmalıdır';
      }
    } else if (name === 'email') {
      if (!validateRequired(value)) {
        error = 'E-posta zorunludur';
      } else if (!validateEmail(value)) {
        error = 'Geçerli bir e-posta adresi giriniz';
      }
    }
    
    return error;
  };

  const handleChange = (name, value) => {
    if (name === 'email') setEmail(value);
    if (name === 'name') setName(value);
    
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (fieldName) => {
    setTouched(prev => ({ ...prev, [fieldName]: true }));
    const value = fieldName === 'email' ? email : fieldName === 'name' ? name : '';
    const error = validateField(fieldName, value);
    setErrors(prev => ({ ...prev, [fieldName]: error }));
  };

  const validateForm = () => {
    const newErrors = {};
    const nameError = validateField('name', name);
    const emailError = validateField('email', email);
    
    if (nameError) newErrors.name = nameError;
    if (emailError) newErrors.email = emailError;
    
    setErrors(newErrors);
    setTouched({ name: true, email: true });
    
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Newsletter kayıt işlemi burada yapılacak
      // Şimdilik başarılı mesaj göster
      setSubscribed(true);
      
      if (typeof window !== 'undefined' && window.showToast) {
        window.showToast('Newsletter\'a başarıyla kaydoldunuz!', 'success', 3000);
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      if (typeof window !== 'undefined' && window.showToast) {
        window.showToast('Bir hata oluştu. Lütfen tekrar deneyin.', 'error', 3000);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEO
        title="Newsletter Kayıt | Atkigetir - Atkı Trendleri ve Kampanyalar"
        description="Atkigetir newsletter'a kayıt olun! En yeni atkı modelleri, özel kampanyalar, trend haberleri ve indirim fırsatlarından ilk siz haberdar olun."
        keywords="atkigetir newsletter, atkı kampanyaları, atkı indirimleri, atkı trendleri, email abonelik, atkı haberleri"
        url="/newsletter"
        type="page"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Atkigetir Newsletter Kayıt",
          "description": "Atkı trendleri ve kampanyalar için newsletter kayıt sayfası",
          "url": "https://atkigetir.com/newsletter"
        }}
      />

      <div className="bg-[#F8FAFC] min-h-screen py-6">
        <div className="max-w-4xl mx-auto px-4">
          <Breadcrumbs items={[
            { name: 'Anasayfa', href: '/' },
            { name: 'Newsletter', href: '/newsletter' }
          ]} />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Header */}
            <div className="text-center mb-12 mt-6">
              <h1 className="text-3xl font-bold text-[#0F172A] mb-4 tracking-tighter">
                Newsletter'a Kayıt Olun
              </h1>
              <p className="text-slate-500 max-w-2xl mx-auto leading-relaxed">
                En yeni atkı modelleri, özel kampanyalar, trend haberleri ve 
                indirim fırsatlarından ilk siz haberdar olun!
              </p>
            </div>

            {!subscribed ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-[24px] shadow-sm border border-slate-200 p-8 max-w-2xl mx-auto"
              >
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-[#0F172A] mb-2">
                      Ad Soyad *
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      onBlur={() => handleBlur('name')}
                      required
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 text-sm bg-white transition-all ${
                        errors.name ? 'border-red-300 focus:border-red-500' : 'border-slate-300 focus:border-[#2563EB]'
                      }`}
                      placeholder="Adınızı ve soyadınızı girin"
                    />
                    {errors.name && touched.name && (
                      <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[#0F172A] mb-2">
                      E-posta Adresi *
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      onBlur={() => handleBlur('email')}
                      required
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 text-sm bg-white transition-all ${
                        errors.email ? 'border-red-300 focus:border-red-500' : 'border-slate-300 focus:border-[#2563EB]'
                      }`}
                      placeholder="ornek@email.com"
                    />
                    {errors.email && touched.email && (
                      <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="privacy"
                      required
                      className="mt-1 h-4 w-4 rounded border-slate-300 text-[#2563EB] focus:ring-[#2563EB]"
                    />
                    <label htmlFor="privacy" className="text-sm text-slate-600">
                      <Link href="/gizlilik" className="text-[#2563EB] hover:underline">
                        Gizlilik politikası
                      </Link>{" "}
                      ve{" "}
                      <Link href="/kosullar" className="text-[#2563EB] hover:underline">
                        kullanım şartlarını
                      </Link>{" "}
                      okudum ve kabul ediyorum.
                    </label>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    className="w-full bg-gradient-to-r from-[#2563EB] to-[#1e40af] text-white py-3.5 px-6 rounded-xl font-semibold hover:from-[#1e40af] hover:to-[#1e3a8a] transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Kaydediliyor...</span>
                      </>
                    ) : (
                      <>
                        <Mail className="w-5 h-5" />
                        <span>Newsletter'a Kayıt Ol</span>
                      </>
                    )}
                  </motion.button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200 rounded-[24px] p-8 max-w-2xl mx-auto text-center"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-100 to-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600" />
                </div>
                <h2 className="text-2xl font-bold text-[#0F172A] mb-4 tracking-tighter">
                  Kayıt Başarılı!
                </h2>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  Newsletter kaydınız başarıyla tamamlandı. Artık en yeni atkı modelleri, 
                  özel kampanyalar ve indirim fırsatlarından ilk siz haberdar olacaksınız!
                </p>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-[#2563EB] to-[#1e40af] text-white px-6 py-3 rounded-xl font-semibold hover:from-[#1e40af] hover:to-[#1e3a8a] transition-all shadow-md hover:shadow-lg"
                  >
                    <ArrowRight className="w-5 h-5" />
                    <span>Ana Sayfaya Dön</span>
                  </Link>
                </motion.div>
              </motion.div>
            )}

            {/* Benefits Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-12"
            >
              <h2 className="text-2xl font-bold text-[#0F172A] mb-8 text-center tracking-tight">
                Newsletter Avantajları
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { icon: Gift, title: 'Özel Kampanyalar', desc: 'Newsletter üyelerine özel indirimler ve kampanyalardan ilk siz haberdar olun.', gradient: 'from-blue-500 to-cyan-500' },
                  { icon: Sparkles, title: 'Yeni Ürünler', desc: 'En yeni atkı modelleri ve koleksiyonlarından ilk siz haberdar olun.', gradient: 'from-purple-500 to-pink-500' },
                  { icon: TrendingUp, title: 'Trend Haberleri', desc: 'Atkı dünyasındaki son trendler ve stil önerilerinden haberdar olun.', gradient: 'from-emerald-500 to-teal-500' }
                ].map((benefit, index) => {
                  const IconComponent = benefit.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      whileHover={{ y: -4 }}
                      className="text-center bg-white rounded-[24px] p-6 shadow-sm border border-slate-200"
                    >
                      <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${benefit.gradient} flex items-center justify-center mx-auto mb-4`}>
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-[#0F172A] mb-2 tracking-tight">{benefit.title}</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        {benefit.desc}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Content Examples */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-12 bg-gradient-to-br from-slate-50 to-slate-100 rounded-[24px] p-8 border border-slate-200"
            >
              <h2 className="text-2xl font-bold text-[#0F172A] mb-6 text-center tracking-tight">
                Newsletter İçeriği
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                {[
                  {
                    title: 'Haftalık İçerik',
                    items: [
                      'Yeni atkı modelleri ve koleksiyonları',
                      'Özel indirim kuponları',
                      'Stil önerileri ve kombinasyonlar',
                      'Müşteri yorumları ve deneyimleri'
                    ],
                    color: 'text-[#2563EB]'
                  },
                  {
                    title: 'Özel İçerikler',
                    items: [
                      'Sezonluk trend raporları',
                      'Atkı bakımı ve temizlik ipuçları',
                      'Kişiye özel tasarım süreçleri',
                      'Şirket haberleri ve gelişmeler'
                    ],
                    color: 'text-emerald-600'
                  }
                ].map((section, index) => (
                  <div key={index}>
                    <h3 className="text-lg font-semibold text-[#0F172A] mb-4 tracking-tight">{section.title}</h3>
                    <ul className="space-y-3">
                      {section.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start gap-3 text-slate-700">
                          <CheckCircle2 className={`w-5 h-5 ${section.color} flex-shrink-0 mt-0.5`} />
                          <span className="text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-12 text-center"
            >
              <p className="text-slate-600 mb-4">
                Newsletter ile ilgili sorularınız için bizimle iletişime geçin:
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:info@atkigetir.com"
                  className="text-[#2563EB] hover:text-[#1e40af] transition-colors inline-flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  <span>info@atkigetir.com</span>
                </a>
                <a
                  href="https://wa.me/905337498266"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-600 hover:text-emerald-700 transition-colors inline-flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>0533 749 82 66</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
