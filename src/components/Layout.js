import Navbar from "@/components/Navbar";
import AnnouncementBar from "@/components/AnnouncementBar";
import { ToastContainer } from "@/components/Toast";
import WhatsappIcon from "@/components/ikonlar/WhatsappIcon";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
let Footer;
try {
  Footer = require("@/components/Footer").default;
} catch (e) {
  Footer = null;
}

export default function Layout({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900 overflow-x-hidden">
      <Navbar />
      <AnnouncementBar />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 pt-0 pb-8">
        {children}
      </main>
      {Footer && <Footer />}
      <ToastContainer />
      
      {/* Floating WhatsApp Button - Only render on client */}
      {mounted && (
        <a
          href="https://wa.me/905337498266?text=Merhabalar%20Kerim%20Bey%20Sipariş%20Vermek%20istiyorum."
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          aria-label="WhatsApp ile iletişime geç"
          title="WhatsApp ile iletişime geç"
        >
          <WhatsappIcon className="w-6 h-6" />
        </a>
      )}
    </div>
  );
} 