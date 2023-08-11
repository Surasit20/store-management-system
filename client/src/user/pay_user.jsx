import React, { Component, useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { withRouter } from "react-router";
import { Grid, TextField, Box, Button, Badge } from "@mui/material";
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
  const [image, setImage] = useState();
  const [docNo, setdocNo] = useState("");
  const handleSubmit = (event) => {
    setStep(1);
    uuidv4();
  };

  const handleChangeImage = (event) => {
    const newImage = event.target.files[0];
    if (newImage) {
      setImage(URL.createObjectURL(newImage));
    }
  };

  const handleRemoceImage = (event) => {
    setImage("");
  };

  const handleConfirm = (event) => {
    let data = {
      MOTORCY_BUCKETNUMBER: bucketNumber,
      INSTALLMENTS_NO: docNo,
      INSTALLMENTS_TIME: date.getTime,
      INSTALLMENTS_DATE: date.getTimezoneOffset,
      INSTALLMENTS_IMAGE: "กดเกดเ",
    };
    axios
      .post("http://localhost:3001/api/v1/auth/login", data)
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          localStorage.setItem("user", JSON.stringify(response.data));
          console.log(response.status);
          navigate("/user/home");
        }
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          title: "อีเมล์/รหัส ผ่านไม่ถูกต้อง",
          text: "โปรดกรอกอีเมล์หรือรหัสผ่านใหม่",
          icon: "error",
          confirmButtonText: "หน้าปิ",
        });
      });
  };

  const uploadImage = async () => {
    //setLoading(true);

    //formData.append("cloud_name", process.env.REACT_APP_CLOUDINARY_CLOUD_NAME);
    //formData.append("folder", "Cloudinary-React");
    try {
      const responseBlob = await fetch(image);
      const blob = await responseBlob.blob();
      const file = new File([blob], "filename.jpg", { type: "image/jpeg" });

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "szopv83k");

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dx59hbzcc/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const res = await response.json();
      return res;
    } catch (error) {
      console.log(error);
      //setLoading(false);
    }
  };

  function uuidv4() {
    return "ABCD-xxxxxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8;
      setdocNo(v.toString(16));
    });
  }

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
          <p>เลขใบเสร็จ {docNo}</p>
          <p>วันที่ {date.toUTCString()} </p>
          <p>
            เวลา {date.getHours()} :{date.getMinutes()}
          </p>
          <p>ชื่อ-นามสกุล {fullName}</p>
          <p>เบอร์โทรศัพท์ {tell}</p>
          <p>เลขตัวถัง {bucketNumber}</p>
          <p>หลักฐานการโอนเงิน</p>

          <div>
            <Box
              component="img"
              sx={{
                height: 300,
                width: 300,
                borderColor: "primary.main",
                borderRadius: "50%",
                border: 15,
              }}
              src={image}
            />

            <Button onClick={handleRemoceImage}>ล้างรูป</Button>
          </div>
          <div>
            <Button variant="contained" component="label">
              Upload File
              <input
                accept="image/*"
                type="file"
                hidden
                onChange={handleChangeImage}
              />
            </Button>
          </div>

          <Button onClick={handleConfirm}>ล้างรูป</Button>
        </div>
      ) : (
        <div>2</div>
      )}
    </div>
  );
}

export default PayUser;
