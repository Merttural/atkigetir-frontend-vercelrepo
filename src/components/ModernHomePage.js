import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import dynamic from 'next/dynamic';
import ProductCard from './ProductCard';
import SidebarFilters from './SidebarFilters';
import { ProductGridSkeleton } from './ProductCardSkeleton';
import EmptyState from './EmptyState';
import ErrorState from './ErrorState';
import Breadcrumbs from './Breadcrumbs';
import Hero from './Hero';
import TrustSection from './TrustSection';
import { MessageCircle, ArrowRight, Loader2 } from 'lucide-react';
import { fetchAllProducts, getSampleProducts } from '@/utils/supabaseProducts';
import { useFilter } from '@/contexts/FilterContext';
import { getProductStructuredData } from '@/utils/structuredData';
import { motion } from 'framer-motion';

// Lazy load heavy components
const MiniBanner = dynamic(() => import('./MiniBanner'), {
  ssr: true
});

const AdBanner = dynamic(() => import('./AdBanner'), {
  ssr: false // Client-side only
});

const SeoSection = dynamic(() => import('./SeoSection'), {
  ssr: true
});

const TrustSignals = dynamic(() => import('./TrustSignals'), {
  ssr: true
});

const ProcessTimeline = dynamic(() => import('./ProcessTimeline'), {
  ssr: true
});

const CompanyLocationMap = dynamic(() => import('./CompanyLocationMap'), {
  ssr: true
});

/**
 * Modern Anasayfa Layout
 * Sol sidebar + Mini banner + Ürün grid
 */
const INITIAL_PRODUCTS_COUNT = 20;
const PRODUCTS_PER_LOAD = 10;

