import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { apiFetch } from "../config/api";

export default function RegisterModal({ open, onClose, onLogin }) {
  const modalRef = useRef(null);
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "", password2: "" });
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

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (form.password !== form.password2) {
      setError("Şifreler eşleşmiyor");
      return;
    }
    try {
      const data = await apiFetch('/api/auth/register', {
        method: "POST",
        body: JSON.stringify({ name: form.name, email: form.email, password: form.password })
      });
      
      setSuccess("Kayıt başarılı! Giriş yapabilirsiniz.");
      
      // Kayıt başarılı, otomatik giriş
      const loginData = await apiFetch('/api/auth/login', {
        method: "POST",
        body: JSON.stringify({ email: form.email, password: form.password })
      });
      
      if (loginData.data.accessToken) {
        localStorage.setItem('accessToken', loginData.data.accessToken);
        localStorage.setItem('refreshToken', loginData.data.refreshToken);
        localStorage.setItem('user', JSON.stringify(loginData.data.user));
        window.dispatchEvent(new Event('user-logged-in'));
      }
      
      setSuccess("Kayıt başarılı! Giriş yapabilirsiniz.");
      setTimeout(() => {
        onClose();
        if (onLogin) onLogin();
      }, 1000);
    } catch (err) {
      setError(err.message || "Kayıt işlemi başarısız. Lütfen bilgilerinizi kontrol edin.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center min-h-screen py-8 bg-black/40">
      <div ref={modalRef} className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative animate-fadeIn">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold focus:outline-none"
          onClick={onClose}
          aria-label="Kapat"
        >
          ×
        </button>
        <h1 className="text-2xl font-bold mb-6 text-center">Kayıt Ol</h1>
        <form className="w-full flex flex-col gap-4" onSubmit={handleRegister}>
          <div>
            <label htmlFor="name" className="block mb-1 font-medium text-black">Ad Soyad</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">👤</span>
              <input
                id="name"
                type="text"
                placeholder="Adınızı ve soyadınızı girin"
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 placeholder-black text-black"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                required
              />
            </div>
          </div>
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
          <div>
            <label htmlFor="password2" className="block mb-1 font-medium text-black">Şifre (Tekrar)</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">🔒</span>
              <input
                id="password2"
                type="password"
                placeholder="Şifrenizi tekrar girin"
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 placeholder-black text-black"
                value={form.password2}
                onChange={e => setForm(f => ({ ...f, password2: e.target.value }))}
                required
              />
            </div>
          </div>
          {error && <div className="text-red-600 text-center font-semibold mb-2">{error}</div>}
          {success && <div className="text-green-600 text-center font-semibold mb-2">{success}</div>}
          <button
            type="submit"
            className="mt-2 w-full px-4 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-500 shadow hover:opacity-90 transition text-lg"
          >
            Kayıt Ol
          </button>
        </form>
        <p className="mt-6 text-sm text-gray-600 text-center">
          Zaten hesabınız var mı?{' '}
          <button type="button" className="text-blue-600 hover:underline font-medium" onClick={onLogin}>
            Giriş Yap
          </button>
        </p>
      </div>
    </div>
  );
} 