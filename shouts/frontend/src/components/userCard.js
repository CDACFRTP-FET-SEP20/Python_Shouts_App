import React, { useState } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";

const useStyles = makeStyles(() => ({
  userCardContainer: {
    width: "30vw",
    height: "100vh",
    backgroundImage: "var(--user-bg2)",
    position: "fixed",
    top: "0px",
    left: "0px",
    ["@media (max-width:1000px)"]: {
      width: "50vw",
    },
    ["@media (max-width:700px)"]: {
      width: "100vw",
      position: "static",
      marginBottom: "2rem",
    },
  },
  imgWrapper: {
    margin: "auto",
    width: "max-content",
    marginTop: "70px",
  },
  Username: {
    fontSize: "2.5rem",
    textAlign: "center",
    color: "#413f3f",
  },
  info: {
    color: "#413f3f",
    fontSize: "1.5rem",
    textAlign: "center",
  },
}));

function UserCard({ open, close, user }) {
  const classes = useStyles();

  return (
    <div className={classes.userCardContainer}>
      <div className={classes.imgWrapper}>
        <img
          className="user-image-wrap"
          src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8Z2lybCUyMGZhY2UlMjBhdmF0YXJ8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
          alt="user-img"
        />
        <div className={classes.Username}> Amy Santiago</div>
        <div className={classes.info}>
          <span> Amy </span> <span> Santiago </span>
        </div>
      </div>
    </div>
  );
}

// const mapStateToProps = ({ authReducer }) => {
//     return { authReducer }
// }

export default UserCard;
