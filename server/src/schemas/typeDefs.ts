const typeDefs = `
  type Workout {
    bodyPart: String!
    equipment: String!
    gifUrl: String!
    id: String!
    name: String
    target: String
  }

  type User {
    id: ID!
    username: String!
    email: String!
    savedWorkouts: [Workout]
  }

  type AuthPayload {
    token: String
    user: User
  }

  type Query {
    me: User
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
    saveWorkout(workoutInput: WorkoutInput!): User
    deleteWorkout(workoutId: String!): User
  }

  input WorkoutInput {
    bodyPart: String!
    equipment: String!
    gifUrl: String!
    id: String!
    name: String
    target: String
  }
`;

export default typeDefs;