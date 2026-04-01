import DashBoardCard from '../components/DashBoardCard';
import blueUser from '../assets/blueUser.png'
import brownUser from '../assets/brownUser.png'
import redUser from '../assets/redUser.png'
import greenMoney from '../assets/greenMoney.png'
import redMoney from '../assets/redMoney.png'
import greyMoney from '../assets/greyMoney.png'
import brownWarning from '../assets/brownWarning.png'
import blueDocument from '../assets/blueDocument.png'
import brownDocument from '../assets/brownDocument.png'
import type { DashboardCard } from '../types/DashboardCard';
import {useState} from 'react';



const DummyDashboard = () => {
  // Data (from Figma Design) Pending Api Endpoints Availability
 
     const metrics: DashboardCard[] = [
    {
      id: '1',
      title: 'Total users',
      value: '10,900,000',
      trendPercentage: '2.1%',
      trendDirection: 'up',
      iconImage: blueUser,
      iconColor: 'text-blue-600',
    },
    {
      id: '2',
      title: 'Total clients',
      value: '900,000',
      trendPercentage: '2.1%',
      trendDirection: 'up',
      iconImage: brownUser,
      iconColor: 'text-orange-600',
    },
     {
      id: '3',
      title: 'Total Creators',
      value: '10,000,000',
      trendPercentage: '2.1%',
      trendDirection: 'down',
      iconImage: redUser,
      iconColor: 'text-orange-600',
    },
     {
      id: '4',
      title: 'Total Amount Transacted',
      value: '10,000,000,000.00',
      trendPercentage: '2.1%',
      trendDirection: 'up',
      iconImage: greenMoney,
      iconColor: 'text-orange-600',
    },
     {
      id: '5',
      title: 'Total amount paid',
      value: '9,000,000,000',
      trendPercentage: '2.1%',
      trendDirection: 'up',
      iconImage: greyMoney,
      iconColor: 'text-orange-600',
    },
     {
      id: '6',
      title: 'Total amount in escrow',
      value: '1,000,000,000',
      trendPercentage: '2.1%',
      trendDirection: 'down',
      iconImage: redMoney,
      iconColor: 'text-orange-600',
    },
     {
      id: '7',
      title: 'Total amount withdrawn',
      value: '1,000,000,000.00',
      trendPercentage: '2.1%',
      trendDirection: 'down',
      iconImage: redMoney,
      iconColor: 'text-orange-600',
    },
     {
      id: '8',
      title: 'Pending withdrawals',
      value: '900,000',
      trendPercentage: '2.1%',
      trendDirection: 'down',
      iconImage: greenMoney,
      iconColor: 'text-orange-600',
    },
     {
      id: '9',
      title: 'Total pending disputes',
      value: '300,000',
      trendPercentage: '2.1%',
      trendDirection: 'up',
      iconImage: brownWarning,
      iconColor: 'text-orange-600',
    },
     {
      id: '10',
      title: 'Total active contracts',
      value: '1,000,000',
      trendPercentage: '2.1%',
      trendDirection: 'up',
      iconImage: blueDocument,
      iconColor: 'text-orange-600',
    },
     {
      id: '11',
      title: 'Total pending contracts',
      value: '300,000',
      trendPercentage: '2.1%',
      trendDirection: 'up',
      iconImage: brownDocument,
      iconColor: 'text-orange-600',
    },
     {
      id: '12',
      title: 'Total revenue',
      value: '10,000,000,000.00',
      trendPercentage: '2.1%',
      trendDirection: 'up',
      iconImage: greenMoney,
      iconColor: 'text-orange-600',
    },
    
  ];

    const [viewType, setViewType] = useState<'Month' | 'Year'>('Month');

  return (
    <div className="space-y-6 bg-neutral-100 pb-10">
      {/* Header section */}
      <div className="flex justify-between items-center mb-8 bg-[#ffffff] px-3 py-2 border-b border-b-neutral-300">
        <h1 className="text-[16px] md:text-2xl font-bold text-slate-900">Dummy Dashboard(Based on Figma Design Contents)</h1>
        
        {/* FIX: Added value and onChange to make the filter actually work */}
        <select 
          value={viewType}
          onChange={(e) => setViewType(e.target.value as 'Month' | 'Year')}
          className="bg-white border border-gray-200 text-sm rounded-lg px-4 py-2 outline-none hover:cursor-pointer"
        >
          <option value="Month">Month</option>
          <option value="Year">Year</option>
        </select>
      </div>

     
    {/* The 3-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-6 mx-2 md:mx-3">
        {metrics.map((metric) => (
          <DashBoardCard key={metric.id} {...metric} />
        ))}
      </div>
    </div>
  );
};

export default DummyDashboard;