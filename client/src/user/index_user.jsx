import React, { Component, useEffect, useState,forwardRef, useImperativeHandle, useRef } from "react";
import { Outlet } from "react-router-dom";
import { withRouter } from "react-router";
import { BrowserRouter, Routes, Route, useLocation, useNavigate, } from "react-router-dom";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ProfileDialog from "../component/profile"
function IndexUser() {
  // const [currentPage, setCurrentPage] = useState(new Map([
  //   { key: 'home', value: true },
  //   { key: 'pay', value: false  },
  //   { key: 'receipt', value: false },
  //   { key: 'repair', value: false },
  // ]));
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location.pathname);
  const [menu, setMenu] = React.useState("");
  const [user, setUser] = useState({
    USER_FULLNAME:"",
    USER_BIRTHDAY : "",
    USER_CODE_NUMBER : "",
    USER_TELL :"",
    USER_OCCUPATION :"",
    USER_HOUSE_NUMBER : "",
    USER_GROUP : "",
    USER_ALLEY: "",
    USER_SUB_DISTRICT : "",
    USER_DISTRICT : "",
    USER_PROVINCE : "",
    USER_POSTAL_CODE : "",
    USER_EMAIL : "",
    USER_USERNAME : ""
  });
  const [name, setName] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const childRef = useRef(null);

  const handleChange = (event) => {

    if(event.target.value == 1){
      navigate("/login");
      setMenu("")
    }else{
      setMenu("")
      childRef.current.childFunction1();;
    }
  };

  useEffect(async () => {
    const dataUser = await JSON.parse(localStorage.getItem("user"));
    if (dataUser) {
      setUser(dataUser.data.user);
      setName(dataUser.data.user.USER_FULLNAME);
    }
    console.log("tttttttttttttttttttttttttt");
    console.log(user);
    // axios.get("http://localhost:3001/api/v1/motorcycles").then((response) => {
    //   var data = response.data.filter(
    //     (f) => f.USER_ID == dataUser.data.user.USER_ID
    //   );
    //   console.log(data);
    //   setdataSoures(data);
    // });
  }, []);
  return (
    <div className="App">
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark navbar-height">
          <div className="container-fluid">
            <div className="navbar-collapse justify-content-center">
              <a className="navbar-brand" href="/user/home">
                <p className="header-navber">
                  <a>ร้านรถจักรยานยนต์มือ 2 (สำหรับผู้ใช้)</a>
                </p>
              </a>
            </div>
          </div>
        </nav>
        <nav className="navbar navbar-expand-lg bg-custom-grey ">
          <div className="container-fluid row">
            <div className="col-2">
              <ul
                className={`navbar-nav d-flex flex-row me-1 justify-content-center`}
              >
                <li className="nav-item me-3 me-lg-0">
                  <a className={`nav-link text-back`} href="/user/home">
                    {location.pathname === "/user/home" ? (
                      <u>
                        <p>
                          <strong>รถจักรยานยนต์</strong>
                        </p>
                      </u>
                    ) : (
                      <p>รถจักรยานยนต์</p>
                    )}
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-2">
              <ul className="navbar-nav d-flex flex-row me-1 justify-content-center">
                <li className="nav-item me-3 me-lg-0">
                  <a className="nav-link text-back" href="/user/pay">
                    {location.pathname === "/user/pay" ? (
                      <u>
                        <p>
                          <strong>ชำระค่างวด</strong>
                        </p>
                      </u>
                    ) : (
                      <p>ชำระค่างวด</p>
                    )}
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-2">
              <ul className="navbar-nav d-flex flex-row me-1 justify-content-center">
                <li className="nav-item me-3 me-lg-0">
                  <a className="nav-link text-back" href="/user/receipt">
                    {location.pathname === "/user/receipt" ? (
                      <u>
                        <p>
                          <strong>สถานะการชำระค่างวดและใบเสร็จ</strong>
                        </p>
                      </u>
                    ) : (
                      <p>สถานะการชำระค่างวดและใบเสร็จ</p>
                    )}
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-2">
              <ul className="navbar-nav d-flex flex-row me-1 justify-content-center">
                <li className="nav-item me-3 me-lg-0">
                  <a className="nav-link text-back" href="/user/repair">
                    {location.pathname === "/user/repair" ? (
                      <u>
                        <p>
                          <strong> ข้อมูลส่งซ่อม</strong>
                        </p>
                      </u>
                    ) : (
                      <p> ข้อมูลส่งซ่อม</p>
                    )}
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-2">
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    ผู้ใช้งาน
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    onChange={handleChange}
                    onClick={handleChange}
                  >
                    <MenuItem value={0}>ข้อมูลผู้ใช้งาน</MenuItem>
                    <MenuItem value={1}>ออกจากระบบ</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </div>
          </div>
        </nav>
      </div>
      <div className="container-fluid bg-warning bg-gradient ">
        <Outlet />
      </div>

      <ProfileDialog 
      ref={childRef} 
      USER_FULLNAME={user.USER_FULLNAME}
      USER_BIRTHDAY = {user.USER_BIRTHDAY}
      USER_CODE_NUMBER = {user.USER_CODE_NUMBER} 
      USER_TELL = {user.USER_TELL}
      USER_OCCUPATION = {user.USER_OCCUPATION}
      USER_HOUSE_NUMBER = {user.USER_HOUSE_NUMBER}
      USER_GROUP = {user.USER_GROUP}
      USER_ALLEY = {user.USER_ALLEY}
      USER_SUB_DISTRICT = {user.USER_SUB_DISTRICT}
      USER_DISTRICT = {user.USER_DISTRICT}
      USER_PROVINCE = {user.USER_PROVINCE}
      USER_POSTAL_CODE = {user.USER_POSTAL_CODE}
      USER_EMAIL = {user.USER_EMAIL}
      USER_USERNAME = {user.USER_USERNAME}
      ></ProfileDialog>
    </div>
  );
}
export default IndexUser;
