import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type OrderStatus = 'Baru' | 'Selesai';

export interface MenuItem {
  name: string;
  quantity: number;
  price: number;
  icon: string;
}

export interface Order {
  id: number;
  orderDetails: string;
  items: MenuItem[];
  time: string;
  date: string;
  customerName: string;
  status: OrderStatus;
}

interface OrderContextType {
  orders: Order[];
  updateOrderStatus: (orderId: number, newStatus: OrderStatus) => void;
  getTotalOrders: () => number;
  getTotalRevenue: () => number;
  getMenuSummary: () => MenuSummaryItem[];
}

export interface MenuSummaryItem {
  name: string;
  icon: string;
  totalQuantity: number;
  totalRevenue: number;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

const initialOrders: Order[] = [
  {
    id: 1,
    orderDetails: '2x Bakso Urat, 1x Es Teh',
    items: [
      { name: 'Bakso Urat', quantity: 2, price: 18000, icon: '🍜' },
      { name: 'Es Teh', quantity: 1, price: 5000, icon: '🧊' },
    ],
    time: '14:30',
    date: '13 Des 2025',
    customerName: 'Budi Santoso',
    status: 'Baru',
  },
  {
    id: 2,
    orderDetails: '1x Bakso Spesial, 1x Jeruk Panas',
    items: [
      { name: 'Bakso Spesial', quantity: 1, price: 25000, icon: '🍜' },
      { name: 'Jeruk Panas', quantity: 1, price: 8000, icon: '🍊' },
    ],
    time: '14:25',
    date: '13 Des 2025',
    customerName: 'Siti Aminah',
    status: 'Baru',
  },
  {
    id: 3,
    orderDetails: '3x Bakso Biasa, 2x Es Jeruk',
    items: [
      { name: 'Bakso Biasa', quantity: 3, price: 15000, icon: '🍜' },
      { name: 'Es Jeruk', quantity: 2, price: 7000, icon: '🍹' },
    ],
    time: '14:15',
    date: '13 Des 2025',
    customerName: 'Ahmad Rizki',
    status: 'Selesai',
  },
  {
    id: 4,
    orderDetails: '1x Bakso Mercon, 1x Teh Hangat',
    items: [
      { name: 'Bakso Mercon', quantity: 1, price: 20000, icon: '🍜' },
      { name: 'Teh Hangat', quantity: 1, price: 5000, icon: '☕' },
    ],
    time: '14:10',
    date: '13 Des 2025',
    customerName: 'Dewi Lestari',
    status: 'Baru',
  },
  {
    id: 5,
    orderDetails: '2x Bakso Biasa, 1x Mie Bakso',
    items: [
      { name: 'Bakso Biasa', quantity: 2, price: 15000, icon: '🍜' },
      { name: 'Mie Bakso', quantity: 1, price: 17000, icon: '🍝' },
    ],
    time: '14:05',
    date: '13 Des 2025',
    customerName: 'Eko Prasetyo',
    status: 'Selesai',
  },
  {
    id: 6,
    orderDetails: '1x Bakso Jumbo, 2x Es Teh',
    items: [
      { name: 'Bakso Jumbo', quantity: 1, price: 30000, icon: '🍜' },
      { name: 'Es Teh', quantity: 2, price: 5000, icon: '🧊' },
    ],
    time: '13:55',
    date: '13 Des 2025',
    customerName: 'Rina Wijaya',
    status: 'Selesai',
  },
  {
    id: 7,
    orderDetails: '2x Bakso Urat, 1x Jeruk Dingin',
    items: [
      { name: 'Bakso Urat', quantity: 2, price: 18000, icon: '🍜' },
      { name: 'Jeruk Dingin', quantity: 1, price: 8000, icon: '🍊' },
    ],
    time: '13:50',
    date: '13 Des 2025',
    customerName: 'Fajar Nugroho',
    status: 'Baru',
  },
  {
    id: 8,
    orderDetails: '1x Bakso Spesial, 1x Teh Manis',
    items: [
      { name: 'Bakso Spesial', quantity: 1, price: 25000, icon: '🍜' },
      { name: 'Teh Manis', quantity: 1, price: 5000, icon: '☕' },
    ],
    time: '13:45',
    date: '13 Des 2025',
    customerName: 'Linda Sari',
    status: 'Selesai',
  },
];

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>(() => {
    // Load from localStorage if available
    const saved = localStorage.getItem('bakso-orders');
    return saved ? JSON.parse(saved) : initialOrders;
  });

  // Save to localStorage whenever orders change
  useEffect(() => {
    localStorage.setItem('bakso-orders', JSON.stringify(orders));
  }, [orders]);

  const updateOrderStatus = (orderId: number, newStatus: OrderStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const getTotalOrders = () => {
    return orders.length;
  };

  const getTotalRevenue = () => {
    return orders.reduce((total, order) => {
      const orderTotal = order.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      return total + orderTotal;
    }, 0);
  };

  const getMenuSummary = (): MenuSummaryItem[] => {
    const menuMap = new Map<string, MenuSummaryItem>();

    orders.forEach((order) => {
      order.items.forEach((item) => {
        const existing = menuMap.get(item.name);
        if (existing) {
          existing.totalQuantity += item.quantity;
          existing.totalRevenue += item.price * item.quantity;
        } else {
          menuMap.set(item.name, {
            name: item.name,
            icon: item.icon,
            totalQuantity: item.quantity,
            totalRevenue: item.price * item.quantity,
          });
        }
      });
    });

    return Array.from(menuMap.values()).sort(
      (a, b) => b.totalRevenue - a.totalRevenue
    );
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        updateOrderStatus,
        getTotalOrders,
        getTotalRevenue,
        getMenuSummary,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
}
