import React, { Component, useEffect, useState } from "react";
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


export default function RepairAddAdmin() {;
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [Model, setModel] = useState("");
  const [MotorcycleId, setSelectedMotorcycleId] = useState();
  const [MotorcycleNumber, setMotorcycleRigterNumber] = useState();
  const [Wise, setWise] = useState("");
  const [Status, setStatus] = useState("");
  const [motorcycles, setMotorcycles] = useState([]);

  const motorcycleIdMap = new Map();
  useEffect(() => {
    Promise.all([MotorcycleGet(), UserGet()])
      .then(([motorcycleData, users]) => {
        const filteredItems = motorcycleData.filter(
          (item) => item.USER_ID !== null
        );
        setItems(
          filteredItems.map((item) => {
            const user = users.find((u) => u.USER_ID === item.USER_ID);
            return {
              ...item,
              USER_FULLNAME: user ? user.USER_FULLNAME : "N/A",
              USER_TELL: user ? user.USER_TELL : "N/A",
            };
          })
        );
        setMotorcycles(motorcycleData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const handleSave = async() => {

    if (MotorcycleNumber !== null) {
      const selectedMotorcycle = motorcycles.find(
        (motorcycle) => motorcycle.MOTORCYCLE_REGISTRATION_NUMBER === MotorcycleNumber
      );
  
      if (selectedMotorcycle) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
  
        var raw = JSON.stringify({
          MOTORCYCLE_ID: selectedMotorcycle.MOTORCYCLE_ID, 
          REPAILDATA_WISE: Wise,
          REPAILDATA_SATUS: Status,
        });
  
        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };
  
        fetch("http://localhost:3001/api/v1/repaildataes", requestOptions)
          .then((response) => response.text())
          .then((result) => {
            console.log(result);
            console.log("motorcycles:", motorcycles);
            // ทำการปรับปรุงสถานะหรือทำอย่างอื่นตามที่คุณต้องการหลังจากบันทึกข้อมูลสำเร็จ
          })
          .catch((error) => console.log("error", error));
      } else {
        console.error("ไม่มี", MotorcycleNumber);
      }
    } else {
      console.error("บันทึกไม่ได้");
    }
  };

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
 const handleDropDownChange = async(event , context) => {
    console.log(context)
    context.REPAILDATA_SATUS = parseInt(event.target.value);
    console.log(context)
    let res = await axios.put(`http://localhost:3001/api/v1/repaildataes/`+context.REPAILDATA_ID,context);
     if(res.status == 200){
       let data1 = await axios.get(
         `http://localhost:3001/api/v1/repaildataes`
       );
       let data2 = await axios.get(`http://localhost:3001/api/v1/motorcycles`);
   
       let data3 = await axios.get(`http://localhost:3001/api/v1/users`);
   
       let arr3 = data1.data.map((item, i) =>
         Object.assign({}, item, data2.data[i], data3.data[i])
       );
   
       console.log(arr3);
   
       setItems(arr3);
     }
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
        <form
          onSubmit={(event) => {
            event.preventDefault();
            if (MotorcycleNumber !== null) {
              handleSave({
                MOTORCYCLE_ID: MotorcycleId,
                REPAILDATA_WISE: Wise,
                REPAILDATA_SATUS: Status,
              });
            } else {
              console.error("MotorcycleNumber is null, cannot save.");
            }
          }}
        >
           <Grid item xs={12} sm={6}>
              <TextField
                id="Wise"
                label="เลขทะเบียนรถจักรยานยนต์"
                variant="outlined"
                fullWidth
                required
                onChange={(e) => setMotorcycleRigterNumber(e.target.value)}
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
              ></TextField>
            </Grid>
            <Box sx={{ minWidth: 120 }}>                    
                      <FormControl fullWidth >
                        <InputLabel id="demo-simple-select-label">เลือกสถานะ</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label="เลือกสถาณะ"
                          onChange={(e) => setStatus(e.target.value)}
                    
                          >
                          <MenuItem value={0}>อยู่ระหว่างการดำเนินงาน</MenuItem>
                          <MenuItem value={1}>เรียบร้อย</MenuItem>
                                    
                        </Select>
                      </FormControl>
                    </Box>                   
          <button
            type="submit"
            variant="contained"
            class="btn btn-primary mb-3"
          >
            บันทึก
          </button>
        </form>
  );
}