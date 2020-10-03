import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import UserInfo from "../UserInfo/UserInfo";
import setUser from "../../actions/actions";
import classes from "../Header/Header.module.scss";

const LoggedinUserView = ({ user, setUser }) => {
  return (
    <div className={classes["header__loggedin"]}>
      <Link className={classes["header__create-article"]} to="/new-article">
        Create article
      </Link>
      {!user ? <span>Loading...</span> : <UserInfo />}
      <button
        className={classes["header__logout"]}
        onClick={() => {
          localStorage.removeItem("token");
          setUser(null);
        }}
      >
        Log Out
      </button>
    </div>
  );
};

const mapStateToProps = ({ userData: { user } }) => ({ user });
const mapDispatchToProps = {
  setUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoggedinUserView);
