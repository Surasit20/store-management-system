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
import axios from "axios";
function PaymentCheckAdmin() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(async () => {
    // Promise.all([MotorcycleGet(), UserGet()])
    //   .then(([motorcycles, users]) => {
    //     const filteredItems = motorcycles.filter(
    //       (item) => item.USER_ID !== null
    //     );
    //     setItems(
    //       filteredItems.map((item) => {
    //         const user = users.find((u) => u.USER_ID === item.USER_ID);
    //         return {
    //           ...item,
    //           USER_FULLNAME: user ? user.USER_FULLNAME : "N/A",
    //         };
    //       })
    //     );
    //     setLoading(false);
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching data:", error);
    //     setLoading(false);
    //   });

    let data1 = await axios.get(
      `http://localhost:3001/api/v1/month-installments`
    );
    let data2 = await axios.get(`http://localhost:3001/api/v1/motorcycles`);

    let data3 = await axios.get(`http://localhost:3001/api/v1/users`);

    let arr3 = data1.data.map((item, i) =>
      Object.assign({}, item, data2.data[i], data3.data[i])
    );

    console.log(arr3);

    setItems(arr3);
    setLoading(false);
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
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
    window.location.reload();
  };

  const MotorcycleUpdate = (MOTORCYCLE_ID) => {
    window.location = "/admin/update-motorcycle/" + MOTORCYCLE_ID;
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

  const [gotoAddMotorcycle, setGotoAddMotorcycle] = React.useState(false);
  if (gotoAddMotorcycle) {
    return <Navigate to="/admin/add-motorcycle" />;
  }
  return (
    <diV>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell>เลขตัวถัง</TableCell>
                  <TableCell>ชื่อ-นามสกุล</TableCell>
                  <TableCell>หลักฐาน</TableCell>
                  <TableCell>สถานะ</TableCell>
                  <TableCell>ออกใบเสร็จ</TableCell>
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
                      key={row.MOTORCYCLE_ID}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell>{row.MOTORCYCLE_BUCKET_NUMBER}</TableCell>
                      <TableCell>{row.USER_FULLNAME}</TableCell>
                      <TableCell>
                        <a href={row.MONTH_INSTALLMENTS_IMAGE}>ดูสลิปใบเสร็จ</a>
                      </TableCell>
                      <TableCell>
                        <Button
                          type="button"
                          className="btn btn-warning"
                          onClick={() => MotorcycleUpdate(row.MOTORCYCLE_ID)}
                        >
                          แก้ไข
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => MotorcycleDelete(row.MOTORCYCLE_ID)}
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
    </diV>
  );
}

export default PaymentCheckAdmin;
