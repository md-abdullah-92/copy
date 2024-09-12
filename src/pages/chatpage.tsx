import React, { useState } from 'react';
import {
  FaPaperPlane,
  FaSmile,
  FaEllipsisV,
  FaUserCircle,
  FaSearch,
  FaBell,
  FaPlusCircle,
} from 'react-icons/fa';
import { format } from 'date-fns';
import Layout from '@/components/Layout/Layout';

// The provided user dataset
const users = [
  {
    id: '66c55f0cd58433106246ce86',
    name: 'Badhon',
    avatar: 'https://firebasestorage.googleapis.com/v0/b/imageuploadingagribazaar.appspot.com/o/images%2F20220829_102019%20(2).jpg?alt=media&token=6adf0761-4bda-4663-ab55-7dc3ddb73349',
    type: 'buyer',
    chatIds: ['66e1baefa87a1e665adee9a0'],
  },
  {
    id: '66cf022b70ee14256d3c68a8',
    name: 'MD IQBAL SAZID',
    avatar: 'https://firebasestorage.googleapis.com/v0/b/imageuploadingagribazaar.appspot.com/o/images%2FScreenshot%202024-07-01%20234745.png?alt=media&token=c3b58b27-2e8e-493d-9582-a8fcea0b0385',
    type: 'farmer',
    chatIds: ['66e1baefa87a1e665adee9a0', '66e25b357652f621ffea4b67'],
  },
  {
    id: '66d2a60e9c63fd015abd80d7',
    name: 'Md Khalid Azad',
    avatar: 'https://firebasestorage.googleapis.com/v0/b/imageuploadingagribazaar.appspot.com/o/images%2Fkhalid.jpg?alt=media&token=c7f3903e-8905-4ac5-ac6d-fe4d1e7c8be6',
    type: 'farmer',
    chatIds: [],
  },
  {
    id: '66e1a5123e6d9a5a241565be',
    name: 'Sk Sazid',
    avatar: 'https://firebasestorage.googleapis.com/v0/b/imageuploadingagribazaar.appspot.com/o/images%2F1701588913536.jpeg?alt=media&token=8d5340d9-f795-46e6-bdf5-b2fe7a2d55dd',
    type: 'buyer',
    chatIds: ['66e25b357652f621ffea4b67'],
  },
];

// The chat dataset
const chats = [
  {
    id: '66e1baefa87a1e665adee9a0',
    user1Id: '66c55f0cd58433106246ce86',
    user2Id: '66cf022b70ee14256d3c68a8',
    messages: [],
  },
  {
    id: '66e25b357652f621ffea4b67',
    user1Id: '66cf022b70ee14256d3c68a8',
    user2Id: '66e1a5123e6d9a5a241565be',
    messages: [
      {
        id: '66e261578ee9c30e60e2cd62',
        chatId: '66e25b357652f621ffea4b67',
        senderId: '66cf022b70ee14256d3c68a8',
        receiverId: '66e1a5123e6d9a5a241565be',
        text: 'I’m interested in purchasing organic apples.',
        time: '2024-09-12T09:41:28.601Z', // ISO string format
      },
      {
        id: '66e262e8d37a1f6751eed86a',
        chatId: '66e25b357652f621ffea4b67',
        senderId: '66cf022b70ee14256d3c68a8',
        receiverId: '66e1a5123e6d9a5a241565be',
        text: 'Could you provide more details?',
        time: '2024-09-12T09:45:28.601Z',
      },
    ],
  },
];


// Assume the current user ID is '66cf022b70ee14256d3c68a8'
const currentUserID = '66cf022b70ee14256d3c68a8';

// Helper function to get user details by ID
const getUserById = (userId) => users.find((user) => user.id === userId);

