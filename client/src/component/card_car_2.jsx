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
import CardOverflow from '@mui/joy/CardOverflow';
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
import AspectRatio from '@mui/joy/AspectRatio';
import Link from '@mui/joy/Link';
import Chip from '@mui/joy/Chip';
const ComponentToPrint = React.forwardRef((props, ref) => (
  <div ref={ref} style={{ height: "300px" }}>
    <div className="row">
      <div className="col">
        <p>เลขที่ {props.data.MONTH_INSTALLMENTS_ID}</p>
      </div>
      <div className="col">
        <p>วันที่ {props.data.MONTH_INSTALLMENTS_DATE}</p>
      </div>
      <div className="col">
        <p>เวลา {props.data.MONTH_INSTALLMENTS_TIME}</p>
      </div>
    </div>

    <p className="mx-2">ชื่อ-นามสกุล {props.user.USER_FULLNAME}</p>
    <p className="mx-2">เบอร์โทรศัพท์ {props.user.USER_TELL}</p>
    <p className="mx-2">เลขตัวถัง {props.id}</p>
    <p className="mx-2">ค่างวด {props.data.MONTH_INSTALLMENTS_MONEY} บาท</p>
  </div>
));

function CardCar2(props) {


  return (
    <Card orientation="horizontal" variant="outlined" sx={{ width: 260 }}>
    <CardOverflow>
      <AspectRatio ratio="1" sx={{ width: 90 }}>
        <img
          src="https://images.unsplash.com/photo-1507833423370-a126b89d394b?auto=format&fit=crop&w=90"
          srcSet="https://images.unsplash.com/photo-1507833423370-a126b89d394b?auto=format&fit=crop&w=90&dpr=2 2x"
          loading="lazy"
          alt=""
        />
      </AspectRatio>
    </CardOverflow>
    <CardContent>
      <Typography fontWeight="md" textColor="success.plainColor">
        Yosemite Park
      </Typography>
      <Typography level="body-sm">California, USA</Typography>
    </CardContent>
    <CardOverflow
      variant="soft"
      color="primary"
      sx={{
        px: 0.2,
        writingMode: 'vertical-rl',
        justifyContent: 'center',
        fontSize: 'xs',
        fontWeight: 'xl',
        letterSpacing: '1px',
        textTransform: 'uppercase',
        borderLeft: '1px solid',
        borderColor: 'divider',
      }}
    >
      Ticket
    </CardOverflow>
  </Card>
  );
}


export default CardCar2;
