import React, { Component, useEffect, useState } from "react";
import "./css/motorcycle_info.css";
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
import CssBaseline from '@mui/material/CssBaseline';

function MotorcycleInfoAdmin() {
  const [items,setItems] = useState([]);
  const [users, setUsers] = useState([]);
  useEffect(()=>{
    UserGet()
    MotorcycleGet()
  });

  const MotorcycleGet = () => {
    fetch("http://localhost:3001/api/v1/motorcycles")
      .then(res => res.json())
      .then((result) => {
        if (result !== null && Array.isArray(result)) {
          // ตรวจสอบว่า result เป็น array หรือไม่ เพื่อป้องกันกรณีที่ result ไม่ใช่ array หรือมีค่าเป็น null
          // ถ้าเป็น array ให้ทำการเช็ค USER_ID ในแต่ละไอเทมและดำเนินการตามที่ต้องการ
          const filteredItems = result.filter((item) => item.USER_ID !== null);
          setItems(filteredItems.map(item => {
            const user = users.find(u => u.USER_ID === item.USER_ID);
            return {
              ...item,
              USER_FULLNAME: user ? user.USER_FULLNAME : 'N/A' // ถ้าไม่พบ user ในข้อมูลให้กำหนด USER_FULLNAME เป็น 'N/A'
            };
          }));
        } else {
          setItems([]);
        }
      })
      .catch(error => console.error('Error fetching motorcycles:', error));
    }
  

  const UserGet = () => {
    fetch("http://localhost:3001/api/v1/users")
      .then(res => res.json())
      .then((result) => {
        setUsers(result);
      })
      .catch(error => console.error('Error fetching users:', error));
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

  const MotorcycleUpdate = (MOTORCYCLE_ID)=>{
    window.location = '/admin/update-motorcycle/'+ MOTORCYCLE_ID
  }
  

  const [gotoAddMotorcycle,setGotoAddMotorcycle] = React.useState(false);
  if(gotoAddMotorcycle){
      return <Navigate to = "/admin/add-motorcycle" />;
  }
  return( 
  <div>
    <div>
          <button onClick={()=>{setGotoAddMotorcycle(true);}}>
        เพิ่มข้อมูล
    </button></div>
    { <React.Fragment>
      <div class="grid-container">
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>ชื่อลูกค้า</TableCell>
            <TableCell>เลขตัวถัง</TableCell>
            <TableCell>เลขทะเบียน</TableCell>
            <TableCell>รายละเอียด</TableCell>
            <TableCell>แก้ไขข้อมูล</TableCell>
            <TableCell>ลบข้อมูล</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell >{row.USER_FULLNAME}</TableCell>
              <TableCell >{row.MOTORCYCLE_BUCKET_NUMBER}</TableCell>
              <TableCell >{row.MOTORCYCLE_REGISTRATION_NUMBER}</TableCell>
              <TableCell ><Button type="button" class="btn btn-success " onClick={()=>MotorcycleUpdate(row.MOTORCYCLE_ID)}>รายละเอียด</Button></TableCell>
              <TableCell ><Button type="button" class="btn btn-warning" onClick={()=>MotorcycleUpdate(row.MOTORCYCLE_ID)}>แก้ไข</Button></TableCell>
              <TableCell ><Button type="button" class="btn btn-danger" onClick={()=>MotorcycleDelete(row.MOTORCYCLE_ID)}>ลบ</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
</div>  
    </React.Fragment> }
    </div>
  
  );
}

export default MotorcycleInfoAdmin;
