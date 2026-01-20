import { supabase, isSupabaseReady } from '@/lib/supabase/client';

/**
 * Supabase'den ürünleri çekmek için yardımcı fonksiyonlar
 * Tablo yapısı: atkilar, bayrak, bere, forma
 */

// Kategori tablo eşleştirmesi
const CATEGORY_TABLES = {
  'Atkı': 'atkilar',
  'Bayrak': 'bayrak',
  'Bere': 'bere',
  'Forma': 'forma'
};

// Atkı tablosu için mapping (resim_1, resim_2 kullanıyor)
const mapAtkiFromSupabase = (item, category = 'Atkı') => {
  const slug = `${category.toLowerCase()}-${item.id}`;
  return {
    id: item.id,
    _id: item.id,
    name: item.model_adi || 'Ürün',
    description: item.model_açıklaması || '',
    price: 0, // Fiyat bilgisi yok, varsayılan 0
    category: category,
    stock: 0, // Stok bilgisi yok
    stockStatus: 'var',
    image: item.resim_1 || '/images/placeholder.svg',
    image_url: item.resim_1 || '/images/placeholder.svg',
    additionalImages: item.resim_2 ? [item.resim_2] : [],
    active: true,
    orderRank: item.homepage_order || 0,
    slug: slug,
    is_featured: item.featured || false
  };
};

// Diğer kategoriler için mapping (resim_url kullanıyor)
const mapProductFromSupabase = (item, category) => {
  const slug = `${category.toLowerCase()}-${item.id}`;
  return {
    id: item.id,
    _id: item.id,
    name: item.model_adi || 'Ürün',
    description: item.model_açıklaması || '',
    price: 0, // Fiyat bilgisi yok, varsayılan 0
    category: category,
    stock: 0, // Stok bilgisi yok
    stockStatus: 'var',
    image: item.resim_url || '/images/placeholder.svg',
    image_url: item.resim_url || '/images/placeholder.svg',
    additionalImages: [],
    active: true,
    orderRank: item.homepage_order || 0,
    slug: slug,
    is_featured: item.featured || false
  };
};

// Tüm ürünleri getir (tüm kategorilerden)
export const fetchAllProducts = async () => {
  if (!isSupabaseReady()) {
    return [];
  }

  try {
    const allProducts = [];
    
    // Her kategoriden ürünleri çek
    for (const [category, tableName] of Object.entries(CATEGORY_TABLES)) {
      try {
        const { data, error } = await supabase
          .from(tableName)
          .select('*')
          .order('homepage_order', { ascending: true, nullsFirst: false });

        if (error) {
          // Error fetching category - continue with other categories
          continue; // Bu kategoriyi atla, diğerlerini çekmeye devam et
        }

        if (data && data.length > 0) {
          // Atkı tablosu için özel mapping
          if (tableName === 'atkilar') {
            allProducts.push(...data.map(item => mapAtkiFromSupabase(item, category)));
          } else {
            allProducts.push(...data.map(item => mapProductFromSupabase(item, category)));
          }
        }
      } catch (err) {
        console.warn(`⚠️ Error processing ${category}:`, err);
        continue;
      }
    }

    // Homepage_order'a göre sırala
    allProducts.sort((a, b) => (a.orderRank || 0) - (b.orderRank || 0));

    return allProducts;
  } catch (error) {
    console.error('❌ Error fetching all products:', error);
    return [];
  }
};

// Kategoriye göre ürünleri getir
export const fetchProductsByCategory = async (category) => {
  if (!isSupabaseReady()) {
    return [];
  }

  const tableName = CATEGORY_TABLES[category];
  if (!tableName) {
    // Unknown category - return empty array
    return [];
  }

  try {
    const { data, error } = await supabase
      .from(tableName)
      .select('*')
      .order('homepage_order', { ascending: true, nullsFirst: false });

    if (error) {
      console.error(`❌ Error fetching ${category}:`, error);
      return [];
    }

    if (tableName === 'atkilar') {
      return data?.map(item => mapAtkiFromSupabase(item, category)) || [];
    } else {
      return data?.map(item => mapProductFromSupabase(item, category)) || [];
    }
  } catch (error) {
    console.error(`Error fetching products by category (${category}):`, error);
    return [];
  }
};

