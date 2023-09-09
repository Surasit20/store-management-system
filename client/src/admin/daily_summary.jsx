import React, { Component, useEffect, useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Navigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

function DailySummaryAdmin() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [value, setValue] = React.useState(new Date('2014-08-18T21:11:54'));
  const [valueDate, setValueDate] = React.useState(new Date());
  const [valueDate1, setDate1] = React.useState(dayjs());
  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };

  const handleChange = (newValue) => {
    setValue(newValue);
  };
  useEffect(async() => {
    let data1 = await axios.get(`http://localhost:3001/api/v1/month-installments`);
    let data2 = await axios.get(`http://localhost:3001/api/v1/users`);
    let data3 = await axios.get(`http://localhost:3001/api/v1/motorcycles`);
    console.log(data1.data )
    // ของวันที่ปัจจุบัน
    const today = new Date();
    today.setHours(0, 0, 0, 0); // กำหนดเวลาให้เป็นเที่ยงคืน
    // ฟังก์ชันในการเปรียบเทียบวันที่
    function isToday(date) {
      const dateWithoutTime = new Date(date.MONTH_INSTALLMENTS_DATE);
      dateWithoutTime.setHours(0, 0, 0, 0);
      return dateWithoutTime.getTime() === today.getTime();
    }

// กรองอาร์เรย์เพื่อให้ได้วันที่ที่เท่ากับวันนี้
  data1.data = data1.data.filter(isToday);
  console.log(data1.data )

    let arr1 = data1.data.map((item, i) =>
    Object.assign({}, item, data3.data[i]))

    let arr2 = arr1.map((item, i) =>
    Object.assign({}, item, data2.data[i]))
    //   let arr2 = arr1.data.map((item, i) =>
    //  Object.assign({}, item, data3.data[i]));

   
    setItems(arr2)

    setLoading(false);
  }, []);


  const setDateTime = async(dateNow)=>{

    setLoading(true);
    let data1 = await axios.get(`http://localhost:3001/api/v1/month-installments`);
    let data2 = await axios.get(`http://localhost:3001/api/v1/users`);
    let data3 = await axios.get(`http://localhost:3001/api/v1/motorcycles`);
    console.log(data1.data )
    // ของวันที่ปัจจุบัน
    const today = new Date();
    today.setHours(0, 0, 0, 0); // กำหนดเวลาให้เป็นเที่ยงคืน
    // ฟังก์ชันในการเปรียบเทียบวันที่
    const dateWithoutTime =  new Date(dateNow);
    function isToday(date) {


      
      const dateWithoutTime1 =  new Date(date.MONTH_INSTALLMENTS_DATE);

      dateWithoutTime.setHours(0, 0, 0, 0);
      dateWithoutTime1.setHours(0, 0, 0, 0);
      console.log(dateWithoutTime + "wwww")
      console.log(dateWithoutTime1)
      return dateWithoutTime.getTime() === dateWithoutTime1.getTime();
    }

// กรองอาร์เรย์เพื่อให้ได้วันที่ที่เท่ากับวันนี้
  data1.data = data1.data.filter(isToday);
  console.log(data1.data )

    let arr1 = data1.data.map((item, i) =>
    Object.assign({}, item, data3.data[i]))

    let arr2 = arr1.map((item, i) =>
    Object.assign({}, item, data2.data[i]))
    //   let arr2 = arr1.data.map((item, i) =>
    //  Object.assign({}, item, data3.data[i]));

   
    setItems(arr2)

    setLoading(false);
  }
  const UserGet = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch("http://localhost:3001/api/v1/month-installments", requestOptions)
  .then(response => response.json())
  .then((result) => {
    
    setItems(result);
  })
  .catch(error => console.log('error', error));
  };




  const UserDelete = (USER_ID) => {
    var requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };

    fetch(
      `http://localhost:3001/api/v1/users/${USER_ID}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
    window.location.reload();
  };

  const UserUpdate = (USER_ID) => {
    window.location = "/admin/user/user-update/" + USER_ID;
  };

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };



  return (
    <div> 
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker 
        label="Basic date picker"
    
        onChange={(newValue) =>{ setValueDate(newValue); setDateTime(newValue)}}
        />
      </DemoContainer>
    </LocalizationProvider>
    
    {loading ? (
      <p>Loading...</p>
    ) : (
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>เวลา</TableCell>
                <TableCell>เลขตัวถัง</TableCell>
                <TableCell>จำนวนเงิน</TableCell>
                <TableCell>ชื่อนามสกุล</TableCell>
 
              </TableRow>
            </TableHead>
            <TableBody>
              {items
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .filter((row) => {
                  return (
               true
                  );
                })
                .map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{row.MONTH_INSTALLMENTS_TIME}</TableCell>
                    <TableCell>{row.MOTORCYCLE_BUCKET_NUMBER}</TableCell>
                    <TableCell>
                      {row.MONTH_INSTALLMENTS_MONEY}
                    </TableCell>
                    <TableCell>
                    {row.USER_FULLNAME}
                    </TableCell>

                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={items.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="จำนวนแถวต่อหน้า:"
          labelDisplayedRows={({ from, to, count }) =>
            `${from}-${to} จากทั้งหมด ${count}`
          }
        />
      </Paper>
    )}
  </div>
  );
}

export default DailySummaryAdmin;
