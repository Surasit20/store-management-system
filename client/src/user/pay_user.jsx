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
import moment from "moment";
import "moment/locale/th";
function PayUser() {
  moment.locale("th");
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [tell, setTell] = useState("");
  const [bucketNumber, setBucketNumber] = useState("");
  const [step, setStep] = useState(0);
  const [date, setDate] = useState(new Date());
  const [image, setImage] = useState();
  const [docNo, setdocNo] = useState("");
  const [user, setUser] = useState();

  useEffect(() => {
    const dataUser = JSON.parse(localStorage.getItem("user"));
    if (dataUser) {
      setUser(dataUser.data.user);
      setFullName(dataUser.data.user.USER_FULLNAME);
      setTell(dataUser.data.user.USER_TELL);
    }
  }, []);

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

  const handleConfirm = async (event) => {
    let imageUrl = await uploadImage();
    //moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    // setStep(2);
    // return;
    if (imageUrl != null) {
      console.log(imageUrl);
      let data = {
        MOTORCY_BUCKETNUMBER: bucketNumber,
        INSTALLMENTS_NO: docNo,
        MONTH_INSTALLMENTS_TIME: moment(date.getTime()).format("HH:mm"),
        MONTH_INSTALLMENTS_DATE: moment(new Date(), "yyyy-mm-dd HH:MM:ss"),
        MONTH_INSTALLMENTS_IMAGE: imageUrl["url"],
        INSTALLMENTS_STATUS: 0,
      };
      axios
        .post("http://localhost:3001/api/v1/month-installments", data)
        .then((response) => {
          console.log(response);
          if (response.status == 200) {
            console.log(response.status);
            setStep(2);
            //navigate("/user/home");
          }
        })
        .catch((err) => {
          console.log(err);
          Swal.fire({
            title: "บัคไงครับ",
            text: "บัคไงครับ",
            icon: "error",
            confirmButtonText: "ตกลง",
          });
        });
    }
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
      Swal.fire({
        title: "บัคไงครับ",
        text: "บัคไงครับ",
        icon: "error",
        confirmButtonText: "ตกลง",
      });
    }
  };

  function uuidv4() {
    return "ABCD-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8;
      setdocNo(crypto.randomUUID().toString(16));
    });
  }

  return (
    <div style={{height:'100vh'}}>
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
                value={fullName}
                disabled={true}
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
                value={tell.toString()}
                disabled={true}
              />
            </div>

            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                เลขตัวถัง
              </span>
              <input
                type="text"
                class="form-control"
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
          <p>วันที่ {moment(date.getTime()).format("D-MMMM-yyyy")} </p>
          <p>เวลา {moment(date.getTime()).format("HH:mm")} น.</p>
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

          <Button onClick={handleConfirm}>ยืนยัน</Button>
        </div>
      ) : (
        <div>
          <div className="bg-secondary">
            <div className="row d-flex">
              <p className="col d-flex justify-content-between">
                เลขที่ใบเสร็จ: {docNo}
              </p>
              <p className="col">
                วันที่: {moment(date.getTime()).format("D-MMMM-yyyy")}
              </p>
              <p className="col">
                เวลา: {moment(date.getTime()).format("HH:mm")} น.
              </p>
            </div>

            <div className="row">
              <p>ชื่อ-นามสกุล {fullName}</p>
            </div>

            <div className="row">
              <p>เบอร์โทรศัพท์ {tell}</p>
            </div>

            <div className="row">
              <p>เลขตัวถัง {bucketNumber}</p>
            </div>
          </div>
          <p className="text-success">
            ........ทำการชำระค่างวดสำเสร็จรอการตรวจสอบจากพนักงาน..........
          </p>
        </div>
      )}
    </div>
  );
}

export default PayUser;
