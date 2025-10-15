import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import SEO from "@/components/SEO";

export default function BlogPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Blog yazıları listesi
    const blogPosts = [
      {
        id: 1,
        title: "2024'ün En Trend Atkı Modelleri",
        slug: "2024-trend-atki-modelleri",
        excerpt: "2024 yılında moda dünyasında öne çıkan atkı modelleri, renkleri ve tasarımları hakkında detaylı bilgiler.",
        image: "/images/atkiresim.jpg",
        date: "2024-01-15",
        category: "Moda",
        readTime: "5 dk",
        featured: true
      },
      {
        id: 2,
        title: "Atkı Seçiminde Dikkat Edilmesi Gerekenler",
        slug: "atki-seciminde-dikkat-edilecekler",
        excerpt: "Doğru atkı seçimi için malzeme, renk, boyut ve stil faktörlerini değerlendirme rehberi.",
        image: "/images/atkiresimleri.jpg",
        date: "2024-01-10",
        category: "Rehber",
        readTime: "4 dk",
        featured: false
      },
      {
        id: 3,
        title: "Kış Aylarında Atkı Nasıl Kullanılır?",
        slug: "kis-aylarinda-atki-kullanimi",
        excerpt: "Soğuk havalarda atkı kullanım teknikleri, bağlama yöntemleri ve stil önerileri.",
        image: "/images/bereresim.jpg",
        date: "2024-01-05",
        category: "Stil",
        readTime: "6 dk",
        featured: true
      },
      {
        id: 4,
        title: "Atkı Bakımı ve Temizliği",
        slug: "atki-bakimi-ve-temizligi",
        excerpt: "Atkılarınızı uzun süre kullanabilmek için bakım ve temizlik önerileri.",
        image: "/images/placeholder.svg",
        date: "2024-01-01",
        category: "Bakım",
        readTime: "3 dk",
        featured: false
      }
    ];
    
    setPosts(blogPosts);
  }, []);

  const featuredPosts = posts.filter(post => post.featured);
  const regularPosts = posts.filter(post => !post.featured);

  return (
    <>
      <SEO
        title="Atkı Blog - Moda, Stil ve Bakım Rehberi | Atkigetir"
        description="Atkı modelleri, stil önerileri, bakım rehberleri ve moda trendleri hakkında uzman içerikler. 2024'ün en güncel atkı rehberi."
        keywords="atkı blog, atkı modelleri, atkı rehberi, atkı bakımı, atkı kullanımı, kış modası, atkı trendleri"
        url="/blog"
        type="blog"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Blog",
          "name": "Atkigetir Blog",
          "description": "Atkı modelleri, stil önerileri ve moda trendleri hakkında uzman içerikler",
          "url": "https://atkigetir.com/blog",
          "publisher": {
            "@type": "Organization",
            "name": "Atkigetir",
            "logo": {
              "@type": "ImageObject",
              "url": "https://atkigetir.com/images/logo.svg"
            }
          },
          "blogPost": posts.map(post => ({
            "@type": "BlogPosting",
            "headline": post.title,
            "description": post.excerpt,
            "image": post.image,
            "datePublished": post.date,
            "author": {
              "@type": "Person",
              "name": "Atkigetir Editör"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Atkigetir"
            }
          }))
        }}
      />

      <main className="max-w-7xl mx-auto py-10 px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Atkı Blog</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Atkı modelleri, stil önerileri, bakım rehberleri ve moda trendleri hakkında 
            uzman içeriklerimizi keşfedin.
          </p>
        </div>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Öne Çıkan Yazılar</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <article key={post.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="relative h-48">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <span>{post.date}</span>
                      <span className="mx-2">•</span>
                      <span>{post.readTime} okuma</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Devamını Oku
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Regular Posts */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Tüm Yazılar</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularPosts.map((post) => (
              <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-40">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-green-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center text-xs text-gray-500 mb-2">
                    <span>{post.date}</span>
                    <span className="mx-1">•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Devamını Oku →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="mt-16 bg-blue-50 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Hangi Atkı Modelini Seçeceğinizi Bilemiyor musunuz?
          </h2>
          <p className="text-gray-600 mb-6">
            Uzman ekibimiz size en uygun atkı modelini seçmenizde yardımcı olabilir.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/urunler"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Ürünleri İncele
            </Link>
            <Link
              href="/iletisim"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg border border-blue-600 hover:bg-blue-50 transition-colors font-medium"
            >
              Danışmanlık Al
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
