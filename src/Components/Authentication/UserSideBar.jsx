import React from "react";
import Drawer from "@mui/material/Drawer";
import { Avatar } from "@mui/material";
import { CryptoState } from "../../Context/CryptoProvider";
import Button from "@mui/material/Button";

import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

export default function UserSideBar() {
  const [state, setState] = React.useState({
    right: false,
  });

  const { user, setalert } = CryptoState();

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const logout = () => {
    signOut(auth);
    setalert({
      open: true,
      message: "Logout Sucessfull",
      type: "success",
    });
  };

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Avatar
            onClick={toggleDrawer(anchor, true)}
            src={user.photoURL}
            alt={user.displayName || user.email}
            style={{
              height: 38,
              width: 38,
              marginLeft: 15,
              cursor: "pointer",
              backgroundColor: "#ffd700",
            }}
          ></Avatar>

          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <div
              style={{
                width: 350,
                padding: 25,
                display: "flex",
                flexDirection: "column",
                fontFamily: "monospace",
              }}
            >
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 20,
                  minHeight: "70vh",
                }}
              >
                <Avatar
                  src={user.photoURL}
                  alt={user.displayName || user.email}
                  style={{
                    height: 150,
                    width: 150,
                    marginLeft: 15,
                    cursor: "pointer",
                    backgroundColor: "#ffd700",
                    objectFit: "contain",
                  }}
                ></Avatar>
                <span
                  style={{
                    width: "100%",
                    fontSize: 24,
                    textAlign: "center",
                    fontWeight: "400",
                    wordWrap: "break-word",
                  }}
                >
                  {user.displayName || user.email}
                </span>
                <div
                  style={{
                    flex: 1,
                    width: "100%",
                    backgroundColor: "gray",
                    borderRadius: 10,
                    padding: 15,
                    paddingTop: 10,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 12,
                    overflowY: "scroll",
                  }}
                >
                  <span style={{ fontSize: 15, textShadow: "0 0 5px black" }}>
                    Watch List
                  </span>
                </div>
              </div>
              <Button
                variant="contained"
                onClick={logout}
                sx={{
                  height: 40,
                  width: "100%",
                  backgroundColor: "#ffd700",
                  marginTop: 10,
                }}
              >
                Log Out
              </Button>
            </div>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
