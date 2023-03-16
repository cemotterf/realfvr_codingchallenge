import React from "react";

import classes from "./Header.module.css";

const Header = (props) => {
  return (
    <div className={classes.div}>
      <button className={classes.button} onClick={props.onRequestAccount}>
        Connect Wallet
      </button>
      <p>Wallet Address: {props.walletAddress}</p>
    </div>
  );
};

export default Header;
