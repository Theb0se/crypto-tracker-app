import { CircularProgress, MenuItem, Select } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { HistoricalChart } from "../../Config/api";
import { CryptoState } from "../../Context/CryptoProvider";
import "../../Pages/Coinspage.css";
import "chart.js/auto";
import { Chart } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
} from "chart.js";
import { chartDays } from "../../Config/data";

ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale);

export default function CoinInfo({ coin }) {
  const [historicalData, sethistoricalData] = useState();
  const [days, setdays] = useState("1");
  const { Currency } = CryptoState();

  const fetchHistoricalData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, Currency));
    sethistoricalData(data.prices);
  };
  useEffect(() => {
    fetchHistoricalData();
    // eslint-disable-next-line
  }, [coin, days]);
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
 
  return (
    <ThemeProvider theme={darkTheme}>
      <div className="charContainer">
        {!historicalData ? (
          <CircularProgress
            style={{ color: "#ffcf33" }}
            size={250}
            thickness={1}
          />
        ) : (
          <>
            <Chart
              type="line"
              lineThickness="1"
              data={{
                labels: historicalData.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === "1" ? time : date.toLocaleDateString();
                }),
                datasets: [
                  {
                    data: historicalData.map((coin) => coin[1]),
                    label: `Price (Past ${days} Days) in ${Currency}`,
                    borderColor: "#ffcf33",
                    borderWidth: 1.5,
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 0,
                  },
                },
                plugins: {
                  legend: {
                    display: false,
                  },
                  tooltip: {
                    mode: "index",
                    intersect: false,
                  },
                },
                hover: {
                  mode: "nearest",
                  intersect: false,
                },
              }}
            />
            <Select
              variant="outlined"
              style={{ height: 40, marginTop: 20 }}
              size="small"
              color="primary"
              value={days}
              onChange={(e) => setdays(e.target.value)}
            >
              {chartDays.map((days) => (
                <MenuItem value={days.value}>{days.label}</MenuItem>
              ))}
            </Select>
          </>
        )}
      </div>
    </ThemeProvider>
  );
}
