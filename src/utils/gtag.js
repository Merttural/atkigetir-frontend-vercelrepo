// Google Analytics 4 (GA4) tracking utilities
// https://developers.google.com/analytics/devguides/collection/gtagjs

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Enhanced Ecommerce events for GA4
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

// Custom events for Atkigetir
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
  whatsapp_contact: () => {
    event({
      action: 'whatsapp_contact',
      category: 'contact',
      label: 'whatsapp'
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
  }
};
