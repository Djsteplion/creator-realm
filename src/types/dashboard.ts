export interface ApiDashboardResponse {
  success: boolean;
  data: {
    page: string;
    generatedAt: string;
    currency: string;
    summaryCards: ApiSummaryCard[];
    revenueChart: {
      title: string;
      period: string;
      series: Array<{ month: string; revenue: number }>;
    };
    transactionStatusBreakdown: Array<{ status: string; count: number }>;
  };
}

interface ApiSummaryCard {
  id: string;
  title: string;
  value: number;
  changePercent: number;
  trend: 'up' | 'down' | 'neutral';
}