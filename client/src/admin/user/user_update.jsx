import React, { Component, useState, useEffect } from "react";
import "../user/css/user_update.css";
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

export default function UserUpdateAdmin() {
  const { USER_ID } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("http://localhost:3001/api/v1/users/" + USER_ID, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result["status"] == "ok") {
          setCodeNumber(result["result"]["USER_CODE_NUMBER"]);
          setFullName(result["result"]["USER_FULLNAME"]);
          setBirthday(result["result"]["USER_BIRTHDAY"]);
          setTell(result["result"]["USER_TELL"]);
          setOccupation(result["result"]["USER_OCCUPATION"]);
          setHouseNumber(result["result"]["USER_HOUSE_NUMBER"]);
          setGroup(result["result"]["USER_GROUP"]);
          setAlley(result["result"]["USER_ALLEY"]);
          setRoad(result["result"]["USER_ROAD"]);
          setSubDistrict(result["result"]["USER_SUB_DISTRICT"]);
          setDistrict(result["result"]["USER_DISTRICT"]);
          setProvince(result["result"]["USER_PROVINCE"]);
          setPostalCode(result["result"]["USER_POSTAL_CODE"]);
        }
      })
      .catch((error) => console.log("error", error));
  }, [USER_ID]);

  const handleSubmit = (event) => {
    event.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      USER_CODE_NUMBER: CodeNumber,
      USER_FULLNAME: FullName,
      USER_BIRTHDAY: BirthDay,
      USER_TELL: Tell,
      USER_OCCUPATION: Occupation,
      USER_HOUSE_NUMBER: HouseNumber,
      USER_GROUP: Group,
      USER_ALLEY: Alley,
      USER_ROAD: Road,
      USER_SUB_DISTRICT: SubDistrict,
      USER_DISTRICT: District,
      USER_PROVINCE: Province,
      USER_POSTAL_CODE: PostalCode,
    });

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`http://localhost:3001/api/v1/users/${USER_ID}`, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
    navigate("/admin/user/user-info");
  };
  const [CodeNumber, setCodeNumber] = useState("");
  const [FullName, setFullName] = useState("");
  const [BirthDay, setBirthday] = useState("");
  const [Tell, setTell] = useState("");
  const [Occupation, setOccupation] = useState("");
  const [HouseNumber, setHouseNumber] = useState("");
  const [Group, setGroup] = useState("");
  const [Alley, setAlley] = useState("");
  const [Road, setRoad] = useState("");
  const [SubDistrict, setSubDistrict] = useState("");
  const [District, setDistrict] = useState("");
  const [Province, setProvince] = useState("");
  const [PostalCode, setPostalCode] = useState("");

  return (
    <diV>
          <div className="header">
    <h1>
    <strong>ข้อมูลสมาชิก</strong>
    </h1>
  </div>
   
      <form onSubmit={handleSubmit}>
        <Grid item xs={10} sm={6}>
          <TextField
            id="CodeNumber"
            label="เลขประจำตัวบัตรประชาชน"
            variant="outlined"
            fullWidth
            required
            onChange={(e) => setCodeNumber(e.target.value)}
            value={CodeNumber}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="FullName"
            label="ชื่อ-นามสกุล"
            variant="outlined"
            fullWidth
            required
            onChange={(e) => setFullName(e.target.value)}
            value={FullName}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="BirthDay"
            label="วัน/เดือน/ปี เกิด"
            variant="outlined"
            fullWidth
            required
            onChange={(e) => setBirthday(e.target.value)}
            value={BirthDay}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="Tell"
            label="เบอร์โทร"
            variant="outlined"
            fullWidth
            required
            onChange={(e) => setTell(e.target.value)}
            value={Tell}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="Occupation"
            label="อาชีพ"
            variant="outlined"
            fullWidth
            required
            onChange={(e) => setOccupation(e.target.value)}
            value={Occupation}
          ></TextField>
        </Grid>
        <Row>
          <Col>
            <Grid item xs={12} sm={6}>
              <TextField
                id="HouseNumber"
                label="้บ้านเลขที่"
                variant="outlined"
                fullWidth
                required
                onChange={(e) => setHouseNumber(e.target.value)}
                value={HouseNumber}
              ></TextField>
            </Grid>
          </Col>
          <Col>
          <Grid item xs={12} sm={6}>
            <TextField
              id="Group"
              label="หมู่"
              variant="outlined"
              fullWidth
              required
              onChange={(e) => setGroup(e.target.value)}
              value={Group}
            ></TextField>
          </Grid>
          </Col>
          <Col>
          <Grid item xs={12} sm={6}>
          <TextField
            id="Alley"
            label="ซอย"
            variant="outlined"
            fullWidth
            required
            onChange={(e) => setAlley(e.target.value)}
            value={Alley}
          ></TextField>
        </Grid>
          </Col>
          <Col>
           <Grid item xs={12} sm={6}>
          <TextField
            id="Road"
            label="ถนน"
            variant="outlined"
            fullWidth
            required
            onChange={(e) => setRoad(e.target.value)}
            value={Road}
          ></TextField>
        </Grid>
        </Col>
        </Row>

        <Row>
            <Col>
            <Grid item xs={12} sm={6}>
          <TextField
            id="SubDistrict"
            label="ตำบล"
            variant="outlined"
            fullWidth
            required
            onChange={(e) => setSubDistrict(e.target.value)}
            value={SubDistrict}
          ></TextField>
        </Grid>
            </Col>
            <Col>
             
        <Grid item xs={12} sm={6}>
          <TextField
            id="District"
            label="อำเภอ"
            variant="outlined"
            fullWidth
            required
            onChange={(e) => setDistrict(e.target.value)}
            value={District}
          ></TextField>
        </Grid>
            </Col>
            <Col>
            <Grid item xs={12} sm={6}>
          <TextField
            id="Province"
            label="จังหวัด"
            variant="outlined"
            fullWidth
            required
            onChange={(e) => setProvince(e.target.value)}
            value={Province}
          ></TextField>
        </Grid>
            </Col>
            <Col>
             
        <Grid item xs={12} sm={6}>
          <TextField
            id="PostalCode"
            label="รหัสไปรษณีย์"
            variant="outlined"
            fullWidth
            required
            onChange={(e) => setPostalCode(e.target.value)}
            value={PostalCode}
          ></TextField>
        </Grid>
            </Col>
        </Row>

        
       
       
       
        <button type="submit" variant="contained" class="btn btn-primary mb-3">
          บันทึก
        </button>
      </form>
    </diV>
  );
}
