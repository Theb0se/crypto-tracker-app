import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CryptoState } from "../Context/CryptoProvider";
import axios from "axios";
import { SingleCoin } from "../Config/api";
import CoinInfo from "../Components/CoinInfo/CoinInfo";
import { LinearProgress, Typography } from "@mui/material";
import parse from "html-react-parser";
import "./Coinspage.css";
import { numberWithComma } from "../Components/Banner/Carousal";

export default function Coinpage() {
  const { id } = useParams();
  const [coin, setcoin] = useState();
  const { Currency, symbol } = CryptoState();

  const fetchSingleCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setcoin(data);
  };

  useEffect(() => {
    fetchSingleCoin();
    // eslint-disable-next-line
  }, [Currency]);

  if (!coin)
    return (
      <LinearProgress style={{ backgroundColor: "#ffcf33" }}></LinearProgress>
    );
  return (
    <div className="coinSection">
      <div className="sidebar">
        <img
          src={coin?.image?.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Typography
          variant="h3"
          style={{ fontWeight: 400, marginBottom: 20, fontSize: 34 }}
        >
          {coin?.name}
        </Typography>
        <Typography
          variant="subtitle1"
          style={{
            width: "100%",
            padding: 25,
            paddingBottom: 15,
            paddingTop: 10,
            textAlign: "justify",
          }}
        >
          {parse(coin?.description.en.split(". ")[0])}.
        </Typography>
        <div
          style={{
            alignSelf: "center",
            padding: 25,
            paddingTop: 10,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <span
            style={{
              fontWeight: 500,
              paddingTop: 10,
              fontSize: 24,
              textAlign: "center",
              // eslint-disable-next-line
              fontSize: 20,
            }}
          >
            Rank :{" "}
            <span style={{ fontWeight: 300 }}>{coin?.market_cap_rank}</span>
          </span>
          <span
            style={{
              fontWeight: 500,
              paddingTop: 10,
              fontSize: 24,
              textAlign: "center",
              // eslint-disable-next-line
              fontSize: 20,
            }}
          >
            Current Price :{" "}
            <span style={{ fontWeight: 300 }}>
              {symbol}
              {numberWithComma(
                coin?.market_data.current_price[Currency.toLowerCase()]
              )}
            </span>
          </span>
          <span
            style={{
              fontWeight: 500,
              paddingTop: 10,
              fontSize: 24,
              textAlign: "center",
              // eslint-disable-next-line
              fontSize: 20,
            }}
          >
            Merket Cap :{" "}
            <span style={{ fontWeight: 300 }}>
              {symbol}
              {numberWithComma(
                coin?.market_data.market_cap[Currency.toLowerCase()]
              )
                .toString()
                .slice(0, -6)}
              M
            </span>
          </span>
        </div>
      </div>
      <CoinInfo coin={coin} />
    </div>
  );
}
