import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import LoadingSpinner from "./LoadingSpinner";
import Link from "next/link";

export default function RandomProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRandomProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('/api/products/random/');
        if (!response.ok) {
          throw new Error('Rastgele ürünler yüklenirken hata oluştu');
        }
        const data = await response.json();
        if (data.success && data.products && data.products.length > 0) {
          setProducts(data.products);
        } else {
          setProducts([]);
        }
      } catch (err) {
        console.error("Rastgele ürünler yüklenirken hata:", err);
        setError("Ürünler yüklenirken bir hata oluştu.");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRandomProducts();
  }, []);

  if (loading) {
    return (
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Öne Çıkan Ürünler</h2>
            <p className="text-gray-600">Sizin için seçtiklerimiz...</p>
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

  // Ürünleri kategoriye göre grupla
  const categoryMap = {
    'atkı': 'Atkı',
    'forma': 'Forma', 
    'bere': 'Bere',
    'bayrak': 'Bayrak'
  };

  const categoriesOrder = ['atkı', 'forma', 'bere', 'bayrak'];
  
  const groupedProducts = categoriesOrder.reduce((acc, category) => {
    acc[category] = products.filter(p => p.category && p.category.toLowerCase() === category.toLowerCase());
    return acc;
  }, {});

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Öne Çıkan Ürünler</h2>
          <p className="text-gray-600">Her kategoriden seçtiklerimiz</p>
        </div>

        {categoriesOrder.map(category => {
          const productsToDisplay = groupedProducts[category];
          if (!productsToDisplay || productsToDisplay.length === 0) return null;

          return (
            <div key={category} className="mb-12">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800">{categoryMap[category]} Ürünleri</h3>
                <Link 
                  href={`/urunler/${category}`} 
                  className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                >
                  Tüm {categoryMap[category]}leri Gör →
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {productsToDisplay.slice(0, 4).map((product, index) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    showCategoryBadge={true}
                    priority={index === 0} // İlk ürün için priority
                  />
                ))}
              </div>
            </div>
          );
        })}

        <div className="text-center mt-8">
          <Link 
            href="/urunler"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Tüm Ürünleri Gör
            <span className="ml-2">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}