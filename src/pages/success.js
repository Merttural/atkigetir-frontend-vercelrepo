import Link from "next/link";
import SEO from "@/components/SEO";
import Breadcrumbs from '@/components/Breadcrumbs';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { CheckCircle2, ShoppingBag, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SuccessPage() {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // URL'den sipariş bilgilerini al (gelecekte gerçek sipariş verisi kullanılabilir)
    const orderData = {
      number: router.query.orderId || "ORDER" + Date.now(),
      items: JSON.parse(localStorage.getItem('lastOrder') || '[]'),
      total: parseFloat(localStorage.getItem('lastOrderTotal') || '0')
    };
    
    setOrder(orderData);
    setLoading(false);
    
    // Google Ads conversion tracking
    if (orderData.total > 0) {
      googleAds.trackPurchase(orderData.number, orderData.total, 'TRY');
    }
    
    // Sepeti temizle
    localStorage.removeItem('cart');
  }, [router.query]);

  if (loading) {
    return (
      <div className="bg-[#F8FAFC] min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Yükleniyor..." />
      </div>
    );
  }

  if (!order || !order.items || order.items.length === 0) {
    return (
      <>
        <SEO
          title="Sipariş Bulunamadı - Atkigetir"
          description="Sipariş bilgileri bulunamadı."
          url="/success"
        />
        <div className="bg-[#F8FAFC] min-h-screen flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md bg-white rounded-[24px] shadow-sm border border-slate-200 p-8 flex flex-col items-center"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center mb-4">
              <ShoppingBag className="w-8 h-8 text-slate-400" />
            </div>
            <h1 className="text-2xl font-bold text-[#0F172A] mb-4 text-center tracking-tighter">Sipariş Bulunamadı</h1>
            <p className="text-slate-500 text-center mb-6">Sipariş bilgileri bulunamadı.</p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/urunler"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#2563EB] to-[#1e40af] text-white px-6 py-3 rounded-xl font-semibold hover:from-[#1e40af] hover:to-[#1e3a8a] transition-all shadow-md hover:shadow-lg"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>Alışverişe Devam Et</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO
        title="Sipariş Başarılı - Atkigetir"
        description="Siparişiniz başarıyla alındı. Atkigetir ile güvenli alışveriş."
        url="/success"
      />
      <div className="bg-[#F8FAFC] min-h-screen flex items-center justify-center py-12 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="w-full max-w-md bg-white rounded-[24px] shadow-sm border border-slate-200 p-8 flex flex-col items-center"
        >
          {/* Checkmark Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="mb-6"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-100 to-green-100 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-12 h-12 text-emerald-600" />
            </div>
          </motion.div>
          
          <h1 className="text-3xl font-bold text-[#0F172A] mb-4 text-center tracking-tighter">Sipariş Alındı</h1>
          <p className="text-slate-500 text-center mb-6 leading-relaxed">Sipariş detaylarınız e-posta adresinize gönderildi.</p>
          
          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="w-full bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-5 mb-6 border border-slate-200"
          >
            <div className="flex justify-between mb-4 pb-3 border-b border-slate-200">
              <span className="font-semibold text-[#0F172A]">Sipariş No:</span>
              <span className="font-mono text-sm text-slate-600">#{order.number}</span>
            </div>
            <ul className="divide-y divide-slate-200 mb-4 space-y-2">
              {order.items.map((item, index) => (
                <motion.li
                  key={item.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.05 }}
                  className="flex justify-between py-2 text-sm"
                >
                  <span className="text-slate-700">{item.name} <span className="text-slate-400">x{item.quantity}</span></span>
                  <span className="font-semibold text-[#0F172A]">₺{item.price * item.quantity}</span>
                </motion.li>
              ))}
            </ul>
            <div className="flex justify-between items-baseline pt-3 border-t border-slate-200">
              <span className="font-bold text-lg text-[#0F172A]">Toplam:</span>
              <span className="text-2xl font-bold bg-gradient-to-r from-[#2563EB] to-[#1e40af] bg-clip-text text-transparent">
                ₺{order.total}
              </span>
            </div>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full"
          >
            <Link
              href="/urunler"
              className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#2563EB] to-[#1e40af] text-white px-6 py-3.5 rounded-xl font-semibold hover:from-[#1e40af] hover:to-[#1e3a8a] transition-all shadow-md hover:shadow-lg"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Alışverişe Devam Et</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
} 