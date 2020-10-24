import React from "react";
import classes from "./ErrorIndicator.module.scss";

const ErrorIndicator = ({ errorMessage, style }) => {
  return (
    <p style={style} className={classes.Error}>
      {errorMessage}
    </p>
  );
};

export default ErrorIndicator;
