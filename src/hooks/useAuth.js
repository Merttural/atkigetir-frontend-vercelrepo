import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Environment-based API URL
  const getApiUrl = () => {
    if (typeof window === 'undefined') return 'http://localhost:5000';
    return process.env.NODE_ENV === 'production' 
      ? 'https://atkigetir-backend.onrender.com' 
      : 'http://localhost:5000';
  };

  // Get user from token
  const getUserFromToken = () => {
    if (typeof window === 'undefined') return null;
    
    // Try different token keys
    const token = localStorage.getItem('token') || localStorage.getItem('accessToken');
    if (!token) return null;
    
    try {
      const decoded = jwtDecode(token);
      return decoded;
    } catch (err) {
      console.error('jwtDecode error:', err);
      return null;
    }
  };

  // Check if user is logged in on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      setLoading(true);
      
      // Check if user exists in localStorage
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        setLoading(false);
        return;
      }

      // Try to get user from token
      const tokenUser = getUserFromToken();
      if (tokenUser) {
        setUser(tokenUser);
        setLoading(false);
        return;
      }

      // If no stored data, try API call
      const token = localStorage.getItem('token') || localStorage.getItem('accessToken');
      if (!token) {
        setLoading(false);
        return;
      }

      const apiUrl = getApiUrl();
      const response = await fetch(`${apiUrl}/api/auth/me`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user || data);
        localStorage.setItem('user', JSON.stringify(data.user || data));
      } else {
        // Token invalid, clear storage
        logout();
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setError(null);
      setLoading(true);
      
      const apiUrl = getApiUrl();
      const response = await fetch(`${apiUrl}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${response.status}: Giriş başarısız`);
      }

      const data = await response.json();
      
      // Backend'den gelen response'u kontrol et
      if (data.error) {
        throw new Error(data.error || "Giriş başarısız");
      }

      // Store tokens and user data
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
      if (data.accessToken) {
        localStorage.setItem('accessToken', data.accessToken);
      }
      if (data.refreshToken) {
        localStorage.setItem('refreshToken', data.refreshToken);
      }
      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
      }
      
      // Dispatch login event
      window.dispatchEvent(new Event('user-logged-in'));
      
      return { success: true, user: data.user };
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    // Clear all auth-related data
    localStorage.removeItem('token');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    localStorage.removeItem('rememberMe');
    
    setUser(null);
    setError(null);
    
    // Dispatch logout event
    window.dispatchEvent(new Event('user-logged-out'));
  };

  const register = async (userData) => {
    try {
      setError(null);
      setLoading(true);
      
      const apiUrl = getApiUrl();
      const response = await fetch(`${apiUrl}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${response.status}: Kayıt başarısız`);
      }

      const data = await response.json();
      return { success: true, message: data.message || "Kayıt başarılı" };
    } catch (error) {
      console.error('Register error:', error);
      setError(error.message);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const refreshToken = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        logout();
        return;
      }

      const apiUrl = getApiUrl();
      const response = await fetch(`${apiUrl}/api/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ refreshToken })
      });

      if (!response.ok) {
        logout();
        return;
      }

      const data = await response.json();
      
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
      if (data.accessToken) {
        localStorage.setItem('accessToken', data.accessToken);
      }
      if (data.refreshToken) {
        localStorage.setItem('refreshToken', data.refreshToken);
      }
      
      return data;
    } catch (error) {
      console.error('Token refresh failed:', error);
      logout();
    }
  };

  return {
    user,
    loading,
    error,
    login,
    logout,
    register,
    checkAuth,
    refreshToken,
    getUserFromToken,
    isAuthenticated: !!user
  };
};