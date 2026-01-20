import crypto from 'crypto';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // React Strict Mode - Production için aktif
  reactStrictMode: true,
  
  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  
  // Development modunda ISR uyarılarını azaltmak için
  experimental: {
    // ISR için daha stabil hot reload (Next.js 15+)
    isrMemoryCacheSize: 50 * 1024 * 1024, // 50MB
  },
  
  // Images configuration
  images: {
    // Development'da unoptimized kullan (Supabase Storage sorunlarını önlemek için)
    // Production'da optimize et
    unoptimized: process.env.NODE_ENV === 'development',
    remotePatterns: [
      // Supabase Storage
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
      // ImageKit
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io',
        pathname: '/**',
      },
      // Production domain
      {
        protocol: 'https',
        hostname: 'atkigetir.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.atkigetir.com',
        pathname: '/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Security Headers - Next.js config üzerinden
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // XSS Protection
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()'
          },
          // Content Security Policy - Makul ayarlar
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://www.google.com https://www.gstatic.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com data:",
              "img-src 'self' data: https: blob:",
              "connect-src 'self' https://*.supabase.co https://www.google-analytics.com https://www.googletagmanager.com https://*.imagekit.io",
              "frame-src 'self' https://www.google.com",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'none'",
              "upgrade-insecure-requests",
            ].join('; ')
          },
        ],
      },
    ];
  },
  
  // Redirects - www/non-www ve http→https (Vercel otomatik yönetir ama dokümante ediyoruz)
  async redirects() {
    return [
      // HTTP → HTTPS redirect (Vercel otomatik yapar, ama dokümante ediyoruz)
      // www → non-www veya tersi (tercihinize göre)
      // Şu an için redirect yok, Vercel domain ayarlarından yönetilebilir
    ];
  },
  
  // Webpack config optimizations
  webpack: (config, { dev, isServer }) => {
    // Production optimizations
    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        moduleIds: 'deterministic',
        runtimeChunk: 'single',
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            default: false,
            vendors: false,
            framework: {
              name: 'framework',
              chunks: 'all',
              test: /(?<!node_modules.*)[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-subscription)[\\/]/,
              priority: 40,
              enforce: true,
            },
            lib: {
              test(module) {
                return module.size() > 160000 && /node_modules[/\\]/.test(module.identifier());
              },
              name(module) {
                const hash = crypto.createHash('sha1');
                hash.update(module.identifier());
                return hash.digest('hex').substring(0, 8);
              },
              priority: 30,
              minChunks: 1,
              reuseExistingChunk: true,
            },
            commons: {
              name: 'commons',
              minChunks: 2,
              priority: 20,
            },
            shared: {
              name(module, chunks) {
                const chunkNames = chunks.reduce((acc, chunk) => acc + (chunk.name || ''), '');
                const hash = crypto.createHash('sha1');
                hash.update(chunkNames);
                return hash.digest('hex').substring(0, 8);
              },
              priority: 10,
              minChunks: 2,
              reuseExistingChunk: true,
            },
          },
        },
      };
    }
    
    return config;
  },
  
  // Production optimizations
  ...(process.env.NODE_ENV === 'production' && {
    generateEtags: true,
    poweredByHeader: false,
    compress: true,
  }),
  
  // Experimental features
  experimental: {
    optimizeCss: true,
  },
};

export default nextConfig;
