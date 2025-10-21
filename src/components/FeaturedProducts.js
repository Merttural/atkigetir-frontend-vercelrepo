import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import LoadingSpinner from "./LoadingSpinner";

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://atkigetir-backend.onrender.com'}/api/products?featured=true`);
        
        if (!response.ok) {
          throw new Error('Ürünler yüklenirken hata oluştu');
        }
        
        const data = await response.json();
        
        if (data.products && data.products.length > 0) {
          // En fazla 8 ürün göster
          setProducts(data.products.slice(0, 8));
        } else {
          // Eğer featured ürün yoksa, tüm ürünlerden ilk 8'ini al
          const allProductsResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://atkigetir-backend.onrender.com'}/api/products`);
          const allProductsData = await allProductsResponse.json();
          
          if (allProductsData.products && allProductsData.products.length > 0) {
            setProducts(allProductsData.products.slice(0, 8));
          } else {
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