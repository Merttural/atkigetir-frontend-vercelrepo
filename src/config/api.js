/**
 * API Configuration - Geçici Basit Yapı
 * Backend API'ler şu an aktif değil, bu dosya sadece import hatalarını önlemek için
 * 
 * NOT: Bu dosya gelecekte tamamen kaldırılabilir veya Supabase client ile değiştirilebilir
 */

// Backend API URL (şu an kullanılmıyor)
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.atkigetir.com';

// API Endpoints (şu an kullanılmıyor, sadece import hatalarını önlemek için)
export const API_ENDPOINTS = {
  AUTH: `${API_BASE_URL}/api/auth`,
  AUTH_LOGIN: `${API_BASE_URL}/api/auth/login`,
  AUTH_REGISTER: `${API_BASE_URL}/api/auth/register`,
  AUTH_ME: `${API_BASE_URL}/api/auth/me`,
  AUTH_REFRESH: `${API_BASE_URL}/api/auth/refresh`,
  PRODUCTS: `${API_BASE_URL}/api/products`,
  PRODUCTS_BY_SLUG: (slug) => `${API_BASE_URL}/api/products?slug=${slug}`,
  ORDERS: `${API_BASE_URL}/api/orders`,
  USERS: `${API_BASE_URL}/api/users`,
  CATEGORIES: `${API_BASE_URL}/api/categories`,
  UPLOAD: `${API_BASE_URL}/api/upload`,
};

// Basit fetch wrapper (şu an kullanılmıyor)
export const apiFetch = async (endpoint, options = {}) => {
  throw new Error('Backend API şu an aktif değil. Bu özellik geçici olarak askıya alınmıştır.');
};

export default API_ENDPOINTS;
