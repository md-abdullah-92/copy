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
import Layout from '@/components/Layout/Layout';

export default function ChatPage() {
  // Sample data for farmers and chat history
  const [farmers] = useState([
    {
      id: 1,
      name: 'Farmer John',
      avatar: '/path/to/farmer1-avatar.jpg', // Placeholder avatar image
      lastMessage: 'I have fresh carrots available.',
      lastActive: 'Yesterday',
      chatHistory: [
        {
          id: 1,
          sender: 'farmer',
          text: 'Hello! How can I help you today?',
          time: '10:00 AM',
        },
        {
          id: 2,
          sender: 'buyer',
          text: 'I’m interested in purchasing organic apples.',
          time: '10:05 AM',
        },
        {
          id: 3,
          sender: 'farmer',
          text: 'I have fresh apples available right now.',
          time: '10:06 AM',
        },
      ],
    },
    {
      id: 2,
      name: 'Farmer Jane',
      avatar: '/path/to/farmer2-avatar.jpg', // Placeholder avatar image
      lastMessage: 'Organic tomatoes are on sale!',
      lastActive: '2 days ago',
      chatHistory: [
        {
          id: 1,
          sender: 'farmer',
          receiber: 'buyer',
          text: 'Hi there! Are you looking for tomatoes?',
          time: '2:00 PM',
        },
        {
          id: 2,
          sender: 'buyer',
          receiber: 'farmer',
          text: 'Yes, I need 50kg of organic tomatoes.',
          time: '2:10 PM',
        },
      ],
    },
  ]);

  const [selectedFarmer, setSelectedFarmer] = useState(farmers[0]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      const newMsg = {
        id: selectedFarmer.chatHistory.length + 1,
        sender: 'buyer',
        text: newMessage.trim(),
        time: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };
      const updatedFarmer = {
        ...selectedFarmer,
        chatHistory: [...selectedFarmer.chatHistory, newMsg],
      };
      setSelectedFarmer(updatedFarmer);
      setNewMessage('');
    }
  };

  const handleInputChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-sky-200 py-8 pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {/* Chat List Sidebar */}
            <div className="md:col-span-2 bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Farmers</h2>
                <FaPlusCircle className="text-green-600 text-2xl cursor-pointer" />
              </div>
              <div className="flex items-center mb-6">
                <FaSearch className="text-gray-500 mr-2" />
                <input
                  type="text"
                  placeholder="Search farmers..."
                  className="flex-grow px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-600"
                />
              </div>
              <div className="space-y-4">
                {farmers.map((farmer) => (
                  <div
                    key={farmer.id}
                    onClick={() => setSelectedFarmer(farmer)}
                    className={`flex items-center p-4 rounded-lg cursor-pointer ${
                      selectedFarmer.id === farmer.id
                        ? 'bg-green-100'
                        : 'bg-gray-50'
                    } hover:bg-green-50 transition-colors duration-300`}
                  >
                    <img
                      src={farmer.avatar}
                      alt="Avatar"
                      className="w-12 h-12 rounded-full mr-4 border border-gray-300"
                    />
                    <div className="flex-grow">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {farmer.name}
                      </h3>
                      <p className="text-sm text-gray-600 truncate">
                        {farmer.lastMessage}
                      </p>
                    </div>
                    <span className="text-xs text-gray-500">
                      {farmer.lastActive}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat History */}
            <div className="md:col-span-3 bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  Chat with {selectedFarmer.name}
                </h2>
                <div className="flex items-center space-x-4">
                  <FaBell className="text-gray-500 cursor-pointer" />
                  <FaEllipsisV className="text-gray-500 cursor-pointer" />
                </div>
              </div>

              <div className="h-96 overflow-y-auto bg-gray-50 p-4 rounded-lg shadow-inner space-y-4">
                {selectedFarmer.chatHistory.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender === 'buyer'
                        ? 'justify-end'
                        : 'justify-start'
                    }`}
                  >
                    {message.sender !== 'buyer' && (
                      <img
                        src={selectedFarmer.avatar}
                        alt="Avatar"
                        className="w-10 h-10 rounded-full mr-4"
                      />
                    )}
                    <div>
                      <div
                        className={`max-w-xs px-4 py-2 rounded-lg ${
                          message.sender === 'buyer'
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-300 text-gray-800'
                        }`}
                      >
                        {message.text}
                      </div>
                      <span className="text-xs text-gray-500 mt-1 block">
                        {message.time}
                      </span>
                    </div>
                    {message.sender === 'buyer' && (
                      <FaUserCircle className="w-10 h-10 text-green-600 ml-4" />
                    )}
                  </div>
                ))}
              </div>

              <div className="flex items-center mt-6">
                <FaSmile className="text-2xl text-gray-500 mr-4 cursor-pointer" />
                <input
                  type="text"
                  value={newMessage}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  placeholder="Type a message..."
                  className="flex-grow px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-600"
                />
                <button
                  onClick={handleSendMessage}
                  className="ml-4 px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors duration-300"
                >
                  <FaPaperPlane />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
