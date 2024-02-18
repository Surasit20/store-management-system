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
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { FaSpinner } from "react-icons/fa";

function DailySummaryAdmin() {
  const [search, setSearch] = useState("");
  const [summary, setSummary] = useState(0);
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [valueDate, setValueDate] = useState(dayjs());
  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(async () => {
    let data1 = await axios.get(
      `https://back-end-store-management-system.onrender.com/api/v1/month-installments`
    );
    let data2 = await axios.get(`https://back-end-store-management-system.onrender.com/api/v1/users`);
    let data3 = await axios.get(`https://back-end-store-management-system.onrender.com/api/v1/motorcycles`);
    console.log(data1.data);
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
    console.log(data1.data);

    let arr1 = data1.data.map((item, i) =>
      Object.assign({}, item, data3.data[i])
    );

    let arr2 = arr1.map((item, i) => Object.assign({}, item, data2.data[i]));
    //   let arr2 = arr1.data.map((item, i) =>
    //  Object.assign({}, item, data3.data[i]));

    let _sum = 0;
    for (var j = 0; j < arr2.length; j++) {
      if (arr2[j].MONTH_INSTALLMENTS_MONEY != null) {
        _sum += parseInt(arr2[j].MONTH_INSTALLMENTS_MONEY);
      }
    }

    setSummary(_sum);
    setItems(arr2);

    setLoading(false);
  }, []);

  const setDateTime = async (dateNow) => {
    setLoading(true);
    let data1 = await axios.get(
      `https://back-end-store-management-system.onrender.com/api/v1/month-installments`
    );
    let data2 = await axios.get(`https://back-end-store-management-system.onrender.com/api/v1/users`);
    let data3 = await axios.get(`https://back-end-store-management-system.onrender.com/api/v1/motorcycles`);
    //console.log(data1.data )
    // ของวันที่ปัจจุบัน
    const today = new Date();
    today.setHours(0, 0, 0, 0); // กำหนดเวลาให้เป็นเที่ยงคืน
    // ฟังก์ชันในการเปรียบเทียบวันที่
    const dateWithoutTime = new Date(dateNow);
    function isToday(date) {
      const dateWithoutTime1 = new Date(date.MONTH_INSTALLMENTS_DATE);

      dateWithoutTime.setHours(0, 0, 0, 0);
      dateWithoutTime1.setHours(0, 0, 0, 0);
      // console.log(dateWithoutTime + "wwww")
      //console.log(dateWithoutTime1)
      return dateWithoutTime.getTime() === dateWithoutTime1.getTime();
    }

    // กรองอาร์เรย์เพื่อให้ได้วันที่ที่เท่ากับวันนี้
    data1.data = data1.data.filter(isToday);
    console.log(data1.data);

    let arr1 = data1.data.map((item, i) =>
      Object.assign({}, item, data3.data[i])
    );

    let arr2 = arr1.map((item, i) => Object.assign({}, item, data2.data[i]));
    //   let arr2 = arr1.data.map((item, i) =>
    //  Object.assign({}, item, data3.data[i]));

    let _sum = 0;
    for (var j = 0; j < arr2.length; j++) {
      if (arr2[j].MONTH_INSTALLMENTS_MONEY != null) {
        _sum += parseInt(arr2[j].MONTH_INSTALLMENTS_MONEY);
      }
    }

    setSummary(_sum);
    setItems(arr2);

    setLoading(false);
  };
  const UserGet = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("https://back-end-store-management-system.onrender.com/api/v1/month-installments", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setItems(result);
      })
      .catch((error) => console.log("error", error));
  };

  const UserDelete = (USER_ID) => {
    var requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };

    fetch(`https://back-end-store-management-system.onrender.com/api/v1/users/${USER_ID}`, requestOptions)
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
      <div className="header-with-button with-underline">
        <div className="header" style={{paddingTop : '10px'}}>
          <h1 class="text-color">
            <strong style={{fontSize : '30px'}}>ยอดประจำวัน</strong>
          </h1>
        </div>
        <p style={{color : '#1BA7E1' , paddingLeft : '10px' ,marginTop : '10px'}}> < strong>สรุปยอดประจำวัน :  {summary} บาท</strong></p>
        <LocalizationProvider dateAdapter={AdapterDayjs}      
