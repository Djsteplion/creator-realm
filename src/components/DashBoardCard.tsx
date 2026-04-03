import type { DashboardCard } from '../types/DashboardCard';

const DashBoardCard = ({ 
  title, 
  value, 
  trendPercentage, 
  trendDirection, 
  iconImage, 
}: DashboardCard) => {
  const isPositive = trendDirection === 'up';

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      {/* Top Row: Icon and Trend */}
      <div className="flex justify-between items-start mb-4">
        <div className='w-4 h-4 md:w-7 md:h-7 object-contain'>
          <img 
            src={iconImage} 
            alt={title} 
          />
        </div>
        
        <span className={`text-[8px] md:text-[11px] font-semibold px-2 py-0.5 rounded-full ${
          isPositive ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'
        }`}>
          {isPositive ? '+' : ' '}{trendPercentage} from last month
        </span>
      </div>

      {/* Bottom Row: Value and title */}
      <div>
        <h3 className="text-[13px] md:text-[19px] lg:text-[22px] font-bold text-slate-900 tracking-tight">
          {value}
        </h3>
        <p className="text-[10px] md:text-sm text-[#737373] font-normal mt-0.5">
          {title}
        </p>
      </div>
    </div>
  );
};


export default DashBoardCard;
