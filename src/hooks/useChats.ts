import { useEffect, useState } from 'react';

type Message = {
  id: string;
  chatId: string;
  senderId: string;
  receiverId: string;
  text: string;
  time: string;
};

type Chat = {
  id: string;
  user1Id: string;
  user2Id: string;
  messages: Message[];
};

export function useChats(userId: string) {
  const [chats, setChats] = useState<Chat[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;

    const fetchChats = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/chats/${userId}`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) {
          
          throw new Error('Failed to fetch chats');
        }
        const data: Chat[] = await response.json();
        setChats(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchChats();
  }, [userId]);

  return { chats, isLoading, error };
}
