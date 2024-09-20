import React from 'react';
import { FaPaperPlane, FaSmile } from 'react-icons/fa';


const MessageInput = ({
  newMessage,
  setNewMessage,
  selectedChat,
  handleSendMessage,
  selectedImage,
  setSelectedImage,
}) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(event.target.value);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(event.target.files[0]);
    }
  };

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      const receiver = selectedChat.user1Id === selectedChat.senderId ? selectedChat.user2Id : selectedChat.user1Id;
      const messageData = {
        id: `${selectedChat.messages.length + 1}`,
        chatId: selectedChat.id,
        senderId: selectedChat.senderId,
        receiverId: receiver,
        text: newMessage,
        imageUrl: selectedImage ? URL.createObjectURL(selectedImage) : null, 
        time: new Date().toISOString(),
      };
      handleSendMessage(messageData);
    }} className="flex items-center space-x-4 mt-6">
      <FaSmile className="text-gray-500 text-2xl cursor-pointer" />
      <input
        type="text"
        placeholder="Type your message..."
        className="flex-grow px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-600"
        value={newMessage}
        onChange={handleInputChange}
      />
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      <button type="submit" className="text-2xl text-green-600">
        <FaPaperPlane />
      </button>
    </form>
  );
};

export default MessageInput;
