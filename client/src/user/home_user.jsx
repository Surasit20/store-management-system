import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import "./css_user.css";
import CardCar from "../component/card_car";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

function HomeUser() {
  const [dataSoures, setdataSoures] = useState([]);
  const [user, setUser] = useState();

  useEffect(() => {
    const dataUser = JSON.parse(localStorage.getItem("user"));
    if (dataUser) {
      setUser(dataUser.data.user);
    }
    console.log(dataUser.data.user);
    axios.get("http://localhost:3001/api/v1/motorcycles").then((response) => {
      var data = response.data.filter(
        (f) => f.USER_ID == dataUser.data.user.USER_ID
      );
      console.log(data);
      setdataSoures(data);
    });
  }, []);

  return (
    <div>
      <ImageList
        style={{ overflow: "hidden" }}
        sx={{ width: 1920, height: 1000 }}
        cols={4}
        rowHeight={164}
      >
        {dataSoures.map((i) => {
          return (
            <CardCar
              key={i.MOTORCYCLE_ID}
              MOTORCYCLE_BRAND={i.MOTORCYCLE_BRAND}
              MOTORCYCLE_PRICE={i.MOTORCYCLE_PRICE}
              MOTORCYCLE_IMAGE={i.MOTORCYCLE_IMAGE}
              MOTORCYCLE_MODEL={i.MOTORCYCLE_MODEL}
              MOTORCYCLE_COLOR={i.MOTORCYCLE_COLOR}
              MOTORCYCLE_BUCKET_NUMBER={i.MOTORCYCLE_BUCKET_NUMBER}
              MOTORCYCLE_REGISTRATION_NUMBER={i.MOTORCYCLE_REGISTRATION_NUMBER}
            ></CardCar>
          );
        })}
      </ImageList>
    </div>
  );
}

export default HomeUser;
