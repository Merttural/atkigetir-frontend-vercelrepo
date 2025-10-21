import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import LoadingSpinner from "./LoadingSpinner";
import { cachedApiCall } from "../utils/cacheManager";

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('🔍 Fetching featured products with cache...');
        
        // Cache ile featured ürünleri dene
        let result = await cachedApiCall('/api/products?featured=true');
        
        if (result.success && result.data.products && result.data.products.length > 0) {
          console.log(`✅ Featured products found: ${result.data.products.length} (${result.fromCache ? 'from cache' : 'from API'})`);
          setProducts(result.data.products.slice(0, 8));
        } else {
          console.log('⚠️ No featured products, trying all products with cache...');
          // Featured yoksa tüm ürünleri cache ile dene
          result = await cachedApiCall('/api/products');
          
          if (result.success && result.data.products && result.data.products.length > 0) {
            console.log(`✅ All products found: ${result.data.products.length} (${result.fromCache ? 'from cache' : 'from API'})`);
            setProducts(result.data.products.slice(0, 8));
          } else {
            console.log('❌ No products found');
            setError('Ürünler yüklenemedi. Backend bağlantısı kurulamadı.');
            setProducts([]);
          }
        }
      } catch (error) {
        console.error('Ürünler yüklenirken hata:', error);
        setError('Ürünler yüklenirken bir hata oluştu');
        // Hata durumunda boş array set et
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Öne Çıkan Ürünler</h2>
            <p className="text-gray-600">En popüler ürünlerimizi keşfedin</p>
          </div>
          <div className="flex justify-center">
            <LoadingSpinner size="lg" text="Ürünler yükleniyor..." />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Öne Çıkan Ürünler</h2>
            <p className="text-red-600 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Tekrar Dene
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Öne Çıkan Ürünler</h2>
            <p className="text-gray-600">Şu anda öne çıkan ürün bulunmuyor.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Öne Çıkan Ürünler</h2>
          <p className="text-gray-600">En popüler ürünlerimizi keşfedin</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard 
              key={product._id} 
              product={product} 
              showCategoryBadge={true}
            />
          ))}
        </div>
        
        <div className="text-center mt-8">
          <a 
            href="/urunler" 
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Tüm Ürünleri Gör
            <span className="ml-2">→</span>
          </a>
        </div>
      </div>
    </section>
  );
} 