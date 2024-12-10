import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation createUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      token
      user {
        id
        username
        email
      }
    }
  }
`;

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        username
        email
      }
    }
  }
`;


export const SAVE_WORKOUT = gql`
mutation SaveWorkout($workoutInput: WorkoutInput!) {
  saveWorkout(workoutInput: $workoutInput) {
      id
      username
      email
      savedWorkouts {
        id
        name
      }
    }
  }
`;


export const DELETE_WORKOUT = gql`
  mutation DeleteWorkout($id: String!) {
    deleteWorkout(_id: $id) {
      id
      username
      email
      savedWorkouts {
        id
        name
      }
    }
  }
`;
