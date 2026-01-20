import { useState } from 'react';
import { X, Sparkles, ArrowRight, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

/**
 * Reklam Banner Komponenti
 * Sayfa üstünde veya yan tarafta gösterilebilen dikkat çekici reklam alanı
 */
export default function AdBanner({ 
  position = 'top', // 'top' | 'sidebar' | 'inline'
  variant = 'promotion', // 'promotion' | 'sale' | 'newsletter'
  dismissible = true 
}) {
  const [isVisible, setIsVisible] = useState(true);

  // Farklı reklam varyantları için içerik
  const adVariants = {
    promotion: {
      title: '🎉 Özel Fırsat',
      subtitle: 'İlk Siparişinizde %15 İndirim!',
      description: 'Taraftar atkı ve bayrak koleksiyonunuz için özel indirimden faydalanın.',
      cta: 'Hemen İncele',
      link: '/urunler',
      bgGradient: 'from-[#EF4444] via-[#F59E0B] to-[#EF4444]',
      textColor: 'text-white',
    },
    sale: {
      title: '🔥 Fırsat Geçmesin',
      subtitle: 'Toptan Alımlarda Ekstra %20 İndirim',
      description: 'Toplu siparişlerinizde daha avantajlı fiyatlar sizi bekliyor.',
      cta: 'Teklif Al',
      link: '/iletisim',
      bgGradient: 'from-[#2563EB] via-[#1E40AF] to-[#2563EB]',
      textColor: 'text-white',
    },
    newsletter: {
      title: '📧 E-Bülten',
      subtitle: 'Yeni Ürünlerden İlk Siz Haberdar Olun',
      description: 'Kampanyalar ve yeni ürünlerden haberdar olmak için e-bültene kaydolun.',
      cta: 'Kayıt Ol',
      link: '/newsletter',
      bgGradient: 'from-[#22C55E] via-[#16A34A] to-[#22C55E]',
      textColor: 'text-white',
    }
  };

  const ad = adVariants[variant];

  if (!isVisible) return null;

  // Sidebar reklam
  if (position === 'sidebar') {
    return (
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="sticky top-24 mb-6"
          >
            <div className={`bg-gradient-to-br ${ad.bgGradient} rounded-2xl p-6 shadow-xl border-2 border-white/20 relative overflow-hidden`}>
              {/* Dekoratif Elementler */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12" />
              
              {/* İçerik */}
              <div className={`relative z-10 ${ad.textColor}`}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Tag className="w-5 h-5" />
                    <h3 className="font-bold text-lg">{ad.title}</h3>
                  </div>
                  {dismissible && (
                    <button
                      onClick={() => setIsVisible(false)}
                      className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
                
                <h4 className="font-semibold text-base mb-2">{ad.subtitle}</h4>
                <p className="text-sm opacity-90 mb-4 leading-relaxed">{ad.description}</p>
                
                <Link href={ad.link}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-full bg-white ${ad.textColor} py-2.5 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all`}
                  >
                    <span>{ad.cta}</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </Link>
              </div>

              {/* Parlama Efekti */}
              <motion.div
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'linear'
                }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent bg-[length:200%_100%] pointer-events-none"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  // Top veya Inline reklam
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`w-full mb-6 ${position === 'top' ? 'sticky top-20 z-40' : ''}`}
        >
          <div className={`bg-gradient-to-r ${ad.bgGradient} rounded-2xl p-4 md:p-6 shadow-xl border-2 border-white/20 relative overflow-hidden`}>
            {/* Dekoratif Elementler */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-16 -mb-16" />
            <Sparkles className="absolute top-4 right-4 w-8 h-8 text-white/30" />
            
            {/* İçerik */}
            <div className={`relative z-10 ${ad.textColor} flex flex-col md:flex-row items-start md:items-center justify-between gap-4`}>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Tag className="w-5 h-5" />
                  <h3 className="font-bold text-lg md:text-xl">{ad.title}</h3>
                </div>
                <h4 className="font-semibold text-base md:text-lg mb-1">{ad.subtitle}</h4>
                <p className="text-sm md:text-base opacity-90">{ad.description}</p>
              </div>
              
              <div className="flex items-center gap-3">
                <Link href={ad.link}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`bg-white ${ad.textColor.replace('text-white', 'text-[#EF4444]')} py-2.5 px-6 rounded-xl font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl transition-all whitespace-nowrap`}
                  >
                    <span>{ad.cta}</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </Link>
                {dismissible && (
                  <button
                    onClick={() => setIsVisible(false)}
                    className={`p-2 hover:bg-white/20 rounded-lg transition-colors ${ad.textColor}`}
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>

            {/* Parlama Efekti */}
            <motion.div
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear'
              }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent bg-[length:200%_100%] pointer-events-none"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
