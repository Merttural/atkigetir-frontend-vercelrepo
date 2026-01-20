import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertCircle, MessageCircle, ArrowRight } from 'lucide-react';

export default function DisabledFeatureModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-[24px] shadow-2xl max-w-md w-full p-6 relative"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Icon */}
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-yellow-600" />
              </div>

              {/* Content */}
              <div className="text-center">
                <h2 className="text-2xl font-bold text-[#0F172A] mb-3">
                  Özellik Geçici Olarak Askıya Alındı
                </h2>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  Bu özellik şu anda aktif değildir. Ürünler hakkında bilgi almak ve sipariş vermek için 
                  WhatsApp veya telefon ile iletişime geçebilirsiniz.
                </p>

                {/* Actions */}
                <div className="flex flex-col gap-3">
                  <a
                    href="https://wa.me/905337498266"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-gradient-to-r from-[#22C55E] to-[#16A34A] text-white py-3 px-6 rounded-xl font-semibold hover:from-[#16A34A] hover:to-[#15803d] transition-all shadow-md hover:shadow-[0_0_25px_rgba(34,197,94,0.4)] text-center flex items-center justify-center gap-2 group"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>WhatsApp'tan İletişime Geç</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </a>
                  <button
                    onClick={onClose}
                    className="w-full bg-slate-100 text-slate-700 py-3 px-6 rounded-xl font-semibold hover:bg-slate-200 transition-colors"
                  >
                    Kapat
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
