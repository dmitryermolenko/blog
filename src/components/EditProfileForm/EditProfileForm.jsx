import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { Input, Button } from "antd";
import ArticlesService from "../../services/ArticlesServices";
import { setUser } from "../../actions/actions";
import classes from "../EditProfilePage/EditProfilePage.module.scss";

const EditProfileForm = ({ user, setUser }) => {
  const articlesService = new ArticlesService();
  const history = useHistory();
  useEffect(() => {
    if (user) {
      setValue("username", `${user.username}`);
      setValue("email", `${user.email}`);
      setValue("image", `${user.image}`);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const {
    control,
    handleSubmit,
    errors,
    setError,
    clearErrors,
    setValue,
  } = useForm({
    mode: "onChange",
    /*defaultValues: {
      image: "",
    },*/
  });

  const onSubmit = ({ username, email, password, image }) => {
    const data = {
      user: { username, email, password, image },
    };
    articlesService
      .updateUser(data)
      .then(({ user }) => {
        setUser(user);
        history.push("/");
      })
      .catch((err) => console.log(err));
  };

  const validateUrl = (value) => {
    const regExp = /[-a-zA-Z0-9@:%_+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_+.~#?&//=]*)?.(png|jpeg|jpg|svg)$/i;

    if (!value.length) {
      clearErrors("image");
      return null;
    }

    if (!regExp.test(value)) {
      setError("image", {
        type: "manual",
        message: "Invalid url format",
      });
    } else {
      setValue("image", value);
      clearErrors("image");
    }
  };

  return (
    <form className={classes.Profile} onSubmit={handleSubmit(onSubmit)}>
      <h1 className={classes.Profile__Title}>Edit profile</h1>
      <label htmlFor="username">Username</label>
      {errors.username && (
        <p style={{ margin: 0, color: "red" }}>{errors.username.message}</p>
      )}
      <Controller
        name="username"
        control={control}
        as={
          <Input
            className={classes.Profile__Input}
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
            className={classes.Profile__Input}
            id="email"
            placeholder="Email Address"
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
      <label htmlFor="password-repeat">New Password</label>
      {errors.password && (
        <p style={{ margin: 0, color: "red" }}>{errors.password.message}</p>
      )}
      <Controller
        name="password"
        control={control}
        as={
          <Input
            className={classes.Profile__Input}
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

      <label htmlFor="image">Avatar image (url)</label>
      {errors.image && (
        <p style={{ margin: 0, color: "red" }}>{errors.image.message}</p>
      )}
      <Controller
        name="image"
        control={control}
        as={
          <Input
            className={classes.Profile__Input}
            id="image"
            placeholder="Avatar Image"
            onChange={(evt) => {
              validateUrl(evt.target.value);
            }}
          />
        }
        rules={{
          required: false,
        }}
      />
      <Button
        className={classes.Profile__Submit}
        type="primary"
        htmlType="submit"
      >
        Save
      </Button>
    </form>
  );
};

const mapDispatchToProps = {
  setUser,
};

export default connect(null, mapDispatchToProps)(EditProfileForm);
