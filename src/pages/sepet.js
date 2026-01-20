import React, { useState } from 'react';
import SEO from '@/components/SEO';
import Breadcrumbs from '@/components/Breadcrumbs';
import DisabledFeatureModal from '@/components/DisabledFeatureModal';
import EmptyState from '@/components/EmptyState';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useCart } from '@/hooks/useCart';
import LoadingSpinner from '@/components/LoadingSpinner';
import { ShoppingBag, Plus, Minus, Trash2, ArrowRight, MessageCircle, AlertCircle, Wrench } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SepetPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showDisabledModal, setShowDisabledModal] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    surname: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: ''
  });

  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    updateItemSize, 
    getTotalPrice,
    clearCart 
  } = useCart();

  const handlePayment = () => {
    setShowDisabledModal(true);
  };
  
  const handleWhatsApp = () => {
    const items = cartItems.map(item => `${item.name} (${item.quantity}x)`).join(', ');
    const message = `Merhaba, sepetimdeki ürünler için fiyat almak istiyorum:\n${items}\n\nToplam: ${getTotalPrice().toFixed(2)} TL`;
    
    // Google Ads conversion tracking
    googleAds.trackConversion();
    
    window.open(`https://wa.me/905337498266?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

  if (cartItems.length === 0) {
    return (
      <>
        <SEO
          title="Sepet - Atkigetir"
          description="Sepetinizde ürün bulunmuyor. Atkigetir'de kaliteli atkı, bere ve aksesuar ürünlerini keşfedin."
          keywords="sepet, alışveriş, atkı, bere, aksesuar"
          url="/sepet"
        />
        <div className="bg-[#F8FAFC] min-h-screen flex items-center justify-center py-12 px-4">
          <div className="max-w-md mx-auto w-full">
            <EmptyState
              type="cart"
              title="Sepetiniz Boş"
              description="Henüz sepetinize ürün eklemediniz. Ürünleri keşfedin ve sepetinize ekleyin."
            />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO
        title={`Sepet (${cartItems.length} ürün) - Atkigetir`}
        description={`Sepetinizde ${cartItems.length} ürün bulunuyor. Toplam: ${getTotalPrice().toFixed(2)} TL. Güvenli ödeme ile siparişinizi tamamlayın.`}
        keywords="sepet, alışveriş, ödeme, atkı, bere, aksesuar"
        url="/sepet"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "ShoppingCart",
          "name": "Atkigetir Sepet",
          "description": "Alışveriş sepeti",
          "numberOfItems": cartItems.length,
          "price": getTotalPrice().toFixed(2),
          "priceCurrency": "TRY",
          "url": "https://atkigetir.com/sepet"
        }}
      />
      
      <div className="bg-[#F8FAFC] min-h-screen py-6">
        <div className="max-w-7xl mx-auto px-4">
          <Breadcrumbs items={[
            { name: 'Anasayfa', href: '/' },
            { name: 'Sepet', href: '/sepet' }
          ]} />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h1 className="text-3xl font-bold text-[#0F172A] mb-6 tracking-tighter">Alışveriş Sepeti</h1>
            
            {/* Bakımda Banner */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-6 p-5 bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-xl"
            >
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0" aria-hidden="true">
                  <Wrench className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-[#0F172A] mb-1 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-yellow-600" aria-hidden="true" />
                    Online Ödeme Geçici Olarak Bakımda
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-3">
                    Online ödeme sistemi şu anda bakım aşamasındadır. Sepetinizdeki ürünler için fiyat almak ve sipariş vermek için WhatsApp veya telefon ile iletişime geçebilirsiniz.
                  </p>
                  <motion.a
                    href="https://wa.me/905337498266"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-[#22C55E] to-[#16A34A] text-white py-2.5 px-4 rounded-lg font-semibold hover:from-[#16A34A] hover:to-[#15803d] transition-all shadow-md hover:shadow-[0_0_25px_rgba(34,197,94,0.4)] text-sm group"
                    aria-label="WhatsApp üzerinden sipariş ver"
                  >
                    <MessageCircle className="w-4 h-4" aria-hidden="true" />
                    <span>WhatsApp'tan Sipariş Ver</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true" />
                  </motion.a>
                </div>
              </div>
            </motion.div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Sepet Ürünleri */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-[24px] shadow-sm border border-slate-200 p-6">
                  <h2 className="text-xl font-semibold text-[#0F172A] mb-6 tracking-tight">Sepetinizdeki Ürünler</h2>
                  
                  <div className="space-y-4">
                    {cartItems.map((item, index) => (
                      <motion.div
                        key={item._id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center gap-4 p-4 border border-slate-200 rounded-xl hover:shadow-md transition-all"
                      >
                        <div className="w-20 h-20 flex-shrink-0 relative rounded-xl overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100">
                          <Image
                            src={item.image || '/images/placeholder.svg'}
                            alt={item.name}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-[#0F172A] truncate mb-1">{item.name}</h3>
                          {item.category && (
                            <p className="text-xs text-slate-500 mb-1">{item.category}</p>
                          )}
                          {item.size && (
                            <p className="text-xs text-[#2563EB] font-medium mb-2">Beden: {item.size}</p>
                          )}
                          <p className="text-lg font-bold bg-gradient-to-r from-[#2563EB] to-[#1e40af] bg-clip-text text-transparent">
                            ₺{item.price}
                          </p>
                        </div>
                        
                        <div className="flex flex-col items-end gap-3">
                          <div className="flex items-center gap-2 bg-slate-100 rounded-lg p-1" role="group" aria-label={`${item.name} miktarı`}>
                            <motion.button
                              onClick={() => updateQuantity(item._id, item.quantity - 1)}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="w-7 h-7 rounded-lg bg-white hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"
                              aria-label={`${item.name} miktarını azalt`}
                            >
                              <Minus className="w-4 h-4" aria-hidden="true" />
                            </motion.button>
                            <span className="w-8 text-center font-semibold text-[#0F172A]" aria-label={`Miktar: ${item.quantity}`}>{item.quantity}</span>
                            <motion.button
                              onClick={() => updateQuantity(item._id, item.quantity + 1)}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="w-7 h-7 rounded-lg bg-white hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"
                              aria-label={`${item.name} miktarını artır`}
                            >
                              <Plus className="w-4 h-4" aria-hidden="true" />
                            </motion.button>
                          </div>
                          
                          <motion.button
                            onClick={() => removeFromCart(item._id)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="text-red-500 hover:text-red-700 text-sm font-medium flex items-center gap-1"
                            aria-label={`${item.name} ürününü sepetten kaldır`}
                          >
                            <Trash2 className="w-4 h-4" aria-hidden="true" />
                            <span>Kaldır</span>
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-slate-200">
                    <motion.button
                      onClick={clearCart}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="text-red-600 hover:text-red-800 font-medium flex items-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Sepeti Temizle</span>
                    </motion.button>
                  </div>
                </div>
              </div>
              
              {/* Ödeme Özeti */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-[24px] shadow-sm border border-slate-200 p-6 sticky top-4">
                  <h2 className="text-xl font-semibold text-[#0F172A] mb-6 tracking-tight">Ödeme Özeti</h2>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-slate-600">
                      <span>Ürün Sayısı:</span>
                      <span className="font-semibold text-[#0F172A]">{cartItems.length}</span>
                    </div>
                    
                    <div className="flex justify-between items-baseline pt-4 border-t border-slate-200">
                      <span className="text-lg font-semibold text-[#0F172A]">Toplam:</span>
                      <span className="text-2xl font-bold bg-gradient-to-r from-[#2563EB] to-[#1e40af] bg-clip-text text-transparent">
                        ₺{getTotalPrice().toFixed(2)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <motion.button
                      onClick={handlePayment}
                      disabled={true}
                      className="w-full bg-slate-300 text-slate-500 py-3.5 px-4 rounded-xl font-semibold cursor-not-allowed transition-all shadow-md flex items-center justify-center gap-2"
                      aria-label="Ödeme yap (şu anda bakımda)"
                      aria-disabled="true"
                    >
                      <Wrench className="w-5 h-5" aria-hidden="true" />
                      <span>Bakımda - Ödeme Yapılamıyor</span>
                    </motion.button>
                    
                    <motion.button
                      onClick={handleWhatsApp}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-to-r from-[#22C55E] to-[#16A34A] text-white py-3.5 px-4 rounded-xl font-semibold hover:from-[#16A34A] hover:to-[#15803d] transition-all shadow-md hover:shadow-[0_0_25px_rgba(34,197,94,0.4)] flex items-center justify-center gap-2 group"
                      aria-label="WhatsApp üzerinden fiyat sor"
                    >
                      <MessageCircle className="w-5 h-5" aria-hidden="true" />
                      <span>WhatsApp'tan Sor</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      <DisabledFeatureModal
        isOpen={showDisabledModal}
        onClose={() => setShowDisabledModal(false)}
      />
    </>
  );
} 