import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/hooks/useCart";

export default function ProductCard({ product, showCategoryBadge }) {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const { addToCart } = useCart();
  
  if (!product) return null;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    
    // Toast notification göster
    if (typeof window !== 'undefined' && window.showToast) {
      window.showToast(`${product.name} sepete eklendi!`, 'success', 3000);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden group">
      <Link href={`/urunler/${product.slug || product._id}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          {imageLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          )}
          <Image
            src={product.image || '/images/placeholder.jpg'}
            alt={product.name}
            fill
            className={`object-cover transition-opacity duration-300 ${
              imageLoading ? 'opacity-0' : 'opacity-100'
            }`}
            onLoad={() => setImageLoading(false)}
            onError={() => {
              setImageError(true);
              setImageLoading(false);
            }}
            priority={false}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
          {product.stock !== undefined && (
            <div className="absolute top-2 right-2">
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                product.stock > 0 
                  ? 'bg-green-500 text-white' 
                  : 'bg-red-500 text-white'
              }`}>
                {product.stock > 0 ? 'Stokta' : 'Stok Yok'}
              </span>
            </div>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
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
                href={`/products/${product.slug || product._id}`}
                className="flex-1 bg-gray-100 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-200 text-center text-sm font-medium"
                onClick={(e) => e.stopPropagation()}
              >
                Ürün Detayı
              </Link>
              
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-1"
                disabled={product.stock === 0}
              >
                <span className="text-sm">🛒</span>
                <span className="text-sm font-medium">Sepete Ekle</span>
              </button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
} 