// Kategorilere göre ürün sayılarını getir
export const getCategoryCounts = async () => {
  if (!isSupabaseReady()) {
    return {};
  }

  try {
    const counts = {};
    
    for (const [category, tableName] of Object.entries(CATEGORY_TABLES)) {
      try {
        const { count, error } = await supabase
          .from(tableName)
          .select('*', { count: 'exact', head: true });

        if (!error && count !== null) {
          counts[category] = count || 0;
        } else {
          counts[category] = 0;
        }
      } catch (err) {
        counts[category] = 0;
      }
    }

    // Tümü kategorisi için toplam
    counts['Tümü'] = Object.values(counts).reduce((sum, count) => sum + count, 0);

    return counts;
  } catch (error) {
    console.error('Error fetching category counts:', error);
    return {};
  }
};

// Rastgele ürünleri getir
export const fetchRandomProducts = async (limit = 8) => {
  if (!isSupabaseReady()) {
    return [];
  }

  try {
    const allProducts = await fetchAllProducts();
    
    // Rastgele karıştır
    const shuffled = [...allProducts].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, limit);
  } catch (error) {
    console.error('Error fetching random products:', error);
    return [];
  }
};

// Öne çıkan ürünleri getir
export const fetchFeaturedProducts = async (limit = 8) => {
  if (!isSupabaseReady()) {
    return [];
  }

  try {
    const allProducts = [];
    
    // Her kategoriden featured ürünleri çek
    for (const [category, tableName] of Object.entries(CATEGORY_TABLES)) {
      try {
        const { data, error } = await supabase
          .from(tableName)
          .select('*')
          .eq('featured', true)
          .order('homepage_order', { ascending: true, nullsFirst: false });

        if (error) continue;

        if (data && data.length > 0) {
          if (tableName === 'atkilar') {
            allProducts.push(...data.map(item => mapAtkiFromSupabase(item, category)));
          } else {
            allProducts.push(...data.map(item => mapProductFromSupabase(item, category)));
          }
        }
      } catch (err) {
        continue;
      }
    }

    // Homepage_order'a göre sırala ve limit uygula
    allProducts.sort((a, b) => (a.orderRank || 0) - (b.orderRank || 0));
    
    // Featured yoksa rastgele ürünler döndür
    if (allProducts.length === 0) {
      return await fetchRandomProducts(limit);
    }

    return allProducts.slice(0, limit);
  } catch (error) {
    console.error('Error fetching featured products:', error);
    // Hata durumunda rastgele ürünler döndür
    return await fetchRandomProducts(limit);
  }
};

// Slug'a göre ürün getir
export const fetchProductBySlug = async (slug) => {
  if (!isSupabaseReady()) {
    return null;
  }

  try {
    // Slug formatı: "atki-1", "bayrak-2" gibi
    const parts = slug.split('-');
    if (parts.length < 2) {
      return null;
    }

    const categoryName = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
    const tableName = CATEGORY_TABLES[categoryName];
    
    if (!tableName) {
      return null;
    }

    const id = parseInt(parts[parts.length - 1]);
    if (isNaN(id)) {
      return null;
    }

    const { data, error } = await supabase
      .from(tableName)
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      return null;
    }

    if (tableName === 'atkilar') {
      return mapAtkiFromSupabase(data, categoryName);
    } else {
      return mapProductFromSupabase(data, categoryName);
    }
  } catch (error) {
    console.error('Error fetching product by slug:', error);
    return null;
  }
};

