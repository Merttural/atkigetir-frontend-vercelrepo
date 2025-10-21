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

// Fallback API çağrısı
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
        console.log(`Success with ${baseUrl}`);
        return { success: true, data, url: baseUrl };
      }
    } catch (error) {
      console.log(`Failed with ${baseUrl}:`, error.message);
    }
  }
  
  return { success: false, error: 'All API endpoints failed' };
};
