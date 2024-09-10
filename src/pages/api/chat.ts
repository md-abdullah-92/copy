// pages/api/openai.ts
import type { NextApiRequest, NextApiResponse } from 'next';

interface OpenAIResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
}

interface ErrorResponse {
  error: string;
}

type Data = OpenAIResponse | ErrorResponse;

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  //const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
  const apiKey = '94c9226d60eb4132b443df26a6072ac9';

  if (!apiKey) {
    return res.status(500).json({ error: 'Azure OpenAI endpoint or API key is not configured' });
  }

  try {
    const response = await fetch(`https://agribazaar.openai.azure.com/openai/deployments/gpt-35-turbo/chat/completions?api-version=2023-03-15-preview`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify({
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],

      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error: ${response.status} - ${errorText}`);
    }

    const data: OpenAIResponse = await response.json();
    res.status(200).json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export default handler;
