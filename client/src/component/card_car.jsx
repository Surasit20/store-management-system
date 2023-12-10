import React, { Component, useEffect, useState, useRef } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { blue } from "@mui/material/colors";
import { DataGrid } from "@mui/x-data-grid";
import { useDemoData } from "@mui/x-data-grid-generator";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Navigate } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import axios from "axios";

import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Switch from "@mui/material/Switch";
import Box from "@mui/material/Box";

import {
  exportComponentAsJPEG,
  exportComponentAsPDF,
  exportComponentAsPNG,
} from "react-component-export-image";

const ComponentToPrint = React.forwardRef((props, ref) => (
  <div ref={ref} style={{ height: "300px" }}>
    <div className="row">
      <div className="col">
        <p>เลขที่ {props.data.MONTH_INSTALLMENTS_DATE}</p>
      </div>
      <div className="col">
        <p>วันที่ {props.data.MONTH_INSTALLMENTS_DATE}</p>
      </div>
      <div className="col">
        <p>เวลา {props.data.MONTH_INSTALLMENTS_TIME}</p>
      </div>
    </div>

    <p>ชื่อ-นามสกุล {props.user.USER_FULLNAME}</p>
    <p>เบอร์โทรศัพท์ {props.user.USER_TELL}</p>
    <p>เลขตัวถัง {props.id}</p>
  </div>
));

function CardCar(props) {
  const emails = ["username@gmail.com", "user02@gmail.com"];
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("sm");

  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [search, setSearch] = useState("");
  const [data, setData] = useState();
  const [user, setUser] = useState();
  const componentRef = useRef();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  const handleMaxWidthChange = (event) => {
    setMaxWidth(
      // @ts-expect-error autofill of arbitrary value is not handled.
      event.target.value
    );
  };

  const handleFullWidthChange = (event) => {
    setFullWidth(event.target.checked);
  };
  useEffect(async () => {
    const dataUser = JSON.parse(localStorage.getItem("user"));
    if (dataUser) {
      setUser(dataUser.data.user);
    }

    let data1 = await axios.get(`http://localhost:3001/api/v1/installments`);

    let data11 = data1.data.filter(
      (f) => f.MOTORCYCLE_ID == props.MOTORCYCLE_ID
    );

    let data2 = await axios.get(
      `http://localhost:3001/api/v1/month-installments`
    );

    if(data11.length > 0){
      let data22 = data2.data.filter(
        (f) => f.INSTALLMENTS_ID == data11[0].INSTALLMENTS_ID
      );
      setItems(data22);
    }
    else{
      setItems([]);
    }
  }, [props.MOTORCYCLE_ID]);

  const handleListItemClick = (value) => {
    //onClose(value);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={
              props.MOTORCYCLE_IMAGE == null || props.MOTORCYCLE_IMAGE == ""
                ? "https://scontent.fbkk4-1.fna.fbcdn.net/v/t1.6435-9/88149691_2597427603914262_9219278756928028672_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=ad2b24&_nc_eui2=AeGWgupA9yi37KS8nvtRbv3sf-w2S2N731B_7DZLY3vfUMPfB0rjzurpbUDGXvlejjLoHLzN4_BAcmoG5W9uAQjL&_nc_ohc=WgZQkavwRpEAX9zVeYH&_nc_ht=scontent.fbkk4-1.fna&oh=00_AfD-K3byocAah6dp4xxJxvTn46vZhT3Glvy_8IcqjKs6Qw&oe=64F9D2DA"
                : props.MOTORCYCLE_IMAGE
            }
            alt="green iguana"
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              ราคา: {props.MOTORCYCLE_PRICE}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              ยี้ห้อ: {props.MOTORCYCLE_BRAND}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              รุ่น: {props.MOTORCYCLE_BRAND}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              สี: {props.MOTORCYCLE_COLOR}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              ทะเบียน: {props.MOTORCYCLE_REGISTRATION_NUMBER}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              เลขตัวถัง: {props.MOTORCYCLE_BUCKET_NUMBER}
            </Typography>

            {props.IS_RECEIPT ? (
              <Typography variant="body2" color="text.secondary">
                <Button variant="contained" onClick={handleClickOpen}>
                  ดูข้อมูลใบเสร็จ
                </Button>
                {/* <SimpleDialog
                  key={props.MOTORCYCLE_ID}
                  selectedValue={selectedValue}
                  open={open}
                  onClose={handleClose}
                  MOTORCYCLE_ID={props.MOTORCYCLE_ID}
                /> */}
              </Typography>
            ) : (
              <div></div>
            )}
          </CardContent>
        </CardActionArea>
      </Card>

      <Dialog
        fullWidth={true}
        maxWidth={false}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>ประวัติการชำระเงิน</DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
          <Box
            noValidate
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              m: "auto",
              width: "fit-content",
            }}
          ></Box>

          <Paper>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell>วันที่</TableCell>
                    <TableCell>ค่างวด</TableCell>
                    <TableCell>สถานะ</TableCell>
                    <TableCell>ใบเสร็จ</TableCell>
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
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell>{row.MONTH_INSTALLMENTS_DATE}</TableCell>
                        <TableCell>{row.MONTH_INSTALLMENTS_MONEY}</TableCell>
                        <TableCell>
                          {row.MONTH_INSTALLMENTS_STATUS == 0 ? (
                            <p className="text-secondary">เกินกำหนดชำระ</p>
                          ) : row.MONTH_INSTALLMENTS_STATUS == 1 ? (
                            <p className="text-danger">ค้างชำระ</p>
                          ) : (
                            <p className="text-success">ชำระเงินแล้ว</p>
                          )}
                        </TableCell>

                        <TableCell>
                          <React.Fragment>
                            {/* <ComponentToPrint ref={componentRef} /> */}
                            <button
                              onClick={
                                () => {
                                  setOpen1(true);
                                  setData(row);
                                }
                                // exportComponentAsJPEG(componentRef)
                              }
                            >
                              ดูข้อมูลใบเสร็จ
                            </button>
                          </React.Fragment>
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

            <Dialog
              maxWidth={"lg"}
              minWidth={"lg"}
              fullWidth={true}
              open={open1}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {/* เลขที่ใบเสร็จ {data.MONTH_INSTALLMENTS_DATE} */}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description"></DialogContentText>
              </DialogContent>

              <React.Fragment>
                <ComponentToPrint
                  ref={componentRef}
                  data={data}
                  user={user}
                  id={props.MOTORCYCLE_BUCKET_NUMBER}
                />
                <button onClick={() => exportComponentAsJPEG(componentRef)}>
                  ดาว์โหลดใบเสร็จ
                </button>
              </React.Fragment>
              <DialogActions>
                <Button onClick={() => setOpen1(false)}>ปิด</Button>
              </DialogActions>
            </Dialog>
          </Paper>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>ปิด</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CardCar;
