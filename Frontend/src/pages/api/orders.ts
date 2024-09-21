
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  switch (method) {

case 'GET': {
    const url = process.env.PRODUCT_SERVICE_BASEURL+"/soldproduct/orderproducts";

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
  case 'PUT': {
    console.log("Order page");
    console.log("orderpage" ,req.query);
    try {
      const url = process.env.PRODUCT_SERVICE_BASEURL+"/soldproduct/updatestatus"; // Adjust if needed
      const id = req.query.id as string;
      const deliverystatus = req.query.deliverystatus as string;
      console.log("Order page",{id});
      console.log({deliverystatus});

      // Making a PUT request to the Java backend
      const axiosRes = await axios.put(url, {}, {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          id,
          deliverystatus,
        },
      });
      
      res.status(200).json(axiosRes.data);
    } catch (err) {
      console.error('Error updating product quantity:', err);
      res.status(500).json({
        message: 'An error occurred while updating the product quantity.',
      });
    }
    break;
  }
  

  default:
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${method} Not Allowed`);
    break;
}
}
