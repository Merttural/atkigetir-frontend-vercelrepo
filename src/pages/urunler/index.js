import { useState, useEffect, useMemo } from "react";
import dynamic from 'next/dynamic';
import ProductCard from '@/components/ProductCard';
import SidebarFilters from '@/components/SidebarFilters';
import { ProductGridSkeleton } from '@/components/ProductCardSkeleton';
import EmptyState from '@/components/EmptyState';
import Breadcrumbs from '@/components/Breadcrumbs';
import SEO from '@/components/SEO';
import { getSampleProducts } from '@/utils/supabaseProducts';
import { useFilter } from '@/contexts/FilterContext';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

// Lazy load heavy components
const ProcessTimeline = dynamic(() => import('@/components/ProcessTimeline'), {
  ssr: true
});

const TrustSignals = dynamic(() => import('@/components/TrustSignals'), {
  ssr: true
});

const TrustSection = dynamic(() => import('@/components/TrustSection'), {
  ssr: true
});

const CompanyLocationMap = dynamic(() => import('@/components/CompanyLocationMap'), {
  ssr: true
});

// Server-side data fetching with ISR
export async function getStaticProps() {
  try {
    // Server-side Supabase client kullan
    const { createServerAnonClient, isSupabaseReady } = await import('@/lib/supabase/server');
    
    // Supabase yapılandırılmamışsa sample products döndür
    if (!isSupabaseReady()) {
      return {
        props: {
          initialProducts: getSampleProducts()
        },
        revalidate: 60
      };
    }

    // fetchAllProducts fonksiyonunu kullan (tüm kategorilerden ürünleri çeker)
    const { fetchAllProducts } = await import('@/utils/supabaseProducts');
    const products = await fetchAllProducts();

    return {
      props: {
        initialProducts: products.length > 0 ? products : getSampleProducts()
      },
      revalidate: 60 // 60 saniyede bir yenile (ISR)
    };
  } catch (error) {
    console.error('getStaticProps error:', error);
    return {
      props: {
        initialProducts: getSampleProducts()
      },
      revalidate: 60
    };
  }
}

export default function UrunlerPage({ initialProducts }) {
  const [products, setProducts] = useState(initialProducts);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { selectedCategory, setSelectedCategory, searchTerm, setSearchTerm } = useFilter();
  const [filters, setFilters] = useState({
    productionType: [],
    usage: []
  });

  // Kategorileri memoize et
  const categories = useMemo(() => {
    return ["Tümü", ...Array.from(new Set(products.map(p => p.category).filter(Boolean)))];
  }, [products]);

  // Kategori sayılarını hesapla
  const categoryCounts = useMemo(() => {
    const counts = { 'Tümü': products.length };
    products.forEach(product => {
      const category = product.category || 'Diğer';
      counts[category] = (counts[category] || 0) + 1;
    });
    return counts;
  }, [products]);

  // Filtreleme mantığı - useMemo ile optimize et
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    if (selectedCategory !== 'Tümü') {
      filtered = filtered.filter(product => 
        product.category && product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchLower) ||
        (product.description && product.description.toLowerCase().includes(searchLower))
      );
    }

    if (filters.productionType && filters.productionType.length > 0) {
      filtered = filtered.filter(product => {
        const desc = (product.description || '').toLowerCase();
        return filters.productionType.some(type => 
          desc.includes(type.toLowerCase())
        );
      });
    }

    if (filters.usage && filters.usage.length > 0) {
      filtered = filtered.filter(product => {
        const desc = (product.description || product.name || '').toLowerCase();
        return filters.usage.some(usage => 
          desc.includes(usage.toLowerCase())
        );
      });
    }

    return filtered;
  }, [products, selectedCategory, searchTerm, filters]);

  return (
    <>
      <SEO
        title="Tüm Ürünler | Atkigetir - Atkı, Bere, Bayrak ve Daha Fazlası"
        description="Atkı, bere, bayrak ve daha fazlası. Kişiye ve kuruma özel üretim ürünler Atkigetir'de! Hızlı kargo, güvenli alışveriş."
        keywords="atkı, bere, bayrak, forma, taraftar ürünleri, özel üretim, toptan fiyat"
        url="/urunler"
      />
      
      <div className="min-h-screen relative">
        <div className="max-w-[1920px] mx-auto px-6 md:px-8 lg:px-12 py-8 lg:py-12">
          <Breadcrumbs items={[
            { name: 'Anasayfa', href: '/' },
            { name: 'Ürünler', href: '/urunler' }
          ]} />
          
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
              {/* Başlık */}
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-[#0F172A] mb-2 tracking-tighter">Tüm Ürünler</h1>
                <p className="text-slate-500">Atkı, bere, bayrak ve daha fazlası. Kişiye ve kuruma özel üretim!</p>
              </div>

              {/* Arama Barı */}
              <div className="mb-6">
                <div className="relative max-w-md">
                  <input
                    type="text"
                    placeholder="Ürün adı ile ara..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] text-sm bg-white shadow-sm"
                    aria-label="Ürün ara"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" aria-hidden="true" />
                </div>
              </div>

              {/* Sonuç Bilgisi */}
              <div className="mb-4 flex items-center justify-between">
                <p className="text-slate-600 text-sm">
                  <span className="font-semibold text-[#0F172A]">{filteredProducts.length}</span> ürün bulundu
                </p>
              </div>

              {/* Ürün Grid */}
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-8">
                  {filteredProducts.map((product, index) => (
                    <ProductCard
                      key={`${product.id || product._id}-${product.slug || index}-${product.category || ''}`}
                      product={product}
                      showCategoryBadge={true}
                      priority={index < 4}
                    />
                  ))}
                </div>
              ) : (
                <EmptyState
                  type="products"
                  actionOnClick={() => {
                    setSelectedCategory('Tümü');
                    setSearchTerm('');
                    setFilters({ productionType: [], usage: [] });
                  }}
                  actionLabel="Tüm Filtreleri Temizle"
                />
              )}
            </div>

            {/* Sağ Sidebar - Trust Signals, Company Location, Trust Section */}
            <div className="hidden lg:block lg:w-80 xl:w-96 flex-shrink-0 space-y-6">
              <TrustSignals />
              <CompanyLocationMap />
              <TrustSection />
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
} 