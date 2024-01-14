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
import axios from "axios";
function RepairUser() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [user, setUser] = useState();
  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(async () => {
    const dataUser = JSON.parse(localStorage.getItem("user"));
    let data1 = await axios.get(`https://back-end-store-management-system.onrender.com/api/v1/repaildataes`);
    let data2 = await axios.get(`https://back-end-store-management-system.onrender.com/api/v1/motorcycles`);
    if (dataUser) {
      setUser(dataUser.data.user);
    }
    let data2Filter = data2.data.filter(
      (f) => f.USER_ID == dataUser.data.user.USER_ID
    );

    // let arr3 = data1.data.map((item, i) =>
    //   Object.assign({}, item, data2Filter[i])
    // );
    let arr3 = []
    data2Filter.forEach(element => {
      let moto = data1.data.filter(f=>f.MOTORCYCLE_ID == element.MOTORCYCLE_ID)

      if(moto != [] && moto.length > 0){
        let motoWithRe = Object.assign(element,moto[0]);
        console.log(moto);
        arr3.push(motoWithRe)
      }
    });
    let arr4 = arr3.filter((f) => f.USER_ID != null);
    //console.log(arr4);

    setItems(arr4);
  }, []);

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
      `https://back-end-store-management-system.onrender.com/api/v1/motorcycles/${MOTORCYCLE_ID}`,
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
    <div>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>เลขตัวถัง</TableCell>
                <TableCell>ชื่อ-นามสกุล</TableCell>
                <TableCell>อาการ</TableCell>
                <TableCell>สถานะ</TableCell>
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
                    <TableCell>{user.USER_FULLNAME}</TableCell>
                    <TableCell>{row.REPAILDATA_WISE}</TableCell>
                    <TableCell>
                      {row.REPAILDATA_SATUS == 0 ? (
                        <p className="text-danger">อยู่ระหว่างการดำเนินงาน</p>
                      ) : (
                        <p className="text-success">เรียบร้อย</p>
                      )}
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
    </div>
  );
}

export default RepairUser;
