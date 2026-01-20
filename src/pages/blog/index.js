import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import SEO from "@/components/SEO";
import Breadcrumbs from '@/components/Breadcrumbs';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Clock, Sparkles, FileText, MessageCircle } from 'lucide-react';

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://atkigetir.com';

  useEffect(() => {
    // Blog yazıları listesi
    const blogPosts = [
      {
        id: 1,
        title: "2024'ün En Trend Atkı Modelleri",
        slug: "2024-trend-atki-modelleri",
        excerpt: "2024 yılında moda dünyasında öne çıkan atkı modelleri, renkleri ve tasarımları hakkında detaylı bilgiler.",
        image: "/images/atkıgörsel1.jpg",
        date: "2024-01-15",
        datePublished: "2024-01-15T10:00:00+03:00",
        dateModified: "2024-01-15T10:00:00+03:00",
        category: "Moda",
        readTime: "5 dk",
        featured: true
      },
      {
        id: 2,
        title: "Atkı Seçiminde Dikkat Edilmesi Gerekenler",
        slug: "atki-seciminde-dikkat-edilecekler",
        excerpt: "Doğru atkı seçimi için malzeme, renk, boyut ve stil faktörlerini değerlendirme rehberi.",
        image: "/images/atkıgörsel2.jpg",
        date: "2024-01-10",
        datePublished: "2024-01-10T10:00:00+03:00",
        dateModified: "2024-01-10T10:00:00+03:00",
        category: "Rehber",
        readTime: "4 dk",
        featured: false
      },
      {
        id: 3,
        title: "Kış Aylarında Atkı Nasıl Kullanılır?",
        slug: "kis-aylarinda-atki-kullanimi",
        excerpt: "Soğuk havalarda atkı kullanım teknikleri, bağlama yöntemleri ve stil önerileri.",
        image: "/images/atkıgörsel3.jpg",
        date: "2024-01-05",
        datePublished: "2024-01-05T10:00:00+03:00",
        dateModified: "2024-01-05T10:00:00+03:00",
        category: "Stil",
        readTime: "6 dk",
        featured: true
      },
      {
        id: 4,
        title: "Atkı Bakımı ve Temizliği",
        slug: "atki-bakimi-ve-temizligi",
        excerpt: "Atkılarınızı uzun süre kullanabilmek için bakım ve temizlik önerileri.",
        image: "/images/atkıgörsel4.jpg",
        date: "2024-01-01",
        datePublished: "2024-01-01T10:00:00+03:00",
        dateModified: "2024-01-01T10:00:00+03:00",
        category: "Bakım",
        readTime: "3 dk",
        featured: false
      },
      {
        id: 5,
        title: "Taraftar Atkısı Tasarımında Trendler",
        slug: "taraftar-atkisi-tasarim-trendleri",
        excerpt: "Taraftar atkılarında 2024'ün en popüler tasarım trendleri, renk kombinasyonları ve logo yerleşimleri.",
        image: "/images/atkıgörsel1.jpg",
        date: "2023-12-28",
        datePublished: "2023-12-28T10:00:00+03:00",
        dateModified: "2023-12-28T10:00:00+03:00",
        category: "Tasarım",
        readTime: "5 dk",
        featured: true
      },
      {
        id: 6,
        title: "Kurumsal Atkı Üretimi: İşletmeler İçin Rehber",
        slug: "kurumsal-atki-uretim-rehberi",
        excerpt: "Kurumsal kimliğinizi yansıtan özel atkı üretimi için adım adım rehber ve fiyatlandırma bilgileri.",
        image: "/images/atkıgörsel2.jpg",
        date: "2023-12-25",
        datePublished: "2023-12-25T10:00:00+03:00",
        dateModified: "2023-12-25T10:00:00+03:00",
        category: "Kurumsal",
        readTime: "7 dk",
        featured: false
      },
      {
        id: 7,
        title: "Bere Modelleri ve Seçim Rehberi",
        slug: "bere-modelleri-secim-rehberi",
        excerpt: "Kış aylarında şıklık ve sıcaklık sağlayan bere modelleri, seçim kriterleri ve kombin önerileri.",
        image: "/images/atkıgörsel3.jpg",
        date: "2023-12-20",
        datePublished: "2023-12-20T10:00:00+03:00",
        dateModified: "2023-12-20T10:00:00+03:00",
        category: "Moda",
        readTime: "4 dk",
        featured: false
      },
      {
        id: 8,
        title: "Bayrak Üretimi ve Kullanım Alanları",
        slug: "bayrak-uretim-kullanim-alanlari",
        excerpt: "Türk bayrağı ve özel tasarım bayrakların üretim süreci, kullanım alanları ve bakım önerileri.",
        image: "/images/atkıgörsel4.jpg",
        date: "2023-12-15",
        datePublished: "2023-12-15T10:00:00+03:00",
        dateModified: "2023-12-15T10:00:00+03:00",
        category: "Üretim",
        readTime: "6 dk",
        featured: false
      },
      {
        id: 9,
        title: "Toptan Atkı Siparişi: Avantajlar ve Fiyatlandırma",
        slug: "toplan-atki-siparisi-avantajlar",
        excerpt: "Toptan atkı siparişlerinin avantajları, indirim oranları ve sipariş süreci hakkında detaylı bilgiler.",
        image: "/images/atkıgörsel1.jpg",
        date: "2023-12-10",
        datePublished: "2023-12-10T10:00:00+03:00",
        dateModified: "2023-12-10T10:00:00+03:00",
        category: "Ticari",
        readTime: "5 dk",
        featured: false
      },
      {
        id: 10,
        title: "Özel Tasarım Atkı: Hayalinizdeki Atkıyı Üretin",
        slug: "ozel-tasarim-atki-uretim",
        excerpt: "Kişiye özel atkı tasarım süreci, tasarım önerileri ve özel üretim fiyatlandırması hakkında bilgiler.",
        image: "/images/atkıgörsel2.jpg",
        date: "2023-12-05",
        datePublished: "2023-12-05T10:00:00+03:00",
        dateModified: "2023-12-05T10:00:00+03:00",
        category: "Tasarım",
        readTime: "6 dk",
        featured: true
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
        image="/images/atkıgörsel1.jpg"
        canonical={`${baseUrl}/blog`}
        structuredData={[
          {
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "Atkigetir Blog",
            "description": "Atkı modelleri, stil önerileri ve moda trendleri hakkında uzman içerikler",
            "url": `${baseUrl}/blog`,
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `${baseUrl}/blog`
            },
            "publisher": {
              "@type": "Organization",
              "name": "Atkigetir",
              "logo": {
                "@type": "ImageObject",
                "url": `${baseUrl}/images/logo.svg`,
                "width": 512,
                "height": 512
              }
            }
          },
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            "itemListElement": posts.map((post, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "item": {
                "@type": "BlogPosting",
                "headline": post.title,
                "description": post.excerpt,
                "image": post.image.startsWith('http') ? post.image : `${baseUrl}${post.image}`,
                "datePublished": post.datePublished || `${post.date}T10:00:00+03:00`,
                "dateModified": post.dateModified || post.datePublished || `${post.date}T10:00:00+03:00`,
                "url": `${baseUrl}/blog/${post.slug}`,
                "mainEntityOfPage": {
                  "@type": "WebPage",
                  "@id": `${baseUrl}/blog/${post.slug}`
                },
                "author": {
                  "@type": "Person",
                  "name": "Atkigetir Editör",
                  "url": baseUrl
                },
                "publisher": {
                  "@type": "Organization",
                  "name": "Atkigetir",
                  "logo": {
                    "@type": "ImageObject",
                    "url": `${baseUrl}/images/logo.svg`
                  }
                },
                "articleSection": post.category,
                "inLanguage": "tr-TR"
              }
            }))
          }
        ]}
      />

      <div className="bg-[#F8FAFC] min-h-screen">
        <div className="max-w-[1920px] mx-auto px-6 md:px-8 lg:px-12 py-8 lg:py-12">
          <Breadcrumbs items={[
            { name: 'Anasayfa', href: '/' },
            { name: 'Blog', href: '/blog' }
          ]} />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-center mb-16"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#2563EB] to-[#1e40af] flex items-center justify-center mx-auto mb-4 shadow-lg">
                <ArrowRight className="w-8 h-8 text-white rotate-[-45deg]" />
              </div>
              <h1 className="text-4xl font-bold text-[#0F172A] mb-4 tracking-tighter">Atkı Blog</h1>
              <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
                Atkı modelleri, stil önerileri, bakım rehberleri ve moda trendleri hakkında 
                uzman içeriklerimizi keşfedin.
              </p>
            </motion.div>

            {/* Featured Posts */}
            {featuredPosts.length > 0 && (
              <section className="mb-16">
                <h2 className="text-3xl font-bold text-[#0F172A] mb-8 tracking-tight">Öne Çıkan Yazılar</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  {featuredPosts.map((post, index) => (
                    <motion.article
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -4 }}
                      className="bg-white rounded-[32px] shadow-sm border border-slate-200/50 overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group"
                    >
                      <Link href={`/blog/${post.slug}`} aria-label={`${post.title} yazısını oku`} className="block relative h-56 lg:h-64 overflow-hidden">
                        <Image
                          src={post.image}
                          alt={`${post.title} - ${post.excerpt}`}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                        <div className="absolute top-4 left-4 flex gap-2 z-10">
                          <span className="bg-gradient-to-r from-[#2563EB] to-[#1e40af] text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-md">
                            {post.category}
                          </span>
                          {post.featured && (
                            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-md flex items-center gap-1">
                              <Sparkles className="w-3 h-3" />
                              <span>Yeni</span>
                            </span>
                          )}
                          {post.category === 'Rehber' && (
                            <span className="bg-gradient-to-r from-emerald-400 to-teal-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-md flex items-center gap-1">
                              <FileText className="w-3 h-3" />
                              <span>Rehber</span>
                            </span>
                          )}
                        </div>
                      </Link>
                      <div className="p-6 lg:p-8">
                        <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{post.date}</span>
                          </div>
                          <span>•</span>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{post.readTime} okuma</span>
                          </div>
                        </div>
                        <Link href={`/blog/${post.slug}`}>
                          <h3 className="text-xl font-bold text-[#0F172A] mb-3 line-clamp-2 group-hover:text-[#2563EB] transition-colors tracking-tight">
                            {post.title}
                          </h3>
                        </Link>
                        <p className="text-slate-600 mb-4 line-clamp-3 text-sm leading-relaxed">
                          {post.excerpt}
                        </p>
                        <Link
                          href={`/blog/${post.slug}`}
                          className="inline-flex items-center gap-2 text-[#2563EB] hover:text-[#1e40af] font-medium text-sm group/link"
                        >
                          <span>Devamını Oku</span>
                          <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </motion.article>
                  ))}
                </div>
              </section>
            )}

            {/* Regular Posts */}
            <section>
              <h2 className="text-3xl font-bold text-[#0F172A] mb-8 tracking-tight">Tüm Yazılar</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regularPosts.map((post, index) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.05 }}
                    whileHover={{ y: -4 }}
                    className="bg-white rounded-[32px] shadow-sm border border-slate-200/50 overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group"
                  >
                    <Link href={`/blog/${post.slug}`} aria-label={`${post.title} yazısını oku`} className="block relative h-48 overflow-hidden">
                      <Image
                        src={post.image}
                        alt={`${post.title} - ${post.excerpt}`}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                      <div className="absolute top-3 left-3 flex gap-2 z-10">
                        <span className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-2.5 py-1 rounded-full text-xs font-semibold shadow-md">
                          {post.category}
                        </span>
                        {post.featured && (
                          <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2.5 py-1 rounded-full text-xs font-semibold shadow-md flex items-center gap-1">
                            <Sparkles className="w-3 h-3" />
                            <span>Yeni</span>
                          </span>
                        )}
                        {post.category === 'Rehber' && (
                          <span className="bg-gradient-to-r from-purple-400 to-pink-500 text-white px-2.5 py-1 rounded-full text-xs font-semibold shadow-md flex items-center gap-1">
                            <FileText className="w-3 h-3" />
                            <span>Rehber</span>
                          </span>
                        )}
                      </div>
                    </Link>
                    <div className="p-6">
                      <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{post.date}</span>
                        </div>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                      <Link href={`/blog/${post.slug}`}>
                        <h3 className="font-bold text-[#0F172A] mb-2 line-clamp-2 group-hover:text-[#2563EB] transition-colors text-sm tracking-tight">
                          {post.title}
                        </h3>
                      </Link>
                      <p className="text-slate-600 text-xs mb-3 line-clamp-2 leading-relaxed">
                        {post.excerpt}
                      </p>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-1 text-[#2563EB] hover:text-[#1e40af] text-xs font-medium group/link"
                      >
                        <span>Devamını Oku</span>
                        <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </motion.article>
                ))}
              </div>
            </section>

            {/* CTA Section - Reklam Bandı */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-16 bg-gradient-to-br from-[#2563EB]/10 to-[#1e40af]/10 rounded-[32px] p-10 lg:p-12 text-center border-2 border-[#2563EB]/30"
            >
              <h2 className="text-2xl font-bold text-[#0F172A] mb-4 tracking-tight">
                Siz de Markanıza Özel Atkı Tasarlatmak İster misiniz?
              </h2>
              <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
                Uzman ekibimiz size en uygun tasarımı oluşturmanızda yardımcı olabilir. 
                Özel tasarım ve toptan fiyat teklifi alın!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="https://wa.me/905337498266?text=Merhaba, markam için özel atkı tasarımı hakkında bilgi almak istiyorum."
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-[#22C55E] to-[#16A34A] text-white px-8 py-3.5 rounded-xl hover:from-[#16A34A] hover:to-[#15803d] transition-all shadow-lg hover:shadow-[0_0_25px_rgba(34,197,94,0.4)] font-semibold inline-flex items-center gap-2 group"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Teklif Alın</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </motion.a>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/urunler"
                    className="bg-white text-[#2563EB] px-8 py-3.5 rounded-xl border-2 border-[#2563EB] hover:bg-[#2563EB]/5 transition-all font-semibold inline-flex items-center gap-2 shadow-md hover:shadow-lg"
                  >
                    <span>Ürünleri İncele</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              </div>
            </motion.section>
          </motion.div>
        </div>
      </div>
    </>
  );
}
