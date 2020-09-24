import React from "react";
import { Input, Button } from "antd";
import classes from "./EditProfilePage.module.scss";

const EditProfilePage = () => {
  return (
    <div className={classes.profile}>
      <form action="">
        <h1 className={classes["profile__title"]}>Edit profile</h1>
        <label htmlFor="username">Username</label>
        <Input
          className={classes["profile__input"]}
          id="username"
          placeholder="Username"
        />
        <label htmlFor="email">Email address</label>
        <Input
          className={classes["profile__input"]}
          id="email"
          placeholder="Email Address"
          type="email"
        />
        <label htmlFor="password-repeat">New Password</label>
        <Input
          className={classes["profile__input"]}
          id="password"
          placeholder="New Password"
          type="password"
        />
        <label htmlFor="avatar">Avatar image (url)</label>
        <Input
          className={classes["profile__input"]}
          id="avatar"
          placeholder="Avatar Image"
          type=""
        />
        <Button
          className={classes["profile__submit"]}
          type="primary"
          htmlType="submit"
        >
          Save
        </Button>
      </form>
    </div>
  );
};

export default EditProfilePage;
