import { useState, useEffect } from 'react';
import SEO from '@/components/SEO';

export default function SEODashboard() {
  const [seoData, setSeoData] = useState({
    // Anahtar kelime sıralamaları
    keywords: [
      { keyword: 'atkı', position: 1, traffic: 1500, difficulty: 'Kolay' },
      { keyword: 'atkı modelleri', position: 2, traffic: 800, difficulty: 'Orta' },
      { keyword: 'istanbul atkı', position: 3, traffic: 600, difficulty: 'Orta' },
      { keyword: 'atkı fiyatları', position: 4, traffic: 400, difficulty: 'Zor' },
      { keyword: 'kışlık atkı', position: 5, traffic: 300, difficulty: 'Kolay' }
    ],
    // Sayfa performansları
    pages: [
      { page: 'Ana Sayfa', traffic: 2500, bounceRate: 35, avgTime: 180 },
      { page: 'Atkı Sayfası', traffic: 1200, bounceRate: 28, avgTime: 220 },
      { page: 'Blog', traffic: 800, bounceRate: 45, avgTime: 150 },
      { page: 'İletişim', traffic: 300, bounceRate: 40, avgTime: 90 }
    ],
    // Teknik SEO metrikleri
    technical: {
      pageSpeed: 95,
      mobileScore: 92,
      accessibility: 88,
      seoScore: 96,
      coreWebVitals: {
        lcp: 1.2,
        fid: 50,
        cls: 0.05
      }
    },
    // Backlink profili
    backlinks: {
      total: 45,
      referringDomains: 32,
      domainAuthority: 65,
      spamScore: 2
    }
  });

  return (
    <>
      <SEO
        title="SEO Dashboard | Atkigetir - SEO Performans İzleme"
        description="Atkigetir SEO performans dashboard'u. Anahtar kelime sıralamaları, sayfa performansları, teknik SEO metrikleri ve backlink profili analizi."
        keywords="seo dashboard, seo performans, anahtar kelime takibi, seo analiz, atkı seo"
        url="/seo-dashboard"
        noindex={true}
      />

      <main className="max-w-7xl mx-auto py-10 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">SEO Dashboard</h1>
          <p className="text-gray-600">Atkigetir SEO performans takibi ve analiz raporları</p>
        </div>

        {/* Anahtar Kelime Sıralamaları */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Anahtar Kelime Sıralamaları</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Anahtar Kelime</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sıralama</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tahmini Trafik</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Zorluk</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trend</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {seoData.keywords.map((keyword, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {keyword.keyword}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        keyword.position <= 3 ? 'bg-green-100 text-green-800' :
                        keyword.position <= 10 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        #{keyword.position}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {keyword.traffic.toLocaleString()} /ay
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        keyword.difficulty === 'Kolay' ? 'bg-green-100 text-green-800' :
                        keyword.difficulty === 'Orta' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {keyword.difficulty}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                      ↗️ +2
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sayfa Performansları */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Sayfa Performansları</h2>
            <div className="space-y-4">
              {seoData.pages.map((page, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900">{page.page}</h3>
                    <span className="text-sm text-gray-500">{page.traffic} ziyaretçi</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Bounce Rate:</span>
                      <span className={`ml-2 font-medium ${
                        page.bounceRate < 30 ? 'text-green-600' :
                        page.bounceRate < 50 ? 'text-yellow-600' :
                        'text-red-600'
                      }`}>
                        %{page.bounceRate}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500">Ort. Süre:</span>
                      <span className="ml-2 font-medium text-gray-900">{page.avgTime}s</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Teknik SEO Metrikleri */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Teknik SEO Metrikleri</h2>
            <div className="space-y-6">
              {/* Core Web Vitals */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Core Web Vitals</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">LCP</span>
                    <span className={`text-sm font-medium ${
                      seoData.technical.coreWebVitals.lcp < 2.5 ? 'text-green-600' :
                      seoData.technical.coreWebVitals.lcp < 4 ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                      {seoData.technical.coreWebVitals.lcp}s
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">FID</span>
                    <span className={`text-sm font-medium ${
                      seoData.technical.coreWebVitals.fid < 100 ? 'text-green-600' :
                      seoData.technical.coreWebVitals.fid < 300 ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                      {seoData.technical.coreWebVitals.fid}ms
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">CLS</span>
                    <span className={`text-sm font-medium ${
                      seoData.technical.coreWebVitals.cls < 0.1 ? 'text-green-600' :
                      seoData.technical.coreWebVitals.cls < 0.25 ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                      {seoData.technical.coreWebVitals.cls}
                    </span>
                  </div>
                </div>
              </div>

              {/* SEO Skorları */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">SEO Skorları</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Page Speed</span>
                    <span className="text-sm font-medium text-green-600">{seoData.technical.pageSpeed}/100</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Mobile Score</span>
                    <span className="text-sm font-medium text-green-600">{seoData.technical.mobileScore}/100</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">SEO Score</span>
                    <span className="text-sm font-medium text-green-600">{seoData.technical.seoScore}/100</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Backlink Profili */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Backlink Profili</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{seoData.backlinks.total}</div>
              <div className="text-sm text-gray-600">Toplam Backlink</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">{seoData.backlinks.referringDomains}</div>
              <div className="text-sm text-gray-600">Referring Domain</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">{seoData.backlinks.domainAuthority}</div>
              <div className="text-sm text-gray-600">Domain Authority</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">{seoData.backlinks.spamScore}%</div>
              <div className="text-sm text-gray-600">Spam Score</div>
            </div>
          </div>
        </div>

        {/* SEO Önerileri */}
        <div className="bg-blue-50 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">SEO Önerileri</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-blue-800 mb-2">İyileştirme Alanları</h3>
              <ul className="space-y-2 text-blue-700">
                <li>• Blog sayfalarında bounce rate'i düşürün</li>
                <li>• "Atkı fiyatları" anahtar kelimesinde sıralama yükseltin</li>
                <li>• Daha fazla backlink kazanın</li>
                <li>• Accessibility skorunu iyileştirin</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-800 mb-2">Başarılı Alanlar</h3>
              <ul className="space-y-2 text-blue-700">
                <li>✅ "Atkı" anahtar kelimesinde #1 sıralama</li>
                <li>✅ Mükemmel Core Web Vitals skorları</li>
                <li>✅ Düşük spam score (%2)</li>
                <li>✅ Yüksek SEO skoru (96/100)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Not: Bu dashboard örnek veriler içerir */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Bu dashboard örnek veriler içermektedir. Gerçek veriler Google Analytics ve Search Console'dan alınacaktır.</p>
        </div>
      </main>
    </>
  );
}
