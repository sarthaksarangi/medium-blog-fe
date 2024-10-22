import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signin from "./pages/Signin.tsx";
import Signup from "./pages/Signup.tsx";
import Blog from "./pages/Blog.tsx";
import Blogs from "./pages/Blogs.tsx";

const router = createBrowserRouter([
  {
    index: true,
    element: <App />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/blog/:id",
    element: <Blog />,
  },
  {
    path: "/blogs",
    element: <Blogs />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
