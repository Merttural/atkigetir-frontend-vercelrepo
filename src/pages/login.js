import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "", remember: false });
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
    try {
      const res = await fetch("https://atkigetir-backend.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, password: form.password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Giriş başarısız");
      
      // Token ve kullanıcı bilgilerini localStorage'a kaydet
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      // Redirect parametresine göre yönlendir
      if (data.user.role === "admin") {
        router.push(redirect.startsWith('/admin') ? redirect : "/admin");
      } else {
        router.push(redirect.startsWith('/admin') ? "/" : redirect);
      }
    } catch (err) {
      setError(err.message);
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
            className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Giriş Yap
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
