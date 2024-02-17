import React, { Component, useEffect, useState } from "react";
import "../css_admin.css";
import "./css/user_info.css";
import "../css/motorcycle_info.css";
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
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusCircle,
  faPencilSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FaSpinner } from 'react-icons/fa';

export default function UserInfoAdmin() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [userId, setUserId] = useState(null); 
  const [open, setOpen] = useState(false);
  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    UserGet();
  }, []);

  const UserGet = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("http://localhost:3001/api/v1/users", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setLoading(false);
        setItems(result);
      })
      .catch((error) => console.log("error", error));
  };

  const UserDelete = (USER_ID) => {
    var requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };
    fetch(`http://localhost:3001/api/v1/users/${USER_ID}`, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
      Swal.fire({
        title: "ลบข้อมูลสำเร็จ",
        icon: "success",
        confirmButtonText: "ตกลง",
      }).then(() => {
        window.location.reload();
      });
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
  const handleOpen = (USER_ID) => {
    setUserId(USER_ID);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteConfirmation = () => {
    handleClose();
    if (userId !== null) {
      UserDelete(userId);
    }
  };
  return (
    <div>
      <div className="header-with-button with-underline">
      <div className="header" style={{ paddingTop: "10px" }}>
        <h1 class ="text-color">
        <strong style={{ fontSize: "30px" }}>ข้อมูลสมาชิก</strong>
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
                  <TableCell class="t-name" style={{ padding: "10px", color: "#1ba7e1" }}>ชื่อ-นามสกุล</TableCell>
                  <TableCell class="t-bukget" style={{ padding: "10px", color: "#1ba7e1" }}>เบอร์โทร</TableCell>
                  <TableCell class="t-edit" style={{ padding: "10px", color: "#1ba7e1" }}>แก้ไขข้อมูล</TableCell>
                  <TableCell class="t-delete" style={{ padding: "10px", color: "#1ba7e1" }}>ลบข้อมูล</TableCell>
                </TableRow>
              </TableHead>
            </Table>
          </TableContainer>
        </div>
      </div>
      <div className="Contrainer-data">  {loading ? (
         <div className="spinner-container" >
         <FaSpinner className="spinner" style={{ fontSize: '90px' , color : '#82b1ff' }}/>
     
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
                      row.USER_FULLNAME.toLowerCase().includes(
                        search.toLowerCase()
                      ) ||
                      row.USER_CODE_NUMBER.toLowerCase().includes(
                        search.toLowerCase()
                      ) ||
                      row.USER_TELL.toLowerCase().includes(search.toLowerCase())
                    );
                  })
                  .map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell
                        class="t-name"
                        style={{
                          verticalAlign: "middle",
                          padding: "10px",
                          color: "#858585",
                        }}
                      >
                        {row.USER_FULLNAME}
                      </TableCell>
                      <TableCell
                        class="t-bukget"
                        style={{
                          verticalAlign: "middle",
                          padding: "10px",
                          color: "#858585",
                        }}
                      >
                        {row.USER_TELL}
                      </TableCell>
                      <TableCell
                        class="t-edit"
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
                              onClick={() => UserUpdate(row.USER_ID)}
                            >
                              <FontAwesomeIcon
                                icon={faPencilSquare}
                                style={{
                                  color: "#FBB05E",
                                  width: "30x",
                                  height: "25px",
                                  transition:
                                    "background-color 0.3s, border-color 0.3s",
                                }}
                              />
                            </Button>
                      </TableCell>
                      <TableCell
                        class="t-delete"
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
                                border: "1px solid #de6b4f ",
                              }}
                              onClick={() => handleOpen(row.USER_ID)}
                            >
                              <FontAwesomeIcon
                                icon={faTrash}
                                style={{
                                  color: "#de6b4f",
                                  width: "30x",
                                  height: "25px",
                                  transition:
                                    "background-color 0.3s, border-color 0.3s",
                                }}
                              />
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
      )}</div>

     

       </div>
      
       <Dialog open={open} onClose={handleClose}>
        <DialogTitle  style={{
              color: "#1ba7e1",
              fontWeight: "bold",
            }}>ยืนยันการลบข้อมูล</DialogTitle>
        <DialogContent>
          <DialogContentText>
            คุณต้องการลบข้อมูลลูกค้าคนนี้ใช่หรือไม่?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          
          <Button onClick={handleClose}>ยกเลิก</Button>
          <Button onClick={handleDeleteConfirmation}>ยืนยัน</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
