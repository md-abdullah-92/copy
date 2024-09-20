import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'PUT': {
      const {
        name,
        password,
        gender,
        phone,
        address,
        nidImage,
        signatureImage,
        nidNumber,
        avatar,
      } = req.body;

      const updateRequestBody = {
        name,
        password,
        gender,
        phone,
        address,
        nidImage,
        signatureImage,
        nidNumber,
        avatar,
      };

      const { email } = req.query;
      const updateUrl = process.env.USER_SERVICE_BASEURL+`/api/agents/update`;

      try {
        const axiosRes = await axios.put(updateUrl, updateRequestBody, {
          headers: {
            'Content-Type': 'application/json',
           // Authorization: req.headers.authorization || '', // Include a default empty string for Authorization header
          },
          params: {
            email: email, // Pass email as a query parameter
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
