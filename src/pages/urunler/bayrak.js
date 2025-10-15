import Head from "next/head";
import { useState, useEffect } from "react";
import ProductCard from '@/components/ProductCard';

export default function BayrakPage() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => {
        // Sadece Bayrak kategorisindeki ürünleri filtrele
        const bayrakProducts = (data.products || []).filter(product => 
          product.category && product.category.toLowerCase() === 'bayrak'
        );
        setProducts(bayrakProducts);
      })
      .catch(() => setError("Ürünler yüklenemedi."))
      .finally(() => setLoading(false));
  }, []);

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="max-w-7xl mx-auto py-10 px-4">
      <Head>
        <title>Bayrak Ürünleri - Atkigetir</title>
        <meta name="description" content="Resmi ve kurumsal bayrak üretimi. Takım bayrakları, kurumsal bayraklar ve özel tasarım bayrak modelleri." />
        <meta name="keywords" content="bayrak, takım bayrağı, kurumsal bayrak, özel bayrak, spor bayrağı, firma bayrağı, bayrak fiyatları, bayrak modelleri, özel tasarım bayrak, kurumsal bayrak üretimi" />
        <meta property="og:title" content="Bayrak Ürünleri - Atkigetir" />
        <meta property="og:description" content="Resmi ve kurumsal bayrak üretimi. Takım ve kuruma özel tasarım bayraklar." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://www.atkigetir.com/urunler/bayrak" />
      </Head>
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Bayrak Ürünleri</h1>
        <p className="text-gray-500">Resmi ve kurumsal bayrak üretimi. Takım ve kuruma özel tasarım bayraklar.</p>
      </div>

      {/* Arama kutusu */}
      <div className="sticky top-4 z-10 bg-white/80 backdrop-blur rounded-2xl shadow-md p-4 mb-10 border border-gray-100">
        <div className="relative w-full max-w-xs">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-lg">🔍</span>
          <input
            type="text"
            placeholder="Bayrak modellerinde ara..."
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
          <div className="text-lg text-gray-500">Bayrak ürünleri yükleniyor...</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product._id || product.slug} product={product} showCategoryBadge={false} />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-400 py-20">
              <span>Bayrak ürünü bulunamadı.</span>
            </div>
          )}
        </div>
      )}
    </main>
  );
}
