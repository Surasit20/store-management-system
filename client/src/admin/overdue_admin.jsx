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

export default function OverdueAdmin() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [installmentId, setInstallmentId] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false); 
  const [selectedItem, setSelectedItem] = useState([]);
  const [status, setStatus] = useState("");
  const [time, setTime] = useState("");
  const [Date, setDate] = useState("");
  const [Money, setMoney] = useState("");

  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [motorcycles, users, repaildataes] = await Promise.all([
          MotorcycleGet(),
          UserGet(),
          InstallmentGet(),
          MonthGet(),
        ]);

        console.log("motorcycles:", motorcycles);
        console.log("users:", users);
        console.log("repaildataes:", repaildataes);

        const repaildataesWithUserFullname = repaildataes.map((item) => {
          const motorcycle = motorcycles.find(
            (m) => m.MOTORCYCLE_ID === item.MOTORCYCLE_ID
          );
          const user = users.find(
            (u) => u.USER_ID === (motorcycle ? motorcycle.USER_ID : null)
          );
          return {
            ...item,
            USER_FULLNAME: user ? user.USER_FULLNAME : "N/A",
            USER_CODE_NUMBER: user ? user.USER_CODE_NUMBER : "N/A",
            USER_TELL: user ? user.USER_TELL : "N/A",
          };
        });

        const repaildataesWithBothData = repaildataesWithUserFullname.map(
          (item) => {
            const motorcycle = motorcycles.find(
              (m) => m.MOTORCYCLE_ID === item.MOTORCYCLE_ID
            );
            return {
              ...item,
              MOTORCYCLE_BUCKET_NUMBER: motorcycle
                ? motorcycle.MOTORCYCLE_BUCKET_NUMBER
                : "N/A",
              MOTORCYCLE_REGISTRATION_NUMBER: motorcycle
                ? motorcycle.MOTORCYCLE_REGISTRATION_NUMBER
                : "N/A",
            };
          }
        );
        setItems(repaildataesWithBothData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
          USER_CODE_NUMBER: user.USER_CODE_NUMBER,
          USER_FULLNAME: user.USER_FULLNAME,
          USER_TELL: user.USER_TELL,
        }));
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        return [];
      });
  };
  const InstallmentGet = () => {
    return fetch("http://localhost:3001/api/v1/installments")
      .then((res) => res.json())
      .catch((error) => {
        console.error("ไม่มี", error);
        return [];
      });
  };
  const InstallmentDelete = (INSTALLMENTS_ID) => {
    var requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };

    fetch(
      `http://localhost:3001/api/v1/installments/${INSTALLMENTS_ID}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        window.location.reload();
      })
      .catch((error) => console.log("error", error));
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

  const handleOpen = (INSTALLMENTS_ID) => {
    setInstallmentId(INSTALLMENTS_ID);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDeleteConfirmation = () => {
    handleClose();
    if (installmentId !== null) {
      InstallmentDelete(installmentId);
    }
  };
  const openDialog = async (INSTALLMENTS_ID) => {
    try {
      const data = await MonthGet(INSTALLMENTS_ID);
      console.log("Data:", data);
      if(data == null || data.MONTH_INSTALLMENTS == null){
        data=[]
      }
      console.log("xxxxxx:", data.MONTH_INSTALLMENTS);
      setSelectedItem(data.MONTH_INSTALLMENTS);
      setIsDialogOpen(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const MonthGet = async (installmentId) => {
    try {

      const installmentResponse = await fetch(
        `http://localhost:3001/api/v1/installments/${installmentId}`
      );
      const installmentData = await installmentResponse.json();
      const monthResponse = await fetch(
        `http://localhost:3001/api/v1/month-installments?INSTALLMENTS_ID=${installmentId}`
      );
      const monthData = await monthResponse.json();

      let monthDataFiler = monthData.filter(f=>f.INSTALLMENTS_ID == installmentId)
      const result = {
        INSTALLMENTS: installmentData,
        MONTH_INSTALLMENTS: monthDataFiler,
      };
  
      console.log("Data from API:", result);
      return result;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  };
  return (
    <div>
      <div className="header">
        <h1>
          <strong>ข้อมูลยอดค้างชำระ</strong>
        </h1>
      </div>
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
      </Row>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell>เลขประจำตัวบัตรประชาชน</TableCell>
                  <TableCell>ชื่อ - นามสกุล</TableCell>
                  <TableCell>เลขทะเบียน</TableCell>
                  <TableCell>เบอร์โทร</TableCell>
                  <TableCell>ยอดค้างชำระ</TableCell>
                  <TableCell>ลบข้อมูล</TableCell>
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
                      )
                    );
                  })
                  .map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell>{row.USER_CODE_NUMBER}</TableCell>
                      <TableCell>{row.USER_FULLNAME}</TableCell>
                      <TableCell>
                        {row.MOTORCYCLE_REGISTRATION_NUMBER}
                      </TableCell>
                      <TableCell>{row.USER_TELL}</TableCell>
                      <TableCell>
                        <Button
                          type="button"
                          class="btn btn-warning"
                          onClick={() => openDialog(row.INSTALLMENTS_ID)}
                        >
                          รายละเอียด
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button
                          type="button"
                          class="btn btn-danger"
                          onClick={() => handleOpen(row.INSTALLMENTS_ID)}
                        >
                          ลบ
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
        <DialogTitle>ยืนยันการลบข้อมูล</DialogTitle>
        <DialogContent>
          <DialogContentText>
            คุณต้องการลบข้อมูลของรถจักรยานยนต์คันนี้ใช่หรือไม่?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>ยกเลิก</Button>
          <Button onClick={handleDeleteConfirmation}>ยืนยัน</Button>
        </DialogActions>
      </Dialog>
      <OverdueAdminDialog
        open={isDialogOpen} 
        onClose={() => setIsDialogOpen(false)} 
        item={selectedItem} 
      />
    </div>
  );
  function OverdueAdminDialog({ open, onClose, item }) {
    return (
      <Dialog open={open} onClose={onClose} >

        <DialogTitle>รายละเอียดค่างวด</DialogTitle>
        <DialogContent>
                <TableCell>งวดที่         </TableCell>
                  <TableCell>ค่างวด      </TableCell>
                  <TableCell>สถานะ      </TableCell>

        <TableBody>
                 {item
                  .map((row,index) => (
                    <TableRow
                      key={row.name}
                    >
                 <TableCell>{index+1}</TableCell>
                      <TableCell>{row.MONTH_INSTALLMENTS_MONEY}</TableCell>
                      <TableCell>
                      {row.MONTH_INSTALLMENTS_STATUS == 0 ? (
                            <p className="text-danger">ไม่ผ่านการชำระเงิน</p>
                          ) : row.MONTH_INSTALLMENTS_STATUS == 1 ? (
                            <p className="text-secondary">กำลังตรวจสอบการชำระเงิน</p>
                          ) : (
                            <p className="text-success">ชำระเงินแล้ว</p>
                          )}
                      </TableCell>
                    </TableRow>
                  ))} 
              </TableBody> 

          {/* {Array.isArray(item) && item.length > 0 ? (
            <>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>งวดที่</TableCell>
                    <TableCell>ค่างวด</TableCell>
                    <TableCell>สถานะ</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {item.map((row) => (
                    <TableRow key={row.MONTH_INSTALLMENTS_ID}>
                      <TableCell>{row.MONTH_INSTALLMENTS_ID}</TableCell>
                      <TableCell>{row.MONTH_INSTALLMENTS_MONEY}</TableCell>
                      <TableCell>{row.MONTH_INSTALLMENTS_STATUS}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </>
          ) : (
            <p>ไม่มีข้อมูลค่างวด</p>
          )} */}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>ปิด</Button>
        </DialogActions>
      </Dialog>
    );
  }
}
