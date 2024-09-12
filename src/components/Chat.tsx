// components/Chat.tsx
import { useEffect, useState, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

interface Message {
  user: string;
  message: string;
  roomId: string;
}

const Chat = () => {
  const [name, setName] = useState<string>('');
  const [room, setRoom] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const socketRef = useRef<Socket | null>(null);
  const messageAreaRef = useRef<HTMLDivElement | null>(null);

  // Initialize socket connection and set up event listeners
  useEffect(() => {
    const userName = prompt('Please enter your name: ') || 'Anonymous';
    setName(userName);

    const socket = io('http://localhost:8082'); // Backend WebSocket URL
    socketRef.current = socket;

    socket.on('message', (msg: Message) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
      scrollToBottom();
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // Join a room
  const joinRoom = (roomId: string) => {
    setRoom(roomId);
    socketRef.current?.emit('joinRoom', { roomId });
  };

  // Send a message
  const sendMessage = () => {
    if (!message.trim() || !room) return;

    const msg: Message = { user: name, message: message.trim(), roomId: room };

    socketRef.current?.emit('message', msg);
    setMessages((prevMessages) => [...prevMessages, msg]);
    setMessage('');
    scrollToBottom();
  };

  // Scroll to the bottom of the message area
  const scrollToBottom = () => {
    if (messageAreaRef.current) {
      messageAreaRef.current.scrollTop = messageAreaRef.current.scrollHeight;
    }
  };

  return (
    <div className="chat-container">
      <div className="rooms">
        <button onClick={() => joinRoom('room1')}>Join Room 1</button>
        <button onClick={() => joinRoom('room2')}>Join Room 2</button>
        {/* Add more rooms or a dynamic way to join rooms */}
      </div>

      <div className="message__area" ref={messageAreaRef}>
        {messages
          .filter((msg) => msg.roomId === room)
          .map((msg, index) => (
            <div key={index} className={`message ${msg.user === name ? 'outgoing' : 'incoming'}`}>
              <h4>{msg.user}</h4>
              <p>{msg.message}</p>
            </div>
          ))}
      </div>

      <textarea
        id="textarea"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyUp={(e) => e.key === 'Enter' && sendMessage()}
        placeholder="Type a message..."
      />
    </div>
  );
};

export default Chat;
