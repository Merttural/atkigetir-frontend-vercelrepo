import WhatsappIcon from "@/components/ikonlar/WhatsappIcon";
import FacebookIcon from "@/components/ikonlar/FacebookIcon";
import InstagramIcon from "@/components/ikonlar/InstagramIcon";
import TelegramIcon from "@/components/ikonlar/TelegramIcon";
import MailIcon from "@/components/ikonlar/MailIcon";
import PhoneIcon from "@/components/ikonlar/PhoneIcon";

export default function AnnouncementBar() {
  return (

<div className="w-full bg-gradient-to-br from-blue-800 via-purple-900 to-purple-900 text-sm text-white py-3 px-4 shadow-md">
<div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        {/* Sol taraf - iletişim numaraları */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-medium">
          <a href="https://wa.me/905337498266" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline">
            <WhatsappIcon className="w-4 h-4 text-green-600" /> 0533 749 82 66
          </a>
          <a href="https://wa.me/905322514352" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline">
            <WhatsappIcon className="w-4 h-4 text-green-600" /> 0532 251 43 52
          </a>
          <a href="tel:02122253129" className="flex items-center gap-1 hover:underline">
            <PhoneIcon className="w-4 h-4 text-blue-400" /> 0212 225 31 29
          </a>
          <a href="mailto:info@atkigetir.com" className="flex items-center gap-1 hover:underline">
            <MailIcon className="w-4 h-4 text-gray-800" /> info@atkigetir.com
          </a>
        </div>

        {/* Sağ taraf - sosyal medya ikonları */}
        <div className="flex items-center justify-center gap-4">
          <a href="https://www.facebook.com/atkigetir" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:scale-110 transition transform">
            <FacebookIcon className="w-5 h-5 text-blue-700 hover:text-blue-900" />
          </a>
          <a href="https://www.instagram.com/atkigetir/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:scale-110 transition transform">
            <InstagramIcon className="w-5 h-5 text-pink-500 hover:text-pink-600" />
          </a>
          <a href="https://t.me/atkigetir" target="_blank" rel="noopener noreferrer" aria-label="Telegram" className="hover:scale-110 transition transform">
            <TelegramIcon className="w-5 h-5 text-sky-500 hover:text-sky-600" />
          </a>
          <a href="https://wa.me/905337498266" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="hover:scale-110 transition transform">
            <WhatsappIcon className="w-5 h-5 text-green-600 hover:text-green-700" />
          </a>
        </div>
      </div>
    </div>
  );
}
