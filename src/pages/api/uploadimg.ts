import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import fetch from 'node-fetch';
import FormData from 'form-data';
import { IncomingForm } from 'formidable';

export const config = {
  api: {
    bodyParser: false,
  },
};

type ProcessedFiles = Array<[string, formidable.File]>;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  let status = 200,
    resultBody = { status: 'ok', message: 'Files were uploaded successfully' };

  /* Get files using formidable */
  const files = await new Promise<ProcessedFiles | undefined>((resolve, reject) => {
    const form = new IncomingForm();
    const files: ProcessedFiles = [];
    form.on('file', (field, file) => {
      files.push([field, file]);
    });
    form.on('end', () => resolve(files));
    form.on('error', err => reject(err));
    form.parse(req, () => {
      // Parsing complete
    });
  }).catch(e => {
    console.log(e);
    status = 500;
    resultBody = {
      status: 'fail',
      message: 'Upload error',
    };
  });

  if (files?.length) {
    /* Add files to FormData */
    const formData = new FormData();
    for (const file of files) {
      formData.append('avatar', fs.createReadStream(file[1].filepath)); // Use 'avatar' as the field name
    }

    /* Send request to another server */
    const response = await fetch('http://localhost:8080/api/user/uploadimg', {
      headers: formData.getHeaders(),
      method: 'POST',
      body: formData,
    });

    // Handle response from the server
    if (!response.ok) {
      status = 500;
      resultBody = {
        status: 'fail',
        message: 'Failed to upload files to the server',
      };
    }
  }

  res.status(status).json(resultBody);
};

export default handler;
