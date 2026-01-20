import Link from 'next/link';
import Head from 'next/head';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumbs({ items = [] }) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://atkigetir.com';
  
  // BreadcrumbList Schema.org structured data
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Anasayfa",
        "item": baseUrl
      },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 2,
        "name": item.name,
        "item": item.href.startsWith('http') ? item.href : `${baseUrl}${item.href}`
      }))
    ]
  };

  return (
    <>
      {/* Breadcrumb Structured Data */}
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbSchema, null, 0)
          }}
        />
      </Head>
      
      <nav className="mb-6" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-sm">
          <li>
            <Link href="/" className="text-slate-500 hover:text-[#2563EB] transition-colors">
              <Home className="w-4 h-4" />
            </Link>
          </li>
          {items.map((item, index) => (
            <li key={item.href || index} className="flex items-center gap-2">
              <ChevronRight className="w-4 h-4 text-slate-400" />
              {index === items.length - 1 ? (
                <span className="text-[#0F172A] font-medium">{item.name}</span>
              ) : (
                <Link
                  href={item.href}
                  className="text-slate-500 hover:text-[#2563EB] transition-colors"
                >
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
