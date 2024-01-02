import React, { Component, useEffect, useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
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
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import UserDialog from './dialog/UserDialog'

export default function ChassisAdmin() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [open, setOpen] = React.useState(false);
  //const [RegistrationNumber, setRegistrationNumber] = useState("");
  const [UserId, setUserId] = useState("");
  const [motorcycleId, setMotorcycleId] = useState("");
  const [installmentNo, setinstallmentNo] = useState("");
  const [installmentMoney, setinstallmentMoney] = useState("");
  const [openUserDialog, setOpenUserDialog] = useState(false);
  const [Usercode, setUserCode] = useState("");
  const location = useLocation();
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
      const selectedMotorcycle = items.find((item) => item.MOTORCYCLE_ID === motorcycleId);

      if (selectedMotorcycle) {
        const installmentMoneyValue = parseFloat(selectedMotorcycle.MOTORCYCLE_PRICE) / parseFloat(installmentNo);
        setinstallmentMoney(installmentMoneyValue.toFixed(2));
      }
    }
  }, [installmentNo, items, motorcycleId]);

  const MotorcycleGet = () => {
    return fetch("https://back-end-store-management-system.onrender.com/api/v1/motorcycles")
      .then((res) => res.json())
      .catch((error) => {
        console.error("Error fetching motorcycles:", error);
        return [];
      });
  };
  const UserGet = () => {
    return fetch("https://back-end-store-management-system.onrender.com/api/v1/users")
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

    var raw = JSON.stringify({
      USER_ID: UserId,
      USER_CODE_NUMBER: Usercode,
      //MOTORCYCLE_REGISTRATION_NUMBER: RegistrationNumber,
    });

    console.log(raw)
    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      `https://back-end-store-management-system.onrender.com/api/v1/motorcycles/${motorcycleId}`,
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

    fetch("https://back-end-store-management-system.onrender.com/api/v1/installments", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
    window.location.reload();
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
      <Row>
        <div class="search">
          <Col>
            <Form>
              <InputGroup>
                <Form.Control
                  onChange={handleInputChange}
                  placeholder="ค้นหา"
                />
              </InputGroup>
            </Form>
          </Col>
        </div>
        <div class="additem">
        </div>
      </Row>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell>เลขตัวถัง</TableCell>
                  <TableCell>เลขทะเบียน</TableCell>
                  <TableCell>ยืนยัน</TableCell>
                </TableRow>
              </TableHead>
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
                      key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell>{row.MOTORCYCLE_BUCKET_NUMBER}</TableCell>
                      <TableCell>
                        {row.MOTORCYCLE_REGISTRATION_NUMBER}
                      </TableCell>
                      <TableCell>
                        <Button
                          type="button"
                          class="btn btn-warning"
                          variant="outlined"
                          onClick={() => handleClickOpen(row.MOTORCYCLE_ID)}
                        >
                          ยืนยัน
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
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>ยืนยันการเป็นเจ้าของรถ</DialogTitle>
        <DialogContent>
          <DialogContentText>
            กรอกข้อมูลผู้ใช้งานเพื่อทำการยืนยันการเป็นเจ้าของ
          </DialogContentText>
          <TextField
            id="UserCode"
            label="เลขประจำตัวบัตรประชาชน"
            variant="outlined"
            fullWidth
            required
            onChange={(e) => setUserId(e.target.value)}
          ></TextField>
          <TextField
            id="installmentNo"
            label="จำนวนงวด"
            variant="outlined"
            fullWidth
            required
            onChange={(e) => setinstallmentNo(e.target.value)}
          ></TextField>
          <TextField
            id="installmentMoney"
            label="ราคางวดล้ะ"
            variant="outlined"
            fullWidth
            required
            value={installmentMoney}
            InputProps={{
              readOnly: true,
            }}
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
