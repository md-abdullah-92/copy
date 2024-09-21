import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'PUT': {
      const {
        id,
        productname,
        image,
        description,
        category,
        price,
        quantity,
        ownername,
        owneremail,
        ownerorganization,
        ownerupzila,
        ownerzila,
        ownerdivision,
        ownerphone,
      } = req.body;

      // Validate required fields
      if (!productname || !price || !quantity) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      const updateRequestBody = {
        id,
        productname,
        image,
        description,
        category,
        price,
        quantity,
        ownername,
        owneremail,
        ownerorganization,
        ownerupzila,
        ownerzila,
        ownerdivision,
        ownerphone,
      };

      const updateUrl = process.env.PRODUCT_SERVICE_BASEURL+`/product/editproduct`;

      try {
        const axiosRes = await axios.put(updateUrl, updateRequestBody, {
          headers: {
            'Content-Type': 'application/json',
            // Authorization: req.headers.authorization || '', // Include a default empty string for Authorization header
          },
        });

        res.status(200).json(axiosRes.data);
      } catch (err: any) {
        console.error('Error updating product:', err);
        res.status(err.response?.status || 500).json({
          message: err.message || 'An error occurred while updating the product.',
        });
      }
      break;
    }
    default: {
      res.setHeader('Allow', ['PUT']);
      res.status(405).end(`Method ${method} Not Allowed`);
    }
  }
}
