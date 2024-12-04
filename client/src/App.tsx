import './App.css';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Routes, Route } from 'react-router-dom';
import AppNavbar from './components/Navbar';
import WorkoutPlanner from './pages/workout';
import SavedWorkouts from './pages/SavedWorkouts';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('id_token') : null;
  console.log("Auth Token:", token);

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <>
        <AppNavbar />
        <Routes>
          <Route path='/' element={<WorkoutPlanner />} />
          <Route path='/saved' element={<SavedWorkouts />} />
        </Routes>
      </>
    </ApolloProvider>
  );
}

export default App;
