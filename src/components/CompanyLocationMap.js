import { MapPin, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * Şirket Konumu - Küçük Google Maps Widget
 * Sağ sidebar için optimize edilmiş
 */
export default function CompanyLocationMap() {
  const mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6015.140182331654!2d28.981517331891332!3d41.078389040988654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab6ee3165ea0b%3A0x8043da0411809dec!2sATKI%20GET%C4%B0R!5e0!3m2!1str!2sus!4v1768862724310!5m2!1str!2sus";
  const googleMapsLink = "https://www.google.com/maps/search/ATKI+GETİR";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white rounded-[24px] shadow-sm border border-slate-200 overflow-hidden"
    >
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-[#2563EB]/5 to-[#1e40af]/5 border-b border-slate-200">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#2563EB] to-[#1e40af] flex items-center justify-center">
            <MapPin className="w-4 h-4 text-white" />
          </div>
          <h3 className="font-semibold text-[#0F172A] text-sm">Konumumuz</h3>
        </div>
        <p className="text-xs text-slate-600">İstanbul, Türkiye</p>
      </div>

      {/* Map */}
      <div className="relative h-48 w-full">
        <iframe
          src={mapUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Atkigetir Konumu"
          aria-label="Atkigetir şirket konumu haritası"
        />
      </div>

      {/* Footer - Google Maps Link */}
      <div className="p-4 border-t border-slate-200">
        <motion.a
          href={googleMapsLink}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center justify-center gap-2 text-sm font-medium text-[#2563EB] hover:text-[#1e40af] transition-colors"
          aria-label="Google Maps'te konumumuzu aç"
        >
          <span>Haritada Görüntüle</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </motion.a>
      </div>
    </motion.div>
  );
}
