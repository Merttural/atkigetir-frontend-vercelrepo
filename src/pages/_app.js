import '../styles/globals.css';
import Head from 'next/head';
import Layout from '@/components/Layout';
import AdminLayout from '@/components/AdminLayout';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ErrorBoundary from '../components/ErrorBoundary';
import LoadingSpinner from '../components/LoadingSpinner';
import ToastContainer from '../components/Toast';
import { AuthProvider } from '../contexts/AuthContext';

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    
    // Global error handler
    const handleError = (error) => {
      console.error('Global error:', error);
      // Error'u loglama servisine gönderebilirsiniz
    };

    // Global unhandled promise rejection handler
    const handleUnhandledRejection = (event) => {
      console.error('Unhandled promise rejection:', event.reason);
      event.preventDefault();
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);
  
  const isAdmin = mounted && router.pathname.startsWith('/admin');

  return (
    <ErrorBoundary>
      <AuthProvider>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
          <meta name="theme-color" content="#3b82f6" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="apple-mobile-web-app-title" content="Atkigetir" />
          <meta name="msapplication-TileColor" content="#3b82f6" />
          <meta name="msapplication-config" content="/browserconfig.xml" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/icons/icon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/icons/icon-16x16.png" />
        </Head>
        {isAdmin ? (
          <AdminLayout>
            <Component {...pageProps} />
          </AdminLayout>
        ) : (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        )}
        <ToastContainer />
      </AuthProvider>
    </ErrorBoundary>
  );
}
