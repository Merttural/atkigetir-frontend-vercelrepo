import { useState, useEffect, useMemo } from 'react';
import SEO from './SEO';
import Breadcrumbs from './Breadcrumbs';
import ProductCard from './ProductCard';
import SidebarFilters from './SidebarFilters';
import LoadingSpinner from './LoadingSpinner';
import { fetchAllProducts, getSampleProducts } from '@/utils/supabaseProducts';
import { useFilter } from '@/contexts/FilterContext';
import { motion } from 'framer-motion';
import { Package } from 'lucide-react';

export default function CategoryPageTemplate({ 
  categoryName, 
  categorySlug, 
  description,
  seoTitle,
  seoDescription,
  seoKeywords,
  pageTitle,
  pageDescription
}) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { selectedCategory, setSelectedCategory, searchTerm } = useFilter();
  const [filters, setFilters] = useState({
    productionType: [],
    usage: []
  });

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchAllProducts();
        
        if (data && data.length > 0) {
          setProducts(data);
        } else {
          setProducts(getSampleProducts());
        }
      } catch (err) {
        console.error('Ürünler yüklenirken hata:', err);
        setError('Ürünler yüklenirken bir hata oluştu.');
        setProducts(getSampleProducts());
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  useEffect(() => {
    let filtered = [...products];

    // Kategori filtresi
    if (categoryName && categoryName !== 'Tümü') {
      filtered = filtered.filter(product => 
        product.category && product.category.toLowerCase() === categoryName.toLowerCase()
      );
    } else if (selectedCategory !== 'Tümü') {
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

    setFilteredProducts(filtered);
  }, [products, categoryName, selectedCategory, searchTerm, filters]);

  const categories = ['Tümü', ...Array.from(new Set(products.map(p => p.category).filter(Boolean)))];

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://atkigetir.com';
  
  // ItemList Schema for category pages - useMemo ile optimize edildi
  const itemListSchema = useMemo(() => {
    if (filteredProducts.length === 0) return null;
    
    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": seoTitle || `${categoryName} Ürünleri`,
      "description": seoDescription || description || `${categoryName} kategorisindeki tüm ürünlerimizi inceleyin.`,
      "itemListElement": filteredProducts.slice(0, 20).map((product, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Product",
          "name": product.name,
          "url": `${baseUrl}/products/${product.slug || product._id || product.id}`,
          "image": product.image_url || product.image || `${baseUrl}/images/placeholder.svg`,
          "description": product.description || `${product.name} - ${categoryName} kategorisinde kaliteli ürün`
        }
      }))
    };
  }, [filteredProducts, categoryName, seoTitle, seoDescription, description, baseUrl]);

  if (loading) {
    return (
      <div className="bg-[#F8FAFC] min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center">
            <LoadingSpinner size="lg" text="Ürünler yükleniyor..." />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={seoTitle || `${categoryName} Ürünleri | Atkigetir`}
        description={seoDescription || description || `${categoryName} kategorisindeki tüm ürünlerimizi inceleyin. Özel üretim, toptan fiyat, hızlı teslimat.`}
        keywords={seoKeywords || `${categoryName}, ${categoryName} modelleri, ${categoryName} fiyatları, ${categoryName} ürünleri`}
        url={`/urunler/${categorySlug}`}
        structuredData={itemListSchema ? [itemListSchema] : null}
      />
      <div className="bg-[#F8FAFC] min-h-screen py-6">
        <div className="max-w-7xl mx-auto px-4">
          <Breadcrumbs items={[
            { name: 'Anasayfa', href: '/' },
            { name: 'Ürünler', href: '/urunler' },
            { name: categoryName, href: `/urunler/${categorySlug}` }
          ]} />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#2563EB] to-[#1e40af] flex items-center justify-center">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-[#0F172A] tracking-tight">{pageTitle || categoryName}</h1>
                {(pageDescription || description) && (
                  <p className="text-slate-600 mt-1">{pageDescription || description}</p>
                )}
              </div>
            </div>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar */}
            <div className="lg:w-64 flex-shrink-0">
              <SidebarFilters
                categories={categories}
                selectedCategory={categoryName || selectedCategory}
                onCategoryChange={setSelectedCategory}
                filters={filters}
                onFilterChange={setFilters}
              />
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {/* Results Info */}
              <div className="mb-4 flex items-center justify-between">
                <p className="text-gray-600 text-sm">
                  <span className="font-semibold text-gray-900">{filteredProducts.length}</span> ürün bulundu
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                  {error}
                </div>
              )}

              {/* Products Grid */}
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {filteredProducts.map((product, index) => (
                    <ProductCard
                      key={product.id || product._id}
                      product={product}
                      showCategoryBadge={true}
                      priority={index < 4}
                      isFeatured={index === 0}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-[24px] shadow-sm p-12 text-center">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold text-[#0F172A] mb-2 tracking-tight">Ürün bulunamadı</h3>
                  <p className="text-slate-500 mb-4">
                    Bu kategoride henüz ürün bulunmamaktadır.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
