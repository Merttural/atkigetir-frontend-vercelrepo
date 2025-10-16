// API endpoint: /api/products/random
// Basit rastgele ürün döndürür

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Backend API URL'si
    const backendUrl = process.env.NODE_ENV === 'production' 
      ? 'https://atkigetir-backend.onrender.com' 
      : 'http://localhost:5000';
    
    // Tüm ürünleri al (backend limit 100)
    console.log('Backend URL:', backendUrl);
    const response = await fetch(`${backendUrl}/api/products?limit=100`);
    console.log('Response status:', response.status);
    
    if (!response.ok) {
      console.log('Backend response not ok, using mock data');
      // Backend çalışmıyorsa mock data döndür
      const mockProducts = [
        {
          _id: '1',
          name: 'Örnek Atkı',
          price: 150,
          category: 'atkı',
          image: '/images/placeholder.svg'
        },
        {
          _id: '2', 
          name: 'Örnek Forma',
          price: 200,
          category: 'forma',
          image: '/images/placeholder.svg'
        },
        {
          _id: '3',
          name: 'Örnek Bere',
          price: 100,
          category: 'bere', 
          image: '/images/placeholder.svg'
        },
        {
          _id: '4',
          name: 'Örnek Bayrak',
          price: 80,
          category: 'bayrak',
          image: '/images/placeholder.svg'
        }
      ];
      
      return res.status(200).json({
        success: true,
        products: mockProducts,
        count: mockProducts.length
      });
    }
    
    const data = await response.json();
    const allProducts = data.products || [];
    
    if (allProducts.length === 0) {
      return res.status(200).json({
        success: true,
        products: [],
        count: 0
      });
    }
    
    // Her kategoriden 4'er ürün al
    const categories = ['Atkı', 'Forma', 'Bere', 'Bayrak'];
    const randomProducts = [];
    
    for (const category of categories) {
      const productsInCategory = allProducts.filter(p => p.category && p.category.toLowerCase() === category.toLowerCase());
      const shuffled = productsInCategory.sort(() => 0.5 - Math.random());
      randomProducts.push(...shuffled.slice(0, 4));
    }
    
    // Eğer toplamda 16'dan az ürün varsa, kalanını tüm ürünlerden rastgele doldur
    if (randomProducts.length < 16) {
      const remainingNeeded = 16 - randomProducts.length;
      const allShuffled = allProducts.sort(() => 0.5 - Math.random());
      const additionalProducts = allShuffled.filter(p => !randomProducts.some(rp => rp._id === p._id)).slice(0, remainingNeeded);
      randomProducts.push(...additionalProducts);
    }
    
    res.status(200).json({
      success: true,
      products: randomProducts,
      count: randomProducts.length
    });

  } catch (error) {
    console.error('Random products API error:', error);
    
    // Hata durumunda mock data döndür
    const mockProducts = [
      {
        _id: '1',
        name: 'Örnek Atkı',
        price: 150,
        category: 'atkı',
        image: '/images/placeholder.svg'
      },
      {
        _id: '2', 
        name: 'Örnek Forma',
        price: 200,
        category: 'forma',
        image: '/images/placeholder.svg'
      },
      {
        _id: '3',
        name: 'Örnek Bere',
        price: 100,
        category: 'bere', 
        image: '/images/placeholder.svg'
      },
      {
        _id: '4',
        name: 'Örnek Bayrak',
        price: 80,
        category: 'bayrak',
        image: '/images/placeholder.svg'
      }
    ];
    
    res.status(200).json({
      success: true,
      products: mockProducts,
      count: mockProducts.length
    });
  }
}