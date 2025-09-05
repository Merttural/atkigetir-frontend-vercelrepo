import Link from "next/link";
import Head from "next/head";
import InstagramIcon from '@/components/ikonlar/InstagramIcon';
import WhatsappIcon from '@/components/ikonlar/WhatsappIcon';
import StatsSection from '@/components/StatsSection';
import Hero from '@/components/Hero';
import TrustSection from '@/components/TrustSection';
import AdvantagesSection from '@/components/AdvantagesSection';
import AboutBanner from '@/components/AboutBanner';

export default function HakkimizdaPage() {
  return (
    <>
      <Head>
        <title>Hakkımızda | Atkı Getir</title>
        <meta
          name="description"
          content="25 yıllık tecrübesiyle Atkı Getir, İstanbul merkezli üretim tesislerinde atkı, bere ve forma üretiminde uzmanlaşmıştır. Yerli üretim, kişiye özel çözümler."
        />
      </Head>

      {/* Giriş Görseli */}
      <Hero />

      {/* StatsSection */}
      <StatsSection />

      {/* TrustSection ve AdvantagesSection */}
      <section className="py-0 px-4 max-w-6xl mx-auto w-full">
        <TrustSection />
        <AdvantagesSection />
      </section>

      {/* AboutBanner - Anasayfadakiyle aynı hakkında ve iletişim çağrısı */}
      <div className="py-0">
        <AboutBanner />
      </div>
    </>
  );
} 