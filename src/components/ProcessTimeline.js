import { motion } from 'framer-motion';
import { Package, CheckCircle2, Truck } from 'lucide-react';

/**
 * Süreç Nasıl İşler? - Visual Timeline
 * 3 adımlı görsel süreç akışı
 */
export default function ProcessTimeline() {
  const steps = [
    {
      icon: Package,
      title: 'Ürününüzü Seçin veya Tasarımınızı Gönderin',
      description: 'Katalogdan seçin veya özel tasarımınızı WhatsApp üzerinden paylaşın',
      gradient: 'from-[#2563EB] to-[#1e40af]'
    },
    {
      icon: CheckCircle2,
      title: 'Dijital Taslağınızı Onaylayın',
      description: 'WhatsApp üzerinden dijital taslağınızı görüntüleyip onaylayın',
      gradient: 'from-[#22C55E] to-[#16A34A]'
    },
    {
      icon: Truck,
      title: 'Üretim Başlasın ve Kapınıza Gelsin',
      description: 'Hızlı üretim ve güvenli kargo ile ürününüz kapınızda',
      gradient: 'from-[#F59E0B] to-[#D97706]'
    }
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-12"
    >
      <div className="bg-white rounded-2xl shadow-lg border-2 border-slate-800/20 p-8 md:p-12">
        <h2 className="text-2xl md:text-3xl font-bold text-[#0F172A] mb-8 text-center tracking-tight">
          Süreç Nasıl İşler?
        </h2>
        
        {/* Dikey Timeline - Tüm Ekranlar */}
        <div className="space-y-8">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.15 }}
                className="flex items-start gap-4 relative"
              >
                {/* Sol: İkon ve çizgi */}
                <div className="flex flex-col items-center">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-md relative z-10`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  {/* Adım numarası */}
                  <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-white border-2 border-[#2563EB] flex items-center justify-center text-xs font-bold text-[#2563EB] z-20">
                    {index + 1}
                  </div>
                  {/* Dikey çizgi (son adım hariç) */}
                  {index < steps.length - 1 && (
                    <div className="w-0.5 h-full min-h-[60px] border-l-2 border-dashed border-slate-300 mt-2" />
                  )}
                </div>
                
                {/* Sağ: İçerik */}
                <div className="flex-1 pt-2">
                  <h3 className="text-base font-semibold text-[#0F172A] mb-1">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {step.description}
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
