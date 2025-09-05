import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function SuccessPage() {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // URL'den sipariş bilgilerini al (gelecekte gerçek sipariş verisi kullanılabilir)
    const orderData = {
      number: router.query.orderId || "ORDER" + Date.now(),
      items: JSON.parse(localStorage.getItem('lastOrder') || '[]'),
      total: JSON.parse(localStorage.getItem('lastOrderTotal') || '0')
    };
    
    setOrder(orderData);
    setLoading(false);
    
    // Sepeti temizle
    localStorage.removeItem('cart');
  }, [router.query]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
          <div className="animate-pulse">
            <div className="w-16 h-16 bg-gray-200 rounded-full mb-4"></div>
            <div className="h-8 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
          </div>
        </div>
      </main>
    );
  }

  if (!order || !order.items || order.items.length === 0) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
          <h1 className="text-2xl font-bold mb-4 text-center">Sipariş Bulunamadı</h1>
          <p className="text-gray-600 text-center mb-6">Sipariş bilgileri bulunamadı.</p>
                        <Link href="/urunler" legacyBehavior>
            <a className="w-full text-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors font-semibold">
              Alışverişe Devam Et
            </a>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <>
      <Head>
        <title>Sipariş Başarılı - Atkigetir</title>
        <meta name="description" content="Siparişiniz başarıyla alındı. Atkigetir ile güvenli alışveriş." />
      </Head>
      <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
        {/* Checkmark Icon */}
        <div className="mb-4">
          <svg className="w-16 h-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <circle cx="12" cy="12" r="12" fill="#dcfce7" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12l3 3 5-5" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold mb-6 text-center">Sipariş Alındı</h1>
        <p className="text-gray-600 text-center mb-6">Sipariş detaylarınız e-posta adresinize gönderildi.</p>
        {/* Order Summary */}
        <div className="w-full bg-gray-50 rounded-lg shadow-inner p-4 mb-6">
          <div className="flex justify-between mb-2">
            <span className="font-medium text-gray-700">Sipariş No:</span>
            <span className="font-mono">#{order.number}</span>
          </div>
          <ul className="divide-y divide-gray-200 mb-2">
            {order.items.map((item) => (
              <li key={item.name} className="flex justify-between py-2 text-gray-700">
                <span>{item.name} <span className="text-gray-400">x{item.quantity}</span></span>
                <span>₺{item.price * item.quantity}</span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between font-bold text-blue-700 text-lg">
            <span>Toplam:</span>
            <span>₺{order.total}</span>
          </div>
        </div>
        <Link
                          href="/urunler"
          className="mt-2 w-full text-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors font-semibold"
        >
          Alışverişe Devam Et
        </Link>
      </div>
    </main>
    </>
  );
} 