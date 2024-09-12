// hooks/useAddMessage.ts
import { useState } from 'react';

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
    
    try {
      const response = await fetch(`/api/chats/${chatId}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const data = await response.json();
      return data; // Return the new message
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { addMessage, loading, error };
};
