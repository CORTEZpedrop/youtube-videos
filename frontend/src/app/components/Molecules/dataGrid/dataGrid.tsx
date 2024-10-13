"use client";
import { Typography } from "@mui/material";
import React, { useState } from "react";

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

  // Função para extrair o ID do vídeo da URL do YouTube
  const getYouTubeVideoId = (url: string) => {
    const regExp =
      /^.*(youtu\.be\/|v\/|\/u\/\w\/|embed\/|watch\?v=|&v=|\/videos\/|watch\?.*&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
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
                <h3
                  style={{
                    fontSize: "16px",
                    margin: "8px 0",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  <Typography variant="h6">{video.description}</Typography>
                  <Typography variant="subtitle1">
                    {"Adicionado por: "} {video.updated_by}
                  </Typography>
                </h3>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default DataGrid;
