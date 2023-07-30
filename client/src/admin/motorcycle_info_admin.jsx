import React, { Component, useEffect, useState } from "react";
import { Form, InputGroup } from 'react-bootstrap';
import "./css/motorcycle_info.css";
import "./css_admin.css";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Navigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


export default function MotorcycleInfoAdmin() {
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };
  const [items,setItems] = useState([]);
   const [users, setUsers] = useState([]);
   useEffect(()=>{
     UserGet()
     MotorcycleGet()
   },[]);

   const MotorcycleGet = () => {
     fetch("http://localhost:3001/api/v1/motorcycles")
       .then(res => res.json())
       .then((result) => {
         if (result !== null && Array.isArray(result)) {
           const filteredItems = result.filter((item) => item.USER_ID !== null);
           setItems(filteredItems.map(item => {
             const user = users.find(u => u.USER_ID === item.USER_ID);
             return {
               ...item,
               USER_FULLNAME: user  // ถ้าไม่พบ user ในข้อมูลให้กำหนด USER_FULLNAME เป็น 'N/A'
             };
           }));
           setLoading(false);
         } else {
           setItems([]);
           setLoading(false);
         }
       })
      .catch(error => console.error('Error fetching motorcycles:', error),setLoading(false));
     }
  

   const UserGet = () => {
     fetch("http://localhost:3001/api/v1/users")
       .then(res => res.json())
       .then((result) => {
        const selectedFields = result.map(user => ({
          USER_ID: user.USER_ID,
          USER_FULLNAME: user.USER_FULLNAME
        }));
         setUsers(selectedFields);
         setLoading(false);
       })
       .catch(error => console.error('Error fetching users:', error),setLoading(false));
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

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [gotoAddMotorcycle,setGotoAddMotorcycle] = React.useState(false);
   if(gotoAddMotorcycle){
       return <Navigate to = "/admin/add-motorcycle" />;
   }




  return (
    <diV>
      <Row>
        <Col class = "search">
        <Form>
      <InputGroup className="my-3">
          <Form.Control
            onChange={handleInputChange}
            placeholder="ค้นหา"
          />
        </InputGroup>
       </Form>
      </Col>
        <Col class = "additem">
          
        <div>
           <button type="button" class="btn btn-danger"  onClick={()=>{setGotoAddMotorcycle(true);}}>
        เพิ่มข้อมูล     </button></div>
      </Col>
      </Row> 
      {loading ? (
        <p>Loading...</p>
      ) : (    
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
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
                return search.trim() === '' || row.USER_FULLNAME.toLowerCase().includes(search.toLowerCase())
                || row.MOTORCYCLE_BUCKET_NUMBER.toLowerCase().includes(search.toLowerCase()) 
                || row.MOTORCYCLE_REGISTRATION_NUMBER.toLowerCase().includes(search.toLowerCase());
              })
              .map((row) => (
                             <TableRow
                               key={row.name}
                               sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                             >
                               <TableCell >{row.USER_FULLNAME}</TableCell>
                               <TableCell >{row.MOTORCYCLE_BUCKET_NUMBER}</TableCell>
                               <TableCell >{row.MOTORCYCLE_REGISTRATION_NUMBER}</TableCell>
                               <TableCell ><Button type="button" class="btn btn-warning" onClick={()=>MotorcycleUpdate(row.MOTORCYCLE_ID)}>แก้ไข</Button></TableCell>
                               <TableCell ><Button type="button" class="btn btn-danger" onClick={()=>MotorcycleDelete(row.MOTORCYCLE_ID)}>ลบ</Button></TableCell>
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
  labelDisplayedRows={({ from, to, count }) => `${from}-${to} จากทั้งหมด ${count}`}
      />
    </Paper>)}
    </diV>
    
  );
}
