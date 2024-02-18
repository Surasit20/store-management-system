import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import "./css_user.css";
import CardCar1 from "../component/card_car_1";
import CardCar2 from "../component/card_car_2";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { Grid, TextField, Box, Button, Badge } from "@mui/material";
function HomeUser() {
  const [dataSoures, setdataSoures] = useState([]);
  const [user, setUser] = useState();
  const [search, setSearch] = useState("");
  useEffect(() => {
    const dataUser = JSON.parse(localStorage.getItem("user"));
    if (dataUser) {
      setUser(dataUser.data.user);
    }
    console.log(dataUser.data.user);
    axios.get("https://back-end-store-management-system.onrender.com/api/v1/motorcycles").then((response) => {
      var data = response.data.filter(
        (f) => f.USER_ID == dataUser.data.user.USER_ID
      );
      console.log(data);
      setdataSoures(data);
    });
  }, []);
  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };
  return (
    <div>
<h1 className="border-header">ข้อมูลรถจักรยานยนต์</h1>

<form className="search-form">
        <input
          type="search"
          onChange={handleInputChange}
          placeholder="ค้นหา"
          class="search-input"
        />
      </form>
      
        {dataSoures.filter(f=> search != "" ? f.MOTORCYCLE_BRAND.includes(search) : true ||
                               search != "" ? f.MOTORCYCLE_MODEL.includes(search) : true ||
                               search != "" ? f.MOTORCYCLE_REGISTRATION_NUMBER.includes(search) : true
        
        ).map((i) => {
          return (
            <CardCar1
              key={i.MOTORCYCLE_ID}
              MOTORCYCLE_BRAND={i.MOTORCYCLE_BRAND}
              MOTORCYCLE_PRICE={i.MOTORCYCLE_PRICE}
              MOTORCYCLE_IMAGE={i.MOTORCYCLE_IMAGE}
              MOTORCYCLE_MODEL={i.MOTORCYCLE_MODEL}
              MOTORCYCLE_COLOR={i.MOTORCYCLE_COLOR}
              MOTORCYCLE_BUCKET_NUMBER={i.MOTORCYCLE_BUCKET_NUMBER}
              MOTORCYCLE_REGISTRATION_NUMBER={i.MOTORCYCLE_REGISTRATION_NUMBER}
              MOTORCYCLE_ID={i.MOTORCYCLE_ID}
              IS_RECEIPT={false}
              INSTALLMENTS_ID={null}
            ></CardCar1>
          );
        })}
    </div>
  );
}

export default HomeUser;
