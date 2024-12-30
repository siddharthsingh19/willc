// pages/api/headings.js

import Cors from 'cors';
import initMiddleware from '../../lib/init-middleware';

const corsMiddleware = initMiddleware(
  Cors({
    methods: ['POST'],
    origin: ['http://localhost:3000', 'moz-extension://*'], // Adjust origins as needed
  })
);

export default async function handler(req, res) {
  await corsMiddleware(req, res);

  if (req.method === 'POST') {
    try {
      const { headings } = req.body;
      
      // Log headings to terminal for debugging
      console.log('Received headings:', headings);
      
      // Respond with a message
      res.status(200).json({ message: 'Mary on a Mary on a cross' });
    } catch (error) {
      console.error('Error processing headings:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

