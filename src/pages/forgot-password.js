import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div ref={modalRef} className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative animate-fadeIn">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold focus:outline-none"
          onClick={() => router.push("/")}
          aria-label="Kapat"
        >
          ×
        </button>
        <h1 className="text-2xl font-bold mb-6 text-center">Şifremi Unuttum</h1>
        <form className="w-full flex flex-col gap-4">
          <div>
            <label htmlFor="email" className="block mb-1 font-medium">E-posta</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">📧</span>
              <input
                id="email"
                type="email"
                placeholder="E-posta adresinizi girin"
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 placeholder-gray-400"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="mt-2 w-full px-4 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-500 shadow hover:opacity-90 transition text-lg"
          >
            Şifreyi Sıfırla
          </button>
        </form>
        <p className="mt-6 text-sm text-gray-600 text-center">
          Giriş yapmak ister misiniz?{' '}
          <Link href="/login" className="text-blue-600 hover:underline font-medium">
            Giriş Yap
          </Link>
        </p>
      </div>
    </div>
  );
} 