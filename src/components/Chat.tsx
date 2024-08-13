import React, { useState } from 'react';

interface Message {
  sender: string;
  content: string;
  timestamp: Date;
}

export default function Chat({ buyerName, farmerName }: { buyerName: string; farmerName: string }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

    const message: Message = {
      sender: 'Buyer', // This could be dynamic depending on the logged-in user
      content: newMessage,
      timestamp: new Date(),
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-4 flex flex-col h-[70vh]">
      <div className="flex-1 overflow-y-auto mb-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.sender === 'Buyer' ? 'justify-end' : 'justify-start'}`}>
            <div className={`p-2 rounded-lg ${msg.sender === 'Buyer' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-900'} max-w-xs`}>
              <p className="text-sm">{msg.content}</p>
              <span className="text-xs text-gray-400">
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none"
        />
        <button
          onClick={handleSendMessage}
          className="bg-green-600 text-white px-4 py-2 rounded-r-lg hover:bg-green-700 transition-colors"
        >
          Send
        </button>
      </div>
    </div>
  );
}
