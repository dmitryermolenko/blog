import React from "react";
import { Link } from "react-router-dom";
import { Input, Button } from "antd";
import classes from "./SignUpPage.module.scss";

const SignUpPage = () => {
  return (
    <div className={classes.signup}>
      <form action="">
        <h1 className={classes["signup__title"]}>Sign Up</h1>
        <label htmlFor="username">Username</label>
        <Input
          className={classes["signup__input"]}
          id="username"
          placeholder="Username"
        />
        <label htmlFor="password">Password</label>
        <Input
          className={classes["signup__input"]}
          id="password"
          placeholder="Password"
          type="password"
        />
        <label htmlFor="password-repeat">Repeat Password</label>
        <Input
          className={classes["signup__input"]}
          id="password-repeat"
          placeholder="Repeat Password"
          type="password"
        />
        <label className={classes["signup__label"]}>
          <Input className={classes["signup__checkbox"]} type="checkbox" />I
          agree to the processing of my personal information
        </label>
        <Button
          className={classes["signup__submit"]}
          type="primary"
          htmlType="submit"
        >
          Create
        </Button>
        <p className={classes["signup__question"]}>
          Already have an account? <Link to="/sign-in">Sign In</Link>
        </p>
      </form>
    </div>
  );
};

export default SignUpPage;
