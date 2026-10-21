import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Sparkles, MessageCircle, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { LICENSE_NOTICE } from '@/utils/licenseNotice';

/**
 * Hero Section - Giriş Alanı
 * Ürün listesinin hemen üzerinde, sitenin amacını anlatan hero alanı
 * Banner görselleri slider olarak gösteriliyor
 */
export default function Hero() {
  const phoneNumber = '+90-533-749-82-66';
  const [currentSlide, setCurrentSlide] = useState(0);

  // Banner görselleri listesi
  const bannerImages = [
    '/images/bannergörsel2.jpg',
    '/images/bannergörsel3.jpg',
    '/images/bannergörsel4.jpg',
    '/images/bannergörsel5.jpg'
  ];

  // Otomatik geçiş (5 saniyede bir)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [bannerImages.length]);

  const handleCall = () => {
    window.open(`tel:${phoneNumber.replace(/-/g, '')}`, '_self');
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + bannerImages.length) % bannerImages.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative mb-6 sm:mb-8 rounded-2xl sm:rounded-[24px] overflow-hidden h-[clamp(320px,92vw,440px)] sm:h-[380px] md:h-[440px] lg:h-[500px] xl:h-[560px] shadow-xl sm:shadow-2xl border border-slate-200/90 ring-1 ring-slate-900/5"
    >
      {/* Banner Slider */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-cover bg-[center_22%] sm:bg-center"
            style={{
              backgroundImage: `url('${bannerImages[currentSlide]}')`,
              backgroundSize: 'cover',
            }}
          />
        </AnimatePresence>
        {/* Overlay — mobilde biraz daha açık kalsın ki görsel seçilsin */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/40 to-black/60 sm:from-black/60 sm:via-black/45 sm:to-black/65" />
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        type="button"
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 p-1.5 sm:p-2 bg-white/25 hover:bg-white/35 backdrop-blur-sm rounded-full transition-all duration-300 shadow-sm"
        aria-label="Önceki banner"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
      </button>
      <button
        onClick={goToNext}
        type="button"
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 p-1.5 sm:p-2 bg-white/25 hover:bg-white/35 backdrop-blur-sm rounded-full transition-all duration-300 shadow-sm"
        aria-label="Sonraki banner"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
      </button>

      {/* Slider Indicators */}
      <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-1.5 sm:gap-2">
        {bannerImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              currentSlide === index
                ? 'w-8 bg-white'
                : 'w-2 bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Banner ${index + 1}'e git`}
          />
        ))}
      </div>
      
      {/* İçerik */}
      <div className="relative z-10 h-full flex items-center justify-center px-3 py-5 pb-12 sm:px-6 sm:py-8 sm:pb-8 md:px-10 min-h-0">
        <div className="max-w-4xl text-center w-full">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center mb-2 sm:mb-5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/12 backdrop-blur-sm border border-white/25 text-xs sm:text-sm font-semibold text-white"
          >
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 inline-block mr-1.5 sm:mr-2 shrink-0" />
            25 Yıllık Güvenle Dokuyoruz
          </motion.div>
          
          {/* Başlık */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-[1.45rem] leading-snug sm:text-4xl md:text-5xl lg:text-6xl xl:text-6xl font-bold text-white mb-2 sm:mb-4 tracking-tight px-1"
          >
            Firmanıza Özel Atkı ve Bere Üretimi
          </motion.h1>

          {/* Alt Başlık */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xs sm:text-base md:text-lg text-white/85 mb-2 sm:mb-4 leading-relaxed max-w-2xl mx-auto px-1"
          >
            Yüksek kalite, uygun fiyat ve hızlı teslimat avantajıyla hayalinizdeki tasarımı gerçeğe dönüştürüyoruz.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.6 }}
            className="text-[11px] sm:text-sm text-white leading-snug mb-3 sm:mb-5 max-w-3xl mx-auto px-3 py-1.5 rounded-xl bg-black/45"
          >
            {LICENSE_NOTICE}
          </motion.p>

          {/* CTA Butonları */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-2.5 sm:gap-4 justify-center items-stretch sm:items-center max-w-md sm:max-w-none mx-auto"
          >
            <motion.button
              type="button"
              onClick={handleCall}
              whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)' }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#2563EB] to-[#1e40af] text-white px-5 py-3 sm:px-8 sm:py-4 rounded-full font-semibold hover:from-[#1e40af] hover:to-[#1e3a8a] transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] text-sm sm:text-lg w-full sm:w-auto shrink-0"
            >
              <Phone className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
              <span>Hemen Ara</span>
            </motion.button>
            <motion.a
              href="https://wa.me/905337498266"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(34, 197, 94, 0.5)' }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#22C55E] to-[#16A34A] text-white px-5 py-3 sm:px-8 sm:py-4 rounded-full font-semibold hover:from-[#16A34A] hover:to-[#15803d] transition-all duration-300 shadow-lg hover:shadow-[0_0_25px_rgba(34,197,94,0.4)] text-sm sm:text-lg group w-full sm:w-auto shrink-0 relative z-10"
            >
              <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
              <span>WhatsApp'tan Yaz</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300 shrink-0" />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