// Örnek ürün verileri (Supabase boşsa gösterilecek)
export const getSampleProducts = () => {
  return [
    {
      id: 'sample-1',
      _id: 'sample-1',
      name: 'Premium Yün Atkı - Mavi',
      description: 'Kaliteli yün malzemeden üretilmiş, kış ayları için ideal atkı modeli.',
      price: 149.99,
      category: 'Atkı',
      stock: 50,
      stockStatus: 'var',
      image: '/images/placeholder.svg',
      additionalImages: [],
      active: true,
      orderRank: 1,
      slug: 'premium-yun-atki-mavi',
      is_featured: true
    },
    {
      id: 'sample-2',
      _id: 'sample-2',
      name: 'Klasik Bere - Kırmızı',
      description: 'Sıcak tutan, şık görünümlü klasik bere modeli.',
      price: 79.99,
      category: 'Bere',
      stock: 30,
      stockStatus: 'var',
      image: '/images/placeholder.svg',
      additionalImages: [],
      active: true,
      orderRank: 2,
      slug: 'klasik-bere-kirmizi',
      is_featured: true
    },
    {
      id: 'sample-3',
      _id: 'sample-3',
      name: 'Spor Forma - Takım',
      description: 'Rahat ve dayanıklı spor forma seti.',
      price: 299.99,
      category: 'Forma',
      stock: 25,
      stockStatus: 'var',
      image: '/images/placeholder.svg',
      additionalImages: [],
      active: true,
      orderRank: 3,
      slug: 'spor-forma-takim',
      is_featured: true
    },
    {
      id: 'sample-4',
      _id: 'sample-4',
      name: 'Türk Bayrağı - Büyük Boy',
      description: 'Kaliteli kumaştan üretilmiş, dayanıklı Türk bayrağı.',
      price: 199.99,
      category: 'Bayrak',
      stock: 40,
      stockStatus: 'var',
      image: '/images/placeholder.svg',
      additionalImages: [],
      active: true,
      orderRank: 4,
      slug: 'turk-bayragi-buyuk-boy',
      is_featured: true
    },
    {
      id: 'sample-5',
      _id: 'sample-5',
      name: 'Örgü Atkı - Gri',
      description: 'El örgüsü tarzında, sıcak tutan atkı modeli.',
      price: 129.99,
      category: 'Atkı',
      stock: 35,
      stockStatus: 'var',
      image: '/images/placeholder.svg',
      additionalImages: [],
      active: true,
      orderRank: 5,
      slug: 'orgu-atki-gri',
      is_featured: false
    },
    {
      id: 'sample-6',
      _id: 'sample-6',
      name: 'Pomponlu Bere - Siyah',
      description: 'Şık pomponlu bere, kış gardırobunuzun vazgeçilmezi.',
      price: 89.99,
      category: 'Bere',
      stock: 45,
      stockStatus: 'var',
      image: '/images/placeholder.svg',
      additionalImages: [],
      active: true,
      orderRank: 6,
      slug: 'pomponlu-bere-siyah',
      is_featured: false
    },
    {
      id: 'sample-7',
      _id: 'sample-7',
      name: 'Futbol Forması - Kırmızı',
      description: 'Profesyonel futbol forması, nefes alabilir kumaş.',
      price: 349.99,
      category: 'Forma',
      stock: 20,
      stockStatus: 'var',
      image: '/images/placeholder.svg',
      additionalImages: [],
      active: true,
      orderRank: 7,
      slug: 'futbol-formasi-kirmizi',
      is_featured: false
    },
    {
      id: 'sample-8',
      _id: 'sample-8',
      name: 'Türk Bayrağı - Orta Boy',
      description: 'Orta boy Türk bayrağı, iç ve dış mekan kullanımı için uygun.',
      price: 149.99,
      category: 'Bayrak',
      stock: 60,
      stockStatus: 'var',
      image: '/images/placeholder.svg',
      additionalImages: [],
      active: true,
      orderRank: 8,
      slug: 'turk-bayragi-orta-boy',
      is_featured: false
    }
  ];
};
