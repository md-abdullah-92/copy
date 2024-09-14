import React from 'react';
import { format } from 'date-fns';

const ChatMessages = ({ selectedChat, currentUserID, lastMessageRef, getUserById }) => {
  const formatTime = (time: string) => format(new Date(time), 'hh:mm a');

  return (
    <div className="space-y-4 overflow-auto h-96">
      {selectedChat.messages.map((message, index) => {
        const isCurrentUserSender = message.senderId === currentUserID;
        const sender = getUserById(message.senderId);
        const isLastMessage = index === selectedChat.messages.length - 1;

        return (
          <div
            key={index}
            className={`flex ${isCurrentUserSender ? 'justify-end' : 'justify-start'}`}
            ref={isLastMessage ? lastMessageRef : null}
          >
            {!isCurrentUserSender && sender && (
              <img src={sender.avatar} alt={sender.name} className="w-10 h-10 rounded-full mr-2" />
            )}
            <div
              className={`relative max-w-xs px-4 py-2 rounded-lg shadow ${
                isCurrentUserSender ? 'bg-green-400 text-black' : 'bg-gray-100 text-gray-900'
              }`}
            >
              {message.imageUrl && (
                <img src={message.imageUrl} alt="Sent" className="mb-2 max-h-60 rounded" />
              )}
              <p>{message.text}</p>
              <span className="text-xs text-gray-500 mt-1 block text-right">
                {formatTime(message.time)}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ChatMessages;
