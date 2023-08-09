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

function PayUser() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [tell, setTell] = useState("");
  const [bucketNumber, setBucketNumber] = useState("");
  const [step, setStep] = useState(0);
  const [date, setDate] = useState(new Date());
  const handleSubmit = (event) => {
    setStep(1);
  };
  return (
    <div>
      {step == 0 ? (
        <div>
          <form onSubmit={handleSubmit}>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                ชื่อ-นามสกุล
              </span>
              <input
                type="text"
                class="form-control"
                placeholder="Username"
                aria-label="Username"
                aria-describedby="basic-addon1"
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                เบอร์โทรศัพท์
              </span>
              <input
                type="text"
                class="form-control"
                placeholder="Username"
                aria-label="Username"
                aria-describedby="basic-addon1"
                onChange={(e) => setTell(e.target.value)}
              />
            </div>

            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                เลขตัวถัง
              </span>
              <input
                type="text"
                class="form-control"
                placeholder="Username"
                aria-label="Username"
                aria-describedby="basic-addon1"
                onChange={(e) => setBucketNumber(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary mb-3">
              ยืนยัน
            </button>
          </form>
        </div>
      ) : step == 1 ? (
        <div>
          <p>เลขใบเสร็จ</p>
          <p>วันที่ {date.toUTCString()} </p>
          <p>
            เวลา {date.getHours()} :{date.getMinutes()}
          </p>
          <p>ชื่อ-นามสกุล {fullName}</p>
          <p>เบอร์โทรศัพท์ {tell}</p>
          <p>เลขตัวถัง {bucketNumber}</p>
        </div>
      ) : (
        <div>2</div>
      )}
    </div>
  );
}

export default PayUser;
