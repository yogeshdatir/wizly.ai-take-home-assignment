import { useEffect, useState } from 'react';
import axios from '../api/axios';

type Message = {
  id: string;
  sender: 'user' | 'bot';
  content: string;
};

export function useChatHistory() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get<Message[]>('/conversations/history')
      .then((res) => setMessages(res.data))
      .catch(() => setMessages([]))
      .finally(() => setLoading(false));
  }, []);

  return { messages, loading };
}
