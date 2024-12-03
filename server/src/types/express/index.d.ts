declare namespace Express {
  interface Request {
    user: {
      _id: unknown;
      username: string;
    };
  }
}

export interface Workout {
  id: string;
  title: string;
  description: string;
  date: string;
}
