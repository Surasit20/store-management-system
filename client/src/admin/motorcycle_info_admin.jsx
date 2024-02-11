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
import Dialog from "@mui/material/Dialog";
import DeleteDialog from "./dialog/deleteDialog";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusCircle,
  faPencilSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FaSpinner } from "react-icons/fa";
import "./css/motorcycle_add.css";

export default function MotorcycleInfoAdmin() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [motorcycleId, setMotorcycleId] = useState(null);
  const [open, setOpen] = useState(false);
  const [itemIdToDelete, setItemIdToDelete] = useState("");
  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };

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
              USER_CODE_NUMBER: user ? user.USER_CODE_NUMBER : "N/A",
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
          USER_FULLNAME: user.USER_FULLNAME,
          USER_CODE_NUMBER: user.USER_CODE_NUMBER,
        }));
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        return [];
      });
  };

  const MotorcycleDelete = (MOTORCYCLE_ID) => {
    var requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };

    fetch(
      `http://localhost:3001/api/v1/motorcycles/${MOTORCYCLE_ID}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        window.location.reload();
      })
      .catch((error) => console.log("error", error));
  };

  const MotorcycleUpdate = (MOTORCYCLE_ID) => {
    window.location = "/admin/update-motorcycle/" + MOTORCYCLE_ID;
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [gotoAddMotorcycle, setGotoAddMotorcycle] = useState(false);
  if (gotoAddMotorcycle) {
    return <Navigate to="/admin/add-motorcycle" />;
  }

  //ลบรถจักรยานยนต์
  const handleOpen = (MOTORCYCLE_ID) => {
    setMotorcycleId(MOTORCYCLE_ID);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteConfirmation = (itemId) => {
    MotorcycleDelete(motorcycleId);
    console.log(`Deleting item with ID: ${itemId}`);
    setOpen(false);
  };
  return (
    <diV>
      <div className="header-with-button with-underline">
        <div className="header">
          <h1 class="text-color">
            <strong>ข้อมูลรถจักรยานยนต์</strong>
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
          onClick={() => {
            setGotoAddMotorcycle(true);
          }}
        >
          <FontAwesomeIcon
            icon={faPlusCircle}
            className="mr-1"
            style={{ color: "white" }}
          />{" "}
          <span style={{ color: "white" }}>เพิ่มข้อมูล</span>
        </button>
      </div>
      <form className="search-form">
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
                      ชื่อ-นามสกุล
                    </TableCell>
                    <TableCell
                      class="t-bukget"
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
                      class="t-edit"
                      style={{ padding: "10px", color: "#1ba7e1" }}
                    >
                      แก้ไขข้อมูล
                    </TableCell>
                    <TableCell
                      class="t-delete"
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
                <div class="d">
                  <Table>
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
                            class="tablebody-row"
                            key={row.name}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                              alignItems: "center",
                              justifyContent: "space-between",
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
                              class="t-bukget"
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
                              class="t-edit"
                              style={{
                                verticalAlign: "middle",
                                padding: "10px",
                              }}
                            >
                              <Button
                                type="button"
                                class="btn btn-outline-warning btn-edit"
                                onClick={() =>
                                  MotorcycleUpdate(row.MOTORCYCLE_ID)
                                }
                              >
                                <FontAwesomeIcon
                                  icon={faPencilSquare}
                                  class="icon-edit"
                                />
                              </Button>
                            </TableCell>
                            <TableCell
                              class="t-delete"
                              style={{
                                verticalAlign: "middle",
                                padding: "10px",
                              }}
                            >
                              <Button
                                type="button"
                                class="btn btn-outline-danger btn-delete"
                                onClick={() => handleOpen(row.MOTORCYCLE_ID)}
                              >
                                <FontAwesomeIcon
                                  icon={faTrash}
                                  class="icon-delete"
                                />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>
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
          dialogContentText="คุณต้องการลบข้อมูลของรถจักรยานยนต์คันนี้ใช่หรือไม่?"
          itemId={itemIdToDelete}
        />
      </Dialog>
    </diV>
  );
}
