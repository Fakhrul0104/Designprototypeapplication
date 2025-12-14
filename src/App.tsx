import { useState } from 'react';
import { Search, Clock } from 'lucide-react';
import { StatCard } from './components/stat-card';
import { OrderTable } from './components/order-table';
import { MenuSummaryModal } from './components/menu-summary-modal';
import { RevenueModal } from './components/revenue-modal';
import { useCurrentTime } from './hooks/use-current-time';
import { OrderProvider, useOrders } from './contexts/order-context';

type FilterTab = 'All' | 'Baru' | 'Selesai';

function AppContent() {
  const [activeFilter, setActiveFilter] = useState<FilterTab>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showMenuSummary, setShowMenuSummary] = useState(false);
  const [showRevenue, setShowRevenue] = useState(false);
  const currentTime = useCurrentTime();
  const { getTotalOrders, getTotalRevenue } = useOrders();

  const filterTabs: FilterTab[] = ['All', 'Baru', 'Selesai'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b-2 border-orange-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white text-xl">🍜</span>
            </div>
            <div>
              <h1 className="text-orange-800">Pondok Bakso Mas Tris</h1>
              <p className="text-sm text-orange-600">Dashboard Pesanan</p>
            </div>
          </div>

          {/* Time Indicator */}
          <div className="flex items-center gap-2 bg-orange-50 px-4 py-2 rounded-lg">
            <Clock className="w-5 h-5 text-orange-600" />
            <div className="text-orange-800">
              <div className="text-sm">{currentTime.date}</div>
              <div>{currentTime.time}</div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <StatCard
            title="Total Pesanan Hari Ini"
            value={getTotalOrders().toString()}
            icon="📦"
            color="blue"
            onClick={() => setShowMenuSummary(true)}
          />
          <StatCard
            title="Pendapatan Hari Ini"
            value={`Rp ${getTotalRevenue().toLocaleString('id-ID')}`}
            icon="💰"
            color="green"
            onClick={() => setShowRevenue(true)}
          />
        </div>

        {/* Order History Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-orange-100">
          <h2 className="text-orange-800 mb-6">Riwayat Pesanan Masuk</h2>

          {/* Search & Filter */}
          <div className="mb-6 space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Cari pesanan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-400 focus:outline-none transition-colors"
              />
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2 flex-wrap">
              {filterTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveFilter(tab)}
                  className={`px-6 py-2 rounded-lg transition-all ${
                    activeFilter === tab
                      ? 'bg-orange-500 text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Order Table */}
          <OrderTable activeFilter={activeFilter} searchQuery={searchQuery} />
        </div>
      </main>

      {/* Modals */}
      {showMenuSummary && (
        <MenuSummaryModal onClose={() => setShowMenuSummary(false)} />
      )}
      {showRevenue && (
        <RevenueModal onClose={() => setShowRevenue(false)} />
      )}
    </div>
  );
}

export default function App() {
  return (
    <OrderProvider>
      <AppContent />
    </OrderProvider>
  );
}