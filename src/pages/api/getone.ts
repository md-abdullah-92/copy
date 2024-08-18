import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const method = req.method;

  switch (method) {
    case 'GET': {
      const url = "http://localhost:8080/api/user/getOne";

      try {
        const token = req.headers.authorization; // Get the Authorization header from the request
        const role = req.query.role; // Get the role from query parameters

        if (!token) {
          return res.status(401).json({ message: "Authorization header is missing" });
        }

        if (!role) {
          return res.status(400).json({ message: "Role parameter is missing" });
        }

        const axiosRes = await axios.get(url, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": token // Pass the token to the backend
          },
          params: {
            role: role, // Pass the role to the backend
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
      res.status(405).json({ message: "Method not allowed" });
      break;
  }
}
