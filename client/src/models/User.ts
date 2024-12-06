import type { Book } from './Workout';

export interface User {
  username: string | null;
  email: string | null;
  password: string | null;
  savedBooks: Book[];
}
