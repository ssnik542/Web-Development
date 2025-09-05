import { createBrowserRouter, RouterProvider } from "react-router-dom"
import AppLayout from "./layouts/app-layout"
import LandingPage from "./Pages/LandingPage"
import Onboarding from "./Pages/Onboarding"
import JobListing from "./Pages/JobListing"
import JobPage from "./Pages/JobPage"
import PostJobs from "./Pages/PostJobs"
import SavedJobs from "./Pages/SavedJobs"
import MyJobs from "./Pages/MyJobs"
import './App.css';
import ProtectedRoute from "./components/protected-route"

function App() {

  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      children: [
        {
          path: '/',
          element: <LandingPage />
        },
        {
          path: '/onboarding',
          element: <ProtectedRoute><Onboarding /></ProtectedRoute>
        },
        {
          path: '/jobs',
          element: <ProtectedRoute><JobListing /></ProtectedRoute>
        },
        {
          path: '/job/:id',
          element: <ProtectedRoute><JobPage /></ProtectedRoute>
        },
        {
          path: '/post-job',
          element: <ProtectedRoute><PostJobs /></ProtectedRoute>
        },
        {
          path: '/saved-jobs',
          element: <ProtectedRoute><SavedJobs /></ProtectedRoute>
        },
        {
          path: '/my-jobs',
          element: <ProtectedRoute><MyJobs /></ProtectedRoute>
        }
      ]
    }
  ])
  return (
    <RouterProvider router={router} />
  )
}

export default App
