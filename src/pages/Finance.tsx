import { Filter, Download, MoreVertical, ArrowLeft, ArrowRight } from 'lucide-react';
import StatusBadge from '../components/finance/StatusBadge';
import FinanceCard from '../components/finance/FinanceCard';
import type {DashboardCard} from '../types/DashboardCard';
import greenMoney from '../assets/greenMoney.png'
import blueMoney from '../assets/bluemoney.png'
import greyMoney from '../assets/greyMoney.png'
import { useQuery } from '@tanstack/react-query';
import {useState} from 'react';
import axios from 'axios';
import type { ApiTransactionsResponse } from '../types/finance';
import LoadingScreen  from '../components/LoadingScreen';

// interface
interface TransactionRow {
  id: string;
  fromTo: string;
  amount: string;
  type: string;
  date: string;
  status: string;
}

// filter type
type FilterStatus = 'ALL' | 'SUCCESS' | 'PENDING' | 'FAILED';


const fetchTransactions = async (): Promise<TransactionRow[]> => {
 const envUrl = import.meta.env.VITE_API_BASE_URL;
  
  
  const cleanUrl = envUrl.replace('%', '.');

  const { data } = await axios.get<ApiTransactionsResponse>(`${cleanUrl}/transactions`);
  

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return data.data.map((tx: any) => {
    const dateObj = new Date(tx.date);
    // Formatting to: 12/02/26; 3:33pm
    const formattedDate = dateObj.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
    }) + '; ' + dateObj.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }).toLowerCase();

    return {
      id: tx.id,
      fromTo: tx.customerName,
      amount: `₦${tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
      type: tx.paymentMethod === 'bank_transfer' ? 'Deposit' : 'Withdrawal', 
      date: formattedDate,
      status: tx.status.toUpperCase(),
    };
  });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const exportToCSV = (filename: string, rows: any[]) => {
  if (!rows || !rows.length) return;

  //  headers defined based on  table columns
  const headers = ['Transaction ID', 'From/To', 'Amount', 'Type', 'Date', 'Status'];
  
  // data mapped  to match the header order
  const csvContent = [
    headers.join(','), 
    ...rows.map(row => [
      row.id,
      `"${row.fromTo}"`, // Wrapped in quotes to handle names with commas
      `"${row.amount}"`,
      row.type,
      `"${row.date}"`,
      row.status
    ].join(','))
  ].join('\n');

  //  Created a Blob and trigger download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.body.appendChild(document.createElement('a'));
  const url = URL.createObjectURL(blob);
  
  link.href = url;
  link.setAttribute('download', `${filename}.csv`);
  link.click();
  
  // Clean up
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

const Finance = () => {

   // Dummy Data Pending Api Endpoints Availability
    const metrics: DashboardCard[] = [
       {
        id: '1',
        title: 'Total amount in escrow',
        value: '9,000,000,000',
        trendPercentage: '2.1%',
        trendDirection: 'down',
        iconImage: greenMoney,
        iconColor: 'text-orange-600',
      },
       {
        id: '2',
        title: 'Pending withdrawals',
        value: '23',
        trendPercentage: '2.1%',
        trendDirection: 'down',
        iconImage: greyMoney,
        iconColor: 'text-orange-600',
      },
       {
        id: '3',
        title: 'Total revenue',
        value: '10,000,000,000.00',
        trendPercentage: '2.1%',
        trendDirection: 'up',
        iconImage: blueMoney,
        iconColor: 'text-orange-600',
      },
    ];
    
    const [filter, setFilter] = useState<FilterStatus>('ALL');
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const { data, isLoading, isError } = useQuery({
    queryKey: ['transactions'],
    queryFn: fetchTransactions,
  });

  if (isLoading) return <LoadingScreen />;
  if (isError) return <div>Error fetching financial records.</div>;

  const filteredData = data?.filter((tx) => {
    if (filter === 'ALL') return true;
    return tx.status === filter;
  });

  return (
    <div className="space-y-8 bg-neutral-100">
      {/* Header with Actions */}
      <div className="flex justify-between items-center border-b border-b-neutral-300 bg-[#ffffff] px-2 py-2 md:px-3">
        <h1 className="text-[16px] md:text-2xl font-bold text-slate-900">Finances</h1>
        <div className="flex gap-3">
          {/* Filter Button */}
          <div className="relative">
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`flex items-center gap-2 px-2 py-1.5 md:px-4 md:py-2 border rounded-lg text-sm font-medium transition-colors hover:cursor-pointer ${
                filter !== 'ALL' ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-gray-200 bg-white hover:bg-gray-50'
              }`}
            >
              <Filter size={16} /> 
              <span className='hidden md:block'>
                {filter === 'ALL' ? 'Filter' : `Showing: ${filter}`}
              </span>
            </button>

            {/* Filter Dropdown Menu */}
            {isFilterOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-50 py-1 overflow-hidden">
                {(['ALL', 'SUCCESS', 'PENDING', 'FAILED'] as FilterStatus[]).map((status) => (
                  <button
                    key={status}
                    onClick={() => {
                      setFilter(status);
                      setIsFilterOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                      filter === status ? 'font-bold text-blue-600 bg-blue-50/50' : 'text-slate-600'
                    }`}
                  >
                    {status === 'ALL' ? 'All Transactions' : status}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button 
            onClick={() => exportToCSV('transactions_report', filteredData || [])}
            className="flex items-center gap-2 px-2 py-1.5 md:px-4 md:py-2 border border-gray-200 rounded-lg text-sm font-medium hover:cursor-pointer hover:bg-gray-50 active:bg-gray-100 transition-all"
          >
            <Download size={16} /> 
            <span className='hidden md:block'>Export</span>
          </button>
        </div>
      </div>

      {/*  Summary Cards (3-column grid) */}
      <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-3 md:gap-4 lg:gap-6 mx-2 md:mx-3">
        {/* Re-use your MetricCard component or a simplified version here */}
        {metrics.map((metric) => (
          <FinanceCard key={metric.id} {...metric} />
        ))}
      </div>

      {/* The Table Container */}
      <div className="bg-white border border-gray-100 rounded-xl overflow-scroll lg:overflow-hidden shadow-sm mx-2 md:mx-3">
        <div className="px-3 py-3 md:px-6 md:py-4 border-b border-gray-50">
          <h2 className="text-[12px] md:text-sm font-semibold text-slate-500">Wallet Transaction History</h2>
        </div>
        
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50/50 text-[10px] lg:text-[12px] uppercase tracking-wider text-slate-400 font-medium border-b border-b-neutral-300">
            <tr>
              <th className="p-4 pl-6"><input type="checkbox" className="rounded border-gray-300" /></th>
              <th className="px-1 py-4 lg:p-4 text-[9px] md:text-[11px] ">Transaction ID</th>
              <th className="p-4">From/To</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Type</th>
              <th className="p-4">Date</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
           {filteredData?.length === 0 ? (
              <tr>
                <td colSpan={8} className="p-10 text-center text-slate-400">
                  No {filter.toLowerCase()} transactions found.
                </td>
              </tr>
            ) : (
           filteredData?.map((tx) => (
            <tr key={tx.id} className="text-sm text-slate-600 hover:bg-gray-50/50 transition-colors border-b-neutral-200">
              <td className="p-4 pl-6"><input type="checkbox" className="rounded border-gray-300" /></td>
              <td className="p-4 font-medium text-slate-900 text-[12px] md:text-[15px]">{tx.id}</td>
              <td className="p-4">{tx.fromTo}</td>
              <td className="p-4 font-semibold text-slate-900">{tx.amount}</td>
              <td className="p-4 text-slate-500">{tx.type}</td>
              <td className="p-4 text-slate-500">{tx.date}</td>
              <td className="p-4 text-center">
                <StatusBadge status={tx.status} />
              </td>
              <td className="p-4 text-right">
                <MoreVertical size={16} className="text-slate-400 inline cursor-pointer hover:text-slate-600" />
              </td>
            </tr>
          )))}
          </tbody>
        </table>

        {/*  Pagination Footer */}
        <div className="p-4 flex justify-between items-center border-t border-gray-50">
          <button className="flex items-center gap-1 px-2 py-1 md:px-3 border border-gray-200 rounded-md md:text-sm text-gray-400 hover:cursor-pointer hover:bg-gray-50">
            <ArrowLeft size={16} /> <span className='text-black font-semibold hidden md:block'>Previous</span>
          </button>
          <div className="flex gap-2">
             <button className="w-8 h-8 flex items-center justify-center rounded border border-[#4F39F6] text-[#737373] hover:cursor-pointer text-sm">1</button>
             <button className="w-8 h-8 flex items-center justify-center rounded text-slate-600 text-sm hover:cursor-pointer hover:bg-gray-100">2</button>
          </div>
          <button className="flex items-center gap-1 px-2 py-1 md:px-3  border border-gray-200 rounded-md text-sm text-[#737373] hover:cursor-pointer hover:bg-gray-50">
             <span className='text-black font-semibold hidden md:block'>Next</span> <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Finance
