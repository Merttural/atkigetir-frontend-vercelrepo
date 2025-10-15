import React from 'react';
import Link from 'next/link';
import FacebookIcon from '@/components/ikonlar/FacebookIcon';
import InstagramIcon from '@/components/ikonlar/InstagramIcon';
import WhatsappIcon from '@/components/ikonlar/WhatsappIcon';
import TelegramIcon from '@/components/ikonlar/TelegramIcon';
import MailIcon from '@/components/ikonlar/MailIcon';

export default function Footer() {
  return (
    <footer className="w-full bg-white text-gray-800 py-4 px-4 mt-0 border-t border-gray-300">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        
        {/* Marka ve iletişim */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="text-2xl font-extrabold tracking-tight text-gray-900">Atkigetir</div>
          <div className="flex flex-col sm:flex-row items-center gap-2 text-sm text-gray-700">
            <a href="mailto:info@atkigetir.com" className="flex items-center gap-1 hover:underline">
              <MailIcon className="w-5 h-5 text-gray-600" />
              info@atkigetir.com
            </a>
            <a href="https://wa.me/905337498266?text=Merhabalar%20Kerim%20Bey%20Sipariş%20Vermek%20istiyorum." target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline">
              <WhatsappIcon className="w-5 h-5 text-green-600" />
              0533 749 82 66
            </a>
            <a href="tel:+905337498266" className="flex items-center gap-1 hover:underline">
              <span className="text-blue-600">📞</span>
              Ara
            </a>
          </div>
        </div>

        {/* Menü */}
        <div className="flex flex-col md:flex-row gap-4 text-base font-medium text-gray-700">
          <Link href="/" className="hover:underline hover:text-yellow-600 transition-colors">
            Anasayfa
          </Link>
          <Link href="/urunler" className="hover:underline hover:text-yellow-600 transition-colors">
            Ürünler
          </Link>
          <Link href="/blog" className="hover:underline hover:text-yellow-600 transition-colors">
            Blog
          </Link>
          <Link href="/newsletter" className="hover:underline hover:text-yellow-600 transition-colors">
            Newsletter
          </Link>
          <Link href="/partnerlik" className="hover:underline hover:text-yellow-600 transition-colors">
            Partnerlik
          </Link>
          <Link href="/sss" className="hover:underline hover:text-yellow-600 transition-colors">
            SSS
          </Link>
          <Link href="/hakkimizda" className="hover:underline hover:text-yellow-600 transition-colors">
            Hakkımızda
          </Link>
          <Link href="/iletisim" className="hover:underline hover:text-yellow-600 transition-colors">
            İletişim
          </Link>
        </div>

        {/* Yasal Sayfalar */}
        <div className="flex flex-col md:flex-row gap-4 text-sm text-gray-600">
          <Link href="/gizlilik" className="hover:underline hover:text-yellow-600 transition-colors">
            Gizlilik Politikası
          </Link>
          <Link href="/kosullar" className="hover:underline hover:text-yellow-600 transition-colors">
            Kullanım Şartları
          </Link>
        </div>

        {/* Sosyal Medya */}
        <div className="flex items-center gap-5">
          <a href="https://www.facebook.com/atkigetir" target="_blank" rel="noopener noreferrer" aria-label="Facebook - Atkigetir" className="hover:scale-110 transition" title="Atkigetir Facebook Sayfası">
            <FacebookIcon className="w-6 h-6 text-blue-600 hover:text-blue-800" />
          </a>
          <a href="https://www.instagram.com/atkigetir/" target="_blank" rel="noopener noreferrer" aria-label="Instagram - Atkigetir" className="hover:scale-110 transition" title="Atkigetir Instagram Hesabı">
            <InstagramIcon className="w-6 h-6 text-pink-500 hover:text-pink-600" />
          </a>
          <a href="https://t.me/atkigetir" target="_blank" rel="noopener noreferrer" aria-label="Telegram - Atkigetir" className="hover:scale-110 transition" title="Atkigetir Telegram Kanalı">
            <TelegramIcon className="w-6 h-6 text-sky-500 hover:text-sky-600" />
          </a>
          <a href="https://wa.me/905337498266?text=Merhabalar%20Kerim%20Bey%20Sipariş%20Vermek%20istiyorum." target="_blank" rel="noopener noreferrer" aria-label="WhatsApp - Atkigetir" className="hover:scale-110 transition" title="Atkigetir WhatsApp İletişim">
            <WhatsappIcon className="w-6 h-6 text-green-600 hover:text-green-700" />
          </a>
        </div>
      </div>

      {/* Alt yazı */}
      <div className="mt-8 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Atkigetir. Tüm hakları saklıdır.
      </div>
    </footer>
  );
}
