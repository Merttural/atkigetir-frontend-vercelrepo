import { useState, useEffect } from 'react';
import { Search, X, MessageCircle, TrendingUp, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

/**
 * Global Arama Modal'ı
 * Popüler aramalar ve live search sonuçları
 */
export default function SearchModal({ isOpen, onClose, onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const popularSearches = [
    'Taraftar Atkısı',
    'Logolu Bere',
    'Polar Atkı',
    'Bayrak',
    'Forma',
    'Dokuma Atkı'
  ];

  // Live search - basitleştirilmiş (gerçek uygulamada API'ye bağlanır)
  useEffect(() => {
    if (!isOpen) return;
    
    if (searchQuery.trim().length > 2) {
      setIsSearching(true);
      // Şimdilik basit bir mock
      setTimeout(() => {
        setSearchResults([]); // Mock - gerçek sonuçlar buraya gelecek
        setIsSearching(false);
      }, 300);
    } else {
      setSearchResults([]);
      setIsSearching(false);
    }
  }, [searchQuery, isOpen]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch?.(searchQuery);
      onClose();
    }
  };

  const handlePopularClick = (term) => {
    setSearchQuery(term);
    onSearch?.(term);
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      // Modal açıldığında input'a focus
      const timer = setTimeout(() => {
        const input = document.getElementById('search-modal-input');
        if (input) input.focus();
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setSearchQuery('');
      setSearchResults([]);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay - Arka plan karartma */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed inset-0 md:inset-auto md:top-20 md:left-1/2 md:-translate-x-1/2 z-50 w-full md:w-[600px] max-h-[80vh] md:max-h-[600px] bg-white rounded-2xl md:rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-4 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <Search className="w-5 h-5 text-slate-400" aria-hidden="true" />
                <form onSubmit={handleSearch} className="flex-1" role="search">
                  <label htmlFor="search-modal-input" className="sr-only">
                    Ürün ara
                  </label>
                  <input
                    id="search-modal-input"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Ürün ara..."
                    aria-label="Ürün ara"
                    aria-describedby="search-modal-description"
                    className="w-full text-lg outline-none text-[#0F172A] placeholder:text-slate-400"
                  />
                  <span id="search-modal-description" className="sr-only">
                    Ürün aramak için yazmaya başlayın
                  </span>
                </form>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-slate-600" />
                </button>
              </div>
            </div>

            {/* Content - Scrollable */}
            <div className="flex-1 overflow-y-auto p-4">
              {/* Popüler Aramalar */}
              {!searchQuery && (
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp className="w-4 h-4 text-slate-500" aria-hidden="true" />
                    <h3 className="text-sm font-semibold text-slate-700" id="search-modal-title">Popüler Aramalar</h3>
                  </div>
                  <div className="flex flex-wrap gap-2" role="list" aria-label="Popüler aramalar">
                    {popularSearches.map((term, index) => (
                      <motion.button
                        key={index}
                        onClick={() => handlePopularClick(term)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 bg-slate-100 hover:bg-[#2563EB] hover:text-white text-slate-700 text-sm font-medium rounded-full transition-all"
                        aria-label={`${term} için ara`}
                        role="listitem"
                      >
                        {term}
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {/* Arama Sonuçları */}
              {searchQuery && (
                <div>
                  {isSearching ? (
                    <div className="text-center py-8 text-slate-500" role="status" aria-live="polite">
                      <div className="animate-spin w-6 h-6 border-2 border-[#2563EB] border-t-transparent rounded-full mx-auto mb-2" aria-hidden="true"></div>
                      <p className="text-sm">Aranıyor...</p>
                    </div>
                  ) : searchResults.length > 0 ? (
                    <div className="space-y-2" role="list" aria-label="Arama sonuçları">
                      {searchResults.map((result) => (
                        <Link
                          key={result.id}
                          href={`/urunler/${result.slug}`}
                          onClick={onClose}
                          className="block p-3 hover:bg-slate-50 rounded-lg transition-colors"
                          aria-label={`${result.name} ürün detaylarını görüntüle`}
                          role="listitem"
                        >
                          <div className="font-medium text-[#0F172A]">{result.name}</div>
                          <div className="text-sm text-slate-500">{result.category}</div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8" role="status">
                      <p className="text-slate-500 mb-4">Sonuç bulunamadı</p>
                      <motion.button
                        onClick={() => {
                          googleAds.trackConversion();
                          window.open(`https://wa.me/905337498266?text=${encodeURIComponent(`Merhaba, "${searchQuery}" araması için ürün arıyorum.`)}`, '_blank', 'noopener,noreferrer');
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-[#22C55E] to-[#16A34A] text-white px-6 py-2.5 rounded-xl font-semibold hover:from-[#16A34A] hover:to-[#15803d] transition-all shadow-md hover:shadow-[0_0_25px_rgba(34,197,94,0.4)] group"
                        aria-label={`${searchQuery} için WhatsApp'tan sor`}
                      >
                        <MessageCircle className="w-4 h-4" aria-hidden="true" />
                        <span>WhatsApp'tan Sorun</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true" />
                      </motion.button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
