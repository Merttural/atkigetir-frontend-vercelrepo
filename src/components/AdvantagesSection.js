import { CheckCircle, MapPin, TrendingUp } from "lucide-react";

const advantages = [
  "İstanbul merkezli üretim tesisi",
  "Dokuma ve saten atkı uzmanlığı",
  "Hızlı teslimat garantisi",
  "Rekabetçi fiyat politikası",
  "7/24 müşteri desteği",
  "Çevre dostu üretim",
];



export default function AdvantagesSection() {
  return (
    <section className="w-screen relative left-1/2 right-1/2 -mx-[50vw] bg-[#2a3240] py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-10">Avantajlarımız</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Avantaj Listesi */}
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {advantages.map((adv, i) => (
              <div key={i} className="flex items-center bg-[#232b36] rounded-xl px-5 py-4 text-white text-base font-medium shadow">
                <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                {adv}
              </div>
            ))}
          </div>
          {/* İstanbul Merkezli Üretim Kartı */}
          <div className="bg-[#232b36] rounded-2xl shadow-lg p-7 flex flex-col text-white">
            <div className="flex items-center mb-2">
              <MapPin className="w-6 h-6 text-blue-400 mr-2" />
              <span className="font-bold text-lg">İstanbul Merkezli Üretim</span>
            </div>
            <p className="text-gray-300 mb-3 text-sm">
              Modern tesislerimizde son teknoloji makinelerle üretim yapıyoruz. Kalite kontrol süreçlerimiz sayesinde her ürünümüz en yüksek standartlarda üretilir.
            </p>
            <a href="#" className="text-blue-400 font-medium flex items-center gap-1 hover:underline text-sm">
              <TrendingUp className="w-4 h-4" /> Sürekli Gelişim ve İnovasyon
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
