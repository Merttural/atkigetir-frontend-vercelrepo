export default function AboutBanner() {
  return (
    <>
      {/* Üst Tanıtım Alanı (Koyu Zeminli) */}
<section className="w-screen relative left-1/2 right-1/2 -mx-[50vw] bg-gray-900 text-white py-16">
  <div className="max-w-4xl mx-auto px-4 text-center">
    <h2 className="text-3xl md:text-4xl font-bold mb-6">Atkı Getir Hakkında</h2>
    <div className="text-base md:text-lg leading-relaxed space-y-4">
      <p><b>Atkı Getir</b>, 25 yıllık deneyimiyle atkı, bere ve forma üretiminde uzmanlaşmış bir firmadır. İstanbul’daki tesislerimizde, yüksek kaliteli <b>dokuma ve saten atkılar</b> üreterek sektörde fark yaratıyoruz. Kişiye özel tasarım ve imalat hizmetlerimiz sayesinde müşterilerimizin taleplerine uygun, tamamen özelleştirilmiş ürünler sunuyoruz.</p>
      <p>Üretim sürecimizin her aşamasında <b>kaliteye ve yeniliğe</b> önem veriyor, günlük 3.000’den fazla ürün kapasitemizle hızlı ve güvenilir çözümler sağlıyoruz. <b>Müşteri memnuniyeti</b>, bizim için her zaman en büyük önceliktir.</p>
      <p><b>İstanbul merkezli fabrikamızda</b> modern teknoloji ve deneyimli ekibimizle, toptan atkı siparişlerinden kişiye özel tasarımlara kadar geniş bir yelpazede hizmet veriyoruz. Çevre dostu üretim anlayışımız ve sürdürülebilir iş modelimizle gelecek nesillere daha iyi bir dünya bırakmayı hedefliyoruz.</p>
    </div>
  </div>
</section>
                                                                                                                                                                                                                                                                                    

      {/* Alt İletişim Çağrısı Alanı (Gradyan Zeminli) */}
      <section className="w-screen relative left-1/2 right-1/2 -mx-[50vw] bg-gradient-to-r from-blue-600 to-purple-600 py-16">
      <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Projeleriniz İçin Bizimle İletişime Geçin</h3>
          <p className="text-lg text-white/80 mb-8">
            25 yıllık deneyimimizle sizin de projelerinizde yer almak istiyoruz. Özel üretim talepleriniz için hemen iletişime geçin.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:05337498266"
              className="inline-flex items-center justify-center bg-white text-blue-700 font-semibold px-6 py-3 rounded-full shadow hover:bg-blue-100 transition-all duration-200 text-base"
            >
              <span role="img" aria-label="phone" className="mr-2">📞</span> Hemen Ara
            </a>
            <a
              href="mailto:info@atkigetir.com"
              className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-full shadow border border-white/20 transition-all duration-200 text-base"
            >
              <span role="img" aria-label="mail" className="mr-2">✉️</span> E-posta Gönder
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
