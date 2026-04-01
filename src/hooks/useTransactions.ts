
import { useQuery } from '@tanstack/react-query';
import api from '../api/axiosInstance';

export const useTransactions = (status?: string) => {
  return useQuery({
    queryKey: ['transactions', status],
    queryFn: async () => {
      const params = status && status !== 'all' ? { status } : {};
      const { data } = await api.get('/transactions', { params });
      return data.data;
    },
  });
};