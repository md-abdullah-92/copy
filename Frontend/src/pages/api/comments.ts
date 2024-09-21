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
      const url = process.env.PRODUCT_SERVICE_BASEURL+"/comments/get";
      try {
        const axiosRes = await axios.get(url, {
          headers: {
            "Content-Type": "application/json",
          },
          
           params: {
              productid:req.query.productid as string,
            }
          
        });
        const product = axiosRes.data;
        console.log({ product });
        res.status(200).json(product);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to fetch user data" });
      }
      break;
  
    case 'POST':
        const { 
            comment,
            username,
            userid,
            productid,
            date,
            useravatar,
            productname,
           
        } = req.body;
        const postUrl =process.env.PRODUCT_SERVICE_BASEURL+ '/comments/add';
        const formData = new FormData();
        console.log({ comment, username, userid, productid });
        formData.append('comment', comment);
        formData.append('username', username);
        formData.append('userid', userid);
        formData.append('productid', productid);
        formData.append('date', date);
        formData.append('useravatar', useravatar);
        formData.append('productname', productname);
        
      
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
