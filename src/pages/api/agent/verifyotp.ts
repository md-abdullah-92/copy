import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;

  switch (method) {
    case 'POST':
      const otp = req.query.otp as string;
      const id = req.query.id as string;
      

      const url = process.env.USER_SERVICE_BASEURL+"/api/agents/verifyotp";
      
      try {
        const axiosRes = await axios.post(url, {}, {
          headers: {
            "Content-Type": "application/json",
          },
          params: {
            otp,
            id
          }
        });

        res.status(201).json({
          message: "OTP has been sent and verified successfully",
          data: axiosRes.data,  // optional: include response data from backend
        });
      } catch (err) {
        console.error('Error sending OTP:', err);
        res.status(500).json({
          error: "Failed to verify OTP. Please try again later.",
          details: err// optional: provide error details for debugging
        });
      }
      break;

    default:
      res.status(405).json({ message: "Method not allowed" });
      break;
  }
}
