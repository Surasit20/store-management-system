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
import { Outlet } from "react-router-dom";
import "./index_admin.css"

const Sidebar = () => {
  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial', backgroundColor: '#dfedf0'  }}>
      <CDBSidebar textColor="#2196f3" backgroundColor="#fff">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large" style={{ marginLeft: '10px' }}></i>}>
          <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
            ร้านรถจักรยานยนต์มือ 2  
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>

            <NavLink exact to="/admin/motorcycle" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="fa-solid fa-motorcycle" style={{ color: 'gray' }}>ข้อมูลรถจักรยานยนต์</CDBSidebarMenuItem>
            </NavLink>

            <NavLink exact to="/admin/user/user-info" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="fa-solid fa-users" style={{ color: 'gray' }}>ข้อมูลสมาชิก</CDBSidebarMenuItem>
            </NavLink>

            <NavLink exact to="/admin/repair/repair-info" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon ="fa-solid fa-screwdriver" style={{ color: 'gray' }}>ข้อมูลการส่งซ่อม</CDBSidebarMenuItem>
            </NavLink>

            <NavLink exact to="/admin/overdue" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="fa-solid fa-file-invoice-dollar" style={{ color: 'gray' }}>ข้อมูลยอดค้างชำระ</CDBSidebarMenuItem>
            </NavLink>

            <NavLink exact to="/admin/payment-check" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="fa-solid fa-envelope-open-text" style={{ color: 'gray' }}>ตรวจสอบการชำระ</CDBSidebarMenuItem>
            </NavLink>

            <NavLink exact to="/admin/chassis" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="fa-solid fa-user-check" style={{ color: 'gray' }}>อนุมัติ</CDBSidebarMenuItem>
            </NavLink>

            <NavLink exact to="/admin/daily-summary"  activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="fa-solid fa-calendar-day" style={{ color: 'gray' }}>ยอดประจำวัน</CDBSidebarMenuItem>
            </NavLink>

            <NavLink exact to="/"  activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="exclamation-circle" style={{ color: 'gray' }} >ออกจากระบบ</CDBSidebarMenuItem>
            </NavLink>

          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: 'center' }}>
          <div
            style={{
              padding: '20px 5px',
            }}
          >
            สำหรับแอดมิน
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
      <div className="container-fluid bg-gradient container-user">
         <Outlet />
       </div>
    </div>
  );
};

export default Sidebar;

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
