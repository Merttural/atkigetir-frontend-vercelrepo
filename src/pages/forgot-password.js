import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import SEO from '@/components/SEO';
import { Mail, X, ArrowRight, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const modalRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    function handleClick(e) {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        router.push("/");
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [router]);

  useEffect(() => {
    function handleEsc(e) {
      if (e.key === "Escape") router.push("/");
    }
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [router]);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Şifre sıfırlama bağlantısı e-posta adresinize gönderildi! (Bu özellik şu anda askıya alınmıştır.)');
  };

  return (
    <>
      <SEO
        title="Şifremi Unuttum - Atkigetir"
        description="Şifrenizi sıfırlamak için e-posta adresinizi girin."
        url="/forgot-password"
      />
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
          onClick={() => router.push("/")}
        >
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-[24px] shadow-2xl w-full max-w-md p-8 relative"
          >
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 transition-colors focus:outline-none"
              onClick={() => router.push("/")}
              aria-label="Kapat"
            >
              <X className="w-6 h-6" />
            </motion.button>
            
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#2563EB] to-[#1e40af] flex items-center justify-center mx-auto mb-6">
              <Lock className="w-8 h-8 text-white" />
            </div>
            
            <h1 className="text-2xl font-bold text-[#0F172A] mb-6 text-center tracking-tighter">Şifremi Unuttum</h1>
            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-[#0F172A]">E-posta</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    id="email"
                    type="email"
                    placeholder="E-posta adresinizi girin"
                    className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] text-sm bg-white transition-all placeholder-slate-400"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-2 w-full px-4 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-[#2563EB] to-[#1e40af] shadow-md hover:shadow-lg hover:from-[#1e40af] hover:to-[#1e3a8a] transition-all flex items-center justify-center gap-2"
              >
                <Lock className="w-5 h-5" />
                <span>Şifreyi Sıfırla</span>
              </motion.button>
            </form>
            <p className="mt-6 text-sm text-slate-600 text-center">
              Giriş yapmak ister misiniz?{' '}
              <Link href="/login" className="text-[#2563EB] hover:text-[#1e40af] font-medium transition-colors inline-flex items-center gap-1">
                <span>Giriş Yap</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </>
  );
} 