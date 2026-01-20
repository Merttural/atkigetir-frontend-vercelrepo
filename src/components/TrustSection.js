import { motion } from 'framer-motion';
import { Zap, Package, Building2, Truck } from 'lucide-react';

/**
 * Trust Section - "Neden Biz?"
 * Ürünlerin hemen üzerinde, kullanıcıyı ikna eden 15 saniyelik bilgilendirme
 */
export default function TrustSection() {
  const trustItems = [
    {
      icon: Zap,
      title: 'Hızlı Üretim',
      description: 'Kısa sürede teslimat'
    },
    {
      icon: Package,
      title: 'Yüksek Kalite İplik',
      description: 'Premium malzemeler'
    },
    {
      icon: Building2,
      title: 'Toptan ve Perakende',
      description: 'Her miktara uygun fiyat'
    },
    {
      icon: Truck,
      title: "Türkiye'nin Her Yerine Kargo",
      description: 'Ücretsiz kargo fırsatı'
    }
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <div className="bg-gray-50 rounded-2xl p-6 md:p-8 border-2 border-slate-800/20 shadow-lg">
        <h2 className="text-xl md:text-2xl font-bold text-[#0F172A] mb-6 text-center tracking-tight">
          Neden Biz?
        </h2>
        
        {/* Dikey Layout - Alt Alta */}
        <div className="grid grid-cols-1 gap-4 md:gap-6">
          {trustItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                whileHover={{ scale: 1.02 }}
                className="flex flex-row items-center gap-4 p-4 md:p-6 rounded-xl bg-white hover:shadow-md transition-all border border-slate-800/10"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-[#2563EB] to-[#1e40af] flex items-center justify-center flex-shrink-0">
                  <IconComponent className="w-6 h-6 md:w-7 md:h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-[#0F172A] text-sm md:text-base mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs md:text-sm text-slate-600">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
