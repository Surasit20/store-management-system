import React, { Component, useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { withRouter } from "react-router";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Navigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [IsAdmin, setIsAdmin] = useState(false);
  const [gotoIndexAdmin, setGotoIndexAdmin] = React.useState(false);
  if (gotoIndexAdmin) {
    return <Navigate to="/admin/motorcycle" />;
  }

  //   useEffect(() => {
  //     console.log(IsAdmin)
  //   });

  const handleSubmit = (event) => {
    event.preventDefault();
    let data = { USER_EMAIL: email, USER_PASSWORD: password };
    console.log(data);
    event.preventDefault();
    localStorage.setItem("user", null);
    axios
      .post("https://back-end-store-management-system.onrender.com/api/v1/auth/login", data)
      .then((response) => {
        console.log(response);
        if (response.status == 200 && response.data.data.user.USER_CHECK != "admin") {
          localStorage.setItem("user", JSON.stringify(response.data));
          console.log(response.status);
          navigate("/user/home");
        }
        else{
          Swal.fire({
            title: "อีเมล์/รหัส ผ่านไม่ถูกต้อง",
            text: "โปรดกรอกอีเมล์หรือรหัสผ่านใหม่",
            icon: "error",
            confirmButtonText: "ตกลง",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          title: "อีเมล์/รหัส ผ่านไม่ถูกต้อง",
          text: "โปรดกรอกอีเมล์หรือรหัสผ่านใหม่",
          icon: "error",
          confirmButtonText: "ตกลง",
        });
      });
  };

  const handleSubmitAdmin = (event) => {
    event.preventDefault();
    let data = { USER_EMAIL: email, USER_PASSWORD: password };

    event.preventDefault();
    localStorage.setItem("user", null);
    axios
      .post("https://back-end-store-management-system.onrender.com/api/v1/auth/login", data)
      .then((response) => {

        console.log(response.data);
        if (response.status == 200 && response.data.data.user.USER_CHECK == "admin") {
          localStorage.setItem("user", JSON.stringify(response.data));
          console.log(response.status);
          setGotoIndexAdmin(true);
        }else{
          Swal.fire({
            title: "อีเมล์/รหัส ผ่านไม่ถูกต้อง",
            text: "โปรดกรอกอีเมล์หรือรหัสผ่านใหม่",
            icon: "error",
            confirmButtonText: "ตกลง",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          title: "อีเมล์/รหัส ผ่านไม่ถูกต้อง",
          text: "โปรดกรอกอีเมล์หรือรหัสผ่านใหม่",
          icon: "error",
          confirmButtonText: "ตกลง",
        });
      });
  };

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

      <form onSubmit={handleSubmit}>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">
            ชื่อผู้ใช้
          </span>
          <input
            type="text"
            class="form-control"
            placeholder="Username"
            aria-label="Username"
            aria-describedby="basic-addon1"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <form className="row g-3">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              รหัสผ่าน
            </span>
            <input
              type="password"
              class="form-control"
              placeholder="Password"
              aria-label="Password"
              aria-describedby="basic-addon1"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div></div>
        </form>
        
        {IsAdmin ? (
          <div>
            <button
              onClick={handleSubmitAdmin}
            >
              ไปจ้า
            </button>
          </div>
        ) : (
          <div className="">
            <button type="submit" className="btn btn-primary mb-3">
              เข้าสู่ระบบ
            </button>

            <a href="/register">
              <button type="button" className="btn btn-dark" hr>
                สมัครสมาชิก
              </button>
            </a>
          </div>
        )}
      </form>
    </div>
  );
}

export default Login;
