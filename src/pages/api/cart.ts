import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const method = req.method;
  console.log({ method });
  switch (method) {
    case 'GET':
      const url = process.env.PRODUCT_SERVICE_BASEURL+"/cart/cartproducts";
      try {
        const axiosRes = await axios.get(url, {
          headers: {
            "Content-Type": "application/json",
          },
          
           params: {
              email:req.query.email,
            }
          
        });
        const product = axiosRes.data;
        res.status(200).json(product);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to fetch user data" });
      }
      break;
    case 'POST':
        const { 
            id,
            productname,
            image,
            price,
            category,
            quantity,
            email,
           
        } = req.body;
        const postUrl =process.env.PRODUCT_SERVICE_BASEURL+ '/cart/addtocart';
        const formData = new FormData();
        console.log({ id, productname, image, price, category, quantity, email });
        formData.append('id', id);
        formData.append('productname', productname);
        formData.append('image', image);
        formData.append('price', price);
        formData.append('category', category);
        formData.append('quantity', quantity);
        formData.append('email', email);
      
        try {
            const axiosRes = await axios.post(postUrl, formData, {
            headers: {
                "Content-Type": "application/json",
            },
            });
            const product = axiosRes.data;
            res.status(201).json(product);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Failed to add product' });
        }
        break;
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
