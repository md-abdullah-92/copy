// pages/api/create-payment-intent.ts
import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe("sk_test_51PuEpHRuCZ3PE4bbBEessUwblED2XNTa3kh6eV4HlI2WTihx8GnfwD9wwntypQLzvnrW8eY0s9vF2K8yCwFEU1Wu00p1tsHnbe", {
  apiVersion: '2024-06-20',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { totalPrice } = req.body;

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(Number(totalPrice) * 100), // Amount in cents
        currency: 'usd',
        payment_method_types: ['card'],
      });

      res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
