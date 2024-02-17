import React, { Component, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { Grid, TextField, Box, Button, Badge } from "@mui/material";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "./css/motorcycle_add.css";
import "./css/motorcycle_info.css";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { useToasts } from 'react-toast-notifications';

function AddMotorcycle() {
  const [RegistrationNumber, setRegistrationNumber] = useState("");
  const [BucketNumber, setBucketNumber] = useState("");
  const [Brand, setBrand] = useState("");
  const [Model, setModel] = useState("");
  const [Color, setColor] = useState("");
  const [Price, setPrice] = useState("");
  const [Balance, setBalance] = useState("");
  const [image, setImage] = useState();
  const navigate = useNavigate();
  const { addToast } = useToasts();
  const [validationMessages, setValidationMessages] = useState({
    RegistrationNumber: '',
    BucketNumber: '',
    Brand: '',
    Model: '',
    Color: '',
    Price: '',
    // Add more fields as needed
  });

  const validateInput = () => {
    let isValid = true;
    const messages = {
      RegistrationNumber: '',
      BucketNumber: '',
      Brand: '',
      Model: '',
      Color: '',
      Price: '',
    };
    if (!RegistrationNumber) {
      isValid = false;
      messages.RegistrationNumber = 'กรุณาระบุเลขทะเบียน';
    }
    if (!BucketNumber) {
      isValid = false;
      messages.BucketNumber = 'กรุณาระบุขเลขตัวถัง';
    }
    if (!Brand) {
      isValid = false;
      messages.Brand = 'กรุณาระบุยี่ห้อ';
    }
    if (!Model) {
      isValid = false;
      messages.Model = 'กรุณาระบุรุ่น';
    }
    if (!Color) {
      isValid = false;
      messages.Color = 'กรุณาระบุสี';
    }
    if (!Price) {
      isValid = false;
      messages.Price = 'กรุณาระบุราคา';
    }
  
    setValidationMessages(messages);
    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isValid = validateInput();
  
    if (!isValid) {
      return;
    }
    if (!image) {
      Swal.fire({
        title: "กรุณาเลือกรูปภาพ",
        icon: "error",
        confirmButtonText: "ตกลง",
      });
      return;
    }
    const allMotorcycles = await fetchAllMotorcycles();
    const registrationExists = allMotorcycles.some(
      (motorcycle) =>
        motorcycle.MOTORCYCLE_REGISTRATION_NUMBER === RegistrationNumber
    );

    if (registrationExists) {
      Swal.fire({
        title: "เลขทะเบียนรถจักรยานยนต์มีอยู่ในระบบแล้ว",
        icon: "warning",
        confirmButtonText: "ตกลง",
      });
      return;
    }
    // addToast('กำลังบันทึกข้อมูล...', {
    //   appearance: 'info',
    //   autoDismiss: true,
    //   autoDismissTimeout: 4000, // 4000 มิลลิวินาที (4 วินาที)
    //   css: {
    //     width: '300px',
    //     height: '40px',
    //     backgroundColor: 'lightblue', // ปรับสีพื้นหลัง
    //     color: 'black', // ปรับสีตัวอักษร
    //     // คุณยังสามารถกำหนดค่า CSS อื่น ๆ ตามต้องการ
    //   },
    // });

    var resUploadImage = await uploadImage();
    if (!resUploadImage.error) {
      var raw = JSON.stringify({
        MOTORCYCLE_BALANCE: Price,
        MOTORCYCLE_PRICE: Price,
        MOTORCYCLE_BRAND: Brand,
        MOTORCYCLE_MODEL: Model,
        MOTORCYCLE_COLOR: Color,
        MOTORCYCLE_REGISTRATION_NUMBER: RegistrationNumber,
        MOTORCYCLE_BUCKET_NUMBER: BucketNumber,
        MOTORCYCLE_IMAGE: resUploadImage["secure_url"],
      });

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch("http://localhost:3001/api/v1/motorcycles/", requestOptions)
        .then((response) => response.text())
        .then((result) => {
          console.log(result);
          Swal.fire({
            title: "บันทึกข้อมูลสำเร็จ",
            icon: "success",
            confirmButtonText: "ตกลง",
          });
          navigate("/admin/chassis");
        })
        .catch((error) => console.log("error", error));
    }
  };

  const fetchAllMotorcycles = async () => {
    const response = await fetch("http://localhost:3001/api/v1/motorcycles/");
    const data = await response.json();
    return data;
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

  const uploadImage = async () => {
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
    }
  };

  //กลับหน้าก่อนหน้า
  const [gotoListMotorcycle, setGotoListMotorcycle] = useState(false);
  if (gotoListMotorcycle) {
    return <Navigate to="/admin/motorcycle" />;
  }
  return (
    <div>
      <div className="header-with-button with-underline">
        <div className="header"  style={{ paddingTop: "10px" }}>
          <h1 style={{ color: "#2196f3" }}>
            <div
              onClick={() => {
                setGotoListMotorcycle(true);
              }}
            >
              <i className="fa fa-arrow-left" aria-hidden="true" style={{ fontSize: "30px" }} >
                {" "}
                เพิ่มรถจักรยานยนต์
              </i>
            </div>
          </h1>
        </div>
        <form onSubmit={handleSubmit}>
          <button
            style={{
              backgroundColor: "#19C788",
              border: 0,
              borderRadius: "20px",
              width: "150px",
              height: "50px",
            }}
          >
            <FontAwesomeIcon icon={faSave} style={{ color: "white" }} />{" "}
            <span style={{ color: "white" }}>บันทึก</span>
          </button>
        </form>
      </div>
      <div class="Contrainer-form">
        <p
          style={{
            color: "#2196f3",
            fontSize: "25px",
            marginLeft: "20px",
            paddingTop: "10px",
            fontWeight: "bold",
          }}
        >
          ข้อมูลจักรยานยนต์
        </p>

        <div className="container">
          <div>
            <Row>
              <Col>
                <div>
                  <Box
                    style={{
                      width: "300px",
                      height: "300px",
                      marginTop: "10px",
                    }}
                    component="img"
                    src={image}
                  />
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Button
                    style={{
                      backgroundColor: "#ffffff",
                      border: "1px solid #1ba7e1",
                      borderRadius: "10px",
                      width: "120px",
                      height: "50px",
                      marginRight: "10px",
                    }}
                    onClick={handleRemoceImage}
                  >
                    <span style={{ color: "#1ba7e1", marginBottom: "2px" }}>
                      {" "}
                      ยกเลิกรูปภาพ
                    </span>
                  </Button>
                  <Button
                    style={{
                      backgroundColor: "#ffffff",
                      border: "1px solid #1ba7e1",
                      borderRadius: "10px",
                      width: "120px",
                      height: "50px",
                    }}
                    component="label"
                  >
                    <FontAwesomeIcon
                      icon={faPlusCircle}
                      className="mr-2"
                      style={{ color: "#1ba7e1" }}
                    />{" "}
                    <span style={{ color: "#1ba7e1", marginBottom: "2px" }}>
                      เพิ่มรูปภาพ
                    </span>
                    <input
                      accept="image/*"
                      type="file"
                      hidden
                      onChange={handleChangeImage}
                    />
                  </Button>
                </div>
              </Col>
            </Row>
          </div>
          <div>
            <Row>
              <Col style={{ width: "200px" }}>
                <p style={{ color: "#6c6c6c", width: "200px" }}>เลขทะเบียน</p>

                <TextField
                  id="RegistrationNumber"
                  type="text"
                  required
                  aria-describedby="basic-addon1"
                  onChange={(e) => setRegistrationNumber(e.target.value)}
                  sx={{ width: "400px", height: "10px", paddingBottom: "50px" }}
                  error={!!validationMessages.RegistrationNumber}
                  helperText={validationMessages.RegistrationNumber}
                />
              </Col>
              <Col>
                <p style={{ color: "#6c6c6c" }}>เลขตัวถัง</p>
                <TextField
                  id="BucketNumber"
                  type="text"
                  required
                  aria-describedby="basic-addon1"
                  onChange={(e) => setBucketNumber(e.target.value)}
                  sx={{ width: "400px", height: "10px", paddingBottom: "50px" }}
                  error={!!validationMessages.BucketNumber}
                  helperText={validationMessages.BucketNumber}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <p style={{ color: "#6c6c6c" }}>ยี่ห้อ</p>
                <TextField
                  id="Brand"
                  type="text"
                  required
                  aria-describedby="basic-addon1"
                  onChange={(e) => setBrand(e.target.value)}
                  sx={{ width: "400px", height: "10px", paddingBottom: "50px" }}
                  error={!!validationMessages.Brand}
                  helperText={validationMessages.Brand}
                />
              </Col>
              <Col>
                <p style={{ color: "#6c6c6c" }}>รุ่น</p>
                <TextField
                  id="Model"
                  type="text"
                  required
                  aria-describedby="basic-addon1"
                  onChange={(e) => setModel(e.target.value)}
                  sx={{ width: "400px", height: "10px", paddingBottom: "50px" }}
                  error={!!validationMessages.Model}
                  helperText={validationMessages.Model}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <p style={{ color: "#6c6c6c" }}>สี</p>
                <TextField
                  id="Color"
                  type="text"
                  required
                  aria-describedby="basic-addon1"
                  onChange={(e) => setColor(e.target.value)}
                  sx={{ width: "400px", height: "10px", paddingBottom: "50px" }}
                  error={!!validationMessages.Color}
                  helperText={validationMessages.Color}
                />
              </Col>
              <Col>
                <p style={{ color: "#858585" }}>ราคา</p>
                <TextField
                  id="Price"
                  type="text"
                  required
                  aria-describedby="basic-addon1"
                  onChange={(e) => setPrice(e.target.value)}
                  sx={{ width: "400px", height: "10px", paddingBottom: "50px" }}
                  error={!!validationMessages.Price}
                  helperText={validationMessages.Price}
                />
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AddMotorcycle;
