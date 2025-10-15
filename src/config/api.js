// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// API timeout configuration
const API_TIMEOUT = 30000; // 30 seconds

// Enhanced API fetch function with timeout, error handling, and token refresh
export const apiFetch = async (endpoint, options = {}) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);

  try {
    // Add access token to headers if available
    const accessToken = localStorage.getItem('accessToken');
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (accessToken) {
      headers['Authorization'] = `Bearer ${accessToken}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      signal: controller.signal,
      headers,
    });

    clearTimeout(timeoutId);

    if (response.status === 401) {
      // Token expired, try to refresh
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken && endpoint !== '/api/auth/refresh') {
        try {
          const refreshResponse = await fetch(`${API_BASE_URL}/api/auth/refresh`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refreshToken })
          });

          if (refreshResponse.ok) {
            const refreshData = await refreshResponse.json();
            localStorage.setItem('accessToken', refreshData.data.accessToken);
            localStorage.setItem('refreshToken', refreshData.data.refreshToken);

            // Retry original request with new token
            const newHeaders = {
              ...headers,
              'Authorization': `Bearer ${refreshData.data.accessToken}`
            };

            const retryResponse = await fetch(`${API_BASE_URL}${endpoint}`, {
              ...options,
              signal: controller.signal,
              headers: newHeaders,
            });

            if (!retryResponse.ok) {
              const errorData = await retryResponse.json().catch(() => ({}));
              throw new Error(errorData.message || `HTTP error! status: ${retryResponse.status}`);
            }

            return await retryResponse.json();
          } else {
            // Refresh failed, logout user
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('user');
            window.dispatchEvent(new Event('user-logged-out'));
            throw new Error('Session expired. Please login again.');
          }
        } catch (refreshError) {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('user');
          window.dispatchEvent(new Event('user-logged-out'));
          throw new Error('Session expired. Please login again.');
        }
      }
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
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