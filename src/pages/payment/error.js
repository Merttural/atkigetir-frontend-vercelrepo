import React from 'react';
import SEO from '@/components/SEO';
import Breadcrumbs from '@/components/Breadcrumbs';
import Link from 'next/link';
import { XCircle, ShoppingBag, ArrowLeft, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PaymentError() {
  return (
    <>
      <SEO
        title="Ödeme Hatası - Atkigetir"
        description="Ödeme işlemi sırasında bir hata oluştu. Lütfen tekrar deneyiniz."
        url="/payment/error"
      />
      <div className="bg-[#F8FAFC] min-h-screen flex items-center justify-center py-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="max-w-md mx-auto text-center w-full"
        >
          <div className="bg-white rounded-[24px] shadow-sm border border-slate-200 p-8">
            {/* Hata İkonu */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-20 h-20 bg-gradient-to-br from-red-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <XCircle className="w-10 h-10 text-red-600" />
            </motion.div>
            
            <h1 className="text-2xl font-bold text-[#0F172A] mb-4 tracking-tighter">Ödeme Başarısız</h1>
            <p className="text-slate-500 mb-6 leading-relaxed">
              Ödeme işlemi sırasında bir hata oluştu. Lütfen tekrar deneyiniz.
            </p>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-red-50 to-orange-50 border border-red-200 rounded-xl p-4 mb-6"
            >
              <div className="flex items-center justify-center gap-2 text-red-700">
                <AlertCircle className="w-5 h-5" />
                <span className="font-semibold text-sm">Ödeme Hatası</span>
              </div>
            </motion.div>
            
            <div className="space-y-3">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href="/sepet"
                  className="block w-full bg-gradient-to-r from-[#2563EB] to-[#1e40af] text-white py-3.5 rounded-xl font-semibold hover:from-[#1e40af] hover:to-[#1e3a8a] transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Sepete Geri Dön</span>
                </Link>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href="/urunler"
                  className="block w-full bg-slate-100 text-[#0F172A] py-3.5 rounded-xl font-semibold hover:bg-slate-200 transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>Alışverişe Devam Et</span>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
} 