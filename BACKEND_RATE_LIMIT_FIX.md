# Backend Rate Limit Sorunu Çözümü

## Sorun
Backend'de 429 (Too Many Requests) hatası alınıyor. Bu, backend'deki rate limit ayarlarının çok düşük olmasından kaynaklanıyor.

## Çözüm

### 1. Backend'de Rate Limit Ayarlarını Artırın

Backend kodunuzda (muhtemelen Express.js kullanıyorsunuz) rate limit ayarlarını şu şekilde güncelleyin:

```javascript
// Backend'de rate limit ayarları
const rateLimit = require('express-rate-limit');

// Mevcut ayarlar (çok düşük):
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 dakika
  max: 100, // 15 dakikada 100 istek - ÇOK DÜŞÜK!
  message: 'Too many requests'
});

// Yeni ayarlar (yüksek limit):
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 dakika
  max: 10000, // 15 dakikada 10,000 istek - YÜKSEK LİMİT
  message: 'Too many requests',
  standardHeaders: true,
  legacyHeaders: false,
});

// Veya rate limit'i tamamen kaldırın (geçici olarak):
// app.use(limiter); // Bu satırı comment out yapın
```

### 2. Backend'de CORS Ayarlarını Kontrol Edin

```javascript
const cors = require('cors');

app.use(cors({
  origin: [
    'https://www.atkigetir.com',
    'https://atkigetir.com',
    'http://localhost:3000'
  ],
  credentials: true
}));
```

### 3. Backend'de Timeout Ayarlarını Artırın

```javascript
// Request timeout'u artırın
app.use((req, res, next) => {
  req.setTimeout(60000); // 60 saniye
  res.setTimeout(60000); // 60 saniye
  next();
});
```

### 4. Backend'de Memory Kullanımını Optimize Edin

```javascript
// Body parser limitlerini artırın
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
```

## Test Etmek İçin

Backend'i güncelledikten sonra test edin:

```bash
# Backend'i test et
curl -I https://atkigetir-backend.onrender.com/api/products

# Başarılı olmalı (200 OK)
```

## Frontend'de Yapılan İyileştirmeler

✅ **Retry Mekanizması** - 5 kez deneme
✅ **Cache Sistemi** - 30 dakika cache
✅ **Error Handling** - Detaylı hata mesajları
✅ **Rate Limit Handling** - 429 hatalarını otomatik handle eder

## Sonuç

Backend'deki rate limit ayarlarını artırdıktan sonra frontend otomatik olarak çalışmaya başlayacak. Frontend'de retry mekanizması sayesinde backend çalıştığında hemen bağlanacak.
