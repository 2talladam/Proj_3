import { Schema, type Document } from 'mongoose';

export interface IWorkout extends Document {
  title: string;
  description: string;
  date: Date;
}

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedBooks` array in User.js
const workoutSchema = new Schema<IWorkout>({

  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now
  },
});

export default workoutSchema;
