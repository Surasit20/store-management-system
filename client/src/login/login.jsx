import React, { Component, useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { withRouter } from "react-router";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

function Login() {
  const [IsAdmin, setIsAdmin] = useState(false);

  //   useEffect(() => {
  //     console.log(IsAdmin)
  //   });

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-custom-grey ">
        <div className="container-fluid row">
          <div className="col-6">
            <ul className="navbar-nav d-flex flex-row me-1 justify-content-center">
              <li className="nav-item me-3 me-lg-0">
                <a
                  className="nav-link text-back"
                  onClick={() => setIsAdmin(false)}
                >
                  {IsAdmin ? (
                    <p> เข้าสู่ระบบสำหรับผู้ใช้ </p>
                  ) : (
                    <strong>
                      <p> เข้าสู่ระบบสำหรับผู้ใช้ </p>
                    </strong>
                  )}
                </a>
              </li>
            </ul>
          </div>
          <div className="col-6">
            <ul className="navbar-nav d-flex flex-row me-1 justify-content-center">
              <li className="nav-item me-3 me-lg-0">
                <a
                  className="nav-link text-back"
                  onClick={() => setIsAdmin(true)}
                >
                  {IsAdmin ? (
                    <strong>
                      <p>เข้าสู่ระบบสำหรับแอดมิน</p>
                    </strong>
                  ) : (
                    <p>เข้าสู่ระบบสำหรับแอดมิน</p>
                  )}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div class="input-group mb-3">
        <span class="input-group-text" id="basic-addon1">
          ชื่อผู้ใช้
        </span>
        <input
          type="text"
          class="form-control"
          placeholder="Username"
          aria-label="Username"
          aria-describedby="basic-addon1"
        />
      </div>
      <form class="row g-3">
        <div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon1">
            รหัสผ่าน
          </span>
          <input
            type="password"
            class="form-control"
            placeholder="Password"
            aria-label="Password"
            aria-describedby="basic-addon1"
          />
        </div>

        <div className="">
          <button type="submit" class="btn btn-primary mb-3">
            เข้าสู่ระบบ
          </button>
        </div>
      </form>

      {IsAdmin ? (
        <div></div>
      ) : (
        <button type="button" className="btn btn-dark">
          สมัครสมาชิก
        </button>
      )}
    </div>
  );
}

export default Login;
