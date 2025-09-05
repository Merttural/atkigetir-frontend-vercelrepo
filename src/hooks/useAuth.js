import { useState, useEffect } from 'react';
import { apiFetch } from '../config/api';
import { jwtDecode } from 'jwt-decode';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get user from token (for Navbar compatibility)
  const getUserFromToken = () => {
    if (typeof window === 'undefined') return null;
    const token = localStorage.getItem('accessToken');
    if (!token) return null;
    try {
      return jwtDecode(token);
    } catch (err) {
      console.error('jwtDecode error:', err, 'token:', token);
      return null;
    }
  };

  // Check if user is logged in on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        setLoading(false);
        return;
      }

      const data = await apiFetch('/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      setUser(data.data.user);
    } catch (error) {
      console.error('Auth check failed:', error);
      // Token expired, try refresh
      await refreshToken();
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

      const data = await apiFetch('/api/auth/refresh', {
        method: 'POST',
        body: JSON.stringify({ refreshToken })
      });

      localStorage.setItem('accessToken', data.data.accessToken);
      localStorage.setItem('refreshToken', data.data.refreshToken);
      
      // Re-check auth with new token
      await checkAuth();
    } catch (error) {
      console.error('Token refresh failed:', error);
      logout();
    }
  };

  const login = async (email, password) => {
    try {
      setError(null);
      const data = await apiFetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      });

      localStorage.setItem('accessToken', data.data.accessToken);
      localStorage.setItem('refreshToken', data.data.refreshToken);
      localStorage.setItem('user', JSON.stringify(data.data.user));
      setUser(data.data.user);
      
      window.dispatchEvent(new Event('user-logged-in'));
      return { success: true, user: data.data.user };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    setUser(null);
    window.dispatchEvent(new Event('user-logged-out'));
  };

  const register = async (userData) => {
    try {
      setError(null);
      const data = await apiFetch('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData)
      });

      return { success: true, message: data.message };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
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