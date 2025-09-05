import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const images = [
  "/images/atkiresim.jpg",
  "/images/bereresim.jpg",
  "/images/atkiresimleri.jpg",
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % images.length);
        setFade(true);
      }, 400); // fade out
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-screen relative left-1/2 right-1/2 -mx-[50vw] min-h-[500px] flex items-center justify-center pt-12 overflow-hidden bg-black">
      {/* Carousel Background */}
      {images.map((img, idx) => (
        <div
          key={img}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ease-in-out ${
            idx === current && fade ? 'opacity-40' : 'opacity-0'
          }`}
          style={{ backgroundImage: `url('${img}')` }}
          aria-hidden={idx !== current}
        />
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-purple-900/80 to-purple-900/90" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 w-full max-w-4xl mx-auto">
        {/* Badge */}
        <span className="inline-block mb-4 px-4 py-1 rounded-full bg-white/10 border border-white/20 text-sm text-white font-semibold backdrop-blur shadow">
          <span role="img" aria-label="star" className="mr-1">⭐</span> 25 Yıllık Güvenilir Partner
        </span>

        {/* Başlık */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow mb-4">
          25 YILLIK DENEYİM <span className="text-yellow-400">ATKI GETİR</span>
        </h1>

        {/* Açıklama */}
        <p className="text-lg md:text-xl text-gray-200 mb-8 drop-shadow max-w-2xl mx-auto">
          İstanbul merkezli fabrikamızda, günlük 3.000'den fazla atkı üretim kapasitemiz ile yüksek kaliteli dokuma ve saten atkılar üretiyoruz.
        </p>

        {/* CTA Butonlar */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-full shadow transition-all duration-200 text-base"
          >
            <span role="img" aria-label="phone" className="mr-2">📞</span> İletişime Geç
          </Link>
          <a
            href="mailto:info@atkigetir.com"
            className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-full shadow border border-white/20 transition-all duration-200 text-base"
          >
            <span role="img" aria-label="mail" className="mr-2">✉️</span> Teklif Al
          </a>
        </div>
      </div>
    </section>
  );
}
