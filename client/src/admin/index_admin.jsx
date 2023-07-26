import React, { Component, useState } from "react";
import { Outlet } from "react-router-dom";
import { withRouter } from "react-router";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
function IndexAdmin() {
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
              <a className="navbar-brand" href="/admin/home">
                <p className="header-navber">
                  <a>ร้านรถจักรยานยนต์มือ 2 (สำหรับแอดมิน)</a>
                </p>
              </a>
            </div>
          </div>
        </nav>
        <nav className="navbar navbar-expand-lg bg-custom-grey ">
          <div className="container-fluid row">
            <div className="col-2">
              <ul
                className={`navbar-nav d-flex flex-row me-1 justify-content-center`}
              >
                <li className="nav-item me-3 me-lg-0">
                  <a className={`nav-link text-back`} href="/admin/motorcycle">
                    {location.pathname === "/admin/motorcycle" ? (
                      <u>
                        <p>
                          <strong>ข้อมูลของรถจักรยานยนต์</strong>
                        </p>
                      </u>
                    ) : (
                      <p>ข้อมูลของรถจักรยานยนต์</p>
                    )}
                  </a>
                </li>
              </ul>
            </div>
            <div className="col">
              <ul className="navbar-nav d-flex flex-row me-1 justify-content-center">
                <li className="nav-item me-3 me-lg-0">
                  <a className="nav-link text-back" href="/admin/repair-info">
                    {location.pathname === "/admin/repair-info" ? (
                      <u>
                        <p>
                          <strong>รับข้อมูลส่งซ่อมจากลูกค้า</strong>
                        </p>
                      </u>
                    ) : (
                      <p>รับข้อมูลส่งซ่อมจากลูกค้า</p>
                    )}
                  </a>
                </li>
              </ul>
            </div>
            <div className="col">
              <ul className="navbar-nav d-flex flex-row me-1 justify-content-center">
                <li className="nav-item me-3 me-lg-0">
                  <a className="nav-link text-back" href="/admin/overdue">
                    {location.pathname === "/admin/overdue" ? (
                      <u>
                        <p>
                          <strong>เช็ดยอดค้างชำระค่างวด</strong>
                        </p>
                      </u>
                    ) : (
                      <p>เช็ดยอดค้างชำระค่างวด</p>
                    )}
                  </a>
                </li>
              </ul>
            </div>

            <div className="col">
              <ul className="navbar-nav d-flex flex-row me-1 justify-content-center">
                <li className="nav-item me-3 me-lg-0">
                  <a className="nav-link text-back" href="/admin/daily-summary">
                    {location.pathname === "/admin/daily-summary" ? (
                      <u>
                        <p>
                          <strong>สรุปยอดค่างวดประจำวัน</strong>
                        </p>
                      </u>
                    ) : (
                      <p>สรุปยอดค่างวดประจำวัน</p>
                    )}
                  </a>
                </li>
              </ul>
            </div>

            <div className="col">
              <ul className="navbar-nav d-flex flex-row me-1 justify-content-center">
                <li className="nav-item me-3 me-lg-0">
                  <a className="nav-link text-back" href="/admin/payment-check">
                    {location.pathname === "/admin/payment-check" ? (
                      <u>
                        <p>
                          <strong>ตรวจสอบการชำระและออกใบเสร็จ</strong>
                        </p>
                      </u>
                    ) : (
                      <p>ตรวจสอบการชำระและออกใบเสร็จ</p>
                    )}
                  </a>
                </li>
              </ul>
            </div>

            <div className="col">
              <ul className="navbar-nav d-flex flex-row me-1 justify-content-center">
                <li className="nav-item me-3 me-lg-0">
                  <a className="nav-link text-back" href="/admin/chassis">
                    {location.pathname === "/admin/chassis" ? (
                      <u>
                        <p>
                          <strong>กรอกข้อมูลเลขตัวถัง</strong>
                        </p>
                      </u>
                    ) : (
                      <p>กรอกข้อมูลเลขตัวถัง</p>
                    )}
                  </a>
                </li>
              </ul>
            </div>
            <div className="col">
              <ul className="navbar-nav d-flex flex-row me-1 justify-content-center">
                <li className="nav-item me-3 me-lg-0">
                  <a className="nav-link text-back" href="/admin/payment-check">
                    {location.pathname === "/admin/payment-check" ? (
                      <u>
                        <p>
                          <strong>ออกจากระบบ</strong>
                        </p>
                      </u>
                    ) : (
                      <p>ออกจากระบบ</p>
                    )}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
      <div className="container-fluid bg-warning bg-gradient container-user">
        <Outlet />
      </div>
    </div>
  );
}
export default IndexAdmin;
