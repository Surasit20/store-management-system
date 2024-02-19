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
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import TextField from "@mui/material/TextField";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimeField } from "@mui/x-date-pickers/DateTimeField";
import { FaSpinner } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileText,
  faCheck,
  faFileImage,
  faBan
} from "@fortawesome/free-solid-svg-icons";
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
  const [Remark, setRemark] = useState("");
  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };
  const [validationMessages, setValidationMessages] = useState({
    Remark: '',
    // Add more fields as needed
  });
  const validateInput = () => {
    let isValid = true;
    const messages = {
      Remark: ''
    };
    if (!Remark) {
      isValid = false;
      messages.Remark = 'กรุณาระบุราคา';
    }
  
    setValidationMessages(messages);
    return isValid;
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
    setStatusBefore(context.MONTH_INSTALLMENTS_STATUS);
    setStatusAfter(context.MONTH_INSTALLMENTS_STATUS);
    console.log(context);
    setContextData(context);

    setOpen(true);
  };

  const handleDropDownChange = async (event, context) => {
    setStatusBefore(context.MONTH_INSTALLMENTS_STATUS);
    setStatusAfter(parseInt(event.target.value));
    console.log(context);

    setContextData(context);
    if (statusAfter != 1) {
      setOpen(true);
    }
  };
  useEffect(async () => {
    let data1 = await axios.get(
      `https://back-end-store-management-system.onrender.com/api/v1/month-installments`
    );
    let data2 = await axios.get(`https://back-end-store-management-system.onrender.com/api/v1/motorcycles`);
    let data3 = await axios.get(`https://back-end-store-management-system.onrender.com/api/v1/users`);

    let data4 = await axios.get(`https://back-end-store-management-system.onrender.com/api/v1/installments`);
    let test = [];
    console.log(data4.data);
    if (data1.data != null && data1.data != []) {
      data1.data.forEach((element) => {
        let installments = data4.data.filter(
          (f) => f.INSTALLMENTS_ID == element.INSTALLMENTS_ID
        );

        let motorcycle = data2.data.filter(
          (f) => f.USER_ID == installments.USER_ID
        );
        let user = data3.data.filter(
          (f) => f.MOTORCYCLE_ID == motorcycle.MOTORCYCLE_ID
        );

        if (installments.length > 0) {
          let returnedTarget = Object.assign(
            element,
            ...installments,
            ...motorcycle,
            ...user
          );
          test.push(returnedTarget);
        }
      });
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

    console.log(args);
    console.log(contextData);
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
  const handleSubmit = async () => {
    console.log(contextData);
    contextData.MONTH_INSTALLMENTS_STATUS = statusAfter;
    setStatusBefore(contextData.MONTH_INSTALLMENTS_STATUS);
    let res = await axios.put(
      `https://back-end-store-management-system.onrender.com/api/v1/month-installments/` +
        contextData.MONTH_INSTALLMENTS_ID,
      contextData
    );


    if (res.status == 200) {
      Swal.fire({
        title: "บันทึกข้อมูลสำเร็จ",
        icon: "success",
        confirmButtonText: "ตกลง",
      }).then(() => {
        window.location.reload();
      });
    } else {
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
        <div className="header" style={{ paddingTop: "10px" }}>
          <h1 class="text-color">
            <strong style={{ fontSize: "30px" }}>ตรวจสอบการชำระ</strong>
          </h1>
        </div>
      </div>

      <form class="search-form" style={{ marginTop: "10px" }}>
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
                    <TableCell
                      class="t-rig"
                      style={{ padding: "10px", color: "#1ba7e1" }}
                    >
                      เลขทะเบียนรถ
                    </TableCell>
                    <TableCell
                      class="t-rig"
                      style={{ padding: "10px", color: "#1ba7e1" }}
                    >
                      ชื่อ-นามสกุล
                    </TableCell>
                    <TableCell
                      class="t-rig"
                      style={{ padding: "10px", color: "#1ba7e1" }}
                    >
                      หลักฐาน
                    </TableCell>
                    <TableCell
                      class="t-rig"
                      style={{ padding: "10px", color: "#1ba7e1" }}
                    >
                      สถานะ
                    </TableCell>
                    <TableCell
                      class="t-rig"
                      style={{ padding: "10px", color: "#1ba7e1" }}
                    >
                      ใบเสร็จ
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
              }}
            >
              <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableBody>
                    {items
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .filter((row) => {
                        return (
                          search.trim() === "" ||
                          row.USER_FULLNAME.toLowerCase().includes(
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
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell
                            class="t-rig"
                            style={{
                              verticalAlign: "middle",
                              padding: "10px",
                              color: "#858585",
                            }}
                          >
                            {row.MOTORCYCLE_REGISTRATION_NUMBER}
                          </TableCell>
                          <TableCell
                            class="t-rig"
                            style={{
                              verticalAlign: "middle",
                              padding: "10px",
                              color: "#858585",
                            }}
                          >
                            {row.USER_FULLNAME}
                          </TableCell>
                          <TableCell
                            class="t-rig"
                            style={{
                              verticalAlign: "middle",
                              padding: "10px",
                              color: "#858585",
                            }}
                          >
                            <Button
                              variant="outlined"
                              component="a"
                              target="_blank"
                              href={row.MONTH_INSTALLMENTS_IMAGE}
                              style={{
                                width: "50px",
                                height: "50px",
                                border: "1px solid #1ba7e1 ",
                              }}
                            >
                              <FontAwesomeIcon
                                icon={faFileImage}
                                style={{
                                  color: "#1ba7e1",
                                  width: "30x",
                                  height: "25px",
                                  transition:
                                    "background-color 0.3s, border-color 0.3s",
                                }}
                              />
                            </Button>
                          </TableCell>
                          <TableCell
                            class="t-rig"
                            style={{
                              verticalAlign: "middle",
                              padding: "10px",
                              color: "#858585",
                            }}
                          >
                            {row.MONTH_INSTALLMENTS_STATUS == 1 ? (
                              <Box sx={{ minWidth: 120 }}>
                                <FormControl fullWidth>
                                  <InputLabel id="demo-simple-select-label">
                                    เลือกสถานะ
                                  </InputLabel>
                                  <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={row.MONTH_INSTALLMENTS_STATUS}
                                    label="เลือกสถาณะ"
                                    onChange={(e) =>
                                      handleDropDownChange(e, row)
                                    }
                                  >
                                    <MenuItem value={1}>รออนุมัติ</MenuItem>
                                    <MenuItem value={2}>ผ่าน</MenuItem>
                                    <MenuItem value={0}>ไม่ผ่าน</MenuItem>
                                  </Select>
                                </FormControl>
                              </Box>
                            ) : (
                              <Box sx={{ minWidth: 120 }}>
                                <FormControl fullWidth disabled>
                                  <InputLabel id="demo-simple-select-label">
                                    เลือกสถาณะ
                                  </InputLabel>
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
                            )}
                          </TableCell>
                          <TableCell
                            class="t-rig"
                            style={{
                              verticalAlign: "middle",
                              padding: "10px",
                              color: "#858585",
                            }}
                          >
                            <Button
                              type="button"
                              style={{
                                width: "50px",
                                height: "50px",
                                border: "1px solid #FBB05E ",
                              }}
                              disabled={row.MONTH_INSTALLMENTS_STATUS == 1}
                              onClick={() => handleOpenDialog(row)}
                            >
                              {row.MONTH_INSTALLMENTS_STATUS == 1 ? (
                                <FontAwesomeIcon
                                  icon={faFileText}
                                  style={{
                                    color: "#gray",
                                    width: "30x",
                                    height: "25px",
                                    transition:
                                      "background-color 0.3s, border-color 0.3s",
                                  }}
                                />
                              ) : (
                                <FontAwesomeIcon
                                  icon={faFileText}
                                  style={{
                                    color: "#FBB05E",
                                    width: "30x",
                                    height: "25px",
                                    transition:
                                      "background-color 0.3s, border-color 0.3s",
                                  }}
                                />
                              )}
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[8, 10, 100]}
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
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle  style={{
              color: "#1ba7e1",
              fontWeight: "bold",
            }}>ใบเสร็จ</DialogTitle>
        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DateTimeField", "DateTimeField"]}>
              <p  style={{
              color: "#858585",
            }}>วันที่เเละเวลา</p>
              <DateTimeField
                value={value}
                onChange={(newValue) => setValue(newValue)}
                disabled={true}
                sx={{ width: "400px", height: "10px", paddingBottom: "80px" , color: "#B0B0B0"}}
              />
            </DemoContainer>
          </LocalizationProvider>
          <p  style={{
              color: "#858585",
            }}>ชื่อผู้ใช้</p>
          <TextField
            id="User"
            variant="outlined"
            fullWidth
            required
            value={contextData?.USER_FULLNAME ?? ""}
            disabled={true}
            sx={{ width: "400px", height: "10px", paddingBottom: "80px" ,color: "#B0B0B0"}}
          ></TextField>
          <p  style={{
              color: "#858585",
            }}>เลขตัวถัง</p>
          <TextField
            id="์Number"
            variant="outlined"
            fullWidth
            required
            value={contextData?.MOTORCYCLE_BUCKET_NUMBER ?? ""}
            disabled={true}
            sx={{ width: "400px", height: "10px", paddingBottom: "80px" ,color: "#B0B0B0" }}
          ></TextField>
          <p  style={{
              color: "#858585",
            }}>จำนวนเงินที่ต้องชำระ</p>
          <TextField
            id="Pay"
            variant="outlined"
            fullWidth
            required
            value={contextData?.INSTALLMENTS_MONEY ?? ""}
            disabled={true}
            sx={{ width: "400px", height: "10px", paddingBottom: "80px" ,color: "#B0B0B0"}}
          ></TextField>
          <p  style={{
              color: "#858585",
            }}>จำนวนเงินทั้งสิ้น</p>
          <TextField
            id="Total"
            variant="outlined"
            fullWidth
            required
            value={contextData?.INSTALLMENTS_MONEY ?? ""}
            disabled={true}
            sx={{ width: "400px", height: "10px", paddingBottom: "80px" }}
          ></TextField>
          {statusAfter == 0 ? (
            <div>
              <p  style={{
              color: "#858585",
            }}>หมายเหตุ</p>
               <TextField
              id="Remark"
              variant="outlined"
              fullWidth
              required
              defaultValue={contextData?.MONTH_INSTALLMENTS_COMMENT ?? ""}
              onChange={(e) => handleUpdateComment(e.target.value)}
              InputProps={{
                readOnly: statusBefore != 1 ? true : false,
              }}
              sx={{ width: "400px", height: "10px", paddingBottom: "80px" }}
              error={!!validationMessages.Remark}
              helperText={validationMessages.Remark}
            ></TextField>

            </div>
           
          ) : (
            <div></div>
          )}
        </DialogContent>
        <DialogActions>
        <button
            style={{
              backgroundColor: "#de6b4f",
              border: 0,
              borderRadius: "20px",
              width: "100px",
              height: "40px",
            }}
            onClick={handleClose}
          >
            <FontAwesomeIcon icon={faBan} style={{ color: "white" }} />{" "}
            <span style={{ color: "white" }}>ยกเลิก</span>
          </button>
          {statusBefore == 1 ? (
            <button
            style={{
              backgroundColor: "#19C788",
              border: 0,
              borderRadius: "20px",
              width: "100px",
              height: "40px",
            }}
            onClick={handleSubmit}
          >
            <FontAwesomeIcon icon={faCheck} style={{ color: "white" }} />{" "}
            <span style={{ color: "white" }}>ยืนยัน</span>
          </button>
          ) : (
            <button
            style={{
              backgroundColor: "gray",
              border: 0,
              borderRadius: "20px",
              width: "100px",
              height: "40px",
            }}
            disabled={true}
            onClick={handleSubmit}
          >
            <FontAwesomeIcon icon={faCheck} style={{ color: "white" }} />{" "}
            <span style={{ color: "white" }}>ยืนยัน</span>
          </button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default PaymentCheckAdmin;
