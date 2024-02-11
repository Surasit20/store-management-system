import React, { Component, useState, useEffect } from "react";
import "../admin/css/motorcycle_update.css";
import "./css/motorcycle_add.css";
import { useParams , useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { withRouter } from "react-router";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { Grid, TextField, Button, Box } from "@mui/material";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faPlusCircle } from "@fortawesome/free-solid-svg-icons";

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
<div className="header-with-button with-underline">
        <div className="header">
          <h1 style={{ color: "#2196f3" }}>
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
             src={imageNew ?? imageOld}
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
              <Col>
                <p style={{ color: "#858585" }}>เลขทะเบียน</p>

                <TextField
                  id="RegistrationNumber"
                  type="text"
                  required
                  aria-describedby="basic-addon1"
                  onChange={(e) => setRegistrationNumber(e.target.value)}
                  value={RegistrationNumber}
                  sx={{ width: "400px", height: "10px", paddingBottom: "50px" }}
                />
              </Col>
              <Col>
                <p style={{ color: "#858585" }}>เลขตัวถัง</p>
                <TextField
                  id="BucketNumber"
                  type="text"
                  required
                  aria-describedby="basic-addon1"
                  onChange={(e) => setBucketNumber(e.target.value)}
                  value={BucketNumber}
                  sx={{ width: "400px", height: "10px", paddingBottom: "50px" }}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <p style={{ color: "#858585" }}>ยี่ห้อ</p>
                <TextField
                  id="Brand"
                  type="text"
                  required
                  aria-describedby="basic-addon1"
                  onChange={(e) => setBrand(e.target.value)}
                  value={Brand}
                  sx={{ width: "400px", height: "10px", paddingBottom: "50px" }}
                />
              </Col>
              <Col>
                <p style={{ color: "#858585" }}>รุ่น</p>
                <TextField
                  id="Model"
                  type="text"
                  required
                  aria-describedby="basic-addon1"
                  onChange={(e) => setModel(e.target.value)}
                  value={Model}
                  sx={{ width: "400px", height: "10px", paddingBottom: "50px" }}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <p style={{ color: "#858585" }}>สี</p>
                <TextField
                  id="Color"
                  type="text"
                  required
                  aria-describedby="basic-addon1"
                  onChange={(e) => setColor(e.target.value)}
                  value={Color}
                  sx={{ width: "400px", height: "10px", paddingBottom: "50px" }}
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
                  value={Price}
                  sx={{ width: "400px", height: "10px", paddingBottom: "50px" }}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <p style={{ color: "#858585" }}>ยอดคงเหลือ</p>
                <TextField
                  id="Balance"
                  type="text"
                  required
                  aria-describedby="basic-addon1"
                  onChange={(e) => setBalance(e.target.value)}
                  sx={{ width: "400px", height: "10px", paddingBottom: "50px" }}
                  value={Balance}
                />
              </Col>
              <Col></Col>
            </Row>
          </div>
        </div>
      </div>
    </div>


  );
}
export default UpdateMotorcycle;
