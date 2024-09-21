
import React, { useState, useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { useChats } from '@/hooks/useChats';
import { useAddMessage } from '@/hooks/useAddMessage';
import { useUsers } from '@/hooks/useUsers';
import { useRouter } from 'next/router';
import Head from 'next/head';
import {
  FaPaperPlane,
  FaSmile,
  FaEllipsisV,
  FaPlusCircle,
  FaSearch,
} from 'react-icons/fa';
import Layout from '@/components/Layout/Layout';

interface Message {
  id: string;
  chatId: string; // Reference to the chat this message belongs to
  senderId: string; // Reference to the user who sent the message
  receiverId: string; // Reference to the user who will receive the message
  text: string;
  time: string;
}

interface Chat {
  id: string;
  user1Id: string; // Reference to the first user (e.g., a farmer)
  user2Id: string; // Reference to the second user (e.g., a buyer)
  messages: Message[]; // List of messages associated with this chat
}



export default function ChatPage() {
  const router = useRouter();
  const { addMessage } = useAddMessage();
  const { users } = useUsers();
  const [chatId, setChatId] = useState<string>('');
  const [senderId, setSenderId] = useState<string>('');
  const [receiverId, setReceiverId] = useState<string>('');
  const [text, setText] = useState<string>('');
  const [currentUserID, setCurrentUserID] = useState<string>('');
  const [selectedChat, setSelectedChat] = useState<any>(null);
  const [newMessage, setNewMessage] = useState<string>('');
  const { chats, isLoading } = useChats(currentUserID);

  const getUserById = (userId: string) => users.find((user) => user.id === userId);

  const clientRef = useRef<Client | null>(null);
  const lastMessageRef = useRef<HTMLDivElement | null>(null); // Ref for last message

  const [chatList, setChatList] = useState<any[]>([]);

  // Set current user ID from localStorage
  useEffect(() => {
    console.log(router.isReady);
    if (router.isReady){
    const { id } = router.query;
      console.log(id);
      setCurrentUserID(id as string);
      setSenderId(id as string);
    }else {
      const storedUserID = localStorage.getItem('id');
      if (storedUserID) {
        setCurrentUserID(storedUserID);
        setSenderId(storedUserID);
      }
    }
  }, [router.isReady, router.query]);

  // Initialize WebSocket connection with SockJS and STOMP
  useEffect(() => {
    const socketUrl = 'https://messaging-production.up.railway.app/ws';
    clientRef.current = new Client({
      webSocketFactory: () => new SockJS(socketUrl),
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      debug: (str) => console.log(str),
      onConnect: () => {
        console.log('Connected to WebSocket');
        if (clientRef.current) {
          clientRef.current.subscribe('/topic/messages', (message) => {
            const receivedMessage = JSON.parse(message.body);
            handleIncomingMessage(receivedMessage);
          });
        }
      },
      onStompError: (frame) => {
        console.error('STOMP Error: ' + frame.headers['message']);
      },
    });

    clientRef.current.activate();

    return () => {
      if (clientRef.current) {
        clientRef.current.deactivate();
      }
    };
  }, []);

  // Handle incoming messages from WebSocket
  const handleIncomingMessage = (receivedMessage:Message ) => {
    setChatList((prevChats) => {
      const updatedChats = [...prevChats];
      const chatIndex = updatedChats.findIndex((chat) => chat.id === receivedMessage.chatId);
      if (chatIndex > -1) {
        updatedChats[chatIndex].messages.push(receivedMessage);
        if (selectedChat?.id === receivedMessage.chatId) {
          setSelectedChat((prevChat:Chat) => ({
            ...prevChat,
            messages: [...prevChat.messages, receivedMessage],
          }));
        }
      }
      return updatedChats;
    });
  };

  // Send a message to WebSocket
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() !== '' && selectedChat) {
      const currentChatId = selectedChat.id;
      const receiver = selectedChat.user1Id === currentUserID ? selectedChat.user2Id : selectedChat.user1Id;
      const textMessage = newMessage.trim();

      const newMsg = {
        id: `${selectedChat.messages.length + 1}`,
        chatId: currentChatId,
        senderId: currentUserID,
        receiverId: receiver,
        text: textMessage,
        time: new Date().toISOString(),
      };

      // Update the chat locally
      const updatedChat = {
        ...selectedChat,
        messages: [...selectedChat.messages, newMsg],
      };
      setSelectedChat(updatedChat);
      setNewMessage('');

      // Send the message to the WebSocket server
      clientRef.current?.publish({
        destination: 'https://messaging-production.up.railway.app/ws/app/chat',
        body: JSON.stringify(newMsg),
      });

      // Optionally, save the message in the database via your API
      await addMessage(currentChatId, {
        chatId: currentChatId,
        senderId: currentUserID,
        receiverId: receiver,
        text: textMessage,
      });
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setNewMessage(event.target.value);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') handleSendMessage(event);
  };

  useEffect(() => {
    setChatList(chats);
  }, [chats]);

  // Scroll to the bottom when messages change
  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedChat?.messages]);

  return (
    <>
    <Head>
      <title>Chat-App | AgriBazaar</title>
      <link rel="icon" href="/assets/logo.png" />
    </Head>
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
                {Array.isArray(chatList) && chatList.length > 0 ? (
                  chatList.map((chat) => {
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
                            {chat.messages.length > 0
                              ? chat.messages[chat.messages.length - 1].text
                              : 'No messages yet'}
                          </p>
                        </div>
                        <span className="text-xs text-gray-500">
                          {chat.messages.length > 0
                            ? formatTime(chat.messages[chat.messages.length - 1].time)
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
                  <div className="space-y-4 overflow-auto h-96">
                    {selectedChat.messages.map((message :Message, index:number) => {
                      const isCurrentUserSender = message.senderId === currentUserID;
                      const sender = getUserById(message.senderId);
                      const isLastMessage = index === selectedChat.messages.length - 1;

                      return (
                        <div
                         key={index} className={`flex ${isCurrentUserSender ? 'justify-end' : 'justify-start'}`}>
                        {!isCurrentUserSender && sender && (
                          <img
                            src={sender.avatar}
                            alt={sender.name}
                            className="w-10 h-10 rounded-full mr-2"
                          />
                        )}
                        <div
                          className={`relative max-w-xs px-4 py-2 rounded-lg shadow ${
                            isCurrentUserSender
                              ? 'bg-green-400 text-black'
                              : 'bg-gray-100 text-gray-900'
                          }`}
                        >
                          <p>{message.text}</p>
                          {/* Time below the text */}
                          <span className="text-xs text-gray-500 mt-1 block text-right">
                            {formatTime(message.time)}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>


                  {/* Send Message Input */}
                  <form
                    onSubmit={handleSendMessage}
                    className="mt-6 flex items-center space-x-4"
                  >
                    <input
                      type="text"
                      value={newMessage}
                      onChange={handleInputChange}
                      onKeyDown={handleKeyPress}
                      className="flex-grow px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-600"
                      placeholder="Type a message..."
                    />
                    <FaSmile className="text-gray-500 text-xl cursor-pointer" />
                    <button
                      type="submit"
                      className="bg-green-600 text-white p-3 rounded-full"
                    >
                      <FaPaperPlane className="text-xl" />
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center text-gray-500">
                  Select a chat to start messaging
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
    </>
  );
}

// Helper function to format the time
function formatTime(isoString: string) {
  const date = new Date(isoString);
  const now = new Date();
  
  const isToday = date.toDateString() === now.toDateString();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const ampm = hours >= 12 ? 'PM' : 'AM';

  if (isToday) {
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  } else {
    return date.toLocaleDateString(); // Show full date if not today
  }
}
