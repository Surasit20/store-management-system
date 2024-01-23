import React, { Component, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { withRouter } from "react-router";
import Swal from "sweetalert2";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import addressJson from './address.json';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
function Register() {
  const navigate = useNavigate();
  const [FullName, setFullName] = useState("");
  const [Brirtday, setBrirtday] = useState(new Date());
  const [CodeNumber, setCodeNumber] = useState(0);
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
  const [Email, setEmail] = useState("");
  const [UserName, setUserName] = useState("");
  const [Password, setPassword] = useState("");
  const [PasswordConfirm, setPasswordConfirm] = useState("");

  const [amphureOb, setAmphureOb] = useState([]);
  const [tambonOb, setTambonOb] = useState([]);
  const [codeOb, setCodeOb] = useState([]);
  const [postCodeOb, setpostCodeOb] = useState([]);

  useEffect(() => {

    try {


    } catch (err) {
      console.log(err);
    }
  }, []);

  const location = useLocation();
  console.log(location.pathname);
  const [goToLogin, setGoToLogin] = React.useState(false);

  if (goToLogin) {
    return <Navigate to="/login" />;
  }

  const handleSubmit = async (event) => {

    event.preventDefault();


    if (Password != PasswordConfirm) {
      Swal.fire({
        title: "ไม่สำเร็จ",
        text: "รหัสผ่านไม่ตรงกัน",
        icon: "error",
        confirmButtonText: "ตกลง",
      });

      return;
    }



    let data = {
      USER_FULLNAME: FullName,
      USER_BIRTHDAY: Brirtday,
      USER_CODE_NUMBER: CodeNumber,
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
      USER_EMAIL: Email,
      USER_USERNAME: UserName,
      USER_PASSWORD: Password,
    };
    console.log(data);
    axios
      .post("http://localhost:3001/api/v1/auth/register", data)
      .then((response) => {
        console.log(response);
        if (response.status == 201) {
          Swal.fire({
            title: "สมัครเสร็จเรียบร้อย",
            text: "สมัครเสร็จเรียบร้อย",
            icon: "success",
            confirmButtonText: "ตกลง",
          }).finally(() => {
            setGoToLogin(true);
          });
        }
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          title: "อีเมล์/รหัส ผ่านไม่ถูกต้อง",
          text: "โปรดกรอกอีเมล์หรือรหัสผ่านใหม่",
          icon: "error",
          confirmButtonText: "ตกลง",
        });
      });
  };


  const handleProvider = (event, values) => {
    if(values == null){
      setAmphureOb([])

    }else{
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
    <div className="App">
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark navbar-height">
          <div className="container-fluid">
            <div className="navbar-collapse justify-content-center"></div>
          </div>
        </nav>

        <nav className="navbar navbar-light bg-light">
          <div className="container-fluid justify-content-center">
            <a className="navbar-brand justify-content-center" href="#">
              สมัครสมาชิก
            </a>
          </div>
        </nav>
      </div>
      <div className="container-fluid bg-warning bg-gradient container-user">
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <span className="input-group-text form-label my-2" id="addon-wrapping" for="validationNamae">
              ชื่อ-นามสกุล
            </span>
            <input
              type="text"
              className="form-control my-2"
              placeholder="กรอก ชื่อ-นามสกุล"
              aria-label="ชื่อ-นามสกุล"
              aria-describedby="addon-wrapping"
              id="validationNamae"
              required
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div className="input-group my-2">
            <span className="input-group-text" id="addon-wrapping">
              วัน/เดือน ปีเกิด
            </span>
            <DatePicker
              selected={Brirtday}
              onChange={(date) => setBrirtday(date)}
            />
          </div>

          {/* <div className="input-group my-2">
            <span className="input-group-text" id="addon-wrapping">
              เลขบัตรประจำตัวประชาชน
            </span>
            <input
              type="number"
              className="form-control"
              //placeholder="กรอก ชื่อ-นามสกุล"
              aria-label="เลขบัตรประจำตัวประชาชน"
              aria-describedby="addon-wrapping"
              required
              onChange={(e) => setCodeNumber(e.target.value)}
            />
          </div> */}

          <div className="input-group my-2 ">
            <span className="input-group-text" id="addon-wrapping">
              เบอร์โทรศัพท์
            </span>
            <input
              type="number"
              className="form-control"
              //placeholder="กรอก ชื่อ-นามสกุล"
              aria-label="เบอร์โทรศัพท์"
              aria-describedby="addon-wrapping"
              required
              onChange={(e) => setTell(e.target.value)}
            />
          </div>

          <div className="input-group my-2">
            <span className="input-group-text" id="addon-wrapping">
              อาชีพ
            </span>
            <input
              type="text"
              className="form-control"
              //placeholder="กรอก ชื่อ-นามสกุล"
              aria-label="อาชีพ"
              aria-describedby="addon-wrapping"
              required
              onChange={(e) => setOccupation(e.target.value)}
            />
          </div>
          <div className="row">
            <div className="input-group flex-nowrap col">
              <span className="input-group-text" id="addon-wrapping">
                ที่อยู่ บ้านเลขที่
              </span>
              <input
                type="text"
                className="form-control"
                //placeholder="กรอก ชื่อ-นามสกุล"
                aria-label="อาชีพ"
                required
                aria-describedby="addon-wrapping"
                onChange={(e) => setHouseNumber(e.target.value)}
              />
            </div>

            <div className="input-group flex-nowrap col">
              <span className="input-group-text" id="addon-wrapping">
                หมู่
              </span>
              <input
                type="text"
                className="form-control"
                //placeholder="กรอก ชื่อ-นามสกุล"
                aria-label="อาชีพ"
                required
                aria-describedby="addon-wrapping"
                onChange={(e) => setGroup(e.target.value)}
              />
            </div>

            <div className="input-group flex-nowrap col">
              <span className="input-group-text" id="addon-wrapping">
                ซอย
              </span>
              <input
                type="text"
                className="form-control"
                //placeholder="กรอก ชื่อ-นามสกุล"
                aria-label="อาชีพ"
                aria-describedby="addon-wrapping"
                required
                onChange={(e) => setAlley(e.target.value)}
              />
            </div>

            <div className="input-group flex-nowrap col">
              <span className="input-group-text" id="addon-wrapping">
                ถนน
              </span>
              <input
                type="text"
                className="form-control"
                //placeholder="กรอก ชื่อ-นามสกุล"
                aria-label="อาชีพ"
                aria-describedby="addon-wrapping"
                required
                onChange={(e) => setRoad(e.target.value)}
              />
            </div>


          </div>

          <div className="row d-flex flex-row-reverse">
            <div className="input-group flex-nowrap col">
              {/* <span className="input-group-text" id="addon-wrapping">
                รหัสไปรษณีย์
              </span>
              <input
                type="number"
                className="form-control"
                //placeholder="กรอก ชื่อ-นามสกุล"
                aria-label="อาชีพ"
                aria-describedby="addon-wrapping"
                required
                onChange={(e) => setPostalCode(e.target.value)}
              /> */}

<Autocomplete
                disablePortal
                id="combo-box-demo1"
                options={codeOb}
                sx={{ width: 300 }}
                getOptionLabel={(option) => option.zip_code}
                onChange={handleCode2}
                renderInput={(params) => <TextField {...params} label="รหัสไปรษณีย์" sx={{backgroundColor: '#ffff',}}/>}

              />
            </div>
            <div className="input-group flex-nowrap col">
              {/* <span className="input-group-text" id="addon-wrapping">
                ตำบล
              </span>
              <input
                type="text"
                className="form-control"
                //placeholder="กรอก ชื่อ-นามสกุล"
                aria-label="อาชีพ"
                aria-describedby="addon-wrapping"
                required
                onChange={(e) => setSubDistrict(e.target.value)}
              /> */}

<Autocomplete
                disablePortal
                id="combo-box-demo1"
                options={tambonOb}
                sx={{ width: 300 }}
                getOptionLabel={(option) => option?.name_th ?? ""}
                onChange={handleCode}
                renderInput={(params) => <TextField {...params} label="ตำบล" sx={{backgroundColor: '#ffff',}} />}

              />
            </div>

            <div className="input-group flex-nowrap col">
              {/* <span className="input-group-text" id="addon-wrapping">
                อำเภอ
              </span>
              <input
                type="text"
                className="form-control"
                //placeholder="กรอก ชื่อ-นามสกุล"
                aria-label="อาชีพ"
                aria-describedby="addon-wrapping"
                required
                onChange={(e) => setDistrict(e.target.value)}
              /> */}

              <Autocomplete
                disablePortal
                id="combo-box-demo1"
                options={amphureOb}
                sx={{ width: 300 }}
                getOptionLabel={(option) => option?.name_th ?? ""}
               onChange={handleTumbun}
                renderInput={(params) => <TextField {...params} label="อำเภอ" sx={{backgroundColor: '#ffff',}}/>}

              />


            </div>

            <div className="input-group flex-nowrap col">
              {/* <span className="input-group-text" id="addon-wrapping">
                จังหวัด
              </span>
              <input
                type="text"
                className="form-control"
                //placeholder="กรอก ชื่อ-นามสกุล"
                aria-label="อาชีพ"
                aria-describedby="addon-wrapping"
                required
                onChange={(e) => setProvince(e.target.value)}
              />*/}
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={addressJson}
                sx={{ width: 300 }}
                getOptionLabel={(option) => option.name_th}
                onChange={ handleProvider}
                renderInput={(params) => <TextField {...params} label="จังหวัด"       
                sx={{backgroundColor: '#ffff',}} />} />
            </div>


          </div>


          <div className="input-group my-2">
            <span className="input-group-text" id="addon-wrapping">
              อีเมล
            </span>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              //placeholder="กรอก ชื่อ-นามสกุล"
              aria-label="อาชีพ"
              aria-describedby="addon-wrapping"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group my-2">
            <span className="input-group-text" id="addon-wrapping">
              ชื่อผู้ใช้งาน
            </span>
            <input
              type="text"
              className="form-control"
              //placeholder="กรอก ชื่อ-นามสกุล"
              aria-label="อาชีพ"
              aria-describedby="addon-wrapping"
              required
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>

          <div className="input-group my-2">
            <span className="input-group-text" id="addon-wrapping">
              รหัสผ่าน
            </span>
            <input
              type="password"
              className="form-control"
              //placeholder="กรอก ชื่อ-นามสกุล"
              aria-label="อาชีพ"
              aria-describedby="addon-wrapping"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="input-group flex-nowrap">
            <span className="input-group-text" id="addon-wrapping">
              ยืนยันรหัสผ่าน
            </span>
            <input
              type="password"
              className="form-control"
              //placeholder="กรอก ชื่อ-นามสกุล"
              aria-label="อาชีพ"
              aria-describedby="addon-wrapping"
              required
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </div>

          <button
            type="submit"
            variant="contained"
            class="btn btn-primary mb-3"
          >
            บันทึก
          </button>
        </form>
      </div>
    </div>
  );
}
export default Register;
