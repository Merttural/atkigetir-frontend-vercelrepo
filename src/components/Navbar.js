import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import LoginModal from "@/components/LoginModal";
import RegisterModal from "@/components/RegisterModal";
import ForgotPasswordModal from "@/components/ForgotPasswordModal";
import { useAuthContext } from "@/contexts/AuthContext";
import { useCart } from "@/hooks/useCart";

const navLinks = [
  { name: "Anasayfa", href: "/" },
  { 
    name: "Ürünler", 
    href: "/urunler",
    subMenu: [
      { name: "Tüm Ürünler", href: "/urunler" },
      { name: "Atkı", href: "/urunler/atki" },
      { name: "Bere", href: "/urunler/bere" },
      { name: "Forma", href: "/urunler/forma" },
      { name: "Bayrak", href: "/urunler/bayrak" }
    ]
  },
  { name: "Hakkımızda", href: "/hakkimizda" },
  { name: "İletişim", href: "/iletisim" },
];

function debounce(fn, ms) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const scrollHandlerRef = useRef();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  
  // Auth ve Cart hook'larını kullan
  const { user, logout, getUserFromToken } = useAuthContext();
  const { cartCount } = useCart();

  const isActive = (href) =>
    router.pathname === href || (href !== "/" && router.pathname.startsWith(href));

  // Close mobile menu on navigation
  const handleLinkClick = () => setMenuOpen(false);

  useEffect(() => {
    const handleScroll = debounce(() => {
      setScrolled(window.scrollY > 10);
    }, 20);
    scrollHandlerRef.current = handleScroll;
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Çıkış işlemi
  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <nav
      className={`w-full sticky top-0 z-50 transition-all duration-300 bg-gray-100 border-b border-gray-300 shadow-md`}
      style={{ WebkitBackdropFilter: scrolled ? "blur(12px)" : undefined }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-purple-500 bg-clip-text text-transparent flex items-center gap-2">
              <span>Atkigetir</span>
            </Link>
          </div>
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-2">
            {/* Render all navLinks except Giriş */}
            {navLinks.filter(link => link.name !== "Giriş").map((link) => (
              <div key={link.href} className="relative group">
                <Link
                  href={link.href}
                  className={`px-3 py-2 rounded-lg font-medium text-sm transition-all duration-200 hover:scale-105 hover:underline hover:underline-offset-4 hover:text-blue-700 text-gray-900 flex items-center ${
                    isActive(link.href)
                      ? "underline underline-offset-4 text-blue-700 font-bold"
                      : ""
                  }`}
                >
                  {link.name}
                  {link.subMenu && (
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </Link>
                {link.subMenu && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    {link.subMenu.map((subLink) => (
                      <Link
                        key={subLink.href}
                        href={subLink.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg"
                      >
                        {subLink.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link
              href="/cart"
              className="ml-2 px-3 py-2 rounded-lg font-medium flex items-center gap-1 bg-secondary text-blue-900 hover:bg-secondary/90 hover:scale-105 transition-all duration-200 text-sm relative"
            >
              <span className="inline-block align-middle">🛒</span>
              <span className="hidden sm:inline">Sepet</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </Link>
            {/* Kullanıcı yoksa Giriş/Kayıt */}
            {!user && (
              <>
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="px-3 py-2 rounded-lg font-medium text-sm transition-all duration-200 hover:scale-105 hover:underline hover:underline-offset-4 hover:text-blue-600 text-blue-900"
                  type="button"
                >
                  Giriş
                </button>
                <button
                  onClick={() => setShowRegisterModal(true)}
                  className="px-3 py-2 rounded-lg font-medium text-sm transition-all duration-200 hover:scale-105 hover:underline hover:underline-offset-4 hover:text-blue-600 text-blue-900"
                  type="button"
                >
                  Kayıt Ol
                </button>
              </>
            )}
            {/* Kullanıcı varsa Profil/Çıkış ve admin ise Admin Panel */}
            {user && (
              <>
                {user.role === 'admin' && (
                  <Link href="/admin" className="px-3 py-2 rounded-lg font-medium text-sm bg-yellow-500 text-white hover:bg-yellow-600 transition">Admin Panel</Link>
                )}
                <Link href="/account" className="px-3 py-2 rounded-lg font-medium text-sm bg-blue-100 text-blue-700 hover:bg-blue-200 border border-blue-200 transition">Profilim</Link>
                <button onClick={handleLogout} className="px-3 py-2 rounded-lg font-medium text-sm bg-red-500 text-white hover:bg-red-600 transition">Çıkış Yap</button>
              </>
            )}
          </div>
          {/* Hamburger (Mobile) */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary transition-all duration-150"
              aria-label="Menüyü Aç/Kapat"
            >
              {/* Hamburger Icon */}
              <svg
                className="h-7 w-7"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed inset-0 z-40 transition-all duration-300 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ background: menuOpen ? "rgba(0,0,0,0.25)" : "transparent" }}
        onClick={handleLinkClick}
      >
        <div
          className={`absolute right-0 top-0 w-64 h-full bg-gray-100 shadow-lg border-l border-gray-200 backdrop-blur transform transition-transform duration-300 ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          } flex flex-col pt-20 px-6 gap-1`}
          onClick={e => e.stopPropagation()}
        >
          {navLinks.filter(link => link.name !== "Giriş").map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block px-3 py-2 rounded-lg font-medium text-sm transition-all duration-200 hover:scale-105 hover:underline hover:underline-offset-4 hover:text-blue-600 text-blue-900 ${
                isActive(link.href)
                  ? "underline underline-offset-4 text-blue-700 font-bold"
                  : ""
              }`}
              onClick={handleLinkClick}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/cart"
            className="mt-2 px-3 py-2 rounded-lg font-medium flex items-center gap-1 bg-secondary text-blue-900 hover:bg-secondary/90 hover:scale-105 transition-all duration-200 text-sm relative"
            onClick={handleLinkClick}
          >
            <span className="inline-block align-middle">🛒</span>
            <span>Sepet</span>
            {cartCount > 0 && (
              <span className="ml-auto bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </Link>
          {/* Kullanıcı yoksa Giriş/Kayıt */}
          {!user && (
            <>
              <button
                onClick={() => { setShowLoginModal(false); setShowRegisterModal(true); }}
                className="block w-full text-left px-3 py-2 rounded-lg font-medium text-sm transition-all duration-200 hover:scale-105 hover:underline hover:underline-offset-4 hover:text-blue-600 text-blue-900"
                type="button"
              >
                Kayıt Ol
              </button>
              <button
                onClick={() => { setShowRegisterModal(false); setShowLoginModal(true); }}
                className="block w-full text-left px-3 py-2 rounded-lg font-medium text-sm transition-all duration-200 hover:scale-105 hover:underline hover:underline-offset-4 hover:text-blue-600 text-blue-900"
                type="button"
              >
                Giriş
              </button>
            </>
          )}
          {/* Kullanıcı varsa Profil/Çıkış ve admin ise Admin Panel */}
          {user && (
            <>
              {user.role === 'admin' && (
                <Link href="/admin" className="block px-3 py-2 rounded-lg font-medium text-sm bg-yellow-500 text-white hover:bg-yellow-600 transition">Admin Panel</Link>
              )}
              <Link href="/account" className="block px-3 py-2 rounded-lg font-medium text-sm bg-blue-100 text-blue-700 hover:bg-blue-200 border border-blue-200 transition">Profilim</Link>
              <button onClick={handleLogout} className="block w-full text-left px-3 py-2 rounded-lg font-medium text-sm bg-red-500 text-white hover:bg-red-600 transition">Çıkış Yap</button>
            </>
          )}
        </div>
      </div>
      <LoginModal
        open={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onRegister={() => {
          setShowLoginModal(false);
          setShowRegisterModal(true);
        }}
        onForgot={() => {
          setShowLoginModal(false);
          setShowForgotModal(true);
        }}
      />
      <RegisterModal
        open={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
        onLogin={() => {
          setShowRegisterModal(false);
          setShowLoginModal(true);
        }}
      />
      <ForgotPasswordModal
        open={showForgotModal}
        onClose={() => setShowForgotModal(false)}
        onLogin={() => {
          setShowForgotModal(false);
          setShowLoginModal(true);
        }}
      />
    </nav>
  );
} 