import { Box, TextField, } from "@mui/material";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import { CryptoState } from "../../Context/CryptoProvider";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

function SignUp({ handleClose }) {
  const [Email, setEmail] = useState();
  const [Password, setPassword] = useState();
  const [cnfPassword, setcnfPassword] = useState();
  const { setalert } = CryptoState();

  const handleSubmit = async () => {
    if (Password !== cnfPassword) {
      setalert({
        open: true,
        message: "password do not match!",
        type: "error",
      });
      return;
    }
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        Email,
        Password
      );
      console.log(result);
      setalert({
        open: true,
        message: `Sign Up Successful. Welcome ${result.user.email}`,
        type: "success",
      });
      handleClose();
    } catch (error) {
      setalert({
        open: true,
        message: error.message,
        type: "error",
      });
      return;
    }
  };

  return (
    <Box p={2} style={{ displey: "flex", flexDirection: "column", gap: 20 }}>
      <TextField
        variant="outlined"
        type="email"
        label="Enter Email ..."
        valur={Email}
        onChange={(e) => setEmail(e.target.value)}
        size="small"
        fullWidth
        style={{ marginTop: 15 }}
      ></TextField>
      <TextField
        variant="outlined"
        type="Password"
        label="Enter Password ..."
        valur={Password}
        onChange={(e) => setPassword(e.target.value)}
        size="small"
        fullWidth
        style={{ marginTop: 15 }}
      ></TextField>
      <TextField
        variant="outlined"
        type="Password"
        label="Confirm password..."
        valur={cnfPassword}
        onChange={(e) => setcnfPassword(e.target.value)}
        size="small"
        fullWidth
        style={{ marginTop: 15 }}
      ></TextField>

      <Button
        variant="contained"
        size="small"
        fullWidth
        style={{ marginTop: 20 }}
        color="secondary"
        onClick={handleSubmit}
      >
        Sign Up
      </Button>
    </Box>
  );
}

export default SignUp;
