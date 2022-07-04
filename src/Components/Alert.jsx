import { Alert, Snackbar } from "@mui/material";
import React from "react";
import { CryptoState } from "../Context/CryptoProvider";

function Toast() {
  const { alert, setalert } = CryptoState();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setalert({ open: false });
  };

  return (
    <div>
      <Snackbar
        open={alert.open}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        onClose={handleClose}
        autoHideDuration={3000}
        style={{ fontWeight: 500, fontFamily: "monospace" }}
      >
        <Alert
          onClose={handleClose}
          severity={alert.type}
          sx={{ width: "100%", fontFamily: "monospace" }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Toast;
