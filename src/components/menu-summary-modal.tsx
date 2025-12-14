import { X } from 'lucide-react';
import { useOrders } from '../contexts/order-context';

interface MenuSummaryModalProps {
  onClose: () => void;
}

export function MenuSummaryModal({ onClose }: MenuSummaryModalProps) {
  const { getMenuSummary, getTotalRevenue } = useOrders();
  const menuSummaryData = getMenuSummary();
  
  const totalOrders = menuSummaryData.reduce(
    (sum, item) => sum + item.totalQuantity,
    0
  );
  const totalRevenue = getTotalRevenue();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-t-2xl flex items-center justify-between">
          <div>
            <h3>Ringkasan Menu Hari Ini</h3>
            <p className="text-sm text-blue-100 mt-1">
              Total {totalOrders} item terjual
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-blue-600 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-xl">
              <p className="text-sm text-gray-600 mb-1">Total Item</p>
              <p className="text-blue-700">{totalOrders} item</p>
            </div>
            <div className="bg-green-50 p-4 rounded-xl">
              <p className="text-sm text-gray-600 mb-1">Total Pendapatan</p>
              <p className="text-green-700">
                Rp {totalRevenue.toLocaleString('id-ID')}
              </p>
            </div>
          </div>

          {/* Menu List */}
          <div className="space-y-3">
            <h4 className="text-orange-800 mb-4">Daftar Menu</h4>
            {menuSummaryData.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-gray-50 p-4 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl shadow-sm border-2 border-orange-200">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      {item.totalQuantity} porsi terjual
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-orange-700">
                    Rp {item.totalRevenue.toLocaleString('id-ID')}
                  </p>
                  <p className="text-sm text-gray-500">
                    @ Rp {(item.totalRevenue / item.totalQuantity).toLocaleString('id-ID')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}