// components/CategoryManager.js

import { useEffect, useState } from 'react';

export default function CategoryManager() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  // Kategorileri çek
  const fetchCategories = async () => {
          const res = await fetch('https://atkigetir-backend.onrender.com/api/categories');
    const data = await res.json();
    setCategories(data.categories);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Ekleme işlemi
  const handleAdd = async (e) => {
    e.preventDefault();
    const res = await fetch('https://atkigetir-backend.onrender.com/api/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });

    if (res.ok) {
      setName('');
      setMessage('✅ Kategori eklendi');
      fetchCategories();
    } else {
      const data = await res.json();
      setMessage('❌ Hata: ' + data.message);
    }
  };

  // Silme işlemi
  const handleDelete = async (id) => {
    const res = await fetch('https://atkigetir-backend.onrender.com/api/categories', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      fetchCategories();
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow max-w-md">
      <h3 className="text-lg font-bold mb-4">Kategori Yönetimi</h3>
      <form onSubmit={handleAdd} className="space-y-3 mb-6">
        <input
          type="text"
          placeholder="Kategori adı"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded"
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Ekle
        </button>
        {message && <p className="text-sm mt-1 text-gray-600">{message}</p>}
      </form>

      <ul className="space-y-2">
        {categories.map((cat) => (
          <li key={cat._id} className="flex justify-between items-center border-b py-1">
            <span>{cat.name}</span>
            <button
              onClick={() => handleDelete(cat._id)}
              className="text-red-600 hover:text-red-800 text-sm"
            >
              Sil
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
