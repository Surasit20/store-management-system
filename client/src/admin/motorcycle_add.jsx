import React, { Component, useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { withRouter } from "react-router";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { Grid, TextField, Box, Button, Badge } from "@mui/material";
import UploadImage from "../component/upload_image";
function AddMotorcycle() {
  const [RegistrationNumber, setRegistrationNumber] = useState("");
  const [BucketNumber, setBucketNumber] = useState("");
  const [Brand, setBrand] = useState("");
  const [Model, setModel] = useState("");
  const [Color, setColor] = useState("");
  const [Price, setPrice] = useState("");
  const [Balance, setBalance] = useState("");
  const [image, setImage] = useState();

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
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:3001/api/v1/motorcycles/", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
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
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Grid item xs={12} sm={6}>
          <TextField
            id="RegistrationNumber"
            label="เลขทะเบียน"
            variant="outlined"
            fullWidth
            required
            onChange={(e) => setRegistrationNumber(e.target.value)}
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
          ></TextField>
        </Grid>
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

        <button type="submit" variant="contained" class="btn btn-primary mb-3">
          บันทึก
        </button>
      </form>
    </div>
  );
}
export default AddMotorcycle;
