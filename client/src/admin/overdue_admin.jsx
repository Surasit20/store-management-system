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
        const [installments, motorcycles, users] = await Promise.all([
          InstallmentGet(),
          MotorcycleGet(),
          UserGet(),
        ]);
    
        if (!installments) {
          console.error("Error fetching installments data");
          return;
        }
        const installmentDataWithDetails = installments.map((item) => {
          const motorcycle = motorcycles.find((m) => m.MOTORCYCLE_ID === item.MOTORCYCLE_ID);
          if (!motorcycle || typeof motorcycle.USER_ID === 'undefined') {
            return null; 
          }
    
          const user = users.find((u) => u.USER_ID === motorcycle.USER_ID);
          if (!user || typeof user.USER_FULLNAME === 'undefined') {
            return null; 
          }
          return {
            ...item,
            USER_FULLNAME: user ? user.USER_FULLNAME : "N/A",
            MOTORCYCLE_BUCKET_NUMBER: motorcycle ? motorcycle.MOTORCYCLE_BUCKET_NUMBER : "N/A",
            MOTORCYCLE_REGISTRATION_NUMBER: motorcycle ? motorcycle.MOTORCYCLE_REGISTRATION_NUMBER : "N/A",
            MOTORCYCLE_REGISTRATION_NUMBER : motorcycle ? motorcycle.MOTORCYCLE_REGISTRATION_NUMBER : "N/A"
          };
        });
    
        setItems(installmentDataWithDetails.filter(item => item !== null)); // Remove null entries
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
          MOTORCYCLE_REGISTRATION_NUMBER :  motorcycle.MOTORCYCLE_REGISTRATION_NUMBER
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

  const InstallmentGet = () => {
    return fetch("http://localhost:3001/api/v1/installments")
      .then((res) => res.json())
      .catch((error) => {
        console.error("Error fetching installments:", error);
        return [];
      });
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
    <Row>

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
                            {row.MOTORCYCLE_REGISTRATION_NUMBER}
                          </TableCell>
                          <TableCell>
                            <Button
                              type="button"
                              class="btn btn-warning"
                              // onClick={() => MotorcycleUpdate(row.MOTORCYCLE_ID)}
                            >
                              รายละเอียด
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
