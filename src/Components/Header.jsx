import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { MenuItem, Select } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Container } from "@mui/system";
import { useHistory } from "react-router-dom";
import { CryptoState } from "../Context/CryptoProvider";
import AuthModel from "./Authentication/AuthModel";
import UserSideBar from "./Authentication/UserSideBar";

export default function Header() {
  const history = useHistory();
  const { Currency, setCurrency, user } = CryptoState();

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      mode: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <div>
        <AppBar position="static" color="transparent" style={{ top: "0" }}>
          <Container>
            {" "}
            <Toolbar>
              <Typography
                onClick={() => history.push("/")}
                variant="h6"
                style={{
                  flex: 1,
                  color: "#ffd700",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Crypto Hunter
              </Typography>
              <Select
                variant="outlined"
                style={{ width: 100, height: 35, marginLeft: 15 }}
                value={Currency}
                onChange={(e) => setCurrency(e.target.value)}
              >
                <MenuItem value={"USD"}>USD</MenuItem>
                <MenuItem value={"INR"}>INR</MenuItem>
              </Select>
              {user ? <UserSideBar /> : <AuthModel />}
            </Toolbar>
          </Container>
        </AppBar>
      </div>
    </ThemeProvider>
  );
}
