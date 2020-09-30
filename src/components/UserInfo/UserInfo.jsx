import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Avatar } from "antd";
import classes from "../Header/Header.module.scss";
import avatar from "../../img/avatar.png";

const UserInfo = ({ username, image }) => {
  return (
    <Link className={classes["header__userinfo"]} to="/profile">
      <span className={classes["header__username"]}>{username}</span>
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
