import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux';
import appStore from './utils/appStore';
import "react-toastify/dist/ReactToastify.css";
import Login from './components/Login';
import Browse from './components/Browse'
import MovieDetails from './components/MovieDetails';
import GptSearch from './components/GptSearch';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
function App() {
  // Create a client
  const queryClient = new QueryClient()

  const appRouter = createBrowserRouter([
    {
      path: '/',
      element: <Login />
    },
    {
      path: '/browse',
      element: <Browse />
    },
    {
      path: '/GptSearch',
      element: <GptSearch />
    },
    {
      path: '/movie/:id',
      element: <MovieDetails />
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={appStore}>
        <div>
          <RouterProvider router={appRouter}>
          </RouterProvider>
        </div>
      </Provider>
    </QueryClientProvider>
  )
}

export default App
