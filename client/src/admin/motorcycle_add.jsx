import React, { Component, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { withRouter } from "react-router";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { Grid, TextField, Box, Button, Badge } from "@mui/material";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusCircle,
  faPencilSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import "./css/motorcycle_add.css";
import Swal from "sweetalert2";

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

  const handleSubmit = async (event) => {
    if (!image) {
      Swal.fire({
        title: "กรุณาเลือกรูปภาพ",
        icon: "error",
        confirmButtonText: "ตกลง",
      });
    }
    event.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var resUploadImage = await uploadImage();
    if (!resUploadImage.error) {
      var raw = JSON.stringify({
        MOTORCYCLE_BALANCE: Balance,
        MOTORCYCLE_PRICE: Price,
        MOTORCYCLE_BRAND: Brand,
        MOTORCYCLE_MODEL: Model,
        MOTORCYCLE_COLOR: Color,
        MOTORCYCLE_REGISTRATION_NUMBER: RegistrationNumber,
        MOTORCYCLE_BUCKET_NUMBER: BucketNumber,
        MOTORCYCLE_IMAGE: resUploadImage["secure_url"],
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch("https://back-end-store-management-system.onrender.com/api/v1/motorcycles/", requestOptions)
        .then((response) => response.text())
        .then((result) => {
          console.log(result);
          navigate("/admin/motorcycle");
        })
        .catch((error) => console.log("error", error));
    }
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
      //setLoading(false);
    }
  };

  //กลับหน้าก่อนหน้า
  const [gotoListMotorcycle, setGotoListMotorcycle] = useState(false);
  if (gotoListMotorcycle) {
    return <Navigate to="/admin/motorcycle" />;
  }
  return (
    <div>
      <div className="header">
        <h1>
          <div
            onClick={() => {
              setGotoListMotorcycle(true);
            }}
          >
            <i className="fa fa-arrow-left" aria-hidden="true">
              {" "}
              เพิ่มรถจักรยานยนต์
            </i>
          </div>
        </h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="container">
          <div className="container-img">
            <div>
              <Box class="box-img" component="img" src={image} />
            </div>
            <div>
              <div>
                <Button onClick={handleRemoceImage}>ยกเลิกรูปภาพ</Button>
                <Button variant="contained" component="label">
                  อัพโหลดรูปภาพ
                  <input
                    accept="image/*"
                    type="file"
                    hidden
                    onChange={handleChangeImage}
                  />
                </Button>
              </div>
            </div>
          </div>

          <div>
            <Row>
              <Col>
                <p>เลขทะเบียน</p>

                <input
                  id="RegistrationNumber"
                  type="text"
                  class="form-control"
                  required
                  aria-describedby="basic-addon1"
                  onChange={(e) => setRegistrationNumber(e.target.value)}
                />
              </Col>
              <Col>
                <p>เลขตัวถัง</p>
                <input
                  id="BucketNumber"
                  type="text"
                  class="form-control"
                  required
                  aria-describedby="basic-addon1"
                  onChange={(e) => setBucketNumber(e.target.value)}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <p>ยี่ห้อ</p>
                <input
                  id="Brand"
                  type="text"
                  class="form-control"
                  required
                  aria-describedby="basic-addon1"
                  onChange={(e) => setBrand(e.target.value)}
                />
              </Col>
              <Col>
                <p>รุ่น</p>
                <input
                  id="Model"
                  type="text"
                  class="form-control"
                  required
                  aria-describedby="basic-addon1"
                  onChange={(e) => setModel(e.target.value)}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <p>สี</p>
                <input
                  id="Color"
                  type="text"
                  class="form-control"
                  required
                  aria-describedby="basic-addon1"
                  onChange={(e) => setColor(e.target.value)}
                />
              </Col>
              <Col>
                <p>ราคา</p>
                <input
                  id="Price"
                  type="text"
                  class="form-control"
                  required
                  aria-describedby="basic-addon1"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <p>ยอดคงเหลือ</p>
                <input
                  id="Balance"
                  type="text"
                  class="form-control"
                  required
                  aria-describedby="basic-addon1"
                  onChange={(e) => setBalance(e.target.value)}
                />
              </Col>
              <Col></Col>
            </Row>
          </div>
        </div>
        <div className="save-button">
          <button
            type="submit"
            variant="contained"
            className="btn btn-success mb-3"
          >
            บันทึก
          </button>
        </div>
      </form>
    </div>
  );
}
export default AddMotorcycle;
