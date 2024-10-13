"use client";
import { Box, Button, Dialog, IconButton, Typography } from "@mui/material";
import React, { useState } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import axios from "axios";
import {
  CustomSnackbar,
  CustomSnackbarProps,
} from "../../atoms/snackBar/snackBar";
import AspectRatioIcon from "@mui/icons-material/AspectRatio";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface Video {
  id: string;
  description: string;
  updated_by: string;
  updated_at: string;
  url: string;
}

interface DataGridProps {
  videos: Video[];
}

const DataGrid: React.FC<DataGridProps> = ({ videos }) => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [message, setMessage] = useState<CustomSnackbarProps | null>();
  const [openDeletion, setOpenDeletion] = useState<boolean>(false);
  const [openDetails, setOpenDetails] = useState<boolean>(false);
  const [idDelete, setIdDelete] = useState<string | null>(null);
  const [urlDetails, setUrlDetails] = useState<string | null>(null);

  // Função para extrair o ID do vídeo da URL do YouTube
  const getYouTubeVideoId = (url: string) => {
    const regExp =
      /^.*(youtu\.be\/|v\/|\/u\/\w\/|embed\/|watch\?v=|&v=|\/videos\/|watch\?.*&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const handleCloseSnackbar = () => {
    setMessage(null);
    window.location.reload();
  };

  const handleOpenDeletion = (id: string) => {
    setIdDelete(id);
    setOpenDeletion(true);
  };

  const handleDelete = () => async () => {
    const deleteVideo = await axios.post("/api/deleteVideo", {
      idDelete: idDelete,
    });
    if (deleteVideo.status === 200) {
      console.log("Vídeo deletado com sucesso");
      setMessage({
        severity: "success",
        autoHideDuration: 3000,
        handleClose: handleCloseSnackbar,
        children: `Vídeo deletado com sucesso`,
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
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: "16px",
        maxWidth: "100%",
        padding: "16px",
        boxSizing: "border-box",
      }}
    >
      {videos.map((video: Video) => {
        const videoId = getYouTubeVideoId(video.url);
        const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

        return (
          <div
            key={video.id}
            style={{
              border: "1px solid #ccc",
              padding: "16px",
              borderRadius: "8px",
              boxShadow: "24",
              textAlign: "center",
              position: "relative",
              maxWidth: "100%",
            }}
          >
            {selectedVideo === videoId ? (
              // Embed do vídeo do YouTube quando clicado
              <>
                <iframe
                  width="100%"
                  height="200px"
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title={video.description}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{
                    maxWidth: "100%",
                    maxHeight: "200px",
                  }}
                ></iframe>
                <Typography variant="h6">{video.description}</Typography>
                <Typography variant="subtitle1">
                  {"Adicionado por: "} {video.updated_by}
                </Typography>
              </>
            ) : (
              // Exibe a miniatura
              <>
                <img
                  src={thumbnailUrl}
                  alt={video.description}
                  style={{
                    width: "100%",
                    height: "200px",
                    cursor: "pointer",
                    borderRadius: "8px",
                    objectFit: "cover",
                  }}
                  onClick={() => setSelectedVideo(videoId)}
                />
                <Box
                  style={{
                    fontSize: "16px",
                    margin: "8px 0",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  <Typography variant="h6">{video.description}</Typography>
                  <Typography variant="subtitle1" sx={{ marginBottom: "10px" }}>
                    {"Adicionado por: "} {video.updated_by}
                  </Typography>
                  <Box
                    sx={{ position: "absolute", bottom: "-1px", right: "16px" }}
                  >
                    <IconButton
                      onClick={() => {
                        setOpenDetails(true);
                        setUrlDetails(
                          `https://www.youtube.com/embed/${videoId}`
                        );
                        setSelectedVideo(null);
                      }}
                    >
                      <AspectRatioIcon />
                    </IconButton>

                    <IconButton onClick={() => handleOpenDeletion(video.id)}>
                      <DeleteForeverIcon />
                    </IconButton>
                  </Box>
                </Box>
              </>
            )}
          </div>
        );
      })}
      <Dialog open={openDeletion} onClose={() => setOpenDeletion(false)}>
        <Box
          style={{
            justifyContent: "center",
            margin: "15px",
            padding: "25px",
          }}
        >
          <Typography variant="h5">Confirmação de deleção</Typography>
          <Typography variant="subtitle1" sx={{ marginTop: "30px" }}>
            Tem certeza que deseja deletar este vídeo?
          </Typography>
          <Box
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "15px",
            }}
          >
            <Button
              onClick={() => {
                setOpenDeletion(false);
              }}
              variant="outlined"
              color="error"
              sx={{ marginRight: "10px" }}
            >
              Cancelar
            </Button>
            <Button variant="contained" color="error" onClick={handleDelete()}>
              Deletar
            </Button>
          </Box>
        </Box>
      </Dialog>
      <Dialog
        open={openDetails}
        onClose={() => setOpenDetails(false)}
        maxWidth="lg"
        fullWidth
        // fullScreen
      >
        <Box style={{ padding: "15px", height: "80vh", position: "relative" }}>
          <IconButton
            onClick={() => setOpenDetails(false)}
            style={{ position: "absolute", top: "10px", right: "10px" }}
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6">Acompanhe seu Vídeo aqui:</Typography>
          {urlDetails && (
            <iframe
              width="100%"
              height="90%"
              src={urlDetails}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          )}
          <Button
            onClick={() => setOpenDetails(false)}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ArrowBackIcon />
            Voltar
          </Button>
        </Box>
      </Dialog>

      {message && <CustomSnackbar {...message} />}
    </div>
  );
};

export default DataGrid;
