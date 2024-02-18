import React, { Component, useState, useEffect } from "react";
import "../user/css/user_update.css";
import { useParams } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { withRouter } from "react-router";
import { Navigate } from "react-router-dom";
import { Grid, TextField } from "@mui/material";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import addressJson from '../../login/address.json';
import Autocomplete from '@mui/material/Autocomplete';
import Swal from "sweetalert2";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faPlusCircle } from "@fortawesome/free-solid-svg-icons";

export default function UserUpdateAdmin() {
  const { USER_ID } = useParams();
  const navigate = useNavigate();

  useEffect(() => {

    //console.log(addressJson)
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("https://back-end-store-management-system.onrender.com/api/v1/users/" + USER_ID, requestOptions)
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

          let _provider = addressJson.find(f=>f.name_th == result["result"]["USER_PROVINCE"])
          let _aumpur = _provider.amphure.find(f=>f.name_th == result["result"]["USER_DISTRICT"])
          
          handleProvider(null,_provider)
          handleTumbun(null,_aumpur)
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

    fetch(`https://back-end-store-management-system.onrender.com/api/v1/users/${USER_ID}`, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      Swal.fire({
        title: "บันทึกข้อมูลสำเร็จ",
        icon: "success",
        confirmButtonText: "ตกลง",
      });
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
  const [amphureOb, setAmphureOb] = useState([]);
  const [tambonOb, setTambonOb] = useState([]);
  const [codeOb, setCodeOb] = useState([]);

  //กลับหน้าก่อนหน้า
  const [gotoListUser, setGotoListUser] = useState(false);
  if (gotoListUser) {
    return <Navigate to="/admin/user/user-info" />;
  }

  const handleProvider = (event, values) => {
    if(values == null){
      setAmphureOb([])

    }else{
      console.log(values)
      setProvince(values.name_th)
      setAmphureOb(values.amphure)
    }
  };

  const handleTumbun = (event, values) => {
    if(values == null){
      setAmphureOb([])

    }else{
      setDistrict(values.name_th)
      setTambonOb(values.tambon)
    }
  };

  const handleCode = (event, values) => {
    console.log(values)
    if(values == null){
      setCodeOb([])

    }else{
      setSubDistrict(values.name_th)
      setCodeOb([values])
    }
  };

  const handleCode2 = (event, values) => {
    console.log(values)
    if(values == null){
      setCodeOb([])

    }else{
      setPostalCode(values.zip_code)
      setCodeOb([values])
    }
  };
  return (
    <div>
      <div className="header-with-button with-underline">
        <div className="header" style={{ paddingTop: "10px" }}>
          <h1 style={{ color: "#2196f3" }}>
            <div
              onClick={() => {
                setGotoListUser(true);
              }}
            >
              <i className="fa fa-arrow-left" aria-hidden="true"  style={{ fontSize: "30px" }}>
                {" "}
                แก้ไขข้อมูลสมาชิก
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
      <div className="Contrainer-form">
        <p
          style={{
            color: "#2196f3",
            fontSize: "25px",
            marginLeft: "20px",
            paddingTop: "10px",
            fontWeight: "bold",
          }}
        >
          ข้อมูลสมาชิก
        </p>
        <Row>      
          <Col>
            <p style={{ color: "#858585" }}>ชื่อ-นามสกุล</p>
            <TextField
              id="FullName"
              variant="outlined"
              fullWidth
              required
              onChange={(e) => setFullName(e.target.value)}
              value={FullName}
              sx={{ height: "10px", paddingBottom: "50px" }}
            ></TextField>
          </Col>
          <Col>
            <p style={{ color: "#858585" }}>วัน/เดือน/ปี เกิด</p>
            <TextField
              id="BirthDay"
              label="วัน/เดือน/ปี เกิด"
              variant="outlined"
              fullWidth
              required
              onChange={(e) => setBirthday(e.target.value)}
              value={BirthDay}
            ></TextField>
          </Col>
        </Row>
        <Row>
          <Col>
            <p style={{ color: "#858585" }}>เบอร์โทร</p>
            <TextField
              id="Tell"
              variant="outlined"
              fullWidth
              required
              onChange={(e) => setTell(e.target.value)}
              value={Tell}
            ></TextField>
          </Col>
          <Col>
            <p style={{ color: "#858585" }}>อาชีพ</p>
            <TextField
              id="Occupation"
              variant="outlined"
              fullWidth
              required
              onChange={(e) => setOccupation(e.target.value)}
              value={Occupation}
              sx={{ height: "10px", paddingBottom: "50px" }}
            ></TextField>
          </Col>
        </Row>
        <Row>
          <Col>
            <p style={{ color: "#858585" }}>บ้านเลขที่</p>
            <TextField
              id="HouseNumber"
              label="้บ้านเลขที่"
              variant="outlined"
              fullWidth
              required
              onChange={(e) => setHouseNumber(e.target.value)}
              value={HouseNumber}
              sx={{ height: "10px", paddingBottom: "50px" }}
            ></TextField>
          </Col>
          <Col>
            <p style={{ color: "#858585" }}>หมู่</p>
            <TextField
              id="Group"
              variant="outlined"
              fullWidth
              required
              onChange={(e) => setGroup(e.target.value)}
              value={Group}
              sx={{ height: "10px", paddingBottom: "50px" }}
            ></TextField>
          </Col>
          <Col>
            <p style={{ color: "#858585" }}>ซอย</p>
            <TextField
              id="Alley"
              variant="outlined"
              fullWidth
              required
              onChange={(e) => setAlley(e.target.value)}
              value={Alley}
              sx={{ height: "10px", paddingBottom: "50px" }}
            ></TextField>
          </Col>
          <Col>
            <p style={{ color: "#858585" }}>ถนน</p>
            <TextField
              id="Road"
              variant="outlined"
              fullWidth
              required
              onChange={(e) => setRoad(e.target.value)}
              value={Road}
              sx={{ height: "10px", paddingBottom: "50px" }}
            ></TextField>
          </Col>
        </Row>
        <Row>
        <Col>
            <p style={{ color: "#858585" }}>จังหวัด</p>
             <Autocomplete
                defaultValue={Province}
                disablePortal
                id="combo-box-demo"
                options={addressJson}
                sx={{ width: 276}}
                getOptionLabel={(option) => option.name_th ?? Province}
                onChange={ handleProvider}
                renderInput={(params) => <TextField {...params}    
                value={Province} 
                sx={{backgroundColor: '#ffff',}} />} />
          </Col>
          <Col>
            <p style={{ color: "#858585" }}>อำเภอ</p>
            {/* <TextField
              id="District"
              variant="outlined"
              fullWidth
              required
              onChange={(e) => setDistrict(e.target.value)}
              value={District}
              sx={{ height: "10px", paddingBottom: "50px" }}
            ></TextField> */}
                   <Autocomplete
                defaultValue={District}
                disablePortal
                id="combo-box-demo1"
                options={amphureOb}
                sx={{ width: 276 }}
                getOptionLabel={(option) => option?.name_th ?? District}
                onChange={handleTumbun}
                renderInput={(params) => <TextField {...params} sx={{backgroundColor: '#ffff',}}/>}

              />
          </Col>
          <Col>
            <p style={{ color: "#858585" }}>ตำบล</p>
            {/* <TextField
              id="SubDistrict"
              variant="outlined"
              fullWidth
              required
              onChange={(e) => setSubDistrict(e.target.value)}
              value={SubDistrict}
              sx={{ height: "10px", paddingBottom: "50px" }}
            ></TextField> */}
            
<Autocomplete
                defaultValue={SubDistrict}
                disablePortal
                id="combo-box-demo1"
                options={tambonOb}
                sx={{ width: 276 }}
                getOptionLabel={(option) => option?.name_th ?? SubDistrict}
                onChange={handleCode}
                renderInput={(params) => <TextField {...params}  sx={{backgroundColor: '#ffff',}} />}

              />
          </Col>
          <Col>
            <p style={{ color: "#858585" }}>รหัสไปรษณีย์</p>
            <Autocomplete
              defaultValue={PostalCode}
                disablePortal
                id="combo-box-demo1"
                options={codeOb}
                sx={{ width: 276 }}
                getOptionLabel={(option) => option.zip_code ?? PostalCode}
                onChange={handleCode2}
                renderInput={(params) => <TextField {...params}  sx={{backgroundColor: '#ffff',}}/>}

              />
            {/* <TextField
              id="PostalCode"
              variant="outlined"
              fullWidth
              required
              onChange={(e) => setPostalCode(e.target.value)}
              value={PostalCode}
              sx={{ height: "10px", paddingBottom: "50px" }}
            ></TextField> */}
          </Col>
        </Row>
      </div>
    </div>
  );
}
