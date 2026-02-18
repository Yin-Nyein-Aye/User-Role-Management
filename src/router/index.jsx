import { createBrowserRouter } from "react-router";
import { lazy, Suspense } from "react";
import Layout from "../pages/Layout";

const Home = lazy(() => import("../pages/Home"));
const Register = lazy(() => import("../pages/Register"));
const Login = lazy(() => import("../pages/Login"));
const Products = lazy(() => import("../pages/Products"));

const withSuspense = (Component) => (
  <Suspense fallback={<div>Loading...</div>}>
    <Component />
  </Suspense>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children : [
      {
        index : true,
        element : withSuspense(Home),
      },
      {
        path : "/register",
        element : withSuspense(Register)
      },
      {
        path : "/login",
        element : withSuspense(Login)
      },
      {
        path : "/products",
        element : withSuspense(Products)
      }
    ]
  },
]);
export default router