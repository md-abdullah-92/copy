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
      // Extract role from query parameters and ensure unique variable names
      const queryRole = req.query.role as string | undefined;
      const getUrl = process.env.USER_SERVICE_BASEURL+`/api/profile${queryRole ? `?role=${queryRole}` : ''}`;

      try {
        const resData = await axios.get(getUrl, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: req.headers.authorization,
          },
        });
        const profiles = resData.data;
        res.status(200).json(profiles);
      } catch (err) {
        console.error(err);
        res.status(500).end();
      }
      break;

    case 'POST':
      // Ensure unique variable names for POST request body
      const { name: postName, email: postEmail, role: postRole } = req.body;
      const postBody = {
        name: postName,
        email: postEmail,
        role: postRole, // Include role in the request body
      };
      const postUrl = process.env.USER_SERVICE_BASEURL + '/api/profile';

      try {
        const axiosRes = await axios.post(postUrl, postBody, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: req.headers.authorization,
          },
        });
        const profile = axiosRes.data;
        res.status(201).json(profile);
      } catch (err) {
        console.error(err);
        res.status(500).end();
      }
      break;

    case 'PUT':
      // Ensure unique variable names for PUT request body
      const { id: putId, name: putName, email: putEmail, role: putRole } = req.body;
      const putBody = {
        id: putId,
        name: putName,
        email: putEmail,
        role: putRole, // Include role in the request body
      };
      const putUrl = process.env.USER_SERVICE_BASEURL + '/api/profile/update';

      try {
        const axiosRes = await axios.put(putUrl, putBody, {
          headers: {
            'Content-Type': 'application/json',
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

    default:
      res.status(405).end();
      break;
  }
}
