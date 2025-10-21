import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function LoginModal({ open, onClose, onRegister, onForgot }) {
  const modalRef = useRef(null);
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    
    if (!isValidEmail(form.email)) {
      setError("Lütfen geçerli bir e-posta adresi girin.");
      setLoading(false);
      return;
    }
    
    try {
      // Environment-based API URL
      const apiUrl = process.env.NODE_ENV === 'production' 
        ? 'https://atkigetir-backend.onrender.com' 
        : 'http://localhost:5000';
      
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
      
      // Store tokens and user data
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
      
      // Dispatch login event
      window.dispatchEvent(new Event('user-logged-in'));
      
      setSuccess("Giriş başarılı! Yönlendiriliyorsunuz...");
      setTimeout(() => {
        onClose();
        // Sayfayı yenile
        window.location.reload();
      }, 1000);
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || "Giriş işlemi başarısız. Lütfen bilgilerinizi kontrol edin.");
    } finally {
      setLoading(false);
    }
  };

  // Şifremi unuttum için gerçek API isteği
  const handleForgot = async () => {
    setError("");
    setSuccess("");
    setLoading(true);
    
    if (!isValidEmail(form.email)) {
      setError("Lütfen geçerli bir e-posta adresi girin.");
      setLoading(false);
      return;
    }
    
    try {
      const apiUrl = process.env.NODE_ENV === 'production' 
        ? 'https://atkigetir-backend.onrender.com' 
        : 'http://localhost:5000';
      
      const response = await fetch(`${apiUrl}/api/auth/forgot-password`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ email: form.email })
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${response.status}: Email gönderilemedi`);
      }
      
      const data = await response.json();
      setSuccess(data.message || "Şifre sıfırlama linki email adresinize gönderildi!");
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err) {
      console.error('Forgot password error:', err);
      setError(err.message || "Email gönderilemedi. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
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
                disabled={loading}
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
                disabled={loading}
              />
            </div>
          </div>
          
          <div className="flex items-center justify-between text-sm mt-1">
            <label className="flex items-center gap-2 select-none">
              <input
                type="checkbox"
                className="accent-blue-600"
                disabled={loading}
              />
              Beni hatırla
            </label>
            <button 
              type="button" 
              className="text-blue-600 hover:underline font-medium" 
              onClick={handleForgot}
              disabled={loading}
            >
              Şifremi unuttum
            </button>
          </div>
          
          {error && <div className="text-red-600 text-center font-semibold mb-2">{error}</div>}
          {success && <div className="text-green-600 text-center font-semibold mb-2">{success}</div>}
          
          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full px-4 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-500 shadow hover:opacity-90 transition text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
          </button>
        </form>
        
        <p className="mt-6 text-sm text-gray-600 text-center">
          Hesabınız yok mu?{' '}
          <button 
            type="button" 
            className="text-blue-600 hover:underline font-medium" 
            onClick={onRegister}
            disabled={loading}
          >
            Kayıt Ol
          </button>
        </p>
      </div>
    </div>
  );
}