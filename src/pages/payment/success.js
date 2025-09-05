import React, { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function PaymentSuccess() {
  useEffect(() => {
    // Sepeti temizle
    localStorage.removeItem('cart');
  }, []);

  return (
    <>
      <Head>
        <title>Ödeme Başarılı - Atkigetir</title>
      </Head>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            {/* Başarı İkonu */}
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Ödeme Başarılı!</h1>
            <p className="text-gray-600 mb-6">
              Siparişiniz başarıyla alındı. Sipariş detayları e-posta adresinize gönderilecektir.
            </p>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-center gap-2 text-green-700">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
                <span className="font-semibold">Güvenli Ödeme</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <Link href="/urunler" legacyBehavior>
                <a className="block w-full bg-gradient-to-r from-blue-600 to-purple-500 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-600 transition">
                  Alışverişe Devam Et
                </a>
              </Link>
              
              <Link href="/" legacyBehavior>
                <a className="block w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition">
                  Ana Sayfaya Dön
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 