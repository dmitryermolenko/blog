import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import EditProfileForm from "../EditProfileForm/EditProfileForm";

const EditProfilePage = ({ user }) => {
  const history = useHistory();
  return (
    <>
      {localStorage.getItem("token") ? (
        <EditProfileForm user={user} />
      ) : (
        history.push("/sign-in")
      )}
    </>
  );
};

const mapStateToProps = ({ userData: { user } }) => ({ user });

export default connect(mapStateToProps)(EditProfilePage);
