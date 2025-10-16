import React, { useState, useCallback } from "react";
import Link from "next/link";

export default function ProductCard({ product, showCategoryBadge, priority = false }) {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = useCallback(() => {
    setImageLoading(false);
  }, []);

  const handleImageError = useCallback(() => {
    setImageError(true);
    setImageLoading(false);
  }, []);

  if (!product) return null;

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden group">
      <Link href={`/urunler/${product.slug || product._id}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          {imageLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          )}
          <img
            src={product.image || '/images/placeholder.svg'}
            alt={product.name}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              imageLoading ? 'opacity-0' : 'opacity-100'
            }`}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
          {imageError && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
              <span className="text-gray-500 text-sm">Resim yüklenemedi</span>
            </div>
          )}
          {showCategoryBadge && product.category && (
            <div className="absolute top-2 left-2">
              <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-medium">
                {product.category}
              </span>
            </div>
          )}
        </div>
      </Link>
      
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 text-lg mb-2 group-hover:text-blue-600 transition-colors overflow-hidden" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
          {product.name}
        </h3>
        
        {product.category && (
          <p className="text-sm text-gray-500 mb-2">{product.category}</p>
        )}
        
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-blue-600">
              ₺{product.price}
            </span>
          </div>
          
          <div className="flex gap-2">
            <Link 
              href={`/urunler/${product.slug || product._id}`}
              className="flex-1 bg-gray-100 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-200 text-center text-sm font-medium"
            >
              Ürün Detayı
            </Link>
            
            <button
              className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-1"
            >
              <span className="text-sm">🛒</span>
              <span className="text-sm font-medium">Sepete Ekle</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}