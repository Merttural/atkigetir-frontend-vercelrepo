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
      console.log(`⏰ Cache expired: ${key}`);
      return null;
    }

    console.log(`✅ Cache hit: ${key}`);
    return item.data;
  }

  clear() {
    this.cache.clear();
    console.log('🗑️ Cache cleared');
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

  // Cache'de yoksa API'yi retry ile dene - ÇOK AGRESİF
  const maxRetries = 20; // 10'dan 20'ye çıkarıldı
  const retryDelay = 500; // 1 saniyeden 0.5 saniyeye düşürüldü
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`🔍 Attempt ${attempt}/${maxRetries} - Trying backend...`);
      
      const baseUrls = [
        'https://atkigetir-backend.onrender.com',
        'https://api.atkigetir.com',
        process.env.NEXT_PUBLIC_API_URL
      ].filter(Boolean);

      for (const baseUrl of baseUrls) {
        try {
          console.log(`🔍 Trying ${baseUrl}${endpoint}`);
          const response = await fetch(`${baseUrl}${endpoint}`);
          
          if (response.ok) {
            const data = await response.json();
            console.log(`✅ API success: ${baseUrl}`);
            
            // Başarılı response'u cache'e kaydet
            cacheManager.set(cacheKey, data);
            
            return { success: true, data, fromCache: false, url: baseUrl };
          } else if (response.status === 429) {
            console.log(`⚠️ Rate limit on ${baseUrl} (attempt ${attempt})`);
            // Rate limit varsa biraz bekle ve tekrar dene
            if (attempt < maxRetries) {
              console.log(`⏳ Waiting ${retryDelay}ms before retry...`);
              await new Promise(resolve => setTimeout(resolve, retryDelay));
              continue;
            }
          } else {
            console.log(`❌ Error ${response.status} on ${baseUrl}`);
            continue;
          }
        } catch (error) {
          console.log(`❌ Network error on ${baseUrl}:`, error.message);
          continue;
        }
      }
      
      // Bu attempt'te başarısız, bir sonraki attempt için bekle
      if (attempt < maxRetries) {
        console.log(`⏳ Waiting ${retryDelay}ms before next attempt...`);
        await new Promise(resolve => setTimeout(resolve, retryDelay));
      }
      
    } catch (error) {
      console.error(`❌ Attempt ${attempt} failed:`, error);
      if (attempt < maxRetries) {
        console.log(`⏳ Waiting ${retryDelay}ms before retry...`);
        await new Promise(resolve => setTimeout(resolve, retryDelay));
      }
    }
  }

  // Tüm retry'lar başarısız
  console.log('❌ All retry attempts failed - Backend is not responding');
  return { success: false, error: 'Backend is not responding after multiple attempts' };
};
