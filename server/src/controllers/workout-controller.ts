import { Request, Response } from 'express';
import Workout from '../models/Workout';

export const getDailyWorkout = async (req: Request, res: Response) => {
  const { title, description } = req.body;

  try {
    const newWorkout = new Workout({ title, description });
    await newWorkout.save();
    res.status(201).json(newWorkout);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get workout' });
  }
};
