import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

// API handler function
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req; // Extract the HTTP method
  
  switch (method) {
    case 'POST': {
      const { chatId } = req.query; // Extract the chatId from the request URL

      const { text, senderId, receiverId} = req.body;

        const newMessage = {
            senderId,
            receiverId,
            text
          }; // Extract message from the request body

      // Validate that the chat ID is provided
      if (!chatId) {
        return res.status(400).json({ message: 'Chat ID is required' });
      }

      // Validate that the message object is provided
      if (!newMessage) {
        return res.status(400).json({ message: 'Message data is required' });
      }

      try {
        // Send a request to the Spring Boot backend to add a message to the chat
        const response = await axios.post(
          process.env.MESSAGING_SERVICE_BASEURL+
          `/api/chats/${chatId}/messages`, // Spring Boot backend URL
          newMessage, // Pass the message object as the request body
          {
            headers: {
              'Content-Type': 'application/json', // Set the content type
            },
          }
        );

        // Return the response data from the backend
        return res.status(200).json(response.data);
        
      } catch (error) {
        console.error('Error adding message to chat:', error);

        // Handle and forward any errors from the backend
        if (axios.isAxiosError(error) && error.response) {
          return res.status(error.response.status).json({ message: error.response.data.message || 'Error from backend' });
        }

        return res.status(500).json({ message: 'Internal server error' });
      }
    }
    case 'GET': {
      const url =  process.env.MESSAGING_SERVICE_BASEURL+"/api/chats/user/chatids";
      const { chatId } = req.query; 

      try {
        
        const userId=chatId as string;
        console.log("User ID:", userId);

        const axiosRes = await axios.get(url, {
          headers: {
            "Content-Type": "application/json",
         
          },
          params: {
            userId, // Pass the role to the backend
          }
        });
        const user = axiosRes.data;
        res.status(200).json(user);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to fetch user data" });
      }
      break;
    }


    default:
      // If the HTTP method is not allowed, set the allowed methods and return a 405 status
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}