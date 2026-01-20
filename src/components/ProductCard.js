import { useState, useEffect, useMemo, memo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { MessageCircle, ArrowRight, ShoppingBag, Eye, ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductBadge, { getProductBadges } from './ProductBadge';
import { getProductImageUrl, getProductImages } from '@/utils/imageUtils';
import { useCart } from '@/hooks/useCart';
import { trackAddToCart } from '@/utils/googleAds';

function ProductCard({ product, showCategoryBadge = false, priority = false, isFeatured = false, size = 'small' }) {
  const router = useRouter();
  const { addToCart } = useCart();
  const whatsappNumber = '905337498266';
  const [isHovered, setIsHovered] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Size kontrolü: 'small' veya 'large' (isFeatured artık size'ı etkilemiyor)
  const isLarge = size === 'large';

  // Tüm görselleri birleştir (ana görsel + ek görseller) - useMemo ile optimize
  const allImages = useMemo(() => {
    const mainImage = getProductImageUrl(product.image_url || product.image);
    const additional = getProductImages(product.additionalImages || []);
    return [mainImage, ...additional].filter(Boolean);
  }, [product.image_url, product.image, product.additionalImages]);
  
  const hasMultipleImages = allImages.length > 1;

  useEffect(() => {
    // SSR-safe: Client-side'da kontrol et
    if (typeof window !== 'undefined') {
      setIsDesktop(window.innerWidth >= 768);
      const handleResize = () => {
        setIsDesktop(window.innerWidth >= 768);
      };
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const productName = product.name || 'Ürün';
  const productSlug = product.slug || product.id || product._id;
  
  // Supabase resim URL'ini işle
  const productImage = allImages[currentImageIndex] || allImages[0] || '/images/placeholder.svg';
  
  const productPrice = product.price || 0;
  const productCategory = product.category || '';
  
  // Featured ürün için özel stil - artık grid span kullanmıyoruz, tüm kartlar eşit
  const featuredClasses = '';
  
  // Size-based class'lar - tüm kartlar eşit boyutta
  const sizeClasses = {
    // Tüm kartlar için standart boyutlar - eşit görünüm
    card: 'rounded-[24px] lg:rounded-[24px]',
    imageAspect: 'aspect-[4/5]',
    padding: 'p-4 lg:p-5',
    title: 'text-base lg:text-lg',
    subtitle: 'text-xs lg:text-sm',
    button: 'text-xs lg:text-xs py-1.5 px-3 lg:py-2 lg:px-3.5',
    icon: 'w-3.5 h-3.5 lg:w-3.5 lg:h-3.5',
    badge: 'top-3 left-3',
    sliderButton: 'w-8 h-8 lg:w-10 lg:h-10',
    sliderIcon: 'w-4 h-4 lg:w-5 lg:h-5'
  };
  
  // Slider navigation
  const nextImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };
  
  const prevImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  // Resim tıklama handler'ı
  const handleImageClick = () => {
    router.push(`/urunler/${productSlug}`);
  };

  const handleWhatsApp = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const message = `Merhaba, "${productName}" ürünü hakkında bilgi almak istiyorum.`;
    
    // Google Ads conversion tracking
    googleAds.trackConversion();
    
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    // Google Ads tracking
    trackAddToCart(
      product._id || product.id || product.slug,
      productName,
      productPrice,
      'TRY'
    );
  };

  // Ürün rozetlerini al - sadece "Yeni" ve "Toptan" göster
  const allBadges = getProductBadges(product);
  const badges = allBadges.filter(badge => badge.type === 'new' || badge.type === 'wholesale');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={isDesktop ? { y: -4, transition: { duration: 0.2 } } : {}}
      className={`bg-white/50 backdrop-blur-md ${sizeClasses.card} overflow-hidden transition-all duration-300 relative group ${
        isDesktop ? 'hover:shadow-xl hover:bg-white/70' : ''
      }`}
    >
      {/* Ürün Görseli - Tüm kartlar eşit aspect ratio */}
      <div className={`relative ${sizeClasses.imageAspect} overflow-hidden bg-gradient-to-br from-slate-50/50 to-slate-100/50`}>
        {/* Badge - Sol Üst Köşe */}
        {badges.length > 0 && (
          <div className="absolute top-3 left-3 z-20">
            {badges.map((badge, index) => (
              <ProductBadge
                key={index}
                badgeType={badge.type}
                position="top-left"
              />
            ))}
          </div>
        )}
        
        {/* Slider Navigation Buttons - Size'a göre boyutlandırılmış */}
        {hasMultipleImages && (
          <>
            <button
              onClick={prevImage}
              className={`absolute left-2 top-1/2 -translate-y-1/2 z-20 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg hover:bg-white transition-all opacity-0 group-hover:opacity-100 ${sizeClasses.sliderButton}`}
              aria-label="Önceki resim"
            >
              <ChevronLeft className={`text-slate-700 ${sizeClasses.sliderIcon}`} />
            </button>
            <button
              onClick={nextImage}
              className={`absolute right-2 top-1/2 -translate-y-1/2 z-20 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg hover:bg-white transition-all opacity-0 group-hover:opacity-100 ${sizeClasses.sliderButton}`}
              aria-label="Sonraki resim"
            >
              <ChevronRight className={`text-slate-700 ${sizeClasses.sliderIcon}`} />
            </button>
            
            {/* Slider Dots */}
            <div className={`absolute ${isLarge ? 'bottom-4' : 'bottom-2'} left-1/2 -translate-x-1/2 z-20 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity ${
              isLarge ? 'lg:gap-2.5' : 'lg:gap-2'
            }`}>
              {allImages.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setCurrentImageIndex(index);
                  }}
                  className={`rounded-full transition-all ${
                    index === currentImageIndex 
                      ? `bg-white ${isLarge ? 'w-6 h-1.5 lg:w-10 lg:h-2' : 'w-4 h-1.5 lg:w-6'}` 
                      : `bg-white/50 ${isLarge ? 'w-1.5 h-1.5 lg:w-2.5 lg:h-2.5' : 'w-1.5 h-1.5 lg:w-2 lg:h-2'}`
                  }`}
                  aria-label={`Resim ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
        
        <div 
          className="block h-full cursor-pointer" 
          onClick={handleImageClick}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleImageClick();
            }
          }}
          role="button"
          tabIndex={0}
          aria-label={`${productName} ürün detaylarını görüntüle`}
        >
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentImageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative h-full w-full overflow-hidden"
            >
              {/* Loading State */}
              {imageLoading && (
                <div className="absolute inset-0 bg-gradient-to-br from-slate-100/50 to-slate-200/50 animate-pulse flex items-center justify-center">
                  <div className="w-12 h-12 border-4 border-slate-300 border-t-[#2563EB] rounded-full animate-spin" />
                </div>
              )}
              
              {/* Error State */}
              {imageError ? (
                <div className="absolute inset-0 bg-gradient-to-br from-slate-100/50 to-slate-200/50 flex items-center justify-center">
                  <ShoppingBag className="w-16 h-16 text-slate-300" />
                  {process.env.NODE_ENV === 'development' && (
                    <div className="absolute bottom-2 left-2 right-2 text-xs text-red-500 bg-white/90 p-1 rounded">
                      Resim yüklenemedi: {productImage}
                    </div>
                  )}
                </div>
              ) : (
                <motion.div
                  className="relative h-full w-full"
                  whileHover={isDesktop ? { scale: 1.08 } : { scale: 1.1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <Image
                    src={productImage}
                    alt={productName}
                    fill
                    className={`object-cover transition-opacity duration-300 ${imageLoading ? 'opacity-0' : 'opacity-100'}`}
                    priority={priority}
                    unoptimized={process.env.NODE_ENV === 'development'}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    onLoad={() => {
                      setImageLoading(false);
                      setImageError(false);
                    }}
                    onError={(e) => {
                      console.error('❌ Image load error:', {
                        src: productImage,
                        productName,
                        originalImageUrl: product.image_url || product.image,
                        error: e
                      });
                      setImageError(true);
                      setImageLoading(false);
                    }}
                  />
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bilgi Alanı - Size'a göre optimize */}
      <div className={`relative ${sizeClasses.padding}`}>
        {/* Başlık ve Fiyat Sorun */}
        <div className="mb-4">
          <Link href={`/urunler/${productSlug}`}>
            <h3 className={`font-semibold text-[#0F172A] line-clamp-2 hover:text-[#2563EB] transition-colors leading-tight mb-1.5 ${sizeClasses.title}`}>
              {productName}
            </h3>
          </Link>
          <p className={`text-slate-500 ${sizeClasses.subtitle}`}>Fiyat Sorun</p>
        </div>
        
        {/* Butonlar - Şık ve Kompakt Tasarım */}
        <div className="flex gap-2">
          {/* WhatsApp'tan Sor Butonu */}
          <motion.button
            onClick={handleWhatsApp}
            aria-label={`${productName} için WhatsApp'tan sor`}
            whileHover={{ scale: 1.05, y: -1 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 bg-gradient-to-r from-[#22C55E] to-[#16A34A] hover:from-[#16A34A] hover:to-[#15803d] text-white font-medium rounded-xl transition-all shadow-sm hover:shadow-lg flex items-center justify-center gap-1.5 text-xs py-2 px-3 lg:py-2 lg:px-3.5 backdrop-blur-sm"
          >
            <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
            <span className="hidden sm:inline">WhatsApp</span>
            <span className="sm:hidden">WA</span>
          </motion.button>

          {/* Sepete Ekle Butonu */}
          <motion.button
            onClick={handleAddToCart}
            aria-label={`${productName} ürününü sepete ekle`}
            whileHover={{ scale: 1.05, y: -1 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 bg-gradient-to-r from-[#2563EB] to-[#1e40af] hover:from-[#1e40af] hover:to-[#1e3a8a] text-white font-medium rounded-xl transition-all shadow-sm hover:shadow-lg flex items-center justify-center gap-1.5 text-xs py-2 px-3 lg:py-2 lg:px-3.5 backdrop-blur-sm"
          >
            <ShoppingCart className="w-3.5 h-3.5" aria-hidden="true" />
            <span className="hidden sm:inline">Sepete Ekle</span>
            <span className="sm:hidden">Sepet</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

// Memoize et - sadece props değiştiğinde re-render
export default memo(ProductCard, (prevProps, nextProps) => {
  return (
    prevProps.product?.id === nextProps.product?.id &&
    prevProps.product?.price === nextProps.product?.price &&
    prevProps.showCategoryBadge === nextProps.showCategoryBadge &&
    prevProps.priority === nextProps.priority &&
    prevProps.isFeatured === nextProps.isFeatured &&
    prevProps.size === nextProps.size
  );
});
