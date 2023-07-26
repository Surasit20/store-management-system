import React, { Component, useEffect, useState } from "react";
import "./css_admin.css";
import { Box, Container } from '@mui/system';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
function MotorcycleInfoAdmin() {
  const [items,setItems] = useState([]);
  useEffect(()=>{
    fetch("http://localhost:3001/api/v1/users/")
    .then(res=> res.json())
    .then(
      (result)=>{
        setItems(result);
      }
    )
  })
  return( 
  <div>
    <p>MotorcycleInfoAdmin</p>
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
            
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.USER_ID}
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
