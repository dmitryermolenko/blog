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
  const [isRequestSending, setRequestSending] = useState(false);

  const { control, handleSubmit, errors } = useForm({
    mode: "onChange",
  });

  const onSubmit = ({ email, password }) => {
    setRequestSending(true);
    const requestBody = {
      user: {
        email,
        password,
      },
    };

    articlesService
      .loginUser(requestBody)
      .then((response) => {
        setRequestSending(false);
        if (response.errors["email or password"]) {
          console.log(response.errors["email or password"]);
          setServerErrors(response.errors);
          return;
        }
        localStorage.setItem("token", response.user.token);
        setUser(response.user);
      })
      .catch((err) => {
        setRequestSending(false);
        console.log(err);
      });
  };

  if (localStorage.getItem("token")) {
    return <Redirect to="/" />;
  }

  return (
    <div className={classes.Signin}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className={classes.Signin__Title}>Sign In</h1>
        <label htmlFor="email">Email Address</label>
        {errors.email && <ErrorIndicator errorMessage={errors.email.message} />}
        <Controller
          name="email"
          control={control}
          as={
            <Input
              className={classes.Signin__Input}
              id="email"
              placeholder="Email address"
              type="email"
            />
          }
          rules={{
            required: "Email is required",
            pattern: {
              value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
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
              className={classes.Signin__Input}
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
          className={classes.Signin__Submit}
          type="primary"
          htmlType="submit"
          disabled={isRequestSending ? true : false}
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
      <p className={classes.Signin__Question}>
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
