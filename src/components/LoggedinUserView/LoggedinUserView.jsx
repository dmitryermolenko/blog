import React from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import UserInfo from "../UserInfo/UserInfo";
import { setUser } from "../../actions/actions";
import classes from "../Header/Header.module.scss";

const LoggedinUserView = ({ user, setUser }) => {
  const history = useHistory();
  return (
    <div className={classes.Header__Loggedin}>
      <Link className={classes.Header__CreateArticle} to="/new-article">
        Create article
      </Link>
      {!user ? <span>Loading...</span> : <UserInfo />}
      <button
        className={classes.Header__Logout}
        onClick={() => {
          localStorage.removeItem("token");
          setUser({});
          history.push("/");
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
