import React, { Component } from 'react';

function Login() {
    return (
        <div>
        <nav className="navbar navbar-expand-lg bg-custom-grey ">
            <div className="container-fluid">
                <ul className="navbar-nav d-flex flex-row me-1">
                    <li className="nav-item me-3 me-lg-0">
                    <a className="nav-link text-back" ><i className="fas fa-envelope mx-1"></i>เข้าสู่ระบบผู้ใช้</a>
                    </li>
                </ul>
                <ul className="navbar-nav d-flex flex-row me-1">
                    <li className="nav-item me-3 me-lg-0">
                    <a className="nav-link text-back"><i className="fas fa-envelope mx-1"></i>เข้าสู่ระบบแอดมิน</a>
                </li>
                 </ul>
            </div>
        </nav>
    </div>
    );
}

export default Login;