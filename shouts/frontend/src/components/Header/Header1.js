import React, { useState, useEffect } from "react";
import SearchIcon from "@material-ui/icons/Search";
import {
  Avatar,
  IconButton,
  makeStyles,
  Toolbar,
  Drawer,
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import AddIcon from "@material-ui/icons/Add";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
const useStyles = makeStyles({
  header: {
    display: "flex",
    padding: "15px 20px",
    justifyContent: "space-between",
    backgroundColor: "white",
    zIndex: 100,
    top: 0,
    boxShadow: "0px 5px 8px -9px rgba(0,0,0,0.75)",
    "@media (max-width: 900px)": {
      paddingLeft: 0,
    },
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
    "&.active":{
      color: "#80ced6",
    }
  },
  header__info: {
    display: "flex",
    alignItems: "center",
    "& h4": {
      marginLeft: "10px",
    },
  },
  header__right: {
    
    "@media (max-width: 900px)":{
        display: "flex",
    }
  },
  drawer:{
      width:'calc(100% - 64px)',
      height: 'calc(100% - 64px)',
  },
  user:{
      width:"100%"
  }
});
function Header() {
  const classes = useStyles();
  console.log("header1");
  const [state, setState] = useState({
    mobileView: false,
    drawerOpen: false,
  });
  const { mobileView, drawerOpen } = state;

  const displayDesktop = () => {
    return (
      <>
        <div className={classes.header__left}>
        <Link to="/dashboard">Dashboard</Link>
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
              to="/logout"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <PowerSettingsNewIcon fontSize="large" />
            </Link>
          </div>
        </div>
        <div className={classes.header__right}>
          <Link
            to="/mypost"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            <div className={classes.header__info}>
              <Avatar src="https://images.unsplash.com/photo-1563306406-e66174fa3787?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NXx8Z2lybHxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60" />
              <h4>Amy Santiago</h4>
            </div>
          </Link>
        </div>
      </>
    );
  };

  const displayMobile = () => {
    const handleDrawerOpen = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: true }));
    const handleDrawerClose = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: false }));
    return (
      <Toolbar>
        <IconButton
          {...{
            edge: "start",
            color: "inherit",
            "aria-label": "menu",
            "aria-haspopup": "true",
            onClick: handleDrawerOpen,
          }}
        >
          <MenuIcon />
        </IconButton>
        <Drawer
        className={classes.drawer}
          {...{
            anchor: "left",
            open: drawerOpen,
            onClose: handleDrawerClose,
          }}
        >
            <div className={classes.user}>
          <div className={classes.header__right}>
            <Link
              to="/mypost"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <div className={classes.header__info}>
                <Avatar src="https://images.unsplash.com/photo-1563306406-e66174fa3787?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NXx8Z2lybHxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60" />
                <h4>Amy Santiago</h4>
              </div>
            </Link>
          </div>
          </div>
          <div>
              <hr/>
            <div className={classes.header__option}>
              <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
                <HomeIcon fontSize="large" />
                <div>Home</div>
              </Link>
            </div>
            <hr/>
            <div className={classes.header__option}>
              <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
                <SupervisedUserCircleIcon fontSize="large" />
                <div>Friends</div>
              </Link>
            </div>
            <hr/>
            <div className={classes.header__option}>
              <Link
                to="/logout"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                <PowerSettingsNewIcon fontSize="large" />
                <div>Logout</div>
              </Link>
            </div>
            <hr/>
          </div>
        </Drawer>
        <div>
          <div className={classes.header__input}>
            <SearchIcon />
            <input
              className={classes.input}
              placeholder="Search Shouts"
              type="text"
            />
          </div>
        </div>
      </Toolbar>
    );
  };
  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 900
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }));
    };
    setResponsiveness();
    window.addEventListener("resize", () => setResponsiveness());
  }, []);
  return (
    <div className={classes.header}>
      {mobileView ? displayMobile() : displayDesktop()}
    </div>
  );
}

export default Header;
