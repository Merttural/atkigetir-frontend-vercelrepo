import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

// Admin sayfaları için auth kontrolü
export function withAdminAuth(WrappedComponent) {
  return function WithAdminAuthComponent(props) {
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const checkAuth = () => {
        const accessToken = localStorage.getItem('accessToken');
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        
        if (!accessToken) {
          router.push('/login?redirect=' + router.pathname);
          return;
        }

        if (user.role !== 'admin') {
          router.push('/login?message=Admin yetkisi gerekli');
          return;
        }

        setIsAuthorized(true);
        setLoading(false);
      };

      checkAuth();
    }, [router]);

    if (loading) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Yetki kontrol ediliyor...</p>
          </div>
        </div>
      );
    }

    if (!isAuthorized) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
}

// Kullanıcı sayfaları için auth kontrolü
export function withUserAuth(WrappedComponent) {
  return function WithUserAuthComponent(props) {
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const checkAuth = () => {
        const accessToken = localStorage.getItem('accessToken');
        
        if (!accessToken) {
          router.push('/login?redirect=' + router.pathname);
          return;
        }

        setIsAuthorized(true);
        setLoading(false);
      };

      checkAuth();
    }, [router]);

    if (loading) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Giriş kontrol ediliyor...</p>
          </div>
        </div>
      );
    }

    if (!isAuthorized) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
}

// Auth durumunu kontrol eden hook
export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = JSON.parse(localStorage.getItem('user') || 'null');
    
    if (token && userData) {
      setUser(userData);
    }
    
    setLoading(false);
  }, []);

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    setUser(null);
  };

  return { user, loading, logout };
} 