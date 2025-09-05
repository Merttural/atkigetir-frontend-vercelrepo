// src/components/Dashboard.js

export default function Dashboard() {
    return (
      <div className="space-y-6">
        {/* Hoş Geldiniz Alanı */}
        <div className="bg-red-600 text-white p-6 rounded-lg shadow">
          <h1 className="text-2xl font-bold mb-2">Hoş Geldiniz! 👋</h1>
          <p className="text-sm">
            Atkigetir yönetim paneline hoş geldiniz. Bugünkü satış verilerinizi ve en popüler ürünlerinizi görüntüleyin.
          </p>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-red-500 p-4 rounded shadow text-center">
              <p className="text-sm">Bugünkü Satış</p>
              <p className="text-xl font-bold">₺12,450</p>
            </div>
            <div className="bg-red-500 p-4 rounded shadow text-center">
              <p className="text-sm">Toplam Sipariş</p>
              <p className="text-xl font-bold">47</p>
            </div>
            <div className="bg-red-500 p-4 rounded shadow text-center">
              <p className="text-sm">Aktif Ürün</p>
              <p className="text-xl font-bold">156</p>
            </div>
          </div>
        </div>
  
        {/* Diğer Alanlar Buraya Eklenecek */}
      </div>
    );
  }
  