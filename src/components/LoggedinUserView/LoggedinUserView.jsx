import React from "react";
import UserInfo from "../UserInfo/UserInfo";
import { Link } from "react-router-dom";
import classes from "../Header/Header.module.scss";

const LoggedinUserView = () => {
  return (
    <div className={classes["header__loggedin"]}>
      <Link className={classes["header__create-article"]} to="/new-article">
        Create article
      </Link>
      <UserInfo />
      <button className={classes["header__logout"]}>Log Out</button>
    </div>
  );
};

export default LoggedinUserView;
