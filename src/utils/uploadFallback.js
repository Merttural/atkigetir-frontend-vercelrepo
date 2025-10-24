// Upload Fallback Utility - Resim yükleme için fallback sistem
import { fallbackApiCall } from './apiTest';

export const uploadImageWithFallback = async (file) => {
  console.log('🖼️ Uploading image with fallback...');
  
  // Dosya boyutunu kontrol et (max 10MB)
  if (file.size > 10 * 1024 * 1024) {
    throw new Error('Dosya boyutu 10MB\'dan büyük olamaz');
  }
  
  // Dosya tipini kontrol et
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
  if (!allowedTypes.includes(file.type)) {
    throw new Error('Sadece resim dosyaları yüklenebilir (JPG, PNG, GIF, WebP)');
  }
  
  try {
    // FormData oluştur
    const formData = new FormData();
    formData.append('file', file);
    
    // Backend URL'leri - önce local API'yi dene, sonra backend'leri
    const backendUrls = [
      '/api/upload', // Local Next.js API route (ÖNCELİK - ImageKit ile)
      'https://atkigetir-backend.onrender.com/api/upload', // Backend fallback
      'https://api.atkigetir.com/api/upload' // Production backend fallback
    ].filter(Boolean);
    
    // Her backend'i dene
    for (const backendUrl of backendUrls) {
      try {
        console.log(`Trying upload to ${backendUrl}`);
        
        const response = await fetch(backendUrl, {
          method: 'POST',
          body: formData
        });
        
        if (response.ok) {
          const data = await response.json();
          console.log(`✅ Upload successful to ${backendUrl}`);
          // ImageKit response format: { url, ... } veya backend format: { imageUrl }
          return data.url || data.imageUrl;
        } else if (response.status === 429) {
          console.log(`⚠️ Rate limit on ${backendUrl}, trying next...`);
          continue;
        } else {
          console.log(`❌ Upload failed on ${backendUrl}: ${response.status}`);
          continue;
        }
      } catch (error) {
        console.log(`❌ Upload error on ${backendUrl}:`, error.message);
        continue;
      }
    }
    
    // Tüm backend'ler başarısız oldu
    throw new Error('Tüm upload endpoint\'leri başarısız oldu');
    
  } catch (error) {
    console.error('❌ Upload error:', error);
    throw error;
  }
};

// Çoklu resim yükleme
export const uploadMultipleImages = async (files) => {
  console.log(`🖼️ Uploading ${files.length} images...`);
  
  const uploadPromises = files.map(async (file, index) => {
    try {
      console.log(`Uploading image ${index + 1}/${files.length}`);
      const imageUrl = await uploadImageWithFallback(file);
      console.log(`✅ Image ${index + 1} uploaded: ${imageUrl}`);
      return imageUrl;
    } catch (error) {
      console.error(`❌ Image ${index + 1} upload failed:`, error);
      throw error;
    }
  });
  
  try {
    const results = await Promise.all(uploadPromises);
    console.log(`✅ All ${files.length} images uploaded successfully`);
    return results;
  } catch (error) {
    console.error('❌ Multiple upload failed:', error);
    throw error;
  }
};
