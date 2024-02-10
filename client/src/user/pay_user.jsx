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
import Autocomplete from '@mui/material/Autocomplete';

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

  const [top100Films, setTop100Films] = useState([]);



  useEffect(() => {
    const dataUser = JSON.parse(localStorage.getItem("user"));
    if (dataUser) {
      setUser(dataUser.data.user);
      setFullName(dataUser.data.user.USER_FULLNAME);
      setTell(dataUser.data.user.USER_TELL);

      axios.get("http://localhost:3001/api/v1/motorcycles").then((response) => {
        var data = response.data.filter(
          (f) => f.USER_ID == dataUser.data.user.USER_ID
        );
        var res = []
        data.forEach(element => {

          console.log(element.MOTORCYCLE_REGISTRATION_NUMBER)
          res.push(element.MOTORCYCLE_REGISTRATION_NUMBER)

        });
        setTop100Films(res)
      });
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
        MOTORCYCLE_REGISTRATION_NUMBER: bucketNumber,
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
            title: "เกิดข้อผิดพลาด",
            text: "เกิดข้อผิดพลาด",
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

      if (image == null || image == undefined) {
        Swal.fire({
          title: "กรุณาเพิ่มรูปภาพ",
          text: "กรุณาเพิ่มรูปภาพ",
          icon: "error",
          confirmButtonText: "ตกลง",
        });

        return;
      }
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
        title: "เกิดข้อผิดพลาด",
        text: "เกิดข้อผิดพลาด",
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
    <div style={{ height: '100vh' }}>
      {step == 0 ? (
        <div className="container-lg d-flex justify-content-center">
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

            {/* <div className="input-group mb-3">
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
            </div> */}

            <div className="input-group mb-3 ">
              <span className="input-group-text" id="basic-addon1">
                เลขทะเบียนรถ
              </span>
              <Autocomplete
                value={bucketNumber}
                onChange={(event, newValue) => {
                  setBucketNumber(newValue);
                }}
                disablePortal
                id="combo-box-demo"
                options={top100Films}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="" />}
              />

              {/* <input
                type="text"
                class="form-control"
                aria-describedby="basic-addon1"
                onChange={(e) => setBucketNumber(e.target.value)}
              /> */}
            </div>

            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                จำนวนเงิน
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
            <p>ช่องทางชำระเงิน: ธนาคารออมสิน เลขบัญชี 02159631457 ชื่อบัญชี นายองอาจ นิ้วเนย</p>
            <p className="text-danger">                             **บัญชีธนาคารของผู้ดูแลระบบ</p>

            <div className="my-4 d-flex justify-content-center">
              <img src="/images/qrCode.png" style={{ width: "200px" }} className="d-flex justify-content-center"></img>

            </div>

            <div className=" d-flex justify-content-center">

              <button type="submit" className="btn btn-success mb-3 btn-lg">
                ยืนยัน
              </button>
            </div>
            <img>
            </img>

          </form>
        </div>
      ) : step == 1 ? (

        <div className="d-flex justify-content-start mx-5 my-3">


          <div >
            <h2>ชำระค่างวด</h2>
            <div>
              <p>เลขใบเสร็จ {docNo}</p>

            </div>

            <div>
              <p>วันที่ {moment(date.getTime()).format("D-MMMM-yyyy")} </p>

            </div>

            <div>
              <p>เวลา {moment(date.getTime()).format("HH:mm")} น.</p>

            </div>

            <div>
              <p>ชื่อ-นามสกุล {fullName}</p>

            </div>

            <div>
              <p>เบอร์โทรศัพท์ {tell}</p>

            </div>


            <div>
              <p>ทะเบียนรถ {bucketNumber}</p>

            </div>

            <div>
              <p>หลักฐานการโอนเงิน</p>

            </div>

            <div className="my-3">
              <Box
                component="img"
                sx={{
                  height: 200,
                  width: 200,
                  borderColor: "primary.main",
                  borderRadius: "20%",
                  border: 4,
                }}
                src={image}
              />

            </div>
            <div>
              <Button variant="contained" component="label">
                เลือกรูปภาพ
                <input
                  accept="image/*"
                  type="file"
                  hidden
                  onChange={handleChangeImage}
                />
              </Button>

              <span className="mx-2">
              <Button variant="contained" color="success" onClick={handleConfirm}>ยืนยัน</Button>


              </span>
            </div>

            <div className="my-2">

            </div>
          </div>
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
