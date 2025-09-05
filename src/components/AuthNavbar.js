import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import jwtDecode from 'jwt-decode';

// Kullanıcı bilgisini decode eden yardımcı fonksiyon
function getUserFromToken() {
  if (typeof window === 'undefined') return null;
  const token = localStorage.getItem('token');
  if (!token) return null;
  try {
    return jwtDecode(token);
  } catch {
    return null;
  }
}

export default function AuthNavbar() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  // Sayfa yüklendiğinde token'ı kontrol et
  useEffect(() => {
    setUser(getUserFromToken());
    // localStorage değişirse güncelle (örn. başka tabda çıkış)
    const onStorage = () => setUser(getUserFromToken());
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  // Çıkış işlemi
  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    router.push('/');
  };

  return (
    <nav className="w-full bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Sol: Logo */}
        <Link href="/" className="text-xl font-bold text-blue-700">Atkigetir</Link>
        {/* Sağ: Butonlar */}
        <div className="flex items-center gap-2">
          {/* Kullanıcı yoksa Giriş/Kayıt */}
          {!user && (
            <>
              <Link href="/login" className="px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">Giriş Yap</Link>
              <Link href="/register" className="px-4 py-2 rounded bg-gray-100 text-blue-700 font-semibold hover:bg-blue-50 border border-blue-200 transition">Kayıt Ol</Link>
            </>
          )}
          {/* Kullanıcı varsa Profil/Çıkış */}
          {user && (
            <>
              {/* Admin ise Admin Panel */}
              {user.role === 'admin' && (
                <Link href="/admin" className="px-4 py-2 rounded bg-yellow-500 text-white font-semibold hover:bg-yellow-600 transition">Admin Panel</Link>
              )}
              <Link href="/account" className="px-4 py-2 rounded bg-blue-100 text-blue-700 font-semibold hover:bg-blue-200 border border-blue-200 transition">Profilim</Link>
              <button onClick={handleLogout} className="px-4 py-2 rounded bg-red-500 text-white font-semibold hover:bg-red-600 transition">Çıkış Yap</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
// Türkçe açıklama:
// - Giriş yapılmamışsa sağ üstte Giriş Yap ve Kayıt Ol butonları gösterilir.
// - Giriş yapılmışsa Profilim ve Çıkış Yap butonları gösterilir.
// - Kullanıcı admin ise ayrıca Admin Panel butonu da görünür.
// - Çıkış Yap'a tıklanınca localStorage temizlenir ve anasayfaya yönlendirilir.
// - Responsive ve sade bir tasarım sunar. 