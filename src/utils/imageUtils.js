/**
 * Supabase Storage ve diğer resim URL'lerini işlemek için utility fonksiyonlar
 */

/**
 * Ürün resim URL'ini işle ve doğru formata çevir
 * @param {string|undefined} imageUrl - Supabase'den gelen resim URL'i veya path'i
 * @returns {string} - İşlenmiş resim URL'i
 */
export function getProductImageUrl(imageUrl) {
  if (!imageUrl) {
    return '/images/placeholder.svg';
  }
  
  // Eğer zaten tam URL ise (http/https ile başlıyorsa) direkt döndür
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    // Development'da sadece hata durumlarında log
    return imageUrl;
  }
  
  // Supabase URL'ini al
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  
  if (!supabaseUrl || supabaseUrl === 'https://your-project.supabase.co') {
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
      console.warn('⚠️ Supabase URL yapılandırılmamış:', supabaseUrl);
    }
    // Supabase yapılandırılmamışsa relative path'i döndür
    return imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`;
  }
  
  // Supabase Storage path formatlarını kontrol et
  // Format 1: storage/bucket-name/file-path.jpg veya /storage/bucket-name/file-path.jpg
  if (imageUrl.startsWith('storage/') || imageUrl.startsWith('/storage/')) {
    const cleanPath = imageUrl.startsWith('/') ? imageUrl.slice(1) : imageUrl;
    const finalUrl = `${supabaseUrl}/storage/v1/object/public/${cleanPath}`;
    return finalUrl;
  }
  
  // Format 2: bucket-name/file-path.jpg (direkt bucket adı ile başlıyorsa)
  // Eğer path'te '/' varsa ve 'storage' içermiyorsa, muhtemelen bucket-name/path formatındadır
  if (imageUrl.includes('/') && !imageUrl.startsWith('/')) {
    // En yaygın bucket adları: products, images, product-images
    const commonBuckets = ['products', 'images', 'product-images', 'uploads'];
    const parts = imageUrl.split('/');
    const firstPart = parts[0];
    
    // Eğer ilk kısım yaygın bir bucket adı gibi görünüyorsa
    if (commonBuckets.includes(firstPart) || firstPart.length > 0) {
      const finalUrl = `${supabaseUrl}/storage/v1/object/public/${imageUrl}`;
      return finalUrl;
    }
  }
  
  // Format 3: Sadece dosya adı (örn: image.jpg) - products bucket'ına varsayılan olarak ekle
  if (!imageUrl.includes('/') && imageUrl.includes('.')) {
    const finalUrl = `${supabaseUrl}/storage/v1/object/public/products/${imageUrl}`;
    return finalUrl;
  }
  
  // Relative path ise direkt döndür (başında / yoksa ekle)
  const finalUrl = imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`;
  return finalUrl;
}

/**
 * Birden fazla resim URL'ini işle
 * @param {string|string[]|undefined} images - Resim URL'leri veya path'leri
 * @returns {string[]} - İşlenmiş resim URL'leri array'i
 */
export function getProductImages(images) {
  if (!images) return [];
  
  if (typeof images === 'string') {
    return [getProductImageUrl(images)];
  }
  
  if (Array.isArray(images)) {
    return images.map(img => getProductImageUrl(img)).filter(Boolean);
  }
  
  return [];
}