export default function ModernHomePage() {
  const [allProducts, setAllProducts] = useState([]);
  const [shuffledProducts, setShuffledProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const { selectedCategory, setSelectedCategory, searchTerm } = useFilter();
  const [filters, setFilters] = useState({
    productionType: [],
    usage: []
  });
  const observerTarget = useRef(null);

  // Ürünleri yükle ve rastgele sırala
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchAllProducts();
        
        let productsToUse = [];
        if (data && data.length > 0) {
          productsToUse = data;
        } else {
          productsToUse = getSampleProducts();
        }

        // Ürünleri rastgele karıştır (SEO için her sayfa yüklemesinde farklı sıralama)
        // Fisher-Yates shuffle algoritması - daha performanslı
        const shuffled = [...productsToUse];
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        
        setAllProducts(productsToUse);
        setShuffledProducts(shuffled);
        setDisplayedProducts(shuffled.slice(0, INITIAL_PRODUCTS_COUNT));
        setHasMore(shuffled.length > INITIAL_PRODUCTS_COUNT);
      } catch (err) {
        console.error('Ürünler yüklenirken hata:', err);
        setError('Ürünler yüklenirken bir hata oluştu.');
        const sampleProducts = getSampleProducts();
        const shuffled = [...sampleProducts].sort(() => Math.random() - 0.5);
        setAllProducts(sampleProducts);
        setShuffledProducts(shuffled);
        setDisplayedProducts(shuffled.slice(0, INITIAL_PRODUCTS_COUNT));
        setHasMore(shuffled.length > INITIAL_PRODUCTS_COUNT);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Daha fazla ürün yükle
  const loadMoreProducts = useCallback(() => {
    if (loadingMore || !hasMore) return;

    setLoadingMore(true);
    
    // Simüle edilmiş yükleme gecikmesi (gerçek uygulamada gerekli olmayabilir)
    setTimeout(() => {
      const currentCount = displayedProducts.length;
      const nextProducts = shuffledProducts.slice(0, currentCount + PRODUCTS_PER_LOAD);
      
      setDisplayedProducts(nextProducts);
      setHasMore(nextProducts.length < shuffledProducts.length);
      setLoadingMore(false);
    }, 300);
  }, [loadingMore, hasMore, displayedProducts.length, shuffledProducts]);

  // Infinite scroll için Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingMore) {
          loadMoreProducts();
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasMore, loadingMore, loadMoreProducts]);

  // useMemo ile filtreleme performansını optimize et
  const filteredProducts = useMemo(() => {
    let filtered = [...displayedProducts];

    // Kategori filtresi
    if (selectedCategory !== 'Tümü') {
      filtered = filtered.filter(product => 
        product.category && product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Arama filtresi
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchLower) ||
        (product.description && product.description.toLowerCase().includes(searchLower))
      );
    }

    // Üretim tipi filtresi
    if (filters.productionType && filters.productionType.length > 0) {
      filtered = filtered.filter(product => {
        const desc = (product.description || '').toLowerCase();
        return filters.productionType.some(type => 
          desc.includes(type.toLowerCase())
        );
      });
    }

    // Kullanım filtresi
    if (filters.usage && filters.usage.length > 0) {
      filtered = filtered.filter(product => {
        const desc = (product.description || product.name || '').toLowerCase();
        return filters.usage.some(usage => 
          desc.includes(usage.toLowerCase())
        );
      });
    }

    return filtered;
  }, [displayedProducts, selectedCategory, searchTerm, filters]);

  // Product Schema için structured data ekle (SSR-safe)
  // SEO için TÜM ürünlerin structured data'sını ekliyoruz (sadece gösterilenler değil)
  useEffect(() => {
    // SSR kontrolü - sadece client-side'da çalış
    if (typeof window === 'undefined' || !document) return;
    
    if (allProducts.length > 0) {
      try {
        const productSchema = getProductStructuredData(allProducts);
        // productSchema bir array, JSON-LD için array olarak stringify et
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.text = JSON.stringify(productSchema);
        script.id = 'product-structured-data';
        
        // Eğer varsa eski script'i kaldır
        const existingScript = document.getElementById('product-structured-data');
        if (existingScript) {
          existingScript.remove();
        }
        
        document.head.appendChild(script);
        
        return () => {
          const scriptToRemove = document.getElementById('product-structured-data');
          if (scriptToRemove) {
            scriptToRemove.remove();
          }
        };
      } catch (err) {
        console.error('Structured data oluşturulurken hata:', err);
      }
    }
  }, [allProducts]);

  const categories = ['Tümü', ...Array.from(new Set(allProducts.map(p => p.category).filter(Boolean)))];
  
  // Kategori sayılarını hesapla
  const categoryCounts = useMemo(() => {
    const counts = { 'Tümü': allProducts.length };
    allProducts.forEach(product => {
      const category = product.category || 'Diğer';
      counts[category] = (counts[category] || 0) + 1;
    });
    return counts;
  }, [allProducts]);

  if (loading) {
    return (
      <div className="py-12 bg-[#F8FAFC] min-h-screen">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-8">
            <div className="h-10 bg-slate-200 rounded-lg w-64 mb-4 animate-pulse" />
            <div className="h-6 bg-slate-200 rounded-lg w-96 animate-pulse" />
          </div>
          <ProductGridSkeleton count={8} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      <div className="max-w-[1920px] mx-auto px-6 md:px-8 lg:px-12 py-8 lg:py-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col lg:flex-row gap-8 lg:gap-10"
        >
          {/* Sol Sidebar - Filtreler ve Süreç */}
          <div className="lg:w-80 xl:w-96 flex-shrink-0 space-y-6">
            <SidebarFilters
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              filters={filters}
              onFilterChange={setFilters}
              categoryCounts={categoryCounts}
            />
            {/* Süreç Nasıl İşler? */}
            <ProcessTimeline />
          </div>

          {/* Orta Alan */}
          <div className="flex-1">
            {/* Breadcrumbs */}
            <Breadcrumbs items={[{ name: 'Anasayfa', href: '/' }]} />
            
            {/* Hero Section */}
            <Hero />

            {/* Sonuç Bilgisi */}
            <div className="mb-4 flex items-center justify-between">
              <p className="text-gray-600 text-sm">
                <span className="font-semibold text-gray-900">{filteredProducts.length}</span> ürün gösteriliyor
                {allProducts.length > displayedProducts.length && (
                  <span className="text-gray-500 ml-2">
                    (Toplam {allProducts.length} ürün)
                  </span>
                )}
              </p>
            </div>

            {/* Ürün Grid */}
            {error && allProducts.length > 0 && (
              <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-lg mb-4 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                </svg>
                <span className="text-sm">{error}</span>
              </div>
            )}

            {filteredProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-8">
                  {filteredProducts.map((product, index) => (
                    <ProductCard
                      key={`${product.id || product._id}-${product.slug || index}-${product.category || ''}`}
                      product={product}
                      showCategoryBadge={true}
                      priority={index < 4}
                      isFeatured={index === 0}
                    />
                  ))}
                </div>

                {/* Infinite Scroll Trigger & Loading Indicator */}
                {hasMore && (
                  <div 
                    ref={observerTarget}
                    className="flex flex-col items-center justify-center py-8"
                  >
                    {loadingMore ? (
                      <div className="flex items-center gap-3 text-gray-600">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span className="text-sm">Daha fazla ürün yükleniyor...</span>
                      </div>
                    ) : (
                      <motion.button
                        onClick={loadMoreProducts}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-gradient-to-r from-[#2563EB] to-[#1e40af] text-white px-6 py-3 rounded-xl font-semibold hover:from-[#1e40af] hover:to-[#1e3a8a] transition-all shadow-md hover:shadow-lg flex items-center gap-2"
                        aria-label="Daha fazla ürün yükle"
                      >
                        <span>Daha Fazla Ürün Göster</span>
                        <ArrowRight className="w-4 h-4" />
                      </motion.button>
                    )}
                    <p className="text-xs text-gray-500 mt-2">
                      Aşağı kaydırarak daha fazla ürün görebilirsiniz
                    </p>
                  </div>
                )}

                {/* Tüm ürünler yüklendi */}
                {!hasMore && displayedProducts.length > INITIAL_PRODUCTS_COUNT && (
                  <div className="text-center py-8">
                    <p className="text-gray-600 text-sm">
                      Tüm ürünler gösterildi ({allProducts.length} ürün)
                    </p>
                  </div>
                )}
              </>
            ) : (
              <EmptyState
                type="search"
                actionOnClick={() => {
                  googleAds.trackConversion();
                  window.open(`https://wa.me/905337498266?text=${encodeURIComponent(`Merhaba, aradığım ürünü bulamadım. Sizin için üretebilir misiniz?`)}`, '_blank', 'noopener,noreferrer');
                }}
                actionLabel="WhatsApp'tan Sor - Özel Üretim Yapalım"
              />
            )}

            {/* SEO Section */}
            <SeoSection />
          </div>

          {/* Sağ Sidebar - Trust Signals, Trust Section, Company Location */}
          <div className="hidden lg:block lg:w-80 xl:w-96 flex-shrink-0 space-y-6">
            <TrustSignals />
            <CompanyLocationMap />
            <TrustSection />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
