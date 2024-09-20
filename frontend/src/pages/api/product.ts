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
              ownerid,
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
       ownerid,
     };
 
      const updateUrl = process.env.PRODUCT_SERVICE_BASEURL+`/product/addproduct`;

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
      const url = process.env.PRODUCT_SERVICE_BASEURL+"/product/getsameownerproduct";

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
      const url = process.env.PRODUCT_SERVICE_BASEURL+"/product/getproduct";

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
    case 'PUT': {
      try {
        const url = process.env.PRODUCT_SERVICE_BASEURL+"/product/updateproductquantity"; // Adjust if needed
        const id = req.query.id;
        const quantity = req.query.quantity;
        
        // Making a PUT request to the Java backend
        const axiosRes = await axios.put(url, {}, {
          headers: {
            "Content-Type": "application/json",
          },
          params: {
            id, 
            quantity,
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
    case 'DELETE': {
      try {
        const url = process.env.PRODUCT_SERVICE_BASEURL+"/product/deleteproduct"; // Adjust if needed
        const id = req.query.id as string;
        
        // Making a DELETE request to the Java backend
        const axiosRes = await axios.delete(url, {
          headers: {
            "Content-Type": "application/json",
          },
          params: {
            id,
          },
        });
        
        res.status(200).json(axiosRes.data);
      } catch (err) {
        console.error('Error deleting product:', err);
        res.status(500).json({
          message: 'An error occurred while deleting the product.',
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
