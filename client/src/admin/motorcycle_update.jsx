import React, { Component, useState, useEffect } from "react";
import "../admin/css/motorcycle_update.css";
import { useParams , useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { withRouter } from "react-router";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { Grid, TextField, Button, Box } from "@mui/material";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Swal from "sweetalert2";

function UpdateMotorcycle() {
  const { MOTORCYCLE_ID } = useParams();
  const [RegistrationNumber, setRegistrationNumber] = useState("");
  const [BucketNumber, setBucketNumber] = useState("");
  const [Brand, setBrand] = useState("");
  const [Model, setModel] = useState("");
  const [Color, setColor] = useState("");
  const [Price, setPrice] = useState("");
  const [Balance, setBalance] = useState("");
  const [imageOld, setImageOld] = useState();
  const [imageNew, setImageNew] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      "http://localhost:3001/api/v1/motorcycles/" + MOTORCYCLE_ID,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result["status"] == "ok") {
          setRegistrationNumber(
            result["result"]["MOTORCYCLE_REGISTRATION_NUMBER"]
          );
          setBucketNumber(result["result"]["MOTORCYCLE_BUCKET_NUMBER"]);
          setBrand(result["result"]["MOTORCYCLE_BRAND"]);
          setModel(result["result"]["MOTORCYCLE_MODEL"]);
          setColor(result["result"]["MOTORCYCLE_COLOR"]);
          setPrice(result["result"]["MOTORCYCLE_PRICE"]);
          setBalance(result["result"]["MOTORCYCLE_BALANCE"]);
          setImageOld(result["result"]["MOTORCYCLE_IMAGE"]);
        }
      })
      .catch((error) => console.log("error", error));
  }, [MOTORCYCLE_ID]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (imageNew != null || imageNew != undefined) {
      Swal.fire({
        title: "กรุณาเลือกรูปภาพ",
        icon: "error",
        confirmButtonText: "ตกลง",
      });
    
    } else {
      console.log("case2");
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      var raw = JSON.stringify({
        MOTORCYCLE_BALANCE: Balance,
        MOTORCYCLE_PRICE: Price,
        MOTORCYCLE_BRAND: Brand,
        MOTORCYCLE_MODEL: Model,
        MOTORCYCLE_COLOR: Color,
        MOTORCYCLE_REGISTRATION_NUMBER: RegistrationNumber,
        MOTORCYCLE_BUCKET_NUMBER: BucketNumber,
        MOTORCYCLE_IMAGE: imageOld,
      });

      var requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(
        `http://localhost:3001/api/v1/motorcycles/${MOTORCYCLE_ID}`,
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));
        navigate("/admin/motorcycle");
    }
  };

  const handleChangeImage = (event) => {
    const newImage = event.target.files[0];
    if (newImage) {
      setImageNew(URL.createObjectURL(newImage));
    }
  };

  const handleRemoceImage = (event) => {
    setImageNew("");
  };

  const uploadImage = async () => {
    try {
      const responseBlob = await fetch(imageNew);
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
              แก้ไขข้อมูลรถจักรยานยนต์
            </i>
          </div>
        </h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="container">
          <div className="container-img">
            <div>
            <div>
          <Box
           class="box-img"
             component="img"
             src={imageNew ?? imageOld}
           /> </div>
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
                  value={RegistrationNumber}
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
                  value={BucketNumber}
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
                  value={Brand}
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
                  value={Model}
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
                  value={Color}
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
                  value={Price}
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
                  value={Balance}
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
export default UpdateMotorcycle;
