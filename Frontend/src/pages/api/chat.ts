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

  const { messages } = req.body;

  if (!messages) {
    return res.status(400).json({ error: 'Messages are required' });
  }

  const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
  const apiKey = process.env.AZURE_OPENAI_KEY;

  if (!endpoint || !apiKey) {
    return res.status(500).json({ error: 'Azure OpenAI endpoint or API key is not configured' });
  }

  try {
    const response = await fetch(endpoint as string, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify({
        messages,
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Error: ${response.status} - ${errorText}`);
      throw new Error(`Error: ${response.status} - ${errorText}`);
    }

    const data: OpenAIResponse = await response.json();
    console.log(data);

    res.status(200).json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export default handler;
