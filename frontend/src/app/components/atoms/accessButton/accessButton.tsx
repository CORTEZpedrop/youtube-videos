"use client";
import React from "react";
// import { useHistory } from 'react-router-dom';
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";

const AccessButton: React.FC = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/pages/portal");
  };

  return (
    <Button
      onClick={handleClick}
      variant="contained"
      //   color="primary"
      size="large"
      sx={{
        borderRadius: "20px",
        fontFamily: "Segoe UI, sans-serif", // Change to your desired font family
        fontSize: "16px",
        fontWeight: "bold",
        background: "linear-gradient(to right, #07a6ff, #5f38fb)",
      }}
    >
      Acessar
    </Button>
  );
};

export default AccessButton;
