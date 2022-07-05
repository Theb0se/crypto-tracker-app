import React from "react";
import Drawer from "@mui/material/Drawer";
import { Avatar, IconButton } from "@mui/material";
import { CryptoState } from "../../Context/CryptoProvider";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { signOut } from "firebase/auth";
import { auth, db } from "../../firebase";
import { numberWithComma } from "../Banner/Carousal";
import { useHistory } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";

export default function UserSideBar() {
  const [state, setState] = React.useState({
    right: false,
  });

  const { user, setalert, watchList, coins, symbol, Currency } = CryptoState();

  const history = useHistory();

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const hpush = (coin) => {
    history.push(`/coins/${coin.id}`);
  };

  const removeWatchList = async (coin) => {
    const coinRef = doc(db, "watchlist", user.uid);
    try {
      await setDoc(
        coinRef,
        {
          coins: watchList.filter((watch) => watch !== coin?.id),
        },
        { merge: true }
      );
      setalert({
        open: true,
        message: `${coin.name} Remove From Watch List `,
        type: "success",
      });
    } catch (error) {
      setalert({
        open: true,
        message: error.message,
        type: "error",
      });
      return;
    }
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
                    padding: 5,
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

                  {coins.map((coin) => {
                    if (watchList.includes(coin.id)) {
                      return (
                        <div
                          style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            backgroundColor: "#F7D716",
                            padding:"0px 20px",
                            borderRadius: 10,
                            color:"black"
                          }}
                        >
                          <span
                            style={{ fontWeight: "600" }}
                            onClick={() => hpush(coin)}
                          >
                            {coin.name}
                          </span>
                          <span style={{ fontWeight: 400 }}>
                            {symbol}
                            {numberWithComma(coin?.current_price)}
                          </span>
                          <IconButton
                            aria-label="delete"
                            style={{ color: "#B22727" }}
                            size="small"
                            onClick={() => removeWatchList(coin)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </div>
                      );
                    }
                  })}
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
