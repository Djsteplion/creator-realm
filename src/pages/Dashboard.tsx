/* eslint-disable @typescript-eslint/no-explicit-any */
import DashBoardCard from '../components/DashBoardCard';
//import { Users, UserCheck, Wallet, FileText, AlertCircle } from 'lucide-react';
import blueUser from '../assets/blueUser.png'
//import brownUser from '../assets/brownUser.png'
//import redUser from '../assets/redUser.png'
import greenMoney from '../assets/greenMoney.png'
import redMoney from '../assets/redMoney.png'
import greyMoney from '../assets/greyMoney.png'
import brownWarning from '../assets/brownWarning.png'
//import blueDocument from '../assets/blueDocument.png'
//import brownDocument from '../assets/brownDocument.png'
//import type { DashboardCard } from '../types/DashboardCard';
//import type { ApiDashboardResponse } from '../types/dashboard';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import {useMemo, useState} from 'react';
import type { ApiDashboardResponse } from '../types/dashboard';
import LoadingScreen  from '../components/LoadingScreen';

const iconMap: Record<string, string> = {
  total_revenue: greenMoney,
  total_transactions: blueUser,
  pending_transactions: brownWarning,
  failed_transactions: redMoney,
};

const fetchDashboard = async (): Promise<ApiDashboardResponse> => {
  const envUrl = import.meta.env.VITE_API_BASE_URL;
  
  const cleanUrl = envUrl.replace('%', '.');

  const { data } = await axios.get<ApiDashboardResponse>(`${cleanUrl}/dashboard`);
  return data;
};

const Dashboard = () => {
  // Data (from Figma Design) Pending Api Endpoints Availability
  {/*
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
  */}
 

  const [viewType, setViewType] = useState<'Month' | 'Year'>('Month');

  const { data, isError, isLoading } = useQuery({
    queryKey: ['dashboard-cards'],
    queryFn: fetchDashboard,
  });

  const revenueDisplay = useMemo(() => {
    if (!data?.data?.revenueChart?.series) return "0";

    const series = data.data.revenueChart.series;

    if (viewType === 'Month') {
      // Get the last month in the array (e.g., "Mar")
      const lastMonth = series[series.length - 1];
      return lastMonth.revenue.toLocaleString();
    } else {
      // Sum up all months for the Year total
      const totalYear = series.reduce((sum, item) => sum + item.revenue, 0);
      return totalYear.toLocaleString();
    }
  }, [data, viewType]);

  if (isLoading) return <LoadingScreen />;
  if (isError) return <div>Error loading dashboard data.</div>;

  return (
    <div className="space-y-6 bg-neutral-100 pb-10">
      {/* Header section */}
      <div className="flex justify-between items-center mb-8 bg-[#ffffff] px-3 py-2 border-b border-b-neutral-300">
        <h1 className="text-[16px] md:text-2xl font-bold text-slate-900">Dashboard</h1>
        
        {/* filter */}
        <select 
          value={viewType}
          onChange={(e) => setViewType(e.target.value as 'Month' | 'Year')}
          className="bg-white border border-gray-200 text-sm rounded-lg px-4 py-2 outline-none hover:cursor-pointer"
        >
          <option value="Month">Month</option>
          <option value="Year">Year</option>
        </select>
      </div>

      {/* 3-Column Grid for API Data */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-6 mx-2 md:mx-3">
        {data?.data.summaryCards.map((item: any) => (
          <DashBoardCard 
            key={item.id}
            id={item.id}
            // Logic to change title based on filter
            title={item.id === 'total_revenue' && viewType === 'Year' ? 'Total Revenue (Year)' : item.title}
            //  Used revenueDisplay (the variable from useMemo)
            value={item.id === 'total_revenue' ? `₦${revenueDisplay}` : item.value.toLocaleString()}
            trendPercentage={`${item.changePercent}%`}
            trendDirection={item.trend}
            iconImage={iconMap[item.id] || greyMoney}
            iconColor={item.trend === 'up' ? 'text-green-600' : 'text-red-600'}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
