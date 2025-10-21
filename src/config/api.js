// import { rateLimitFetch, retryWithBackoff } from '../utils/requestQueue';

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 
  (process.env.NODE_ENV === 'production' ? 'https://atkigetir-backend.onrender.com' : 'http://localhost:5000');

// API timeout configuration - Production için artırıldı
const API_TIMEOUT = process.env.NODE_ENV === 'production' ? 60000 : 30000; // Production: 60 saniye, Development: 30 saniye

// Enhanced API fetch function with timeout, error handling, and token refresh
export const apiFetch = async (endpoint, options = {}) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);

  try {
    // Get token from localStorage (try both token keys)
    const token = localStorage.getItem('token') || localStorage.getItem('accessToken');
    
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...options.headers,
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    // Clean URL to avoid double slashes
    const cleanUrl = `${API_BASE_URL}${endpoint}`.replace(/\/+/g, '/');
    console.log('🔗 API Request:', cleanUrl);
    
    const response = await fetch(cleanUrl, {
      ...options,
      signal: controller.signal,
      headers,
    });

    clearTimeout(timeoutId);

    // Handle 401 Unauthorized
    if (response.status === 401) {
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken && endpoint !== '/api/auth/refresh') {
        try {
          const refreshUrl = `${API_BASE_URL}/api/auth/refresh`.replace(/\/+/g, '/');
          const refreshResponse = await fetch(refreshUrl, {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify({ refreshToken })
          });

          if (refreshResponse.ok) {
            let refreshData;
            try {
              const contentType = refreshResponse.headers.get('content-type');
              if (contentType && contentType.includes('application/json')) {
                refreshData = await refreshResponse.json();
              } else {
                const textResponse = await refreshResponse.text();
                console.log('Refresh response (non-JSON):', textResponse);
                throw new Error('Geçersiz refresh response formatı');
              }
            } catch (jsonError) {
              console.error('Refresh JSON parsing error:', jsonError);
              throw new Error('Token yenileme başarısız - geçersiz response');
            }
            
            // Store new tokens
            if (refreshData.token) {
              localStorage.setItem('token', refreshData.token);
            }
            if (refreshData.accessToken) {
              localStorage.setItem('accessToken', refreshData.accessToken);
            }
            if (refreshData.refreshToken) {
              localStorage.setItem('refreshToken', refreshData.refreshToken);
            }

            // Retry original request with new token
            const newToken = refreshData.token || refreshData.accessToken;
            const newHeaders = {
              ...headers,
              'Authorization': `Bearer ${newToken}`
            };

            const retryResponse = await fetch(cleanUrl, {
              ...options,
              signal: controller.signal,
              headers: newHeaders,
            });

            if (!retryResponse.ok) {
              let errorData = {};
              try {
                const contentType = retryResponse.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                  errorData = await retryResponse.json();
                } else {
                  const textResponse = await retryResponse.text();
                  console.log('Retry error response (non-JSON):', textResponse);
                }
              } catch (jsonError) {
                console.error('Retry error JSON parsing error:', jsonError);
              }
              throw new Error(errorData.message || `HTTP error! status: ${retryResponse.status}`);
            }

            let retryData;
            try {
              const contentType = retryResponse.headers.get('content-type');
              if (contentType && contentType.includes('application/json')) {
                retryData = await retryResponse.json();
              } else {
                const textResponse = await retryResponse.text();
                console.log('Retry success response (non-JSON):', textResponse);
                throw new Error('Geçersiz retry response formatı');
              }
            } catch (jsonError) {
              console.error('Retry success JSON parsing error:', jsonError);
              throw new Error('Retry yanıtı işlenemedi - geçersiz format');
            }

            return retryData;
          } else {
            // Refresh failed, logout user
            localStorage.removeItem('token');
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('user');
            window.dispatchEvent(new Event('user-logged-out'));
            throw new Error('Session expired. Please login again.');
          }
        } catch (refreshError) {
          console.error('Token refresh failed:', refreshError);
          localStorage.removeItem('token');
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('user');
          window.dispatchEvent(new Event('user-logged-out'));
          throw new Error('Session expired. Please login again.');
        }
      } else {
        // No refresh token, logout user
        localStorage.removeItem('token');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        window.dispatchEvent(new Event('user-logged-out'));
        throw new Error('Session expired. Please login again.');
      }
    }

    if (!response.ok) {
      let errorData = {};
      try {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          errorData = await response.json();
        } else {
          const textResponse = await response.text();
          console.log('API error response (non-JSON):', textResponse);
        }
      } catch (jsonError) {
        console.error('API error JSON parsing error:', jsonError);
        console.log('Response status:', response.status);
        console.log('Response headers:', Object.fromEntries(response.headers.entries()));
      }
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    let successData;
    try {
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        successData = await response.json();
      } else {
        const textResponse = await response.text();
        console.log('API success response (non-JSON):', textResponse);
        throw new Error('Geçersiz response formatı');
      }
    } catch (jsonError) {
      console.error('API success JSON parsing error:', jsonError);
      throw new Error('API yanıtı işlenemedi - geçersiz format');
    }
    
    return successData;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new Error('İstek zaman aşımına uğradı. Lütfen tekrar deneyin.');
    }
    throw error;
  }
};

export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: `${API_BASE_URL}/api/auth`,
  AUTH_LOGIN: `${API_BASE_URL}/api/auth/login`,
  AUTH_REGISTER: `${API_BASE_URL}/api/auth/register`,
  AUTH_ME: `${API_BASE_URL}/api/auth/me`,
  AUTH_REFRESH: `${API_BASE_URL}/api/auth/refresh`,
  
  // Product endpoints
  PRODUCTS: `${API_BASE_URL}/api/products`,
  PRODUCTS_BY_SLUG: (slug) => `${API_BASE_URL}/api/products?slug=${slug}`,
  
  // Order endpoints
  ORDERS: `${API_BASE_URL}/api/orders`,
  ORDERS_STATS: `${API_BASE_URL}/api/orders?stats=1`,
  ORDERS_RECENT: `${API_BASE_URL}/api/orders?recent=1`,
  ORDERS_BESTSELLERS: `${API_BASE_URL}/api/orders?bestsellers=1`,
  
  // User endpoints
  USERS: `${API_BASE_URL}/api/users`,
  
  // Category endpoints
  CATEGORIES: `${API_BASE_URL}/api/categories`,
  
  // Upload endpoints
  UPLOAD: `${API_BASE_URL}/api/upload`,
  
  // Payment endpoints
  PAYMENT: `${API_BASE_URL}/api/payment`,
  PAYMENT_CALLBACK: `${API_BASE_URL}/api/payment/callback`,
};

export default API_ENDPOINTS;