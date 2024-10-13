import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

import React from "react";

export interface CustomSnackbarProps {
  open?: boolean;
  handleClose?: () => void;
  autoHideDuration: number;
  severity: "error" | "warning" | "info" | "success";
  vertical?: "top" | "bottom";
  horizontal?: "left" | "center" | "right";
  children: React.ReactNode;
}

export const CustomSnackbar = ({
  open = true,
  handleClose,
  autoHideDuration = 3000,
  severity,
  vertical = "top",
  horizontal = "center",
  children,
}: CustomSnackbarProps) => {
  return (
    <Snackbar
      sx={{
        "&& .MuiAlert-icon": {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
      }}
      autoHideDuration={autoHideDuration}
      anchorOrigin={{ vertical, horizontal }}
      open={open}
      onClose={handleClose}
      key={vertical + horizontal}
    >
      <Alert
        onClose={handleClose ? handleClose : undefined}
        severity={severity}
        sx={{ width: "100%" }}
      >
        {children}
      </Alert>
    </Snackbar>
  );
};
