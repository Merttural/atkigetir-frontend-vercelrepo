// Google Ads Conversion Tracking Utilities

export const trackPurchase = (orderId, value, currency = 'TRY') => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'purchase', {
      transaction_id: orderId,
      value: value,
      currency: currency,
      send_to: 'AW-11457126126' // Google Ads Conversion ID'niz
    });
  }
};

export const trackAddToCart = (itemId, itemName, value, currency = 'TRY') => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'add_to_cart', {
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
};

export const trackViewItem = (itemId, itemName, category, value, currency = 'TRY') => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'view_item', {
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
};

export const trackBeginCheckout = (value, currency = 'TRY', items = []) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'begin_checkout', {
      currency: currency,
      value: value,
      items: items
    });
  }
};

export const trackPageView = (page_title, page_location) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'AW-11457126126', {
      page_title: page_title,
      page_location: page_location
    });
  }
};
