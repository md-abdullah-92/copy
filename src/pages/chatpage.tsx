import React, { useState, useEffect } from 'react';
import { useChats } from '@/components/hooks/useChats';
import { useAddMessage } from '@/components/hooks/useAddMessage';
import { useUsers } from '@/components/hooks/useUsers';
import {
  FaPaperPlane,
  FaSmile,
  FaEllipsisV,
  FaPlusCircle,
  FaSearch,
} from 'react-icons/fa';
import { format } from 'date-fns';
import Layout from '@/components/Layout/Layout';

// The provided user dataset

// Helper function to get user details by ID
//const getUserById = (userId: string) => users.find((user) => user.id === userId);

export default function ChatPage() {
  const { addMessage, loading, error } = useAddMessage();
  const { users, error: usersError } = useUsers();
  const [chatId, setChatId] = useState<string>('');
  const [senderId, setSenderId] = useState<string>('');
  const [receiverId, setReceiverId] = useState<string>('');
  const [text, setText] = useState<string>('');
  const [currentUserID,setCurrentUserID]=useState('');
  const getUserById = (userId: string) => users.find((user) => user.id === userId);
  useEffect(() => {
    const storedUserID = localStorage.getItem('id'); // Retrieve from local storage

    if (storedUserID) {
      setCurrentUserID(storedUserID);
      setSenderId(storedUserID);
    }
    
  }, []);
  
  const { chats, isLoading } = useChats(currentUserID);
  const [selectedChat, setSelectedChat] = useState(chats.length > 0 ? chats[0] : null);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    if (chats.length > 0) {
      setSelectedChat(chats[0]);
    }
  }, [chats]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newMessage.trim() !== '' && selectedChat) {
      // Set the necessary variables directly instead of updating state asynchronously
      const currentChatId = selectedChat.id;
      const receiver = selectedChat.user1Id === currentUserID ? selectedChat.user2Id : selectedChat.user1Id;
      const textMessage = newMessage.trim();
  
      // Create the new message object
      const newMsg = {
        id: `${selectedChat.messages.length + 1}`, // Assuming IDs are sequential, adjust based on your logic
        chatId: currentChatId,
        senderId: currentUserID,
        receiverId: receiver,
        text: textMessage,
        time: new Date().toISOString(), // Set the current timestamp
      };
  
      // Optimistically update the UI
      const updatedChat = {
        ...selectedChat,
        messages: [...selectedChat.messages, newMsg],
      };
  
      // Update the selected chat state to reflect the new message
      setSelectedChat(updatedChat);
      setNewMessage(''); // Clear the input field
  
      // Create the message object to send to the server
      const messageToSend = {
        chatId: currentChatId,
        senderId: currentUserID,
        receiverId: receiver,
        text: textMessage,
      };
  
      // Send the message via API
      const result = await addMessage(currentChatId, messageToSend);
      console.log(result); // Log the response for debugging
    }
  };
  
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setNewMessage(event.target.value);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') handleSendMessage(event);
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
              {Array.isArray(chats) && chats.length > 0 ? (
                chats.map((chat) => {
                  const chatPartnerId = chat.user1Id === currentUserID ? chat.user2Id : chat.user1Id;
                  const chatPartner = getUserById(chatPartnerId);
                  if (!chatPartner) return null;

                  return (
                    <div
                      key={chat.id}
                      onClick={() => setSelectedChat(chat)}
                      className={`flex items-center p-4 rounded-lg cursor-pointer ${
                        selectedChat?.id === chat.id ? 'bg-green-100' : 'bg-gray-50'
                      } hover:bg-green-50 transition-colors duration-300`}
                    >
                      <img
                        src={chatPartner.avatar}
                        alt={chatPartner.name}
                        className="w-12 h-12 rounded-full mr-4"
                      />
                      <div className="flex-grow">
                        <h3 className="text-lg font-semibold text-gray-800">{chatPartner.name}</h3>
                        <p className="text-sm text-gray-600 truncate">
                          {chat.messages.length > 0 ? chat.messages[chat.messages.length - 1].text : 'No messages yet'}
                        </p>
                      </div>
                      <span className="text-xs text-gray-500">
                        {chat.messages.length > 0
                          ? format(new Date(chat.messages[chat.messages.length - 1].time), 'hh:mm a')
                          : 'N/A'}
                      </span>
                    </div>
                  );
                })
              ) : (
                <p className="text-center text-gray-500">No chats available</p>
              )}
            </div>

            </div>

            {/* Chat History */}
            <div className="md:col-span-3 bg-white rounded-xl shadow-lg p-6">
              {selectedChat ? (
                <>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-900">
                      Chat with{' '}
                      {getUserById(
                        selectedChat.user1Id === currentUserID
                          ? selectedChat.user2Id
                          : selectedChat.user1Id
                      )?.name ?? 'Unknown'}
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
                              src={user?.avatar}
                              alt={user?.name}
                              
                              className="w-8 h-8 rounded-full mr-2"
                            />
                          )}
                          <div
                            className={`relative p-4 max-w-xs rounded-2xl shadow ${
                              isSender ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-800'
                            }`}
                          >
                            <p>{message.text}</p>
                            <span className="text-xs absolute bottom-1 right-2 text-gray-500">
                              
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Input for New Message */}
                  <div className="flex items-center">
                    <FaSmile className="text-gray-500 text-2xl mr-2" />
                    <input
                      type="text"
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={handleInputChange}
                      onKeyPress={handleKeyPress}
                      className="flex-grow px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-600"
                    />
                    <button
                      onClick={handleSendMessage}
                      className="ml-2 bg-green-500 text-white rounded-full p-2 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-600"
                    >
                      <FaPaperPlane className="text-xl" />
                    </button>
                  </div>
                </>
              ) : (
                <p className="text-center text-gray-500">Select a chat to start messaging</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
