import React from "react";
import LoggedinUserView from "../LoggedinUserView/LoggedinUserView";
import LoggedoutUserView from "../LoggedoutUserView/LoggedoutUserView";
import { Link } from "react-router-dom";
import classes from "./Header.module.scss";

const Header = () => {
  const loggedin = false; /*временно */
  return (
    <header className={classes.header}>
      <h1 className={classes["header__title"]}>
        <Link className={classes["header__title-link"]} to="/">
          Realworld Blog
        </Link>
      </h1>
      {loggedin ? <LoggedinUserView /> : <LoggedoutUserView />}
    </header>
  );
};

export default Header;
