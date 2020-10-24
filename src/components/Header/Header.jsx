import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import LoggedinUserView from "../LoggedinUserView/LoggedinUserView";
import LoggedoutUserView from "../LoggedoutUserView/LoggedoutUserView";
import ArticlesService from "../../services/ArticlesServices";
import { setUser } from "../../actions/actions";
import classes from "./Header.module.scss";

const Header = ({ user, setUser }) => {
  const articlesService = new ArticlesService();
  useEffect(() => {
    if (localStorage.getItem("token") && !user) {
      articlesService
        .getCurrentUser()
        .then(({ user }) => setUser(user))
        .catch((err) => console.log(err));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <header className={classes.Header}>
      <h1 className={classes.Header__Title}>
        <Link className={classes.Header__TitleLink} to="/">
          Realworld Blog
        </Link>
      </h1>
      {localStorage.getItem("token") ? (
        <LoggedinUserView />
      ) : (
        <LoggedoutUserView />
      )}
    </header>
  );
};

const mapStateToProps = ({ userData: { user } }) => ({ user });
const mapDispatchToProps = {
  setUser,
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
