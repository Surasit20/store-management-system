import React from 'react';
import ReactDOM from 'react-dom';
import Home from './home/home';
import App from './App';
import Login from './login/login';
import {createBrowserRouter,RouterProvider,} from "react-router-dom";

//user
import  IndexUser from './user/index_user';
import  HomeUser from './user/home_user';
import  PayUser from './user/pay_user';
import  ReceiptUser from './user/receipt_user';
import  RepairUser from './user/repair_user';

//admin
import IndexAdmin from './admin/index_admin';
import ChassisAdmin from './admin/chassis_admin';
import DailySummaryAdmin from './admin/daily_summary';
import HomeAdmin from './admin/home_admin';
import MotorcycleInfoAdmin from './admin/motorcycle_info_admin';
import OverdueAdmin from './admin/overdue_admin';
import PaymentCheckAdmin from './admin/payment_check_admin';
import RepairInfoAdmin from './admin/repair_info_admin';
import AddMotorcycle from './admin/motorcycle_add';

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

//admin
{
  path: "/admin",
  element: <IndexAdmin/>,
  children: [
    {
      path: "/admin/daily-summary",
      element: <DailySummaryAdmin/>,
    },
    {
      path: "/admin/home",
      element: <HomeAdmin/>,
    },
    {
      path: "/admin/motorcycle",
      element: <MotorcycleInfoAdmin/>,
    },
    {
      path: "/admin/overdue",
      element: <OverdueAdmin />,
    },
    {
      path: "/admin/payment-check",
      element: <PaymentCheckAdmin />,
    },
    {
      path: "/admin/repair-info",
      element: <RepairInfoAdmin />,
    },
    {
      path: "/admin/chassis",
      element: <ChassisAdmin/>,
    },
    {
      path : "/admin/add-motorcycle",
      element : <AddMotorcycle/>
    }
  ],
},
]);

ReactDOM.render(
  <RouterProvider router={router} />,
  document.getElementById('root')
);
