import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { CoinList } from "../Config/api";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
const CryptoContext = createContext();

function CryptoProvider({ children }) {
  const [Currency, setCurrency] = useState("INR");
  const [symbol, setsymbol] = useState("₹");
  const [coins, setcoins] = useState([]);
  const [loading, setloading] = useState(false);
  const [user, setuser] = useState(null);
  const [alert, setalert] = useState({
    open: false,
    message: "",
    type: "",
  });

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setuser(user);
      else setuser(null);
    });
  }, []);

  const fetchCoins = async () => {
    setloading(true);
    const { data } = await axios.get(CoinList(Currency));
    setcoins(data);
    setloading(false);
  };

  useEffect(() => {
    if (Currency === "INR") {
      setsymbol("₹");
    } else if (Currency === "USD") {
      setsymbol("$");
    }
  }, [Currency]);

  return (
    <CryptoContext.Provider
      value={{
        Currency,
        symbol,
        setCurrency,
        coins,
        setcoins,
        loading,
        setloading,
        fetchCoins,
        alert,
        setalert,
        user,
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
}

export default CryptoProvider;

export const CryptoState = () => {
  return useContext(CryptoContext);
};
