import React, { useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import ErrorIndicator from "../ErrorIndicator/ErrorIndicator";
import CustomInput from "../CustomInput/CustomInput";
import { Button } from "antd";
import classes from "../SignUpPage/SignUpPage.module.scss";

const SignUpForm = ({ onSubmit, serverErrors, setServerErrors }) => {
  const {
    register,
    handleSubmit,
    errors,
    getValues,
    setError,
    clearErrors,
  } = useForm({
    mode: "onChange",
  });

  const emailRegExp = useMemo(
    () =>
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
    []
  );
  const usernameSettingsValidation = useMemo(
    () =>
      register({
        required: "Username is required",
        minLength: { value: 3, message: "Min length is 3 characters" },
        maxLength: { value: 20, message: "Max length is 20 characters" },
      }),
    [register]
  );

  const emailSettingsValidation = useMemo(
    () =>
      register({
        required: "Email is required",
        pattern: {
          value: emailRegExp,
          message: "Invalid email format",
        },
      }),
    [register, emailRegExp]
  );

  const passwordSettingsValidation = useMemo(
    () =>
      register({
        required: "Password is required",
        minLength: { value: 6, message: "Min length is 6 characters" },
        maxLength: { value: 40, message: "Max length is 40 characters" },
      }),
    [register]
  );

  const passwordMatchingCheckHandler = useCallback(() => {
    const repeat = getValues("repeat");
    const password = getValues("password");

    if (password === "" && repeat === "") {
      clearErrors("repeat");
      return;
    }

    if (password !== repeat) {
      setError("repeat", {
        type: "manual",
        message:
          "The values entered for Password and Repeat Password do not match",
      });
      return;
    }
  }, [clearErrors, getValues, setError]);

  const inputChangeHandler = useCallback(
    (name) => {
      if (serverErrors[name]) {
        setServerErrors({ ...serverErrors, [name]: null });
      }
    },
    [serverErrors, setServerErrors]
  );

  return (
    <div className={classes.Signup}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className={classes.Signup__Title}>Sign Up</h1>
        <CustomInput
          name="username"
          id="username"
          placeholder="Username"
          type="text"
          errors={errors}
          serverErrors={serverErrors}
          reference={usernameSettingsValidation}
          onChange={inputChangeHandler}
        />
        <CustomInput
          name="email"
          id="email"
          placeholder="Email Address"
          type="email"
          errors={errors}
          serverErrors={serverErrors}
          reference={emailSettingsValidation}
          onChange={inputChangeHandler}
        />

        <CustomInput
          name="password"
          id="password"
          placeholder="Password"
          type="password"
          errors={errors}
          serverErrors={serverErrors}
          reference={passwordSettingsValidation}
          onChange={passwordMatchingCheckHandler}
        />

        <CustomInput
          name="repeat"
          id="repeat"
          placeholder="Password Repeat"
          type="password"
          errors={errors}
          serverErrors={serverErrors}
          reference={register}
          onChange={passwordMatchingCheckHandler}
        />

        {errors.agreement && (
          <ErrorIndicator errorMessage={errors.agreement.message} />
        )}
        <label className={classes.Signup__Label}>
          <input
            name="agreement"
            className={classes.Signup__Checkbox}
            type="checkbox"
            ref={register({
              required: "Please tick the checkbox below if you want to proceed",
            })}
          />
          I agree to the processing of my personal information
        </label>
        <Button
          className={classes.Signup__Submit}
          type="primary"
          htmlType="submit"
        >
          Create
        </Button>
        <p className={classes.Signup__Question}>
          Already have an account? <Link to="/sign-in">Sign In</Link>
        </p>
      </form>
    </div>
  );
};

export default SignUpForm;
