import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'POST': {
      const {
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

      const updateRequestBody = {
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
 
      const updateUrl = `http://localhost:8080/product/addproduct`;

      try {
        const axiosRes = await axios.post(updateUrl, updateRequestBody, {
          headers: {
            'Content-Type': 'application/json',
           // Authorization: req.headers.authorization || '', // Include a default empty string for Authorization header
          },
        });

        res.status(200).json(axiosRes.data);
      } catch (err: any) {
        console.error('Error ADDING PRODUCT:', err);
        res.status(err.response?.status || 500).json({
          message: err.message || 'An error occurred while updating the add product.',
        });
      }
      break;
    }
    case 'GET': {
      const url = "http://localhost:8080/product/getsameownerproduct";

      try {
        const owneremail = req.query.owneremail as string;

        const axiosRes = await axios.get(url, {
          headers: {
            "Content-Type": "application/json",
         
          },
          params: {
            owneremail:owneremail, // Pass the role to the backend
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

    case 'GET': {
      const url = "http://localhost:8080/product/getproduct";

      try {
        const id = req.query.id as string;
        const axiosRes = await axios.get(url, {
          headers: {
            "Content-Type": "application/json",
         
          },
          params: {
            id:id, // Pass the role to the backend
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
