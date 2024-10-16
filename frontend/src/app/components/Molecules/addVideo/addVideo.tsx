"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  TextField,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import axios from "axios";
import {
  CustomSnackbar,
  CustomSnackbarProps,
} from "../../atoms/snackBar/snackBar";

const AddVideo: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [user, setUser] = useState("");
  const [message, setMessage] = useState<CustomSnackbarProps | null>();

  const handleClickOpen = () => {
    setOpen(true);
  };

  console.log(process.env.NEXT_PUBLIC_ENDPOINT_BACKEND);

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseSnackbar = () => {
    setMessage(null);
    window.location.reload();
  };

  const handleSave = async () => {
    // const body = {
    //   url: url,
    //   description: description,
    //   user: user,
    // };
    const req = await axios.post("/api/addVideo", {
      url: url,
      description: description,
      user: user,
    });
    if (req.status === 200) {
      setMessage({
        severity: "success",
        autoHideDuration: 3000,
        handleClose: handleCloseSnackbar,
        children: `Vídeo adicionado com sucesso`,
      });
    } else {
      setMessage({
        severity: "error",
        autoHideDuration: 3000,
        handleClose: () => {
          setMessage(null);
        },
        children: `Não foi possível completar a operação`,
      });
    }
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
        <AddCircleIcon /> Adicionar Vídeo
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth="lg">
        <DialogTitle>Cadastre um Novo Vídeo</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              margin: 2,
              padding: 2,
            }}
          >
            <TextField
              label="URL"
              variant="outlined"
              fullWidth
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <TextField
              label="Description"
              variant="outlined"
              multiline
              fullWidth
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <TextField
              label="Seu Nome"
              variant="outlined"
              fullWidth
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            color="error"
            // sx={{ backgroundColor: "red", color: "white" }}
          >
            <ArrowBackIcon />
            Voltar
          </Button>
          <Button
            onClick={handleSave}
            sx={{ backgroundColor: "#0BA1FE", color: "white" }}
          >
            <LibraryAddIcon />
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
      {message && <CustomSnackbar {...message} />}
    </div>
  );
};

export default AddVideo;
