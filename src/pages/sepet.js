import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useCart } from '@/hooks/useCart';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function SepetPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
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

  const handlePayment = async () => {
    if (cartItems.length === 0) {
      if (typeof window !== 'undefined' && window.showToast) {
        window.showToast('Sepetiniz boş!', 'error', 3000);
      }
      return;
    }

    setLoading(true);
    console.log('🔄 Ödeme başlatılıyor...');

    try {
      console.log('📡 API isteği gönderiliyor...');
      // GERÇEK İYZİCO ENTEGRASYONU
      const response = await fetch('https://atkigetir-backend.onrender.com/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cartItems,
          customerInfo
        }),
      });

      console.log('📡 API response status:', response.status);
      const data = await response.json();
      console.log('📡 API response data:', data);

      if (response.ok && data.paymentUrl) {
        console.log('✅ Ödeme URL\'si alındı, yönlendiriliyor...');
        window.location.href = data.paymentUrl;
      } else {
        console.log('❌ Ödeme başlatılamadı:', data.error || 'Bilinmeyen hata');
        if (typeof window !== 'undefined' && window.showToast) {
          window.showToast(data.error || 'Ödeme başlatılamadı. Lütfen tekrar deneyin.', 'error', 5000);
        }
      }
    } catch (error) {
      console.log('❌ Network hatası:', error);
      if (typeof window !== 'undefined' && window.showToast) {
        window.showToast('Bağlantı hatası. Lütfen internet bağlantınızı kontrol edin.', 'error', 5000);
      }
    } finally {
      setLoading(false);
      console.log('🔄 Loading sonlandırıldı');
    }
  };

  if (cartItems.length === 0) {
    return (
      <>
        <Head>
          <title>Sepet - Atkigetir</title>
          <meta name="description" content="Sepetinizde ürün bulunmuyor. Atkigetir'de kaliteli atkı, bere ve aksesuar ürünlerini keşfedin." />
          <meta name="keywords" content="sepet, alışveriş, atkı, bere, aksesuar" />
          <meta property="og:title" content="Sepet - Atkigetir" />
          <meta property="og:description" content="Sepetinizde ürün bulunmuyor. Atkigetir'de kaliteli ürünleri keşfedin." />
          <meta property="og:url" content="https://atkigetir.com/sepet" />
          <link rel="canonical" href="https://atkigetir.com/sepet" />
        </Head>
        <div className="min-h-screen bg-gray-50 py-12">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center">
              <div className="text-6xl mb-4">🛒</div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Sepetiniz Boş</h1>
              <p className="text-gray-600 mb-8">Henüz sepetinize ürün eklemediniz.</p>
              <Link 
                href="/urunler" 
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                Ürünleri Keşfet
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Sepet ({cartItems.length} ürün) - Atkigetir</title>
        <meta name="description" content={`Sepetinizde ${cartItems.length} ürün bulunuyor. Toplam: ${getTotalPrice().toFixed(2)} TL. Güvenli ödeme ile siparişinizi tamamlayın.`} />
        <meta name="keywords" content="sepet, alışveriş, ödeme, atkı, bere, aksesuar" />
        <meta property="og:title" content={`Sepet (${cartItems.length} ürün) - Atkigetir`} />
        <meta property="og:description" content={`Sepetinizde ${cartItems.length} ürün bulunuyor. Toplam: ${getTotalPrice().toFixed(2)} TL.`} />
        <meta property="og:url" content="https://atkigetir.com/sepet" />
        <link rel="canonical" href="https://atkigetir.com/sepet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ShoppingCart",
              "name": "Atkigetir Sepet",
              "description": "Alışveriş sepeti",
              "numberOfItems": cartItems.length,
              "price": getTotalPrice().toFixed(2),
              "priceCurrency": "TRY",
              "url": "https://atkigetir.com/sepet"
            })
          }}
        />
      </Head>
      
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Alışveriş Sepeti</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Sepet Ürünleri */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-semibold mb-6">Sepetinizdeki Ürünler</h2>
                
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item._id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 relative">
                        <Image
                          src={item.image || '/images/placeholder.jpg'}
                          alt={item.name}
                          fill
                          className="object-cover rounded-lg"
                          sizes="(max-width: 640px) 64px, 80px"
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 truncate">{item.name}</h3>
                        {item.category && (
                          <p className="text-sm text-gray-500">{item.category}</p>
                        )}
                        {item.size && (
                          <p className="text-sm text-blue-600 font-medium">Beden: {item.size}</p>
                        )}
                        <p className="text-lg font-bold text-blue-600">{item.price} TL</p>
                      </div>
                      
                      <div className="flex flex-col items-end gap-2">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item._id, item.quantity - 1)}
                            className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-600"
                          >
                            -
                          </button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item._id, item.quantity + 1)}
                            className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-600"
                          >
                            +
                          </button>
                        </div>
                        
                        <button
                          onClick={() => removeFromCart(item._id)}
                          className="text-red-500 hover:text-red-700 text-sm font-medium"
                        >
                          Kaldır
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <button
                    onClick={clearCart}
                    className="text-red-600 hover:text-red-800 font-medium"
                  >
                    Sepeti Temizle
                  </button>
                </div>
              </div>
            </div>
            
            {/* Ödeme Özeti */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4">
                <h2 className="text-xl font-semibold mb-6">Ödeme Özeti</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Ürün Sayısı:</span>
                    <span className="font-medium">{cartItems.length}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Toplam:</span>
                    <span className="font-bold text-xl text-blue-600">{getTotalPrice().toFixed(2)} TL</span>
                  </div>
                </div>
                
                <button
                  onClick={handlePayment}
                  disabled={loading || cartItems.length === 0}
                  className="w-full mt-6 bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <LoadingSpinner size="sm" color="white" />
                      <span>İşleniyor...</span>
                    </>
                  ) : (
                    <>
                      <span>Ödemeye Geç</span>
                      <span>→</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 