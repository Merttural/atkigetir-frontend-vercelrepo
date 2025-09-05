import { Factory, Users, Award } from 'lucide-react';

const trustItems = [
  {
    icon: <Factory className="w-7 h-7 text-blue-400" />, badge: '3,000+ Günlük', badgeColor: 'bg-blue-600',
    title: 'Yüksek Üretim Kapasitesi',
    desc: "Günlük 3.000'den fazla atkı üretim kapasitemiz ile büyük siparişleri hızlı ve kaliteli şekilde teslim ediyoruz."
  },
  {
    icon: <Users className="w-7 h-7 text-green-400" />, badge: '100% Özel', badgeColor: 'bg-green-600',
    title: 'Kişiye Özel Üretim',
    desc: 'Müşterilerimizin ihtiyaçlarına göre özel dokuma ve saten atkılar üretiyoruz.'
  },
  {
    icon: <Award className="w-7 h-7 text-purple-400" />, badge: '25 Yıl', badgeColor: 'bg-purple-600',
    title: 'Tecrübe ve Güven',
    desc: '25 yıllık deneyimimizle sektörde güvenilir ve kaliteli üretim yapan bir firmayız.'
  },
];

export default function TrustSection() {
  return (
    <section className="w-screen relative left-1/2 right-1/2 -mx-[50vw] bg-[#232b36] py-16">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-3">Neden Bizi Tercih Ediyorlar?</h2>
        <p className="text-gray-300 text-center mb-10 max-w-2xl mx-auto">
          Sektördeki deneyimimiz ve kaliteli üretim anlayışımızla müşterilerimize en iyi hizmeti sunuyoruz.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {trustItems.map((item) => (
            <div
              key={item.title}
              className="bg-[#232b36] rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 p-8 text-center border border-white/5"
            >
              <div className="flex justify-center mb-4">
                <div className="w-14 h-14 rounded-full flex items-center justify-center bg-white/5 mb-2">
                  {item.icon}
                </div>
              </div>
              <span className={`inline-block mb-3 px-3 py-1 rounded-full text-xs font-semibold text-white ${item.badgeColor}`}>
                {item.badge}
              </span>
              <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
              <p className="text-gray-300 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
