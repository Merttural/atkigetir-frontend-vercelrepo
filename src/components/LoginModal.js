import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { apiFetch } from "../config/api";

export default function LoginModal({ open, onClose, onRegister, onForgot }) {
  const modalRef = useRef(null);
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!open) return;
    function handleClick(e) {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    }
    function handleEsc(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [open, onClose]);

  if (!open) return null;

  // Basit e-posta doğrulama
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    
    if (!isValidEmail(form.email)) {
      setError("Lütfen geçerli bir e-posta adresi girin.");
      return;
    }
    
    try {
      const data = await apiFetch('/api/auth/login', {
        method: "POST",
        body: JSON.stringify({ email: form.email, password: form.password })
      });
      
      if (data.data.accessToken) {
        localStorage.setItem('accessToken', data.data.accessToken);
        localStorage.setItem('refreshToken', data.data.refreshToken);
        localStorage.setItem('user', JSON.stringify(data.data.user));
        window.dispatchEvent(new Event('user-logged-in'));
      }
      
      setSuccess("Giriş başarılı! Yönlendiriliyorsunuz...");
      setTimeout(() => {
        onClose();
        if (data.data.user.role === "admin") {
          router.push("/admin");
        } else {
          router.push("/");
        }
      }, 1000);
    } catch (err) {
      setError(err.message || "Giriş işlemi başarısız. Lütfen bilgilerinizi kontrol edin.");
    }
  };

  // Şifremi unuttum için gerçek API isteği
  const handleForgot = async () => {
    setError("");
    setSuccess("");
    if (!isValidEmail(form.email)) {
      setError("Lütfen geçerli bir e-posta adresi girin.");
      return;
    }
    
    try {
      const data = await apiFetch('/api/auth/forgot-password', {
        method: 'POST',
        body: JSON.stringify({ email: form.email })
      });
      
      setSuccess(data.message || "Şifre sıfırlama linki email adresinize gönderildi!");
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err) {
      setError(err.message || "Email gönderilemedi. Lütfen tekrar deneyin.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center min-h-screen py-8 bg-black/40">
      <div ref={modalRef} className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative animate-fadeIn">
        {/* Close button */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold focus:outline-none"
          onClick={onClose}
          aria-label="Kapat"
        >
          ×
        </button>
        <h1 className="text-2xl font-bold mb-6 text-center">Giriş Yap</h1>
        <form className="w-full flex flex-col gap-4" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="block mb-1 font-medium text-black">E-posta</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">📧</span>
              <input
                id="email"
                type="email"
                placeholder="E-posta adresinizi girin"
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 placeholder-black text-black"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="block mb-1 font-medium text-black">Şifre</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">🔒</span>
              <input
                id="password"
                type="password"
                placeholder="Şifrenizi girin"
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 placeholder-black text-black"
                value={form.password}
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                required
              />
            </div>
          </div>
          <div className="flex items-center justify-between text-sm mt-1">
            <label className="flex items-center gap-2 select-none">
              <input
                type="checkbox"
                className="accent-blue-600"
              />
              Beni hatırla
            </label>
            <button type="button" className="text-blue-600 hover:underline font-medium" onClick={handleForgot}>Şifremi unuttum</button>
          </div>
          {error && <div className="text-red-600 text-center font-semibold mb-2">{error}</div>}
          {success && <div className="text-green-600 text-center font-semibold mb-2">{success}</div>}
          <button
            type="submit"
            className="mt-2 w-full px-4 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-500 shadow hover:opacity-90 transition text-lg"
          >
            Giriş Yap
          </button>
        </form>
        <p className="mt-6 text-sm text-gray-600 text-center">
          Hesabınız yok mu?{' '}
          <button type="button" className="text-blue-600 hover:underline font-medium" onClick={onRegister}>
            Kayıt Ol
          </button>
        </p>
      </div>
    </div>
  );
} 