import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import "./deleteDialog.css"

const DeleteDialog = ({ open, handleClose, handleDeleteConfirmation, dialogContentText, itemId }) => {
  return (
    <div className="size">
        <Dialog  open={open} onClose={handleClose}>
      <DialogTitle>ยืนยันการลบข้อมูล</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {dialogContentText}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button  variant="contained" color="error" onClick={handleClose}>ยกเลิก</Button>
        <Button variant="contained" color="success" onClick={() => handleDeleteConfirmation(itemId)}>ยืนยัน</Button>
      </DialogActions>
    </Dialog>

    </div>
    
  );
};

export default DeleteDialog;