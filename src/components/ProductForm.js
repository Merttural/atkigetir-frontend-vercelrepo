// ProductForm.js
import { useState, useEffect } from 'react';

export default function ProductForm({ onProductAdded }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);

  // ✅ Kategorileri sunucudan çek
  useEffect(() => {
          fetch('https://atkigetir-backend.onrender.com/api/categories')
      .then(res => res.json())
      .then(data => setCategories(data.categories || []));
  }, []);

  // ✅ Ürün ekleme isteği
  const handleSubmit = async (e) => {
    e.preventDefault();

          const res = await fetch('https://atkigetir-backend.onrender.com/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, price, image, category }),
    });

    if (res.ok) {
      setName('');
      setPrice('');
      setImage('');
      setCategory('');
      if (onProductAdded) onProductAdded();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Ürün Adı */}
      <input
        type="text"
        placeholder="Ürün adı"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border px-4 py-2 rounded w-full"
        required
      />

      {/* Fiyat */}
      <input
        type="number"
        placeholder="Fiyat (₺)"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="border px-4 py-2 rounded w-full"
        required
      />

      {/* Görsel URL */}
      <input
        type="text"
        placeholder="Görsel URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        className="border px-4 py-2 rounded w-full"
      />

      {/* ✅ Kategori Seçimi */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border px-4 py-2 rounded w-full"
        required
      >

        <option value="">Kategori Seçin</option>
        {categories.map((cat) => (
          <option key={cat._id} value={cat.name}>
            {cat.name}
          </option>
        ))}
      </select>

      {/* Gönder Butonu */}
      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Ürünü Ekle
      </button>
    </form>
  );
}
