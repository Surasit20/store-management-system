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

export default function UserInfoAdmin() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
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
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch("http://localhost:3001/api/v1/users", requestOptions)
  .then(response => response.json())
  .then((result) => {
    setLoading(false);
    setItems(result);
  })
  .catch(error => console.log('error', error));
  };

  const UserDelete = (USER_ID) => {
    var requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };

    fetch(
      `http://localhost:3001/api/v1/users/${USER_ID}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
    window.location.reload();
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
  return (
    <diV>
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
                <TableCell>ชื่อ - นามสกุด</TableCell>
                <TableCell>เบอร์โทร</TableCell>
                <TableCell>แก้ไขข้อมูล</TableCell>
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
                    ) ||
                    row.USER_CODE_NUMBER.toLowerCase().includes(
                      search.toLowerCase()
                    ) ||
                    row.USER_TELL.toLowerCase().includes(
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
                      {row.USER_TELL}
                    </TableCell>
                    <TableCell>
                      <Button
                        type="button"
                        class="btn btn-warning"
                        onClick={() => UserUpdate(row.USER_ID)}
                      >
                        แก้ไข
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        type="button"
                        class="btn btn-danger"
                        onClick={() => UserDelete(row.USER_ID)}
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
