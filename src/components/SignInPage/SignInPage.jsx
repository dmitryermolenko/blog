import React from "react";
import { Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { Input, Button } from "antd";
import classes from "./SignInPage.module.scss";

const SignInPage = () => {
  const { control, handleSubmit, errors } = useForm({
    mode: "onChange",
  });

  const onSubmit = (data) => {};

  return (
    <div className={classes.signin}>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <h1 className={classes["signin__title"]}>Sign In</h1>
        <label htmlFor="email">Email Address</label>
        {errors.email && (
          <p style={{ margin: 0, color: "red" }}>{errors.email.message}</p>
        )}
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
          <p style={{ margin: 0, color: "red" }}>{errors.password.message}</p>
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
        <p className={classes["signin__question"]}>
          Don't you have an account? <Link to="/sign-up">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default SignInPage;
