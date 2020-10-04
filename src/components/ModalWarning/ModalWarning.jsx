import React from "react";
import { Button } from "antd";
import classes from "./ModalWarning.module.scss";

const ModalWarning = ({ onNoClick, onYesClick }) => {
  return (
    <div className={classes.modal}>
      <p className={classes["modal__question"]}>
        Are you sure to delete this article?
      </p>
      <div className={classes["modal__buttons-wrapper"]}>
        <Button
          className={classes["modal__no-button"]}
          type="primary"
          onClick={onNoClick}
        >
          No
        </Button>
        <Button
          className={classes["modal__yes-button"]}
          type="primary"
          onClick={onYesClick}
        >
          Yes
        </Button>
      </div>
    </div>
  );
};

export default ModalWarning;
