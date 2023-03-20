import React, { useState } from "react";

import Wrapper from "./components/Helpers/Wrapper";
import Header from "./components/Header/Header";
import CalendarWrapper from "./components/Calendar/CalendarWrapper";
import Button from "./components/UI/Button";

import "./App.css";

const ecoji = require("ecoji-js");

String.prototype.hashCode = function () {
  var hash = 0,
    i,
    chr;
  if (this.length === 0) return hash;
  for (i = 0; i < this.length; i++) {
    chr = this.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

function App() {
  const [openModal, setOpenModal] = useState(false);
  const [modalContent, setModalContent] = useState();
  const [availablePaths, setAvailablePaths] = useState();
  const [currentPath, setCurrentPath] = useState();
  const [walletAddress, setWalletAddress] = useState("");
  const [calendarEntries, setCalendarEntries] = useState();

  const generatePaths = () => {
    const paths_num = Math.floor(Math.random() * 10) + 1;
    const paths = [];

    for (let i = 0; i < paths_num; i++) {
      paths[i] = "" + Math.floor(Math.random() * 50) + paths[i - 1];
      paths[i] = ecoji.encode(paths[i].hashCode().toString());
    }

    setAvailablePaths(paths);

    return (
      <ol>
        {paths.map((item) => {
          return <li key={item}>{item}</li>;
        })}
      </ol>
    );
  };

  const setOpenModalHandler = (event) => {
    setOpenModal(!openModal);

    if (event.target.textContent === "Available Paths") {
      setModalContent({
        title: "Available Paths",
        message: generatePaths(),
      });
    }
    if (event.target.textContent === "Connect Wallet") {
      setModalContent({
        title: "Connect Wallet",
        message: (
          <Wrapper>
            <p>To connect to MetaMask, insert one of the available paths:</p>
            <br />
            <form onSubmit={requestAccount}>
              <input id="path" />
              <Button type="submit">Connect</Button>
            </form>
          </Wrapper>
        ),
      });
    }
    if (event.target.textContent === "Add Calendar Entry") {
      setModalContent({
        title: "Add Calendar Entry",
        message: (
          <Wrapper>
            {!currentPath ? (
              <p>
                Successfully connect to a Meta Mask account before adding a
                record to the calendar.
              </p>
            ) : (
              <Wrapper>
                <p>Select a date for the entry to be recorded:</p>
                <br />
                <form onSubmit={setCalendarEntryHandler}>
                  <input id="date" type="date" />
                  <Button type="submit">Save</Button>
                </form>
              </Wrapper>
            )}
          </Wrapper>
        ),
      });
    }
  };

  async function requestAccount(event) {
    event.preventDefault();

    if (!currentPath) {
      setWalletAddress("Connection failed.");
      setCurrentPath("Incorrect path.");
    }

    for (let i = 0; i < availablePaths?.length; i++) {
      if (event.target.path.value === availablePaths[i]) {
        try {
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          setWalletAddress(accounts[0]);
          setCurrentPath(event.target.path.value);
        } catch (error) {
          console.log("Error");
        }
      }
    }

    setOpenModal(false);
  }

  async function setCalendarEntryHandler(event) {
    if (calendarEntries) {
      setCalendarEntries([
        ...calendarEntries,
        { path: currentPath, date: event.target.date.value },
      ]);
    }
    if (!calendarEntries) {
      setCalendarEntries([
        { path: currentPath, date: event.target.date.value },
      ]);
    }

    setOpenModal(false);
  }

  return (
    <Wrapper>
      {window.ethereum ? (
        <Wrapper>
          <Header
            isModalOpen={openModal}
            modalContent={modalContent}
            onOpenModal={setOpenModalHandler}
            onRequestAccount={requestAccount}
            walletAddress={walletAddress}
            currentPath={currentPath}
          />
          <CalendarWrapper
            isModalOpen={openModal}
            modalContent={modalContent}
            onOpenModal={setOpenModalHandler}
            calendarEntries={calendarEntries}
          />
        </Wrapper>
      ) : (
        <p>
          Meta Mask not detected (please install the extension to continue with
          the demo)
        </p>
      )}
    </Wrapper>
  );
}

export default App;
