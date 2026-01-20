import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import SEO from '@/components/SEO';
import Breadcrumbs from '@/components/Breadcrumbs';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorState from '@/components/ErrorState';
import API_ENDPOINTS from "@/config/api";
import { withUserAuth } from "@/components/withAuth";
import { Package, Heart, Settings, ArrowRight, User, Calendar, DollarSign, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

function AccountPage() {
  const [userData, setUserData] = useState(null);
  const [orders, setOrders] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  const router = useRouter();

  // Tarih formatla
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Zaman önce hesapla
  const getTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now - date;
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return "Bugün";
    if (diffInDays === 1) return "Dün";
    if (diffInDays < 7) return `${diffInDays} gün önce`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} hafta önce`;
    return `${Math.floor(diffInDays / 30)} ay önce`;
  };

  // Kullanıcı verilerini getir
  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login?redirect=/account');
        return;
      }

      const response = await fetch(`${API_ENDPOINTS.USERS}/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Profil bilgileri alınamadı');
      }

      const data = await response.json();
      setUserData(data);
    } catch (err) {
      setError(err.message);
    }
  };

  // Siparişleri getir
  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_ENDPOINTS.USERS}/orders`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setOrders(data.orders || []);
      }
    } catch (err) {
      console.error('Siparişler alınamadı:', err);
    }
  };

  // Aktiviteleri getir
  const fetchActivities = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_ENDPOINTS.USERS}/activities`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setActivities(data.activities || []);
      }
    } catch (err) {
      console.error('Aktiviteler alınamadı:', err);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await fetchUserData();
      await fetchOrders();
      await fetchActivities();
      setLoading(false);
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="bg-[#F8FAFC] min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Yükleniyor..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#F8FAFC] min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md mx-auto w-full">
          <ErrorState
            type="generic"
            title="Hesap Bilgileri Yüklenemedi"
            message={error}
            onRetry={() => {
              setError("");
              setLoading(true);
              fetchUserData();
            }}
            showHomeButton={true}
            showBackButton={true}
            showWhatsApp={true}
          />
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="bg-[#F8FAFC] min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto text-center w-full"
        >
          <div className="bg-white rounded-[24px] shadow-sm border border-slate-200 p-8">
            <p className="text-slate-600 mb-6">Giriş yapmanız gerekiyor</p>
            <motion.button
              onClick={() => router.push('/login?redirect=/account')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-[#2563EB] to-[#1e40af] text-white px-6 py-3 rounded-xl font-semibold hover:from-[#1e40af] hover:to-[#1e3a8a] transition-all shadow-md hover:shadow-lg"
            >
              Giriş Yap
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title="Hesabım - Atkigetir"
        description="Hesap bilgileriniz, siparişleriniz ve favorileriniz."
        url="/account"
      />
      <div className="bg-[#F8FAFC] min-h-screen">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#2563EB] to-[#1e40af] text-white py-8">
          <div className="max-w-7xl mx-auto px-4">
            <Breadcrumbs items={[
              { name: 'Anasayfa', href: '/' },
              { name: 'Hesabım', href: '/account' }
            ]} className="text-white/80 [&_a]:text-white/80 [&_a:hover]:text-white" />
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-4 mt-4"
            >
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tighter">{userData.user?.name || 'Kullanıcı'}</h1>
                <p className="text-white/90 text-sm">{userData.user?.email}</p>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {[
              { icon: Package, title: 'Siparişlerim', desc: `${userData.stats?.totalOrders || 0} sipariş`, gradient: 'from-blue-500 to-cyan-500' },
              { icon: Heart, title: 'Favorilerim', desc: `${userData.stats?.favoriteProducts || 0} ürün`, gradient: 'from-pink-500 to-rose-500' },
              { icon: Settings, title: 'Ayarlar', desc: 'Hesap ayarları', gradient: 'from-slate-500 to-slate-600' }
            ].map((action, index) => {
              const IconComponent = action.icon;
              return (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="bg-white p-5 rounded-[24px] shadow-sm border border-slate-200 hover:shadow-md transition-all text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.gradient} flex items-center justify-center flex-shrink-0`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#0F172A]">{action.title}</p>
                      <p className="text-sm text-slate-500">{action.desc}</p>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {[
              { icon: Package, label: 'Toplam Sipariş', value: userData.stats?.totalOrders || 0, gradient: 'from-blue-500 to-cyan-500' },
              { icon: DollarSign, label: 'Toplam Harcama', value: userData.stats?.totalSpent || '₺0', gradient: 'from-emerald-500 to-teal-500' },
              { icon: Clock, label: 'Üyelik Süresi', value: userData.stats?.membershipDuration || '0 Gün', gradient: 'from-purple-500 to-pink-500' },
              { icon: Heart, label: 'Favori Ürün', value: userData.stats?.favoriteProducts || 0, gradient: 'from-rose-500 to-pink-500' }
            ].map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="bg-white p-6 rounded-[24px] shadow-sm border border-slate-200 hover:shadow-md transition-all"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center`}>
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <p className="text-xs font-medium text-slate-600 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-[#0F172A] tracking-tight">{stat.value}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-[24px] shadow-sm border border-slate-200 overflow-hidden">
            <div className="border-b border-slate-200">
              <nav className="flex space-x-8 px-6">
                {[
                  { id: 'overview', label: 'Genel Bakış' },
                  { id: 'orders', label: 'Siparişlerim' },
                  { id: 'favorites', label: 'Favorilerim' }
                ].map((tab) => (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? "border-[#2563EB] text-[#2563EB]"
                        : "border-transparent text-slate-500 hover:text-[#0F172A] hover:border-slate-300"
                    }`}
                  >
                    {tab.label}
                  </motion.button>
                ))}
              </nav>
            </div>

            <div className="p-6">
              {activeTab === "overview" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-lg font-semibold text-[#0F172A] mb-4 tracking-tight">Son Aktiviteler</h3>
                  <div className="space-y-3">
                    {activities.slice(0, 5).map((activity, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
                      >
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#2563EB] to-[#1e40af] flex items-center justify-center flex-shrink-0">
                          <Package className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-[#0F172A]">{activity.title}</p>
                          <p className="text-sm text-slate-500">{getTimeAgo(activity.date)}</p>
                        </div>
                      </motion.div>
                    ))}
                    {activities.length === 0 && (
                      <div className="text-center py-12 bg-slate-50 rounded-xl">
                        <p className="text-slate-500">Henüz aktivite bulunmuyor</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {activeTab === "orders" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-lg font-semibold text-[#0F172A] mb-4 tracking-tight">Siparişlerim</h3>
                  <div className="space-y-3">
                    {orders.map((order, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ y: -2 }}
                        className="border border-slate-200 rounded-xl p-5 hover:shadow-md transition-all"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <p className="font-semibold text-[#0F172A]">Sipariş #{order._id?.slice(-8) || order.orderId}</p>
                            <p className="text-sm text-slate-500 mt-1">{formatDate(order.createdAt || order.date)}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            order.statusColor || 'bg-slate-100 text-slate-700'
                          }`}>
                            {order.status || 'Beklemede'}
                          </span>
                        </div>
                        <div className="flex justify-between items-center pt-3 border-t border-slate-100">
                          <p className="text-slate-600">Toplam: <span className="font-bold text-[#0F172A]">₺{order.totalPrice || order.total}</span></p>
                          <Link
                            href={`/account/orders/${order._id || order.orderId}`}
                            className="text-[#2563EB] hover:text-[#1e40af] text-sm font-medium inline-flex items-center gap-1 transition-colors"
                          >
                            <span>Detayları Gör</span>
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        </div>
                      </motion.div>
                    ))}
                    {orders.length === 0 && (
                      <div className="text-center py-12 bg-slate-50 rounded-xl">
                        <Package className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                        <p className="text-slate-500">Henüz sipariş bulunmuyor</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {activeTab === "favorites" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-lg font-semibold text-[#0F172A] mb-4 tracking-tight">Favorilerim</h3>
                  <div className="text-center py-12 bg-slate-50 rounded-xl">
                    <Heart className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                    <p className="text-slate-500">Favori ürün özelliği yakında eklenecek</p>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default withUserAuth(AccountPage); 