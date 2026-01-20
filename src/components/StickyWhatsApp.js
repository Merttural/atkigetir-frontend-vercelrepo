import { useState } from 'react';
import { MessageCircle, Phone, User, ArrowRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { googleAds } from '@/lib/analytics';

export default function StickyWhatsApp() {
  const [isMinimized, setIsMinimized] = useState(false); // Varsayılan olarak açık
  const [customMessage, setCustomMessage] = useState('');

  const whatsappNumber = '905337498266';
  const phoneNumber = '+90-533-749-82-66';

  // Hazır mesaj seçenekleri - Güncellendi
  const quickMessages = [
    { id: 1, text: 'Toptan fiyat istiyorum.' },
    { id: 2, text: 'Özel üretim var mı?' },
    { id: 3, text: 'Fiyat teklifi almak istiyorum.' },
    { id: 4, text: 'Sipariş vermek istiyorum.' },
  ];

  // Varsayılan mesaj
  const defaultMessage = 'Merhaba, ürünleriniz hakkında bilgi almak istiyorum.';

  const handleWhatsApp = () => {
    // Mesaj yazılmışsa onu kullan, yoksa varsayılan mesajı gönder
    const finalMessage = customMessage.trim() || defaultMessage;
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(finalMessage)}`, '_blank');
  };

  const handlePhone = () => {
    window.open(`tel:${phoneNumber.replace(/-/g, '')}`, '_self');
  };

  return (
    <>
      {/* Floating Button - Minimize edildiğinde göster */}
      {isMinimized && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsMinimized(false)}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-r from-[#22C55E] to-[#16A34A] text-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all"
          aria-label="Müşteri temsilcisi widget'ını aç"
        >
          <MessageCircle className="w-6 h-6" />
        </motion.button>
      )}

      {/* Widget Panel - Açık olduğunda göster */}
      <AnimatePresence>
        {!isMinimized && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 w-80 bg-white rounded-[24px] shadow-2xl border border-slate-200 overflow-hidden"
          >
            {/* Header - Avatar ve Response Time ile */}
            <div className="bg-[#0F172A] p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  {/* Müşteri Temsilcisi Avatar */}
                  <div className="w-10 h-10 bg-gradient-to-br from-[#22C55E] to-[#16A34A] rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">Müşteri Temsilcisi</div>
                    <div className="text-slate-400 text-xs flex items-center gap-1">
                      <span className="w-2 h-2 bg-[#22C55E] rounded-full animate-pulse"></span>
                      <span>Genellikle 5 dakika içinde döneriz</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setIsMinimized(true)}
                  className="p-1 hover:bg-white/10 rounded-lg transition-colors text-white"
                  aria-label="Widget'ı kapat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-3">
              {/* Mesaj Yazma Alanı - WhatsApp Görünümü */}
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-2">
                  WhatsApp Mesajınız
                </label>
                <motion.div 
                  className="relative"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    x: [0, -2, 2, -2, 2, 0]
                  }}
                  transition={{
                    x: {
                      duration: 0.6,
                      repeat: 2,
                      repeatDelay: 0.5,
                      ease: "easeInOut"
                    },
                    opacity: { duration: 0.3 },
                    scale: { duration: 0.3 }
                  }}
                >
                  {/* WhatsApp Arka Plan Pattern */}
                  <div 
                    className="rounded-2xl rounded-tl-none p-3 shadow-sm border border-[#25D366]/20 relative overflow-hidden"
                    style={{
                      background: '#ECE5DD',
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grid' width='20' height='20' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 20 0 L 0 0 0 20' fill='none' stroke='%23F5F5F0' stroke-width='1' opacity='0.3'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100' height='100' fill='url(%23grid)' /%3E%3C/svg%3E")`
                    }}
                  >
                    {/* Mesaj Balonu */}
                    <div className="bg-[#DCF8C6] rounded-2xl rounded-tl-none p-3 relative">
                      <textarea
                        value={customMessage}
                        onChange={(e) => setCustomMessage(e.target.value)}
                        placeholder="Mesajınızı buraya yazın (isteğe bağlı)..."
                        rows={4}
                        className="w-full bg-transparent text-sm text-slate-800 placeholder:text-slate-500 focus:outline-none resize-none relative z-10"
                        style={{ 
                          minHeight: '80px',
                          fontFamily: 'inherit'
                        }}
                      />
                      {!customMessage && (
                        <div className="absolute bottom-3 right-3 text-xs text-slate-400 flex items-center gap-1 z-10">
                          <MessageCircle className="w-3 h-3" />
                          <span>WhatsApp</span>
                        </div>
                      )}
                      {/* WhatsApp Ok İşareti */}
                      <div className="absolute -left-2 bottom-3 z-0">
                        <svg width="8" height="13" viewBox="0 0 8 13" fill="none">
                          <path d="M0 0L8 6.5L0 13V0Z" fill="#DCF8C6"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </motion.div>
                <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
                  <MessageCircle className="w-3 h-3 text-[#25D366]" />
                  <span>Mesaj yazmazsanız varsayılan mesaj gönderilecek</span>
                </p>
              </div>

              {/* Hazır Mesaj Seçenekleri - Direkt WhatsApp'a gönder */}
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-3">
                  Hızlı Mesajlar
                </label>
                <div className="space-y-2">
                  {quickMessages.map((msg) => (
                    <motion.button
                      key={msg.id}
                      onClick={() => {
                        googleAds.trackConversion();
                        window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg.text)}`, '_blank', 'noopener,noreferrer');
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full text-left px-4 py-2.5 text-sm bg-white hover:bg-[#22C55E]/5 border border-slate-200 hover:border-[#22C55E] rounded-lg transition-all text-slate-700 hover:text-[#22C55E] font-medium"
                    >
                      {msg.text}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* WhatsApp Button - Her zaman aktif, mesaj yazılmasa bile varsayılan mesaj gönderir */}
              <motion.button
                onClick={handleWhatsApp}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-[#22C55E] to-[#16A34A] text-white py-3 px-4 rounded-xl font-semibold hover:from-[#16A34A] hover:to-[#15803d] transition-all shadow-md hover:shadow-[0_0_25px_rgba(34,197,94,0.4)] flex items-center justify-center gap-2 group"
                aria-label="WhatsApp'a gönder"
              >
                <MessageCircle className="w-5 h-5" />
                <span>WhatsApp'a Gönder</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </motion.button>

              {/* Phone Button */}
              <motion.button
                onClick={handlePhone}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-slate-100 text-slate-700 py-3 px-4 rounded-xl font-semibold hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" />
                <span>Telefonla Ara</span>
              </motion.button>

              {/* Quick Message */}
              <div className="pt-2 border-t border-slate-200">
                <p className="text-xs text-slate-500 text-center">
                  Hızlı teklif almak için WhatsApp'tan yazın!
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
