import React from "react";
import { Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { Input, Button } from "antd";
import classes from "./SignUpPage.module.scss";

const SignUpPage = () => {
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

  const onSubmit = (data) => {};

  return (
    <div className={classes.signup}>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <h1 className={classes["signup__title"]}>Sign Up</h1>
        <label htmlFor="username">Username</label>
        {errors.username && (
          <p style={{ margin: 0, color: "red" }}>{errors.username.message}</p>
        )}
        <Controller
          name="username"
          control={control}
          onChange={() => console.log("changed")}
          as={
            <Input
              className={classes["signup__input"]}
              id="username"
              placeholder="Username"
            />
          }
          rules={{
            required: "Username is required",
            minLength: { value: 3, message: "Min length is 3 characters" },
            maxLength: { value: 20, message: "Max length is 20 characters" },
          }}
        />
        <label htmlFor="password">Password</label>
        {errors.password && (
          <p style={{ margin: 0, color: "red" }}>{errors.password.message}</p>
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
            pattern: {
              value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
              message: "Invalid email format",
            },
          }}
        />
        <label htmlFor="password-repeat">Repeat Password</label>
        {errors["repeat"] && (
          <p style={{ margin: 0, color: "red" }}>{errors["repeat"].message}</p>
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

export default SignUpPage;
