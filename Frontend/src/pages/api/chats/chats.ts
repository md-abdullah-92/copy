import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'POST': {
      const { user1Id, user2Id } = req.body;

      // Validate that both user IDs are provided
      if (!user1Id || !user2Id) {
        return res.status(400).json({ message: 'Both user1Id and user2Id are required' });
      }

      try {
        // Send a request to the Spring Boot backend to create or get an existing chat
        const response = await axios.post( process.env.MESSAGING_SERVICE_BASEURL+'/api/chats', {}, {
            params: {
                user1Id,
                user2Id,
            },
          headers: {
            'Content-Type': 'application/json',
          },
        });

        // Return the chat data
        return res.status(200).json(response.data);
      } catch (error) {
        console.error('Error fetching chat:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }
    }

    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
