import React from "react";
import ErrorIndicator from "../ErrorIndicator/ErrorIndicator";
import classes from "../SignUpPage/SignUpPage.module.scss";

const Input = ({
  name,
  id,
  placeholder,
  type,
  errors,
  reference,
  serverErrors,
  onChange,
}) => {
  return (
    <>
      <label htmlFor={id}>{placeholder}</label>
      {errors[name] && <ErrorIndicator errorMessage={errors[name].message} />}
      {serverErrors[name] && (
        <ErrorIndicator errorMessage={serverErrors[name]} />
      )}

      <input
        className={classes.Signup__Input}
        name={name}
        id={id}
        placeholder={placeholder}
        type={type}
        ref={reference}
        onChange={onChange}
      />
    </>
  );
};

export default Input;
