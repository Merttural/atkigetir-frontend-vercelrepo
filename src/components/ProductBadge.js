import { motion } from 'framer-motion';
import { TrendingUp, Sparkles, Package, Award } from 'lucide-react';

/**
 * Product Badge Component
 * Dinamik ürün rozetleri
 */

// Badge tipleri ve stilleri
const badgeConfig = {
  'best_seller': {
    label: 'En Çok Satan',
    icon: TrendingUp,
    bgColor: 'bg-gradient-to-r from-yellow-400 to-orange-500',
    textColor: 'text-white',
    borderColor: 'border-yellow-400'
  },
  'new': {
    label: 'Yeni',
    icon: Sparkles,
    bgColor: 'bg-gradient-to-r from-emerald-400 to-teal-500',
    textColor: 'text-white',
    borderColor: 'border-emerald-400'
  },
  'wholesale': {
    label: 'Toptan',
    icon: Package,
    bgColor: 'bg-gradient-to-r from-blue-400 to-indigo-500',
    textColor: 'text-white',
    borderColor: 'border-blue-400'
  },
  'premium': {
    label: '%100 Akrilik',
    icon: Award,
    bgColor: 'bg-gradient-to-r from-purple-400 to-pink-500',
    textColor: 'text-white',
    borderColor: 'border-purple-400'
  }
};

export default function ProductBadge({ badgeType, position = 'top-left' }) {
  if (!badgeType || !badgeConfig[badgeType]) return null;

  const config = badgeConfig[badgeType];
  const IconComponent = config.icon;

  // Pozisyon sınıfları
  const positionClasses = {
    'top-left': 'top-3 left-3',
    'top-right': 'top-3 right-3',
    'bottom-left': 'bottom-3 left-3',
    'bottom-right': 'bottom-3 right-3'
  };

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 200 }}
      className={`absolute ${positionClasses[position]} z-10`}
    >
      <div className={`${config.bgColor} ${config.textColor} px-2.5 py-1 rounded-full text-xs font-semibold shadow-md flex items-center gap-1`}>
        <IconComponent className="w-3 h-3" />
        <span>{config.label}</span>
      </div>
    </motion.div>
  );
}

/**
 * Ürün verisinden badge tiplerini belirle
 */
export function getProductBadges(product) {
  const badges = [];
  
  // En çok satan kontrolü (örnek: order_rank veya sales_count)
  if (product.is_featured || product.order_rank < 5) {
    badges.push({ type: 'best_seller', position: 'top-left' });
  }
  
  // Yeni ürün kontrolü (örnek: created_at son 30 gün içinde)
  if (product.is_new) {
    badges.push({ type: 'new', position: 'top-right' });
  }
  
  // Toptan avantajı (örnek: wholesale_price varsa)
  if (product.wholesale_price) {
    badges.push({ type: 'wholesale', position: 'bottom-left' });
  }
  
  // Premium malzeme kontrolü
  if (product.material?.toLowerCase().includes('akrilik') || 
      product.material?.toLowerCase().includes('premium')) {
    badges.push({ type: 'premium', position: 'bottom-right' });
  }
  
  return badges;
}
