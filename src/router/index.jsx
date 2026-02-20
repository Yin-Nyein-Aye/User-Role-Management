import { createBrowserRouter } from "react-router";
import { lazy, Suspense } from "react";
import Layout from "../pages/Layout";
import ErrorPage from "../pages/ErrorPage";
import ErrorBoundary from "../components/ErrorBoundaries";

const Home = lazy(() => import("../pages/Home"));
const Register = lazy(() => import("../pages/Register"));
const Login = lazy(() => import("../pages/Login"));
const Products = lazy(() => import("../pages/Products"));

const withSuspense = (Component) => (
  <ErrorBoundary>
    <Suspense fallback={<div>Loading...</div>}>
      <Component />
    </Suspense>
  </ErrorBoundary>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />, 
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