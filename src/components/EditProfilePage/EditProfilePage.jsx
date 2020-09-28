import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Input, Button } from "antd";
import classes from "./EditProfilePage.module.scss";

const EditProfilePage = () => {
  const { control, handleSubmit, errors, setError, clearErrors } = useForm({
    mode: "onChange",
    defaultValues: {
      avatar: "",
    },
  });

  const onSubmit = (data) => {};

  const validateUrl = (value) => {
    const regExp = /(^https?:\/\/)?[a-z0-9~_\-.]+\.[a-z]{2,9}(\/|:|\?[!-~]*)?$/i;

    if (!value.length) {
      clearErrors("avatar");
      return null;
    }

    if (!regExp.test(value)) {
      setError("avatar", {
        type: "manual",
        message: "Invalid url format",
      });
    } else {
      clearErrors("avatar");
    }
  };

  return (
    <div className={classes.profile}>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <h1 className={classes["profile__title"]}>Edit profile</h1>
        <label htmlFor="username">Username</label>
        {errors.username && (
          <p style={{ margin: 0, color: "red" }}>{errors.username.message}</p>
        )}
        <Controller
          name="username"
          control={control}
          as={
            <Input
              className={classes["profile__input"]}
              id="username"
              placeholder="Username"
            />
          }
          rules={{
            required: "Username is required",
          }}
        />
        <label htmlFor="email">Email address</label>
        {errors.email && (
          <p style={{ margin: 0, color: "red" }}>{errors.email.message}</p>
        )}
        <Controller
          name="email"
          control={control}
          as={
            <Input
              className={classes["profile__input"]}
              id="email"
              placeholder="Email Address"
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
        <label htmlFor="password-repeat">New Password</label>
        {errors.password && (
          <p style={{ margin: 0, color: "red" }}>{errors.password.message}</p>
        )}
        <Controller
          name="password"
          control={control}
          as={
            <Input
              className={classes["profile__input"]}
              id="password"
              placeholder="New Password"
              type="password"
            />
          }
          rules={{
            minLength: { value: 6, message: "Min length is 6 characters" },
            maxLength: { value: 40, message: "Max length is 40 characters" },
          }}
        />

        <label htmlFor="avatar">Avatar image (url)</label>
        {errors.avatar && (
          <p style={{ margin: 0, color: "red" }}>{errors.avatar.message}</p>
        )}
        <Controller
          name="avatar"
          control={control}
          render={() => (
            <Input
              className={classes["profile__input"]}
              id="avatar"
              placeholder="Avatar Image"
              onChange={(evt) => {
                validateUrl(evt.target.value);
              }}
            />
          )}
          rules={{
            required: false,
            pattern: {
              value: /(^https?:\/\/)?[a-z0-9~_\-.]+\.[a-z]{2,9}(\/|:|\?[!-~]*)?$/i,
              message: "Invalid url format",
            },
          }}
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
