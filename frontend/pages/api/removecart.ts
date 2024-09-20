import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const method = req.method;
  console.log({ method });
  switch (method) {
    case 'POST':
      const url = process.env.PRODUCT_SERVICE_BASEURL+"/cart/removeproduct";
      const { id, email } = req.body; // Extract parameters from the body
      console.log('Product ID:', id);
      console.log('Email:', email);
      
      try {
        const axiosRes = await axios.post(url, null, { // Note: Axios `post` takes data as second parameter
          headers: {
            "Content-Type": "application/json",
          },
          params: { id, email }, // Send id and email as query parameters
        });
        const product = axiosRes.data;
        res.status(200).json(product);
      } catch (err) {
        console.error('Error in removing product:', err);
        res.status(500).json({ message: "Failed to remove product" });
      }
      break;
  
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
