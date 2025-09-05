import { useRouter } from "next/router";

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
      <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="bg-white rounded-xl shadow p-8 text-center">
          <h1 className="text-2xl font-bold text-gray-700">Sipariş bulunamadı</h1>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 flex flex-col items-center">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow p-8">
        <h1 className="text-2xl font-bold mb-4 text-blue-700">Sipariş No: #{order.orderId}</h1>
        <div className="flex flex-col md:flex-row md:justify-between gap-2 mb-4">
          <span className="text-gray-600">Tarih: {order.date}</span>
          <span className="text-gray-600">Durum: <span className="font-semibold text-green-600">{order.status}</span></span>
        </div>
        <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
          <span className="block text-gray-700 font-medium mb-1">Teslimat Adresi:</span>
          <span className="text-gray-800">{order.address}</span>
        </div>
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Ürünler</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border rounded-lg">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-3 font-medium">Ürün</th>
                  <th className="py-2 px-3 font-medium">Adet</th>
                  <th className="py-2 px-3 font-medium">Birim Fiyat</th>
                  <th className="py-2 px-3 font-medium">Toplam</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item, idx) => (
                  <tr key={idx} className="border-t">
                    <td className="py-2 px-3">{item.name}</td>
                    <td className="py-2 px-3">{item.quantity}</td>
                    <td className="py-2 px-3">₺{item.price}</td>
                    <td className="py-2 px-3">₺{item.price * item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex justify-end items-center mt-4">
          <span className="text-lg font-bold text-blue-700">Toplam: {order.total}</span>
        </div>
      </div>
    </main>
  );
} 