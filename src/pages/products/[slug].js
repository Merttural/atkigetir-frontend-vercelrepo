import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCart } from "@/hooks/useCart";
import LoadingSpinner from "@/components/LoadingSpinner";
import SEO from "@/components/SEO";
import { trackViewItem, trackAddToCart } from "@/utils/googleAds";
import { API_BASE_URL } from "@/config/api";

// Static generation için gerekli fonksiyonlar
export async function getStaticPaths() {
  try {
    const backendUrl = process.env.NODE_ENV === 'production' ? 'https://atkigetir-backend.onrender.com' : 'http://localhost:5000';
    const res = await fetch(`${backendUrl}/api/products`);
    const data = await res.json();
    
    const paths = data.products?.map(product => ({
      params: { slug: product.slug || product._id }
    })) || [];
    
    return {
      paths,
      fallback: false // Static export için
    };
  } catch (error) {
    return {
      paths: [],
      fallback: false
    };
  }
}

export async function getStaticProps({ params }) {
  try {
    const backendUrl = process.env.NODE_ENV === 'production' ? 'https://atkigetir-backend.onrender.com' : 'http://localhost:5000';
    const res = await fetch(`${backendUrl}/api/products?slug=${params.slug}`);
    const data = await res.json();
    
    if (data.products && data.products.length > 0) {
      return {
        props: {
          product: data.products[0]
        },
        // revalidate: 60 // Static export ile uyumlu değil
      };
    }
    
    // Slug ile bulunamazsa tüm ürünlerde ara
    const allRes = await fetch(`${backendUrl}/api/products`);
    const allData = await allRes.json();
    const product = allData.products?.find(p => p.slug === params.slug || p._id === params.slug);
    
    if (product) {
      return {
        props: {
          initialProduct: product // prop adını değiştiriyoruz
        }
      };
    }
    
    return {
      notFound: true
    };
  } catch (error) {
    return {
      notFound: true
    };
  }
}

