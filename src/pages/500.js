import Head from 'next/head';
import Link from 'next/link';

export default function Custom500() {
  return (
    <>
      <Head>
        <title>Sunucu Hatası - Atkigetir</title>
        <meta name="description" content="Teknik bir sorun oluştu. Lütfen daha sonra tekrar deneyin." />
      </Head>
      
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            {/* 500 İkonu */}
            <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
              </svg>
            </div>
            
            <h1 className="text-4xl font-bold text-gray-900 mb-4">500</h1>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Sunucu Hatası</h2>
            <p className="text-gray-600 mb-6">
              Teknik bir sorun oluştu. Lütfen birkaç dakika sonra tekrar deneyin.
            </p>
            
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-center gap-2 text-orange-700">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span className="font-semibold">Teknik Ekip Bilgilendirildi</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <button
                onClick={() => window.location.reload()}
                className="block w-full bg-gradient-to-r from-blue-600 to-purple-500 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-600 transition"
              >
                Sayfayı Yenile
              </button>
              
              <Link href="/" legacyBehavior>
                <a className="block w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition">
                  Ana Sayfaya Dön
                </a>
              </Link>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-2">
                Sorun devam ederse bizimle iletişime geçin:
              </p>
              <div className="space-y-1 text-sm">
                <p className="text-gray-600">📧 info@atkigetir.com</p>
                <p className="text-gray-600">📞 +90 (212) 555 0123</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 