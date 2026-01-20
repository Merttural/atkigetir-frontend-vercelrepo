import { MessageCircle, Phone, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { googleAds } from '@/lib/analytics';

export default function MiniBanner() {
  const whatsappNumber = '905337498266';
  const phoneNumber = '+90-533-749-82-66';

  const handleWhatsApp = () => {
    const message = 'Merhaba, özel üretim taraftar atkısı ve bayrak için toptan fiyat almak istiyorum.';
    
    // Google Ads conversion tracking
    googleAds.trackConversion();
    
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

  const handlePhone = () => {
    window.open(`tel:${phoneNumber.replace(/-/g, '')}`, '_self');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-[#2563EB] to-[#1e40af] rounded-[24px] p-6 mb-6 text-white shadow-md"
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex-1">
          <h2 className="text-xl font-bold mb-2">Özel üretim taraftar atkısı & bayrak</h2>
          <p className="text-blue-100 text-sm">
            Toptan fiyat için WhatsApp'tan yazın
          </p>
        </div>
        
        <div className="flex gap-3">
          <motion.button
            onClick={handleWhatsApp}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-[#2563EB] px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors shadow-md hover:shadow-lg flex items-center gap-2 group"
          >
            <MessageCircle className="w-5 h-5" />
            <span>WhatsApp'tan Yaz</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </motion.button>
          
          <motion.button
            onClick={handlePhone}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 px-6 py-3 rounded-xl font-semibold hover:bg-white/20 transition-colors flex items-center gap-2"
          >
            <Phone className="w-5 h-5" />
            <span>Telefonla Ara</span>
          </motion.button>
        </div>
      </div>

      {/* Güven Rozetleri */}
      <div className="mt-4 pt-4 border-t border-white/20 flex flex-wrap items-center gap-4 text-xs text-blue-100">
        <span>✓ Hızlı Teslimat</span>
        <span>✓ Yerli Üretim</span>
        <span>✓ Kaliteli Malzeme</span>
        <span>✓ Özel Tasarım</span>
      </div>
    </motion.div>
  );
}
