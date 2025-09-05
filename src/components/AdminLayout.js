import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import AdminNavbar from './AdminNavbar';

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    setMounted(true);
    setCurrentPath(window.location.pathname);
  }, []);

  const navigation = [
    { name: 'Anasayfa', href: '/admin', icon: '🏠' },
    { name: 'Siparişler', href: '/admin/orders', icon: '🛍️' },
    { name: 'Ürünler', href: '/admin/products', icon: '📦' },
    { name: 'Kullanıcılar', href: '/admin/users', icon: '👥' },
    { name: 'Kategoriler', href: '/admin/categories', icon: '📁' },
  ];

  const isActive = (href) => mounted && currentPath === href;

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50">
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
        <div className="flex">
          <div className="w-64 bg-white shadow-sm min-h-screen">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Yönetici Paneli</h2>
              <p className="text-sm text-gray-600 mt-1">Kategori Yönet</p>
            </div>
            <nav className="p-4">
              <div className="space-y-2">
                {navigation.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center px-4 py-3 text-sm font-medium rounded-md text-gray-600"
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.name}
                  </div>
                ))}
              </div>
            </nav>

          </div>
          <div className="flex-1 p-6">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
              <div className="bg-white rounded-lg shadow p-8">
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-20 bg-gray-200 rounded"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-sm min-h-screen">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Yönetici Paneli</h2>
            <p className="text-sm text-gray-600 mt-1">Kategori Yönet</p>
          </div>
          
          <nav className="p-4">
            <div className="space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                    isActive(item.href)
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.name}
                </Link>
              ))}
            </div>
          </nav>


        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {children}
        </div>
      </div>
    </div>
  );
} 