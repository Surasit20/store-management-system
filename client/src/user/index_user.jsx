import React, { Component, useState } from "react";
import { Outlet } from "react-router-dom";
import { withRouter } from "react-router";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
function IndexUser() {
  // const [currentPage, setCurrentPage] = useState(new Map([
  //   { key: 'home', value: true },
  //   { key: 'pay', value: false  },
  //   { key: 'receipt', value: false },
  //   { key: 'repair', value: false },
  // ]));
  const location = useLocation();
  console.log(location.pathname);

  return (
    <div className="App">
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark navbar-height">
          <div className="container-fluid">
            <div className="navbar-collapse justify-content-center">
              <a className="navbar-brand" href="/user/home">
                <p className="header-navber">
                  <a>ร้านรถจักรยานยนต์มือ 2 (สำหรับผู้ใช้)</a>
                </p>
              </a>
            </div>
          </div>
        </nav>
        <nav className="navbar navbar-expand-lg bg-custom-grey ">
          <div className="container-fluid row">
            <div className="col-3">
              <ul
                className={`navbar-nav d-flex flex-row me-1 justify-content-center`}
              >
                <li className="nav-item me-3 me-lg-0">
                  <a className={`nav-link text-back`} href="/user/home">
                    {location.pathname === "/user/home" ? (
                      <u>
                        <p>
                          <strong>รถจักรยานยนต์</strong>
                        </p>
                      </u>
                    ) : (
                      <p>รถจักรยานยนต์</p>
                    )}
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-3">
              <ul className="navbar-nav d-flex flex-row me-1 justify-content-center">
                <li className="nav-item me-3 me-lg-0">
                  <a className="nav-link text-back" href="/user/pay">
                    {location.pathname === "/user/pay" ? (
                      <u>
                        <p>
                          <strong>ชำระค่างวด</strong>
                        </p>
                      </u>
                    ) : (
                      <p>ชำระค่างวด</p>
                    )}
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-3">
              <ul className="navbar-nav d-flex flex-row me-1 justify-content-center">
                <li className="nav-item me-3 me-lg-0">
                  <a className="nav-link text-back" href="/user/receipt">
                    {location.pathname === "/user/receipt" ? (
                      <u>
                        <p>
                          <strong>สถานะการชำระค่างวดและใบเสร็จ</strong>
                        </p>
                      </u>
                    ) : (
                      <p>สถานะการชำระค่างวดและใบเสร็จ</p>
                    )}
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-3">
              <ul className="navbar-nav d-flex flex-row me-1 justify-content-center">
                <li className="nav-item me-3 me-lg-0">
                  <a className="nav-link text-back" href="/user/repair">
                    {location.pathname === "/user/repair" ? (
                      <u>
                        <p>
                          <strong> ข้อมูลส่งซ่อม</strong>
                        </p>
                      </u>
                    ) : (
                      <p> ข้อมูลส่งซ่อม</p>
                    )}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
      <div className="container-fluid bg-warning bg-gradient ">
        <Outlet />
      </div>
    </div>
  );
}
export default IndexUser;
