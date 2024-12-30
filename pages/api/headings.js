import Cors from 'cors';
import initMiddleware from '../../lib/init-middleware';

const corsMiddleware = initMiddleware(
  Cors({
    methods: ['POST', 'GET'],
    origin: ['http://localhost:3000', 'moz-extension://*'], // Adjust origins as needed
  })
);

let storedHeadings = [];

export default async function handler(req, res) {
  await corsMiddleware(req, res);

  if (req.method === 'POST') {
    try {
      const { headings } = req.body;

      // Log headings to terminal for debugging
      console.log('Received headings:', headings);

      // Store headings for later retrieval
      storedHeadings = headings;

      // Respond with a static message and stored headings
      res.status(200).json({ message: 'Mary on a Mary on a cross', headings: storedHeadings });
    } catch (error) {
      console.error('Error processing headings:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else if (req.method === 'GET') {
    try {
      // Respond with the stored headings and a static message
      res.status(200).json({ message: 'Mary on a Mary on a cross', headings: storedHeadings });
    } catch (error) {
      console.error('Error retrieving headings:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST', 'GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

