import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'GET': {
      const url = process.env.USER_SERVICE_BASEURL+'/api/user/farmers';

      try {
        const axiosRes = await axios.get(url, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const farmers = axiosRes.data;
        res.status(200).json(farmers);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch farmers data' });
      }
      break;
    }
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
