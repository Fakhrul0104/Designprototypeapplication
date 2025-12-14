type OrderStatus = 'Baru' | 'Selesai';

interface OrderStatusBadgeProps {
  status: OrderStatus;
  onChange?: (newStatus: OrderStatus) => void;
  editable?: boolean;
}

const statusConfig = {
  Baru: {
    bg: 'bg-blue-100',
    text: 'text-blue-700',
    label: 'Baru',
  },
  Selesai: {
    bg: 'bg-green-100',
    text: 'text-green-700',
    label: 'Selesai',
  },
};

export function OrderStatusBadge({ status, onChange, editable = false }: OrderStatusBadgeProps) {
  const config = statusConfig[status];

  if (!editable || !onChange) {
    return (
      <span
        className={`inline-flex px-3 py-1 rounded-full text-sm ${config.bg} ${config.text}`}
      >
        {config.label}
      </span>
    );
  }

  return (
    <select
      value={status}
      onChange={(e) => onChange(e.target.value as OrderStatus)}
      className={`px-3 py-1 rounded-full text-sm border-2 cursor-pointer transition-colors ${config.bg} ${config.text} hover:brightness-95`}
    >
      <option value="Baru">Baru</option>
      <option value="Selesai">Selesai</option>
    </select>
  );
}
