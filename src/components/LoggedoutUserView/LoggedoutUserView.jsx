import React from "react";
import { Link } from "react-router-dom";
import classes from "../Header/Header.module.scss";

const LoggedoutUserView = () => {
  return (
    <div className={classes["header__loggedout"]}>
      <Link className={classes["header__signin-link"]} to="/sign-in">
        Sign In
      </Link>
      <Link className={classes["header__signup-link"]} to="/sign-up">
        Sign Up
      </Link>
    </div>
  );
};

export default LoggedoutUserView;
