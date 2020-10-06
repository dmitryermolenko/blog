import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { Input, Button } from "antd";
import ArticlesService from "../../services/ArticlesServices";
import ErrorIndicator from "../ErrorIndicator/ErrorIndicator";
import { setUser } from "../../actions/actions";
import classes from "./SignInPage.module.scss";

const SignInPage = ({ user = {}, setUser }) => {
  const articlesService = new ArticlesService();
  const [serverErrors, setServerErrors] = useState({
    "email or password": null,
  });

  const { control, handleSubmit, errors } = useForm({
    mode: "onChange",
  });

  const onSubmit = ({ email, password }) => {
    const requestBody = {
      user: {
        email,
        password,
      },
    };

    articlesService
      .loginUser(requestBody)
      .then((response) => {
        if (response.errors) {
          setServerErrors(response.errors);
          return;
        }
        localStorage.setItem("token", response.user.token);
        setUser(response.user);
      })
      .catch((err) => console.log(err));
  };

  if (localStorage.getItem("token")) {
    return <Redirect to="/" />;
  }

  return (
    <div className={classes.signin}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className={classes["signin__title"]}>Sign In</h1>
        <label htmlFor="email">Email Address</label>
        {errors.email && <ErrorIndicator errorMessage={errors.email.message} />}
        <Controller
          name="email"
          control={control}
          as={
            <Input
              className={classes["signin__input"]}
              id="email"
              placeholder="Email address"
              type="email"
            />
          }
          rules={{
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
              message: "Invalid email format",
            },
          }}
        />

        <label htmlFor="password">Password</label>
        {errors.password && (
          <ErrorIndicator errorMessage={errors.password.message} />
        )}
        <Controller
          name="password"
          control={control}
          as={
            <Input
              className={classes["signin__input"]}
              id="password"
              placeholder="Password"
              type="password"
            />
          }
          rules={{
            required: "Password is required",
          }}
        />
        <Button
          className={classes["signin__submit"]}
          type="primary"
          htmlType="submit"
        >
          Login
        </Button>
      </form>
      {serverErrors["email or password"] && (
        <ErrorIndicator
          style={{ textAlign: "center" }}
          errorMessage={`email or password ${serverErrors["email or password"]}`}
        />
      )}
      <p className={classes["signin__question"]}>
        Don't you have an account? <Link to="/sign-up">Sign Up</Link>
      </p>
    </div>
  );
};

const mapStateToProps = ({ userData: { user } }) => ({ user });
const mapDispatchToProps = {
  setUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignInPage);
