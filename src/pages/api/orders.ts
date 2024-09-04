
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  switch (method) {

case 'GET': {
    const url = "http://localhost:8080/soldproduct/orderproducts";

    try {
      const selleremail = req.query.selleremail as string;
      console.log({ selleremail });

      const axiosRes = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
       
        },
        params: {
           selleremail:selleremail, // Pass the role to the backend
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
