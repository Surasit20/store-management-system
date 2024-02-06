/* eslint-disable no-unused-expressions */
/* eslint-disable no-restricted-globals */
//import { Navigate } from 'react-router-dom';
import "./home.css";
import Login from "../login/login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import CardCar from "../component/card_car";
import ImageList from "@mui/material/ImageList";
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
  const [dataSoures, setdataSoures] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/api/v1/motorcycles").then((response) => {
      var data = response.data.filter(
        (f) => f.USER_ID == null
      );
      setdataSoures(data);
    });
  }, []);

  return (
    <div className="container-fluid">
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

      <div>
      <ImageList

        style={{ overflow: "hidden" }}
        rowHeight={164}
        cols={4}
      >
        {dataSoures.map((i) => {
          return (
            <CardCar
              key={i.MOTORCYCLE_ID}
              MOTORCYCLE_BRAND={i.MOTORCYCLE_BRAND}
              MOTORCYCLE_PRICE={i.MOTORCYCLE_PRICE}
              MOTORCYCLE_IMAGE={i.MOTORCYCLE_IMAGE}
              MOTORCYCLE_MODEL={i.MOTORCYCLE_MODEL}
              MOTORCYCLE_COLOR={i.MOTORCYCLE_COLOR}
              MOTORCYCLE_BUCKET_NUMBER={i.MOTORCYCLE_BUCKET_NUMBER}
              MOTORCYCLE_REGISTRATION_NUMBER={i.MOTORCYCLE_REGISTRATION_NUMBER}
              MOTORCYCLE_ID={i.MOTORCYCLE_ID}
              IS_RECEIPT={false}
              INSTALLMENTS_ID={null}
            ></CardCar>
          );
        })}
      </ImageList>
    </div>

    </div>
  );
}
export default Home;
