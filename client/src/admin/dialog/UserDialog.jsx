import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Link } from 'react-router-dom';


const UserDialog = ({ open, handleClose }) => {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [items, setItems] = useState([]);
  const [userId, setUserId] = useState(null); 
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
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
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("http://localhost:3001/api/v1/users", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setLoading(false); 
        setItems(result);
      })
      .catch((error) => console.log("error", error));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>รายชื่อสมาชิก</DialogTitle>
      <DialogContent>
        <DialogContentText>
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
                      row.USER_TELL.toLowerCase().includes(search.toLowerCase())
                    );
                  })
                  .map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell
                        class="t-code"
                        style={{ verticalAlign: "middle", padding: "10px" }}
                      >
                        {row.USER_CODE_NUMBER}
                      </TableCell>
                      <TableCell
                        class="t-name"
                        style={{ verticalAlign: "middle", padding: "10px" }}
                      >
                       <Link to={{
      pathname: '/admin/chassis',
      state: { userFullName: row.USER_FULLNAME }
    }}>
      {row.USER_FULLNAME}
    </Link>
                      </TableCell>
                      <TableCell
                        class="t-bukget"
                        style={{ verticalAlign: "middle", padding: "10px" }}
                      >
                        {row.USER_TELL}
                      </TableCell>
                      <TableCell
                        class="t-edit"
                        style={{ verticalAlign: "middle", padding: "10px" }}
                      >
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
        </Paper>)}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          ปิด
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserDialog;