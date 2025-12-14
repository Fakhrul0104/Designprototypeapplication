import { X, Printer } from 'lucide-react';

interface MenuItem {
  name: string;
  quantity: number;
  price: number;
  icon: string;
}

interface Order {
  id: number;
  orderDetails: string;
  items: MenuItem[];
  time: string;
  date: string;
  customerName: string;
  status: string;
}

interface OrderDetailModalProps {
  order: Order;
  onClose: () => void;
}

export function OrderDetailModal({ order, onClose }: OrderDetailModalProps) {
  const totalPrice = order.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-t-2xl flex items-center justify-between">
          <div>
            <h3>Detail Pesanan #{order.id}</h3>
            <p className="text-sm text-orange-100 mt-1">
              {order.date} - {order.time}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-orange-600 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Customer Info */}
          <div className="bg-orange-50 p-4 rounded-xl">
            <p className="text-sm text-gray-600 mb-1">Nama Pelanggan</p>
            <p className="text-orange-800">{order.customerName}</p>
          </div>

          {/* Menu Items */}
          <div>
            <h4 className="text-orange-800 mb-4">Daftar Menu</h4>
            <div className="space-y-3">
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-gray-50 p-4 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl shadow-sm border-2 border-orange-200">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-gray-800">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        {item.quantity} x Rp {item.price.toLocaleString('id-ID')}
                      </p>
                    </div>
                  </div>
                  <p className="text-orange-700">
                    Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Total */}
          <div className="border-t-2 border-orange-200 pt-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-600">Subtotal</p>
              <p className="text-gray-700">
                Rp {totalPrice.toLocaleString('id-ID')}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-orange-800">Total</p>
              <p className="text-orange-800">
                Rp {totalPrice.toLocaleString('id-ID')}
              </p>
            </div>
          </div>

          {/* Print Button */}
          <button
            onClick={handlePrint}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
          >
            <Printer className="w-5 h-5" />
            <span>Cetak Struk</span>
          </button>
        </div>
      </div>
    </div>
  );
}