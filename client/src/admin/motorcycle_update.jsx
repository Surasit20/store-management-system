import React, { Component, useState, useEffect } from "react";
import "../admin/css/motorcycle_update.css";
import { useParams } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { withRouter } from "react-router";
import { Navigate } from "react-router-dom";
import { Grid, TextField } from "@mui/material";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";

function UpdateMotorcycle() {
  const { MOTORCYCLE_ID } = useParams();
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
        }
      })
      .catch((error) => console.log("error", error));
  }, [MOTORCYCLE_ID]);

  const handleSubmit = (event) => {
    event.preventDefault();
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
  };

  const [RegistrationNumber, setRegistrationNumber] = useState("");
  const [BucketNumber, setBucketNumber] = useState("");
  const [Brand, setBrand] = useState("");
  const [Model, setModel] = useState("");
  const [Color, setColor] = useState("");
  const [Price, setPrice] = useState("");
  const [Balance, setBalance] = useState("");
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div class="row">
          <Row>
            <div class="container-textfile">
              <Col>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="RegistrationNumber"
                    label="เลขทะเบียน"
                    variant="outlined"
                    fullWidth
                    required
                    onChange={(e) => setRegistrationNumber(e.target.value)}
                    value={RegistrationNumber}
                  ></TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="BucketNumber"
                    label="เลขตัวถัง"
                    variant="outlined"
                    fullWidth
                    required
                    onChange={(e) => setBucketNumber(e.target.value)}
                    value={BucketNumber}
                  ></TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="Brand"
                    label="ยี่ห้อ"
                    variant="outlined"
                    fullWidth
                    required
                    onChange={(e) => setBrand(e.target.value)}
                    value={Brand}
                  ></TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="Model"
                    label="รุ่น"
                    variant="outlined"
                    fullWidth
                    required
                    onChange={(e) => setModel(e.target.value)}
                    value={Model}
                  ></TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="Color"
                    label="สี"
                    variant="outlined"
                    fullWidth
                    required
                    onChange={(e) => setColor(e.target.value)}
                    value={Color}
                  ></TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="Price"
                    label="ราคา"
                    variant="outlined"
                    fullWidth
                    required
                    onChange={(e) => setPrice(e.target.value)}
                    value={Price}
                  ></TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="Balance"
                    label="ยอดคงเหลือ"
                    variant="outlined"
                    fullWidth
                    required
                    onChange={(e) => setBalance(e.target.value)}
                    value={Balance}
                  ></TextField>
                </Grid>
              </Col>
            </div>
            <div className="container-image">
              <Col>
                ใส่รูป
              </Col>
            </div>
          </Row>
        </div>

        <button type="submit" variant="contained" class="btn btn-primary mb-3">
          บันทึก
        </button>
      </form>
    </div>
  );
}
export default UpdateMotorcycle;
