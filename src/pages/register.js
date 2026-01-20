import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { Mail, Lock, User, Phone, X, ArrowRight, AlertCircle, MessageCircle, Wrench } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '@/components/SEO';

export default function RegisterPage() {
  const [form, setForm] = useState({ 
    name: "", 
    email: "", 
    password: "", 
    confirmPassword: "",
    phone: "",
    agreeToTerms: false 
  });
  const [loading, setLoading] = useState(false);
  const modalRef = useRef(null);
  const router = useRouter();
  const [error, setError] = useState("");

  // Close modal on outside click
  useEffect(() => {
    function handleClick(e) {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        router.push("/");
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [router]);

  // Close modal on ESC
  useEffect(() => {
    function handleEsc(e) {
      if (e.key === "Escape") router.push("/");
    }
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [router]);

  const handleRegister = async (e) => {
    e.preventDefault();
    // Bakımda olduğu için işlem yapılmıyor
  };

  return (
    <>
      <SEO
        title="Kayıt Ol - Atkigetir"
        description="Atkigetir'e kayıt olun ve özel fırsatlardan haberdar olun."
        keywords="kayıt ol, üye ol, atkı, bere, aksesuar"
        url="/register"
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
            className="bg-white rounded-[24px] shadow-2xl w-full max-w-md p-8 relative max-h-[90vh] overflow-y-auto"
          >
            {/* Close button */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 transition-colors focus:outline-none z-10"
              onClick={() => router.push("/")}
              aria-label="Kapat"
            >
              <X className="w-6 h-6" />
            </motion.button>
            
            <h1 className="text-2xl font-bold text-[#0F172A] mb-6 text-center tracking-tighter">Kayıt Ol</h1>
            
            {/* Bakımda Mesajı */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-5 bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-xl"
            >
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Wrench className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-[#0F172A] mb-1 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-yellow-600" />
                    Bu Özellik Geçici Olarak Bakımda
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">
                    Kayıt olma özelliği şu anda bakım aşamasındadır. Ürünler hakkında bilgi almak ve sipariş vermek için WhatsApp veya telefon ile iletişime geçebilirsiniz.
                  </p>
                  <div className="flex flex-col gap-2">
                    <a
                      href="https://wa.me/905337498266"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-gradient-to-r from-[#22C55E] to-[#16A34A] text-white py-2.5 px-4 rounded-lg font-semibold hover:from-[#16A34A] hover:to-[#15803d] transition-all shadow-md hover:shadow-[0_0_25px_rgba(34,197,94,0.4)] text-center flex items-center justify-center gap-2 text-sm group"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>WhatsApp'tan İletişime Geç</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm"
              >
                {error}
              </motion.div>
            )}
            
            <form className="w-full flex flex-col gap-4 opacity-50 pointer-events-none" onSubmit={handleRegister}>
              <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-[#0F172A]">Ad Soyad</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    id="name"
                    type="text"
                    placeholder="Adınız ve soyadınız"
                    className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] text-sm bg-white transition-all placeholder-slate-400"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    required
                    disabled={true}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-[#0F172A]">E-posta</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    id="email"
                    type="email"
                    placeholder="E-posta adresinizi girin"
                    className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] text-sm bg-white transition-all placeholder-slate-400"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    required
                    disabled={true}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block mb-2 text-sm font-medium text-[#0F172A]">Telefon</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    id="phone"
                    type="tel"
                    placeholder="Telefon numaranız"
                    className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] text-sm bg-white transition-all placeholder-slate-400"
                    value={form.phone}
                    onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    required
                    disabled={true}
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-[#0F172A]">Şifre</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    id="password"
                    type="password"
                    placeholder="Şifrenizi girin"
                    className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] text-sm bg-white transition-all placeholder-slate-400"
                    value={form.password}
                    onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                    required
                    disabled={true}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-[#0F172A]">Şifre Tekrar</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    id="confirmPassword"
                    type="password"
                    placeholder="Şifrenizi tekrar girin"
                    className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] text-sm bg-white transition-all placeholder-slate-400"
                    value={form.confirmPassword}
                    onChange={e => setForm(f => ({ ...f, confirmPassword: e.target.value }))}
                    required
                    disabled={true}
                  />
                </div>
              </div>
              
              <div className="flex items-start gap-2 text-sm mt-1">
                <input
                  type="checkbox"
                  checked={form.agreeToTerms}
                  onChange={e => setForm(f => ({ ...f, agreeToTerms: e.target.checked }))}
                  className="w-4 h-4 rounded border-slate-300 text-[#2563EB] focus:ring-[#2563EB] mt-0.5"
                  disabled={true}
                />
                <label className="text-slate-600">
                  <Link href="/kosullar" className="text-[#2563EB] hover:text-[#1e40af] font-medium transition-colors">
                    Kullanım koşullarını
                  </Link> ve{" "}
                  <Link href="/gizlilik" className="text-[#2563EB] hover:text-[#1e40af] font-medium transition-colors">
                    gizlilik politikasını
                  </Link> okudum ve kabul ediyorum.
                </label>
              </div>
              
              <motion.button
                type="button"
                disabled={true}
                className="w-full py-3.5 bg-slate-300 text-slate-500 rounded-xl font-semibold transition-all shadow-md cursor-not-allowed flex items-center justify-center gap-2"
              >
                <span>Bakımda - Kayıt Olunamıyor</span>
              </motion.button>
              
              <div className="text-center text-sm text-slate-600 pt-2">
                Zaten hesabınız var mı?{" "}
                <Link href="/login" className="text-[#2563EB] hover:text-[#1e40af] font-medium transition-colors inline-flex items-center gap-1">
                  <span>Giriş yapın</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </form>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
