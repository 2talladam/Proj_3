import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';
import Home from './pages/SearchBooks';
import SavedWorkouts from './pages/SavedWorkouts';
import WorkoutPlanner from './pages/workout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <h1 className='display-2'>Wrong page!</h1>,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/saved',
        element: <SavedWorkouts />
      },
      {
        path: '/workout',
        element: <WorkoutPlanner />
      },                                                    
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
);
