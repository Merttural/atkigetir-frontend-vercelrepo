import { useState, useEffect } from "react";
import ProductCard from '@/components/ProductCard';
import SEO from '@/components/SEO';

export default function AtkiPage() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://atkigetir-backend.onrender.com'}/api/products`)
      .then(res => res.json())
      .then(data => {
        // Sadece Atkı kategorisindeki ürünleri filtrele
        const atkiProducts = (data.products || []).filter(product => 
          product.category && product.category.toLowerCase() === 'atkı'
        );
        setProducts(atkiProducts);
      })
      .catch(() => setError("Ürünler yüklenemedi."))
      .finally(() => setLoading(false));
  }, []);

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <SEO
        title="Atkı Modelleri ve Fiyatları 2024 | En Kaliteli Atkılar - Atkigetir"
        description="2024'ün en kaliteli atkı modelleri! Kişiye özel tasarım atkılar, şal atkılar, dokuma atkılar ve kışlık atkı modelleri. Hızlı kargo, güvenli alışveriş, uygun fiyatlar."
        keywords="atkı, atkı modelleri, atkı fiyatları, kışlık atkı, şal atkı, dokuma atkı, kişiye özel atkı, kaliteli atkı, ucuz atkı, erkek atkı, kadın atkı"
        url="/urunler/atki"
        type="website"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Atkı Modelleri",
          "description": "En kaliteli atkı modelleri ve fiyatları",
          "url": "https://atkigetir.com/urunler/atki",
          "mainEntity": {
            "@type": "ItemList",
            "numberOfItems": products.length,
            "itemListElement": products.slice(0, 10).map((product, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "item": {
                "@type": "Product",
                "name": product.name,
                "url": `https://atkigetir.com/urunler/${product.slug || product._id}`,
                "image": product.image,
                "offers": {
                  "@type": "Offer",
                  "price": product.price,
                  "priceCurrency": "TRY"
                }
              }
            }))
          }
        }}
      />
      
      <main className="max-w-7xl mx-auto py-10 px-4">
      
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">Atkı Modelleri ve Fiyatları 2024</h1>
        <p className="text-lg text-gray-600 mb-4">En kaliteli atkı modelleri Atkigetir'de! Kişiye özel tasarım atkılar, şal atkılar ve kışlık atkı modelleri.</p>
        
        {/* SEO İçerik Bölümü */}
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Neden Atkigetir'den Atkı Almalısınız?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-2 text-gray-700">✨ Kaliteli Malzemeler</h3>
              <p className="text-gray-600">Yün, saten ve premium kumaşlardan üretilen dayanıklı atkı modelleri.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2 text-gray-700">🎨 Kişiye Özel Tasarım</h3>
              <p className="text-gray-600">İstediğiniz renk, desen ve boyutta özel atkı tasarımı yapıyoruz.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2 text-gray-700">🚚 Hızlı Kargo</h3>
              <p className="text-gray-600">Türkiye'nin her yerine güvenli ve hızlı kargo seçenekleri.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2 text-gray-700">💰 Uygun Fiyatlar</h3>
              <p className="text-gray-600">Kaliteli atkı modellerini en uygun fiyatlarla sunuyoruz.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Arama kutusu */}
      <div className="sticky top-4 z-10 bg-white/80 backdrop-blur rounded-2xl shadow-md p-4 mb-10 border border-gray-100">
        <div className="relative w-full max-w-xs">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-lg">🔍</span>
          <input
            type="text"
            placeholder="Atkı modellerinde ara..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 bg-white shadow focus:outline-none focus:ring-2 focus:ring-primary text-base transition"
          />
        </div>
      </div>

      {/* Ürün grid'i */}
      {error && <div className="text-red-600 mb-4">{error}</div>}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="text-lg text-gray-500">Atkı ürünleri yükleniyor...</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product._id || product.slug} product={product} showCategoryBadge={false} />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-400 py-20">
              <span>Atkı ürünü bulunamadı.</span>
            </div>
          )}
        </div>
      )}
      
      {/* FAQ Bölümü */}
      <div className="mt-16 bg-white rounded-lg p-8 border border-gray-200">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Sıkça Sorulan Sorular</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2 text-gray-800">Atkı modelleri hangi malzemelerden üretiliyor?</h3>
            <p className="text-gray-600">Atkı modellerimiz yün, saten, akrilik ve premium kumaşlardan üretilmektedir. Her malzeme farklı özellikler sunar.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2 text-gray-800">Kişiye özel atkı tasarımı yapılıyor mu?</h3>
            <p className="text-gray-600">Evet! İstediğiniz renk, desen, boyut ve yazı ile özel atkı tasarımı yapıyoruz.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2 text-gray-800">Kargo süresi ne kadar?</h3>
            <p className="text-gray-600">Normal siparişler 2-3 iş gününde, özel tasarım atkılar 5-7 iş gününde hazırlanır.</p>
          </div>
        </div>
      </div>
      
    </main>
    </>
  );
}
