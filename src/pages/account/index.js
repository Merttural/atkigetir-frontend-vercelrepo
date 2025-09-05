import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import API_ENDPOINTS from "@/config/api";
import { withUserAuth } from "@/components/withAuth";

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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-xl mb-4">⚠️</div>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => router.push('/login?redirect=/account')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Giriş Yap
          </button>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Giriş yapmanız gerekiyor</p>
          <button 
            onClick={() => router.push('/login?redirect=/account')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Giriş Yap
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl">
              👤
            </div>
            <div>
              <h1 className="text-2xl font-bold">{userData.user?.name || 'Kullanıcı'}</h1>
              <p className="text-blue-100">{userData.user?.email}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <button className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">📦</span>
              <div>
                <p className="font-semibold text-gray-900">Siparişlerim</p>
                <p className="text-sm text-gray-500">{userData.stats?.totalOrders || 0} sipariş</p>
              </div>
            </div>
          </button>
          <button className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">❤️</span>
              <div>
                <p className="font-semibold text-gray-900">Favorilerim</p>
                <p className="text-sm text-gray-500">{userData.stats?.favoriteProducts || 0} ürün</p>
              </div>
            </div>
          </button>
          <button className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">⚙️</span>
              <div>
                <p className="font-semibold text-gray-900">Ayarlar</p>
                <p className="text-sm text-gray-500">Hesap ayarları</p>
              </div>
            </div>
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Toplam Sipariş</p>
                <p className="text-2xl font-bold text-gray-900">{userData.stats?.totalOrders || 0}</p>
              </div>
              <span className="text-3xl">📦</span>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Toplam Harcama</p>
                <p className="text-2xl font-bold text-gray-900">{userData.stats?.totalSpent || '₺0'}</p>
              </div>
              <span className="text-3xl">💰</span>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Üyelik Süresi</p>
                <p className="text-2xl font-bold text-gray-900">{userData.stats?.membershipDuration || '0 Gün'}</p>
              </div>
              <span className="text-3xl">⏰</span>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Favori Ürün</p>
                <p className="text-2xl font-bold text-gray-900">{userData.stats?.favoriteProducts || 0}</p>
              </div>
              <span className="text-3xl">❤️</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab("overview")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "overview"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Genel Bakış
              </button>
              <button
                onClick={() => setActiveTab("orders")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "orders"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Siparişlerim
              </button>
              <button
                onClick={() => setActiveTab("favorites")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "favorites"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Favorilerim
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === "overview" && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Son Aktiviteler</h3>
                <div className="space-y-4">
                  {activities.slice(0, 5).map((activity, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <span className="text-lg">📦</span>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{activity.title}</p>
                        <p className="text-sm text-gray-500">{getTimeAgo(activity.date)}</p>
                      </div>
                    </div>
                  ))}
                  {activities.length === 0 && (
                    <p className="text-gray-500 text-center py-8">Henüz aktivite bulunmuyor</p>
                  )}
                </div>
              </div>
            )}

            {activeTab === "orders" && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Siparişlerim</h3>
                <div className="space-y-4">
                  {orders.map((order, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-semibold text-gray-900">Sipariş #{order._id?.slice(-8) || order.orderId}</p>
                          <p className="text-sm text-gray-500">{formatDate(order.createdAt || order.date)}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${order.statusColor || 'bg-gray-100 text-gray-800'}`}>
                          {order.status || 'Beklemede'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-gray-600">Toplam: <span className="font-semibold">₺{order.totalPrice || order.total}</span></p>
                        <Link
                          href={`/account/orders/${order._id || order.orderId}`}
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                          Detayları Gör →
                        </Link>
                      </div>
                    </div>
                  ))}
                  {orders.length === 0 && (
                    <p className="text-gray-500 text-center py-8">Henüz sipariş bulunmuyor</p>
                  )}
                </div>
              </div>
            )}

            {activeTab === "favorites" && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Favorilerim</h3>
                <p className="text-gray-500 text-center py-8">Favori ürün özelliği yakında eklenecek</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default withUserAuth(AccountPage); 