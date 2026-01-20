import SEO from '@/components/SEO';
import Link from 'next/link';
import { Home, ShoppingBag, MessageCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Custom404() {
  return (
    <>
      <SEO
        title="Sayfa Bulunamadı - Atkigetir"
        description="Aradığınız sayfa bulunamadı. Atkigetir ana sayfasına dönün."
        url="/404"
      />
      
      <div className="bg-[#F8FAFC] min-h-screen flex items-center justify-center py-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="max-w-md mx-auto text-center w-full"
        >
          <div className="bg-white rounded-[24px] shadow-sm border border-slate-200 p-8">
            {/* 404 İkonu */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-20 h-20 bg-gradient-to-br from-red-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
              </svg>
            </motion.div>
            
            <h1 className="text-5xl font-bold text-[#0F172A] mb-2 tracking-tighter">404</h1>
            <h2 className="text-2xl font-semibold text-[#0F172A] mb-4 tracking-tight">Sayfa Bulunamadı</h2>
            <p className="text-slate-500 mb-8 leading-relaxed">
              Aradığınız sayfa mevcut değil veya taşınmış olabilir. 
              Ana sayfamıza dönerek ürünlerimizi keşfedebilirsiniz.
            </p>
            
            <div className="space-y-3">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href="/"
                  className="block w-full bg-gradient-to-r from-[#2563EB] to-[#1e40af] text-white py-3.5 rounded-xl font-semibold hover:from-[#1e40af] hover:to-[#1e3a8a] transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                >
                  <Home className="w-5 h-5" />
                  <span>Ana Sayfaya Dön</span>
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
                  <span>Ürünleri Keşfet</span>
                </Link>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href="/iletisim"
                  className="block w-full bg-slate-100 text-[#0F172A] py-3.5 rounded-xl font-semibold hover:bg-slate-200 transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>İletişime Geç</span>
                </Link>
              </motion.div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-slate-200">
              <p className="text-sm text-slate-500">
                Yardıma mı ihtiyacınız var?{' '}
                <Link href="/iletisim" className="text-[#2563EB] hover:underline font-medium inline-flex items-center gap-1">
                  <span>Bizimle iletişime geçin</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
} 