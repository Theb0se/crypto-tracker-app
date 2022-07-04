import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Tab from "@mui/material/Tab";
import { Tabs } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Login from "./Login";
import SignUp from "./SignUp";
import GoogleButton from "react-google-button";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";
import { CryptoState } from "../../Context/CryptoProvider";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  color: "white",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 0,
};

export default function AuthModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [value, setValue] = useState("1");

  const { setalert } = CryptoState();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      secondary: {
        main: "#ffcf33",
      },
      mode: "dark",
    },
  });

  const googleProvider = new GoogleAuthProvider();
  const signInWithGoogle = async () => {
    await signInWithPopup(auth, googleProvider)
      .then((res) => {
        console.log(res);
        setalert({
          open: true,
          message: `Sign Up Successful. Welcome ${res.user.email}`,
          type: "success",
        });
        handleClose();
      })
      .catch((error) => {
        console.log(error);
        setalert({
          open: true,
          message: error.message,
          type: "error",
        });
        return;
      });
  };

  console.log(value);
  return (
    <ThemeProvider theme={darkTheme}>
      <div>
        <Button
          onClick={handleOpen}
          variant="contained"
          style={{ height: 35, marginLeft: 15, backgroundColor: "#ffd700" }}
        >
          Login
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} style={{ borderRadius: 10 }}>
            <AppBar
              position="static"
              style={{
                backgroundColor: "transparent",
                background: "transparent",
              }}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="secondary"
                textColor="inherit"
                variant="fullWidth"
              >
                <Tab value="1" label="Login" />
                <Tab value="2" label="Sign UP" />
              </Tabs>
            </AppBar>
            {value === "1" && <Login handleClose={handleClose} />}
            {value === "2" && <SignUp handleClose={handleClose} />}
            <Box
              style={{
                padding: 24,
                paddingTop: 0,
                display: "flex",
                flexDirection: "column",
                textAlign: "center",
                gap: 20,
                fontSize: 20,
              }}
            >
              <span>Or</span>
              <GoogleButton
                type="dark"
                style={{ width: "100%", outline: "none" }}
                onClick={signInWithGoogle}
              />
            </Box>
          </Box>
        </Modal>
      </div>
    </ThemeProvider>
  );
}
