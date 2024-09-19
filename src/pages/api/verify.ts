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
        case 'POST':
        const {id,code} = (req.body) ;
        const body = {
            id:id,
            code:code
        }
        const url =process.env.USER_SERVICE_BASEURL+"/api/user/verify";
        try{
            const axiosRes = await axios.post(url,body,{
                headers: {
                    "Content-Type": "application/json",
                    }
            });
            res.status(201).json({
                "message":"Verified successfully",
            });
        }
        catch(err){
            console.log(err)
            res.status(500).end();
        }
        
            break;
            case 'PUT': {
                
                try {
                  const url = process.env.PRODUCT_SERVICE_BASEURL+"/soldproduct/verifycode"; // Adjust if needed
                  const id = req.query.id as string;
                  const code = req.query.code as string;
                  console.log("order id",id);
                  console.log("code",code);
            
                  // Making a PUT request to the Java backend
                  const axiosRes = await axios.put(url, {}, {
                    headers: {
                      "Content-Type": "application/json",
                    },
                    params: {
                      id,
                      code,
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
