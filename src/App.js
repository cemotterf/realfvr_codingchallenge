import "./App.css";
import { useState } from "react";
import { ethers } from "ethers";

const ecoji = require("ecoji-js");

function App() {
  const [walletAddress, setWalletAddress] = useState("");

  async function requestAccount() {
    console.log("batatinha");

    if (window.ethereum) {
      console.log("MM detec");

      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(ecoji.encode(accounts[0]));
      } catch (error) {
        console.log("Error!!!!!!!!!!!!!!!!");
      }
    } else {
      console.log("MM no detec");
    }
  }

  async function connectWallet() {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();

      const provider = new ethers.providers.Web3Provider(window.ethereum);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={requestAccount}>Connect Wallet</button>
        <p>Wallet Address: {walletAddress}</p>
      </header>
    </div>
  );
}

export default App;
