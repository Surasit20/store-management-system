import React, { Component, useEffect, useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import "./css/motorcycle_info.css";
import "./css_admin.css";
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
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from "axios";
import TextField from "@mui/material/TextField";
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimeField } from '@mui/x-date-pickers/DateTimeField';
import { FaSpinner } from "react-icons/fa";
import Swal from "sweetalert2";
function PaymentCheckAdmin() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [contextData, setContextData] = useState();
  const [statusBefore, setStatusBefore] = useState(0);
  const [statusAfter, setStatusAfter] = useState(0);
  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };
  const now = new Date();
  const day = now.getDay(); // returns a number representing the day of the week, starting with 0 for Sunday
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const [value, setValue] = React.useState(dayjs(now));
  const [bill, setBill] = useState({
    time: now.getTime,
    data: now.getDate,
    user: "",
    number: "",
    pay: 0,
    totol: 0,
  });

  const handleOpenDialog = async (context) => {
    setStatusBefore(context.MONTH_INSTALLMENTS_STATUS)
    setStatusAfter(context.MONTH_INSTALLMENTS_STATUS);
    console.log(context)
    setContextData(context);

      setOpen(true)
    

  };

  const handleDropDownChange = async (event, context) => {
    setStatusBefore(context.MONTH_INSTALLMENTS_STATUS)
    setStatusAfter(parseInt(event.target.value));
    console.log(context)

    setContextData(context);
    if(statusAfter != 1 ){
      setOpen(true)

    }
  };
  useEffect(async () => {

    let data1 = await axios.get(`http://localhost:3001/api/v1/month-installments`
    );
    let data2 = await axios.get(`http://localhost:3001/api/v1/motorcycles`);
    let data3 = await axios.get(`http://localhost:3001/api/v1/users`);


    let data4 = await axios.get(`http://localhost:3001/api/v1/installments`);
    let test = []
    console.log(data4.data)
    if (data1.data != null && data1.data != []) {
      data1.data.forEach(element => {
        let installments = data4.data.filter(f => f.INSTALLMENTS_ID == element.INSTALLMENTS_ID)

        let motorcycle = data2.data.filter(f => f.USER_ID == installments.USER_ID)
        let user = data3.data.filter(f => f.MOTORCYCLE_ID == motorcycle.MOTORCYCLE_ID)
    
        if (installments.length > 0) {
          let returnedTarget = Object.assign(element, ...installments, ...motorcycle, ...user);
          test.push(returnedTarget)
        }
      })
    }


    // let arr3 = data1.data.map((item, i) =>
    //   Object.assign({}, item, data2.data[i], data3.data[i])
    // );



    setItems(test);
    setLoading(false);
  }, []);


  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleUpdateComment = (args) => {
    contextData.MONTH_INSTALLMENTS_COMMENT = args;

    console.log(args)
    console.log(contextData)
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [gotoAddMotorcycle, setGotoAddMotorcycle] = React.useState(false);
  if (gotoAddMotorcycle) {
    return <Navigate to="/admin/add-motorcycle" />;
  }

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = async() => {
    console.log(contextData)
    contextData.MONTH_INSTALLMENTS_STATUS = statusAfter;
    setStatusBefore(contextData.MONTH_INSTALLMENTS_STATUS)
    let res = await axios.put(`http://localhost:3001/api/v1/month-installments/` + contextData.MONTH_INSTALLMENTS_ID, contextData);

    if(res.status == 200){
      window.location.reload(); 
    }
    else{
      Swal.fire({
        title: "เกิดข้อผิดพลาด",
        text: res.data,
        icon: "error",
        confirmButtonText: "ตกลง",
      });
    }
  };

  return (
    <div>
           <div className="header-with-button with-underline">
        <div className="header">
          <h1 class="text-color">
            <strong>ตรวจสอบการชำระ</strong>
          </h1>
        </div>
      </div>

      <form class="search-form">
        <input
          type="search"
          onChange={handleInputChange}
          placeholder="ค้นหา"
          class="search-input"
        />
      </form>

      <div className="Contrianer">
      <div class="header-t">
          <div>
            <TableContainer sx={{ maxHeight: 440, borderRadius: 2 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow class="table-row">
                  <TableCell class="t-rig" style={{ padding: "10px", color: "#1ba7e1" }}>เลขตัวถัง</TableCell>
                  <TableCell class="t-rig" style={{ padding: "10px", color: "#1ba7e1" }}>ชื่อ-นามสกุล</TableCell>
                  <TableCell class="t-rig" style={{ padding: "10px", color: "#1ba7e1" }}>หลักฐาน</TableCell>
                  <TableCell class="t-rig" style={{ padding: "10px", color: "#1ba7e1" }}>สถานะ</TableCell>
                  <TableCell class="t-rig" style={{ padding: "10px", color: "#1ba7e1" }}>ใบเสร็จ</TableCell>
                </TableRow>
                </TableHead>
              </Table>
            </TableContainer>
          </div>
        </div>
        
        {loading ? (
        <div className="spinner-container">
          <FaSpinner
            className="spinner"
            style={{ fontSize: "90px", color: "#82b1ff" }}
          />
        </div>
      ) : (
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
            <TableBody>
                {items
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .filter((row) => {
                    return (
                      search.trim() === "" ||
                      row.USER_FULLNAME.toLowerCase().includes(
                        search.toLowerCase()
                      ) ||
                      row.MOTORCYCLE_BUCKET_NUMBER.toLowerCase().includes(
                        search.toLowerCase()
                      ) ||
                      row.MOTORCYCLE_REGISTRATION_NUMBER.toLowerCase().includes(
                        search.toLowerCase()
                      )
                    );
                  })
                  .map((row) => (
                    <TableRow
                      key={row.MONTH_INSTALLMENTS_ID}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell>{row.MOTORCYCLE_BUCKET_NUMBER}</TableCell>
                      <TableCell>{row.USER_FULLNAME}</TableCell>
                      <TableCell>
                        <a target="_blank" href={row.MONTH_INSTALLMENTS_IMAGE}>ดูสลิปใบเสร็จ</a>
                      </TableCell>
                      <TableCell>
                        {row.MONTH_INSTALLMENTS_STATUS == 1
                          ? <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth >
                              <InputLabel id="demo-simple-select-label">เลือกสถาณะ</InputLabel>
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={row.MONTH_INSTALLMENTS_STATUS}
                                label="เลือกสถาณะ"
                                onChange={(e) => handleDropDownChange(e, row)}

                              >
                                <MenuItem value={1}>รออนุมัติ</MenuItem>
                                <MenuItem value={2}>ผ่าน</MenuItem>
                                <MenuItem value={0}>ไม่ผ่าน</MenuItem>

                              </Select>
                            </FormControl>
                          </Box>


                          : <Box sx={{ minWidth: 120 }}>

                            <FormControl fullWidth disabled>
                              <InputLabel id="demo-simple-select-label">เลือกสถาณะ</InputLabel>
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={row.MONTH_INSTALLMENTS_STATUS}
                                label="เลือกสถาณะ"
                                onChange={handleDropDownChange}

                              >
                                <MenuItem value={1}>รออนุมัติ</MenuItem>
                                <MenuItem value={2}>ผ่าน</MenuItem>
                                <MenuItem value={0}>ไม่ผ่าน</MenuItem>

                              </Select>
                            </FormControl>
                          </Box>
                        }


                      </TableCell>
                      <TableCell>
                        <Button
                          type="button"
                          className="btn btn-success"
                          disabled = {row.MONTH_INSTALLMENTS_STATUS == 1}
                          onClick={() => handleOpenDialog(row)}
                        >
                          ดูใบเสร็จ
                        </Button>
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
<Dialog open={open} onClose={handleClose}>
<DialogTitle>ใบเสร็จ</DialogTitle>
<DialogContent>
  <DialogContentText>
    กรอกข้อมูลการออกใบเสร็จ
  </DialogContentText>
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <DemoContainer components={['DateTimeField', 'DateTimeField']}>
      <DateTimeField
        label="วันที่และเวลา"
        value={value}
        onChange={(newValue) => setValue(newValue)}
        disabled = {true}

      />
    </DemoContainer>
  </LocalizationProvider>
  <TextField
    id="User"
    label="ชื่อผู้ใช้"
    variant="outlined"
    fullWidth
    required
    value={contextData?.USER_FULLNAME ?? ""}
    InputProps={{
      readOnly: true,
    }}
  ></TextField>

  <TextField
    id="์Number"
    label="เลขตัวถัง"
    variant="outlined"
    fullWidth
    required
    value={contextData?.MOTORCYCLE_BUCKET_NUMBER ?? ""}
    InputProps={{
      readOnly: true,
    }}
  ></TextField>


  <TextField
    id="Pay"
    label="จำนวนเงินที่ต้องชำระ"
    variant="outlined"
    fullWidth
    required
    value={contextData?.INSTALLMENTS_MONEY  ?? ""}
    InputProps={{
      readOnly: true,
    }}
  ></TextField>
  <TextField
    id="Total"
    label="จำนวนเงินทั้งสิ้น"
    variant="outlined"
    fullWidth
    required
    value={contextData?.INSTALLMENTS_MONEY ?? ""}
    InputProps={{
      readOnly: true,
    }}
  ></TextField>
{statusAfter == 0 ? 
<TextField
    id="Comment"
    label="หมายเหตุ"
    variant="outlined"
    fullWidth
    required
    defaultValue={contextData?.MONTH_INSTALLMENTS_COMMENT ?? ""}
    onChange={(e) => handleUpdateComment(e.target.value)}
    InputProps={{
      readOnly: statusBefore != 1? true:false,
    }}
  ></TextField>: <div></div>}

</DialogContent>
<DialogActions>
<Button onClick={handleClose}>ออก</Button> 
  {statusBefore == 1 ?      <Button onClick={handleSubmit}>ยืนยัน</Button> :      <Button  disabled={true} onClick={handleSubmit}>ยืนยัน</Button>}

</DialogActions>
</Dialog>

     
    </div>
  );
}

export default PaymentCheckAdmin;