export default function ChatPage() {
  const [selectedChat, setSelectedChat] = useState(chats[0]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      const newMsg = {
        id: `${selectedChat.messages.length + 1}`,
        chatId: selectedChat.id,
        senderId: currentUserID, // Current user ID for the sender
        receiverId: selectedChat.user1Id === currentUserID ? selectedChat.user2Id : selectedChat.user1Id,
        text: newMessage.trim(),
        time: new Date().toISOString(),
      };
      const updatedChat = {
        ...selectedChat,
        messages: [...selectedChat.messages, newMsg],
      };
      setSelectedChat(updatedChat);
      setNewMessage('');
    }
  };

  const handleInputChange = (event) => setNewMessage(event.target.value);

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') handleSendMessage();
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100 py-8 pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {/* Chat List Sidebar */}
            <div className="md:col-span-2 bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Chats</h2>
                <FaPlusCircle className="text-green-600 text-2xl cursor-pointer" />
              </div>
              {/* Search Bar */}
              <div className="flex items-center mb-6">
                <FaSearch className="text-gray-500 mr-2" />
                <input
                  type="text"
                  placeholder="Search users..."
                  className="flex-grow px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-600"
                />
              </div>
              {/* Chat List */}
              <div className="space-y-4">
                {chats.map((chat) => {
                  const chatPartnerId = chat.user1Id === currentUserID ? chat.user2Id : chat.user1Id;
                  const chatPartner = getUserById(chatPartnerId);
                  if (!chatPartner) return null;
                  return (
                    <div
                      key={chat.id}
                      onClick={() => setSelectedChat(chat)}
                      className={`flex items-center p-4 rounded-lg cursor-pointer ${
                        selectedChat.id === chat.id
                          ? 'bg-green-100'
                          : 'bg-gray-50'
                      } hover:bg-green-50 transition-colors duration-300`}
                    >
                      <img
                        src={chatPartner.avatar}
                        alt={chatPartner.name}
                        className="w-12 h-12 rounded-full mr-4"
                      />
                      <div className="flex-grow">
                        <h3 className="text-lg font-semibold text-gray-800">
                          {chatPartner.name}
                        </h3>
                        <p className="text-sm text-gray-600 truncate">
                          {chat.messages.length > 0
                            ? chat.messages[chat.messages.length - 1].text
                            : 'No messages yet'}
                        </p>
                      </div>
                      <span className="text-xs text-gray-500">
                        {chat.messages.length > 0
                          ? format(
                              new Date(chat.messages[chat.messages.length - 1].time),
                              'hh:mm a'
                            )
                          : 'N/A'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Chat History */}
            <div className="md:col-span-3 bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  Chat with {getUserById(selectedChat.user1Id === currentUserID ? selectedChat.user2Id : selectedChat.user1Id)?.name ?? 'Unknown'}
                </h2>
                <FaEllipsisV className="text-gray-600 text-xl cursor-pointer" />
              </div>

              {/* Chat History Messages */}
              <div className="flex-grow mb-6 space-y-4 h-80 overflow-y-scroll scrollbar-thin scrollbar-thumb-green-600 scrollbar-track-gray-200">
                {selectedChat.messages.map((message) => {
                  const isSender = message.senderId === currentUserID;
                  const user = getUserById(message.senderId);
                  return (
                    <div
                      key={message.id}
                      className={`flex items-center ${
                        isSender ? 'justify-end' : 'justify-start'
                      } space-x-2`}
                    >
                      {!isSender && (
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-8 h-8 rounded-full mr-2"
                        />
                      )}
                      <div
                        className={`relative p-4 max-w-xs rounded-2xl shadow ${
                          isSender ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        <p className="text-sm font-medium">{message.text}</p>
                        <span className="absolute bottom-1 right-2 text-xs text-gray-400">
                          {format(new Date(message.time), 'hh:mm a')}
                        </span>
                      </div>
                      {isSender && (
                        <img
                          src={getUserById(currentUserID)?.avatar}
                          alt="You"
                          className="w-8 h-8 rounded-full ml-2"
                        />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Chat Input */}
              <div className="flex items-center mt-4">
                <FaSmile className="text-gray-400 text-2xl mr-2 cursor-pointer" />
                <input
                  type="text"
                  value={newMessage}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-grow px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-600"
                />
                <FaPaperPlane
                  onClick={handleSendMessage}
                  className="text-green-600 text-2xl cursor-pointer ml-2"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
