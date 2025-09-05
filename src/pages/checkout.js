import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

export default function CheckoutPage() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
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
    // localStorage'dan sepet verilerini al
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(savedCart);
    setLoading(false);
  }, []);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 py-10 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
          </div>
        </div>
      </main>
    );
  }

  if (cart.length === 0) {
    return (
      <main className="min-h-screen bg-gray-50 py-10 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">Sepetiniz Boş</h1>
          <p className="text-gray-600 mb-8">Ödeme yapmak için sepetinizde ürün bulunmalıdır.</p>
                        <Link href="/urunler" legacyBehavior>
            <a className="bg-gradient-to-r from-blue-600 to-purple-500 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-600 transition">
              Alışverişe Başla
            </a>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <>
      <Head>
        <title>Ödeme - Atkigetir</title>
        <meta name="description" content="Güvenli ödeme sayfası. Atkigetir ile güvenli alışveriş yapın." />
      </Head>
      <main className="min-h-screen bg-gray-50 py-10 px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">Ödeme</h1>
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-8">
        {/* Delivery Form */}
        <form className="flex-1 bg-white rounded-xl shadow p-6 flex flex-col gap-4">
          <h2 className="text-xl font-bold mb-2">Teslimat Bilgileri</h2>
          <div>
            <label className="block mb-1 font-medium" htmlFor="name">Ad Soyad</label>
            <input
              id="name"
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            />
          </div>
          <div>
            <label className="block mb-1 font-medium" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            />
          </div>
          <div>
            <label className="block mb-1 font-medium" htmlFor="phone">Telefon</label>
            <input
              id="phone"
              type="tel"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
              value={form.phone}
              onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
            />
          </div>
          <div>
            <label className="block mb-1 font-medium" htmlFor="address">Adres</label>
            <textarea
              id="address"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 min-h-[60px]"
              value={form.address}
              onChange={e => setForm(f => ({ ...f, address: e.target.value }))}
            />
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block mb-1 font-medium" htmlFor="city">Şehir</label>
              <input
                id="city"
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                value={form.city}
                onChange={e => setForm(f => ({ ...f, city: e.target.value }))}
              />
            </div>
            <div className="flex-1">
              <label className="block mb-1 font-medium" htmlFor="postal">Posta Kodu</label>
              <input
                id="postal"
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                value={form.postal}
                onChange={e => setForm(f => ({ ...f, postal: e.target.value }))}
              />
            </div>
          </div>
        </form>
        {/* Order Summary */}
        <div className="w-full md:w-80 bg-white rounded-xl shadow p-6 h-fit flex flex-col gap-4 border border-blue-50">
          <h2 className="text-xl font-bold mb-2">Sipariş Özeti</h2>
          <ul className="divide-y divide-gray-200 mb-2">
            {cart.map((item) => (
              <li key={item.name} className="flex justify-between py-2">
                <span>{item.name} <span className="text-gray-500">x{item.quantity}</span></span>
                <span className="font-semibold">₺{item.price * item.quantity}</span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between text-gray-700">
            <span>Toplam Ürün:</span>
            <span>{totalItems}</span>
          </div>
          <div className="flex justify-between text-gray-700 mb-4">
            <span>Toplam Tutar:</span>
            <span className="font-bold text-blue-700">₺{totalPrice}</span>
          </div>
          <button
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold mt-2"
            type="button"
          >
            Siparişi Tamamla
          </button>
        </div>
      </div>
    </main>
    </>
  );
} 