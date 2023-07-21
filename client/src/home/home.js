/* eslint-disable no-unused-expressions */
/* eslint-disable no-restricted-globals */
import React, { Component } from 'react';
//import { Navigate } from 'react-router-dom';
import "./home.css";

function Home(){
    const [gotoLogin,setGotoLogin] = React.useState(false);
    if(gotoLogin){
        //return <Navigate to = "/login" />;
    }
    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark navbar-height">
                <div class="container-fluid">
                <div class="navbar-collapse justify-content-center">
                <a class="navbar-brand">
                        <p class = "header-navber">
                            <a>ร้านรถจักรยานยนต์มือ 2</a>
                        </p>
                    </a>
                 </div> 
                </div>
            </nav>
            <nav class="navbar navbar-expand-lg bg-custom-grey ">
                <div class="container-fluid">
                    <ul class="navbar-nav d-flex flex-row me-1">
                        <li class="nav-item me-3 me-lg-0">
                        <a class="nav-link text-back" ><i class="fas fa-envelope mx-1"></i>รถจักรยานยนต์</a>
                        </li>
                    </ul>
                    <ul class="navbar-nav d-flex flex-row me-1">
                        <li class="nav-item me-3 me-lg-0">
                        <a class="nav-link text-back"><i class="fas fa-envelope mx-1"></i>เข้าสู่ระบบ</a>
                    </li>
                     </ul>
                </div>
            </nav>
            <h1>
                หน้าเเรก
            </h1>
            <button onClick={()=>{
                setGotoLogin(true);
            }}>
                ไปจ้า
            </button>
        </div>
    )
}
export default Home;