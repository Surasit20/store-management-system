import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

const NotFoundDialog = ({ open, handleClose }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>ไม่พบข้อมูล</DialogTitle>
      <DialogContent>
        <DialogContentText>
          ขออภัย ไม่พบข้อมูลที่คุณค้นหา
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

export default NotFoundDialog;