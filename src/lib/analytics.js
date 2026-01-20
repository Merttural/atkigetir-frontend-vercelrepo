/**
 * Analytics Utility - Tüm tracking fonksiyonlarını birleştirir
 * Google Analytics, Google Ads, Meta Pixel ve diğer tracking servisleri için
 */

// Google Analytics 4 (GA4) Configuration
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
export const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
export const GOOGLE_ADS_CONVERSION_LABEL = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL;

/**
 * Google Analytics Page View Tracking
 */
export const pageview = (url) => {
  if (typeof window !== 'undefined' && window.gtag && GA_TRACKING_ID) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

/**
 * Google Analytics Event Tracking
 */
export const event = ({ action, category, label, value }) => {
  if (typeof window !== 'undefined' && window.gtag && GA_TRACKING_ID) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

/**
 * Enhanced Ecommerce Events for GA4
 */
export const ecommerce = {
  // Product view tracking
  view_item: (item) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'view_item', {
        currency: 'TRY',
        value: item.price,
        items: [{
          item_id: item.id,
          item_name: item.name,
          item_category: item.category,
          price: item.price,
          quantity: 1
        }]
      });
    }
  },

  // Add to cart tracking
  add_to_cart: (item) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'add_to_cart', {
        currency: 'TRY',
        value: item.price,
        items: [{
          item_id: item.id,
          item_name: item.name,
          item_category: item.category,
          price: item.price,
          quantity: 1
        }]
      });
    }
  },

  // Purchase tracking
  purchase: (transaction) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'purchase', {
        transaction_id: transaction.id,
        value: transaction.total,
        currency: 'TRY',
        items: transaction.items
      });
    }
  },

  // Search tracking
  search: (search_term) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'search', {
        search_term: search_term
      });
    }
  }
};

/**
 * Google Ads Conversion Tracking
 */
export const googleAds = {
  /**
   * Track purchase conversion
   * @param {string} orderId - Order ID
   * @param {number} value - Order value
   * @param {string} currency - Currency code (default: 'TRY')
   * @param {string} conversionLabel - Optional conversion label (format: 'AW-XXXXXXXXXX/ConversionLabel')
   */
  trackPurchase: (orderId, value, currency = 'TRY', conversionLabel = null) => {
    if (typeof window !== 'undefined' && window.gtag && GOOGLE_ADS_ID) {
      const sendTo = conversionLabel || GOOGLE_ADS_ID;
      window.gtag('event', 'conversion', {
        send_to: sendTo,
        transaction_id: orderId,
        value: value,
        currency: currency,
      });
    }
  },

  /**
   * Track generic conversion event
   * @param {string} conversionLabel - Conversion label (format: 'AW-XXXXXXXXXX/ConversionLabel')
   * @param {number} value - Conversion value (default: 1.0)
   * @param {string} currency - Currency code (default: 'TRY')
   */
  trackConversion: (conversionLabel = null, value = 1.0, currency = 'TRY') => {
    if (typeof window !== 'undefined' && window.gtag) {
      // Eğer conversionLabel belirtilmemişse, environment variable'dan veya GOOGLE_ADS_ID'den oluştur
      const sendTo = conversionLabel || GOOGLE_ADS_CONVERSION_LABEL || GOOGLE_ADS_ID;
      
      if (sendTo) {
        window.gtag('event', 'conversion', {
          send_to: sendTo,
          value: value,
          currency: currency,
        });
      }
    }
  },

  trackAddToCart: (itemId, itemName, value, currency = 'TRY') => {
    if (typeof window !== 'undefined' && window.gtag && GOOGLE_ADS_ID) {
      window.gtag('event', 'add_to_cart', {
        send_to: GOOGLE_ADS_ID,
        currency: currency,
        value: value,
        items: [{
          item_id: itemId,
          item_name: itemName,
          quantity: 1,
          price: value
        }]
      });
    }
  },

  trackViewItem: (itemId, itemName, category, value, currency = 'TRY') => {
    if (typeof window !== 'undefined' && window.gtag && GOOGLE_ADS_ID) {
      window.gtag('event', 'view_item', {
        send_to: GOOGLE_ADS_ID,
        currency: currency,
        value: value,
        items: [{
          item_id: itemId,
          item_name: itemName,
          item_category: category,
          quantity: 1,
          price: value
        }]
      });
    }
  },
};

/**
 * Custom Events for Atkigetir
 */
export const customEvents = {
  // Newsletter signup
  newsletter_signup: (email) => {
    event({
      action: 'newsletter_signup',
      category: 'engagement',
      label: 'email_signup'
    });
  },

  // WhatsApp contact
  whatsapp_contact: (productName = null) => {
    event({
      action: 'whatsapp_contact',
      category: 'contact',
      label: productName || 'general'
    });
  },

  // Phone contact
  phone_contact: () => {
    event({
      action: 'phone_contact',
      category: 'contact',
      label: 'phone'
    });
  },

  // Partner application
  partner_application: (type) => {
    event({
      action: 'partner_application',
      category: 'business',
      label: type
    });
  },

  // Blog read
  blog_read: (article_title) => {
    event({
      action: 'blog_read',
      category: 'content',
      label: article_title
    });
  },

  // Category view
  category_view: (category_name) => {
    event({
      action: 'category_view',
      category: 'navigation',
      label: category_name
    });
  },

  // Filter usage
  filter_used: (filterType, filterValue) => {
    event({
      action: 'filter_used',
      category: 'navigation',
      label: `${filterType}:${filterValue}`
    });
  },

  // Product detail view
  product_view: (productId, productName, category) => {
    event({
      action: 'product_view',
      category: 'ecommerce',
      label: productName
    });
    ecommerce.view_item({
      id: productId,
      name: productName,
      category: category,
      price: 0 // Fiyat bilgisi yoksa 0
    });
  },
};

/**
 * Cookie Consent Check
 * Tracking scriptlerini sadece kullanıcı izin verdiğinde çalıştır
 */
export const shouldTrack = () => {
  if (typeof window === 'undefined') return false;
  
  // Cookie consent kontrolü
  // localStorage'dan cookie consent durumunu kontrol et
  const consent = localStorage.getItem('cookie_consent');
  
  // Consent verilmemişse veya 'false' ise tracking yapma
  if (consent === 'false' || !consent) {
    return false;
  }
  
  return true;
};

/**
 * Initialize Analytics (Cookie consent kontrolü ile)
 */
export const initAnalytics = () => {
  if (!shouldTrack()) {
    return;
  }
  
  // Analytics scriptleri zaten _app.js'de yükleniyor
  // Bu fonksiyon sadece kontrol için
};

export default {
  pageview,
  event,
  ecommerce,
  googleAds,
  customEvents,
  shouldTrack,
  initAnalytics,
};
