import type { Workout } from './Workout';

export interface User {
  username: string | null;
  email: string | null;
  password: string | null;
  savedWorkouts: Workout[];
}
