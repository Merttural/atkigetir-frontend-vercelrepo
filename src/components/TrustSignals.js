import { Clock, Pencil, FileText, Truck } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * Trust Signals - Güven Veren Alan
 * Max-w-7xl genişliğinde, 4 kolon, mobilde 2 sütun
 */
export default function TrustSignals() {
  const signals = [
    {
      icon: Clock,
      title: 'Hızlı Üretim',
      description: 'Kısa sürede teslimat'
    },
    {
      icon: Pencil,
      title: 'Kişiye Özel Tasarım',
      description: 'Özel tasarım desteği'
    },
    {
      icon: FileText,
      title: 'Ücretsiz Taslak Desteği',
      description: 'Tasarım danışmanlığı'
    },
    {
      icon: Truck,
      title: 'Güvenli Gönderim',
      description: 'Güvenli paketleme'
    }
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-gray-50 rounded-2xl p-6 border-2 border-slate-800/20 shadow-lg">
        <div className="grid grid-cols-1 gap-4 md:gap-6">
          {signals.map((signal, index) => {
            const IconComponent = signal.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="flex flex-row items-center gap-4 p-4 rounded-xl bg-white hover:shadow-md transition-all border border-slate-800/10"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#2563EB] to-[#1e40af] flex items-center justify-center flex-shrink-0">
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-[#0F172A] text-sm mb-1">
                    {signal.title}
                  </h3>
                  <p className="text-xs text-slate-600">
                    {signal.description}
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
