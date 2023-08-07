import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import "./css_user.css";

function HomeUser() {
  const [dataSoures, setdataSoures] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3001/api/v1/motorcycles").then((response) => {
      setdataSoures(response.data.filter((f) => f.USER_ID === 1));
    });
  }, []);

  return <div>home</div>;
}

export default HomeUser;
