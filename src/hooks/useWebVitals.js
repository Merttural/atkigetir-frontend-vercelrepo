import { useEffect } from 'react';
import * as gtag from '../utils/gtag';

export const useWebVitals = () => {
  useEffect(() => {
    // Core Web Vitals tracking
    const sendWebVitals = (metric) => {
      // Google Analytics'e gönder
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', metric.name, {
          value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
          event_label: metric.id,
          non_interaction: true,
        });
      }

      // Console'a log (development için)
      if (process.env.NODE_ENV === 'development') {
        console.log('Web Vital:', metric);
      }
    };

    // Web Vitals library'sini dinamik olarak yükle
    const loadWebVitals = async () => {
      try {
        const webVitals = await import('web-vitals');
        
        // Destructuring ile güvenli import
        if (webVitals.getCLS) webVitals.getCLS(sendWebVitals);
        if (webVitals.getFID) webVitals.getFID(sendWebVitals);
        if (webVitals.getFCP) webVitals.getFCP(sendWebVitals);
        if (webVitals.getLCP) webVitals.getLCP(sendWebVitals);
        if (webVitals.getTTFB) webVitals.getTTFB(sendWebVitals);
      } catch (error) {
        console.error('Web Vitals yüklenemedi:', error);
      }
    };

    loadWebVitals();
  }, []);
};

// Core Web Vitals threshold'ları
export const WEB_VITALS_THRESHOLDS = {
  LCP: {
    good: 2500,
    needsImprovement: 4000,
    poor: Infinity
  },
  FID: {
    good: 100,
    needsImprovement: 300,
    poor: Infinity
  },
  CLS: {
    good: 0.1,
    needsImprovement: 0.25,
    poor: Infinity
  }
};

// Web Vitals skorunu değerlendir
export const getWebVitalScore = (name, value) => {
  const threshold = WEB_VITALS_THRESHOLDS[name];
  if (!threshold) return 'unknown';

  if (value <= threshold.good) return 'good';
  if (value <= threshold.needsImprovement) return 'needs-improvement';
  return 'poor';
};

// Web Vitals skorunu renk koduna çevir
export const getWebVitalColor = (score) => {
  switch (score) {
    case 'good': return 'text-green-600';
    case 'needs-improvement': return 'text-yellow-600';
    case 'poor': return 'text-red-600';
    default: return 'text-gray-600';
  }
};
