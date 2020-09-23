import React from "react";
import { Link } from "react-router-dom";
import classes from "./Header.module.scss";

const Header = () => {
  return (
    <header className={classes.header}>
      <h1 className={classes["header__title"]}>
        <Link className={classes["header__title-link"]} to="/">
          Realworld Blog
        </Link>
      </h1>
      <Link className={classes["header__signin-link"]} to="/sign-in">
        Sign In
      </Link>
      <Link className={classes["header__signup-link"]} to="/sign-up">
        Sign Up
      </Link>
    </header>
  );
};

export default Header;
