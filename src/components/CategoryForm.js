import { useEffect, useState } from 'react';

export default function CategoryForm({ onCategoryAdded }) {
  const [name, setName] = useState('');
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);

  // ✅ Kategorileri sunucudan çek
  const fetchCategories = async () => {
          const res = await fetch('https://atkigetir-backend.onrender.com/api/categories');
    const data = await res.json();
    setCategories(data.categories);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // ✅ Yeni kategori oluştur veya var olanı güncelle
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) return;

    const method = editingCategory ? 'PUT' : 'POST';
    const body = editingCategory ? { id: editingCategory._id, name } : { name };

    const res = await fetch('https://atkigetir-backend.onrender.com/api/categories', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      setName('');
      setEditingCategory(null);
      fetchCategories();
      if (onCategoryAdded) onCategoryAdded();
    }
  };

  // ✅ Kategori silme
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
    <div>
      <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Kategori adı"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border px-4 py-2 rounded w-full"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {editingCategory ? 'Güncelle' : 'Ekle'}
        </button>
      </form>

      <ul className="space-y-2 text-sm">
        {categories.map((cat) => (
          <li
            key={cat._id}
            className="flex justify-between items-center border px-4 py-2 rounded bg-gray-50"
          >
            <span>{cat.name}</span>
            <div className="space-x-2">
              <button
                onClick={() => {
                  setName(cat.name);
                  setEditingCategory(cat);
                }}
                className="text-blue-600 hover:underline"
              >
                Düzenle
              </button>
              <button
                onClick={() => handleDelete(cat._id)}
                className="text-red-600 hover:underline"
              >
                Sil
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
