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
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <div class="container-fluid">
                <div class="collapse navbar-collapse justify-content-center">
                <a class="navbar-brand">
                        <h1 class = "header-navber">
                            รกจักรายนต์มือ 2
                        </h1>
                    </a>
                 </div> 
                </div>
            </nav>
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">
                        <h1 class = "header-navber">
                            รกจักรายนต์มือ 2
                        </h1>
                    </a>
                    <ul class="navbar-nav d-flex flex-row me-1">
                        <li class="nav-item me-3 me-lg-0">
                        <a class="nav-link text-white" href="#"><i class="fas fa-envelope mx-1"></i> เข้าสู่ระบบ</a>
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