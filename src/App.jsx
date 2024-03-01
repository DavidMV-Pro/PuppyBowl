import React from "react";
import "./App.css";
import AllPlayers from "./components/AllPlayers";
import Navbar from "./components/NavBar";
import MainContainer from "./components/MainContainer";

function App() {

  return (
    <div id="container">
      <Navbar/>
      <MainContainer/>
    </div>
  );
}

export default App;
