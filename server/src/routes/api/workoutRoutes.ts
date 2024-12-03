import express from 'express';
import { getDailyWorkout } from '../../controllers/workout-controller';

const router = express.Router();

router.get('/daily', getDailyWorkout); // Fetch daily workout

export default router;
