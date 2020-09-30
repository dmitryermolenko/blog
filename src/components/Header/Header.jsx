import React from "react";
import { connect } from "react-redux";
import LoggedinUserView from "../LoggedinUserView/LoggedinUserView";
import LoggedoutUserView from "../LoggedoutUserView/LoggedoutUserView";
import { Link } from "react-router-dom";
import classes from "./Header.module.scss";

const Header = ({ token }) => {
  return (
    <header className={classes.header}>
      <h1 className={classes["header__title"]}>
        <Link className={classes["header__title-link"]} to="/">
          Realworld Blog
        </Link>
      </h1>
      {token ? <LoggedinUserView /> : <LoggedoutUserView />}
    </header>
  );
};

const mapStateToProps = ({
  userData: {
    user: { token },
  },
}) => ({ token });
export default connect(mapStateToProps)(Header);
