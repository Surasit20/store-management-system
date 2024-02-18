import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import "./css_user.css";
import CardCar from "../component/card_car";
import CardCar1 from "../component/card_car_1";
import ImageList from "@mui/material/ImageList";
function ReceiptUser() {
  const [dataSoures, setdataSoures] = useState([]);
  const [user, setUser] = useState();
  const [search, setSearch] = useState("");
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

  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };
  return (
    <div>
      <h1 className="border-header">ข้อมูลการชำระค่างวด</h1>

<form className="search-form">
        <input
          type="search"
          onChange={handleInputChange}
          placeholder="ค้นหา"
          class="search-input"
        />
      </form>


      <div>

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
                MOTORCYCLE_REGISTRATION_NUMBER={
                  i.MOTORCYCLE_REGISTRATION_NUMBER
                }
                MOTORCYCLE_ID={i.MOTORCYCLE_ID}
                
                IS_RECEIPT={true}
              ></CardCar1>
            );
          })}

      </div>
    </div>
  );
}

export default ReceiptUser;
