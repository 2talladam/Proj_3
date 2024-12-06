import express, { Request, Response } from 'express';
import fetch from 'node-fetch';

const router = express.Router();

// Route to fetch exercises by body part
router.get('/exercises/:bodyPart', async (req: Request, res: Response) => {
  const bodyPart = req.params.bodyPart;
  const apiKey = process.env.EXERCISE_API_KEY;

  try {
    const response = await fetch(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}?limit=10&offset=0`, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': apiKey!,
        'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching exercises: ${response.statusText}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching exercises:', error);
    res.status(500).json({ error: 'Failed to fetch exercises.' });
  }
});

export default router;
