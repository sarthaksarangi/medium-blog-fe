import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signin from "./pages/Signin.tsx";
import Signup from "./pages/Signup.tsx";
import Blog from "./pages/Blog.tsx";

const router = createBrowserRouter([
  {
    index: true,
    element: <App />,
  },
  {
    path: "/signup",
    element: <Signin />,
  },
  {
    path: "/signin",
    element: <Signup />,
  },
  {
    path: "/blog/:id",
    element: <Blog />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
