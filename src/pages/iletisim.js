import { useState } from "react";
import SEO from "@/components/SEO";
import Breadcrumbs from '@/components/Breadcrumbs';
import { MapPin, MessageCircle, Mail, Clock, Factory, Users, Send, ArrowRight, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { validateEmail, validatePhone, validateRequired, validateMinLength } from '@/utils/validation';

export default function IletisimPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = (name, value) => {
    let error = '';
    
    switch (name) {
      case 'name':
        if (!validateRequired(value)) {
          error = 'İsim zorunludur';
        } else if (!validateMinLength(value, 2)) {
          error = 'İsim en az 2 karakter olmalıdır';
        }
        break;
      case 'email':
        if (!validateRequired(value)) {
          error = 'E-posta zorunludur';
        } else if (!validateEmail(value)) {
          error = 'Geçerli bir e-posta adresi giriniz';
        }
        break;
      case 'phone':
        if (value && !validatePhone(value)) {
          error = 'Geçerli bir telefon numarası giriniz (örn: 0533 749 82 66)';
        }
        break;
      case 'subject':
        if (!validateRequired(value)) {
          error = 'Konu zorunludur';
        } else if (!validateMinLength(value, 3)) {
          error = 'Konu en az 3 karakter olmalıdır';
        }
        break;
      case 'message':
        if (!validateRequired(value)) {
          error = 'Mesaj zorunludur';
        } else if (!validateMinLength(value, 10)) {
          error = 'Mesaj en az 10 karakter olmalıdır';
        }
        break;
      default:
        break;
    }
    
    return error;
  };

  const handleChange = (name, value) => {
    setForm(prev => ({ ...prev, [name]: value }));
    
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (name) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, form[name]);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const validateForm = () => {
    const newErrors = {};
    const fieldsToValidate = ['name', 'email', 'subject', 'message'];
    
    fieldsToValidate.forEach(field => {
      const error = validateField(field, form[field]);
      if (error) newErrors[field] = error;
    });
    
    if (form.phone) {
      const phoneError = validateField('phone', form.phone);
      if (phoneError) newErrors.phone = phoneError;
    }
    
    setErrors(newErrors);
    setTouched({
      name: true,
      email: true,
      subject: true,
      message: true,
      phone: form.phone ? true : false
    });
    
    return Object.keys(newErrors).length === 0;
  };

  return (
    <>
      <SEO
        title="İletişim - Atkigetir | İstanbul Atkı Mağazası"
        description="Atkigetir iletişim bilgileri. İstanbul merkezli atkı mağazamızdan kaliteli ürünler sipariş edin. WhatsApp: 0533 749 82 66, Email: info@atkigetir.com"
        keywords="atkigetir iletişim, istanbul atkı mağazası, atkı siparişi, whatsapp atkı, atkı telefon, istanbul tekstil, atkı adres"
        url="/iletisim"
        type="contact"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": "Atkigetir İletişim",
          "description": "Atkigetir iletişim bilgileri ve adres",
          "mainEntity": {
            "@type": "LocalBusiness",
            "name": "Atkigetir",
            "telephone": "+90-533-749-82-66",
            "email": "info@atkigetir.com",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "İstanbul",
              "addressLocality": "İstanbul",
              "addressRegion": "İstanbul",
              "postalCode": "34000",
              "addressCountry": "TR"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "41.0082",
              "longitude": "28.9784"
            },
            "openingHours": [
              "Mo-Fr 09:00-18:00",
              "Sa 09:00-17:00"
            ]
          }
        }}
      />
      <div className="bg-[#F8FAFC] min-h-screen">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Breadcrumbs items={[
            { name: 'Anasayfa', href: '/' },
            { name: 'İletişim', href: '/iletisim' }
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
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-[#0F172A] mb-4 tracking-tighter">İletişim</h1>
              <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
                İstanbul merkezli atkı mağazamızdan kaliteli ürünler sipariş edin. WhatsApp ile hızlı iletişim!
              </p>
            </motion.div>

            <div className="flex flex-col lg:flex-row gap-8 mb-12">
              {/* Sol Taraf: Google Maps + Fiziksel Adres/Telefon */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="flex-1 space-y-6"
              >
                {/* Google Maps */}
                <div className="bg-white rounded-[24px] shadow-sm border border-slate-200 overflow-hidden">
                  <div className="h-64 md:h-80 relative">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6015.140182331654!2d28.981517331891332!3d41.078389040988654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab6ee3165ea0b%3A0x8043da0411809dec!2sATKI%20GET%C4%B0R!5e0!3m2!1str!2sus!4v1768862724310!5m2!1str!2sus"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="rounded-[24px]"
                      title="Atkigetir Konumu - İstanbul"
                      aria-label="Atkigetir şirket konumu haritası"
                    />
                  </div>
                </div>
                
                {/* Fiziksel Adres ve Telefon Bilgileri */}
                <div className="bg-white rounded-[24px] shadow-sm border border-slate-200 p-8">
                <h2 className="text-xl font-bold text-[#0F172A] mb-6 tracking-tight">İletişim Bilgileri</h2>
                <div className="space-y-6">
                  {[
                    { icon: MapPin, label: 'Adres', value: 'İstanbul, Türkiye', subValue: 'Türkiye geneli kargo', color: 'text-blue-500', bgColor: 'bg-blue-50' },
                    { icon: MessageCircle, label: 'WhatsApp', value: '0533 749 82 66', href: 'https://wa.me/905337498266?text=Merhabalar%20Kerim%20Bey%20Sipariş%20Vermek%20istiyorum.', color: 'text-[#22C55E]', bgColor: 'bg-emerald-50' },
                    { icon: Mail, label: 'E-posta', value: 'info@atkigetir.com', href: 'mailto:info@atkigetir.com', color: 'text-purple-500', bgColor: 'bg-purple-50' },
                    { icon: Clock, label: 'Çalışma Saatleri', value: 'Pazartesi - Cuma: 09:00 - 18:00', subValue: 'Cumartesi: 09:00 - 17:00 | Pazar: Kapalı', color: 'text-orange-500', bgColor: 'bg-orange-50' }
                  ].map((item, index) => {
                    const IconComponent = item.icon;
                    const content = (
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-xl ${item.bgColor} flex items-center justify-center flex-shrink-0`}>
                          <IconComponent className={`w-6 h-6 ${item.color}`} />
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-[#0F172A] mb-1">{item.label}</div>
                          {item.href ? (
                            <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined} className={`${item.color} hover:underline font-medium`}>
                              {item.value}
                            </a>
                          ) : (
                            <div className="text-slate-700">{item.value}</div>
                          )}
                          {item.subValue && (
                            <div className="text-sm text-slate-500 mt-1">{item.subValue}</div>
                          )}
                        </div>
                      </div>
                    );
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + index * 0.1 }}
                        whileHover={{ x: 4 }}
                      >
                        {content}
                      </motion.div>
                    );
                  })}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-slate-200">
                  <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl">
                    <div className="text-2xl font-bold text-[#2563EB] mb-1">3,000+</div>
                    <div className="text-xs text-slate-600 font-medium">Günlük Üretim</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
                    <div className="text-2xl font-bold text-purple-600 mb-1">25</div>
                    <div className="text-xs text-slate-600 font-medium">Yıllık Deneyim</div>
                  </div>
                </div>
                </div>
              </motion.div>

              {/* Contact Form Card */}
              {/* Sağ Taraf: Form */}
              <motion.form
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex-1 bg-white rounded-[24px] shadow-sm border border-slate-200 p-8 flex flex-col gap-4"
                onSubmit={async (e) => {
                  e.preventDefault();
                  
                  if (!validateForm()) {
                    return;
                  }
                  
                  setIsSubmitting(true);
                  
                  try {
                    // Form şu anda bakımda, WhatsApp'a yönlendir
                    // XSS koruması için encodeURIComponent kullanılıyor
                    const sanitizedMessage = `Merhaba, iletişim formundan mesaj gönderiyorum:\n\nİsim: ${form.name}\nE-posta: ${form.email}\n${form.company ? `Şirket: ${form.company}\n` : ''}${form.phone ? `Telefon: ${form.phone}\n` : ''}Konu: ${form.subject}\n\nMesaj: ${form.message}`;
                    
                    // Google Ads conversion tracking
                    googleAds.trackConversion();
                    
                    window.open(`https://wa.me/905337498266?text=${encodeURIComponent(sanitizedMessage)}`, '_blank', 'noopener,noreferrer');
                    
                    // Başarılı toast mesajı gösterme
                    if (typeof window !== 'undefined' && window.showToast) {
                      window.showToast('Mesajınız WhatsApp\'a yönlendirildi!', 'success', 3000);
                    }
                    
                    // Formu sıfırla
                    setForm({ name: '', email: '', company: '', phone: '', subject: '', message: '' });
                    setErrors({});
                    setTouched({});
                  } catch (error) {
                    console.error('Form submission error:', error);
                    if (typeof window !== 'undefined' && window.showToast) {
                      window.showToast('Bir hata oluştu. Lütfen tekrar deneyin.', 'error', 3000);
                    }
                  } finally {
                    setIsSubmitting(false);
                  }
                }}
              >
                <h2 className="text-xl font-bold text-[#0F172A] mb-2 tracking-tight">Mesaj Gönder</h2>
                
                {/* İsim */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-[#0F172A]">İsim *</label>
                  <input 
                    type="text" 
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 text-sm bg-white transition-all ${
                      errors.name ? 'border-red-300 focus:border-red-500' : 'border-slate-300 focus:border-[#2563EB]'
                    }`}
                    value={form.name} 
                    onChange={e => handleChange('name', e.target.value)}
                    onBlur={() => handleBlur('name')}
                    required 
                  />
                  {errors.name && touched.name && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.name}
                    </p>
                  )}
                </div>
                
                {/* E-posta */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-[#0F172A]">E-posta *</label>
                  <input 
                    type="email" 
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 text-sm bg-white transition-all ${
                      errors.email ? 'border-red-300 focus:border-red-500' : 'border-slate-300 focus:border-[#2563EB]'
                    }`}
                    value={form.email} 
                    onChange={e => handleChange('email', e.target.value)}
                    onBlur={() => handleBlur('email')}
                    required 
                  />
                  {errors.email && touched.email && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.email}
                    </p>
                  )}
                </div>
                
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <label className="block mb-2 text-sm font-medium text-[#0F172A]">Şirket Adı</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] text-sm bg-white transition-all" 
                      value={form.company} 
                      onChange={e => handleChange('company', e.target.value)}
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block mb-2 text-sm font-medium text-[#0F172A]">Telefon</label>
                    <input 
                      type="tel" 
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 text-sm bg-white transition-all ${
                        errors.phone ? 'border-red-300 focus:border-red-500' : 'border-slate-300 focus:border-[#2563EB]'
                      }`}
                      value={form.phone} 
                      onChange={e => handleChange('phone', e.target.value)}
                      onBlur={() => handleBlur('phone')}
                      placeholder="0533 749 82 66"
                    />
                    {errors.phone && touched.phone && (
                      <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>
                
                <div>
                  <label className="block mb-2 text-sm font-medium text-[#0F172A]">Konu *</label>
                  <select 
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 text-sm bg-white transition-all ${
                      errors.subject ? 'border-red-300 focus:border-red-500' : 'border-slate-300 focus:border-[#2563EB]'
                    }`}
                    value={form.subject} 
                    onChange={e => handleChange('subject', e.target.value)}
                    onBlur={() => handleBlur('subject')}
                    required
                  >
                    <option value="">Konu seçin</option>
                    <option value="Teklif">Teklif</option>
                    <option value="Sipariş">Sipariş</option>
                    <option value="Destek">Destek</option>
                    <option value="Diğer">Diğer</option>
                  </select>
                  {errors.subject && touched.subject && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.subject}
                    </p>
                  )}
                </div>
                
                <div>
                  <label className="block mb-2 text-sm font-medium text-[#0F172A]">Mesaj *</label>
                  <textarea 
                    rows={4} 
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 text-sm bg-white resize-none transition-all ${
                      errors.message ? 'border-red-300 focus:border-red-500' : 'border-slate-300 focus:border-[#2563EB]'
                    }`}
                    value={form.message} 
                    onChange={e => handleChange('message', e.target.value)}
                    onBlur={() => handleBlur('message')}
                    required 
                  />
                  {errors.message && touched.message && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.message}
                    </p>
                  )}
                </div>
                
                <motion.button 
                  type="submit" 
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  className="bg-gradient-to-r from-[#2563EB] to-[#1e40af] text-white py-3 px-6 rounded-xl font-semibold hover:from-[#1e40af] hover:to-[#1e3a8a] transition-all shadow-sm hover:shadow-md active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Gönderiliyor...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Mesaj Gönder</span>
                    </>
                  )}
                </motion.button>
              </motion.form>
            </div>

          {/* Map Section - Google Maps Embed */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-[#0F172A] text-center mb-6 tracking-tight">Konumumuz</h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-[24px] shadow-sm border border-slate-200 overflow-hidden"
            >
              {/* Google Maps Embed */}
              <div className="w-full h-96 relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6015.140182331654!2d28.981517331891332!3d41.078389040988654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab6ee3165ea0b%3A0x8043da0411809dec!2sATKI%20GET%C4%B0R!5e0!3m2!1str!2sus!4v1768862724310!5m2!1str!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-[24px]"
                  title="Atkigetir Konumu - İstanbul"
                  aria-label="Atkigetir şirket konumu haritası"
                />
              </div>
              <div className="p-6 border-t border-slate-200">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2563EB] to-[#1e40af] flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#0F172A]">İstanbul, Türkiye</p>
                      <p className="text-sm text-slate-500">Türkiye geneli kargo</p>
                    </div>
                  </div>
                  <motion.a
                    href="https://www.google.com/maps/search/İstanbul,+Türkiye"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-[#2563EB] to-[#1e40af] text-white px-6 py-2.5 rounded-xl hover:from-[#1e40af] hover:to-[#1e3a8a] transition-all shadow-sm hover:shadow-md inline-flex items-center gap-2 font-medium text-sm"
                  >
                    <MapPin className="w-4 h-4" />
                    <span>Google Maps'te Aç</span>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Local SEO Content */}
          <div className="bg-white rounded-[24px] shadow-sm border border-slate-200 p-8">
            <h2 className="text-2xl font-bold text-[#0F172A] text-center mb-8 tracking-tight">İstanbul'da Atkı Siparişi</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: 'Neden Atkigetir?',
                  items: [
                    { text: 'İstanbul merkezli hızlı teslimat', icon: Factory },
                    { text: 'Kaliteli malzeme ve işçilik', icon: Users },
                    { text: 'Kişiye özel tasarım hizmeti', icon: Users },
                    { text: 'Uygun fiyat garantisi', icon: Factory }
                  ]
                },
                {
                  title: 'Hizmet Verdiğimiz Bölgeler',
                  items: [
                    { text: 'İstanbul ve çevre iller', icon: MapPin },
                    { text: 'Türkiye geneli kargo', icon: MapPin },
                    { text: 'Hızlı şehir içi teslimat', icon: MapPin },
                    { text: 'Online sipariş sistemi', icon: MessageCircle }
                  ]
                }
              ].map((section, sectionIndex) => (
                <motion.div
                  key={sectionIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + sectionIndex * 0.1 }}
                >
                  <h3 className="text-xl font-semibold text-[#0F172A] mb-4 tracking-tight">{section.title}</h3>
                  <ul className="space-y-3">
                    {section.items.map((item, itemIndex) => {
                      const IconComponent = item.icon;
                      return (
                        <motion.li
                          key={itemIndex}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + sectionIndex * 0.1 + itemIndex * 0.05 }}
                          className="flex items-start gap-3 text-slate-700"
                        >
                          <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#2563EB]/10 to-[#1e40af]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <IconComponent className="w-4 h-4 text-[#2563EB]" />
                          </div>
                          <span>{item.text}</span>
                        </motion.li>
                      );
                    })}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
          </motion.div>
        </div>
      </div>
    </>
  );
} 