import { motion } from 'framer-motion';
import { MessageCircle, Download, Phone, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { googleAds } from '@/lib/analytics';

/**
 * Global CTA Bandı
 * Footer öncesi tüm sayfalarda gösterilecek call-to-action alanı
 */
export default function GlobalCTABand() {
  const whatsappNumber = '905337498266';
  const phoneNumber = '+90-533-749-82-66';

  const handleWhatsApp = () => {
    // Google Ads conversion tracking
    googleAds.trackConversion();
    window.open(`https://wa.me/${whatsappNumber}`, '_blank', 'noopener,noreferrer');
  };

  const handlePhone = () => {
    window.open(`tel:${phoneNumber.replace(/-/g, '')}`, '_self');
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-[#0F172A] via-[#1e293b] to-[#0F172A] text-white py-12 md:py-16 mb-0"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Sol: Başlık */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex-1 text-center md:text-left"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-2 tracking-tight">
              Projenizi Birlikte Hayata Geçirelim
            </h2>
            <p className="text-slate-300 text-sm md:text-base">
              25 yıllık deneyimimizle hayalinizdeki tasarımı gerçeğe dönüştürüyoruz.
            </p>
          </motion.div>

          {/* Sağ: Butonlar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3 w-full md:w-auto"
          >
            {/* Fiyat Teklifi Al - Yeşil */}
            <motion.button
              onClick={handleWhatsApp}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 md:flex-initial bg-gradient-to-r from-[#22C55E] to-[#16A34A] hover:from-[#16A34A] hover:to-[#15803d] text-white px-6 py-3.5 rounded-xl font-semibold transition-all shadow-lg hover:shadow-[0_0_25px_rgba(34,197,94,0.4)] flex items-center justify-center gap-2 group"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Fiyat Teklifi Al</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </motion.button>

            {/* Katalog İndir - Outline White */}
            <motion.button
              onClick={handlePhone}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 md:flex-initial bg-transparent border-2 border-white/30 hover:border-white text-white px-6 py-3.5 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 hover:bg-white/10"
            >
              <Phone className="w-5 h-5" />
              <span>Hemen Ara</span>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
