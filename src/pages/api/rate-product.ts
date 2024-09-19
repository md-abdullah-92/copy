// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import axios from 'axios';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const method = req.method;
    switch(method)
    {
      
        case 'PUT': {
            
            try {
              const url = process.env.PRODUCT_SERVICE_BASEURL+"/product/rateproduct"; // Adjust if needed
              const id = req.query.productid as string;
              const rating = req.query.rating as string;
              const soldproduct= req.query.soldproduct as string;
                console.log("Product id",id);
                console.log("Rating",rating);
                console.log("Sold product",soldproduct);
              
        
              // Making a PUT request to the Java backend
              const axiosRes = await axios.put(url, {}, {
                headers: {
                  "Content-Type": "application/json",
                },
                params: {
                    id,
                    rating,
                    soldproduct,
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
         res.status(405).end();
        break;


    }

}
