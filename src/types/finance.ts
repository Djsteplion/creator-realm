export interface ApiTransaction {
  id: string;
  date: string;
  customerName: string;
  reference: string;
  amount: number;
  currency: string;
  paymentMethod: string;
  status: 'success' | 'pending' | 'failed';
}

export interface ApiTransactionsResponse {
  success: boolean;
  total: number;
  data: ApiTransaction[];
}