const typeDefs = `
  type Workout {
    bodyPart: String!
    equipment: String!
    gifUrl: String!
    id: String!
    _id: ID!
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
    deleteWorkout(id: String!): User
  }

  input WorkoutInput {
    id: String!
    name: String!
    bodyPart: String!
    equipment: String!
    gifUrl: String!
  }
`;

export default typeDefs;