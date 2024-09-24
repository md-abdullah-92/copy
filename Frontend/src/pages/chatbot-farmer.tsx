import { FC, useState, useRef, useEffect, KeyboardEvent } from 'react';
import Head from 'next/head';
import Layout from '@/components/Layout/Layout';
import { IconDots, IconArrowUp } from "@tabler/icons-react";
import ButtonPrimary from '@/components/Buttons/ButtonPrimary';
import { Group, Center } from '@mantine/core';

// Message type definition
interface Message {
  role: 'assistant' | 'user';
  content: string;
}

// ChatMessage component to display individual messages
const ChatMessage: FC<{ message: Message }> = ({ message }) => {
  return (
    <div className={`flex flex-col ${message.role === 'assistant' ? 'items-start' : 'items-end'}`}>
      <div
        className={`flex items-center ${message.role === 'assistant' ? 'message-background text-neutral-900' : 'message-background-user text-white'} rounded-2xl px-3 py-2 max-w-[67%] whitespace-pre-wrap`}
        style={{ overflowWrap: 'anywhere' }}
      >
        {message.content}
      </div>
    </div>
  );
};

// ChatLoader component to show loading animation
const ChatLoader: FC = () => {
  return (
    <div className="flex flex-col flex-start">
      <div className="flex items-center bg-neutral-200 text-neutral-900 rounded-2xl px-4 py-2 w-fit" style={{ overflowWrap: "anywhere" }}>
        <IconDots className="animate-pulse" />
      </div>
    </div>
  );
};

// ChatInput component to handle user input
const ChatInput: FC<{ onSend: (message: Message) => void }> = ({ onSend }) => {
  const [content, setContent] = useState<string>('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length > 4000) {
      alert('Message limit is 4000 characters');
      return;
    }
    setContent(value);
  };

  const handleSend = () => {
    if (!content) {
      alert('Please enter a message');
      return;
    }
    onSend({ role: 'user', content });
    setContent('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    if (textareaRef && textareaRef.current) {
      textareaRef.current.style.height = 'inherit';
      textareaRef.current.style.height = `${textareaRef.current?.scrollHeight}px`;
    }
  }, [content]);

  return (
    <div className="relative">
      <textarea
        ref={textareaRef}
        className="min-h-[44px] rounded-lg pl-4 pr-12 py-2 w-full input-border-color"
        style={{ resize: 'none' }}
        placeholder="Type a message..."
        value={content}
        rows={1}
        onChange={handleChange}
        onKeyDown={handleKeyDown}  // Enabled "Enter" key functionality
      />
      <Group style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
        <button onClick={() => handleSend()}>
          <IconArrowUp
            className="absolute right-3 bottom-3 h-8 w-8 hover:cursor-pointer rounded-full p-1 text-white hover:opacity-80"
          />
        </button>
      </Group>
    </div>
  );
};

// Chat component to handle the whole chat flow
const Chat: FC<{ messages: Message[]; loading: boolean; onSend: (message: Message) => void; onReset: () => void }> = ({ messages, loading, onSend, onReset }) => {
  return (
    <div className="mt-15">
      {/* Heading for the card view */}
      <div className="text-center text-2xl font-bold mb-4 text-green-600">
        Get expert advice tailored to your farming needs with Agribazaar&apos;s AI assistant.
      </div>

      <div
        className="flex flex-col rounded-lg px-4 py-4 shadow-lg border border-gray-300"
        style={{ backgroundColor: '#f9f9f9' }} // More formal background color
      >
        {messages.map((message, index) => (
          <div key={index} className="my-2">
            <ChatMessage message={message} />
          </div>
        ))}

        {loading && (
          <div className="my-2">
            <ChatLoader />
          </div>
        )}

        <div className="mt-4 sm:mt-6">
          <ChatInput onSend={onSend} />
        </div>
      </div>
    {/* Clear button and Chat with AI button */}
<div className="text-center mt-4 flex justify-center space-x-4">
  {/* Clear Chat Button */}
  <ButtonPrimary onClick={onReset}>Clear Chat</ButtonPrimary>

  {/* Chat with AI Button */}
  <button
    onClick={() => {
      window.location.href = '/ai';
    }}
    className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-green-700 transition-colors duration-300"
  >
    Chat For Spcific Queries
  </button>
</div>

    </div>
  );
};


// Main Home component
const Home: FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

 

  const handleSend = async (message: Message) => {
    const updatedMessages = [...messages, message];
    setMessages(updatedMessages);
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const assistantMessage = data.choices[0]?.message?.content || 'Sorry, I am unable to respond right now.';

      setMessages((prevMessages) => [...prevMessages, { role: 'assistant', content: assistantMessage }]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setMessages([{ role: 'assistant', content: `🌾 Welcome to Agribazaar! 🌾` }]);
  };

  useEffect(() => {
  
  }, [messages]);

  useEffect(() => {
    setMessages([{ role: 'assistant', content: `🌾 Welcome to Agribazaar! 🌾` }]);
  }, []);

  return (
    <>
      <Head>
        <title>AI Chat| Agribazaar</title>
        <meta name="description" content="Agribazaar Chat Buddy" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
      <div
  style={{
    height: '89%',
    width: '100%',
    backgroundSize: 'auto 06%',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'left 100px top',
    paddingTop: '100px',
    backgroundColor: '#e0f7fa'// A soft light blue background
  }}
>

          <Center className="mx-auto max-w-[800px]" style={{ height: '89vh' }}>
            <div className="t-15 custom-scrollbar max-h-[80vh] overflow-y-auto" style={{ width: '100%' }}>
              <Chat messages={messages} loading={loading} onSend={handleSend} onReset={handleReset} />
              <div ref={messagesEndRef} />
            </div>
          </Center>
        </div>
      </Layout>
    </>
  );
};

export default Home;
