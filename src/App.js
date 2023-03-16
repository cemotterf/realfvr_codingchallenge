import React, { useState } from "react";

import Wrapper from "./components/Helpers/Wrapper";
import Header from "./components/UI/Header";
import CalendarWrapper from "./components/UI/CalendarWrapper";

import "./App.css";

const ecoji = require("ecoji-js");

function App() {
  const [walletAddress, setWalletAddress] = useState("");

  async function requestAccount() {
    console.log("window.ethereum: ", window.ethereum);

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setWalletAddress(ecoji.encode(accounts[0]));
      console.log("address: ", accounts[0]);
    } catch (error) {
      console.log("Error");
    }
  }

  return (
    <Wrapper>
      <Header onRequestAccount={requestAccount} walletAddress={walletAddress} />
      <CalendarWrapper />
    </Wrapper>
  );
}

export default App;
