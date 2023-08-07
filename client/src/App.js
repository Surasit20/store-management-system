import React, { useState, createContext }  from 'react';
import './App.css';
import Home from './home/home';
import Login from './login/login';
import { Outlet } from "react-router-dom";
export const UserContext = createContext(null);
function App(){
  const [userId, setUserId] = useState("");
  return(
    <UserContext.Provider value={{ userId, setUserId }}>
    <div className='App'>
       <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark navbar-height">
                <div className="container-fluid">
                <div className="navbar-collapse justify-content-center">
                <a className="navbar-brand" href='/'>
                        <p className = "header-navber">
                            <a>ร้านรถจักรยานยนต์มือ 2</a>
                        </p>
                    </a>
                 </div> 
                </div>
            </nav>
        </div>

        <div id="detail">
        <Outlet />
      </div>
    </div>
    </UserContext.Provider>
  )
}export default App;