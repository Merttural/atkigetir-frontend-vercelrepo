import { useState } from "react";

export default function IletisimPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    subject: "",
    message: ""
  });

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Gradient Header & Contact Area */}
      <div className="w-full bg-gradient-to-r from-blue-600 to-purple-500 py-12 px-2">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-2 text-center">İletişim</h1>
          <p className="text-lg text-white/90 text-center mb-8">25 yıllık deneyimimizle projelerinizde yanınızdayız. Bizimle iletişime geçin!</p>
          <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch">
            {/* Contact Info Card */}
            <div className="flex-1 bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-6 min-w-[280px] max-w-md mx-auto md:mx-0">
              <h2 className="text-xl font-bold mb-2">İletişim Bilgileri</h2>
              <div className="flex items-start gap-3">
                <span className="text-2xl text-blue-600">📍</span>
                <div>
                  <div className="font-semibold">Adres</div>
                  <div className="text-gray-700">Tekstil Sanayi Sitesi<br/>34000 İstanbul, Türkiye</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl text-green-500">📞</span>
                <div>
                  <div className="font-semibold">Telefon</div>
                  <div className="text-gray-700">+90 (212) 555 0123<br/>+90 (212) 555 0124</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl text-purple-500">✉️</span>
                <div>
                  <div className="font-semibold">E-posta</div>
                  <div className="text-gray-700">info@atkigetir.com<br/>siparis@atkigetir.com</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl text-orange-400">⏰</span>
                <div>
                  <div className="font-semibold">Çalışma Saatleri</div>
                  <div className="text-gray-700">Pazartesi - Cuma: 08:00 - 18:00<br/>Cumartesi: 09:00 - 16:00<br/>Pazar: Kapalı</div>
                </div>
              </div>
              {/* Stats */}
              <div className="flex gap-8 mt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-700">3,000+</div>
                  <div className="text-xs text-gray-500">Günlük Üretim</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-700">25</div>
                  <div className="text-xs text-gray-500">Yıllık Deneyim</div>
                </div>
              </div>
            </div>

            {/* Contact Form Card */}
            <form className="flex-1 bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-4 min-w-[280px] max-w-md mx-auto md:mx-0">
              <h2 className="text-xl font-bold mb-2">Mesaj Gönder</h2>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <label className="block mb-1 font-medium">Ad Soyad *</label>
                  <input type="text" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
                </div>
                <div className="flex-1">
                  <label className="block mb-1 font-medium">E-posta *</label>
                  <input type="email" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required />
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <label className="block mb-1 font-medium">Şirket</label>
                  <input type="text" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200" value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} />
                </div>
                <div className="flex-1">
                  <label className="block mb-1 font-medium">Telefon</label>
                  <input type="text" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
                </div>
              </div>
              <div>
                <label className="block mb-1 font-medium">Konu *</label>
                <select className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200" value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} required>
                  <option value="">Konu seçin</option>
                  <option value="Teklif">Teklif</option>
                  <option value="Sipariş">Sipariş</option>
                  <option value="Destek">Destek</option>
                  <option value="Diğer">Diğer</option>
                </select>
              </div>
              <div>
                <label className="block mb-1 font-medium">Mesaj *</label>
                <textarea 
                  rows={4} 
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200" 
                  value={form.message} 
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))} 
                  required 
                />
              </div>
              <button 
                type="submit" 
                className="bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Mesaj Gönder
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Konumumuz</h2>
          <div className="bg-gray-200 rounded-2xl h-96 flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-4">🗺️</div>
              <p className="text-gray-600">Harita burada görüntülenecek</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 