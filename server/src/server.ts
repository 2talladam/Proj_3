import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { fileURLToPath } from 'url';
import path from 'path';
import type { Request, Response } from 'express';
import { typeDefs, resolvers } from './schemas/index.js';
import db from './config/connection.js';
import { authenticateToken } from './services/auth.js';
import workoutsRouter from './routes/workoutsRouter.js'; 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set up Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startApolloServer = async () => {
  await server.start();
  await db();
  console.log('Database connected successfully.');

  const PORT = process.env.PORT || 3001;
  const app = express();

  // Middleware
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  // Add RESTful workout routes
  app.use('/api/workouts', workoutsRouter); // Your new workout routes

  // Set up GraphQL endpoint
  app.use('/graphql', expressMiddleware(server, {
    context: ({ req }) => {
      return authenticateToken({ req });
    },
  }));

  // Serve static files if in production
  if (process.env.NODE_ENV === 'production') {
    const staticPath = path.join(__dirname, '../../client/dist');
    console.log('Serving static files from:', staticPath);
    app.use(express.static(path.join(__dirname, '../../client/dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
    });
  }

  // Start the server
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
  });
};

startApolloServer();
