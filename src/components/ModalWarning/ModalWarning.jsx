import React from "react";
import { Button } from "antd";
import classes from "./ModalWarning.module.scss";

const ModalWarning = ({ onNoClick, onYesClick }) => {
  return (
    <div className={classes.Modal}>
      <p className={classes.Modal__Question}>
        Are you sure to delete this article?
      </p>
      <div className={classes.Modal__ButtonsWrapper}>
        <Button
          className={classes.Modal__NoButton}
          type="primary"
          onClick={onNoClick}
        >
          No
        </Button>
        <Button
          className={classes.Modal__YesButton}
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
