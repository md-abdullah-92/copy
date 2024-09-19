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
      const url = process.env.PRODUCT_SERVICE_BASEURL+"/soldproduct/getproduct";
      try {
        const axiosRes = await axios.get(url, {
          headers: {
            "Content-Type": "application/json",
          },
          
           params: {
              id: req.query.id,
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
            productid,
            name,
            image,
            price,
            category,
            buyeremail,
            sellername,
            selleremail,
            buyername, 
            soldprice,
            soldquantity,
            soldtime,
            deliverytime,
            deliverystatus,
            deliveryMethod,
            sellerphone,
            deliverytimeby,
            deliverytimeto,
            deliverybydate,
            deliverytodate,
            deliverybyaddress,
            deliverytoaddress,
            deliverybyupzilaname,
            deliverytoupzilaname,
            deliverybyzilaname
        } = req.body;
        const postUrl = process.env.PRODUCT_SERVICE_BASEURL+'/soldproduct/addsoldproduct';
        const formData = new FormData();
        formData.append('productid', productid);
        formData.append('name', name);
        formData.append('image', image);
        formData.append('price', price);
        formData.append('category', category);
        formData.append('sellername', sellername);
        formData.append('selleremail', selleremail);
        formData.append('buyeremail', buyeremail);
        formData.append('buyername', buyername);
        formData.append('soldprice', soldprice);
        formData.append('soldquantity', soldquantity);
        formData.append('soldtime', soldtime);
        formData.append('sellerphone', sellerphone);
        formData.append('deliveryMethod', deliveryMethod);
        formData.append('deliverytime', deliverytime);
        formData.append('deliverystatus', deliverystatus);
        formData.append('deliverytimeby', deliverytimeby);
        formData.append('deliverytimeto', deliverytimeto);
        formData.append('deliverybydate', deliverybydate);
        formData.append('deliverytodate', deliverytodate);
        formData.append('deliverybyaddress', deliverybyaddress);
        formData.append('deliverytoaddress', deliverytoaddress);
        formData.append('deliverybyupzilaname', deliverybyupzilaname);
        formData.append('deliverytoupzilaname', deliverytoupzilaname);
        formData.append('deliverybyzilaname', deliverybyzilaname); 
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
