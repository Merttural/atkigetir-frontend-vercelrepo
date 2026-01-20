import dynamic from 'next/dynamic';
import SEO from "@/components/SEO";
import { getHomePageStructuredData } from "@/utils/structuredData";

// Lazy load heavy components
const ModernHomePage = dynamic(() => import("@/components/ModernHomePage"), {
  loading: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-[#2563EB] border-t-transparent rounded-full animate-spin" />
    </div>
  ),
  ssr: true
});

export async function getStaticProps() {
  const structuredData = getHomePageStructuredData();
  
  return {
    props: {
      structuredData
    },
    revalidate: 60 // ISR - 60 saniyede bir yenile
  };
}

export default function HomePage({ structuredData }) {
  return (
    <>
      <SEO
        title="Taraftar Atkısı ve Bayrak Üretimi | Atkigetir - Özel Üretim, Toptan Fiyat"
        description="Özel üretim taraftar atkısı ve bayrak. Toptan fiyat, hızlı teslimat, yerli üretim. WhatsApp'tan hızlı teklif alın!"
        keywords="taraftar atkısı, bayrak üretimi, özel üretim atkı, toptan atkı, dokuma atkı, saten atkı, taraftar ürünleri, taraftar atkısı fiyat, özel tasarım atkı, takım atkısı, futbol atkısı, basketbol atkısı, taraftar bayrağı, stadyum bayrağı"
        image="/images/logo.svg"
        url="/"
        type="website"
        structuredData={structuredData}
      />
      <ModernHomePage />
    </>
  );
}
