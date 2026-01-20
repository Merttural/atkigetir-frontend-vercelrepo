import Link from 'next/link';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw, Home, ArrowLeft, MessageCircle } from 'lucide-react';

/**
 * Error State Component - Hata durumları için
 */
export default function ErrorState({ 
  type = 'generic', 
  title, 
  message, 
  error,
  onRetry,
  showHomeButton = true,
  showBackButton = false,
  showWhatsApp = false
}) {
  const defaultConfigs = {
    generic: {
      title: 'Bir Hata Oluştu',
      message: 'Üzgünüz, bir şeyler ters gitti. Lütfen tekrar deneyin.',
      icon: AlertTriangle
    },
    network: {
      title: 'Bağlantı Hatası',
      message: 'İnternet bağlantınızı kontrol edin ve tekrar deneyin.',
      icon: AlertTriangle
    },
    notFound: {
      title: 'Sayfa Bulunamadı',
      message: 'Aradığınız sayfa mevcut değil veya taşınmış olabilir.',
      icon: AlertTriangle
    },
    server: {
      title: 'Sunucu Hatası',
      message: 'Sunucuda bir sorun oluştu. Lütfen daha sonra tekrar deneyin.',
      icon: AlertTriangle
    },
    products: {
      title: 'Ürünler Yüklenemedi',
      message: 'Ürünler yüklenirken bir hata oluştu. Lütfen sayfayı yenileyin.',
      icon: AlertTriangle
    }
  };

  const config = defaultConfigs[type] || defaultConfigs.generic;
  const finalTitle = title || config.title;
  const finalMessage = message || config.message;
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-[24px] shadow-sm border border-red-200 p-12 text-center"
    >
      <div className="w-20 h-20 bg-gradient-to-br from-red-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <Icon className="w-10 h-10 text-red-500" />
      </div>
      
      <h3 className="text-xl font-semibold text-[#0F172A] mb-2 tracking-tight">
        {finalTitle}
      </h3>
      
      <p className="text-slate-500 mb-4 max-w-md mx-auto leading-relaxed">
        {finalMessage}
      </p>

      {error && (
        <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg text-left max-w-md mx-auto">
          <p className="text-xs text-red-700 font-mono break-all">
            {typeof error === 'string' ? error : error.message || 'Bilinmeyen hata'}
          </p>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
        {onRetry && (
          <motion.button
            onClick={onRetry}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#2563EB] to-[#1e40af] text-white px-6 py-3 rounded-xl font-semibold hover:from-[#1e40af] hover:to-[#1e3a8a] transition-all shadow-md hover:shadow-lg"
          >
            <RefreshCw className="w-5 h-5" />
            <span>Tekrar Dene</span>
          </motion.button>
        )}

        {showBackButton && (
          <motion.button
            onClick={() => window.history.back()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 bg-slate-100 text-slate-700 px-6 py-3 rounded-xl font-semibold hover:bg-slate-200 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Geri Dön</span>
          </motion.button>
        )}

        {showHomeButton && (
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-slate-100 text-slate-700 px-6 py-3 rounded-xl font-semibold hover:bg-slate-200 transition-all"
            >
              <Home className="w-5 h-5" />
              <span>Ana Sayfa</span>
            </Link>
          </motion.div>
        )}

        {showWhatsApp && (
          <motion.a
            href="https://wa.me/905337498266"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#22C55E] to-[#16A34A] text-white px-6 py-3 rounded-xl font-semibold hover:from-[#16A34A] hover:to-[#15803d] transition-all shadow-md hover:shadow-[0_0_25px_rgba(34,197,94,0.4)]"
          >
            <MessageCircle className="w-5 h-5" />
            <span>WhatsApp Destek</span>
          </motion.a>
        )}
      </div>
    </motion.div>
  );
}
