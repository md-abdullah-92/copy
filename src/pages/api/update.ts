import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;

  switch (method) {
    case 'PUT': {
      const {
        name,
        password,
        gender,
        phone,
        address,
        upazila,
        zila,
        organization,
      } = req.body;

      const updateRequestBody = {
        name,
        password,
        gender,
        phone,
        address,
        upazila,
        zila,
        organization,
      };

      const { email } = req.query;
      console.log('Email: in update', email);

      const updateUrl = `http://localhost:8080/api/user/update`;

      try {
        const axiosRes = await axios.put(
          updateUrl, 
          updateRequestBody, 
          {
            headers: {
              'Content-Type': 'application/json',
            },
            params: {
              email: email, // Pass email as a query parameter
            },
          }
        );

        res.status(200).json(axiosRes.data);
      } catch (err: any) {
        console.error('Error updating user profile:', err.response?.data || err.message);
        res
          .status(err.response?.status || 500)
          .json({ message: 'Failed to update profile. Please try again later.' });
      }
      break;
    }
    default:
      res.status(405).json({ message: 'Method not allowed' });
      break;
  }
}
