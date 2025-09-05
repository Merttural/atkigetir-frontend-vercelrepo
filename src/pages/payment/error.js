import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function PaymentError() {
  return (
    <>
      <Head>
        <title>Ödeme Hatası - Atkigetir</title>
      </Head>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            {/* Hata İkonu */}
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Ödeme Başarısız</h1>
            <p className="text-gray-600 mb-6">
              Ödeme işlemi sırasında bir hata oluştu. Lütfen tekrar deneyiniz.
            </p>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-center gap-2 text-red-700">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                </svg>
                <span className="font-semibold">Ödeme Hatası</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <Link href="/cart" legacyBehavior>
                <a className="block w-full bg-gradient-to-r from-blue-600 to-purple-500 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-600 transition">
                  Sepete Geri Dön
                </a>
              </Link>
              
              <Link href="/urunler" legacyBehavior>
                <a className="block w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition">
                  Alışverişe Devam Et
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 