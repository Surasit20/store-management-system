import React, { Component, useEffect, useState } from "react";
import "../repair/css/repair_info.css";
import { Form, InputGroup } from "react-bootstrap";
import { Grid, TextField } from "@mui/material";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
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
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import Dialog from "@mui/material/Dialog";

const filter = createFilterOptions();

export default function RepairInfoAdmin() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [Wise, setWise] = useState("");
  const [Status, setStatus] = useState("");
  const [MotorcycleId, setMotorcycleId] = useState("");
  const [open, setOpen] = useState(false);

  const handleInputChange = (e) => {
    setSearch(e.target.value);
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
          const user = users.find((u) => u.USER_ID === motorcycle.USER_ID);
          return {
            ...item,
            USER_FULLNAME: user ? user.USER_FULLNAME : "N/A",
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
        return result.map((motorcycle) => ({
          MOTORCYCLE_ID: motorcycle.MOTORCYCLE_ID,
          USER_ID: motorcycle.USER_ID,
          MOTORCYCLE_BUCKET_NUMBER: motorcycle.MOTORCYCLE_BUCKET_NUMBER,
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
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
      <div>
                  <Button onClick={handleClick}>คลิกเพื่อแสดง Dialog</Button>
                  <Alert open={open} handleClose={handleClose} />
                </div>
      <div class="header-t-user">
        <div>
          <TableContainer sx={{ maxHeight: 440, borderRadius: 2 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow class="table-row">
                  <TableCell class="t-code" style={{ padding: "10px" }}>
                    เลขประจำตัวบัตรประชาชน
                  </TableCell>
                  <TableCell class="t-name">ชื่อ-นามสกุล</TableCell>
                  <TableCell class="t-bukget">เบอร์โทร</TableCell>
                  <TableCell class="t-edit">แก้ไขข้อมูล</TableCell>
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
                    <TableHead>
                      <TableRow>
                        <TableCell>ชื่อลูกค้า</TableCell>
                        <TableCell>เลขตัวถัง</TableCell>
                        <TableCell>เลขทะเบียน</TableCell>
                        <TableCell>แก้ไขข้อมูล</TableCell>
                        <TableCell>ลบข้อมูล</TableCell>
                      </TableRow>
                    </TableHead>
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
                            <TableCell>{row.USER_FULLNAME}</TableCell>
                            <TableCell>
                              {row.MOTORCYCLE_BUCKET_NUMBER}
                            </TableCell>
                            <TableCell>
                              <Button
                                type="button"
                                class="btn btn-warning"
                                // onClick={() => MotorcycleUpdate(row.MOTORCYCLE_ID)}
                              >
                                แก้ไข
                              </Button>
                            </TableCell>
                            <TableCell>
                              <Button
                                type="button"
                                class="btn btn-danger"
                                onClick={() => RepairDelete(row.REPAILDATA_ID)}
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
    </div>
  );
}

function TextUserFullName() {
  return <div></div>;
}

function Alert(props) {
  const { open, handleClose } = props;
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [Model, setModel] = useState("");
  const [MotorcycleId, setSelectedMotorcycleId] = useState();
  const [MotorcycleNumber, setSelectedMotorcycleNumber] = useState();
  const [Wise, setWise] = useState("");
  const [Status, setStatus] = useState("");
  const motorcycleIdMap = new Map();
  useEffect(() => {
    Promise.all([MotorcycleGet(), UserGet()])
      .then(([motorcycles, users]) => {
        const filteredItems = motorcycles.filter(
          (item) => item.USER_ID !== null
        );
        setItems(
          filteredItems.map((item) => {
            const user = users.find((u) => u.USER_ID === item.USER_ID);
            return {
              ...item,
              USER_FULLNAME: user ? user.USER_FULLNAME : "N/A",
              USER_TELL: user ? user.USER_TELL : "N/A",
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

  const handleSave = async (event) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      MOTORCYCLE_ID: MotorcycleId,
      REPAILDATA_WISE: Wise,
      REPAILDATA_SATUS: Status,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:3001/api/v1/repaildataes", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  const MotorcycleGet = () => {
    return fetch("http://localhost:3001/api/v1/motorcycles")
      .then((res) => res.json())
      .then((result) => {
        const motorcycles = result;
        const motorcycleIdMap = new Map();

        motorcycles.forEach((motorcycle) => {
          motorcycleIdMap.set(
            motorcycle.MOTORCYCLE_BUCKET_NUMBER,
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
          USER_FULLNAME: user.USER_FULLNAME,
          USER_TELL: user.USER_TELL,
        }));
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        return [];
      });
  };

  const [value, setValue] = React.useState(null);
  const [open1, toggleOpen] = React.useState(false);

  const [dialogValue, setDialogValue] = React.useState({
    USER_FULLNAME: "",
  });

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>ยืนยันการเป็นเจ้าของรถ</DialogTitle>
      <DialogContent>
        <DialogContentText>
          กรอกข้อมูลผู้ใช้งานเพื่อทำการยืนยันการเป็นเจ้าของ
        </DialogContentText>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            if (MotorcycleNumber !== null) {
              handleSave({
                MOTORCYCLE_ID: MotorcycleId,
                REPAILDATA_WISE: Wise,
                REPAILDATA_STATUS: Status,
              });
            } else {
              console.error("MotorcycleNumber is null, cannot save.");
            }
          }}
        >
          <React.Fragment>
            <Autocomplete
              value={MotorcycleNumber}
              onChange={(event, newValue) => {
                if (newValue !== null) {
                  if (typeof newValue === "string") {
                    if (event.key !== "Enter") {
                      setTimeout(() => {
                        toggleOpen(true);
                        setDialogValue({
                          USER_FULLNAME: newValue,
                          MOTORCYCLE_BUCKET_NUMBER: "",
                        });

                        const selectedMotorcycleId =
                          motorcycleIdMap.get(newValue);
                        if (selectedMotorcycleId) {
                          setSelectedMotorcycleId(selectedMotorcycleId);
                        } else {
                          setSelectedMotorcycleId(null);
                        }
                      });
                    }
                  } else if (newValue.inputValue) {
                    if (event.key !== "Enter") {
                      toggleOpen(true);
                      setDialogValue({
                        USER_FULLNAME: newValue.inputValue,
                        MOTORCYCLE_BUCKET_NUMBER: "",
                      });
                    }
                  } else {
                    setValue(newValue);
                    setSelectedMotorcycleNumber(newValue);
                  }
                }
              }}
              filterOptions={(options, params) => {
                const filtered = filter(options, params);

                if (params.inputValue !== "") {
                  filtered.push({
                    inputValue: params.inputValue,
                    MOTORCYCLE_BUCKET_NUMBER: `Add "${params.inputValue}"`,
                  });
                }

                return filtered;
              }}
              id="ชื่อ-นามสกุล"
              options={items}
              getOptionLabel={(option) => {
                if (typeof option === "string") {
                  return option;
                }
                if (option.inputValue) {
                  return option.inputValue;
                }
                return option.MOTORCYCLE_BUCKET_NUMBER;
              }}
              selectOnFocus
              clearOnBlur
              handleHomeEndKeys
              renderOption={(props, option) => {
                if (option.MOTORCYCLE_BUCKET_NUMBER !== null) {
                  return <li {...props}>{option.MOTORCYCLE_BUCKET_NUMBER}</li>;
                }
                return null;
              }}
              sx={{ width: 300 }}
              freeSolo
              renderInput={(params) => (
                <TextField {...params} label="MOTORCYCLE_BUCKET_NUMBER" />
              )}
            />
            <Autocomplete
              value={value}
              onChange={(event, newValue) => {
                if (typeof newValue === "string") {
                  setTimeout(() => {
                    toggleOpen(true);
                    console.log(1);
                    setDialogValue({
                      USER_FULLNAME: newValue,
                      MOTORCYCLE_BUCKET_NUMBER: "",
                    });
                    const user = items.find(
                      (item) => item.USER_FULLNAME === newValue
                    );
                    if (user) {
                      setSelectedMotorcycleNumber(
                        user.MOTORCYCLE_BUCKET_NUMBER
                      );
                    }
                  });
                } else if (newValue && newValue.inputValue) {
                  toggleOpen(true);
                  console.log(2);
                  setDialogValue({
                    USER_FULLNAME: newValue.inputValue,
                    MOTORCYCLE_BUCKET_NUMBER: "",
                  });
                } else {
                  console.log(3);
                  setValue(newValue);
                  setSelectedMotorcycleNumber(null);
                }
              }}
              filterOptions={(options, params) => {
                const filtered = filter(options, params);

                if (params.inputValue !== "") {
                  filtered.push({
                    inputValue: params.inputValue,
                    USER_FULLNAME: `Add "${params.inputValue}"`,
                  });
                }

                return filtered;
              }}
              id="ชื่อ-นามสกุล"
              options={items}
              getOptionLabel={(option) => {
                if (typeof option === "string") {
                  return option;
                }
                if (option.inputValue) {
                  return option.inputValue;
                }
                return option.USER_FULLNAME;
              }}
              selectOnFocus
              clearOnBlur
              handleHomeEndKeys
              renderOption={(props, option) => {
                if (option.USER_FULLNAME !== null) {
                  return <li {...props}>{option.USER_FULLNAME}</li>;
                }
                return null;
              }}
              sx={{ width: 300 }}
              freeSolo
              renderInput={(params) => (
                <TextField {...params} label="USER_FULLNAME" />
              )}
            />
            <Autocomplete
              value={value}
              onChange={(event, newValue) => {
                if (typeof newValue === "string") {
                  setTimeout(() => {
                    toggleOpen(true);
                    setDialogValue({
                      USER_TELL: newValue,
                      MOTORCYCLE_BUCKET_NUMBER: "",
                    });
                    const user = items.find(
                      (item) => item.USER_TELL === newValue
                    );
                    if (user) {
                      setSelectedMotorcycleNumber(
                        user.MOTORCYCLE_BUCKET_NUMBER
                      );
                    }
                  });
                } else if (newValue && newValue.inputValue) {
                  toggleOpen(true);
                  setDialogValue({
                    USER_TELL: newValue.inputValue,
                    MOTORCYCLE_BUCKET_NUMBER: "",
                  });
                } else {
                  setValue(newValue);
                  setSelectedMotorcycleNumber(null);
                }
              }}
              filterOptions={(options, params) => {
                const filtered = filter(options, params);

                if (params.inputValue !== "") {
                  filtered.push({
                    inputValue: params.inputValue,
                    USER_TELL: `Add "${params.inputValue}"`,
                  });
                }

                return filtered;
              }}
              id="เบอร์โทร"
              options={items}
              getOptionLabel={(option) => {
                if (typeof option === "string") {
                  return option;
                }
                if (option.inputValue) {
                  return option.inputValue;
                }
                return option.USER_TELL;
              }}
              selectOnFocus
              clearOnBlur
              handleHomeEndKeys
              renderOption={(props, option) => {
                if (option.USER_TELL !== null) {
                  return <li {...props}>{option.USER_TELL}</li>;
                }
                return null;
              }}
              sx={{ width: 300 }}
              freeSolo
              renderInput={(params) => (
                <TextField {...params} label="USER_TELL" />
              )}
            />{" "}
            <Grid item xs={12} sm={6}>
              <TextField
                id="Wise"
                label="อาการ"
                variant="outlined"
                fullWidth
                required
                onChange={(e) => setWise(e.target.value)}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="Status"
                label="สถานะ"
                variant="outlined"
                fullWidth
                required
                onChange={(e) => setStatus(e.target.value)}
              ></TextField>
            </Grid>
          </React.Fragment>

          <Button onClick={handleClose}>ยกเลิก</Button>
          <button
            type="submit"
            variant="contained"
            class="btn btn-primary mb-3"
          >
            บันทึก
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
