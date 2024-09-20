import React from 'react';

const ChatList = ({ chats, selectedChat, setSelectedChat, currentUserID, isLoading }) => {
  if (isLoading) {
    return <p>Loading chats...</p>;
  }

  return (
    <div className="md:col-span-2 bg-white rounded-xl shadow-lg p-6">
      {chats.length === 0 ? (
        <p>No chats available</p>
      ) : (
        <ul>
          {chats.map((chat) => (
            <li
              key={chat.id}
              onClick={() => setSelectedChat(chat)}
              className={`p-4 mb-2 rounded-lg cursor-pointer ${
                chat.id === selectedChat?.id ? 'bg-gray-200' : ''
              }`}
            >
              <p>{chat.name || 'Chat'}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ChatList;
