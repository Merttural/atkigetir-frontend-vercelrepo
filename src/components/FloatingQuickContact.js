import { useState, useEffect } from 'react';
import { MessageCircle, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { googleAds } from '@/lib/analytics';

/**
 * Floating Quick Contact Buttons
 * Mobilde sağ altta yüzen WhatsApp ve telefon butonları
 */
export default function FloatingQuickContact() {
  const [isVisible, setIsVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  
  const whatsappNumber = '905337498266';
  const phoneNumber = '+90-533-749-82-66';

  useEffect(() => {
    // SSR-safe: Client-side'da kontrol et
    if (typeof window !== 'undefined') {
      setIsMobile(window.innerWidth < 768);
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
      };
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const handleWhatsApp = () => {
    if (typeof window !== 'undefined') {
      // Google Ads conversion tracking
      googleAds.trackConversion();
      window.open(`https://wa.me/${whatsappNumber}`, '_blank', 'noopener,noreferrer');
    }
  };

  const handlePhone = () => {
    if (typeof window !== 'undefined') {
      window.open(`tel:${phoneNumber.replace(/-/g, '')}`, '_self');
    }
  };

  // Sadece mobilde göster
  if (!isMobile) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-20 right-4 z-40 flex flex-col gap-3 md:hidden"
        >
          {/* Telefon Butonu */}
          <motion.button
            onClick={handlePhone}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-14 h-14 bg-gradient-to-br from-[#2563EB] to-[#1e40af] text-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all"
            aria-label="Telefonla ara"
          >
            <Phone className="w-6 h-6" />
          </motion.button>

          {/* WhatsApp Butonu */}
          <motion.button
            onClick={handleWhatsApp}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-14 h-14 bg-gradient-to-br from-[#22C55E] to-[#16A34A] text-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all"
            aria-label="WhatsApp'tan yaz"
          >
            <MessageCircle className="w-6 h-6" />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
