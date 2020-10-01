import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import UserInfo from "../UserInfo/UserInfo";
import setUser from "../../actions/actions";
import classes from "../Header/Header.module.scss";

const LoggedinUserView = ({ setUser }) => {
  return (
    <div className={classes["header__loggedin"]}>
      <Link className={classes["header__create-article"]} to="/new-article">
        Create article
      </Link>
      <UserInfo />
      <button className={classes["header__logout"]} onClick={() => setUser({})}>
        Log Out
      </button>
    </div>
  );
};

const mapDispatchToProps = {
  setUser,
};

export default connect(null, mapDispatchToProps)(LoggedinUserView);
