import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import "./deleteDialog.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan ,faCheck } from "@fortawesome/free-solid-svg-icons";

const DeleteDialog = ({ open, handleClose, handleDeleteConfirmation, dialogContentText, itemId }) => {
  return (
    <div className="size">
        <Dialog  open={open} onClose={handleClose}>
      <DialogTitle  style={{
              color: "#1ba7e1",
              fontWeight: "bold",
            }}>ยืนยันการลบข้อมูล</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {dialogContentText}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
      <button
            style={{
              backgroundColor: "#de6b4f",
              border: 0,
              borderRadius: "20px",
              width: "100px",
              height: "40px",
            }}
            onClick={handleClose}
          >
            <FontAwesomeIcon icon={faBan} style={{ color: "white" }} />{" "}
            <span style={{ color: "white" }}>ยกเลิก</span>
          </button>
          <button
            style={{
              backgroundColor: "#19C788",
              border: 0,
              borderRadius: "20px",
              width: "100px",
              height: "40px",
            }}
            onClick={() => handleDeleteConfirmation(itemId)}
          >
            <FontAwesomeIcon icon={faCheck} style={{ color: "white" }} />{" "}
            <span style={{ color: "white" }}>ยืนยัน</span>
          </button>
      </DialogActions>
    </Dialog>

    </div>
    
  );
};

export default DeleteDialog;