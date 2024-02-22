import React,{forwardRef, useImperativeHandle, useRef} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'start',
  color: theme.palette.text.secondary,
}));
export default React.forwardRef(function FullScreenDialog(props, ref) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useImperativeHandle(ref, () => ({
    childFunction1() {
        console.log('child function 1 called');
        setOpen(true);
    },
    childFunction2() {
      console.log('child function 2 called');
    },
  }));


  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen} style={{ paddingLeft: "50px", paddingRight: "50px", display: "none" }}>
        Open full-screen dialog
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }} style={{ background: '#99BC85' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              ข้อมูลผู้ใช้งาน
            </Typography>

          </Toolbar>
        </AppBar>
  <Grid container spacing={2}>

  <Grid item xs={6}>
    <Item className='mt-4 mx-4'> <img src="/images/person.png" style={{width:"20px"}} className='mb-1'></img>  ชื่อ-นามสกุล: {props.USER_FULLNAME}</Item>
  </Grid>
  <Grid item xs={6}>
    <Item className=' mt-4 mx-4'> <img src="/images/cake.png" style={{width:"20px"}} className='mb-2'></img> วัน/เดือน/ปี เกิด: {props.USER_BIRTHDAY}</Item>
  </Grid>


  <Grid item xs={12}>
    <Item className='mx-4'> <img src="/images/id-card.png" style={{width:"20px"}} className=''></img> เลขประจำตัวบัตรประชาชน: {props.USER_CODE_NUMBER}</Item>
  </Grid>

  <Grid item xs={12}>
    <Item className='mx-4'> <img src="/images/phone.png" style={{width:"20px"}} className=''></img>  เบอร์โทรศัพท์: {props.USER_TELL}</Item>
  </Grid>

  <Grid item xs={12}>
    <Item className='mx-4'><img src="/images/work.png" style={{width:"20px"}} className=''></img>  อาชีพ: {props.USER_OCCUPATION}</Item>
  </Grid>

  <Grid item xs={12}>
    <Item className='mx-4'> <img src="/images/adress.png" style={{width:"20px"}} className='mb-1'></img> ที่อยู่: บ้านเลขที่: {props.USER_HOUSE_NUMBER} หมู่: {props.USER_GROUP} ซอย: {props.USER_ALLEY} ตำบล: {props.USER_SUB_DISTRICT} อำเภอ: {props.USER_DISTRICT} จัวหวัด: {props.USER_PROVINCE} รหัสไปรษณีย์: {props.USER_POSTAL_CODE}</Item>
  </Grid>

  <Grid item xs={12}>
    <Item className='mx-4'>  <img src="/images/email.png" style={{width:"20px"}} className='mb-1'></img>  อีเมล์: {props.USER_EMAIL}</Item>
  </Grid>

  <Grid item xs={12}>
    <Item className='mx-4'> <img src="/images/username.png" style={{width:"20px"}} className='mb-1'></img> ชื่อผู้ใช้: {props.USER_USERNAME}</Item>
  </Grid>

</Grid>
      </Dialog>
    </div>
  );
})
