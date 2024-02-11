import React from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';
import {Component, useEffect, useState,forwardRef, useImperativeHandle, useRef } from "react";
import { Outlet } from "react-router-dom";
import { withRouter } from "react-router";
import { BrowserRouter, Routes, Route, useLocation, useNavigate, } from "react-router-dom";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ProfileDialog from "../component/profile"

const SidebarUser = () => {

  const [currentPage, setCurrentPage] = useState({
    '/user/home': true ,
    '/user/pay': false  ,
    '/user/receipt': false ,
    '/': false ,
   });
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
    console.log(11111111111111)
    console.log(event.target.value)
    if(event.target.value == 1){
      navigate("/login");
      setMenu("")
    }
    else if(event.target.value == 0) {
      setMenu("")
      childRef.current.childFunction1();
    }
  };

  const openInfoUser = (e) => {

    // const { linkDisabled } = this.state
    // if(linkDisabled) e.preventDefault()
    setOpen(true)
    childRef.current.childFunction1();
    
  };
  useEffect(async () => {
    const dataUser = await JSON.parse(localStorage.getItem("user"));
    if (dataUser) {
      setUser(dataUser.data.user);
      setName(dataUser.data.user.USER_FULLNAME);
    }

  }, []);

  const OnChangePage = (path)=>{
    console.log(path)

    let data = currentPage;


    for (let [key, value] of Object.entries(data)) {
      data[key] = false;
    }
    data[path] = true;
    setCurrentPage(data);

  }


  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial',backgroundColor: '#dfedf0'  }}>
      <CDBSidebar textColor="#99BC85" backgroundColor="#fff">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large" style={{ marginLeft: '10px' }}></i>}>
          <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
            ร้านรถจักรยานยนต์มือ 2  
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>

            <NavLink exact to="/user/home" activeClassName="menu-active" onClick={()=>OnChangePage("/user/home")}>
              <CDBSidebarMenuItem className={`${currentPage["/user/home"] == true ? "menu-active":"text-secondary"}`} icon="fa-solid fa-motorcycle">ข้อมูลรถจักรยานยนต์</CDBSidebarMenuItem>
            </NavLink>
            
            <NavLink exact to="/user/pay" activeClassName="menu-active" onClick={()=>OnChangePage("/user/pay")}>
              <CDBSidebarMenuItem className={`${currentPage["/user/pay"] == true ? "menu-active":"text-secondary"}`} icon="fa-solid fa-file-invoice-dollar" >ชำระค่างวด</CDBSidebarMenuItem>
            </NavLink>

            <NavLink exact to="/user/receipt" activeClassName="menu-active" onClick={()=>OnChangePage("/user/receipt")}>
              <CDBSidebarMenuItem className={`${currentPage["/user/receipt"] == true ? "menu-active":"text-secondary"}`} icon ="fa-solid fa-solid fa-envelope-open-text" >ข้อมูลการชำระค่างวด</CDBSidebarMenuItem>
            </NavLink>

            <NavLink exact to="/user/repair" activeClassName="menu-active" onClick={()=>OnChangePage("/user/repair")}>
              <CDBSidebarMenuItem className={`${currentPage["/user/repair"] == true ? "menu-active":"text-secondary"}`} icon="fa-solid fa-screwdriver" >ข้อมูลส่งซ่อม</CDBSidebarMenuItem>
            </NavLink>

            <NavLink  exact to="#" onClick={openInfoUser}  activeClassName="menu-active" >
              <CDBSidebarMenuItem icon="fa-solid fa-users" className={`${currentPage["/"] == true ? "menu-active":"text-secondary"}`} >ข้อมูลผู้ใช้</CDBSidebarMenuItem>
            </NavLink>

            <NavLink exact to="/"  activeClassName="menu-active" onClick={()=>OnChangePage("/")}>
              <CDBSidebarMenuItem className={`${currentPage["/"] == true ? "menu-active":"text-secondary"}`} icon="exclamation-circle" >ออกจากระบบ</CDBSidebarMenuItem>
            </NavLink>

          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: 'center' }}>
          <div
            style={{
              padding: '20px 5px',
            }}
          >
            สำหรับผู้ใช้
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
      <div className="container-fluid container-user" style={{backgroundColor: '#fff'  }}>
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
};

export default SidebarUser;

// import React, { useState, createContext, useEffect, useContext } from "react";
// import { Outlet } from "react-router-dom";
// import { withRouter } from "react-router";
// import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
// import "../admin/css/index_admin.css";
// export const UserContext = createContext(null);
// function IndexAdmin() {
//   // const [currentPage, setCurrentPage] = useState(new Map([
//   //   { key: 'home', value: true },
//   //   { key: 'pay', value: false  },
//   //   { key: 'receipt', value: false },
//   //   { key: 'repair', value: false },
//   // ]));
//   const location = useLocation();
//   console.log(location.pathname);
//   // const [userId, setUserId] = useState("");
//   // const { setUserIds } = useContext(UserContext);
//   // useEffect(() => {
//   //   const user = JSON.parse(localStorage.getItem("user"));

//   //   if (user) {
//   //     setUserIds(user.USER_ID);
//   //   }
//   // }, []);

