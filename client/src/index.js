import React from 'react';
import ReactDOM from 'react-dom';
import Home from './home/home';
import App from './App';
import Login from './main/login/login';

//user
import  IndexUser from './main/user/index_user';
import  HomeUser from './main/user/home_user';
import  PayUser from './main/user/pay_user';
import  ReceiptUser from './main/user/receipt_user';
import  RepairUser from './main/user/repair_user';
import {createBrowserRouter,RouterProvider,} from "react-router-dom";

//admin
const router = createBrowserRouter([
  {
  //home
    path: "/",
    element: <App/>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      }
    ],
  },
//user
  {
    path: "/user",
    element: <IndexUser/>,
    children: [
      {
        path: "/user/home",
        element: <HomeUser/>,
      },
      {
        path: "/user/pay",
        element: <PayUser />,
      },
      {
        path: "/user/receipt",
        element: <ReceiptUser />,
      },
      {
        path: "/user/repair",
        element: <RepairUser />,
      }
    ],
  },


]);

ReactDOM.render(
  <RouterProvider router={router} />,
  document.getElementById('root')
);
