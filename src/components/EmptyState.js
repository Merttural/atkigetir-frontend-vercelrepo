import Link from 'next/link';
import { motion } from 'framer-motion';
import { Package, Search, ShoppingBag, ArrowRight, MessageCircle } from 'lucide-react';

/**
 * Empty State Component - Boş durumlar için
 */
export default function EmptyState({ 
  type = 'products', 
  title, 
  description, 
  actionLabel, 
  actionHref,
  actionOnClick,
  icon: Icon = Package 
}) {
  const defaultConfigs = {
    products: {
      title: 'Ürün Bulunamadı',
      description: 'Aradığınız kriterlere uygun ürün bulunamadı. Filtreleri değiştirmeyi deneyin.',
      actionLabel: 'Tüm Ürünleri Gör',
      actionHref: '/urunler',
      icon: Search
    },
    cart: {
      title: 'Sepetiniz Boş',
      description: 'Henüz sepetinize ürün eklemediniz. Ürünleri keşfedin ve sepetinize ekleyin.',
      actionLabel: 'Ürünleri Keşfet',
      actionHref: '/urunler',
      icon: ShoppingBag
    },
    search: {
      title: 'Arama Sonucu Bulunamadı',
      description: 'Aradığınız kriterlere uygun sonuç bulunamadı. Farklı anahtar kelimeler deneyin.',
      actionLabel: 'Tüm Ürünleri Gör',
      actionHref: '/urunler',
      icon: Search
    },
    orders: {
      title: 'Henüz Siparişiniz Yok',
      description: 'Henüz hiç sipariş vermediniz. Ürünlerimizi keşfedin ve ilk siparişinizi verin.',
      actionLabel: 'Ürünleri Keşfet',
      actionHref: '/urunler',
      icon: ShoppingBag
    }
  };

  const config = defaultConfigs[type] || defaultConfigs.products;
  const finalTitle = title || config.title;
  const finalDescription = description || config.description;
  const finalActionLabel = actionLabel || config.actionLabel;
  const FinalIcon = Icon === Package ? config.icon : Icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-[24px] shadow-sm border border-slate-200 p-12 text-center"
    >
      <div className="w-20 h-20 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center mx-auto mb-6">
        <FinalIcon className="w-10 h-10 text-slate-400" />
      </div>
      
      <h3 className="text-xl font-semibold text-[#0F172A] mb-2 tracking-tight">
        {finalTitle}
      </h3>
      
      <p className="text-slate-500 mb-8 max-w-md mx-auto leading-relaxed">
        {finalDescription}
      </p>

      {actionHref && (
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            href={actionHref}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#2563EB] to-[#1e40af] text-white px-6 py-3 rounded-xl font-semibold hover:from-[#1e40af] hover:to-[#1e3a8a] transition-all shadow-md hover:shadow-lg group"
          >
            <ShoppingBag className="w-5 h-5" />
            <span>{finalActionLabel}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </motion.div>
      )}

      {actionOnClick && (
        <motion.button
          onClick={actionOnClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-[#2563EB] to-[#1e40af] text-white px-6 py-3 rounded-xl font-semibold hover:from-[#1e40af] hover:to-[#1e3a8a] transition-all shadow-md hover:shadow-lg group"
        >
          <ShoppingBag className="w-5 h-5" />
          <span>{finalActionLabel}</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
        </motion.button>
      )}

      {type === 'search' && (
        <div className="mt-6 pt-6 border-t border-slate-200">
          <motion.a
            href="https://wa.me/905337498266"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#22C55E] to-[#16A34A] text-white px-6 py-3 rounded-xl font-semibold hover:from-[#16A34A] hover:to-[#15803d] transition-all shadow-md hover:shadow-[0_0_25px_rgba(34,197,94,0.4)] group"
          >
            <MessageCircle className="w-5 h-5" />
            <span>WhatsApp'tan Sor</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </motion.a>
        </div>
      )}
    </motion.div>
  );
}
