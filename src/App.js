import { useState } from "react";
import { ethers } from "ethers";

import "./App.css";

import Calendar from "react-calendar";

const ecoji = require("ecoji-js");

function App() {
  const [walletAddress, setWalletAddress] = useState("");
  const [calendarDate, setCalendarDate] = useState(new Date());

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
        <Calendar
          tileContent={({ activeStartDate, date, view }) =>
            view === "month" && date.getDay() === 0 ? <p>It's Sunday!</p> : ""
          }
          onChange={setCalendarDate}
          value={calendarDate}
        />
      </header>
    </div>
  );
}

export default App;
