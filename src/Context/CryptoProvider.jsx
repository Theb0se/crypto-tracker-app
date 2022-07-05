import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { CoinList } from "../Config/api";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";
const CryptoContext = createContext();

function CryptoProvider({ children }) {
  const [Currency, setCurrency] = useState("INR");
  const [symbol, setsymbol] = useState("₹");
  const [coins, setcoins] = useState([]);
  const [watchList, setWatchList] = useState([]);
  const [loading, setloading] = useState(false);
  const [user, setuser] = useState();
  const [alert, setalert] = useState({
    open: false,
    message: "",
    type: "",
  });

  useEffect(() => {
    if (user) {
      const coinRef = doc(db, "watchlist", user?.uid);
      var unsubscribe = onSnapshot(coinRef, (coin) => {
        if (coin.exists()) {
          const watchLists = coin?.data()?.coins;
          setWatchList(watchLists);
        } else {
          console.log("No Items in Watch List");
        }
      });
      return () => {
        unsubscribe();
      };
    }
    // eslint-disable-next-line
  }, [user,Currency]);

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
        watchList,
        setWatchList,
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
