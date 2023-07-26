/* eslint-disable no-unused-expressions */
/* eslint-disable no-restricted-globals */
import React, { Component } from "react";
//import { Navigate } from 'react-router-dom';
import "./home.css";
import Login from "../login/login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

function Home() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-custom-grey ">
        <div className="container-fluid">
          <ul className="navbar-nav d-flex flex-row me-1">
            <li className="nav-item me-3 me-lg-0">
              <a className="nav-link text-back">
                <i className="fas fa-envelope mx-1"></i>รถจักรยานยนต์
              </a>
            </li>
          </ul>
          <ul className="navbar-nav d-flex flex-row me-1">
            <li className="nav-item me-3 me-lg-0">
              <a className="nav-link text-back" href="/login">
                <i className="fas fa-envelope mx-1"></i>เข้าสู่ระบบ
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
export default Home;
