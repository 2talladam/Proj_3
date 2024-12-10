import { gql } from '@apollo/client';

export const GET_ME = gql`
  query GetMe {
    me {
      id
      username
      email
      savedWorkouts {
        bodyPart
        equipment
        gifUrl
        id
        name
        target
      }
    }
  }
`;

export const GET_WORKOUTS = gql`
  query GetWorkouts {
    workouts {
        bodyPart
        equipment
        gifUrl
        id
        name
        target
    }
  }
`;