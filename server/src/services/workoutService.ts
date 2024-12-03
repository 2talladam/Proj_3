import Workout from '../models/Workout';

export const getRandomWorkout = async () => {
  return await Workout.aggregate([{ $sample: { size: 1 } }]);
};
