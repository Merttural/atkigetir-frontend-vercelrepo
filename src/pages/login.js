import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";

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
      const apiUrl = process.env.NODE_ENV === 'production' 
        ? 'https://atkigetir-backend.onrender.com' 
        : 'http://localhost:5000';
      
      console.log("🔐 Login attempt:", { email: form.email, apiUrl });
      
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
      
      console.log("📡 Response status:", response.status);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${response.status}: Giriş başarısız`);
      }
      
      const data = await response.json();
      console.log("📦 Success data:", data);
      
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
        if (data.user && data.user.role === "admin") {
          router.push(redirect.startsWith('/admin') ? redirect : "/admin");
        } else {
          router.push(redirect.startsWith('/admin') ? "/" : redirect);
        }
      }, 1000);
      
    } catch (err) {
      console.error("❌ Login error:", err);
      setError(err.message || "Giriş yapılırken bir hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div ref={modalRef} className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative animate-fadeIn">
        {/* Close button */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold focus:outline-none"
          onClick={() => router.push("/")}
          aria-label="Kapat"
        >
          ×
        </button>
        
        <h1 className="text-2xl font-bold mb-6 text-center">Giriş Yap</h1>
        
        {/* Message göster */}
        {message && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {message}
          </div>
        )}
        
        <form className="w-full flex flex-col gap-4" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="block mb-1 font-medium">E-posta</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">📧</span>
              <input
                id="email"
                type="email"
                placeholder="E-posta adresinizi girin"
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 placeholder-gray-400"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                required
                disabled={loading}
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="password" className="block mb-1 font-medium">Şifre</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">🔒</span>
              <input
                id="password"
                type="password"
                placeholder="Şifrenizi girin"
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 placeholder-gray-400"
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
                checked={form.remember}
                onChange={e => setForm(f => ({ ...f, remember: e.target.checked }))}
                className="accent-blue-600"
                disabled={loading}
              />
              Beni hatırla
            </label>
            <Link href="/forgot-password" className="text-blue-600 hover:text-blue-800">
              Şifremi unuttum
            </Link>
          </div>
          
          {error && (
            <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
              {error}
            </div>
          )}
          
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
          </button>
          
          <div className="text-center text-sm text-gray-600">
            Hesabınız yok mu?{" "}
            <Link href="/register" className="text-blue-600 hover:text-blue-800 font-medium">
              Kayıt olun
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}