// hooks/useAddMessage.ts
import { useState } from 'react';
import axios from 'axios';

interface Message {
  chatId: string;
  senderId: string;
  receiverId: string;
  text: string;
}

export const useAddMessage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addMessage = async (chatId: string, message: Message) => {
    setLoading(true);
    setError(null);
    console.log('chatId', chatId);
    console.log('message', message);

    try {
    
      const response = await axios.post(`/api/chats/${chatId}`, message, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = response.data;
      return data; // Return the new message
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { addMessage, loading, error };
};
