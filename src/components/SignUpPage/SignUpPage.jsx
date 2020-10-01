import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { Input, Button, Alert } from "antd";
import ErrorIndicator from "../ErrorIndicator/ErrorIndicator";
import ArticlesService from "../../services/ArticlesServices";
import classes from "./SignUpPage.module.scss";

const SignUpPage = ({ user = {} }) => {
  const articlesService = new ArticlesService();

  const [serverErrors, setServerErrors] = useState({
    email: null,
    username: null,
  });
  const [isSignUpSuccessfull, setSuccessfullSignUp] = useState(false);

  const { token } = user;

  const {
    register,
    control,
    handleSubmit,
    errors,
    getValues,
    setError,
    setValue,
    clearErrors,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      username: "",
      email: "",
      password: "",
      repeat: "",
    },
  });

  const checkPasswordMatching = () => {
    const password = getValues("password");
    const passwordRepeat = getValues("repeat");
    if (password !== passwordRepeat) {
      setError("repeat", {
        type: "manual",
        message:
          "The values entered for Password and Repeat Password do not match",
      });
    } else {
      clearErrors("repeat");
    }
  };

  const onSubmit = ({ username, email, password }) => {
    const requestBody = {
      user: {
        username,
        email,
        password,
      },
    };

    articlesService
      .registerUser(requestBody)
      .then((response) => {
        if (response.errors) {
          setServerErrors(response.errors);
          return;
        }

        if (response.user.token) {
          setSuccessfullSignUp(true);
        }
      })
      .catch((err) => console.log(err));
  };

  if (token) {
    return <Redirect to="/" />;
  }

  if (isSignUpSuccessfull) {
    return (
      <>
        <Alert
          description="Registration compleated successfully"
          type="success"
          showIcon
        />
        <Link to="/sign-in">
          <Button type="primary">Back to Login Page</Button>
        </Link>
      </>
    );
  }
  return (
    <div className={classes.signup}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className={classes["signup__title"]}>Sign Up</h1>
        <label htmlFor="username">Username</label>
        {errors.username && (
          <ErrorIndicator errorMessage={errors.username.message} />
        )}
        {serverErrors.username && (
          <ErrorIndicator errorMessage={serverErrors.username} />
        )}
        <Controller
          name="username"
          control={control}
          render={() => (
            <Input
              className={classes["signup__input"]}
              id="username"
              placeholder="Username"
              onChange={(evt) => {
                setValue("username", evt.target.value, {
                  shouldValidate: true,
                });
                if (serverErrors.username) {
                  setServerErrors({ ...serverErrors, username: null });
                }
              }}
            />
          )}
          rules={{
            required: "Username is required",
            minLength: { value: 3, message: "Min length is 3 characters" },
            maxLength: { value: 20, message: "Max length is 20 characters" },
          }}
        />
        <label htmlFor="email">Email Address</label>
        {errors.email && <ErrorIndicator errorMessage={errors.email.message} />}
        {serverErrors.email && (
          <ErrorIndicator errorMessage={serverErrors.email} />
        )}
        <Controller
          name="email"
          control={control}
          render={() => (
            <Input
              className={classes["signup__input"]}
              id="email"
              placeholder="Email Address"
              onChange={(evt) => {
                setValue("email", evt.target.value, { shouldValidate: true });
                if (serverErrors.email) {
                  setServerErrors({ ...serverErrors, email: null });
                }
              }}
            />
          )}
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
          render={() => (
            <Input
              className={classes["signup__input"]}
              id="password"
              placeholder="Password"
              type="password"
              onChange={(evt) => {
                setValue("password", evt.target.value, {
                  shouldValidate: true,
                });
                checkPasswordMatching();
              }}
            />
          )}
          rules={{
            required: "Password is required",
            minLength: { value: 6, message: "Min length is 6 characters" },
            maxLength: { value: 40, message: "Max length is 40 characters" },
          }}
        />
        <label htmlFor="password-repeat">Repeat Password</label>
        {errors.repeat && (
          <p style={{ margin: 0, color: "red" }}>{errors.repeat.message}</p>
        )}
        <Controller
          name="repeat"
          control={control}
          render={() => (
            <Input
              className={classes["signup__input"]}
              id="repeat"
              placeholder="Repeat Password"
              type="password"
              onChange={(evt) => {
                setValue("repeat", evt.target.value);
                checkPasswordMatching();
              }}
            />
          )}
        />
        {errors.agreement && (
          <p style={{ margin: 0, color: "red" }}>{errors.agreement.message}</p>
        )}
        <label className={classes["signup__label"]}>
          <input
            name="agreement"
            className={classes["signup__checkbox"]}
            type="checkbox"
            ref={register({
              required: "Please tick the checkbox below if you want to proceed",
            })}
          />
          I agree to the processing of my personal information
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

const mapStateToProps = ({ userData: { user } }) => ({ user });

export default connect(mapStateToProps)(SignUpPage);
