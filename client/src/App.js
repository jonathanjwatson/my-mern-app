import { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

function App() {
  useEffect(() => {
    console.log("Make an API call");
    axios
      .get("/api/config")
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="App">
        <h1>Hello world!</h1>
    </div>
  );
}

export default App;
