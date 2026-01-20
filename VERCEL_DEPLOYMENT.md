# 🚀 Vercel Deployment Rehberi

**Tarih:** 2025-01-15  
**Proje:** Atkigetir Frontend

---

## ✅ Vercel.json Yapılandırması

`vercel.json` dosyası Next.js projeniz için optimize edilmiştir:

- **Framework:** `nextjs` (otomatik algılama)
- **Build Command:** `npm run build` (Next.js varsayılan)
- **Output Directory:** `.next` (Next.js varsayılan)
- **Install Command:** `npm install`

**Not:** Vercel otomatik olarak Next.js projelerini algılar, ancak `vercel.json` ile açıkça belirtmek daha güvenilirdir.

---

## 🔐 Environment Variables (ÖNEMLİ!)

Vercel Dashboard'da aşağıdaki environment variables'ları **MUTLAKA** tanımlayın:

### 📍 Vercel Dashboard → Project Settings → Environment Variables

#### 1. Site Configuration
```
NEXT_PUBLIC_BASE_URL=https://atkigetir.com
NEXT_PUBLIC_SITE_NAME=Atkigetir
NEXT_PUBLIC_SITE_DESCRIPTION=Kaliteli atkı ve bere ürünleri
```

#### 2. Analytics & Tracking (ÖNEMLİ!)
```
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_GOOGLE_ADS_ID=AW-11457126126
NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL=AW-11457126126/DönüşümEtiketi
NEXT_PUBLIC_META_PIXEL_ID=XXXXXXXXXXXXXXX
```

**⚠️ UYARI:** Bu değerler olmadan Google Ads conversion tracking ve Analytics çalışmaz!

#### 3. Supabase Configuration
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here
```

**⚠️ GÜVENLİK:** `SUPABASE_SERVICE_ROLE_KEY` sadece server-side kullanılır, client-side'da asla kullanılmaz!

---

## 📋 Deployment Adımları

### 1. GitHub'a Push
```bash
git add .
git commit -m "Production ready: Next.js optimizations, security headers, legal pages"
git push origin main
```

### 2. Vercel Dashboard'da Kontrol

#### A. Project Settings → General
- ✅ Framework Preset: **Next.js** (otomatik algılanmalı)
- ✅ Root Directory: `.` (proje root)
- ✅ Build Command: `npm run build` (varsayılan)
- ✅ Output Directory: `.next` (varsayılan)
- ✅ Install Command: `npm install` (varsayılan)

#### B. Project Settings → Environment Variables
- ✅ Yukarıdaki tüm environment variables'ları ekleyin
- ✅ **Production**, **Preview**, ve **Development** için ayrı ayrı ekleyin
- ✅ Google Ads ve Analytics ID'lerini **MUTLAKA** ekleyin!

#### C. Project Settings → Domains
- ✅ Custom domain ekleyin (örn: `atkigetir.com`)
- ✅ "Force HTTPS" seçeneğini aktif edin
- ✅ SSL sertifikası otomatik olarak Let's Encrypt tarafından sağlanır

---

## 🔍 Deployment Sonrası Kontroller

### 1. Build Log Kontrolü
- Vercel Dashboard → Deployments → Son deployment'ın loglarını kontrol edin
- Build başarılı mı? Hata var mı?

### 2. Site Kontrolleri
- ✅ Ana sayfa yükleniyor mu?
- ✅ Ürünler sayfası çalışıyor mu?
- ✅ Ürün detay sayfaları açılıyor mu?
- ✅ WhatsApp butonları çalışıyor mu?

### 3. Analytics Kontrolleri
- ✅ Google Analytics çalışıyor mu? (Browser console'da `window.gtag` kontrol edin)
- ✅ Google Ads conversion tracking çalışıyor mu?
- ✅ Cookie consent çalışıyor mu?

### 4. SEO Kontrolleri
- ✅ `/sitemap.xml` erişilebilir mi?
- ✅ `/robots.txt` erişilebilir mi?
- ✅ Meta tags doğru mu? (View Page Source ile kontrol edin)

### 5. Security Kontrolleri
- ✅ HTTPS zorunlu mu? (HTTP → HTTPS redirect çalışıyor mu?)
- ✅ Security headers doğru mu? (Browser DevTools → Network → Headers)

---

## 🐛 Olası Sorunlar ve Çözümleri

### Sorun 1: Build Hatası
**Çözüm:**
- Vercel Dashboard → Deployments → Son deployment'ın loglarını kontrol edin
- `npm run build` komutunu local'de çalıştırıp hataları kontrol edin

### Sorun 2: Environment Variables Çalışmıyor
**Çözüm:**
- Vercel Dashboard → Project Settings → Environment Variables
- Değişkenlerin doğru yazıldığından emin olun
- **Production** environment için eklediğinizden emin olun
- Deployment'ı yeniden başlatın (Redeploy)

### Sorun 3: Google Ads Conversion Tracking Çalışmıyor
**Çözüm:**
- `NEXT_PUBLIC_GOOGLE_ADS_ID` tanımlı mı?
- `NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL` tanımlı mı? (opsiyonel)
- Cookie consent verildi mi?
- Browser console'da `window.gtag` var mı?

### Sorun 4: Supabase Bağlantı Hatası
**Çözüm:**
- `NEXT_PUBLIC_SUPABASE_URL` doğru mu?
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` doğru mu?
- Supabase dashboard'da Row Level Security (RLS) aktif mi?

---

## 📝 Önemli Notlar

1. **Environment Variables:**
   - `NEXT_PUBLIC_*` prefix'li değişkenler client-side'da kullanılabilir
   - `SUPABASE_SERVICE_ROLE_KEY` gibi hassas bilgiler **ASLA** `NEXT_PUBLIC_*` ile başlamamalı

2. **Build Optimizations:**
   - Next.js otomatik olarak production build'de optimizasyon yapar
   - Image optimization production'da aktif
   - Code splitting otomatik

3. **Cache:**
   - Static sayfalar CDN'de cache'lenir
   - ISR (Incremental Static Regeneration) sayfalar belirli aralıklarla yenilenir

4. **SSL/HTTPS:**
   - Vercel otomatik olarak SSL sertifikası sağlar
   - HTTP → HTTPS redirect otomatik

---

## ✅ Deployment Checklist

- [ ] GitHub'a push yapıldı
- [ ] Vercel Dashboard'da environment variables eklendi
- [ ] Google Ads ID eklendi (`NEXT_PUBLIC_GOOGLE_ADS_ID`)
- [ ] Google Analytics ID eklendi (`NEXT_PUBLIC_GA_ID`)
- [ ] Google Ads Conversion Label eklendi (`NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL`)
- [ ] Supabase credentials eklendi
- [ ] Custom domain ayarlandı
- [ ] "Force HTTPS" aktif edildi
- [ ] Build başarılı
- [ ] Site test edildi
- [ ] Analytics çalışıyor
- [ ] WhatsApp butonları çalışıyor
- [ ] Conversion tracking test edildi

---

## 🎯 Sonuç

Proje production'a hazır! Tüm optimizasyonlar ve güvenlik önlemleri alındı.

**Önemli:** Environment variables'ları Vercel Dashboard'da tanımlamayı unutmayın!
