// components/Chat.tsx

import { useState, FormEvent } from 'react';
import axios from 'axios';

const Chat = () => {
  const [message, setMessage] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post('/api/chat', { message });
      setResponse(res.data.choices?.[0]?.message.content || 'No response');
    } catch (error) {
      console.error('Error fetching response:', error);
      setResponse('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask ChatGPT something..."
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Send'}
        </button>
      </form>
      {response && <p>Response: {response}</p>}
    </div>
  );
};

export default Chat;
