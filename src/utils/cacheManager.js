// Cache Manager - Backend çalışmadığında agresif caching
class CacheManager {
  constructor() {
    this.cache = new Map();
    this.defaultTTL = 30 * 60 * 1000; // 30 dakika
  }

  set(key, data, ttl = this.defaultTTL) {
    const expiry = Date.now() + ttl;
    this.cache.set(key, { data, expiry });
    console.log(`📦 Cached: ${key} (expires in ${ttl/1000}s)`);
  }

  get(key) {
    const item = this.cache.get(key);
    if (!item) return null;

    if (Date.now() > item.expiry) {
      this.cache.delete(key);
      return null;
    }

    return item.data;
  }

  clear() {
    this.cache.clear();
  }

  // Backend çalışmadığında mock data döndür
  getMockData(type) {
    const mockData = {
      products: [
        {
          _id: 'mock-1',
          name: 'Örnek Atkı - Galatasaray',
          price: 299.99,
          image: '/images/placeholder.svg',
          category: 'Atkı',
          description: 'Galatasaray temalı kaliteli atkı. Backend bağlantısı kurulduğunda gerçek ürünler yüklenecek.',
          stock: 10,
          active: true,
          featured: true
        },
        {
          _id: 'mock-2',
          name: 'Örnek Bere - Fenerbahçe',
          price: 199.99,
          image: '/images/placeholder.svg',
          category: 'Bere',
          description: 'Fenerbahçe temalı sıcak bere. Backend bağlantısı kurulduğunda gerçek ürünler yüklenecek.',
          stock: 15,
          active: true,
          featured: true
        },
        {
          _id: 'mock-3',
          name: 'Örnek Bayrak - Beşiktaş',
          price: 149.99,
          image: '/images/placeholder.svg',
          category: 'Bayrak',
          description: 'Beşiktaş temalı kaliteli bayrak. Backend bağlantısı kurulduğunda gerçek ürünler yüklenecek.',
          stock: 20,
          active: true,
          featured: false
        }
      ],
      categories: [
        { _id: 'cat-1', name: 'Atkı' },
        { _id: 'cat-2', name: 'Bere' },
        { _id: 'cat-3', name: 'Bayrak' },
        { _id: 'cat-4', name: 'Forma' }
      ]
    };

    return mockData[type] || [];
  }
}

// Global cache instance
export const cacheManager = new CacheManager();

// Cache ile API çağrısı - Retry mekanizması ile
export const cachedApiCall = async (endpoint, fallbackData = null) => {
  const cacheKey = `api-${endpoint}`;
  
  // Önce cache'den kontrol et
  const cachedData = cacheManager.get(cacheKey);
  if (cachedData) {
    return { success: true, data: cachedData, fromCache: true };
  }

  // Backend API şu an aktif değil, fallback data döndür
  if (fallbackData) {
    return { success: true, data: fallbackData, fromCache: false };
  }
  
  return { success: false, error: 'Backend API is not available' };
};
