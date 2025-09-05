import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export default function AdminNavbar() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="flex items-center justify-between h-16 px-6">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold text-gray-900">Atkigetir Admin</h1>
          </div>
          <div className="flex items-center space-x-6">
            <span className="text-blue-600 text-sm font-medium">Site Anasayfa</span>
            <span className="text-blue-600 text-sm font-medium">Ürünler</span>
            <span className="text-blue-600 text-sm font-medium">Hakkımızda</span>
            <span className="text-blue-600 text-sm font-medium">İletişim</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between h-16 px-6">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold text-gray-900">Atkigetir Admin</h1>
          <span className="text-sm text-gray-500">|</span>
          <span className="text-sm text-gray-600">Yönetici Paneli</span>
        </div>
        
        <div className="flex items-center space-x-6">
          <Link 
            href="/" 
            className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors duration-200 flex items-center gap-1"
          >
            <span>🏠</span>
            Site Anasayfa
          </Link>
          <Link 
            href="/products" 
            className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors duration-200 flex items-center gap-1"
          >
            <span>📦</span>
            Ürünler
          </Link>
          <Link 
            href="/about" 
            className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors duration-200 flex items-center gap-1"
          >
            <span>ℹ️</span>
            Hakkımızda
          </Link>
          <Link 
            href="/contact" 
            className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors duration-200 flex items-center gap-1"
          >
            <span>📞</span>
            İletişim
          </Link>
        </div>
      </div>
    </div>
  );
} 