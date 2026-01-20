import SEO from '@/components/SEO';
import Link from 'next/link';
import { RefreshCw, Home, Mail, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Custom500() {
  return (
    <>
      <SEO
        title="Sunucu Hatası - Atkigetir"
        description="Teknik bir sorun oluştu. Lütfen daha sonra tekrar deneyin."
        url="/500"
      />
      
      <div className="bg-[#F8FAFC] min-h-screen flex items-center justify-center py-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="max-w-md mx-auto text-center w-full"
        >
          <div className="bg-white rounded-[24px] shadow-sm border border-slate-200 p-8">
            {/* 500 İkonu */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-20 h-20 bg-gradient-to-br from-orange-100 to-amber-100 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <svg className="w-10 h-10 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
              </svg>
            </motion.div>
            
            <h1 className="text-5xl font-bold text-[#0F172A] mb-2 tracking-tighter">500</h1>
            <h2 className="text-2xl font-semibold text-[#0F172A] mb-4 tracking-tight">Sunucu Hatası</h2>
            <p className="text-slate-500 mb-6 leading-relaxed">
              Teknik bir sorun oluştu. Lütfen birkaç dakika sonra tekrar deneyin.
            </p>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200 rounded-xl p-4 mb-6"
            >
              <div className="flex items-center justify-center gap-2 text-orange-700">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span className="font-semibold text-sm">Teknik Ekip Bilgilendirildi</span>
              </div>
            </motion.div>
            
            <div className="space-y-3">
              <motion.button
                onClick={() => window.location.reload()}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="block w-full bg-gradient-to-r from-[#2563EB] to-[#1e40af] text-white py-3.5 rounded-xl font-semibold hover:from-[#1e40af] hover:to-[#1e3a8a] transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-5 h-5" />
                <span>Sayfayı Yenile</span>
              </motion.button>
              
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
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
            
            <div className="mt-8 pt-6 border-t border-slate-200">
              <p className="text-sm text-slate-500 mb-3 font-medium">
                Sorun devam ederse bizimle iletişime geçin:
              </p>
              <div className="space-y-2 text-sm">
                <a href="mailto:info@atkigetir.com" className="flex items-center justify-center gap-2 text-slate-600 hover:text-[#2563EB] transition-colors">
                  <Mail className="w-4 h-4" />
                  <span>info@atkigetir.com</span>
                </a>
                <a href="tel:+905337498266" className="flex items-center justify-center gap-2 text-slate-600 hover:text-[#2563EB] transition-colors">
                  <Phone className="w-4 h-4" />
                  <span>0533 749 82 66</span>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
} 