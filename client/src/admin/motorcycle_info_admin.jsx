import React, { Component, useEffect, useState } from "react";
import "./css_admin.css";
import { Box, Container } from '@mui/system';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Navigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

function MotorcycleInfoAdmin() {
  const [items,setItems] = useState([]);
  useEffect(()=>{
    MotorcycleGet()
  });

  const MotorcycleGet = ()=>{
    fetch("http://localhost:3001/api/v1/motorcycles")
    .then(res=> res.json())
    .then(
      (result)=>{
        setItems(result);
      }
    )
  }

  const MotorcycleDelete = (MOTORCYCLE_ID) => {
    var requestOptions = {
      method: 'DELETE',
      redirect: 'follow'
    };
  
    fetch(`http://localhost:3001/api/v1/motorcycles/${MOTORCYCLE_ID}`, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }
  

  const [gotoAddMotorcycle,setGotoAddMotorcycle] = React.useState(false);
  if(gotoAddMotorcycle){
      return <Navigate to = "/admin/add-motorcycle" />;
  }
  return( 
  <div>
    <p>MotorcycleInfoAdmin</p>
    <div>
          <button onClick={()=>{setGotoAddMotorcycle(true);}}>
        ไปจ้า
    </button></div>
    { <React.Fragment>
        <Container maxWidth = "lg" sx={{p:2}}>
          <Box display = "flex">
              <Box sx ={{flexGrow : 1 }}>Item 1</Box>
              <Box>Item</Box>
        </Box>
        </Container>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell>แก้ไขข้อมูล (100g serving)</TableCell>
            <TableCell>ลบข้อมูล (100g serving)</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell >{row.MOTORCYCLE_ID}</TableCell>
              <TableCell >{row.MOTORCYCLE_BRAND}</TableCell>
              <TableCell >{row.MOTORCYCLE_BRAND}</TableCell>
              <TableCell >{row.MOTORCYCLE_BRAND}</TableCell>
              <TableCell>
                <ButtonGroup variant="outlined" aria-label="outlined button group">
                <Button>แก้ไข</Button>
                <Button onClick={()=>MotorcycleDelete(row.MOTORCYCLE_ID)}>ลบ</Button>
                </ButtonGroup>
              </TableCell>
             
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment> }
    </div>
  
  );
}

export default MotorcycleInfoAdmin;
