import React from "react";
import { Link } from "react-router-dom";
import { Input, Button } from "antd";
import classes from "./SignInPage.module.scss";

const SignInPage = () => {
  return (
    <div className={classes.signin}>
      <form action="">
        <h1 className={classes["signin__title"]}>Sign In</h1>
        <label htmlFor="email">Email Address</label>
        <Input
          className={classes["signin__input"]}
          id="email"
          placeholder="Email address"
          type="email"
        />
        <label htmlFor="password">Password</label>
        <Input
          className={classes["signin__input"]}
          id="password"
          placeholder="Password"
          type="password"
        />
        <Button
          className={classes["signin__submit"]}
          type="primary"
          htmlType="submit"
        >
          Login
        </Button>
        <p className={classes["signin__question"]}>
          Don't you have an account? <Link to="/sign-up">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default SignInPage;
