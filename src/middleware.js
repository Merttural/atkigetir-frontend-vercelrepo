import { NextResponse } from 'next/server';

/**
 * Next.js Middleware
 * Security headers, redirects ve diğer request-level işlemler için
 * 
 * NOT: SSL/HTTPS redirect Vercel tarafından otomatik yönetilir.
 * Bu middleware sadece ek güvenlik ve yönlendirmeler için kullanılır.
 */

export function middleware(request) {
  try {
    const response = NextResponse.next();
    
    // Security Headers - next.config.mjs'de de tanımlı ama middleware'de de ekliyoruz
    // (next.config.mjs'deki headers middleware'den önce uygulanır)
    
    // HSTS Header (Strict-Transport-Security)
    response.headers.set(
      'Strict-Transport-Security',
      'max-age=63072000; includeSubDomains; preload'
    );

    // X-Content-Type-Options
    response.headers.set('X-Content-Type-Options', 'nosniff');

    // X-Frame-Options
    response.headers.set('X-Frame-Options', 'DENY');

    // X-XSS-Protection
    response.headers.set('X-XSS-Protection', '1; mode=block');

    // Referrer-Policy
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

    // Permissions-Policy
    response.headers.set(
      'Permissions-Policy',
      'camera=(), microphone=(), geolocation=(), interest-cohort=()'
    );

    return response;
  } catch (error) {
    // Hata durumunda basit response döndür (production'da log yok)
    if (process.env.NODE_ENV === 'development') {
      console.error('Middleware error:', error);
    }
    return NextResponse.next();
  }
}

// Middleware'in çalışacağı path'ler
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

/**
 * SSL/HTTPS Yönlendirme Notu:
 * 
 * Vercel otomatik olarak SSL sertifikası sağlar ve HTTP → HTTPS redirect yapar.
 * Bu işlem hosting seviyesinde yapılır, kod içinde yapılmasına gerek yoktur.
 * 
 * Vercel Dashboard'da:
 * 1. Project Settings → Domains
 * 2. Domain'iniz için "Force HTTPS" seçeneğini aktif edin
 * 3. SSL sertifikası otomatik olarak Let's Encrypt tarafından sağlanır
 * 
 * www/non-www redirect için:
 * Vercel Dashboard → Project Settings → Domains → Redirects sekmesinden yönetilebilir
 */
