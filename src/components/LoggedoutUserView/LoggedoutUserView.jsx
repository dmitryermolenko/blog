import React from "react";
import { Link } from "react-router-dom";
import classes from "../Header/Header.module.scss";

const LoggedoutUserView = () => {
  return (
    <div className={classes.Header__Loggedout}>
      <Link className={classes.Header__SigninLink} to="/sign-in">
        Sign In
      </Link>
      <Link className={classes.Header__SignupLink} to="/sign-up">
        Sign Up
      </Link>
    </div>
  );
};

export default LoggedoutUserView;
