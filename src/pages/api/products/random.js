// API endpoint: /api/products/random
// Basit rastgele ürün döndürür

// Cache için global değişken
let cachedProducts = null;
let cacheTimestamp = null;
const CACHE_DURATION = 2 * 60 * 1000; // 2 dakika
let isBackendDown = false;

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Cache kontrolü
    if (cachedProducts && cacheTimestamp && (Date.now() - cacheTimestamp) < CACHE_DURATION) {
      console.log('Using cached products');
      return res.status(200).json({ success: true, products: cachedProducts });
    }

    // Backend daha önce down ise ve cache varsa, cache'i kullan
    if (isBackendDown && cachedProducts) {
      console.log('Backend is down, using cached products');
      return res.status(200).json({ success: true, products: cachedProducts });
    }

    // Backend API URL'si
    const backendUrl = process.env.NODE_ENV === 'production' 
      ? 'https://atkigetir-backend.onrender.com' 
      : 'http://localhost:5000';
    
    // Tüm ürünleri al (backend limit 100)
    console.log('Backend URL:', backendUrl);
    const response = await fetch(`${backendUrl}/api/products?limit=100`);
    console.log('Response status:', response.status);
    
    if (!response.ok) {
      console.log('Backend response not ok, using mock data');
      isBackendDown = true;
      
      // Rate limit veya diğer hatalar için mock data döndür
      if (response.status === 429) {
        console.log('Rate limit exceeded, using cached or mock data');
      }
      
      // Backend çalışmıyorsa mock data döndür
      const mockProducts = [
        {
          _id: '1',
          name: 'Örnek Atkı',
          price: 150,
          category: 'atkı',
          image: '/images/placeholder.svg'
        },
        {
          _id: '2', 
          name: 'Örnek Forma',
          price: 200,
          category: 'forma',
          image: '/images/placeholder.svg'
        },
        {
          _id: '3',
          name: 'Örnek Bere',
          price: 100,
          category: 'bere', 
          image: '/images/placeholder.svg'
        },
        {
          _id: '4',
          name: 'Örnek Bayrak',
          price: 80,
          category: 'bayrak',
          image: '/images/placeholder.svg'
        }
      ];
      
      // Mock data'yı cache'e kaydet
      cachedProducts = mockProducts;
      cacheTimestamp = Date.now();
      
      return res.status(200).json({
        success: true,
        products: mockProducts,
        count: mockProducts.length
      });
    }
    
    let data;
    try {
      data = await response.json();
    } catch (jsonError) {
      console.error('JSON parsing error:', jsonError);
      console.log('Backend returned invalid JSON, using mock data');
      isBackendDown = true;
      
      const mockProducts = [
        {
          _id: '1',
          name: 'Örnek Atkı',
          price: 150,
          category: 'atkı',
          image: '/images/placeholder.svg'
        },
        {
          _id: '2',
          name: 'Örnek Forma',
          price: 200,
          category: 'forma',
          image: '/images/placeholder.svg'
        }
      ];
      
      cachedProducts = mockProducts;
      cacheTimestamp = Date.now();
      
      return res.status(200).json({
        success: true,
        products: mockProducts,
        count: mockProducts.length
      });
    }
    
    const allProducts = data.products || [];
    
    if (allProducts.length === 0) {
      return res.status(200).json({
        success: true,
        products: [],
        count: 0
      });
    }
    
    // Her kategoriden 4'er ürün al
    const categories = ['Atkı', 'Forma', 'Bere', 'Bayrak'];
    const randomProducts = [];
    
    for (const category of categories) {
      const productsInCategory = allProducts.filter(p => p.category && p.category.toLowerCase() === category.toLowerCase());
      const shuffled = productsInCategory.sort(() => 0.5 - Math.random());
      randomProducts.push(...shuffled.slice(0, 4));
    }
    
    // Eğer toplamda 16'dan az ürün varsa, kalanını tüm ürünlerden rastgele doldur
    if (randomProducts.length < 16) {
      const remainingNeeded = 16 - randomProducts.length;
      const allShuffled = allProducts.sort(() => 0.5 - Math.random());
      const additionalProducts = allShuffled.filter(p => !randomProducts.some(rp => rp._id === p._id)).slice(0, remainingNeeded);
      randomProducts.push(...additionalProducts);
    }
    
    // Cache'i güncelle
    cachedProducts = randomProducts;
    cacheTimestamp = Date.now();
    isBackendDown = false; // Backend çalışıyor
    
    res.status(200).json({
      success: true,
      products: randomProducts,
      count: randomProducts.length
    });

  } catch (error) {
    console.error('Random products API error:', error);
    
    // Backend bağlantı hatası durumunda mock data döndür
    console.log('Using fallback mock data due to backend connection error');
    isBackendDown = true;
    const mockProducts = [
      {
        _id: '1',
        name: 'Örnek Atkı',
        price: 150,
        category: 'atkı',
        image: '/images/placeholder.svg'
      },
      {
        _id: '2', 
        name: 'Örnek Forma',
        price: 200,
        category: 'forma',
        image: '/images/placeholder.svg'
      },
      {
        _id: '3',
        name: 'Örnek Bere',
        price: 100,
        category: 'bere', 
        image: '/images/placeholder.svg'
      },
      {
        _id: '4',
        name: 'Örnek Bayrak',
        price: 80,
        category: 'bayrak',
        image: '/images/placeholder.svg'
      }
    ];
    
    // Mock data'yı cache'e kaydet
    cachedProducts = mockProducts;
    cacheTimestamp = Date.now();
    
    res.status(200).json({
      success: true,
      products: mockProducts,
      count: mockProducts.length
    });
  }
}