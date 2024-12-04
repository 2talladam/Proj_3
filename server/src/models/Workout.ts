import { Schema, type Document } from 'mongoose';

export interface IWorkout extends Document {
  bodyPart: string;
  equipment: string;
  gifUrl: string;
  id: string;
  name: string;
  target: string;
}

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedBooks` array in User.js
const workoutSchema = new Schema<IWorkout>({
  bodyPart: 
    {
      type: String,
    },
  equipment: {
    type: String,
  },
  gifUrl: {
    type: String,
  },
  id: {
    type: String,
  },
  name: {
    type: String,
  },
  target: {
    type: String,
  },
});

export default workoutSchema;
