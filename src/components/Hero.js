import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Sparkles, MessageCircle, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

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
            className="relative mb-8 rounded-[24px] overflow-hidden h-[500px] md:h-[600px] shadow-2xl border-2 border-slate-800/20"
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
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('${bannerImages[currentSlide]}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
        </AnimatePresence>
        {/* Koyu Overlay */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full transition-all duration-300"
        aria-label="Önceki banner"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full transition-all duration-300"
        aria-label="Sonraki banner"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Slider Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
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
      <div className="relative z-10 h-full flex items-center justify-center px-6 md:px-10">
        <div className="max-w-4xl text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-block mb-6 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm font-semibold text-white/80"
          >
            <Sparkles className="w-4 h-4 inline-block mr-2" />
            25 Yıllık Güvenle Dokuyoruz
          </motion.div>
          
          {/* Başlık */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white/80 mb-6 leading-tight tracking-tight"
          >
            Firmanıza Özel Atkı ve Bere Üretimi
          </motion.h1>

          {/* Alt Başlık */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg md:text-xl text-white/70 mb-10 leading-relaxed max-w-2xl mx-auto"
          >
            Yüksek kalite, uygun fiyat ve hızlı teslimat avantajıyla hayalinizdeki tasarımı gerçeğe dönüştürüyoruz.
          </motion.p>

          {/* CTA Butonları */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              onClick={handleCall}
              whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)' }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#2563EB] to-[#1e40af] text-white px-8 py-4 rounded-full font-semibold hover:from-[#1e40af] hover:to-[#1e3a8a] transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] text-lg"
            >
              <Phone className="w-6 h-6" />
              <span>Hemen Ara</span>
            </motion.button>
            <motion.a
              href="https://wa.me/905337498266"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(34, 197, 94, 0.5)' }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#22C55E] to-[#16A34A] text-white px-8 py-4 rounded-full font-semibold hover:from-[#16A34A] hover:to-[#15803d] transition-all duration-300 shadow-lg hover:shadow-[0_0_25px_rgba(34,197,94,0.4)] text-lg group"
            >
              <MessageCircle className="w-6 h-6" />
              <span>WhatsApp'tan Yaz</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