//   return (
//     // <UserContext.Provider value={{ userId, setUserId }}>
//     <div className="App">
//       <div>
//         <nav className="navbar  navbar-height bg ">
//           <div className="container-fluid">
//             <div className="navbar-collapse justify-content-center">
//               <a className="navbar-brand" href="/admin/home">
//                 <p className="header-navber">
//                   <a>ร้านรถจักรยานยนต์มือ 2 (สำหรับแอดมิน)</a>
//                 </p>
//               </a>
//             </div>
//           </div>
//         </nav>
//         <nav className="navbar navbar-expand-lg bg-custom ">
//           <div className="container-fluid row">
//             <div className="col">
//               <ul
//                 className={`navbar-nav d-flex flex-row me-1 justify-content-center`}
//               >
//                 <li className="nav-item me-1 me-lg-0">
//                   <a className={`nav-link text-back`} href="/admin/motorcycle">
//                     {location.pathname === "/admin/motorcycle" ||
//                     location.pathname === "/admin/add-motorcycle" ? (
//                       <u>
//                         <p>
//                           <strong>รถจักรยานยนต์</strong>
//                         </p>
//                       </u>
//                     ) : (
//                       <p>รถจักรยานยนต์</p>
//                     )}
//                   </a>
//                 </li>
//               </ul>
//             </div>
//             <div className="col">
//               <ul
//                 className={`navbar-nav d-flex flex-row me-1 justify-content-center`}
//               >
//                 <li className="nav-item me-3 me-lg-0">
//                   <a
//                     className={`nav-link text-back`}
//                     href="/admin/user/user-info"
//                   >
//                     {location.pathname === "/admin/user/user-info" ? (
//                       <u>
//                         <p>
//                           <strong>ผู้ใช้งาน</strong>
//                         </p>
//                       </u>
//                     ) : (
//                       <p>ผู้ใช้งาน</p>
//                     )}
//                   </a>
//                 </li>
//               </ul>
//             </div>
//             <div className="col">
//               <ul className="navbar-nav d-flex flex-row me-1 justify-content-center">
//                 <li className="nav-item me-3 me-lg-0">
//                   <a
//                     className="nav-link text-back"
//                     href="/admin/repair/repair-info"
//                   >
//                     {location.pathname === "/admin/repair/repair-info" ? (
//                       <u>
//                         <p>
//                           <strong>รับข้อมูลส่งซ่อม</strong>
//                         </p>
//                       </u>
//                     ) : (
//                       <p>รับข้อมูลส่งซ่อม</p>
//                     )}
//                   </a>
//                 </li>
//               </ul>
//             </div>
//             <div className="col">
//               <ul className="navbar-nav d-flex flex-row me-1 justify-content-center">
//                 <li className="nav-item me-3 me-lg-0">
//                   <a className="nav-link text-back" href="/admin/overdue">
//                     {location.pathname === "/admin/overdue" ? (
//                       <u>
//                         <p>
//                           <strong>ยอดค้างชำระ</strong>
//                         </p>
//                       </u>
//                     ) : (
//                       <p>ยอดค้างชำระ</p>
//                     )}
//                   </a>
//                 </li>
//               </ul>
//             </div>

//             <div className="col">
//               <ul className="navbar-nav d-flex flex-row me-1 justify-content-center">
//                 <li className="nav-item me-3 me-lg-0">
//                   <a className="nav-link text-back" href="/admin/daily-summary">
//                     {location.pathname === "/admin/daily-summary" ? (
//                       <u>
//                         <p>
//                           <strong>ยอดประจำวัน</strong>
//                         </p>
//                       </u>
//                     ) : (
//                       <p>ยอดประจำวัน</p>
//                     )}
//                   </a>
//                 </li>
//               </ul>
//             </div>

//             <div className="col">
//               <ul className="navbar-nav d-flex flex-row me-1 justify-content-center">
//                 <li className="nav-item me-3 me-lg-0">
//                   <a className="nav-link text-back" href="/admin/payment-check">
//                     {location.pathname === "/admin/payment-check" ? (
//                       <u>
//                         <p>
//                           <strong>ตรวจสอบการชำระ</strong>
//                         </p>
//                       </u>
//                     ) : (
//                       <p>ตรวจสอบการชำระ</p>
//                     )}
//                   </a>
//                 </li>
//               </ul>
//             </div>

//             <div className="col">
//               <ul className="navbar-nav d-flex flex-row me-1 justify-content-center">
//                 <li className="nav-item me-3 me-lg-0">
//                   <a className="nav-link text-back" href="/admin/chassis">
//                     {location.pathname === "/admin/chassis" ? (
//                       <u>
//                         <p>
//                           <strong>ยืนยันเจ้าของรถ</strong>
//                         </p>
//                       </u>
//                     ) : (
//                       <p>ยืนยันเจ้าของรถ</p>
//                     )}
//                   </a>
//                 </li>
//               </ul>
//             </div>
//             <div className="col">
//               <ul className="navbar-nav d-flex flex-row me-1 justify-content-center">
//                 <li className="nav-item me-3 me-lg-0">
//                   <a className="nav-link text-back" href="/admin/payment-check">
//                     {location.pathname === "/admin/payment-check" ? (
//                       <u>
//                         <p>
//                           <strong>ออกจากระบบ</strong>
//                         </p>
//                       </u>
//                     ) : (
//                       <p>ออกจากระบบ</p>
//                     )}
//                   </a>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </nav>
//       </div>
//       <div className="container-fluid bg-warning bg-gradient container-user">
//         <Outlet />
//       </div>
//     </div>
//     // </UserContext.Provider>
//   );
// }
// export default IndexAdmin;
