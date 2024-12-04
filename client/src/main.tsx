import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
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
        element: <WorkoutPlanner />,
      },
      {
        path: '/saved',
        element: <SavedWorkouts />
      },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
);
