import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useCart } from "@/hooks/useCart";
import LoadingSpinner from "@/components/LoadingSpinner";
import SEO from "@/components/SEO";
import Breadcrumbs from '@/components/Breadcrumbs';
import DisabledFeatureModal from '@/components/DisabledFeatureModal';
import ProductCard from '@/components/ProductCard';
import { trackViewItem, trackAddToCart } from "@/utils/googleAds";
import { fetchProductBySlug, fetchRandomProducts } from "@/utils/supabaseProducts";
import { getProductImageUrl, getProductImages } from "@/utils/imageUtils";
import { buildProductDetailWhatsAppMessage } from "@/utils/whatsappProductMessage";
import { MessageCircle, ShoppingCart, CheckCircle2, Truck, Award, Factory, ArrowRight, Ruler, Layers, Palette, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Static generation için gerekli fonksiyonlar - Supabase kullanıyoruz
export async function getStaticPaths() {
  try {
    // Supabase yapılandırılmamışsa boş paths döndür
    const { isSupabaseReady } = await import('@/lib/supabase/server');
    
    if (!isSupabaseReady()) {
      return {
        paths: [],
        fallback: 'blocking'
      };
    }

    // Tüm kategorilerden ürünleri çek ve slug'ları al
    const { fetchAllProducts } = await import('@/utils/supabaseProducts');
    const allProducts = await fetchAllProducts();
    
    const paths = allProducts.map(product => ({
      params: { slug: product.slug }
    }));
    
    return {
      paths,
      fallback: 'blocking' // Yeni ürünler için dinamik oluştur
    };
  } catch (error) {
    console.error('getStaticPaths error:', error);
    return {
      paths: [],
      fallback: 'blocking'
    };
  }
}

export async function getStaticProps({ params }) {
  try {
    // Supabase yapılandırılmamışsa notFound döndür
    const { isSupabaseReady } = await import('@/lib/supabase/server');
    
    if (!isSupabaseReady()) {
      return {
        notFound: true
      };
    }

    // Yeni schema'ya uygun fetchProductBySlug kullan
    const { fetchProductBySlug } = await import('@/utils/supabaseProducts');
    const product = await fetchProductBySlug(params.slug);

    if (!product) {
      return {
        notFound: true
      };
    }
    
    return {
      props: {
        product: product
      },
      revalidate: 60 // 60 saniyede bir yenile
    };
  } catch (error) {
    console.error('getStaticProps error:', error);
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
  const [showDisabledModal, setShowDisabledModal] = useState(false);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { addToCart } = useCart();
  
  const whatsappNumber = '905337498266';
  
  // Tüm görselleri birleştir (ana görsel + ek görseller) ve işle
  const allImages = product ? [
    getProductImageUrl(product?.image_url || product?.image),
    ...getProductImages(product?.additionalImages || [])
  ].filter(Boolean) : [];
  
  const hasMultipleImages = allImages.length > 1;
  
  // Slider navigation
  const nextImage = () => {
    if (allImages.length > 0) {
      setSelectedImageIndex((prev) => (prev + 1) % allImages.length);
    }
  };
  
  const prevImage = () => {
    if (allImages.length > 0) {
      setSelectedImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
    }
  };

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
    
    // Supabase'den ürünü çek
    fetchProductBySlug(slug)
      .then(fetchedProduct => {
        if (fetchedProduct) {
          setProduct(fetchedProduct);
        } else {
          setProduct(null);
          setError("Ürün bulunamadı.");
        }
      })
      .catch(() => {
        setError("Ürün bulunamadı.");
        setProduct(null);
      })
      .finally(() => setLoading(false));
  }, [slug, initialProduct]);

  // Benzer ürünleri yükle
  useEffect(() => {
    const loadSimilarProducts = async () => {
      if (!product) return;
      
      try {
        // Aynı kategorideki ürünleri getir (kendisi hariç)
        const allProducts = await fetchRandomProducts(5);
        const similar = allProducts
          .filter(p => p.category === product.category && p.slug !== product.slug)
          .slice(0, 4);
        setSimilarProducts(similar);
      } catch (err) {
        console.error('Benzer ürünler yüklenirken hata:', err);
      }
    };

    if (product) {
      loadSimilarProducts();
    }
  }, [product]);

  const handleAddToCart = () => {
    setShowDisabledModal(true);
  };
  
  const handleCheckout = () => {
    setShowDisabledModal(true);
  };
  
  const handleWhatsApp = () => {
    const message = buildProductDetailWhatsAppMessage(product);
    
    // Google Ads conversion tracking
    googleAds.trackConversion();
    
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

  if (loading) {
    return (
      <div className="bg-[#F8FAFC] min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Ürün yükleniyor..." />
      </div>
    );
  }
  
  if (error || !product) {
    return (
      <div className="bg-[#F8FAFC] min-h-screen flex items-center justify-center">
        <div className="text-center bg-white rounded-[24px] shadow-sm p-12 max-w-md">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-2xl font-bold text-[#0F172A] mb-2 tracking-tight">Ürün bulunamadı</h1>
          <p className="text-slate-500 mb-6">Aradığınız ürün silinmiş veya hiç eklenmemiş olabilir.</p>
          <Link href="/urunler" className="inline-block bg-gradient-to-r from-[#2563EB] to-[#1e40af] text-white px-6 py-3 rounded-xl font-semibold hover:from-[#1e40af] hover:to-[#1e3a8a] transition-all shadow-md hover:shadow-lg">
            Tüm Ürünler
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={`${product.name} | ${product.category} Fiyatları ve Özellikleri - Atkigetir`}
        description={`${product.name} - ${product.category} kategorisinde kaliteli ürün. ${product.description ? product.description.substring(0, 120) : 'Kişiye özel tasarım, hızlı kargo, güvenli alışveriş. İstanbul merkezli üretim.'} Ücretsiz kargo fırsatı!`}
        keywords={`${product.name}, ${product.category}, ${product.category} fiyatları, kaliteli ${product.category.toLowerCase()}, kişiye özel tasarım, istanbul ${product.category.toLowerCase()}, ${product.category.toLowerCase()} siparişi, ${product.category.toLowerCase()} modelleri, ucuz ${product.category.toLowerCase()}, ${product.category.toLowerCase()} üreticisi`}
        image={allImages[0] || getProductImageUrl(product.image_url || product.image)}
        url={`/urunler/${product.slug || product._id}`}
        type="product"
        structuredData={[
          {
            "@context": "https://schema.org/",
            "@type": "Product",
            "name": product.name,
            "image": allImages.length > 0 ? allImages : [getProductImageUrl(product.image_url || product.image)],
            "description": product.description || `${product.name} - ${product.category} kategorisinde kaliteli ürün. Kişiye özel tasarım imkanı.`,
            "sku": product._id || product.id,
            "mpn": product._id || product.id,
            "brand": { 
              "@type": "Brand", 
              "name": "Atkigetir",
              "url": process.env.NEXT_PUBLIC_BASE_URL || "https://atkigetir.com"
            },
            "category": product.category,
            "manufacturer": {
              "@type": "Organization",
              "name": "Atkigetir",
              "url": process.env.NEXT_PUBLIC_BASE_URL || "https://atkigetir.com"
            },
            "offers": {
              "@type": "Offer",
              "priceCurrency": "TRY",
              "price": product.price || 0,
              "priceValidUntil": "2025-12-31",
              "availability": (product.stock || 0) > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
              "url": `${process.env.NEXT_PUBLIC_BASE_URL || 'https://atkigetir.com'}/urunler/${product.slug || product._id || product.id}`,
              "seller": {
                "@type": "Organization",
                "name": "Atkigetir",
                "url": process.env.NEXT_PUBLIC_BASE_URL || "https://atkigetir.com"
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
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": `Bu ${product.category?.toLowerCase() || 'ürün'} hangi malzemelerden üretiliyor?`,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Ürünlerimiz yüksek kaliteli malzemelerden üretilmektedir. Detaylı malzeme bilgisi için ürün özelliklerine bakabilirsiniz."
                }
              },
              {
                "@type": "Question",
                "name": "Kargo süresi ne kadar?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Normal siparişler 2-3 iş gününde, özel tasarım ürünler 5-7 iş gününde hazırlanır ve kargoya verilir."
                }
              },
              {
                "@type": "Question",
                "name": "Kişiye özel tasarım yapılıyor mu?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Evet! İstediğiniz renk, desen, boyut ve yazı ile özel tasarım yapabiliyoruz. Detaylar için bizimle iletişime geçin."
                }
              }
            ]
          }
        ]}
      />

      <div className="bg-[#F8FAFC] min-h-screen">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Breadcrumbs items={[
            { name: 'Anasayfa', href: '/' },
            { name: 'Ürünler', href: '/urunler' },
            { name: product.category || 'Ürün', href: product.category ? `/urunler/${product.category.toLowerCase()}` : '/urunler' },
            { name: product.name, href: `/urunler/${product.slug || product._id}` }
          ]} />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col lg:flex-row gap-8"
          >

            {/* Ürün Görselleri - Minimalist Slider Tasarım */}
            <div className="flex-1">
              {/* Ana Görsel - Slider ile */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="relative w-full aspect-square rounded-[24px] overflow-hidden bg-white/50 backdrop-blur-md group mb-4"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedImageIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="relative w-full h-full"
                  >
                    <Image
                      src={allImages[selectedImageIndex] || '/images/placeholder.svg'}
                      alt={`${product.name} - ${product.category} - Görsel ${selectedImageIndex + 1}`}
                      fill
                      className="object-cover"
                      priority
                      sizes="(max-width: 768px) 100vw, 50vw"
                      unoptimized={process.env.NODE_ENV === 'development'}
                    />
                    <motion.div
                      className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    />
                  </motion.div>
                </AnimatePresence>
                
                {/* Slider Navigation Buttons */}
                {hasMultipleImages && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-lg hover:bg-white transition-all opacity-0 group-hover:opacity-100"
                      aria-label="Önceki resim"
                    >
                      <ChevronLeft className="w-5 h-5 text-slate-700" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-lg hover:bg-white transition-all opacity-0 group-hover:opacity-100"
                      aria-label="Sonraki resim"
                    >
                      <ChevronRight className="w-5 h-5 text-slate-700" />
                    </button>
                    
                    {/* Slider Dots */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {allImages.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedImageIndex(index)}
                          className={`h-1.5 rounded-full transition-all ${
                            index === selectedImageIndex ? 'bg-white w-6' : 'bg-white/50 w-1.5'
                          }`}
                          aria-label={`Resim ${index + 1}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </motion.div>
              
              {/* Thumbnail Görseller - Minimalist */}
              {hasMultipleImages && (
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  {allImages.map((img, index) => (
                    <motion.button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden transition-all ${
                        selectedImageIndex === index
                          ? 'ring-2 ring-[#2563EB] ring-offset-2'
                          : 'opacity-60 hover:opacity-100'
                      }`}
                      aria-label={`Görsel ${index + 1} seç`}
                    >
                      <Image
                        src={getProductImageUrl(img)}
                        alt={`${product.name} - Görsel ${index + 1}`}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                        unoptimized={process.env.NODE_ENV === 'development'}
                      />
                    </motion.button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Ürün Bilgileri - Minimalist Tasarım */}
            <div className="flex-1 flex flex-col gap-6">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-[#0F172A] mb-4 tracking-tight">{product.name}</h1>
                <div className="flex flex-wrap gap-2 items-center mb-6">
                  {product.category && (
                    <span className="bg-white/50 backdrop-blur-sm text-[#2563EB] text-xs px-3 py-1.5 rounded-full font-semibold border border-[#2563EB]/20">
                      {product.category}
                    </span>
                  )}
                  {(product.stock || 0) > 0 && (
                    <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-emerald-100/50 text-emerald-700 border border-emerald-200">
                      ✓ Stokta
                    </span>
                  )}
                </div>
                <div className="mb-6">
                  <p className="text-sm text-slate-500 mb-2">Fiyat Sorun</p>
                  {product.price > 0 ? (
                    <div className="flex items-baseline gap-3">
                      <span className="text-3xl font-bold text-[#0F172A] tracking-tight">
                        ₺{product.price.toFixed(2)}
                      </span>
                    </div>
                  ) : (
                    <p className="text-lg font-semibold text-[#2563EB]">Fiyat için iletişime geçin</p>
                  )}
                </div>
                {product.description && (
                  <div className="text-slate-600 text-base leading-relaxed whitespace-pre-line mb-6 bg-white/30 backdrop-blur-sm rounded-[16px] p-4">
                    {product.description}
                  </div>
                )}
              </div>
              
              {/* WhatsApp ile Özelleştir ve Teklif Al - Büyük Buton */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-br from-[#22C55E]/10 to-emerald-50 rounded-[24px] p-8 border-2 border-emerald-200 mb-6"
              >
                <motion.button
                  onClick={handleWhatsApp}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-[#22C55E] to-[#16A34A] hover:from-[#16A34A] hover:to-[#15803d] text-white py-5 px-8 rounded-xl font-semibold text-lg transition-all shadow-lg hover:shadow-[0_0_25px_rgba(34,197,94,0.4)] active:scale-95 flex items-center justify-center gap-3 group"
                >
                  <MessageCircle className="w-6 h-6" />
                  <span>WhatsApp ile Özelleştir ve Teklif Al</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </motion.button>
                <p className="text-center text-sm text-slate-600 mt-3 flex items-center justify-center gap-1">
                  <span className="w-2 h-2 bg-[#22C55E] rounded-full animate-pulse"></span>
                  <span>Genelde 5 dakikada cevap veriyoruz</span>
                </p>
              </motion.div>
              
              {/* Teknik Detaylar - Minimalist */}
              <div className="bg-white/50 backdrop-blur-md rounded-[24px] border border-slate-200/50 p-6">
                <h3 className="font-semibold text-[#0F172A] mb-4 tracking-tight text-lg">Ürün Detayları</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2.5 border-b border-slate-200/50">
                    <span className="text-sm text-slate-600">İplik Türü</span>
                    <span className="text-sm font-medium text-[#0F172A]">
                      {product.material || 'Yüksek kaliteli kumaş'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2.5 border-b border-slate-200/50">
                    <span className="text-sm text-slate-600">Dokuma Sıklığı</span>
                    <span className="text-sm font-medium text-[#0F172A]">
                      {product.weaveDensity || 'Standart'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2.5 border-b border-slate-200/50">
                    <span className="text-sm text-slate-600">Standart Ölçüler</span>
                    <span className="text-sm font-medium text-[#0F172A]">
                      {product.size || '30cm x 150cm'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2.5">
                    <span className="text-sm text-slate-600">Üretim Süresi</span>
                    <span className="text-sm font-medium text-[#0F172A]">
                      {product.productionTime || '5-7 iş günü'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Benzer Ürünler - Çapraz Satış */}
          {similarProducts.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-12"
            >
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-[#0F172A] mb-2 tracking-tight">
                  Benzer Ürünler
                </h2>
                <p className="text-slate-600 text-sm">
                  Bu {product.category?.toLowerCase()} ürününü beğendiyseniz, aşağıdaki ürünlerle takım yapabilirsiniz.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 lg:grid-cols-3 lg:gap-8">
                {similarProducts.map((similarProduct, index) => (
                  <ProductCard
                    key={similarProduct.id || similarProduct._id}
                    product={similarProduct}
                    showCategoryBadge={true}
                    priority={index < 2}
                  />
                ))}
              </div>
            </motion.section>
          )}

          {/* SEO İçerik Bölümü */}
          <div className="mt-12 bg-white rounded-[24px] shadow-sm border border-slate-200 p-8">
            <h2 className="text-2xl font-bold text-[#0F172A] mb-6 tracking-tight">Neden {product.category} Seçmelisiniz?</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: 'Kalite Garantisi',
                  items: [
                    { text: 'Yüksek kaliteli malzemelerden üretim', icon: Award },
                    { text: '25 yıllık deneyim ve uzmanlık', icon: Factory },
                    { text: 'Titizlikle kontrol edilen üretim süreci', icon: CheckCircle2 },
                    { text: 'Müşteri memnuniyeti odaklı hizmet', icon: Award }
                  ],
                  gradient: 'from-blue-500 to-cyan-500'
                },
                {
                  title: 'Avantajlarımız',
                  items: [
                    { text: 'İstanbul merkezli hızlı teslimat', icon: Truck },
                    { text: 'Kişiye özel tasarım imkanı', icon: Factory },
                    { text: 'Uygun fiyat ve kaliteli ürün', icon: Award },
                    { text: '7/24 müşteri desteği', icon: MessageCircle }
                  ],
                  gradient: 'from-emerald-500 to-teal-500'
                }
              ].map((section, sectionIndex) => (
                <motion.div
                  key={sectionIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + sectionIndex * 0.1 }}
                >
                  <h3 className="text-lg font-semibold text-[#0F172A] mb-4 tracking-tight">{section.title}</h3>
                  <ul className="space-y-3">
                    {section.items.map((item, itemIndex) => {
                      const IconComponent = item.icon;
                      return (
                        <motion.li
                          key={itemIndex}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 + sectionIndex * 0.1 + itemIndex * 0.05 }}
                          className="flex items-start gap-3 text-slate-700"
                        >
                          <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${section.gradient} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                            <IconComponent className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-sm leading-relaxed">{item.text}</span>
                        </motion.li>
                      );
                    })}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>

          {/* FAQ Bölümü - Minimalist */}
          <div className="mt-12 bg-white/50 backdrop-blur-md rounded-[24px] border border-slate-200/50 p-8">
            <h2 className="text-2xl font-bold text-[#0F172A] mb-6 tracking-tight">Sıkça Sorulan Sorular</h2>
            <div className="space-y-6">
              {[
                {
                  question: `Bu ${product.category?.toLowerCase() || 'ürün'} hangi malzemelerden üretiliyor?`,
                  answer: 'Ürünlerimiz yüksek kaliteli malzemelerden üretilmektedir. Detaylı malzeme bilgisi için ürün özelliklerine bakabilirsiniz.'
                },
                {
                  question: 'Kargo süresi ne kadar?',
                  answer: 'Normal siparişler 2-3 iş gününde, özel tasarım ürünler 5-7 iş gününde hazırlanır ve kargoya verilir.'
                },
                {
                  question: 'Kişiye özel tasarım yapılıyor mu?',
                  answer: 'Evet! İstediğiniz renk, desen, boyut ve yazı ile özel tasarım yapabiliyoruz. Detaylar için bizimle iletişime geçin.'
                }
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="pb-6 border-b border-slate-200 last:border-0 last:pb-0"
                >
                  <h3 className="text-lg font-semibold text-[#0F172A] mb-2">{faq.question}</h3>
                  <p className="text-slate-600">{faq.answer}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* İlgili Sayfalar - Minimalist */}
          <div className="mt-12 bg-white/50 backdrop-blur-md rounded-[24px] border border-slate-200/50 p-8">
            <h2 className="text-2xl font-bold text-[#0F172A] mb-6 tracking-tight">İlgili Sayfalar</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { href: '/urunler', title: 'Tüm Ürünler', desc: 'Geniş ürün koleksiyonumuzu keşfedin' },
                { href: product.category ? `/urunler/${product.category.toLowerCase()}` : '/urunler', title: `${product.category || 'Ürün'} Kategorisi`, desc: 'Benzer ürünleri inceleyin' },
                { href: '/iletisim', title: 'İletişim', desc: 'Sorularınız için bizimle iletişime geçin' }
              ].map((link, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  whileHover={{ y: -2 }}
                >
                  <Link
                    href={link.href}
                    className="block bg-white/50 backdrop-blur-sm rounded-[16px] border border-slate-200/50 p-5 hover:bg-white/70 transition-all"
                  >
                    <h3 className="font-semibold text-[#0F172A] mb-1.5">{link.title}</h3>
                    <p className="text-slate-500 text-sm">{link.desc}</p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <DisabledFeatureModal
        isOpen={showDisabledModal}
        onClose={() => setShowDisabledModal(false)}
      />
    </>
  );
} 