import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import { Avatar, IconButton, makeStyles } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import AddIcon from "@material-ui/icons/Add";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
const useStyles = makeStyles({
  header: {
    display: "flex",
    padding: "15px 20px",
    justifyContent: "space-between",
    backgroundColor: "white",
    zIndex: 100,
    top: 0,
    boxShadow: "0px 5px 8px -9px rgba(0,0,0,0.75)",
  },
  header__left: {
    display: "flex",
    justifyContent: "space-evenly",
    "& img": {
      height: "60px",
    },
  },
  header__input: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#eff2f5",
    padding: "10px",
    marginLeft: "10px",
    borderRadius: "999px",
  },
  input: {
    border: "none",
    backgroundColor: "transparent",
    outlineWidth: 0,
  },
  header__center: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
  },
  header__option: {
    color: "gray",
    display: "flex",
    alignItems: "center",
    padding: "0 30px",
    cursor: "pointer",
    textDecoration: "none",
    "&:hover": {
      color: "#80ced6",
      backgroundColor: "#eff2f5",
      borderRadius: "10px",
      alignItems: "center",
      padding: "0 30px",
      borderBottom: "none",
    },
  },
  header__info: {
    display: "flex",
    alignItems: "center",
    "& h4": {
      marginLeft: "10px",
    },
  },
  header__right: {
    display: "flex",
  },
});
function Header() {
  const classes = useStyles();
  return (
    <div className={classes.header}>
      <div className={classes.header__left}>
        <img
          src="https://st2.depositphotos.com/3867453/5745/v/950/depositphotos_57451519-stock-illustration-letter-s-logo-icon-design.jpg"
          alt="logo"
        />
      </div>
      <div className={classes.header__input}>
        <SearchIcon />
        <input
          className={classes.input}
          placeholder="Search Shouts"
          type="text"
        />
      </div>
      <div className={classes.header__center}>
        <div className={classes.header__option}>
          <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
            <HomeIcon fontSize="large" />
          </Link>
        </div>
        <div className={classes.header__option}>
          <SupervisedUserCircleIcon fontSize="large" />
        </div>
        <div className={classes.header__option}>
          <Link
            to="/create-shouts"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            <AddIcon fontSize="large" />
          </Link>
        </div>
      </div>
      <div className={classes.header__right}>
        <Link to="/mypost" style={{ color: "inherit", textDecoration: "none" }}>
          <div className={classes.header__info}>
            <Avatar src="https://images.unsplash.com/photo-1563306406-e66174fa3787?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NXx8Z2lybHxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60" />
            <h4>Amy Santiago</h4>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
