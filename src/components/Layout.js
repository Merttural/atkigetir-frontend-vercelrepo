import { useState, useEffect, memo } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';
import { Search, MessageCircle, Phone, Menu, X, ArrowRight, ShoppingBag, LogIn, UserPlus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SearchModal from './SearchModal';
import { useCart } from '@/hooks/useCart';

// Lazy load heavy components
const StickyWhatsApp = dynamic(() => import('./StickyWhatsApp'), {
  ssr: false // Client-side only
});

const FloatingQuickContact = dynamic(() => import('./FloatingQuickContact'), {
  ssr: false // Client-side only
});

const GlobalCTABand = dynamic(() => import('./GlobalCTABand'), {
  ssr: true
});

function Layout({ children }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const { cartCount } = useCart();

  const whatsappNumber = '905337498266';
  const phoneNumber = '+90-533-749-82-66';

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/urunler?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  const handleSearchModal = (query) => {
    if (query) {
      window.location.href = `/urunler?search=${encodeURIComponent(query)}`;
    }
  };

  const navLinks = [
    { name: 'Anasayfa', href: '/' },
    { name: 'Ürünler', href: '/urunler' },
    { name: 'Blog', href: '/blog' },
    { name: 'Hakkımızda', href: '/hakkimizda' },
    { name: 'İletişim', href: '/iletisim' },
    { name: 'SSS', href: '/sss' }
  ];

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Dekoratif Blur Daireler - Fixed */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Sağ Üst - Lacivert */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        {/* Sol Alt - Yeşil */}
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />
      </div>
      
      {/* Nokta Deseni - Fixed Background Pattern */}
      <div 
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(26, 54, 93, 0.03) 1px, transparent 1px)`,
          backgroundSize: '20px 20px',
          backgroundPosition: '0 0'
        }}
      />
      
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm relative z-10">
        <div className="max-w-[1920px] mx-auto px-6 md:px-8 lg:px-12">
          <div className="flex items-center justify-between h-20 gap-4">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <div className="flex items-center gap-2">
                <Image
                  src="/images/atkigetirlogo.jpg"
                  alt="Atkigetir"
                  width={40}
                  height={40}
                  className="w-10 h-10"
                  priority
                  unoptimized={process.env.NODE_ENV === 'development'}
                />
                <span className="text-xl font-bold text-[#0F172A] tracking-tight">Atkigetir</span>
              </div>
            </Link>

            {/* Search Bar - Desktop - Modal açıcı */}
            <div className="hidden md:flex flex-1 max-w-md mx-8 relative">
              <button
                onClick={() => setSearchModalOpen(true)}
                aria-label="Ürün ara"
                className="w-full px-4 py-2.5 pl-10 pr-4 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] text-sm bg-white transition-all text-left text-slate-400 hover:border-[#2563EB]"
              >
                Ürün ara...
              </button>
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              {/* Giriş Yap Button - Desktop */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden md:block"
              >
                <Link
                  href="/login"
                  className="flex items-center gap-2 text-[#0F172A] hover:text-[#2563EB] transition-colors px-3 py-2 rounded-lg hover:bg-slate-50"
                >
                  <LogIn className="w-4 h-4" />
                  <span className="text-sm font-medium">Giriş Yap</span>
                </Link>
              </motion.div>

              {/* Kayıt Ol Button - Desktop */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden md:block"
              >
                <Link
                  href="/register"
                  className="flex items-center gap-2 text-[#0F172A] hover:text-[#2563EB] transition-colors px-3 py-2 rounded-lg hover:bg-slate-50"
                >
                  <UserPlus className="w-4 h-4" />
                  <span className="text-sm font-medium">Kayıt Ol</span>
                </Link>
              </motion.div>

              {/* Sepet Button - Desktop */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden md:block relative"
              >
                <Link
                  href="/sepet"
                  className="flex items-center gap-2 text-[#0F172A] hover:text-[#2563EB] transition-colors px-3 py-2 rounded-lg hover:bg-slate-50 relative"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span className="text-sm font-medium">Sepet</span>
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-gradient-to-r from-[#2563EB] to-[#1e40af] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center" aria-label={`Sepette ${cartCount} ürün var`}>
                      {cartCount > 9 ? '9+' : cartCount}
                    </span>
                  )}
                </Link>
              </motion.div>

              {/* WhatsApp Button */}
              <motion.a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp ile hızlı teklif al"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden md:flex items-center gap-2 bg-gradient-to-r from-[#22C55E] to-[#16A34A] text-white px-4 py-2 rounded-xl font-semibold hover:from-[#16A34A] hover:to-[#15803d] transition-all shadow-md hover:shadow-[0_0_25px_rgba(34,197,94,0.4)] group"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                <span className="text-sm">Hızlı Teklif Al</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true" />
              </motion.a>

              {/* Phone */}
              <motion.a
                href={`tel:${phoneNumber.replace(/-/g, '')}`}
                aria-label={`Telefon: ${phoneNumber}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden md:flex items-center gap-2 text-[#0F172A] hover:text-[#2563EB] transition-colors"
              >
                <Phone className="w-5 h-5" aria-hidden="true" />
                <span className="text-sm font-medium">{phoneNumber}</span>
              </motion.a>

              {/* Mobile Search Toggle - Modal açıcı */}
              <button
                onClick={() => setSearchModalOpen(true)}
                aria-label="Ürün ara"
                aria-expanded={searchModalOpen}
                className="md:hidden p-2 text-slate-600 hover:text-[#2563EB] transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? "Menüyü kapat" : "Menüyü aç"}
                aria-expanded={mobileMenuOpen}
                className="md:hidden p-2 text-slate-600 hover:text-[#2563EB] transition-colors"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Search */}
          <AnimatePresence>
            {searchOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="md:hidden pb-4"
              >
                <form onSubmit={handleSearch} className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Ürün ara..."
                    aria-label="Ürün ara"
                    className="w-full px-4 py-2.5 pl-10 pr-4 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] text-sm bg-white"
                    autoFocus
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                </form>
              </motion.div>
            )}
          </AnimatePresence>

                {/* Navigation Links - Ortalanmış */}
                <nav className="hidden md:flex items-center justify-center gap-6 pb-4" aria-label="Ana navigasyon">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      prefetch={true}
                      className="text-sm font-medium text-slate-700 hover:text-[#2563EB] transition-colors"
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-slate-200 bg-white"
            >
              <div className="px-4 py-4 space-y-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      prefetch={link.href === '/blog' ? false : true}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-4 py-2 text-sm font-medium text-slate-700 hover:text-[#2563EB] hover:bg-slate-50 rounded-lg transition-colors"
                    >
                      {link.name}
                    </Link>
                  ))}
                <div className="pt-4 border-t border-slate-200 space-y-2">
                  {/* Giriş Yap - Mobile */}
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-slate-700 hover:text-[#2563EB] hover:bg-slate-50 rounded-lg transition-colors"
                  >
                    <LogIn className="w-4 h-4" />
                    <span className="text-sm font-medium">Giriş Yap</span>
                  </Link>
                  
                  {/* Kayıt Ol - Mobile */}
                  <Link
                    href="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-slate-700 hover:text-[#2563EB] hover:bg-slate-50 rounded-lg transition-colors"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span className="text-sm font-medium">Kayıt Ol</span>
                  </Link>
                  
                  {/* Sepet - Mobile */}
                  <Link
                    href="/sepet"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-slate-700 hover:text-[#2563EB] hover:bg-slate-50 rounded-lg transition-colors relative"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span className="text-sm font-medium">Sepet</span>
                    {cartCount > 0 && (
                      <span className="ml-auto bg-gradient-to-r from-[#2563EB] to-[#1e40af] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center" aria-label={`Sepette ${cartCount} ürün var`}>
                        {cartCount > 9 ? '9+' : cartCount}
                      </span>
                    )}
                  </Link>
                </div>
                <div className="pt-4 border-t border-slate-200 space-y-2">
                  <a
                    href={`https://wa.me/${whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#22C55E] to-[#16A34A] text-white rounded-lg font-semibold"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp'tan Yaz</span>
                  </a>
                  <a
                    href={`tel:${phoneNumber.replace(/-/g, '')}`}
                    className="flex items-center gap-2 px-4 py-2 text-slate-700 hover:bg-slate-50 rounded-lg"
                  >
                    <Phone className="w-4 h-4" />
                    <span>{phoneNumber}</span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="flex-1 relative z-10">
        {children}
      </main>

      {/* Global CTA Bandı - Footer Öncesi */}
      <GlobalCTABand />

      {/* Footer */}
      <footer className="bg-[#0F172A] text-white mt-auto relative z-10">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Image
                  src="/images/atkigetirlogo.jpg"
                  alt="Atkigetir"
                  width={32}
                  height={32}
                  className="w-8 h-8"
                  unoptimized={process.env.NODE_ENV === 'development'}
                />
                <span className="text-lg font-bold">Atkigetir</span>
              </div>
              <p className="text-slate-400 text-sm mb-4">
                Türkiye'nin önde gelen taraftar atkısı ve bayrak üreticisi. Özel üretim, toptan fiyat, hızlı teslimat.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold mb-4">Hızlı Linkler</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <Link href="/urunler" prefetch={true} className="hover:text-white transition-colors">
                    Ürünler
                  </Link>
                </li>
                <li>
                  <Link href="/blog" prefetch={false} className="hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/hakkimizda" prefetch={true} className="hover:text-white transition-colors">
                    Hakkımızda
                  </Link>
                </li>
                <li>
                  <Link href="/iletisim" prefetch={true} className="hover:text-white transition-colors">
                    İletişim
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h3 className="font-semibold mb-4">Yasal</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <Link href="/gizlilik" prefetch={false} className="hover:text-white transition-colors">
                    Gizlilik Politikası
                  </Link>
                </li>
                <li>
                  <Link href="/kosullar" prefetch={false} className="hover:text-white transition-colors">
                    Kullanım Koşulları
                  </Link>
                </li>
                <li>
                  <Link href="/cerez-politikasi" prefetch={false} className="hover:text-white transition-colors">
                    Çerez Politikası
                  </Link>
                </li>
                <li>
                  <Link href="/kvkk" prefetch={false} className="hover:text-white transition-colors">
                    KVKK Aydınlatma Metni
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-semibold mb-4">İletişim</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <a href={`tel:${phoneNumber.replace(/-/g, '')}`} className="hover:text-white transition-colors">
                    {phoneNumber}
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  <a
                    href={`https://wa.me/${whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    WhatsApp
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="font-semibold mb-4">Yasal</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <Link href="/gizlilik" className="hover:text-white transition-colors">
                    Gizlilik Politikası
                  </Link>
                </li>
                <li>
                  <Link href="/kosullar" className="hover:text-white transition-colors">
                    Kullanım Koşulları
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-slate-800 text-center text-sm text-slate-400">
            <p>&copy; {new Date().getFullYear()} Atkigetir. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>

      {/* Sticky WhatsApp Widget */}
      <StickyWhatsApp />

      {/* Floating Quick Contact Buttons (Mobile) */}
      <FloatingQuickContact />

      {/* Global Search Modal */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onSearch={handleSearchModal}
      />
    </div>
  );
}

// Memoize et - children değişmediği sürece re-render etme
export default memo(Layout);
