import arrow from '../../assets/arrow-left (1).png'
import type { DashboardCard } from '../../types/DashboardCard';

const FinanceCard = ({ 
  title, 
  value,
  iconImage, 
}: DashboardCard) => {

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:cursor-pointer hover:shadow-md transition-shadow">
      {/* Top Row: Icon and arrow*/}
      <div className="flex justify-between items-start mb-4">
        <div className='w-7 h-7 object-contain'>
          <img 
            src={iconImage} 
            alt={title} 
          />
        </div>
        <div>
            <img 
                src={arrow} 
                alt={title} 
                className='h-5 w-5'
            />
        </div>
      </div>

      {/* Bottom Row: Value and title */}
      <div>
        <h3 className="text-[13px] md:text-[19px]  lg:text-[22px] font-bold text-slate-900 tracking-tight">
          {value}
        </h3>
        <p className="text-[10px] md:text-sm text-slate-500 font-normal mt-0.5">
          {title}
        </p>
      </div>
    </div>
  );
};


export default FinanceCard;