import React, { useState, createContext }  from 'react';
import './App.css';
import Home from './home/home';
import Login from './login/login';
import { Outlet } from "react-router-dom";

function App(){

  return(

    <div className='App'>
       <div>
        </div>

        <div id="detail">
        <Outlet />
      </div>
    </div>

  )
}export default App;