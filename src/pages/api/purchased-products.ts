
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  switch (method) {

case 'GET': {
    const url = process.env.PRODUCT_SERVICE_BASEURL+"/soldproduct/soldproducts";

    try {
      const buyeremail = req.query.buyeremail as string;
      console.log({ buyeremail });

      const axiosRes = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
       
        },
        params: {
           buyeremail:buyeremail, // Pass the role to the backend
        }
      });

      const user = axiosRes.data;
      res.status(200).json(user);
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
