interface StatCardProps {
  title: string;
  value: string;
  icon: string;
  color: 'blue' | 'yellow' | 'green';
  onClick?: () => void;
}

const colorClasses = {
  blue: 'from-blue-500 to-blue-600',
  yellow: 'from-yellow-500 to-amber-500',
  green: 'from-green-500 to-emerald-600',
};

export function StatCard({ title, value, icon, color, onClick }: StatCardProps) {
  return (
    <div 
      onClick={onClick}
      className={`bg-white rounded-xl shadow-md p-6 border-2 border-orange-100 hover:shadow-lg transition-shadow ${onClick ? 'cursor-pointer hover:border-orange-300' : ''}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-600 mb-2">{title}</p>
          <p className="text-orange-800">{value}</p>
        </div>
        <div
          className={`w-12 h-12 bg-gradient-to-br ${colorClasses[color]} rounded-xl flex items-center justify-center shadow-md`}
        >
          <span className="text-2xl">{icon}</span>
        </div>
      </div>
      {onClick && (
        <p className="text-xs text-gray-500 mt-2">Klik untuk detail</p>
      )}
    </div>
  );
}