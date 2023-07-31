import React, { Component, useEffect, useState } from "react";
import "../repair/css/repair_info.css"
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

export default function RepairInfoAdmin() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);

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
          const motorcycle = motorcycles.find((m) => m.MOTORCYCLE_ID === item.MOTORCYCLE_ID);
          const user = users.find((u) => u.USER_ID === motorcycle.USER_ID);
          return {
            ...item,
            USER_FULLNAME: user ? user.USER_FULLNAME : "N/A",
          };
        });
  
        const repaildataesWithBothData = repaildataesWithUserFullname.map((item) => {
          const motorcycle = motorcycles.find((m) => m.MOTORCYCLE_ID === item.MOTORCYCLE_ID);
          return {
            ...item,
            MOTORCYCLE_BUCKET_NUMBER: motorcycle ? motorcycle.MOTORCYCLE_BUCKET_NUMBER : "N/A",
          };
        });
  
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
      .then((result)=> {
        return result.map((motorcycle) => ({
          MOTORCYCLE_ID : motorcycle.MOTORCYCLE_ID,
          USER_ID: motorcycle.USER_ID,
          MOTORCYCLE_BUCKET_NUMBER : motorcycle.MOTORCYCLE_BUCKET_NUMBER
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

  return (
    <div>
      <Row>
          <Col>
            <Grid item xs={12} sm={6}>
              <TextField
                id="RegistrationNumber"
                label="ชื่อ-นามสกุล"
                variant="outlined"
                fullWidth
                required
                //onChange={(e) => setRegistrationNumber(e.target.value)}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="BucketNumber"
                label="เบอร์โทร"
                variant="outlined"
                fullWidth
                required
                //onChange={(e) => setBucketNumber(e.target.value)}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="Model"
                label="เลขตัวถัง"
                variant="outlined"
                fullWidth
                required
                //onChange={(e) => setModel(e.target.value)}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="Color"
                label="อาการ"
                variant="outlined"
                fullWidth
                required
                //onChange={(e) => setColor(e.target.value)}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="Price"
                label="วันที่"
                variant="outlined"
                fullWidth
                required
                //onChange={(e) => setPrice(e.target.value)}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="Balance"
                label="สถานะ"
                variant="outlined"
                fullWidth
                required
                //onChange={(e) => setBalance(e.target.value)}
              ></TextField>
            </Grid>
            <button
              type="submit"
              variant="contained"
              class="btn btn-primary mb-3"
            >
              บันทึก
            </button>
          </Col>
        <Col>
        <div>
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
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .filter((row) => {
                    return (
                      search.trim() === "" ||
                      row.USER_FULLNAME.toLowerCase().includes(
                        search.toLowerCase()
                      ) 
                      || row.MOTORCYCLE_BUCKET_NUMBER.toLowerCase().includes(
                        search.toLowerCase()
                      ) 
                    );
                  })
                  .map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell>{row.USER_FULLNAME}</TableCell>
                      <TableCell>{row.MOTORCYCLE_BUCKET_NUMBER}</TableCell>
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
        </Col>
      </Row>
    </div>
  );
}
