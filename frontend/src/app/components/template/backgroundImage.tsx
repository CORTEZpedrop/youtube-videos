import Box from "@mui/material/Box";
import Image from "next/image";
import React from "react";

export interface BackgroundImageProps {
  children: React.ReactNode;
}

export const BackgroundImage = ({ children }: BackgroundImageProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        overflow: "hidden",
        zIndex: "-100",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          height: "100vh",
          width: "100vw",
          overflow: "hidden",
        }}
      >
        <Image
          src={"/background-image.jpg"}
          alt="background"
          fill
          style={{
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            zIndex: "-15",
            objectFit: "cover",
            objectPosition: "center",
            overflow: "hidden",
          }}
        />
      </Box>
      {children}
    </Box>
  );
};
