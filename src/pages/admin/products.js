import { useState, useEffect } from 'react';
import Image from 'next/image';
import { withAdminAuth } from '@/components/withAuth';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

// ImageKit upload fonksiyonu
const uploadToImageKit = async (file) => {
  try {
    const formData = new FormData();
    formData.append('image', file);
    
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error);
    }
    
    const result = await response.json();
    return result.url;
  } catch (error) {
    console.error('ImageKit upload hatası:', error);
    throw error;
  }
};

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [uploading, setUploading] = useState(false);

  // Sadeleştirilmiş form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    stockStatus: 'var', // 'var' veya 'yok'
    image: '',
    active: true
  });

  // SEO için resim alanları
  const [imageAlt, setImageAlt] = useState('');
  const [imageTitle, setImageTitle] = useState('');

  // Çoklu resim yükleme state
  const [selectedImages, setSelectedImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [primaryImageIndex, setPrimaryImageIndex] = useState(0);

  useEffect(() => {
    fetchProducts();
  }, []);

  // Drag & Drop Handler
  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const items = Array.from(products);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // Optimistic update
    setProducts(items);

    // Update order in database
    try {
      const updates = items.map((product, index) => ({
        _id: product._id,
        orderRank: index + 1
      }));

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/admin/products/order`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ updates })
      });

      if (!response.ok) {
        throw new Error('Sıralama güncellenemedi');
      }
    } catch (error) {
      console.error('Sıralama hatası:', error);
      // Revert on error
      fetchProducts();
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    setError('');
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const res = await fetch(`${apiUrl}/api/products?sort=orderRank`);
      if (!res.ok) {
        let errorData;
        try {
          const contentType = res.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            errorData = await res.json();
          } else {
            const textResponse = await res.text();
            console.log('Products fetch error response:', textResponse);
            throw new Error(`HTTP ${res.status}: Backend'den geçersiz response`);
          }
        } catch (jsonError) {
          console.error('Products fetch JSON parsing error:', jsonError);
          throw new Error(`HTTP ${res.status}: API yanıtı başarısız - ${jsonError.message}`);
        }
        throw new Error(errorData.error || errorData.message || 'API yanıtı başarısız');
      }
      
      let data;
      try {
        const contentType = res.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          data = await res.json();
        } else {
          throw new Error('Geçersiz response formatı');
        }
      } catch (jsonError) {
        console.error('Products fetch success JSON parsing error:', jsonError);
        throw new Error('Ürünler yüklenemedi - geçersiz response formatı');
      }
      
      setProducts(data.products || []);
    } catch (e) {
      setError('Ürünler yüklenemedi: ' + e.message);
    }
    setLoading(false);
  };

  // Çoklu resim seçimi
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setSelectedImages(files);
      
      // Preview'ları oluştur
      const previews = [];
      files.forEach((file, index) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          previews[index] = e.target.result;
          if (previews.length === files.length) {
            setImagePreviews([...previews]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  // Ön resim seçimi
  const setPrimaryImage = (index) => {
    setPrimaryImageIndex(index);
  };

  // Resim silme
  const removeImage = (index) => {
    const newImages = selectedImages.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    setSelectedImages(newImages);
    setImagePreviews(newPreviews);
    
    if (primaryImageIndex >= newImages.length) {
      setPrimaryImageIndex(Math.max(0, newImages.length - 1));
    }
  };

  // Çoklu resim yükleme - ImageKit ile
  const uploadImages = async (files) => {
    try {
      console.log('🖼️ Starting ImageKit upload...');
      const uploadPromises = files.map(file => uploadToImageKit(file));
      const imageUrls = await Promise.all(uploadPromises);
      console.log('✅ All images uploaded to ImageKit:', imageUrls);
      return imageUrls;
    } catch (error) {
      console.error('❌ ImageKit upload failed:', error);
      throw new Error(`Resim yükleme hatası: ${error.message}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    
    // SEO alanları kontrolü
    if (selectedImages.length > 0) {
      if (!imageAlt.trim()) {
        alert('Resim alt metni zorunludur (SEO için önemli)');
        setUploading(false);
        return;
      }
      
      if (!imageTitle.trim()) {
        alert('Resim başlığı zorunludur (SEO için önemli)');
        setUploading(false);
        return;
      }
    }
    
    try {
      let imageUrl = formData.image;
      let additionalImages = [];

      // Çoklu resim varsa yükle
      if (selectedImages.length > 0) {
        const uploadedUrls = await uploadImages(selectedImages);
        imageUrl = uploadedUrls[primaryImageIndex]; // Ön resim
        additionalImages = uploadedUrls.filter((_, index) => index !== primaryImageIndex);
      }
      
      // Form verilerini hazırla
      const submitData = {
        ...formData,
        image: imageUrl,
        additionalImages: additionalImages,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock)
      };
      
      const url = editingProduct 
        ? `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/products/${editingProduct._id}`
        : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/products`;
      
      const method = editingProduct ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(submitData),
      });

      if (!res.ok) {
        let errorData;
        try {
          // Response'un content-type'ını kontrol et
          const contentType = res.headers.get('content-type');
          console.log('Response Content-Type:', contentType);
          
          if (contentType && contentType.includes('application/json')) {
            errorData = await res.json();
          } else {
            // JSON değilse text olarak oku
            const textResponse = await res.text();
            console.log('Non-JSON response:', textResponse);
            throw new Error(`HTTP ${res.status}: Backend'den geçersiz response formatı`);
          }
        } catch (jsonError) {
          console.error('JSON parsing error:', jsonError);
          console.log('Response status:', res.status);
          console.log('Response headers:', Object.fromEntries(res.headers.entries()));
          throw new Error(`HTTP ${res.status}: Backend'den geçersiz response - ${jsonError.message}`);
        }
        console.error('Backend error:', errorData);
        throw new Error(errorData.error || errorData.message || 'İşlem başarısız');
      }

      // Başarılı response'u kontrol et
      let successData;
      try {
        const contentType = res.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          successData = await res.json();
        } else {
          console.log('Non-JSON success response, assuming success');
        }
      } catch (jsonError) {
        console.error('Success response JSON parsing error:', jsonError);
        // JSON parsing hatası olsa bile işlem başarılı olabilir
      }

      // Form'u temizle ve listeyi yenile
      setFormData({
        name: '',
        description: '',
        price: '',
        category: '',
        stock: '',
        stockStatus: 'var',
        image: '',
        active: true
      });
      
      // SEO alanlarını da temizle
      setImageAlt('');
      setImageTitle('');
      setSelectedImages([]);
      setImagePreviews([]);
      setPrimaryImageIndex(0);
      setShowAddForm(false);
      setEditingProduct(null);
      fetchProducts();
      
      alert(editingProduct ? 'Ürün güncellendi!' : 'Ürün eklendi!');
    } catch (e) {
      alert('Hata: ' + e.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (productId) => {
    if (!confirm('Bu ürünü silmek istediğinizden emin misiniz?')) return;
    
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/products/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (!res.ok) {
        throw new Error('Silme işlemi başarısız');
      }
      
      setProducts(products.filter(p => p._id !== productId));
      alert('Ürün silindi!');
    } catch (e) {
      alert('Ürün silinemedi: ' + e.message);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name || '',
      description: product.description || '',
      price: product.price || '',
      category: product.category || '',
      stock: product.stock || '',
      stockStatus: product.stockStatus || 'var',
      image: product.image || '',
      active: product.active !== false
    });
    setSelectedImages([]);
    setImagePreviews([]);
    setPrimaryImageIndex(0);
    setShowAddForm(true);
  };

  // Kategorileri al
  const categories = [...new Set(products.map(p => p.category).filter(Boolean))];

  // Filtrelenmiş ürünler
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-20 bg-gray-200 rounded"></div>
              ))}
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-12 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold text-gray-900">Ürün Yönetimi</h1>
            <button
              onClick={() => {
                setShowAddForm(true);
                setEditingProduct(null);
                setFormData({
                  name: '',
                  description: '',
                  price: '',
                  category: '',
                  stock: '',
                  stockStatus: 'var',
                  image: '',
                  active: true
                });
                
                // SEO alanlarını da temizle
                setImageAlt('');
                setImageTitle('');
                setSelectedImages([]);
                setImagePreviews([]);
                setPrimaryImageIndex(0);
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Yeni Ürün
            </button>
          </div>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Toplam Ürün</p>
                <p className="text-2xl font-semibold text-gray-900">{products.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Aktif Ürün</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {products.filter(p => p.active !== false).length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Stokta Az</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {products.filter(p => p.stock < 5).length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Kategoriler</p>
                <p className="text-2xl font-semibold text-gray-900">{categories.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Ürün ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="md:w-48">
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Tüm Kategoriler</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {loading ? (
            <div className="p-6">
              <div className="animate-pulse space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-20 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          ) : (
            <DragDropContext onDragEnd={handleDragEnd}>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12">
                        Sıra
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ürün
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Kategori
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Fiyat
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Stok
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Durum
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        İşlemler
                      </th>
                    </tr>
                  </thead>
                  <Droppable droppableId="products">
                    {(provided) => (
                      <tbody 
                        className="bg-white divide-y divide-gray-200"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                      >
                        {filteredProducts.map((product, index) => (
                          <Draggable key={product._id} draggableId={product._id} index={index}>
                            {(provided, snapshot) => (
                              <tr 
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                className={`hover:bg-gray-50 ${snapshot.isDragging ? 'bg-blue-50 shadow-lg' : ''}`}
                              >
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-center">
                                    <div 
                                      {...provided.dragHandleProps}
                                      className="cursor-move p-1 text-gray-400 hover:text-gray-600"
                                    >
                                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                                      </svg>
                                    </div>
                                    <span className="ml-2 text-sm font-medium text-gray-900">
                                      {product.orderRank || index + 1}
                                    </span>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-center">
                                    <div className="flex-shrink-0 h-10 w-10 relative">
                                      <Image
                                        className="rounded object-cover"
                                        src={product.image || '/images/placeholder.svg'}
                                        alt={product.name}
                                        fill
                                        sizes="40px"
                                        onError={(e) => {
                                          e.target.src = '/images/placeholder.svg';
                                        }}
                                      />
                                    </div>
                                    <div className="ml-4">
                                      <div className="text-sm font-medium text-gray-900">
                                        {product.name}
                                      </div>
                                      <div className="text-sm text-gray-500">
                                        {product.description?.substring(0, 50)}...
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                                    {product.category}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  ₺{product.price}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex flex-col space-y-1">
                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                      product.stockStatus === 'var' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                    }`}>
                                      {product.stockStatus === 'var' ? 'Var' : 'Yok'}
                                    </span>
                                    {product.stockStatus === 'var' && (
                                      <span className="text-xs text-gray-500">
                                        Miktar: {product.stock}
                                      </span>
                                    )}
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                    product.active !== false ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                  }`}>
                                    {product.active !== false ? 'Aktif' : 'Pasif'}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                  <button
                                    onClick={() => handleEdit(product)}
                                    className="text-blue-600 hover:text-blue-900 mr-3"
                                  >
                                    Düzenle
                                  </button>
                                  <button
                                    onClick={() => handleDelete(product._id)}
                                    className="text-red-600 hover:text-red-900"
                                  >
                                    Sil
                                  </button>
                                </td>
                              </tr>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </tbody>
                    )}
                  </Droppable>
                </table>
              </div>
            </DragDropContext>
          )}
        </div>

        {/* Sadeleştirilmiş Add/Edit Product Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-2/3 lg:w-1/2 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  {editingProduct ? 'Ürün Düzenle' : 'Yeni Ürün Ekle'}
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Temel Bilgiler */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Ürün Adı *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Ürün adını girin"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Kategori *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.category}
                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Kategori girin"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Açıklama *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Ürün açıklaması"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Fiyat (₺) *
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        required
                        value={formData.price}
                        onChange={(e) => setFormData({...formData, price: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="0.00"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Stok Durumu *
                      </label>
                      <select
                        required
                        value={formData.stockStatus}
                        onChange={(e) => setFormData({...formData, stockStatus: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="var">Var</option>
                        <option value="yok">Yok</option>
                      </select>
                    </div>
                  </div>

                  {/* Stok miktarı sadece "Var" seçildiğinde göster */}
                  {formData.stockStatus === 'var' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Stok Miktarı *
                      </label>
                      <input
                        type="number"
                        required
                        value={formData.stock}
                        onChange={(e) => setFormData({...formData, stock: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Stok miktarını girin"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Resim URL (Opsiyonel)
                    </label>
                    <input
                      type="url"
                      value={formData.image}
                      onChange={(e) => setFormData({...formData, image: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>

                  {/* Çoklu Resim Yükleme */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Resimler Yükle (Birden fazla seçebilirsiniz)
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    
                    {/* SEO Alanları - Resim yüklendiyse göster */}
                    {imagePreviews.length > 0 && (
                      <div className="mt-4 space-y-4">
                        {/* Alt Text Alanı */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Resim Alt Metni * (SEO için önemli)
                          </label>
                          <input
                            type="text"
                            value={imageAlt}
                            onChange={(e) => setImageAlt(e.target.value)}
                            placeholder="Örn: Mavi renkli yün atkı, kış koleksiyonu"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            Arama motorları için resim açıklaması
                          </p>
                        </div>

                        {/* Title Alanı */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Resim Başlığı * (SEO için önemli)
                          </label>
                          <input
                            type="text"
                            value={imageTitle}
                            onChange={(e) => setImageTitle(e.target.value)}
                            placeholder="Örn: Premium Yün Atkı - Mavi Renk"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            Resim başlığı (title attribute için)
                          </p>
                        </div>

                        <p className="text-sm font-medium text-gray-700 mb-2">
                          Yüklenen Resimler ({imagePreviews.length} adet)
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {imagePreviews.map((preview, index) => (
                            <div key={index} className="relative group">
                              <Image 
                                src={preview} 
                                alt={`Preview ${index + 1}`} 
                                width={96}
                                height={96}
                                className={`object-cover rounded-md border-2 cursor-pointer transition-all ${
                                  index === primaryImageIndex 
                                    ? 'border-blue-500 ring-2 ring-blue-200' 
                                    : 'border-gray-300 hover:border-blue-300'
                                }`}
                                onClick={() => setPrimaryImage(index)}
                              />
                              
                              {/* Ön resim etiketi */}
                              {index === primaryImageIndex && (
                                <div className="absolute top-1 left-1 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                                  Ön Resim
                                </div>
                              )}
                              
                              {/* Silme butonu */}
                              <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                        
                        <p className="text-sm text-gray-500 mt-2">
                          💡 Mavi çerçeveli resim ön resim olacak. Tıklayarak değiştirebilirsiniz.
                          <br />
                          🔧 Tüm resimler Sharp ile WebP formatına dönüştürülecek.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Durum */}
                  <div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.active}
                        onChange={(e) => setFormData({...formData, active: e.target.checked})}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label className="ml-2 block text-sm text-gray-900">
                        Ürün Aktif
                      </label>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setShowAddForm(false);
                        setEditingProduct(null);
                        setSelectedImages([]);
                        setImagePreviews([]);
                        setPrimaryImageIndex(0);
                      }}
                      className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                      İptal
                    </button>
                    <button
                      type="submit"
                      disabled={uploading}
                      className={`px-4 py-2 rounded-md ${
                        uploading 
                          ? 'bg-gray-400 cursor-not-allowed' 
                          : 'bg-blue-600 hover:bg-blue-700'
                      } text-white`}
                    >
                      {uploading ? 'Yükleniyor...' : (editingProduct ? 'Güncelle' : 'Ekle')}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default withAdminAuth(AdminProducts);