import React, { Component, useEffect, useState } from "react";
import "../repair/css/repair_info.css";
import "../css/motorcycle_info.css";
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
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusCircle,
  faBan,
  faTrash,
  faSave
} from "@fortawesome/free-solid-svg-icons";
import { FaSpinner } from "react-icons/fa";
import { Grid, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DeleteDialog from "../dialog/deleteDialog";

export default function RepairInfoAdmin() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [Wise, setWise] = useState("");
  const [Status, setStatus] = useState("");
  const [MotorcycleId, setMotorcycleId] = useState("");
  const [open, setOpen] = useState(false);
  const [openAddRepair, setOpenAddRepair] = useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [gotoAddAddRepair, setGotoAddRepair] = useState(false);
  const [repairId, setRepairId] = useState(null);
  const [MotorcycleNumber, setMotorcycleRigterNumber] = useState();
  const [motorcycles, setMotorcycles] = useState([]);
  const [itemIdToDelete, setItemIdToDelete] = useState("");
  const navigate = useNavigate();
  const [validationMessages, setValidationMessages] = useState({
    MotorcycleId: '',
    Status: '',
    Wise: '',
    // Add more fields as needed
  });

  const validateInput = () => {
    let isValid = true;
    const messages = {
      MotorcycleId: '',
      Wise: '',
    };
    if (!MotorcycleId) {
      isValid = false;
      messages.MotorcycleId = 'กรุณาระบุเลขทะเบียน';
    }
    if (!Wise) {
      isValid = false;
      messages.Wise = 'กรุณาระบุสาเหตุที่ส่งซ่อม';
    }
    setValidationMessages(messages);
    return isValid;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [motorcycles, users, repaildataes] = await Promise.all([
          MotorcycleGet(),
          UserGet(),
          RepairGet(),
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
        setMotorcycles(motorcycles);

        setItems(repaildataesWithBothData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (gotoAddAddRepair) {
    return <Navigate to="/admin/repair/repair-add" />;
  }
  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };
  const MotorcycleGet = () => {
    return fetch("https://back-end-store-management-system.onrender.com/api/v1/motorcycles")
      .then((res) => res.json())
      .then((result) => {
        return result.map((motorcycle) => ({
          MOTORCYCLE_ID: motorcycle.MOTORCYCLE_ID,
          USER_ID: motorcycle.USER_ID,
          MOTORCYCLE_BUCKET_NUMBER: motorcycle.MOTORCYCLE_BUCKET_NUMBER,
          MOTORCYCLE_REGISTRATION_NUMBER:
            motorcycle.MOTORCYCLE_REGISTRATION_NUMBER,
        }));
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
          USER_FULLNAME: user.USER_FULLNAME,
          USER_TELL: user.USER_TELL,
        }));
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        return [];
      });
  };

  const RepairGet = () => {
    return fetch("https://back-end-store-management-system.onrender.com/api/v1/repaildataes")
      .then((res) => res.json())
      .catch((error) => {
        console.error("Error fetching repaildataes:", error);
        return [];
      });
  };
  const RepairGetById = (REPAILDATA_ID) => {
    window.location = "/admin/repair/repair-get-by-id/" + REPAILDATA_ID;
  };

  const RepairDelete = (REPAILDATA_ID) => {
    var requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };

    fetch(
      `https://back-end-store-management-system.onrender.com/api/v1/repaildataes/${REPAILDATA_ID}`,
      requestOptions
    )
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOpen = (USER_ID) => {
    setRepairId(USER_ID);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteConfirmation = () => {
    handleClose();
    if (repairId !== null) {
      RepairDelete(repairId);
    }
  };

  const handleOpenAddRepair = () => {
    setOpenAddRepair(true);
  };
  const handleCloseAddRepair = () => {
    setOpenAddRepair(false);
  };

  const handleDropDownChange = async (event, context) => {
    console.log(context);
    context.REPAILDATA_SATUS = parseInt(event.target.value);
    console.log(context);
    let res = await axios.put(
      `https://back-end-store-management-system.onrender.com/api/v1/repaildataes/` + context.REPAILDATA_ID,
      context
    );
    if (res.status == 200) {
      let data1 = await axios.get(`https://back-end-store-management-system.onrender.com/api/v1/repaildataes`);
      let data2 = await axios.get(`https://back-end-store-management-system.onrender.com/api/v1/motorcycles`);

      let data3 = await axios.get(`https://back-end-store-management-system.onrender.com/api/v1/users`);

      let arr3 = data1.data.map((item, i) =>
        Object.assign({}, item, data2.data[i], data3.data[i])
      );

      console.log(arr3);

      setItems(arr3);
    }
  };

  const handleSave = async (event) => {
    event.preventDefault();
    const isValid = validateInput();
    if (!isValid) {
      return;
    }
  
    if (MotorcycleNumber !== null) {
      const selectedMotorcycle = motorcycles.find(
        (motorcycle) =>
          motorcycle.MOTORCYCLE_REGISTRATION_NUMBER === MotorcycleNumber
      );
  
      if (selectedMotorcycle) {
        // ตรวจสอบว่ารถมีเจ้าของหรือไม่
        if (selectedMotorcycle.USER_ID) {
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
  
          fetch("https://back-end-store-management-system.onrender.com/api/v1/repaildataes", requestOptions)
            .then((response) => response.text())
            .then((result) => {
              console.log(result);
              console.log("motorcycles:", motorcycles);
            })
            setOpenAddRepair(false);
            Swal.fire({
              title: "บันทึกข้อมูลสำเร็จ",
              icon: "success",
              confirmButtonText: "ตกลง",
            }).then(() => {
              window.location.reload();
            });
        } else {
          Swal.fire({
            title: "บันทึกไม่สำเร็จ",
            icon: "เนื่องจากเลขทะเบียนนี้มีเจ้าของเเล้ว",
            confirmButtonText: "ตกลง",
          });
          return;
        }
      } else {
        console.error("ไม่มี", MotorcycleNumber);
      }
    } else {
      console.error("บันทึกไม่ได้");
    }
  };
  return (
    <div>
      <div className="header-with-button with-underline">
        <div className="header" style={{ paddingTop: "10px" }}>
          <h1 class="text-color">
            <strong style={{ fontSize: "30px" }}>ข้อมูลการส่งซ่อม</strong>
          </h1>
        </div>
        <button
          style={{
            backgroundColor: "#1ba7e1",
            border: 0,
            borderRadius: "20px",
            width: "150px",
            height: "50px",
          }}
          onClick={() => handleOpenAddRepair()}
        >
          <FontAwesomeIcon
            icon={faPlusCircle}
            className="mr-1"
            style={{ color: "white" }}
          />{" "}
          <span style={{ color: "white" }}>เพิ่มข้อมูล</span>
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
                      ชื่อลูกค้า
                    </TableCell>
                    <TableCell
                      class="t-code"
                      style={{ padding: "10px", color: "#1ba7e1" }}
                    >
                      เบอร์โทร
                    </TableCell>
                    <TableCell
                      class="t-rig"
                      style={{ padding: "10px", color: "#1ba7e1" }}
                    >
                      เลขทะเบียน
                    </TableCell>
                    <TableCell
                      class="t-edit"
                      style={{ padding: "10px", color: "#1ba7e1" }}
                    >
                      เปลี่ยนสถานะ
                    </TableCell>
                    <TableCell
                      class="t-delete"
                      style={{ padding: "10px", color: "#1ba7e1" , verticalAlign: "middle", }}
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
          <Paper   sx={{
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
                        row.MOTORCYCLE_BUCKET_NUMBER.toLowerCase().includes(
                          search.toLowerCase()
                        )
                      );
                    })
                    .map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{
                          "&:last-child td, &:last-child th": {
                            border: 0,
                          },
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
                          {row.USER_TELL}
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
                          class="t-edit"
                          style={{
                            verticalAlign: "middle",
                            padding: "10px",
                            color: "#858585",
                          }}
                        >
                          {row.REPAILDATA_SATUS == 0 ? (
                            <Box sx={{ Width: 50 }}>
                              <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">
                                  เลือกสถานะ
                                </InputLabel>
                                <Select
                                  labelId="demo-simple-select-label"
                                  id="demo-simple-select"
                                  value={row.REPAILDATA_SATUS}
                                  label="เลือกสถาณะ"
                                  onChange={(e) => handleDropDownChange(e, row)}
                                >
                                  <MenuItem value={0}>
                                    อยู่ระหว่างการดำเนินงาน
                                  </MenuItem>
                                  <MenuItem value={1}>เรียบร้อย</MenuItem>
                                </Select>
                              </FormControl>
                            </Box>
                          ) : (
                            <Box sx={{ Width: 50 }}>
                              <FormControl fullWidth disabled>
                                <InputLabel id="demo-simple-select-label">
                                  เลือกสถานะ
                                </InputLabel>
                                <Select
                                  labelId="demo-simple-select-label"
                                  id="demo-simple-select"
                                  value={row.REPAILDATA_SATUS}
                                  label="เลือกสถาณะ"
                                  onChange={handleDropDownChange}
                                >
                                  <MenuItem value={0}>
                                    อยู่ระหว่างการดำเนินงาน
                                  </MenuItem>
                                  <MenuItem value={1}>เรียบร้อย</MenuItem>
                                </Select>
                              </FormControl>
                            </Box>
                          )}
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
                              onClick={() => handleOpen(row.REPAILDATA_ID)}
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
        <DeleteDialog
          open={open}
          handleClose={handleClose}
          handleDeleteConfirmation={handleDeleteConfirmation}
          dialogContentText="คุณต้องการลบข้อมูลส่งซ่อมนี้ใช่หรือไม่?"
          itemId={itemIdToDelete}
        />
      </Dialog>

      <Dialog open={openAddRepair} onClose={handleCloseAddRepair}>
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
          <DialogTitle>กรอกข้อมูลส่งซ่อม</DialogTitle>
          <DialogContent>
              <p style={{ color: "#858585" }}> เลขทะเบียน</p>
              <TextField
                id="MotorcycleId"
                type="text"
                  required
                onChange={(e) => setMotorcycleRigterNumber(e.target.value)}
                sx={{ width:'400px', height: "10px", paddingBottom: "80px" }}
                error={!!validationMessages.MotorcycleId}
                helperText={validationMessages.MotorcycleId}
              ></TextField>
              <p style={{ color: "#858585" }}>สาเหตุที่ส่งซ่อม</p>
              <TextField
                id="Wise"
                type="text"
                  required
                onChange={(e) => setWise(e.target.value)}
                sx={{width:'400px', height: "10px", paddingBottom: "80px" }}
                error={!!validationMessages.Wise}
                helperText={validationMessages.Wise}
              ></TextField>
            <Box sx={{ minWidth: 120 }}>
            <FormControl     sx={{ width:'400px',height: "10px", paddingBottom: "80px" }}>
            <p style={{ color: "#858585" }}>เลือกสถานะ</p>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    onChange={(e) => setStatus(e.target.value)}

  >
    <MenuItem value={0}>อยู่ระหว่างการดำเนินงาน</MenuItem>
    <MenuItem value={1}>เรียบร้อย</MenuItem>
  </Select>
</FormControl>
            </Box>
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
            onClick={handleCloseAddRepair}
          >
            <FontAwesomeIcon icon={faBan} style={{ color: "white" }} />{" "}
            <span style={{ color: "white" }}>ยกเลิก</span>
          </button>
          <button
           type="submit"
            style={{
              backgroundColor: "#19C788",
              border: 0,
              borderRadius: "20px",
              width: "100px",
              height: "40px",
            }}
            onClick={handleSave}
          >
            <FontAwesomeIcon icon={faSave} style={{ color: "white" }} />{" "}
            <span style={{ color: "white" }}>ยืนยัน</span>
          </button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
