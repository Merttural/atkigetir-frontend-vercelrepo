import { useRouter } from "next/router";
import SEO from '@/components/SEO';
import Breadcrumbs from '@/components/Breadcrumbs';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Package, Calendar, MapPin, CheckCircle2, Clock, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const orders = [
  {
    orderId: "1234",
    date: "11 Temmuz 2025",
    total: "₺397",
    status: "Kargoya Verildi",
    address: "İstanbul, Türkiye",
    items: [
      { name: "Şal Atkı 17x140", quantity: 2, price: 149 },
      { name: "Triko Bere Kırmızı", quantity: 1, price: 99 }
    ]
  },
  {
    orderId: "1235",
    date: "9 Temmuz 2025",
    total: "₺248",
    status: "Hazırlanıyor",
    address: "İstanbul, Türkiye",
    items: [
      { name: "Forma", quantity: 1, price: 149 },
      { name: "Bayrak", quantity: 1, price: 99 }
    ]
  }
];

export default function OrderDetailPage() {
  const router = useRouter();
  const { orderId } = router.query;

  const order = orders.find((o) => o.orderId === orderId);

  if (!order) {
    return (
      <>
        <SEO
          title="Sipariş Bulunamadı - Atkigetir"
          description="Sipariş bulunamadı."
          url={`/account/orders/${orderId}`}
        />
        <div className="bg-[#F8FAFC] min-h-screen flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto text-center w-full"
          >
            <div className="bg-white rounded-[24px] shadow-sm border border-slate-200 p-8">
              <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 text-slate-400" />
              </div>
              <h1 className="text-2xl font-bold text-[#0F172A] mb-4 tracking-tighter">Sipariş Bulunamadı</h1>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/account"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-[#2563EB] to-[#1e40af] text-white px-6 py-3 rounded-xl font-semibold hover:from-[#1e40af] hover:to-[#1e3a8a] transition-all shadow-md hover:shadow-lg"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Hesabıma Dön</span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </>
    );
  }

  const getStatusColor = (status) => {
    if (status.includes('Kargoya')) return 'from-emerald-500 to-green-500';
    if (status.includes('Hazırlanıyor')) return 'from-blue-500 to-cyan-500';
    return 'from-slate-500 to-slate-600';
  };

  const getStatusIcon = (status) => {
    if (status.includes('Kargoya')) return CheckCircle2;
    if (status.includes('Hazırlanıyor')) return Clock;
    return Package;
  };

  const StatusIcon = getStatusIcon(order.status);

  return (
    <>
      <SEO
        title={`Sipariş #${order.orderId} - Atkigetir`}
        description={`Sipariş detayları: ${order.orderId}`}
        url={`/account/orders/${order.orderId}`}
      />
      <div className="bg-[#F8FAFC] min-h-screen py-6">
        <div className="max-w-4xl mx-auto px-4">
          <Breadcrumbs items={[
            { name: 'Anasayfa', href: '/' },
            { name: 'Hesabım', href: '/account' },
            { name: `Sipariş #${order.orderId}`, href: `/account/orders/${order.orderId}` }
          ]} />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-6"
          >
            <div className="bg-white rounded-[24px] shadow-sm border border-slate-200 p-8">
              {/* Header */}
              <div className="flex items-center justify-between mb-6 pb-6 border-b border-slate-200">
                <div>
                  <h1 className="text-2xl font-bold text-[#0F172A] mb-2 tracking-tighter">
                    Sipariş No: #{order.orderId}
                  </h1>
                  <div className="flex items-center gap-4 text-sm text-slate-500">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{order.date}</span>
                    </div>
                  </div>
                </div>
                <div className={`px-4 py-2 rounded-xl bg-gradient-to-r ${getStatusColor(order.status)} text-white flex items-center gap-2`}>
                  <StatusIcon className="w-5 h-5" />
                  <span className="font-semibold">{order.status}</span>
                </div>
              </div>

              {/* Address */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-6 p-5 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border border-slate-200"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#2563EB] to-[#1e40af] flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <span className="block text-[#0F172A] font-semibold mb-1">Teslimat Adresi</span>
                    <span className="text-slate-600">{order.address}</span>
                  </div>
                </div>
              </motion.div>

              {/* Products */}
              <div className="mb-6">
                <h2 className="text-xl font-bold text-[#0F172A] mb-4 tracking-tight flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  <span>Ürünler</span>
                </h2>
                <div className="space-y-3">
                  {order.items.map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + idx * 0.05 }}
                      className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200"
                    >
                      <div className="flex-1">
                        <span className="font-semibold text-[#0F172A]">{item.name}</span>
                        <div className="text-sm text-slate-500 mt-1">
                          {item.quantity} adet × ₺{item.price}
                        </div>
                      </div>
                      <span className="font-bold text-[#0F172A]">₺{item.price * item.quantity}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Total */}
              <div className="flex justify-end items-center pt-6 border-t border-slate-200">
                <div className="text-right">
                  <span className="text-sm text-slate-500 block mb-1">Toplam Tutar</span>
                  <span className="text-3xl font-bold bg-gradient-to-r from-[#2563EB] to-[#1e40af] bg-clip-text text-transparent">
                    {order.total}
                  </span>
                </div>
              </div>

              {/* Back Button */}
              <div className="mt-8 pt-6 border-t border-slate-200">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    href="/account"
                    className="inline-flex items-center gap-2 text-[#2563EB] hover:text-[#1e40af] font-medium transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Hesabıma Dön</span>
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
} 