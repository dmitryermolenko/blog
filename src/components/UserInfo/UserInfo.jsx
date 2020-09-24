import React from "react";
import { Link } from "react-router-dom";
import { Avatar } from "antd";
import classes from "../Header/Header.module.scss";

const UserInfo = () => {
  return (
    <Link className={classes["header__userinfo"]} to="/profile">
      <span className={classes["header__username"]}>John Doe</span>
      <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
    </Link>
  );
};

export default UserInfo;
