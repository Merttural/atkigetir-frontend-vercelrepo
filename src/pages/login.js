import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { Mail, Lock, X, ArrowRight, AlertCircle, MessageCircle, Wrench } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "", remember: false });
  const [loading, setLoading] = useState(false);
  const modalRef = useRef(null);
  const router = useRouter();
  const [error, setError] = useState("");

  // URL'den redirect ve message parametrelerini al
  const redirect = router.query.redirect || "/";
  const message = router.query.message || "";

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

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Environment-based API URL
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 
        (process.env.NODE_ENV === 'production' 
          ? 'https://api.atkigetir.com' 
          : process.env.NEXT_PUBLIC_API_URL || '');
      
      const response = await fetch(`${apiUrl}/api/auth/login`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${response.status}: Giriş başarısız`);
      }
      
      const data = await response.json();
      
      // Backend'den gelen response'u kontrol et
      if (data.error) {
        throw new Error(data.error || "Giriş başarısız");
      }
      
      // Token ve kullanıcı bilgilerini localStorage'a kaydet
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
      if (data.accessToken) {
        localStorage.setItem('accessToken', data.accessToken);
      }
      if (data.refreshToken) {
        localStorage.setItem('refreshToken', data.refreshToken);
      }
      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
      }
      
      // Remember me özelliği
      if (form.remember) {
        localStorage.setItem('rememberMe', 'true');
      } else {
        localStorage.removeItem('rememberMe');
      }
      
      // Başarılı giriş eventi
      window.dispatchEvent(new Event('user-logged-in'));
      
      // Redirect parametresine göre yönlendir
      setTimeout(() => {
        router.push(redirect || "/");
      }, 1000);
      
    } catch (err) {
      console.error("❌ Login error:", err);
      setError(err.message || "Giriş yapılırken bir hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  return (
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
          {/* Close button */}
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 transition-colors focus:outline-none"
            onClick={() => router.push("/")}
            aria-label="Kapat"
          >
            <X className="w-6 h-6" />
          </motion.button>
          
          <h1 className="text-2xl font-bold text-[#0F172A] mb-6 text-center tracking-tighter">Giriş Yap</h1>
          
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
                  Giriş yapma özelliği şu anda bakım aşamasındadır. Ürünler hakkında bilgi almak ve sipariş vermek için WhatsApp veya telefon ile iletişime geçebilirsiniz.
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
          
          {/* Message göster */}
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm"
            >
              {message}
            </motion.div>
          )}
          
          <form className="w-full flex flex-col gap-4 opacity-50 pointer-events-none" onSubmit={(e) => { e.preventDefault(); }}>
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
                  disabled={loading}
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
                  disabled={loading}
                />
              </div>
            </div>
            
            <div className="flex items-center justify-between text-sm mt-1">
              <label className="flex items-center gap-2 select-none cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.remember}
                  onChange={e => setForm(f => ({ ...f, remember: e.target.checked }))}
                  className="w-4 h-4 rounded border-slate-300 text-[#2563EB] focus:ring-[#2563EB]"
                  disabled={loading}
                />
                <span className="text-slate-600">Beni hatırla</span>
              </label>
              <Link href="/forgot-password" className="text-[#2563EB] hover:text-[#1e40af] font-medium transition-colors">
                Şifremi unuttum
              </Link>
            </div>
            
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm"
              >
                {error}
              </motion.div>
            )}
            
            <motion.button
              type="button"
              disabled={true}
              className="w-full py-3.5 bg-slate-300 text-slate-500 rounded-xl font-semibold transition-all shadow-md cursor-not-allowed flex items-center justify-center gap-2"
            >
              <span>Bakımda - Giriş Yapılamıyor</span>
            </motion.button>
            
            <div className="text-center text-sm text-slate-600 pt-2">
              Hesabınız yok mu?{" "}
              <Link href="/register" className="text-[#2563EB] hover:text-[#1e40af] font-medium transition-colors inline-flex items-center gap-1">
                <span>Kayıt olun</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}