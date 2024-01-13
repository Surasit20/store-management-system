import React, { Component, useEffect, useState } from "react";
import "../repair/css/repair_info.css";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusCircle,
  faPencilSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

export default function RepairInfoAdmin() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [Wise, setWise] = useState("");
  const [Status, setStatus] = useState("");
  const [MotorcycleId, setMotorcycleId] = useState("");
  const [open, setOpen] = useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [gotoAddAddRepair, setGotoAddRepair] = useState(false);
  const [repairId, setRepairId] = useState(null); 

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
    return fetch("http://localhost:3001/api/v1/motorcycles")
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
    return fetch("http://localhost:3001/api/v1/users")
      .then((res) => res.json())
      .then((result) => {
        return result.map((user) => ({
          USER_ID: user.USER_ID,
          USER_FULLNAME: user.USER_FULLNAME,
          USER_TELL : user.USER_TELL
        }));
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        return [];
      });
  };

  const RepairGet = () => {
    return fetch("http://localhost:3001/api/v1/repaildataes")
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
      `http://localhost:3001/api/v1/repaildataes/${REPAILDATA_ID}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
    window.location.reload();
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

  const handleDropDownChange = async (event, context) => {
    console.log(context);
    context.REPAILDATA_SATUS = parseInt(event.target.value);
    console.log(context);
    let res = await axios.put(
      `http://localhost:3001/api/v1/repaildataes/` + context.REPAILDATA_ID,
      context
    );
    if (res.status == 200) {
      let data1 = await axios.get(`http://localhost:3001/api/v1/repaildataes`);
      let data2 = await axios.get(`http://localhost:3001/api/v1/motorcycles`);

      let data3 = await axios.get(`http://localhost:3001/api/v1/users`);

      let arr3 = data1.data.map((item, i) =>
        Object.assign({}, item, data2.data[i], data3.data[i])
      );

      console.log(arr3);

      setItems(arr3);
    }
  };
  return (
    <div>
      <div class="search"></div>
      <form class="search-form">
        <input
          type="search"
          onChange={handleInputChange}
          placeholder="ค้นหา"
          class="search-input"
        />
      </form>
      <div class="additem">
        <button
          class="btn btn-success btn-add-motor"
          onClick={() => {
            setGotoAddRepair(true);
          }}
        >
          <FontAwesomeIcon icon={faPlusCircle} className="mr-1" /> เพิ่มข้อมูล
        </button>
      </div>
      <div class="header-t-user">
        <div>
          <TableContainer sx={{ maxHeight: 440, borderRadius: 2 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow class="table-row">
                  <TableCell class="t-name" style={{ padding: "10px" }}> ชื่อลูกค้า </TableCell>
                  <TableCell class="t-code" style={{ padding: "10px" }}> เบอร์โทร</TableCell>
                  <TableCell class="t-rig">เลขทะเบียน</TableCell>
                  <TableCell class="t-edit">เปลี่ยนสถานะ</TableCell>
                  <TableCell class="t-delete">ลบข้อมูล</TableCell>
                </TableRow>
              </TableHead>
            </Table>
          </TableContainer>
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
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
                      <TableCell  class="t-name"  >{row.USER_FULLNAME}</TableCell>
                      <TableCell  class="t-code" >{row.USER_TELL}</TableCell>
                      <TableCell  class="t-rig" >{row.MOTORCYCLE_REGISTRATION_NUMBER}</TableCell>
                      <TableCell  class="t-edit" >
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
                                เลือกสถาณะ
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
                      {/* <TableCell>
                        <Button
                          type="button"
                          class="btn btn-danger"
                          onClick={() => RepairGetById(row.REPAILDATA_ID)}
                        >
                          รายละเอียด
                        </Button>
                      </TableCell> */}
                      <TableCell
                        class="t-delete"
                        style={{ verticalAlign: "middle", padding: "10px" }}
                      >
                        <Button
                          type="button"
                          class="btn btn-outline-danger btn-delete"
                          onClick={() => handleOpen(row.REPAILDATA_ID)}
                        >
                          <FontAwesomeIcon icon={faTrash} class="icon-delete" />
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
            คุณต้องการลบข้อมูลส่งซ่อมนี้ใช่หรือไม่?
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
