import axios from "axios";
import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
import { TrendingCoins } from "../../Config/api";
import { CryptoState } from "../../Context/CryptoProvider";

export function numberWithComma(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function Carousal() {
  const { Currency, symbol } = CryptoState();
  const [tranding, settranding] = useState([]);

  const fetchTrandingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(Currency));
    settranding(data);
  };

  useEffect(() => {
    fetchTrandingCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Currency]);

  const resposive = {
    0: {
      items: 2,
    },
    512: {
      items: 3,
    },
    760: {
      items: 5,
    },
  };

  const items = tranding.map((coin) => {
    let profit = coin.price_change_percentage_24h >= 0;
    return (
      <Link
        to={"/coins/" + coin.id}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          cursor: "pointer",
          textTransform: "uppercase",
          color: "white",
        }}
      >
        <img
          src={coin?.image}
          alt={coin.name}
          height="90"
          style={{ marginBottom: "10px" }}
        ></img>
        <span style={{ color: "#ffd700", fontWeight: 600 }}>
          {coin?.symbol}
          &nbsp;
          <span
            style={{
              color: profit > 0 ? "rgb(14, 203, 129)" : "red",
              fontWeight: 600,
            }}
          >
            {profit && "+"}{(coin?.price_change_percentage_24h.toFixed)(2)}%
          </span>
        </span>

        <span style={{ fontSize: "15px", fontWeight: "600", marginTop: 10 }}>
          {symbol} {numberWithComma((coin?.current_price).toFixed(2))}
        </span>
      </Link>
    );
  });

  return (
    <div style={{ height: "50%", display: "flex", alignItems: "center" }}>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={resposive}
        autoPlay
        items={items}
      />
    </div>
  );
}