>
  <DemoContainer components={["DatePicker"]}>
    <DatePicker
      label="วันที่"
      value={valueDate} 
      onChange={(newValue) => {
        setValueDate(newValue);
        setDateTime(newValue);
      }}
      format="DD/MM/YYYY" 

    />
  </DemoContainer>
</LocalizationProvider>
      </div>

      <form class="search-form" style={{marginTop : '10px'}}>
        <input
          type="search"
          onChange={handleInputChange}
          placeholder="ค้นหา"
          class="search-input"
        />
      </form>
   
        
       
      <div className="Contrianer" style={{height : '79vh'}}>
        <div class="header-t">
          <div>
            <TableContainer sx={{ maxHeight: 440, borderRadius: 2 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow class="table-row">
                    <TableCell
                      class="t-rig"
                      style={{ padding: "10px", color: "#1ba7e1" }}
                    >
                      เวลา
                    </TableCell>
                    <TableCell
                      class="t-rig"
                      style={{ padding: "10px", color: "#1ba7e1" }}
                    >
                      เลขตัวถัง
                    </TableCell>
                    <TableCell
                      class="t-rig"
                      style={{ padding: "10px", color: "#1ba7e1" }}
                    >
                      จำนวนเงิน
                    </TableCell>
                    <TableCell
                      class="t-rig"
                      style={{ padding: "10px", color: "#1ba7e1" }}
                    >
                      ชื่อนามสกุล
                    </TableCell>
                  </TableRow>
                </TableHead>
              </Table>
            </TableContainer>
          </div>
        </div>
        <div className="Contrainer-data">
        {loading ? (
          <div className="spinner-container">
            <FaSpinner
              className="spinner"
              style={{ fontSize: "90px", color: "#82b1ff" }}
            />
          </div>
        ) : (
          <Paper  
          sx={{
            width: "100%",
            overflow: "hidden",
            backgroundColor: "#f8ffff",
            boxShadow: "none",
          }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableBody>
                  {items
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .filter((row) => {
                      return (
                        search.trim() === "" ||
                        row.MONTH_INSTALLMENTS_TIME.toLowerCase().includes(
                          search.toLowerCase()
                        ) ||
                        row.MOTORCYCLE_BUCKET_NUMBER.toLowerCase().includes(
                          search.toLowerCase()
                        ) ||
                        row.MONTH_INSTALLMENTS_MONEY.toLowerCase().includes(
                          search.toLowerCase()
                        ) ||
                        row.USER_FULLNAME.toLowerCase().includes(
                          search.toLowerCase()
                        )
                      );
                    })
                    .map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell class="t-rig" style={{
                                verticalAlign: "middle",
                                padding: "10px",
                                color: "#858585",
                              }}>{row.MONTH_INSTALLMENTS_TIME}</TableCell>
                        <TableCell class="t-rig" style={{
                                verticalAlign: "middle",
                                padding: "10px",
                                color: "#858585",
                              }}>{row.MOTORCYCLE_BUCKET_NUMBER}</TableCell>
                        <TableCell class="t-rig" style={{
                                verticalAlign: "middle",
                                padding: "10px",
                                color: "#858585",
                              }}>{row.MONTH_INSTALLMENTS_MONEY}</TableCell>
                        <TableCell class="t-rig" style={{
                                verticalAlign: "middle",
                                padding: "10px",
                                color: "#858585",
                              }}>{row.USER_FULLNAME}</TableCell>
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
              labelRowsPerPage="จำนวนแถวต่อหน้า :"
              labelDisplayedRows={({ from, to, count }) =>
                `${from}-${to} จากทั้งหมด ${count}`
              }
            />
          </Paper>
        )}

        </div>
       
      </div>
    </div>
  );
}

export default DailySummaryAdmin;
