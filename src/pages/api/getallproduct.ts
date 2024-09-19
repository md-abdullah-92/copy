import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    

    case 'GET': {
      const url = process.env.PRODUCT_SERVICE_BASEURL+"/product/allproducts";

      try {
        const axiosRes = await axios.get(url, {
          headers: {
            "Content-Type": "application/json",
         
          },
        });
        const product = axiosRes.data;
        res.status(200).json(product);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to fetch user data" });
      }
      break;
    }
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
