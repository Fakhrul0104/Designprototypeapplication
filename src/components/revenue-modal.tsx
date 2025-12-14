import { X } from 'lucide-react';
import { useOrders } from '../contexts/order-context';

interface RevenueModalProps {
  onClose: () => void;
}

export function RevenueModal({ onClose }: RevenueModalProps) {
  const { getTotalRevenue } = useOrders();
  const todayRevenue = getTotalRevenue();
  
  // Generate monthly data with today's actual revenue
  const monthlyData = [
    { tanggal: '1 Des', pendapatan: 850000 },
    { tanggal: '2 Des', pendapatan: 920000 },
    { tanggal: '3 Des', pendapatan: 1100000 },
    { tanggal: '4 Des', pendapatan: 780000 },
    { tanggal: '5 Des', pendapatan: 950000 },
    { tanggal: '6 Des', pendapatan: 1050000 },
    { tanggal: '7 Des', pendapatan: 1200000 },
    { tanggal: '8 Des', pendapatan: 890000 },
    { tanggal: '9 Des', pendapatan: 1150000 },
    { tanggal: '10 Des', pendapatan: 1080000 },
    { tanggal: '11 Des', pendapatan: 970000 },
    { tanggal: '12 Des', pendapatan: 1300000 },
    { tanggal: '13 Des', pendapatan: todayRevenue },
  ];

  const totalMonthRevenue = monthlyData.reduce(
    (sum, day) => sum + day.pendapatan,
    0
  );
  const averageRevenue = Math.round(totalMonthRevenue / monthlyData.length);
  const highestRevenue = Math.max(...monthlyData.map((d) => d.pendapatan));
  const lowestRevenue = Math.min(...monthlyData.map((d) => d.pendapatan));

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 rounded-t-2xl flex items-center justify-between">
          <div>
            <h3>Statistik Pendapatan</h3>
            <p className="text-sm text-green-100 mt-1">
              Desember 2025
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-green-600 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Today's Revenue */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border-2 border-green-200">
            <p className="text-sm text-gray-600 mb-2">Pendapatan Hari Ini</p>
            <p className="text-green-700 text-3xl">
              Rp {todayRevenue.toLocaleString('id-ID')}
            </p>
            <p className="text-sm text-gray-500 mt-2">13 Desember 2025</p>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-xl">
              <p className="text-sm text-gray-600 mb-1">Total Bulan Ini</p>
              <p className="text-blue-700">
                Rp {(totalMonthRevenue / 1000000).toFixed(1)}jt
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-xl">
              <p className="text-sm text-gray-600 mb-1">Rata-rata</p>
              <p className="text-purple-700">
                Rp {(averageRevenue / 1000).toFixed(0)}rb
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-xl">
              <p className="text-sm text-gray-600 mb-1">Tertinggi</p>
              <p className="text-green-700">
                Rp {(highestRevenue / 1000).toFixed(0)}rb
              </p>
            </div>
            <div className="bg-orange-50 p-4 rounded-xl">
              <p className="text-sm text-gray-600 mb-1">Terendah</p>
              <p className="text-orange-700">
                Rp {(lowestRevenue / 1000).toFixed(0)}rb
              </p>
            </div>
          </div>

          {/* Daily Breakdown */}
          <div>
            <h4 className="text-orange-800 mb-4">Rincian Harian</h4>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {monthlyData.slice().reverse().map((day, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center">
                      {day.tanggal.split(' ')[0]}
                    </div>
                    <p className="text-gray-700">{day.tanggal}</p>
                  </div>
                  <p className="text-green-700">
                    Rp {day.pendapatan.toLocaleString('id-ID')}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}