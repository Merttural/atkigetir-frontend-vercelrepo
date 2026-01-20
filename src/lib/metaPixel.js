/**
 * Meta Pixel (Facebook Pixel) Integration
 * Facebook/Meta reklam tracking için
 */

export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

/**
 * Cookie Consent Check
 */
const shouldTrack = () => {
  if (typeof window === 'undefined') return false;
  
  const consent = localStorage.getItem('cookie_consent');
  return consent === 'true';
};

/**
 * Meta Pixel Event Tracking
 */
export const trackEvent = (eventName, parameters = {}) => {
  if (typeof window !== 'undefined' && window.fbq && shouldTrack()) {
    window.fbq('track', eventName, parameters);
  }
};

/**
 * Meta Pixel Custom Event Tracking
 */
export const trackCustomEvent = (eventName, parameters = {}) => {
  if (typeof window !== 'undefined' && window.fbq && shouldTrack()) {
    window.fbq('trackCustom', eventName, parameters);
  }
};

/**
 * Meta Pixel Events for Atkigetir
 */
export const metaPixelEvents = {
  // PageView - Otomatik olarak _app.js'de yapılıyor
  
  // ViewContent - Ürün detay görüntüleme
  viewContent: (productId, productName, category, value) => {
    trackEvent('ViewContent', {
      content_name: productName,
      content_category: category,
      content_ids: [productId],
      value: value,
      currency: 'TRY',
    });
  },

  // AddToCart - Sepete ekleme
  addToCart: (productId, productName, value, quantity = 1) => {
    trackEvent('AddToCart', {
      content_name: productName,
      content_ids: [productId],
      value: value,
      currency: 'TRY',
      quantity: quantity,
    });
  },

  // InitiateCheckout - Ödemeye geçiş
  initiateCheckout: (value, items = []) => {
    trackEvent('InitiateCheckout', {
      value: value,
      currency: 'TRY',
      num_items: items.length,
      content_ids: items.map(item => item.id),
    });
  },

  // Purchase - Satın alma
  purchase: (orderId, value, items = []) => {
    trackEvent('Purchase', {
      value: value,
      currency: 'TRY',
      content_ids: items.map(item => item.id),
      content_type: 'product',
      order_id: orderId,
    });
  },

  // Search - Arama
  search: (searchTerm) => {
    trackEvent('Search', {
      search_string: searchTerm,
    });
  },

  // Contact - WhatsApp/Telefon iletişim
  contact: (method = 'whatsapp', productName = null) => {
    trackCustomEvent('Contact', {
      contact_method: method,
      product_name: productName,
    });
  },

  // Lead - Potansiyel müşteri (form gönderimi, WhatsApp iletişim)
  lead: (source = 'whatsapp') => {
    trackEvent('Lead', {
      content_name: 'Contact Form',
      source: source,
    });
  },
};

/**
 * Initialize Meta Pixel
 * _app.js'de script yüklendikten sonra çağrılır
 */
export const initMetaPixel = () => {
  if (!META_PIXEL_ID || !shouldTrack()) {
    return;
  }

  if (typeof window !== 'undefined' && window.fbq) {
    // Pixel zaten yüklü, sadece pageview gönder
    window.fbq('track', 'PageView');
  }
};

export default {
  trackEvent,
  trackCustomEvent,
  metaPixelEvents,
  initMetaPixel,
};
