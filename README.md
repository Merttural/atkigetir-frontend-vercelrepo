# Atkigetir Frontend

Modern ve responsive e-ticaret platformu frontend uygulaması.

## 🚀 Özellikler

- ⚡ Next.js 15 ile geliştirildi
- 🎨 Tailwind CSS ile modern tasarım
- 📱 Tam responsive tasarım
- 🛒 Gelişmiş sepet ve ödeme sistemi
- 👤 Kullanıcı kimlik doğrulama
- 🔐 JWT tabanlı güvenlik
- 📊 Admin paneli
- 🎯 SEO optimizasyonu

## 🛠️ Teknolojiler

- **Framework**: Next.js 15
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **HTTP Client**: Fetch API
- **Authentication**: JWT
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

## 📦 Kurulum

1. Depoyu klonlayın:
```bash
git clone <repo-url>
cd atkigetir-frontend
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. Environment variables dosyasını oluşturun:
```bash
cp env.example .env.local
```

4. Environment variables'ları güncelleyin:
```env
NEXT_PUBLIC_API_URL=https://your-backend-url.com
NEXT_PUBLIC_BASE_URL=https://your-frontend-url.com
NEXT_PUBLIC_SITE_NAME=Atkigetir
NEXT_PUBLIC_SITE_DESCRIPTION=Kaliteli atkı ve bere ürünleri
```

## 🚀 Geliştirme

```bash
npm run dev
```

Uygulama [http://localhost:3000](http://localhost:3000) adresinde çalışacaktır.

## 📝 Diğer Komutlar

```bash
# Production build
npm run build

# Production server başlat
npm start

# Linting
npm run lint

# Linting düzelt
npm run lint:fix
```

## 📁 Proje Yapısı

```
src/
├── components/     # React bileşenleri
├── pages/         # Next.js sayfaları
├── styles/        # CSS dosyaları
├── contexts/      # React Context'leri
├── hooks/         # Custom React hooks
├── utils/         # Yardımcı fonksiyonlar
└── config/        # Konfigürasyon dosyaları
```

## 🌐 Deploy

Bu proje Vercel'e deploy edilebilir:

1. GitHub repo'yu Vercel'e bağlayın
2. Environment variables'ları ekleyin
3. Deploy edin

## 📄 Lisans

ISC License