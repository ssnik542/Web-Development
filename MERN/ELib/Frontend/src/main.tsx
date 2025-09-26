import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import NoteList from "./components/NoteList";
import NotePage from "./Pages/NotePage";
import EditNotePage from "./Pages/EditNotePage";
import UserDashboard from "./Pages/UserDashboard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthLayout from "./components/AuthLayout";
import CreateNote from "./Pages/CreateNote";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <NoteList />,
      },
      {
        path: "/note/create",
        element: <CreateNote />,
      },
      {
        path: "/signIn",
        element: (
          <AuthLayout>
            <SignIn />
          </AuthLayout>
        ),
      },
      {
        path: "/signUp",
        element: (
          <AuthLayout>
            <SignUp />
          </AuthLayout>
        ),
      },
      {
        path: "/note/:id",
        element: <NotePage />,
      },
      {
        path: "/note/edit/:id",
        element: <EditNotePage />,
      },
      {
        path: "/user/dashboard",
        element: <UserDashboard />,
      },
    ],
  },
]);
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
