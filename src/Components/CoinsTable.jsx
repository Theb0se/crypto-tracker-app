import React, { useEffect, useState } from "react";
import { CryptoState } from "../Context/CryptoProvider";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Container,
  LinearProgress,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import { useHistory } from "react-router-dom";
import { numberWithComma } from "./Banner/Carousal";

function CoinsTable() {
  const history = useHistory();
  const { Currency, symbol, coins, loading, fetchCoins } = CryptoState();

  const [search, setsearch] = useState("");
  const [page, setpage] = useState("1");

  useEffect(() => {
    fetchCoins();
    // eslint-disable-next-line
  }, [Currency]);
  console.log(coins);

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

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };

  const myStyle = {
    backgroundColor: "#16171b",
    cursor: "pointer",
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center" }}>
        <Typography variant="h4" style={{ margin: "18px", fontWeight: "300" }}>
          Cryptocurrency Prices By Market Cap
        </Typography>
        <TextField
          label="Search For a Crypto Currency ....."
          variant="outlined"
          fullWidth
          size="small"
          style={{ marginBottom: "10px" }}
          onChange={(e) => setsearch(e.target.value)}
        ></TextField>
        <TableContainer>
          {loading ? (
            <LinearProgress
              style={{ backgroundColor: "#ffd700" }}
            ></LinearProgress>
          ) : (
            <Table>
              <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                <TableRow>
                  {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                    <TableCell
                      style={{
                        color: "black",
                        fontWeight: "700",
                        padding: head === "24h Change" && "6px 10px",
                      }}
                      size="small"
                      key={head}
                      align={head === "Coin" ? "left" : "right"}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {handleSearch()
                  .slice((page - 1) * 10, (page - 1) * 10 + 10)
                  .map((row) => {
                    const profit = row.price_change_percentage_24h >= 0;
                    return (
                      <TableRow
                        onClick={() => history.push(`/coins/${row.id}`)}
                        key={row.name}
                        style={myStyle}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          style={{ display: "flex", gap: "15" }}
                        >
                          <img
                            src={row?.image}
                            alt={row?.name}
                            height="45"
                            width="45"
                            style={{ marginBottom: 10 }}
                          ></img>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              marginLeft: 15,
                            }}
                          >
                            <span
                              style={{
                                textTransform: "uppercase",
                                fontSize: 20,
                              }}
                            >
                              {row?.symbol}
                            </span>
                            <span style={{ color: "darkgrey" }}>
                              {row.name}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{
                            color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                          }}
                        >
                          {symbol}
                          {numberWithComma(row.current_price.toFixed(2))}
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{
                            color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                            fontWeight: 500,
                          }}
                        >
                          {profit && "+"}
                          {numberWithComma(
                            row.price_change_percentage_24h.toFixed(2)
                          )}
                          %
                        </TableCell>
                        <TableCell align="right">
                          {symbol}
                          {numberWithComma(
                            row.market_cap.toFixed(2).slice(0, 6)
                          )}
                          M
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          )}
        </TableContainer>
        <Pagination
          color="secondary"
          count={(handleSearch()?.length / 10).toFixed(0)}
          style={{
            padding: 20,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            color: "gold",
          }}
          onChange={(_, value) => {
            setpage(value);
            window.scroll(0, 450);
          }}
        ></Pagination>
      </Container>
    </ThemeProvider>
  );
}

export default CoinsTable;
