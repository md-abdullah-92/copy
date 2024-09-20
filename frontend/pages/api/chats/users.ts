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
      const updateUrl =  process.env.MESSAGING_SERVICE_BASEURL+`/api/users`;

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
    case 'GET': {
      const url =  process.env.MESSAGING_SERVICE_BASEURL+"/api/users";

      try {
        const axiosRes = await axios.get(url, {
          headers: {
            "Content-Type": "application/json",
          },  
        });
        const user = axiosRes.data;
        res.status(200).json(user);
        console.log(user);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to fetch user data" });
      }
      break;
    }
    default:
      res.setHeader('Allow', ['PUT']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
