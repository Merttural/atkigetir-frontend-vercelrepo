function generateRobotsTxt() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://atkigetir.com';
  
  return `User-agent: *
Allow: /

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml

# Crawl-delay
Crawl-delay: 1

# Disallow admin pages and private areas
Disallow: /admin/
Disallow: /api/
Disallow: /checkout
Disallow: /payment/
Disallow: /success
Disallow: /basarili
Disallow: /giris
Disallow: /login
Disallow: /hesabim/
Disallow: /account/
Disallow: /register
Disallow: /sepet
Disallow: /odeme

# Allow important pages
Allow: /
Allow: /urunler
Allow: /urunler/atki
Allow: /urunler/bere
Allow: /urunler/forma
Allow: /urunler/bayrak
Allow: /urunler/*
Allow: /hakkimizda
Allow: /iletisim
Allow: /blog/
Allow: /newsletter
Allow: /partnerlik
Allow: /sss
Allow: /gizlilik
Allow: /kosullar

# Special directives for Google
User-agent: Googlebot
Allow: /
Crawl-delay: 1

# Special directives for Bing
User-agent: Bingbot
Allow: /
Crawl-delay: 1
`;
}

function RobotsTxt() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  const robotsTxt = generateRobotsTxt();

  res.setHeader('Content-Type', 'text/plain');
  res.write(robotsTxt);
  res.end();

  return {
    props: {},
  };
}

export default RobotsTxt;
