import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import Loader from "./components/Loader.tsx";
import Stopwatch from "./pages/apps/Stopwatch.tsx";
import Toss from "./pages/apps/Toss.tsx";
import Coupon from "./pages/apps/Coupon.tsx";
import Product from "./pages/Management/Product.tsx";
import ProductManagement from "./pages/Management/MangProd.tsx";
import TransactionManagement from "./pages/Management/TransMang.tsx";
const Dashboard = lazy(() => import("./pages/Dashboard.tsx"));
const Products = lazy(() => import("./pages/Products.tsx"));
const Customers = lazy(() => import("./pages/Customers.tsx"));
const Transaction = lazy(() => import("./pages/Transaction.tsx"));
const Bar = lazy(() => import("./pages/charts/Bar.tsx"));
const Pie = lazy(() => import("./pages/charts/Pie.tsx"));
const Line = lazy(() => import("./pages/charts/Line.tsx"));
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/admin/dashboard",
        element: (
          <Suspense fallback={<Loader />}>
            <Dashboard />
          </Suspense>
        ),
      },
      {
        path: "/admin/products",
        element: (
          <Suspense fallback={<Loader />}>
            <Products />{" "}
          </Suspense>
        ),
      },
      {
        path: "/admin/customers",
        element: (
          <Suspense fallback={<Loader />}>
            {" "}
            <Customers />
          </Suspense>
        ),
      },
      {
        path: "/admin/transaction",
        element: (
          <Suspense fallback={<Loader />}>
            <Transaction />
          </Suspense>
        ),
      },
      {
        path: "/admin/transaction/:id",
        element: <TransactionManagement />,
      },
      {
        path: "/admin/bar",
        element: (
          <Suspense fallback={<Loader />}>
            <Bar />
          </Suspense>
        ),
      },
      {
        path: "/admin/pie",
        element: (
          <Suspense fallback={<Loader />}>
            <Pie />
          </Suspense>
        ),
      },
      {
        path: "/admin/line",
        element: (
          <Suspense fallback={<Loader />}>
            <Line />
          </Suspense>
        ),
      },
      {
        path: "/admin/stopwatch",
        element: <Stopwatch />,
        loader: Loader,
      },
      {
        path: "/admin/coupon",
        element: <Coupon />,
        loader: Loader,
      },
      {
        path: "/admin/toss",
        element: <Toss />,
        loader: Loader,
      },
      {
        path: "/admin/product/new",
        element: <Product />,
        loader: Loader,
      },
      {
        path: "/admin/product/:id",
        element: <ProductManagement />,
        loader: Loader,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
