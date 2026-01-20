import React, { useEffect } from 'react';
import SEO from '@/components/SEO';
import Link from 'next/link';
import { CheckCircle2, ShoppingBag, Home, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PaymentSuccess() {
  useEffect(() => {
    // Sepeti temizle
    localStorage.removeItem('cart');
    
    // Google Ads conversion tracking
    // Sipariş bilgilerini localStorage'dan al (eğer varsa)
    const lastOrderTotal = parseFloat(localStorage.getItem('lastOrderTotal') || '0');
    const orderId = localStorage.getItem('lastOrderId') || `ORDER-${Date.now()}`;
    
    if (lastOrderTotal > 0) {
      googleAds.trackPurchase(orderId, lastOrderTotal, 'TRY');
    }
  }, []);

  return (
    <>
      <SEO
        title="Ödeme Başarılı - Atkigetir"
        description="Siparişiniz başarıyla alındı. Sipariş detayları e-posta adresinize gönderilecektir."
        url="/payment/success"
      />
      <div className="bg-[#F8FAFC] min-h-screen flex items-center justify-center py-12 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="max-w-md mx-auto text-center w-full"
        >
          <div className="bg-white rounded-[24px] shadow-sm border border-slate-200 p-8">
            {/* Başarı İkonu */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-20 h-20 bg-gradient-to-br from-emerald-100 to-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle2 className="w-12 h-12 text-emerald-600" />
            </motion.div>
            
            <h1 className="text-2xl font-bold text-[#0F172A] mb-4 tracking-tighter">Ödeme Başarılı!</h1>
            <p className="text-slate-500 mb-6 leading-relaxed">
              Siparişiniz başarıyla alındı. Sipariş detayları e-posta adresinize gönderilecektir.
            </p>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200 rounded-xl p-4 mb-6"
            >
              <div className="flex items-center justify-center gap-2 text-emerald-700">
                <Shield className="w-5 h-5" />
                <span className="font-semibold text-sm">Güvenli Ödeme</span>
              </div>
            </motion.div>
            
            <div className="space-y-3">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/urunler"
                  className="block w-full bg-gradient-to-r from-[#2563EB] to-[#1e40af] text-white py-3.5 rounded-xl font-semibold hover:from-[#1e40af] hover:to-[#1e3a8a] transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>Alışverişe Devam Et</span>
                </Link>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/"
                  className="block w-full bg-slate-100 text-[#0F172A] py-3.5 rounded-xl font-semibold hover:bg-slate-200 transition-all flex items-center justify-center gap-2"
                >
                  <Home className="w-5 h-5" />
                  <span>Ana Sayfaya Dön</span>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
} 