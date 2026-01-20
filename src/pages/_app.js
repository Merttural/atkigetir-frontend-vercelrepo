import '../styles/globals.css';
import Head from 'next/head';
import Layout from '@/components/Layout';
import CookieConsent from '@/components/CookieConsent';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ErrorBoundary from '../components/ErrorBoundary';
import LoadingSpinner from '../components/LoadingSpinner';
import ToastContainer from '../components/Toast';
import { AuthProvider } from '../contexts/AuthContext';
import { FilterProvider } from '../contexts/FilterContext';
import Script from 'next/script';
import { pageview, event } from '../lib/analytics';
import { useWebVitals } from '../hooks/useWebVitals';
import { GeistSans } from 'geist/font/sans';

// Analytics IDs
const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;

/**
 * Cookie consent kontrolü
 * Kullanıcı izin vermeden analytics scriptleri yüklenmez
 */
const shouldLoadAnalytics = () => {
  if (typeof window === 'undefined') return false;
  const consent = localStorage.getItem('cookie_consent');
  return consent === 'true';
};

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [analyticsLoaded, setAnalyticsLoaded] = useState(false);
  
  // Web Vitals tracking
  useWebVitals();
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    setMounted(true);
    
    // Cookie consent kontrolü ile analytics yükleme
    if (shouldLoadAnalytics()) {
      setAnalyticsLoaded(true);
    }
    
    // Google Analytics page tracking - optimized
    const handleRouteChange = (url) => {
      // Debounce ile sadece gerekli durumlarda track et
      if (shouldLoadAnalytics()) {
        // setTimeout ile performans sorununu önle
        setTimeout(() => pageview(url), 0);
      }
    };
    
    router.events.on('routeChangeComplete', handleRouteChange);
    
    // Global error handler
    const handleError = (error) => {
      console.error('Global error:', error);
      if (shouldLoadAnalytics() && typeof window !== 'undefined' && window.gtag) {
        event({
          action: 'exception',
          category: 'error',
          label: error.message,
          value: 0
        });
      }
    };

    // Global unhandled promise rejection handler
    const handleUnhandledRejection = (event) => {
      console.error('Unhandled promise rejection:', event.reason);
      event.preventDefault();
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, [router]);
  
  // Cookie consent değiştiğinde analytics'i yükle
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleStorageChange = () => {
      if (shouldLoadAnalytics() && !analyticsLoaded) {
        setAnalyticsLoaded(true);
        // Sayfayı yenile ki scriptler yüklensin
        window.location.reload();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [analyticsLoaded]);
  
  const loadAnalytics = analyticsLoaded && shouldLoadAnalytics();

  return (
    <ErrorBoundary>
      <AuthProvider>
        <FilterProvider>
        <div className={GeistSans.variable}>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
          <meta name="theme-color" content="#2563EB" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="apple-mobile-web-app-title" content="Atkigetir" />
          <meta name="msapplication-TileColor" content="#2563EB" />
          <meta name="msapplication-config" content="/browserconfig.xml" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="icon" href="/images/atkigetirlogo.jpg" type="image/jpeg" />
          <link rel="apple-touch-icon" href="/images/atkigetirlogo.jpg" />
          <link rel="icon" type="image/jpeg" sizes="any" href="/images/atkigetirlogo.jpg" />
        </Head>

        {/* Google Tag Manager - Cookie consent kontrolü ile */}
        {GTM_ID && loadAnalytics && (
          <Script
            id="google-tag-manager"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${GTM_ID}');
              `,
            }}
          />
        )}

        {/* Google Analytics 4 - Cookie consent kontrolü ile */}
        {GA_TRACKING_ID && loadAnalytics && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_TRACKING_ID}', {
                    page_path: window.location.pathname,
                    anonymize_ip: true,
                    cookie_flags: 'SameSite=None;Secure'
                  });
                  ${GOOGLE_ADS_ID ? `gtag('config', '${GOOGLE_ADS_ID}');` : ''}
                `,
              }}
            />
          </>
        )}

        {/* Google Ads (gtag.js) - Cookie consent kontrolü ile */}
        {GOOGLE_ADS_ID && loadAnalytics && !GA_TRACKING_ID && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
            />
            <Script
              id="google-ads"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GOOGLE_ADS_ID}');
                `,
              }}
            />
          </>
        )}

        {/* Meta Pixel - Cookie consent kontrolü ile */}
        {META_PIXEL_ID && loadAnalytics && (
          <>
            <Script
              id="meta-pixel"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  !function(f,b,e,v,n,t,s)
                  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                  n.queue=[];t=b.createElement(e);t.async=!0;
                  t.src=v;s=b.getElementsByTagName(e)[0];
                  s.parentNode.insertBefore(t,s)}(window, document,'script',
                  'https://connect.facebook.net/en_US/fbevents.js');
                  fbq('init', '${META_PIXEL_ID}');
                  fbq('track', 'PageView');
                `,
              }}
            />
            <noscript>
              <img
                height="1"
                width="1"
                style={{ display: 'none' }}
                src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
                alt=""
              />
            </noscript>
          </>
        )}

        {/* Cookie Consent Banner */}
        {mounted && <CookieConsent />}

        <Layout>
          <Component {...pageProps} />
        </Layout>
        <ToastContainer />
        </div>
        </FilterProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}
