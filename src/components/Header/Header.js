import React from "react";

import classes from "./Header.module.css";
import Button from "../UI/Button";
import Modal from "../UI/Modal";
import Wrapper from "../Helpers/Wrapper";

const Header = (props) => {
  return (
    <div className={classes.div}>
      {props.isModalOpen && (
        <Modal
          title={props.modalContent.title}
          message={props.modalContent.message}
          onConfirm={props.onOpenModal}
        />
      )}
      <Button className={classes.button} onClick={props.onOpenModal}>
        Available Paths
      </Button>

      <Button className={classes.button} onClick={props.onOpenModal}>
        Connect Wallet
      </Button>
      {props.walletAddress && (
        <Wrapper>
          <p>Wallet Address: {props.walletAddress}</p>
          <p>Current Path: {props.currentPath}</p>
        </Wrapper>
      )}
    </div>
  );
};

export default Header;
