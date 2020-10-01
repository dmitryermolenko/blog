import React from "react";
import classes from "./ErrorIndicator.module.scss";

const ErrorIndicator = ({ errorMessage, style }) => {
  return (
    <p style={style} className={classes.error}>
      {errorMessage}
    </p>
  );
};

export default ErrorIndicator;
