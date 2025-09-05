import React from "react";
import { Shirt, Crown, Flag } from "lucide-react";
const categories = [
  {
    name: "Atkı",
    slug: "atki",
    image: "/images/atkiresimleri.jpg",
    desc: "Yüksek kaliteli dokuma ve saten atkılar",
    icon: <Shirt className="w-5 h-5 text-white" />,
  },
  {
    name: "Bere",
    slug: "bere",
    image: "/images/bereresim.jpg",
    desc: "Örgü ve modern tasarım bereler",
    icon: <Crown className="w-5 h-5 text-white" />,
  },
  {
    name: "Bayrak",
    slug: "bayrak",
    image: "/images/bayrak.jpg",
    desc: "Resmi ve kurumsal bayrak üretimi",
    icon: <Flag className="w-5 h-5 text-white" />,
  },
  {
    name: "Forma",
    slug: "forma",
    image: "/images/forma.jpg",
    desc: "Spor formaları ve özel tasarımlar",
    icon: <Shirt className="w-5 h-5 text-white" />, // Yine Shirt ikonu
  },
];



export default function CategoryGrid() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-extrabold !text-black">Ürün Kategorilerimiz</h2>
        <p className="text-gray-600 mt-2">
          25 yıllık deneyimimizle atkı, bere, bayrak ve forma üretiminde uzmanlaştık
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-7xl mx-auto px-4">
        {categories.map((cat) => (
          <a
            key={cat.slug}
            href={`/urunler/${cat.slug}`}
            className="relative rounded-2xl shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-300"
          >
            {/* Kategori Görseli */}
            <div className="h-52 bg-cover bg-center relative overflow-hidden">
              <img 
                src={cat.image}
                alt={`${cat.name} kategorisi - ${cat.desc}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {/* Üstte ikon */}
              <div className="absolute top-3 left-3 bg-blue-600 rounded-full p-2 shadow-md">
                {cat.icon}
              </div>
            </div>

            {/* Alt bilgi alanı */}
            <div className="bg-white px-5 py-4 text-left">
              <h3 className="text-lg font-semibold text-gray-900">{cat.name}</h3>
              <p className="text-sm text-gray-500 mt-1">{cat.desc}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
