import "./App.css";
import { Route } from "react-router-dom";
import Header from "./Components/Header";
import Coinpage from "./Pages/Coinpage";
import Homepage from "./Pages/Homepage";
import Toast from "./Components/Alert";

function App() {
  return (
    <div
      style={{
        backgroundColor: "#14161A",
        color: "white",
        minHeight: "100vh",
      }}
    >
      <Header />
      <Route path="/" component={Homepage} exact />
      <Route path="/coins/:id" component={Coinpage} />
      <Toast />
    </div>
  );
}

export default App;
