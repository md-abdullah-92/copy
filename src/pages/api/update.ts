import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';
import { IncomingForm, File } from 'formidable';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const form = new IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ message: 'Error parsing form data' });
    }

    const { name, password, gender, phone, address, upazila, zila, organization, email } = fields;
    console.log('fields', fields);
    if (!email || !Array.isArray(email)) {
      console.log('Email is required.');
      return res.status(400).json({ message: 'Email is required.' });
    }

    const updateRequestBody = {
      name: name ? name[0] : '',
      password: password ? password[0] : '',
      gender: gender ? gender[0] : '',
      phone: phone ? phone[0] : '',
      address: address ? address[0] : '',
      upazila: upazila ? upazila[0] : '',
      zila: zila ? zila[0] : '',
      organization: organization ? organization[0] : '',
    };

    const formData = new FormData();
    formData.append('updateRequest', JSON.stringify(updateRequestBody));

    const file = files.avatar as File | File[] | undefined;
    if (file) {
      const avatarFile = Array.isArray(file) ? file[0] : file;
      const avatarFilePath = avatarFile.filepath;
      const avatarFileName = avatarFile.originalFilename || undefined; // Ensure it's not null

      if (avatarFilePath) {
        formData.append('avatar', fs.createReadStream(avatarFilePath), avatarFileName);
      }
    }

    const updateUrl = `http://localhost:8080/api/user/update`;

    try {
      const response = await axios.put(updateUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          ...formData.getHeaders(),
        },
        params: { email: email[0] }, 
      });

      return res.status(200).json(response.data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err.message);
        return res.status(500).json({ message: err.message });
      } else {
        console.error('An unknown error occurred');
        return res.status(500).json({ message: 'An unknown error occurred' });
      }
    }
  });
}
