import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false, // Raw body için
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Raw body'yi al
    const chunks = [];
    req.on('data', (chunk) => chunks.push(chunk));
    
    await new Promise((resolve, reject) => {
      req.on('end', resolve);
      req.on('error', reject);
    });

    const body = Buffer.concat(chunks);
    
    // Content-Type'dan boundary'yi çıkar
    const contentType = req.headers['content-type'];
    if (!contentType || !contentType.includes('multipart/form-data')) {
      return res.status(400).json({ error: 'Content-Type must be multipart/form-data' });
    }

    const boundary = contentType.split('boundary=')[1];
    if (!boundary) {
      return res.status(400).json({ error: 'No boundary found' });
    }

    // Multipart data'yı parse et
    const parts = body.toString('binary').split(`--${boundary}`);
    let fileData = null;
    let filename = null;

    for (const part of parts) {
      if (part.includes('Content-Disposition: form-data')) {
        const nameMatch = part.match(/name="([^"]+)"/);
        const fileMatch = part.match(/filename="([^"]+)"/);
        
        if (nameMatch && nameMatch[1] === 'file' && fileMatch) {
          filename = fileMatch[1];
          const headerEnd = part.indexOf('\r\n\r\n');
          if (headerEnd !== -1) {
            fileData = Buffer.from(part.substring(headerEnd + 4), 'binary');
            break;
          }
        }
      }
    }

    if (!fileData || !filename) {
      return res.status(400).json({ error: 'No file found' });
    }

    // Dosya tipini kontrol et
    const fileType = filename.toLowerCase().split('.').pop();
    const allowedTypes = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
    if (!allowedTypes.includes(fileType)) {
      return res.status(400).json({ error: 'Sadece resim dosyaları yüklenebilir!' });
    }

    // Uploads klasörünü oluştur
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'products');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // WebP formatında dosya adı
    const outputFilename = `${Date.now()}.webp`;
    const outputPath = path.join(uploadDir, outputFilename);

    // Sharp ile resmi işle: boyutlandır, WebP'ye dönüştür ve kaydet
    await sharp(fileData)
      .resize(800, 800, {
        fit: 'inside', // Oranları koruyarak sığdır
        withoutEnlargement: true // Büyükse küçült, küçükse büyütme
      })
      .webp({ quality: 85 }) // WebP formatında %85 kalite
      .toFile(outputPath);

    // URL oluştur
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const imageUrl = `${baseUrl}/uploads/products/${outputFilename}`;

    res.status(200).json({ imageUrl });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: error.message || 'Yükleme hatası!' });
  }
}