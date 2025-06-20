import { useEffect, useState } from 'react';
import axios from '../api/axios';

type StatResponse = {
  totalConversations: number;
  averageSessionLength: string;
  mostCommonQuestions: { question: string; count: number }[];
  dropOffPoints: { step: string; dropCount: number }[];
};

export function useDashboardStats() {
  const [data, setData] = useState<StatResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get<StatResponse>('/stats')
      .then((res) => setData(res.data))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading };
}
