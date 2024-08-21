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
        name: putName,
        password: putPassword,
        gender: putGender,
        phone: putPhone,
        address: putAddress,
        upazila: putUpazila,
        zila: putZila,
        organization: putOrganization,
      } = req.body;

      const putBody = {
        name: putName,
        password: putPassword,
        gender: putGender,
        phone: putPhone,
        address: putAddress,
        upazila: putUpazila,
        zila: putZila,
        organization: putOrganization,
      };

      const putUrl = 'http://localhost:8080/api/user/update';

      try {
        const axiosRes = await axios.put(putUrl, putBody, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: req.headers.authorization || '', // Include a default empty string for Authorization header
          },
        });

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
