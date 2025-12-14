import { useState } from 'react';
import { Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import { OrderStatusBadge } from './order-status-badge';
import { OrderDetailModal } from './order-detail-modal';
import { useOrders } from '../contexts/order-context';

type OrderStatus = 'Baru' | 'Selesai';

interface OrderTableProps {
  activeFilter: string;
  searchQuery: string;
}

export function OrderTable({ activeFilter, searchQuery }: OrderTableProps) {
  const { orders, updateOrderStatus } = useOrders();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const itemsPerPage = 5;

  const handleStatusChange = (orderId: number, newStatus: OrderStatus) => {
    updateOrderStatus(orderId, newStatus);
  };

  // Filter orders
  const filteredOrders = orders.filter((order) => {
    const matchesFilter =
      activeFilter === 'All' || order.status === activeFilter;
    const matchesSearch =
      searchQuery === '' ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.orderDetails.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  // Pagination
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentOrders = filteredOrders.slice(startIndex, endIndex);

  const handleViewDetails = (order: any) => {
    setSelectedOrder(order);
  };

  return (
    <div>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-orange-200">
              <th className="text-left p-4 text-orange-800">No</th>
              <th className="text-left p-4 text-orange-800">Pesanan</th>
              <th className="text-left p-4 text-orange-800">Waktu & Tgl</th>
              <th className="text-left p-4 text-orange-800">Nama Pelanggan</th>
              <th className="text-left p-4 text-orange-800">Status</th>
              <th className="text-left p-4 text-orange-800">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.length > 0 ? (
              currentOrders.map((order, index) => (
                <tr
                  key={order.id}
                  className="border-b border-gray-100 hover:bg-orange-50 transition-colors"
                >
                  <td className="p-4 text-gray-700">
                    {startIndex + index + 1}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-2">
                        {order.items.map((item: any, i: number) => (
                          <span
                            key={i}
                            className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-lg border-2 border-orange-200 shadow-sm"
                          >
                            {item.icon}
                          </span>
                        ))}
                      </div>
                      <span className="text-gray-700">{order.orderDetails}</span>
                    </div>
                  </td>
                  <td className="p-4 text-gray-600">
                    <div>
                      <div>{order.time}</div>
                      <div className="text-sm text-gray-500">{order.date}</div>
                    </div>
                  </td>
                  <td className="p-4 text-gray-700">{order.customerName}</td>
                  <td className="p-4">
                    <OrderStatusBadge
                      status={order.status}
                      onChange={(newStatus) => handleStatusChange(order.id, newStatus)}
                      editable={true}
                    />
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => handleViewDetails(order)}
                      className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Eye className="w-5 h-5" />
                      <span>Lihat Menu</span>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="p-8 text-center text-gray-500">
                  Tidak ada pesanan ditemukan
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Menampilkan {startIndex + 1} - {Math.min(endIndex, filteredOrders.length)} dari {filteredOrders.length} pesanan
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 border-2 border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  currentPage === page
                    ? 'bg-orange-500 text-white'
                    : 'border-2 border-gray-200 hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 border-2 border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Order Detail Modal */}
      {selectedOrder && (
        <OrderDetailModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
}
