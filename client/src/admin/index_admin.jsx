import React, { Component, useState } from "react";
import { Outlet } from "react-router-dom";
import { withRouter } from "react-router";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "../admin/css/index_admin.css";
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
        <nav className="navbar  navbar-height bg ">
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
        <nav className="navbar navbar-expand-lg bg-custom ">
          <div className="container-fluid row">
            <div className="col">
              <ul
                className={`navbar-nav d-flex flex-row me-1 justify-content-center`}
              >
                <li className="nav-item me-1 me-lg-0">
                  <a className={`nav-link text-back`} href="/admin/motorcycle">
                    {location.pathname === "/admin/motorcycle" ? (
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
            <div className="col">
              <ul
                className={`navbar-nav d-flex flex-row me-1 justify-content-center`}
              >
                <li className="nav-item me-3 me-lg-0">
                  <a className={`nav-link text-back`} href="/admin/user/user-info">
                    {location.pathname === "/admin/user/user-info" ? (
                      <u>
                        <p>
                          <strong>ผู้ใช้งาน</strong>
                        </p>
                      </u>
                    ) : (
                      <p>ผู้ใช้งาน</p>
                    )}
                  </a>
                </li>
              </ul>
            </div>
            <div className="col">
              <ul className="navbar-nav d-flex flex-row me-1 justify-content-center">
                <li className="nav-item me-3 me-lg-0">
                  <a className="nav-link text-back" href="/admin/repair/repair-info">
                    {location.pathname === "/admin/repair/repair-info" ? (
                      <u>
                        <p>
                          <strong>รับข้อมูลส่งซ่อม</strong>
                        </p>
                      </u>
                    ) : (
                      <p>รับข้อมูลส่งซ่อม</p>
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
                          <strong>ยอดค้างชำระ</strong>
                        </p>
                      </u>
                    ) : (
                      <p>ยอดค้างชำระ</p>
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
                          <strong>ยอดประจำวัน</strong>
                        </p>
                      </u>
                    ) : (
                      <p>ยอดประจำวัน</p>
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
                          <strong>ตรวจสอบการชำระ</strong>
                        </p>
                      </u>
                    ) : (
                      <p>ตรวจสอบการชำระ</p>
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
                          <strong>ยืนยันเจ้าของรถ</strong>
                        </p>
                      </u>
                    ) : (
                      <p>ยืนยันเจ้าของรถ</p>
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
