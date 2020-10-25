import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Button, Alert } from "antd";
import SignUpForm from "../SingUpForm/SignUpForm";
import ArticlesService from "../../services/ArticlesServices";

const SignUpPage = () => {
  const articlesService = new ArticlesService();

  const [serverErrors, setServerErrors] = useState({
    email: null,
    username: null,
  });
  const [isSignUpSuccessfull, setSuccessfullSignUp] = useState(false);

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

        setSuccessfullSignUp(true);
      })
      .catch((err) => console.log(err));
  };

  if (localStorage.getItem("token")) {
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
    <SignUpForm
      onSubmit={handlerSubmit}
      serverErrors={serverErrors}
      setServerErrors={setServerErrors}
    />
  );
};

const mapStateToProps = ({ userData: { user } }) => ({ user });

export default connect(mapStateToProps)(SignUpPage);
