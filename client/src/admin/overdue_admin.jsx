import React, { Component, useEffect, useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import "./css/motorcycle_info.css";
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
import axios from "axios";
import { FaSpinner } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBan,
  faCheck,
  faTrash,
  faList,
  faClose,
  faPaperPlane
} from "@fortawesome/free-solid-svg-icons";
import { borderRadius, padding } from "@mui/system";
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
        // Group เลขทะเบียนรถจักรยานยนต์
        const groupedMotorcycles = repaildataesWithBothData.reduce(
          (acc, item) => {
            const key = item.MOTORCYCLE_REGISTRATION_NUMBER;
            if (!acc[key]) {
              acc[key] = {
                ...item,
                USER_FULLNAME: [item.USER_FULLNAME],
              };
            } else {
              acc[key].USER_FULLNAME.push(item.USER_FULLNAME);
            }
            return acc;
          },
          {}
        );

        const groupedItems = Object.values(groupedMotorcycles);
        setItems(groupedItems);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const MotorcycleGet = () => {
    return fetch("https://back-end-store-management-system.onrender.com/api/v1/motorcycles")
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
    return fetch("https://back-end-store-management-system.onrender.com/api/v1/users")
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
    return fetch("https://back-end-store-management-system.onrender.com/api/v1/installments")
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
      `https://back-end-store-management-system.onrender.com/api/v1/installments/${INSTALLMENTS_ID}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        Swal.fire({
          title: "ลบข้อมูลสำเร็จ",
          icon: "success",
          confirmButtonText: "ตกลง",
        }).then(() => {
          window.location.reload();
        });
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

  const handleSendNotification = async () => {
    Swal.fire({
      title: "สำเร็จ",
      text: "ส่งแจ้งเตือนสำเร็จ",
      icon: "success",
      confirmButtonText: "ตกลง",
    });

    let res = await axios.get(
      `https://back-end-store-management-system.onrender.com/api/v1/service/notification`
    );
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
      if (data == null || data.MONTH_INSTALLMENTS == null) {
        data = [];
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
        `https://back-end-store-management-system.onrender.com/api/v1/installments/${installmentId}`
      );
      const installmentData = await installmentResponse.json();
      const monthResponse = await fetch(
        `https://back-end-store-management-system.onrender.com/api/v1/month-installments?INSTALLMENTS_ID=${installmentId}`
      );
      const monthData = await monthResponse.json();

      let monthDataFiler = monthData.filter(
        (f) => f.INSTALLMENTS_ID == installmentId
      );
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
      <div className="header-with-button with-underline">
        <div className="header" style={{ paddingTop: "10px" }}>
          <h1 class="text-color">
            <strong style={{ fontSize: "30px" }}>ข้อมูลยอดค้างชำระ</strong>
          </h1>
        </div>
        <button
          style={{
            backgroundColor: "#1ba7e1",
            border: 0,
            borderRadius: "20px",
            width: "70px",
            height: "50px",
          }}
          onClick={handleSendNotification}
        >
          <FontAwesomeIcon
            icon={faPaperPlane}
            className="mr-1"
            style={{ color: "white" }}
          />{" "}
        </button>
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
                      class="t-name"
                      style={{ padding: "10px", color: "#1ba7e1" }}
                    >
                      ชื่อ - นามสกุล
                    </TableCell>
                    <TableCell
                      class="t-code"
                      style={{ padding: "10px", color: "#1ba7e1" }}
                    >
                      เลขทะเบียน
                    </TableCell>
                    <TableCell
                      class="t-code"
                      style={{ padding: "10px", color: "#1ba7e1" }}
                    >
                      เบอร์โทร
                    </TableCell>
                    <TableCell
                      class="t-code"
                      style={{ padding: "10px", color: "#1ba7e1" }}
                    >
                      ยอดค้างชำระ
                    </TableCell>
                    <TableCell
                      class="t-code"
                      style={{ padding: "10px", color: "#1ba7e1" }}
                    >
                      ลบข้อมูล
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
                            class="t-code"
                            style={{
                              verticalAlign: "middle",
                              padding: "10px",
                              color: "#858585",
                            }}
                          >
                            {row.MOTORCYCLE_REGISTRATION_NUMBER}
                          </TableCell>
                          <TableCell
                            class="t-code"
                            style={{
                              verticalAlign: "middle",
                              padding: "10px",
                              color: "#858585",
                            }}
                          >
                            {row.USER_TELL}
                          </TableCell>
                          <TableCell
                            class="t-code"
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
                              onClick={() => openDialog(row.INSTALLMENTS_ID)}
                            >
                              <FontAwesomeIcon
                                icon={faList}
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
                            class="t-code"
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
                              onClick={() => handleOpen(row.INSTALLMENTS_ID)}
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
          )}
        </div>
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle style={{
              color: "#1ba7e1",
              fontWeight: "bold",
            }}>ยืนยันการลบข้อมูล</DialogTitle>
        <DialogContent>
          <DialogContentText>
            คุณต้องการลบข้อมูลยอดค้างชำระของสมาชิกท่านนี้ใช่หรือไม่?
          </DialogContentText>
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
          <button
            style={{
              backgroundColor: "#19C788",
              border: 0,
              borderRadius: "20px",
              width: "100px",
              height: "40px",
            }}
            onClick={handleDeleteConfirmation}
          >
            <FontAwesomeIcon icon={faCheck} style={{ color: "white" }} />{" "}
            <span style={{ color: "white" }}>ยืนยัน</span>
          </button>
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
      <Dialog open={open} onClose={onClose}>
        <DialogTitle style={{
              color: "#1ba7e1",
              fontWeight: "bold",
            }}>รายละเอียดค่างวด</DialogTitle>
        <DialogContent>
          {Array.isArray(item) && item.length > 0 ? (
            <>
              <Table>
                <TableHead>
                  <TableRow >
                    <TableCell class="t-rig"
                      style={{ padding: "10px", color: "#1ba7e1" }}>งวดที่</TableCell>
                    <TableCell class="t-rig"
                      style={{ padding: "10px", color: "#1ba7e1" }}>ค่างวด</TableCell>
                    <TableCell class="t-name"
                      style={{ padding: "10px", color: "#1ba7e1" }}>สถานะ</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {item.map((row, index) => (
                    <TableRow key={index + 1}>
                      <TableCell class="t-rig"
                            style={{
                              verticalAlign: "middle",
                              padding: "10px",
                              color: "#858585",
                            }}>{index + 1}</TableCell>
                      <TableCell class="t-rig"
                            style={{
                              verticalAlign: "middle",
                              padding: "10px",
                              color: "#858585",
                            }}>{row.MONTH_INSTALLMENTS_MONEY}</TableCell>
                      <TableCell class="t-name"
                            style={{
                              verticalAlign: "middle",
                              paddingTop : '15px',
                              color: "#858585",
                            }}>
                        {row.MONTH_INSTALLMENTS_STATUS === 0 ? (
                          <p className="text-danger">ไม่ผ่านการชำระเงิน</p>
                        ) : row.MONTH_INSTALLMENTS_STATUS === 1 ? (
                          <p className="text-secondary">
                            กำลังตรวจสอบการชำระเงิน
                          </p>
                        ) : (
                          <p className="text-success">ชำระเงินแล้ว</p>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </>
          ) : (
            <p  style={{
              color: "#858585",
            }}>ไม่มีข้อมูลค่างวด</p>
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
            onClick={onClose}
          >
            <FontAwesomeIcon icon={faClose} style={{ color: "white" }} />{" "}
            <span style={{ color: "white" }}>ออก</span>
          </button>
        </DialogActions>
      </Dialog>
    );
  }
}
