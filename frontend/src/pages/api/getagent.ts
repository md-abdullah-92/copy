import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const method = req.method;

  switch (method) {
    case 'GET': {
      const url =process.env.USER_SERVICE_BASEURL+ "/api/agents/getagent";

      try {
        const token = req.headers.authorization; // Get the Authorization header from the request
    

        if (!token) {
          return res.status(401).json({ message: "Authorization header is missing" });
        }

       

        const axiosRes = await axios.get(url, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": token // Pass the token to the backend
          },
         
        });

        const user = axiosRes.data;
        
        
         
      
        res.status(200).json(user);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to fetch user data" });
      }
      break;
    }

    case 'POST': {
      const { name, password, avatar, gender, phone, address, upazila, zila, organization } = req.body;
    
      const postUrl = process.env.USER_SERVICE_BASEURL+'/api/user/update';
    
      const formData = new FormData();
      formData.append('name', name);
      formData.append('password', password);
      if (avatar) {
        formData.append('avatar', avatar);
      }
      formData.append('gender', gender);
      formData.append('phone', phone);
      formData.append('address', address);
      formData.append('Upazila', upazila);
      formData.append('Zila', zila);
      formData.append('organization', organization);
    
      try {
        const axiosRes = await axios.put(postUrl, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: req.headers.authorization,
          },
        });
        const profile = axiosRes.data;
        res.status(200).json(profile);
      } catch (err) {
        console.error(err);
        res.status(500).end();
      }
      break;
    }
    


    default:
      res.status(405).json({ message: "Method not allowed" });
      break;
  }
}
