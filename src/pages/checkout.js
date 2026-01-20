import { useState, useEffect } from "react";
import SEO from "@/components/SEO";
import Breadcrumbs from '@/components/Breadcrumbs';
import DisabledFeatureModal from '@/components/DisabledFeatureModal';
import LoadingSpinner from '@/components/LoadingSpinner';
import Link from "next/link";
import { useRouter } from "next/router";
import { ShoppingBag, ArrowRight, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CheckoutPage() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDisabledModal, setShowDisabledModal] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postal: ""
  });
  const router = useRouter();

  useEffect(() => {
    // localStorage'dan sepet verilerini al (SSR-safe)
    if (typeof window === 'undefined') return;
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(savedCart);
    setLoading(false);
  }, []);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowDisabledModal(true);
  };
  
  const handleWhatsApp = () => {
    const items = cart.map(item => `${item.name} (${item.quantity}x)`).join(', ');
    const message = `Merhaba, sipariş vermek istiyorum:\n\n${items}\n\nToplam: ₺${totalPrice}\n\nTeslimat Bilgileri:\nAd Soyad: ${form.name}\nEmail: ${form.email}\nTelefon: ${form.phone}\nAdres: ${form.address}\nŞehir: ${form.city}\nPosta Kodu: ${form.postal}`;
    
    // Google Ads conversion tracking
    googleAds.trackConversion();
    
    window.open(`https://wa.me/905337498266?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

  if (loading) {
    return (
      <div className="bg-[#F8FAFC] min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Yükleniyor..." />
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <>
        <SEO
          title="Ödeme - Atkigetir"
          description="Ödeme yapmak için sepetinizde ürün bulunmalıdır."
          url="/checkout"
        />
        <div className="bg-[#F8FAFC] min-h-screen flex items-center justify-center py-12 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto text-center w-full"
          >
            <div className="bg-white rounded-[24px] shadow-sm border border-slate-200 p-12">
              <div className="w-20 h-20 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center mx-auto mb-6" aria-hidden="true">
                <ShoppingBag className="w-10 h-10 text-slate-400" />
              </div>
              <h1 className="text-3xl font-bold text-[#0F172A] mb-4 tracking-tighter">Sepetiniz Boş</h1>
              <p className="text-slate-500 mb-8">Ödeme yapmak için sepetinizde ürün bulunmalıdır.</p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/urunler"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-[#2563EB] to-[#1e40af] text-white px-8 py-3 rounded-xl font-semibold hover:from-[#1e40af] hover:to-[#1e3a8a] transition-all shadow-md hover:shadow-lg"
                  aria-label="Alışverişe başla - Ürünler sayfasına git"
                >
                  <ShoppingBag className="w-5 h-5" aria-hidden="true" />
                  <span>Alışverişe Başla</span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO
        title="Ödeme - Atkigetir"
        description="Güvenli ödeme sayfası. Atkigetir ile güvenli alışveriş yapın."
        url="/checkout"
      />
      <div className="bg-[#F8FAFC] min-h-screen py-6">
        <div className="max-w-7xl mx-auto px-4">
          <Breadcrumbs items={[
            { name: 'Anasayfa', href: '/' },
            { name: 'Sepet', href: '/sepet' },
            { name: 'Ödeme', href: '/checkout' }
          ]} />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h1 className="text-3xl font-bold text-[#0F172A] mb-8 text-center tracking-tighter">Ödeme</h1>
            <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-6">
              {/* Delivery Form */}
              <motion.form
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                onSubmit={handleSubmit}
                className="flex-1 bg-white rounded-[24px] shadow-sm border border-slate-200 p-6 flex flex-col gap-4"
              >
                <h2 className="text-xl font-bold text-[#0F172A] mb-2 tracking-tight">Teslimat Bilgileri</h2>
                <div>
                  <label className="block mb-2 text-sm font-medium text-[#0F172A]" htmlFor="name">Ad Soyad *</label>
                  <input
                    id="name"
                    type="text"
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] text-sm bg-white transition-all"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    required
                    aria-required="true"
                    aria-label="Ad Soyad"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-[#0F172A]" htmlFor="email">Email *</label>
                  <input
                    id="email"
                    type="email"
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] text-sm bg-white transition-all"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    required
                    aria-required="true"
                    aria-label="Email adresi"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-[#0F172A]" htmlFor="phone">Telefon *</label>
                  <input
                    id="phone"
                    type="tel"
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] text-sm bg-white transition-all"
                    value={form.phone}
                    onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    required
                    aria-required="true"
                    aria-label="Telefon numarası"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-[#0F172A]" htmlFor="address">Adres *</label>
                  <textarea
                    id="address"
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] min-h-[80px] text-sm bg-white resize-none transition-all"
                    value={form.address}
                    onChange={e => setForm(f => ({ ...f, address: e.target.value }))}
                    required
                    aria-required="true"
                    aria-label="Teslimat adresi"
                  />
                </div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block mb-2 text-sm font-medium text-[#0F172A]" htmlFor="city">Şehir *</label>
                    <input
                      id="city"
                      type="text"
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] text-sm bg-white transition-all"
                      value={form.city}
                      onChange={e => setForm(f => ({ ...f, city: e.target.value }))}
                      required
                      aria-required="true"
                      aria-label="Şehir"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block mb-2 text-sm font-medium text-[#0F172A]" htmlFor="postal">Posta Kodu</label>
                    <input
                      id="postal"
                      type="text"
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] text-sm bg-white transition-all"
                      value={form.postal}
                      onChange={e => setForm(f => ({ ...f, postal: e.target.value }))}
                      aria-label="Posta kodu"
                    />
                  </div>
                </div>
              </motion.form>
              
              {/* Order Summary */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="w-full lg:w-80 bg-white rounded-[24px] shadow-sm border border-slate-200 p-6 h-fit flex flex-col gap-4"
              >
                <h2 className="text-xl font-bold text-[#0F172A] mb-2 tracking-tight">Sipariş Özeti</h2>
                <ul className="divide-y divide-slate-200 mb-2" role="list" aria-label="Sipariş özeti ürünleri">
                  {cart.map((item) => (
                    <li key={item.name} className="flex justify-between py-3 text-sm" role="listitem">
                      <span className="text-slate-700">{item.name} <span className="text-slate-400" aria-label={`${item.quantity} adet`}>x{item.quantity}</span></span>
                      <span className="font-semibold text-[#0F172A]" aria-label={`${item.price * item.quantity} Türk Lirası`}>₺{item.price * item.quantity}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex justify-between text-slate-600 text-sm pt-2">
                  <span>Toplam Ürün:</span>
                  <span className="font-semibold text-[#0F172A]">{totalItems}</span>
                </div>
                <div className="flex justify-between items-baseline pt-2 border-t border-slate-200">
                  <span className="text-lg font-semibold text-[#0F172A]">Toplam Tutar:</span>
                  <span className="text-2xl font-bold bg-gradient-to-r from-[#2563EB] to-[#1e40af] bg-clip-text text-transparent">
                    ₺{totalPrice.toFixed(2)}
                  </span>
                </div>
                <div className="space-y-3 mt-4">
                  <motion.button
                    onClick={handleSubmit}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-[#2563EB] to-[#1e40af] text-white py-3.5 rounded-xl font-semibold hover:from-[#1e40af] hover:to-[#1e3a8a] transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                    type="button"
                    aria-label="Siparişi tamamla"
                  >
                    <span>Siparişi Tamamla</span>
                    <ArrowRight className="w-5 h-5" aria-hidden="true" />
                  </motion.button>
                  
                  <motion.button
                    onClick={handleWhatsApp}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-[#22C55E] to-[#16A34A] text-white py-3.5 rounded-xl font-semibold hover:from-[#16A34A] hover:to-[#15803d] transition-all shadow-md hover:shadow-[0_0_25px_rgba(34,197,94,0.4)] flex items-center justify-center gap-2 group"
                    type="button"
                    aria-label="WhatsApp üzerinden sipariş ver"
                  >
                    <MessageCircle className="w-5 h-5" aria-hidden="true" />
                    <span>WhatsApp'tan Sipariş Ver</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true" />
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      
      <DisabledFeatureModal
        isOpen={showDisabledModal}
        onClose={() => setShowDisabledModal(false)}
      />
    </>
  );
} 