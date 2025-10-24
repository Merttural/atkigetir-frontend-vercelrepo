import formidable from 'formidable';
import sharp from 'sharp';
import ImageKit from 'imagekit';

// Next.js API için body parser'ı kapat
export const config = {
  api: {
    bodyParser: false,
  },
};

// ImageKit client'ını başlat
const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

// Türkçe karakterleri slugify eden fonksiyon
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim('-');
}

export default async function handler(req, res) {
  // CORS headers ekle
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // OPTIONS request için
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // Sadece POST isteklerini kabul et
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      error: 'Sadece POST istekleri kabul edilir' 
    });
  }

  try {
    // Formidable ile dosyayı parse et
    const form = formidable({
      maxFileSize: 10 * 1024 * 1024, // 10MB limit
      filter: ({ mimetype }) => {
        // Sadece resim dosyalarını kabul et
        return mimetype && mimetype.startsWith('image/');
      },
    });

    const [fields, files] = await form.parse(req);
    
    // Dosya kontrolü
    if (!files.image || !files.image[0]) {
      return res.status(400).json({ 
        error: 'Resim dosyası bulunamadı' 
      });
    }

    const file = files.image[0];
    
    // Dosya tipi kontrolü
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/avif'];
    if (!allowedTypes.includes(file.mimetype)) {
      return res.status(415).json({ 
        error: 'Desteklenmeyen dosya tipi. Sadece JPG, PNG, WebP, AVIF kabul edilir' 
      });
    }

    // Dosya boyutu kontrolü (10MB)
    if (file.size > 10 * 1024 * 1024) {
      return res.status(413).json({ 
        error: 'Dosya boyutu çok büyük. Maksimum 10MB olmalı' 
      });
    }

    // Sharp ile resmi optimize et
    const optimizedBuffer = await sharp(file.filepath)
      .resize(1200, 1200, {
        fit: 'inside', // Oranları koruyarak sığdır
        withoutEnlargement: true // Küçük resimleri büyütme
      })
      .webp({ quality: 82 }) // WebP formatında %82 kalite
      .toBuffer();

    // Dosya adı oluştur (ürün slug + timestamp + boyut)
    const timestamp = Date.now();
    const dimensions = await sharp(optimizedBuffer).metadata();
    const fileName = `atki-${timestamp}-${dimensions.width}x${dimensions.height}.webp`;

    // ImageKit'e yükle
    const uploadResponse = await imagekit.upload({
      file: optimizedBuffer,
      fileName: fileName,
      folder: 'atkigetir/products',
      useUniqueFileName: false,
      overwriteFile: false,
    });

    // Başarılı yanıt
    res.status(200).json({
      url: uploadResponse.url,
      width: dimensions.width,
      height: dimensions.height,
      format: 'webp',
      fileId: uploadResponse.fileId,
      message: 'Resim başarıyla yüklendi'
    });

  } catch (error) {
    console.error('Upload hatası:', error);
    
    // Hata tipine göre uygun HTTP kodu döndür
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(413).json({ 
        error: 'Dosya boyutu çok büyük' 
      });
    }
    
    return res.status(500).json({ 
      error: 'Resim yükleme sırasında bir hata oluştu' 
    });
  }
}