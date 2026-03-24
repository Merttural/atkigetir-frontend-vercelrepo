import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, X, ChevronDown, Package, Flag, Shirt, Facebook, Instagram, MessageCircle } from 'lucide-react';

const facebookUrl = 'https://www.facebook.com/atkigetir/';
const instagramUrl = 'https://www.instagram.com/atkigetir/';
const whatsappUrl = 'https://wa.me/905337498266';

// Kategori ikonları mapping
const categoryIcons = {
  'Atkı': Package, // Scarf icon'u lucide-react'te yok, Package kullanıyoruz
  'Bere': Package,
  'Bayrak': Flag,
  'Forma': Shirt,
  'Siyasi Parti Atkıları': Flag,
  'Tümü': Package
};

export default function SidebarFilters({
  categories = [],
  selectedCategory = 'Tümü',
  onCategoryChange,
  filters = { productionType: [], usage: [] },
  onFilterChange,
  categoryCounts = {} // Kategori başına ürün sayıları
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({});
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsDesktop(window.innerWidth >= 1024);
      const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const productionTypes = ['Dokuma', 'Saten', 'Yün', 'Akrilik'];
  const usageTypes = ['Stadyum', 'Ev', 'Araç', 'Ofis'];

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleProductionTypeToggle = (type) => {
    const current = filters.productionType || [];
    const updated = current.includes(type)
      ? current.filter(t => t !== type)
      : [...current, type];
    onFilterChange({ ...filters, productionType: updated });
  };

  const handleUsageToggle = (usage) => {
    const current = filters.usage || [];
    const updated = current.includes(usage)
      ? current.filter(u => u !== usage)
      : [...current, usage];
    onFilterChange({ ...filters, usage: updated });
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Filtreleri kapat" : "Filtreleri aç"}
        aria-expanded={isOpen}
        className="lg:hidden w-full bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex items-center justify-between mb-4"
      >
        <span className="font-semibold text-[#0F172A] flex items-center gap-2">
          <Filter className="w-5 h-5" aria-hidden="true" />
          Filtreler
        </span>
        <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
      </button>

      {/* Sidebar */}
      <AnimatePresence>
        {(isOpen || isDesktop) && (
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className={`bg-white rounded-[24px] shadow-lg border-2 border-slate-800/20 p-6 ${isOpen || isDesktop ? 'block' : 'hidden'} lg:block`}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-[#0F172A] flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Filtreler
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="lg:hidden text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Kategori Filtresi - Modernize edildi */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-[#0F172A] mb-3">Kategori</h4>
              <div className="space-y-1.5" role="group" aria-label="Kategori filtreleri">
                {categories.map((category) => {
                  const IconComponent = categoryIcons[category] || Package;
                  const isSelected = selectedCategory === category;
                  const count = categoryCounts[category] || 0;
                  
                  return (
                    <motion.button
                      key={category}
                      onClick={() => onCategoryChange(category)}
                      aria-label={`${category} kategorisini seç${count > 0 ? ` (${count} ürün)` : ''}`}
                      aria-pressed={isSelected}
                      whileHover={{ x: 4 }}
                      className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition-all relative ${
                        isSelected
                          ? 'bg-white text-[#2563EB] font-semibold shadow-sm'
                          : 'bg-transparent text-slate-700 hover:bg-slate-50'
                      }`}
                      style={isSelected ? { borderLeft: '3px solid #2563EB' } : {}}
                    >
                      <div className="flex items-center gap-2.5">
                        <IconComponent className={`w-4 h-4 flex-shrink-0 ${isSelected ? 'text-[#2563EB]' : 'text-slate-500'}`} aria-hidden="true" />
                        <span className="flex-1">{category}</span>
                        {count > 0 && (
                          <span className={`text-xs ${isSelected ? 'text-[#2563EB]/70' : 'text-slate-400'}`} aria-label={`${count} ürün`}>
                            ({count})
                          </span>
                        )}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Üretim Tipi */}
            <div className="mb-6">
              <button
                onClick={() => toggleSection('production')}
                className="w-full flex items-center justify-between text-sm font-semibold text-[#0F172A] mb-3"
              >
                <span>Üretim Tipi</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${expandedSections.production ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {expandedSections.production && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="space-y-2 overflow-hidden"
                  >
                    {productionTypes.map((type) => (
                      <label
                        key={type}
                        className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer hover:text-[#2563EB] transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={(filters.productionType || []).includes(type)}
                          onChange={() => handleProductionTypeToggle(type)}
                          className="w-4 h-4 text-[#2563EB] rounded border-slate-300 focus:ring-[#2563EB]"
                        />
                        <span>{type}</span>
                      </label>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Kullanım */}
            <div>
              <button
                onClick={() => toggleSection('usage')}
                aria-label={expandedSections.usage ? "Kullanım filtrelerini kapat" : "Kullanım filtrelerini aç"}
                aria-expanded={expandedSections.usage}
                className="w-full flex items-center justify-between text-sm font-semibold text-[#0F172A] mb-3"
              >
                <span>Kullanım</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${expandedSections.usage ? 'rotate-180' : ''}`} aria-hidden="true" />
              </button>
              <AnimatePresence>
                {expandedSections.usage && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="space-y-2 overflow-hidden"
                  >
                    {usageTypes.map((usage) => (
                      <label
                        key={usage}
                        className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer hover:text-[#2563EB] transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={(filters.usage || []).includes(usage)}
                          onChange={() => handleUsageToggle(usage)}
                          className="w-4 h-4 text-[#2563EB] rounded border-slate-300 focus:ring-[#2563EB]"
                        />
                        <span>{usage}</span>
                      </label>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="mt-6 pt-5 border-t border-slate-200">
              <p className="text-sm font-semibold text-[#0F172A] mb-3">
                İletişim kanallarımız
              </p>
              <div className="flex gap-2" role="group" aria-label="Sosyal medya ve WhatsApp ile iletişim">
                <a
                  href={facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Atkigetir Facebook sayfası"
                  className="flex flex-1 items-center justify-center min-h-[44px] rounded-xl border border-slate-200 bg-slate-50/80 text-[#1877F2] hover:bg-[#1877F2]/10 hover:border-[#1877F2]/40 transition-colors"
                >
                  <Facebook className="w-5 h-5" aria-hidden="true" />
                </a>
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Atkigetir Instagram sayfası"
                  className="flex flex-1 items-center justify-center min-h-[44px] rounded-xl border border-slate-200 bg-slate-50/80 text-pink-600 hover:bg-pink-50 hover:border-pink-300 transition-colors"
                >
                  <Instagram className="w-5 h-5" aria-hidden="true" />
                </a>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp ile yazın"
                  className="flex flex-1 items-center justify-center min-h-[44px] rounded-xl border border-emerald-200 bg-emerald-50/80 text-[#16A34A] hover:bg-emerald-100 hover:border-emerald-300 transition-colors"
                >
                  <MessageCircle className="w-5 h-5" aria-hidden="true" />
                </a>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
