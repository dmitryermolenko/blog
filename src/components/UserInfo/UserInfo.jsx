import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Avatar } from "antd";
import classes from "../Header/Header.module.scss";
import avatar from "../../img/avatar.png";

const UserInfo = ({ username, image }) => {
  return (
    <Link className={classes.Header__Userinfo} to="/profile">
      <span className={classes.Header__Username}>{username}</span>
      <Avatar src={image ? image : avatar} />
    </Link>
  );
};

const mapStateToProps = ({
  userData: {
    user: { username, image },
  },
}) => ({ username, image });
export default connect(mapStateToProps)(UserInfo);
