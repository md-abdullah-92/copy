import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'POST': {
      const {
        id,
        name,
        avatar,
        type,

      } = req.body;

      const updateRequestBody = {
        id,
        name,
        avatar,
        type,
      };

      const { email } = req.query;
      const updateUrl = `http://localhost:8081/api/users`;

      try {
        const axiosRes = await axios.post(updateUrl, updateRequestBody, {
          headers: {
            'Content-Type': 'application/json',
          
          },
        
        });

        res.status(200).json(axiosRes.data);
      } catch (err: any) {
        console.error('Error updating profile:', err);
        res.status(err.response?.status || 500).json({
          message: err.message || 'An error occurred while updating the profile.',
        });
      }
      break;
    }
    default:
      res.setHeader('Allow', ['PUT']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
