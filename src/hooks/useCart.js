import { useState, useEffect } from 'react';

export const useCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(savedCart);
    updateCartCount(savedCart);

    // Real-time cart update listener
    const handleCartUpdate = () => {
      const updatedCart = JSON.parse(localStorage.getItem('cart') || '[]');
      setCartItems(updatedCart);
      updateCartCount(updatedCart);
    };

    window.addEventListener('cart-updated', handleCartUpdate);
    return () => window.removeEventListener('cart-updated', handleCartUpdate);
  }, []);

  const updateCartCount = (items = cartItems) => {
    const count = items.reduce((total, item) => total + (item.quantity || 1), 0);
    setCartCount(count);
  };

  const addToCart = (product) => {
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItemIndex = existingCart.findIndex(item => item._id === product._id);
    
    let message = '';
    if (existingItemIndex > -1) {
      // Ürün zaten sepette varsa miktarını artır
      existingCart[existingItemIndex].quantity += 1;
      message = `${product.name} sepetteki miktarı artırıldı!`;
    } else {
      // Yeni ürün ekle - tüm bilgileri dahil et
      existingCart.push({
        _id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        slug: product.slug,
        category: product.category,
        quantity: 1,
        size: product.size || null
      });
      message = `${product.name} sepete eklendi!`;
    }
    
    localStorage.setItem('cart', JSON.stringify(existingCart));
    setCartItems(existingCart);
    updateCartCount(existingCart);
    
    // Toast notification göster
    if (typeof window !== 'undefined' && window.showToast) {
      window.showToast(message, 'success', 3000);
    }
    
    // Custom event ile anlık güncelleme
    window.dispatchEvent(new Event('cart-updated'));
  };

  const removeFromCart = (itemId) => {
    const updatedCart = cartItems.filter(item => item._id !== itemId);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    updateCartCount(updatedCart);
    window.dispatchEvent(new Event('cart-updated'));
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    const updatedCart = cartItems.map(item => 
      item._id === itemId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    updateCartCount(updatedCart);
    window.dispatchEvent(new Event('cart-updated'));
  };

  const updateItemSize = (itemId, size) => {
    const updatedCart = cartItems.map(item => 
      item._id === itemId ? { ...item, size } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cart-updated'));
  };

  const clearCart = () => {
    setCartItems([]);
    setCartCount(0);
    localStorage.removeItem('cart');
    window.dispatchEvent(new Event('cart-updated'));
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return {
    cartItems,
    cartCount,
    addToCart,
    removeFromCart,
    updateQuantity,
    updateItemSize,
    clearCart,
    getTotalPrice,
    getTotalItems
  };
}; 