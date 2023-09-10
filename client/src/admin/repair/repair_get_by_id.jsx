import React, { Component, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../repair/css/repair_info.css";
import { Form, InputGroup } from "react-bootstrap";
import { Grid, TextField } from "@mui/material";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Navigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from "axios";


export default function RepairGetByIdAdmin() {;
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [Model, setModel] = useState("");
  const [MotorcycleId, setSelectedMotorcycleId] = useState();
  const [MotorcycleNumber, setMotorcycleRigterNumber] = useState();
  const [Wise, setWise] = useState("");
  const [Status, setStatus] = useState("");
  const [motorcycles, setMotorcycles] = useState([]);
  const { REPAILDATA_ID } = useParams();
  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("http://localhost:3001/api/v1/repaildataes/" + REPAILDATA_ID, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result["status"] == "ok") {
          setMotorcycleRigterNumber(result["result"]["MOTORCYCLE_REGISTRATION_NUMBER"]);
          setWise(result["result"]["REPAILDATA_WISE"]);
          setStatus(result["result"]["REPAILDATA_SATUS"]);
        }
      })
      .catch((error) => console.log("error", error));
  }, [REPAILDATA_ID]);

  const MotorcycleGet = () => {
    return fetch("http://localhost:3001/api/v1/motorcycles")
      .then((res) => res.json())
      .then((result) => {
        const motorcycles = result;
        const motorcycleIdMap = new Map();

        motorcycles.forEach((motorcycle) => {
          motorcycleIdMap.set(
            motorcycle.MOTORCYCLE_REGISTRATION_NUMBER,
            motorcycle.MOTORCYCLE_ID
          );
        });

        return motorcycles;
      })
      .catch((error) => {
        console.error("Error fetching motorcycles:", error);
        return [];
      });
  };
  const UserGet = () => {
    return fetch("http://localhost:3001/api/v1/users")
      .then((res) => res.json())
      .then((result) => {
        return result.map((user) => ({
          USER_ID: user.USER_ID,
          USER_FULLNAME: user.USER_FULLNAME,
          USER_TELL: user.USER_TELL,
        }));
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        return [];
      });
  };
  return (
        <div>
           <Grid item xs={12} sm={6}>
              <TextField
                id="MotorcycleNumber"
                label="เลขทะเบียนรถจักรยานยนต์"
                variant="outlined"
                fullWidth
                required
                onChange={(e) => setMotorcycleRigterNumber(e.target.value)}
                value={MotorcycleNumber}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="Wise"
                label="อาการ"
                variant="outlined"
                fullWidth
                required
                onChange={(e) => setWise(e.target.value)}
                value={Wise}
              ></TextField>
            </Grid>
                         
          <button
            type="submit"
            variant="contained"
            class="btn btn-primary mb-3"
          >
            บันทึก
          </button>
        </div>
  );
}