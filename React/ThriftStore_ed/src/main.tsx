import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Cart from './Components/Cart/cart.tsx';
import Products from './Components/Products/Products.tsx';
import Error from './Error.tsx';
import Product from './Components/Products/Product.tsx';

const BrowserRouter = createBrowserRouter([{
  path: '/',
  element: <App />,
  errorElement: <Error />,
  children: [
    {
      path: '/',
      element: <Products />
    },
    {
      path: 'cart',
      element: <Cart />
    }, {
      path: 'products/:id',
      element: <Product />
    }]
}]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={BrowserRouter} />
  </React.StrictMode>,
)
