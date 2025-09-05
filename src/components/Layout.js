import Navbar from "@/components/Navbar";
import AnnouncementBar from "@/components/AnnouncementBar";
import { ToastContainer } from "@/components/Toast";
import { useRouter } from "next/router";
let Footer;
try {
  Footer = require("@/components/Footer").default;
} catch (e) {
  Footer = null;
}

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900 overflow-x-hidden">
      <Navbar />
      <AnnouncementBar />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 pt-0 pb-8">
        {children}
      </main>
      {Footer && <Footer />}
      <ToastContainer />
    </div>
  );
} 