import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signin from "./pages/Signin.tsx";
import Signup from "./pages/Signup.tsx";
import Blog from "./pages/Blog.tsx";
import Blogs from "./pages/Blogs.tsx";
import Publish from "./pages/Publish.tsx";
import Layout from "./components/Layout.tsx";

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
    path: "/",
    element: <Layout />, // Wrap these routes with Layout
    children: [
      {
        path: "/blog/:id",
        element: <Blog />,
      },
      {
        path: "/blogs",
        element: <Blogs />,
      },
      {
        path: "/publish",
        element: <Publish />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
