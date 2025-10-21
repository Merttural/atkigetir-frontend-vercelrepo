// ProductForm.js - Sadeleştirilmiş ürün ekleme formu
import { useState, useEffect } from 'react';

export default function ProductForm({ onProductAdded }) {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    description: ''
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  // Kategorileri çek
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories');
      const data = await res.json();
      setCategories(data.categories || []);
    } catch (error) {
      console.error('Kategoriler yüklenemedi:', error);
    }
  };

  // Form input değişiklikleri
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Resim seçimi
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      
      // Preview oluştur
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  // Resim yükleme
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error('Resim yüklenemedi');
    }

    const data = await response.json();
    return data.imageUrl;
  };

  // Form gönderimi
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = '';

      // Resim varsa yükle
      if (image) {
        imageUrl = await uploadImage(image);
      }

      // Ürün oluştur
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        image: imageUrl
      };

      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(productData)
      });

      if (response.ok) {
        // Formu temizle
        setFormData({
          name: '',
          price: '',
          category: '',
          description: ''
        });
        setImage(null);
        setImagePreview('');
        
        if (onProductAdded) onProductAdded();
        alert('Ürün başarıyla eklendi!');
      } else {
        const error = await response.json();
        alert(error.message || 'Ürün eklenemedi');
      }
    } catch (error) {
      console.error('Hata:', error);
      alert('Bir hata oluştu: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Yeni Ürün Ekle</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Ürün Adı */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ürün Adı *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ürün adını girin"
            required
          />
        </div>

        {/* Fiyat */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Fiyat (₺) *
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="0.00"
            step="0.01"
            min="0"
            required
          />
        </div>

        {/* Kategori */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Kategori *
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Kategori seçin</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Açıklama */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Açıklama
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ürün açıklaması (opsiyonel)"
            rows="3"
          />
        </div>

        {/* Resim Yükleme */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ürün Resmi
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          
          {/* Resim Preview */}
          {imagePreview && (
            <div className="mt-2">
              <img 
                src={imagePreview} 
                alt="Preview" 
                className="w-32 h-32 object-cover rounded-md border"
              />
            </div>
          )}
        </div>

        {/* Gönder Butonu */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 rounded-md font-medium ${
            loading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700'
          } text-white transition-colors`}
        >
          {loading ? 'Ekleniyor...' : 'Ürünü Ekle'}
        </button>
      </form>
    </div>
  );
}