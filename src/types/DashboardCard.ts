
export type TrendDirection = 'up' | 'down' | 'neutral';

export interface DashboardCard {
  id: string;               // key
  title: string;            // "Total users"
  value: string | number;   //  "10,900,000"
  trendPercentage: string;    // "2.1%"
  trendDirection: TrendDirection; 
  iconImage: string;   
  iconColor: string;
}