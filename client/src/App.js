/* eslint-disable no-unused-expressions */
/* eslint-disable no-restricted-globals */
import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Route,Router,Routes} from "react-router-dom"
import Home from './home/home';
import Login from './user/login/login';

function App(){
  return(
    <div className='App'>
      <Router>
        <Routes>
          <Route path = "/home" element ={<Home/>}/>
          <Route path = "/login" element ={<Login/>}/>
        </Routes>
      </Router>

    </div>
  )
}export default App;