import Head from 'next/head';
import Link from 'next/link';

export default function Custom404() {
  return (
    <>
      <Head>
        <title>Sayfa Bulunamadı - Atkigetir</title>
        <meta name="description" content="Aradığınız sayfa bulunamadı. Atkigetir ana sayfasına dönün." />
      </Head>
      
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            {/* 404 İkonu */}
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
              </svg>
            </div>
            
            <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Sayfa Bulunamadı</h2>
            <p className="text-gray-600 mb-8">
              Aradığınız sayfa mevcut değil veya taşınmış olabilir. 
              Ana sayfamıza dönerek ürünlerimizi keşfedebilirsiniz.
            </p>
            
            <div className="space-y-3">
              <Link href="/" legacyBehavior>
                <a className="block w-full bg-gradient-to-r from-blue-600 to-purple-500 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-600 transition">
                  Ana Sayfaya Dön
                </a>
              </Link>
              
              <Link href="/urunler" legacyBehavior>
                <a className="block w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition">
                  Ürünleri Keşfet
                </a>
              </Link>
              
              <Link href="/contact" legacyBehavior>
                <a className="block w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition">
                  İletişime Geç
                </a>
              </Link>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Yardıma mı ihtiyacınız var?{' '}
                <Link href="/contact" legacyBehavior>
                  <a className="text-blue-600 hover:underline font-medium">Bizimle iletişime geçin</a>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 