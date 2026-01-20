import { fetchAllProducts } from '@/utils/supabaseProducts';

function generateSiteMap(products) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://atkigetir.com';
  const currentDate = new Date().toISOString().split('T')[0];

  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
           xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
     <!-- Ana Sayfa -->
     <url>
       <loc>${baseUrl}</loc>
       <lastmod>${currentDate}</lastmod>
       <changefreq>daily</changefreq>
       <priority>1.0</priority>
     </url>
     
     <!-- Kategori Sayfaları -->
     <url>
       <loc>${baseUrl}/urunler</loc>
       <lastmod>${currentDate}</lastmod>
       <changefreq>daily</changefreq>
       <priority>0.9</priority>
     </url>
     
     <url>
       <loc>${baseUrl}/urunler/atki</loc>
       <lastmod>${currentDate}</lastmod>
       <changefreq>daily</changefreq>
       <priority>0.9</priority>
     </url>
     
     <url>
       <loc>${baseUrl}/urunler/bere</loc>
       <lastmod>${currentDate}</lastmod>
       <changefreq>weekly</changefreq>
       <priority>0.8</priority>
     </url>
     
     <url>
       <loc>${baseUrl}/urunler/forma</loc>
       <lastmod>${currentDate}</lastmod>
       <changefreq>weekly</changefreq>
       <priority>0.8</priority>
     </url>
     
     <url>
       <loc>${baseUrl}/urunler/bayrak</loc>
       <lastmod>${currentDate}</lastmod>
       <changefreq>weekly</changefreq>
       <priority>0.8</priority>
     </url>
     
     ${products.map((product) => {
       const productUrl = `${baseUrl}/urunler/${product.slug || product.id}`;
       const imageUrl = product.image_url || product.image || '';
       const fullImageUrl = imageUrl.startsWith('http') 
         ? imageUrl 
         : imageUrl.startsWith('/') 
           ? `${baseUrl}${imageUrl}`
           : `${baseUrl}/images/${imageUrl}`;
       
       return `
     <url>
       <loc>${productUrl}</loc>
       <lastmod>${currentDate}</lastmod>
       <changefreq>weekly</changefreq>
       <priority>0.8</priority>
       ${imageUrl ? `
       <image:image>
         <image:loc>${fullImageUrl}</image:loc>
         <image:title>${(product.name || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</image:title>
         <image:caption>${(product.description || product.name || '').substring(0, 200).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</image:caption>
       </image:image>` : ''}
     </url>
   `;
     }).join('')}
     
     <!-- Blog ve İçerik Sayfaları -->
     <url>
       <loc>${baseUrl}/blog</loc>
       <lastmod>${currentDate}</lastmod>
       <changefreq>weekly</changefreq>
       <priority>0.7</priority>
     </url>
     
     <url>
       <loc>${baseUrl}/blog/2024-trend-atki-modelleri</loc>
       <lastmod>${currentDate}</lastmod>
       <changefreq>monthly</changefreq>
       <priority>0.8</priority>
     </url>
     
     <url>
       <loc>${baseUrl}/blog/atki-seciminde-dikkat-edilecekler</loc>
       <lastmod>${currentDate}</lastmod>
       <changefreq>monthly</changefreq>
       <priority>0.8</priority>
     </url>
     
     <!-- Newsletter ve Partnerlik -->
     <url>
       <loc>${baseUrl}/newsletter</loc>
       <lastmod>${currentDate}</lastmod>
       <changefreq>monthly</changefreq>
       <priority>0.6</priority>
     </url>
     
     <url>
       <loc>${baseUrl}/partnerlik</loc>
       <lastmod>${currentDate}</lastmod>
       <changefreq>monthly</changefreq>
       <priority>0.7</priority>
     </url>
     
     <url>
       <loc>${baseUrl}/sss</loc>
       <lastmod>${currentDate}</lastmod>
       <changefreq>monthly</changefreq>
       <priority>0.6</priority>
     </url>
     
     <!-- Kurumsal Sayfalar -->
     <url>
       <loc>${baseUrl}/hakkimizda</loc>
       <lastmod>${currentDate}</lastmod>
       <changefreq>monthly</changefreq>
       <priority>0.7</priority>
     </url>
     
     <url>
       <loc>${baseUrl}/iletisim</loc>
       <lastmod>${currentDate}</lastmod>
       <changefreq>monthly</changefreq>
       <priority>0.6</priority>
     </url>
     
     <!-- Yasal Sayfalar -->
     <url>
       <loc>${baseUrl}/kosullar</loc>
       <lastmod>${currentDate}</lastmod>
       <changefreq>yearly</changefreq>
       <priority>0.3</priority>
     </url>
     
     <url>
       <loc>${baseUrl}/gizlilik</loc>
       <lastmod>${currentDate}</lastmod>
       <changefreq>yearly</changefreq>
       <priority>0.3</priority>
     </url>
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  // Supabase'den tüm ürünleri çek
  let products = [];
  try {
    products = await fetchAllProducts();
  } catch (error) {
    console.error('Error fetching products for sitemap:', error);
    // Hata durumunda boş array kullan
  }

  // Sitemap'i generate et
  const sitemap = generateSiteMap(products);

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
