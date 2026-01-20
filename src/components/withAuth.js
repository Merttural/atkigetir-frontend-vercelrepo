import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/useAuth';
import LoadingSpinner from './LoadingSpinner';

/**
 * Higher Order Component for authentication
 * User sayfaları için auth kontrolü
 */

// User authentication HOC
export function withUserAuth(Component) {
  return function AuthenticatedComponent(props) {
    const router = useRouter();
    const { user, loading } = useAuth();
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
      if (!loading) {
        if (user) {
          setIsAuthorized(true);
        } else {
          // Kullanıcı giriş yapmamış, login sayfasına yönlendir
          router.push('/login?redirect=' + encodeURIComponent(router.asPath));
        }
      }
    }, [user, loading, router]);

    if (loading) {
      return (
        <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
          <LoadingSpinner size="lg" text="Yükleniyor..." />
        </div>
      );
    }

    if (!isAuthorized) {
      return (
        <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
          <LoadingSpinner size="lg" text="Yönlendiriliyor..." />
        </div>
      );
    }

    return <Component {...props} />;
  };
}

// Default export (for backward compatibility)
export default withUserAuth;
