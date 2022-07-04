import { Container, Typography } from "@mui/material";
import React from "react";
import Carousal from "./Carousal";

function Banner() {
  return (
    <div
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1639322537228-f710d846310a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80)",
      }}
    >
      <Container
        style={{
          height: 400,
          display: "flex",
          flexDirection: "column",
          paddingTop: 25,
          justifyContent: "space-around",
        }}
      >
        <div
          style={{
            display: "flex",
            height: "40%",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h2"
            style={{
              fontWeight: "bold",
              marginBottom: 15,
              textAlign: "center",
            }}
          >
            {" "}
            Crypto Hunter
          </Typography>
          <Typography
            variant="subtitle2"
            color="darkgray"
            fontWeight="400"
            textAlign="center"
          >
            Get All The Info About Your Fevorite Crypto Currency
          </Typography>
        </div>
        <Carousal />
      </Container>
    </div>
  );
}

export default Banner;
