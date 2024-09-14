import { useState } from 'react';
import axios from 'axios';

// Custom hook for creating or retrieving a chat
export function useChat() {
  // State for managing the chat data and any errors
  const [chat, setChat] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Function to call the API and create or get a chat
  const createOrGetChat = async (user1Id: string, user2Id: string) => {
    setLoading(true);
    setError(null); // Reset error before making a new request

    try {
      const response = await axios.post('/api/chats/chats', { user1Id, user2Id });
      setChat(response.data); // Set the chat data in the state
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error occurred while fetching the chat');
    } finally {
      setLoading(false);
    }
  };

  return { chat, loading, error, createOrGetChat };
}
