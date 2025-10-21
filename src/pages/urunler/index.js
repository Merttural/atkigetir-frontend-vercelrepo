import Head from "next/head";
import { useState, useEffect } from "react";
import ProductCard from '@/components/ProductCard';

export default function UrunlerPage() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Tümü");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://atkigetir-backend.onrender.com'}/api/products`)
      .then(res => res.json())
      .then(data => setProducts(data.products || []))
      .catch(() => setError("Ürünler yüklenemedi."))
      .finally(() => setLoading(false));
  }, []);

  const categories = ["Tümü", ...Array.from(new Set(products.map(p => p.category).filter(Boolean)))];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === "Tümü" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="max-w-7xl mx-auto py-10 px-4">
      <Head>
        <title>Ürünler - Atkigetir</title>
        <meta name="description" content="Atkı, bere, bayrak ve daha fazlası. Kişiye ve kuruma özel üretim ürünler Atkigetir'de!" />
      </Head>
      <h1 className="text-3xl font-bold mb-2">Tüm Ürünler</h1>
      <p className="text-gray-500 mb-8">Atkı, bere, bayrak ve daha fazlası. Kişiye ve kuruma özel üretim!</p>
      {/* Filtre ve arama alanı */}
      <div className="sticky top-4 z-10 bg-white/80 backdrop-blur rounded-2xl shadow-md p-4 mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border border-gray-100">
        {/* Kategori sekmeleri */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200
                ${selectedCategory === cat
                  ? 'bg-gradient-to-r from-primary to-yellow-400 text-white border-primary shadow-md scale-105'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-primary/10'}
              `}
            >
              {cat}
            </button>
          ))}
        </div>
        {/* Arama kutusu */}
        <div className="relative w-full max-w-xs ml-auto">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-lg">🔍</span>
          <input
            type="text"
            placeholder="Ürün adı ile ara..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 bg-white shadow focus:outline-none focus:ring-2 focus:ring-primary text-base transition"
          />
        </div>
      </div>
      {/* Ürün grid'i */}
      {error && <div className="text-red-600 mb-4">{error}</div>}
      {loading ? (
        <div>Yükleniyor...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product._id || product.slug} product={product} showCategoryBadge={true} />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-400 py-20">
              <span>Ürün bulunamadı.</span>
            </div>
          )}
        </div>
      )}
    </main>
  );
} 