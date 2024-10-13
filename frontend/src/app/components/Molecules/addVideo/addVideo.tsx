"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const AddVideo: React.FC = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="contained"
        sx={{
          borderRadius: "20px",
          background: "linear-gradient(to right, #07a6ff, #5f38fb)",
        }}
        onClick={handleClickOpen}
      >
        <AddCircleIcon /> Adicionar Video
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Cadastre um Novo Video</DialogTitle>
        <DialogContent>Formulário</DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            color="error"
            // sx={{ backgroundColor: "red", color: "white" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleClose}
            sx={{ backgroundColor: "#0BA1FE", color: "white" }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddVideo;
