// API Test Utility - Backend bağlantısını test etmek için
export const testBackendConnection = async () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://atkigetir-backend.onrender.com';
  
  console.log('🔍 Testing backend connection...');
  console.log('API URL:', apiUrl);
  console.log('NODE_ENV:', process.env.NODE_ENV);
  
  try {
    const response = await fetch(`${apiUrl}/api/products`);
    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));
    
    if (response.ok) {
      const data = await response.json();
      console.log('Products count:', data.products?.length || 0);
      console.log('First product:', data.products?.[0]?.name || 'No products');
      return { success: true, data };
    } else {
      console.error('Backend error:', response.status, response.statusText);
      return { success: false, error: `HTTP ${response.status}` };
    }
  } catch (error) {
    console.error('Backend connection error:', error);
    return { success: false, error: error.message };
  }
};

// Fallback API çağrısı - Rate limit handling ile
export const fallbackApiCall = async (endpoint) => {
  const baseUrls = [
    'https://atkigetir-backend.onrender.com',
    'https://api.atkigetir.com',
    process.env.NEXT_PUBLIC_API_URL
  ].filter(Boolean);
  
  for (const baseUrl of baseUrls) {
    try {
      console.log(`Trying ${baseUrl}${endpoint}`);
      const response = await fetch(`${baseUrl}${endpoint}`);
      
      if (response.ok) {
        const data = await response.json();
        console.log(`✅ Success with ${baseUrl}`);
        return { success: true, data, url: baseUrl };
      } else if (response.status === 429) {
        console.log(`⚠️ Rate limit on ${baseUrl}, trying next...`);
        // Rate limit varsa diğer endpoint'i dene
        continue;
      } else {
        console.log(`❌ Error ${response.status} on ${baseUrl}`);
        continue;
      }
    } catch (error) {
      console.log(`❌ Failed with ${baseUrl}:`, error.message);
    }
  }
  
  // Tüm endpoint'ler başarısız oldu, mock data döndür
  console.log('⚠️ All endpoints failed, using mock data');
  return { 
    success: true, 
    data: { 
      products: [
        {
          _id: 'mock-1',
          name: 'Örnek Atkı',
          price: 299.99,
          image: '/images/placeholder.svg',
          category: 'Atkı',
          description: 'Bu bir örnek üründür. Backend bağlantısı kurulduğunda gerçek ürünler yüklenecek.',
          stock: 10,
          active: true
        }
      ]
    }, 
    url: 'mock-data' 
  };
};
