const typeDefs = `
  type Workout {
    id: ID!
    title: String!
    description: String!
    date: String!
  }

  type User {
    id: ID!
    username: String!
    email: String!
    savedBooks: [Book]
    bookCount: Int
  }

  type AuthPayload {
    token: String
    user: User
  }

  type Query {
    me: User
  }

  Mutation: {
    addWorkout: async (_: any, args: { title: string; description: string }) => {
      const newWorkout = new Workout(args);
      return await newWorkout.save();
    }
`;

export default typeDefs;