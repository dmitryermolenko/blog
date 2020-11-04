import React, { useState, useMemo } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import SignUpForm from "../SingUpForm/SignUpForm";
import { setUser } from "../../actions/actions";
import ArticlesService from "../../services/ArticlesServices";

const SignUpPage = ({ setUser }) => {
  const articlesService = useMemo(() => new ArticlesService(), []);

  const [serverErrors, setServerErrors] = useState({
    email: null,
    username: null,
  });

  const handlerSubmit = ({ username, email, password }) => {
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

        localStorage.setItem("token", response.user.token);
        setUser(response.user);
      })
      .catch((err) => console.log(err));
  };

  if (localStorage.getItem("token")) {
    return <Redirect to="/" />;
  }

  return (
    <SignUpForm
      onSubmit={handlerSubmit}
      serverErrors={serverErrors}
      setServerErrors={setServerErrors}
    />
  );
};

const mapStateToProps = ({ userData: { user } }) => ({ user });
const mapDispatchToProps = { setUser };

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);
