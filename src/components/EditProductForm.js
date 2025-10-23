import { useState } from 'react';

export default function EditProductForm({ product, onClose, onUpdated }) {
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [image, setImage] = useState(product.image);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://atkigetir-backend.onrender.com';
    const res = await fetch(`${apiUrl}/api/products`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: product._id, name, price, image }),
    });

    if (res.ok) {
      onUpdated();
      onClose();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded shadow">
      <h2 className="text-lg font-bold">Ürünü Güncelle</h2>

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Ürün adı"
        className="w-full border px-3 py-2 rounded"
      />
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Fiyat"
        className="w-full border px-3 py-2 rounded"
      />
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        placeholder="Görsel URL"
        className="w-full border px-3 py-2 rounded"
      />

      <div className="flex justify-end gap-2">
        <button type="button" onClick={onClose} className="text-gray-600 hover:underline">
          İptal
        </button>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Güncelle
        </button>
      </div>
    </form>
  );
}
