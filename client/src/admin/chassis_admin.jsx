import React, { Component, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
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
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { useParams , useNavigate } from "react-router-dom";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Swal from "sweetalert2";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckSquare, faTrash 
} from "@fortawesome/free-solid-svg-icons";
export default function ChassisAdmin() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [UserId, setUserId] = useState("");
  const [motorcycleId, setMotorcycleId] = useState("");
  const [installmentNo, setinstallmentNo] = useState("");
  const [installmentMoney, setinstallmentMoney] = useState("");
  const [openUserDialog, setOpenUserDialog] = useState(false);
  const [UserName, setUserName] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { userFullName } = location.state || {};
  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };
  

  useEffect(() => {
    Promise.all([MotorcycleGet(), UserGet()])
      .then(([motorcycles, users]) => {
        const filteredItems = motorcycles.filter(
          (item) => item.USER_ID == null
        );
        setItems(
          filteredItems.map((item) => {
            const user = users.find((u) => u.USER_ID === item.USER_ID);
            return {
              ...item,
              USER_FULLNAME: user ? user.USER_FULLNAME : "N/A",
            };
          })
        );
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (installmentNo !== "") {
      const selectedMotorcycle = items.find(
        (item) => item.MOTORCYCLE_ID === motorcycleId
      );

      if (selectedMotorcycle) {
        const installmentMoneyValue =
          parseFloat(selectedMotorcycle.MOTORCYCLE_PRICE) /
          parseFloat(installmentNo);
        setinstallmentMoney(installmentMoneyValue.toFixed(2));
      }
    }
  }, [installmentNo, items, motorcycleId]);

  const MotorcycleGet = () => {
    return fetch("http://localhost:3001/api/v1/motorcycles")
      .then((res) => res.json())
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
        }));
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        return [];
      });
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let data1 = await axios.get(`http://localhost:3001/api/v1/users`);

    var user = data1.data.filter((f) => f.USER_FULLNAME == UserName);
    console.log("หดหกด");
    console.log(user);
    if (user == null || user == [] || user.length == 0) {
      Swal.fire({
        title: "เกิดข้อผิดพลาด",
        text: "ไม่พบผู้ใช้งาน",
        icon: "error",
        confirmButtonText: "ตกลง",
      });
      setOpen(false);
      return;
    }
    var raw = JSON.stringify({
      USER_ID: user[0].USER_ID,
      //MOTORCYCLE_REGISTRATION_NUMBER: RegistrationNumber,
    });

    console.log(raw);
    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      `http://localhost:3001/api/v1/motorcycles/${motorcycleId}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        handleClose();
      })
      .catch((error) => console.log("error", error));
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      MOTORCYCLE_ID: motorcycleId,
      INSTALLMENTS_NO: installmentNo,
      INSTALLMENTS_MONEY: installmentMoney,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:3001/api/v1/installments", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
      navigate("/admin/motorcycle");
  };

  const handleClickOpen = (MOTORCYCLE_ID) => {
    setMotorcycleId(MOTORCYCLE_ID);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [gotoAddMotorcycle, setGotoAddMotorcycle] = React.useState(false);
  if (gotoAddMotorcycle) {
    return <Navigate to="/admin/add-motorcycle" />;
  }

  ///Open Dialog User
  const handleUserDialog = () => {
    setOpenUserDialog(true);
  };
  const handleCloseUserDialog = () => {
    setOpenUserDialog(false);
  };
  return (
    <div>
      <div className="header-with-button with-underline">
        <div className="header" style={{paddingTop : '10px'}}>
          <h1 class="text-color">
            <strong style={{fontSize : '30px'}}>อนุมัติ</strong>
          </h1>
        </div>
      </div>

      <form class="search-form" style={{marginTop : '10px'}}>
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
                      เลขตัวถัง
                    </TableCell>
                    <TableCell
                      class="t-rig"
                      style={{ padding: "10px", color: "#1ba7e1" }}
                    >
                      เลขทะเบียน
                    </TableCell>
                    <TableCell
                      class="t-rig"
                      style={{ padding: "10px", color: "#1ba7e1" }}
                    >
                      ยืนยัน
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
                          key={row.MOTORCYCLE_BUCKET_NUMBER}
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
                            {row.MOTORCYCLE_BUCKET_NUMBER}
                          </TableCell>
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
                            <Button
                                type="button"
                                style={{ width: '50px' ,height: '50px' , border : '1px solid #19C788 '}}
                                onClick={() => handleClickOpen(row.MOTORCYCLE_ID)}
                              >
                                <FontAwesomeIcon
                                  icon={faCheckSquare}
                                  style={{color : '#19C788' , width: '30x',
                                  height: '25px',
                                  transition: 'background-color 0.3s, border-color 0.3s'}}
                                />
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
        <DialogTitle> กรอกข้อมูลยืนยันการเป็นเจ้าของรถ</DialogTitle>
        <DialogContent>
          <p>ชื่อ - นามสกุล ผู้เป็นเจ้าของรถ</p>
          <TextField
            id="UserName"
            variant="outlined"
            fullWidth
            required
            onChange={(e) => setUserName(e.target.value)}
            sx={{ width:'400px', height: "10px", paddingBottom: "80px" }}
          ></TextField>
          <p>จำนวนงวด</p>
          <TextField
            id="installmentNo"
            variant="outlined"
            fullWidth
            required
            onChange={(e) => setinstallmentNo(e.target.value)}
            sx={{ width:'400px', height: "10px", paddingBottom: "80px" }}
          ></TextField>
          <p>ราคางวดล้ะ</p>
          <TextField
            id="installmentMoney"
            variant="outlined"
            fullWidth
            required
            value={installmentMoney}
            InputProps={{
              readOnly: true,
            }}
            sx={{ width:'400px', height: "10px", paddingBottom: "80px" }}
          ></TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit}>แก้ไข</Button>
          <Button onClick={handleClose}>ยกเลิก</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
