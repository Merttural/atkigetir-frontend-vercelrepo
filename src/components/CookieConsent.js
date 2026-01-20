import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X, CheckCircle } from 'lucide-react';

/**
 * Cookie Consent Component
 * KVKK uyumlu cookie onayı için
 * Kullanıcı izin vermeden analytics scriptleri çalışmaz
 */
export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    // SSR-safe localStorage kontrolü
    if (typeof window === 'undefined') return;
    
    // LocalStorage'dan cookie consent durumunu kontrol et
    const consent = localStorage.getItem('cookie_consent');
    
    // Eğer daha önce onay verilmemişse göster
    if (!consent) {
      // Kullanıcı sayfayı yükledikten 1 saniye sonra göster
      const timer = setTimeout(() => {
        setShowConsent(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('cookie_consent', 'true');
    setShowConsent(false);
    
    // Sayfayı yenile ki analytics scriptleri yüklensin
    window.location.reload();
  };

  const handleReject = () => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('cookie_consent', 'false');
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <AnimatePresence>
      {showConsent && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 shadow-2xl p-4 md:p-6"
        >
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="flex items-start gap-3 flex-1">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <Cookie className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-[#0F172A] mb-1">
                  Çerez Kullanımı
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Bu web sitesi, size en iyi deneyimi sunmak için çerezler kullanmaktadır. 
                  Google Analytics ve Meta Pixel gibi analitik araçlar kullanıyoruz. 
                  Devam ederek çerez kullanımını kabul etmiş olursunuz.{' '}
                  <a 
                    href="/cerez-politikasi" 
                    className="text-[#2563EB] hover:underline font-medium"
                  >
                    Çerez Politikası
                  </a>
                  ,{' '}
                  <a 
                    href="/gizlilik" 
                    className="text-[#2563EB] hover:underline font-medium"
                  >
                    Gizlilik Politikası
                  </a>
                  {' '}ve{' '}
                  <a 
                    href="/kvkk" 
                    className="text-[#2563EB] hover:underline font-medium"
                  >
                    KVKK Aydınlatma Metni
                  </a>
                  'ni okuyabilirsiniz.
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 w-full md:w-auto">
              <motion.button
                onClick={handleReject}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors"
              >
                Reddet
              </motion.button>
              <motion.button
                onClick={handleAccept}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-gradient-to-r from-[#2563EB] to-[#1e40af] text-white rounded-xl font-semibold text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Kabul Et</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