export default function ProductDetail({ product: initialProduct }) {
  const router = useRouter();
  const { slug } = router.query;
  const [product, setProduct] = useState(initialProduct);
  const [loading, setLoading] = useState(!initialProduct);
  const [error, setError] = useState("");
  const [addingToCart, setAddingToCart] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    if (initialProduct) {
      setProduct(initialProduct);
      setLoading(false);
      // Google Ads ürün görüntüleme tracking
      trackViewItem(
        initialProduct._id || initialProduct.slug,
        initialProduct.name,
        initialProduct.category,
        initialProduct.price
      );
      return;
    }

    if (!slug) return;
    setLoading(true);
    setError("");
    fetch(`${API_BASE_URL}/api/products?slug=${slug}`)
      .then(res => res.json())
      .then(data => {
        if (data.products && data.products.length > 0) {
          setProduct(data.products[0]);
        } else {
          // Slug ile bulunamazsa, tüm ürünleri çekip _id veya slug ile eşleşeni bul
          fetch(`${API_BASE_URL}/api/products`)
            .then(res => res.json())
            .then(allData => {
              if (allData.products && allData.products.length > 0) {
                const found = allData.products.find(p => p.slug === slug || p._id === slug);
                setProduct(found || null);
              } else {
                setProduct(null);
              }
            })
            .catch(() => setProduct(null));
        }
      })
      .catch(() => setError("Ürün bulunamadı."))
      .finally(() => setLoading(false));
  }, [slug, initialProduct]);

  const handleAddToCart = () => {
    if (!product) return;
    
    setAddingToCart(true);
    
    addToCart(product);
    
    // Google Ads sepete ekleme tracking
    trackAddToCart(
      product._id || product.slug,
      product.name,
      product.price
    );
    
    // Toast notification göster
    if (typeof window !== 'undefined' && window.showToast) {
      window.showToast(`${product.name} sepete eklendi!`, 'success', 3000);
    }
    
    setAddingToCart(false);
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-white">
        <LoadingSpinner size="lg" text="Ürün yükleniyor..." />
      </main>
    );
  }
  
  if (error || !product) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-700 mb-2">Ürün bulunamadı</h1>
          <p className="text-gray-500">Aradığınız ürün silinmiş veya hiç eklenmemiş olabilir.</p>
          <Link href="/urunler" className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded font-semibold hover:bg-blue-700 transition">Tüm Ürünler</Link>
        </div>
      </main>
    );
  }

  return (
    <>
      <SEO
        title={`${product.name} | ${product.category} Fiyatları ve Özellikleri - Atkigetir`}
        description={`${product.name} - ${product.category} kategorisinde kaliteli ürün. ₺${product.price} fiyatla hemen satın al! İstanbul merkezli, kişiye özel tasarım, hızlı kargo, güvenli alışveriş. Ücretsiz kargo fırsatı!`}
        keywords={`${product.name}, ${product.category}, ${product.category} fiyatları, kaliteli ${product.category.toLowerCase()}, kişiye özel tasarım, istanbul ${product.category.toLowerCase()}, ${product.category.toLowerCase()} siparişi, ${product.category.toLowerCase()} modelleri, ucuz ${product.category.toLowerCase()}, ${product.category.toLowerCase()} üreticisi`}
        image={product.image}
        url={`/urunler/${product.slug || product._id}`}
        type="product"
        structuredData={{
          "@context": "https://schema.org/",
          "@type": "Product",
          "name": product.name,
          "image": [product.image],
          "description": product.description,
          "sku": product._id,
          "mpn": product._id,
          "brand": { 
            "@type": "Brand", 
            "name": "Atkigetir",
            "url": "https://atkigetir.com"
          },
          "category": product.category,
          "manufacturer": {
            "@type": "Organization",
            "name": "Atkigetir",
            "url": "https://atkigetir.com"
          },
          "offers": {
            "@type": "Offer",
            "priceCurrency": "TRY",
            "price": product.price,
            "priceValidUntil": "2025-12-31",
            "availability": product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
            "url": `https://atkigetir.com/urunler/${product.slug || product._id}`,
            "seller": {
              "@type": "Organization",
              "name": "Atkigetir",
              "url": "https://atkigetir.com"
            },
            "shippingDetails": {
              "@type": "OfferShippingDetails",
              "shippingRate": {
                "@type": "MonetaryAmount",
                "value": "0",
                "currency": "TRY"
              },
              "deliveryTime": {
                "@type": "ShippingDeliveryTime",
                "businessDays": {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
                },
                "cutoffTime": "14:00"
              }
            },
            "itemCondition": "https://schema.org/NewCondition"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "reviewCount": "127",
            "bestRating": "5",
            "worstRating": "1"
          },
          "review": [
            {
              "@type": "Review",
              "reviewRating": {
                "@type": "Rating",
                "ratingValue": "5",
                "bestRating": "5"
              },
              "author": {
                "@type": "Person",
                "name": "Müşteri"
              },
              "reviewBody": "Çok kaliteli ve hızlı teslimat. Kesinlikle tavsiye ederim."
            }
          ],
          "additionalProperty": [
            {
              "@type": "PropertyValue",
              "name": "Malzeme",
              "value": product.material || "Yüksek kaliteli kumaş"
            },
            {
              "@type": "PropertyValue", 
              "name": "Renk",
              "value": product.color || "Çeşitli renkler"
            },
            {
              "@type": "PropertyValue",
              "name": "Boyut",
              "value": product.size || "Standart boyut"
            }
          ]
        }}
      />

      <main className="max-w-4xl mx-auto py-10 px-4">
        {/* Breadcrumb Navigation */}
        <nav className="mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li>
              <Link href="/" className="hover:text-blue-600 transition-colors">
                Ana Sayfa
              </Link>
            </li>
            <li className="flex items-center">
              <svg className="w-4 h-4 mx-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <Link href="/urunler" className="hover:text-blue-600 transition-colors">
                Ürünler
              </Link>
            </li>
            <li className="flex items-center">
              <svg className="w-4 h-4 mx-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-900 font-medium">{product.category}</span>
            </li>
            <li className="flex items-center">
              <svg className="w-4 h-4 mx-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-500 truncate max-w-xs">{product.name}</span>
            </li>
          </ol>
        </nav>

        <div className="flex flex-col md:flex-row gap-10 items-center md:items-start">
          <div className="flex-1 w-full max-w-md">
            <div className="relative w-full h-96 rounded-2xl shadow-lg border border-gray-100 overflow-hidden bg-gray-50">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-4 w-full">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-1">{product.name}</h1>
            <div className="flex flex-wrap gap-2 items-center mb-1">
              {product.category && (
                <span className="bg-gradient-to-r from-blue-600 to-purple-500 text-white text-xs px-3 py-1 rounded-full shadow font-semibold tracking-wide">{product.category}</span>
              )}
              {product.features && product.features.length > 0 && product.features.slice(0,2).map((f,i) => (
                <span key={i} className="bg-gray-100 text-gray-700 text-xs px-2 py-0.5 rounded-full">{f}</span>
              ))}
              {product.stock !== undefined && (
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${product.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{product.stock > 0 ? 'Stokta' : 'Stok Yok'}</span>
              )}
            </div>
            <div className="text-xl font-bold text-blue-700">₺{product.price}</div>
            <div className="text-gray-700 text-base whitespace-pre-line">{product.description}</div>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <button
                onClick={handleAddToCart}
                disabled={addingToCart || product.stock === 0}
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                {addingToCart ? (
                  <>
                    <LoadingSpinner size="sm" color="white" />
                    <span>Ekleniyor...</span>
                  </>
                ) : (
                  <>
                    <span>🛒</span>
                    <span>{product.stock === 0 ? 'Stok Yok' : 'Sepete Ekle'}</span>
                  </>
                )}
              </button>
              
              <Link
                href="/sepet"
                className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-colors text-center"
              >
                Sepete Git
              </Link>
            </div>
            
            {product.features && product.features.length > 0 && (
              <div className="mt-6">
                <h3 className="font-semibold text-gray-900 mb-2">Özellikler:</h3>
                <ul className="space-y-1">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* SEO İçerik Bölümü */}
        <div className="mt-16 bg-gray-50 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Neden {product.category} Seçmelisiniz?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Kalite Garantisi</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Yüksek kaliteli malzemelerden üretim</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>25 yıllık deneyim ve uzmanlık</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Titizlikle kontrol edilen üretim süreci</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Müşteri memnuniyeti odaklı hizmet</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Avantajlarımız</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">🚚</span>
                  <span>İstanbul merkezli hızlı teslimat</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">🎨</span>
                  <span>Kişiye özel tasarım imkanı</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">💰</span>
                  <span>Uygun fiyat ve kaliteli ürün</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">📞</span>
                  <span>7/24 müşteri desteği</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* FAQ Bölümü */}
        <div className="mt-12 bg-white rounded-xl p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Sıkça Sorulan Sorular</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Bu {product.category.toLowerCase()} hangi malzemelerden üretiliyor?</h3>
              <p className="text-gray-700">Ürünlerimiz yüksek kaliteli malzemelerden üretilmektedir. Detaylı malzeme bilgisi için ürün özelliklerine bakabilirsiniz.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Kargo süresi ne kadar?</h3>
              <p className="text-gray-700">Normal siparişler 2-3 iş gününde, özel tasarım ürünler 5-7 iş gününde hazırlanır ve kargoya verilir.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Kişiye özel tasarım yapılıyor mu?</h3>
              <p className="text-gray-700">Evet! İstediğiniz renk, desen, boyut ve yazı ile özel tasarım yapabiliyoruz. Detaylar için bizimle iletişime geçin.</p>
            </div>
          </div>
        </div>

        {/* İlgili Ürünler ve Linkler */}
        <div className="mt-12 bg-blue-50 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-blue-900 mb-6">İlgili Sayfalar</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/urunler" className="block bg-white rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-gray-900 mb-2">Tüm Ürünler</h3>
              <p className="text-gray-600 text-sm">Geniş ürün koleksiyonumuzu keşfedin</p>
            </Link>
            <Link href={`/urunler/${product.category.toLowerCase()}`} className="block bg-white rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-gray-900 mb-2">{product.category} Kategorisi</h3>
              <p className="text-gray-600 text-sm">Benzer ürünleri inceleyin</p>
            </Link>
            <Link href="/iletisim" className="block bg-white rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-gray-900 mb-2">İletişim</h3>
              <p className="text-gray-600 text-sm">Sorularınız için bizimle iletişime geçin</p>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
} 