import React, { Component, useState } from "react";
import { Outlet } from "react-router-dom";
import { withRouter } from "react-router";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
function Register() {
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
            <div className="navbar-collapse justify-content-center"></div>
          </div>
        </nav>

        <nav class="navbar navbar-light bg-light">
          <div class="container-fluid justify-content-center">
            <a class="navbar-brand justify-content-center" href="#">
              สมัครสมาชิก
            </a>
          </div>
        </nav>
      </div>
      <div className="container-fluid bg-warning bg-gradient container-user">
        <div class="input-group flex-nowrap">
          <span class="input-group-text" id="addon-wrapping">
            ชื่อ-นามสกุล
          </span>
          <input
            type="text"
            class="form-control"
            placeholder="กรอก ชื่อ-นามสกุล"
            aria-label="ชื่อ-นามสกุล"
            aria-describedby="addon-wrapping"
          />
        </div>

        <div class="input-group flex-nowrap">
          <span class="input-group-text" id="addon-wrapping">
            เลขบัตรประจำตัวประชาชน
          </span>
          <input
            type="text"
            class="form-control"
            //placeholder="กรอก ชื่อ-นามสกุล"
            aria-label="เลขบัตรประจำตัวประชาชน"
            aria-describedby="addon-wrapping"
          />
        </div>

        <div class="input-group flex-nowrap">
          <span class="input-group-text" id="addon-wrapping">
            เบอร์โทรศัพท์
          </span>
          <input
            type="text"
            class="form-control"
            //placeholder="กรอก ชื่อ-นามสกุล"
            aria-label="เบอร์โทรศัพท์"
            aria-describedby="addon-wrapping"
          />
        </div>

        <div class="input-group flex-nowrap">
          <span class="input-group-text" id="addon-wrapping">
            อาชีพ
          </span>
          <input
            type="text"
            class="form-control"
            //placeholder="กรอก ชื่อ-นามสกุล"
            aria-label="อาชีพ"
            aria-describedby="addon-wrapping"
          />
        </div>
      </div>
    </div>
  );
}
export default Register;
